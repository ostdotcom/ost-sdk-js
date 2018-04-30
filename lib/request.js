"use strict";

/**
 * Request Manager
 *
 * @module lib/request
 */
const queryString = require('query-string')
  , crypto = require('crypto');

const rootPrefix = ".."
  , validate = require(rootPrefix + '/lib/validate')
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

  oThis.apiEndpoint = params.apiEndpoint;
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
    const oThis = this;

    console.log(oThis._formatQueryParams(resource, queryParams));
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
    const oThis = this;

    console.log(oThis._formatQueryParams(resource, queryParams));
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





};

module.exports = RequestKlass;