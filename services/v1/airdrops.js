"use strict";

/**
 * Airdrops Service
 *
 * @module services/v1/airdrops
 */

const rootPrefix = "../.."
  , validate = require(rootPrefix + '/lib/validate')
;

// hide request object
var _requestObj = null;

/**
 * Airdrops Service constructor
 *
 * @constructor
 */
const airdrops = function (requestObj) {
  const oThis = this;

  // Assign request object
  _requestObj = requestObj;

  // Define the url prefix
  oThis.urlPrefix = '/airdrops';

  return oThis;
};

airdrops.prototype = {

  /**
   * Execute airdrop
   *
   * @param {object} params
   *
   * @public
   */
  execute: function (params) {
    const oThis = this;
    params = params || {};

    return _requestObj.post(oThis.urlPrefix + "/", params);
  },

  /**
   * Get airdrop details
   *
   * @param {object} params
   *
   * @public
   */
  get: function (params) {
    const oThis = this;
    params = params || {};

    return _requestObj.get(oThis.urlPrefix + "/" + validate.getId(params) + "/", params);
  },

  /**
   * List of airdrops
   *
   * @param {object} params
   *
   * @public
   */
  list: function (params) {
    const oThis = this;
    params = params || {};

    return _requestObj.get(oThis.urlPrefix + "/", params);
  }

};

module.exports = airdrops;