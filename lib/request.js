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
    throw new Error('Api Key is not present.');
  }

  // Validate API secret
  if (validate.isPresent(params.apiSecret)) {
    _apiCredentials.secret = params.apiSecret;
  } else {
    throw new Error('Api Secret is not present.');
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

    oThis._send(options);
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

    oThis._send(options, requestData);
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

    var request = https.request(requestOptions, function (response) {
      response.setEncoding('utf8');
      response.on('data', function (cbresponse) {
        console.log(cbresponse);
      });
    });

    request.on('error', function (e) {
      console.log('problem with request: ');
      console.log(e);
    });

    //write data to server
    if (validate.isPresent(requestData)) {
      request.write(requestData);
    }
    request.end();
  }

};

module.exports = RequestKlass;