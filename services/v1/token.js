"use strict";

/**
 * Token Service
 *
 * @module services/v1/token
 */

const rootPrefix = "../.."
;

// hide request object
var _requestObj = null;

/**
 * Token Service constructor
 *
 * @constructor
 */
const token = function (requestObj) {
  const oThis = this;

  // Assign request object
  _requestObj = requestObj;

  // Define the url prefix
  oThis.urlPrefix = '/token';

  return oThis;
};

token.prototype = {

  /**
   * Get token details
   *
   * @param {object} params
   *
   * @public
   */
  get: function (params) {
    const oThis = this;
    params = params || {};

    return _requestObj.get(oThis.urlPrefix + "/", params);
  }

};

module.exports = token;