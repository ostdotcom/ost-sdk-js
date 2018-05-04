"use strict";

/**
 * Request Manager
 *
 * @module lib/request
 */
const queryString = require('query-string')
  , crypto = require('crypto')
  , https = require('https')
  , url = require('url');

const rootPrefix = ".."
  , validate = require(rootPrefix + '/lib/validate')
  , version = require(rootPrefix + '/package.json').version
  , httpUserAgent = "ost-sdk-js " + version
;

/**
 * api key and secret
 *
 * @protected
 */
const _apiCredentials = {};

/**
 * Generate query signature
 * @param {string} resource - API Resource
 * @param {object} queryParams - resource query parameters
 *
 * @return {string} - query parameters with signature
 *
 * @protected
 */
function signQueryParams(resource, queryParams) {
  const buff = new Buffer.from(_apiCredentials.secret, 'utf8')
    , hmac = crypto.createHmac('sha256', buff);

  hmac.update(resource + "?" + queryParams);

  return queryParams + "&signature=" + hmac.digest('hex');
}

/**
 * Request Manager constructor
 *
 * @param {object} params
 * @param {string} params.apiKey - api key
 * @param {string} params.apiSecret - api secret
 * @param {string} params.apiEndpoint - version specific api endpoint
 *
 * @constructor
 */
const RequestKlass = function(params) {
  const oThis = this;

  // Validate API key
  if (validate.isPresent(params.apiKey)) {
    _apiCredentials.key = params.apiKey;
  } else {
    throw new Error('Api key not present.');
  }

  // Validate API secret
  if (validate.isPresent(params.apiSecret)) {
    _apiCredentials.secret = params.apiSecret;
  } else {
    throw new Error('Api secret not present.');
  }

  oThis.apiEndpoint = params.apiEndpoint.replace(/\/$/, "");
};

RequestKlass.prototype = {

  /**
   * Send get request
   *
   * @param {string} resource - API Resource
   * @param {object} queryParams - resource query parameters
   *
   * @public
   */
  get: function (resource, queryParams) {
    const oThis = this
      , parsedURL = oThis._parseURL(resource)
      , requestData = oThis._formatQueryParams(resource, queryParams);

    const options = {
      host: parsedURL.hostname,
      port: parsedURL.port,
      path: parsedURL.path+"?"+requestData,
      method: 'GET',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'User-Agent': httpUserAgent
      }
    };

    return oThis._send(options);
  },

  /**
   * Send post request
   *
   * @param {string} resource - API Resource
   * @param {object} queryParams - resource query parameters
   *
   * @public
   */
  post: function (resource, queryParams) {
    const oThis = this
      , parsedURL = oThis._parseURL(resource)
      , requestData = oThis._formatQueryParams(parsedURL.path, queryParams);

    const options = {
      host: parsedURL.hostname,
      port: parsedURL.port,
      path: parsedURL.path,
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'User-Agent': httpUserAgent
      }
    };

    return oThis._send(options, requestData);
  },

  /**
   * Get formatted query params
   *
   * @param {string} resource - API Resource
   * @param {object} queryParams - resource query parameters
   *
   * @return {string} - query parameters with signature
   *
   * @private
   */
  _formatQueryParams: function (resource, queryParams) {
    const oThis = this;

    queryParams.api_key = _apiCredentials.key;
    queryParams.request_timestamp = Math.round((new Date()).getTime() / 1000);

    var formattedParams = queryString.stringify(queryParams, {arrayFormat: 'bracket'}).replace(/%20/g, '+');

    return signQueryParams(resource, formattedParams);
  },

  /**
   * Get parsed URL
   *
   * @param {string} resource - API Resource
   *
   * @return {object} - parsed url object
   *
   * @private
   */
  _parseURL: function (resource) {
    const oThis = this;

    return url.parse(oThis.apiEndpoint + resource);
  },

  /**
   * Send request
   *
   * @param {object} requestOptions - Request object
   * @param {string} requestData - Request data
   *
   * @private
   */
  _send: function (requestOptions, requestData) {
    const oThis = this;

    return new Promise(async function (onResolve, onReject) {
      var chunkedResponseData = '';

      var request = https.request(requestOptions, function (response) {

        response.setEncoding('utf8');

        response.on('data', function (chunk) {
          chunkedResponseData += chunk;
        });

        response.on('end', function () {
          var parsedResponse = oThis._parseResponse(chunkedResponseData, response);
          if (parsedResponse.success) {
            onResolve(parsedResponse);
          } else {
            onReject(parsedResponse);
          }
        });

      });

      request.on('error', function (e) {

        console.error('OST-SDK: Request error');
        console.error(e);
        var parsedResponse = oThis._parseResponse(e);
        if (parsedResponse.success) {
          onResolve(parsedResponse);
        } else {
          onReject(parsedResponse);
        }

      });

      //write data to server
      if (validate.isPresent(requestData)) {
        request.write(requestData);
      }
      request.end();
    });
  },

  /**
   * Parse response
   *
   * @param {string} responseData - Response data
   * @param {object} response - Response object
   *
   * @private
   */
  _parseResponse: function(responseData, response) {

    if (!validate.isPresent(responseData) || (response || {}).statusCode != 200) {
      switch ((response || {}).statusCode) {
        case 400:
          responseData = '{"success": false, "err": {"code": "BAD_REQUEST", "internal_id": "SDK(BAD_REQUEST)", "msg": ""}}';
          break;
        case 429:
          responseData = '{"success": false, "err": {"code": "TOO_MANY_REQUESTS", "internal_id": "SDK(TOO_MANY_REQUESTS)", "msg": ""}}';
          break;
        case 502:
          responseData = '{"success": false, "err": {"code": "BAD_GATEWAY", "internal_id": "SDK(BAD_GATEWAY)", "msg": ""}}';
          break;
        case 503:
          responseData = '{"success": false, "err": {"code": "SERVICE_UNAVAILABLE", "internal_id": "SDK(SERVICE_UNAVAILABLE)", "msg": ""}}';
          break;
        case 504:
          responseData = '{"success": false, "err": {"code": "GATEWAY_TIMEOUT", "internal_id": "SDK(GATEWAY_TIMEOUT)", "msg": ""}}';
          break;
        default:
          responseData = '{"success": false, "err": {"code": "SOMETHING_WENT_WRONG", "internal_id": "SDK(SOMETHING_WENT_WRONG)", "msg": ""}}';
      }
    }

    try {
      var parsedResponse = JSON.parse(responseData);
    } catch(e) {
      //console.error('OST-SDK: Response parsing error');
      //console.error(e);
      var parsedResponse = {"success": false, "err": {"code": "SOMETHING_WENT_WRONG", "internal_id": "SDK(SOMETHING_WENT_WRONG)", "msg": "Response parsing error"}};
    }

    return parsedResponse;
  }

};

module.exports = RequestKlass;