"use strict";

/**
 * Transfers Service
 *
 * @module services/v1/transfers
 */

const rootPrefix = "../.."
  , validate = require(rootPrefix + '/lib/validate')
;

// hide request object
var _requestObj = null;

/**
 * Transfers Service constructor
 *
 * @constructor
 */
const transfers = function (requestObj) {
  const oThis = this;

  // Assign request object
  _requestObj = requestObj;

  // Define the url prefix
  oThis.urlPrefix = '/transfers';

  return oThis;
};

transfers.prototype = {

  /**
   * Execute transfer
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
   * Get transfer details
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
   * List of transfers
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

module.exports = transfers;