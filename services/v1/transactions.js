"use strict";

/**
 * Transactions Service
 *
 * @module services/v1/transactions
 */

const rootPrefix = "../.."
  , validate = require(rootPrefix + '/lib/validate')
;

// hide request object
var _requestObj = null;

/**
 * Transactions Service constructor
 *
 * @constructor
 */
const transactions = function (requestObj) {
  const oThis = this;

  // Assign request object
  _requestObj = requestObj;

  // Define the url prefix
  oThis.urlPrefix = '/transactions';

  return oThis;
};

transactions.prototype = {

  /**
   * Execute transaction
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
   * Get transaction details
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
   * List of transactions
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

module.exports = transactions;