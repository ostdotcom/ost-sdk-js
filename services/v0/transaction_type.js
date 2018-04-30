"use strict";

/**
 * Transaction Type Service
 *
 * @module services/v0/transaction_type
 */
const rootPrefix = "../.."
;

// hide request object
var _requestObj = null;

/**
 * Transaction Type Service constructor
 *
 * @constructor
 */
const transactionType = function (requestObj) {
  const oThis = this;

  // Assign request object
  _requestObj = requestObj;

  // Define the url prefix
  oThis.urlPrefix = '/transaction-types';

  return oThis;
};

transactionType.prototype = {

  /**
   * Create
   *
   * @param {object} params
   *
   * @public
   */
  create: function (params) {
    const oThis = this;
    params = params || {};

    _requestObj.post(oThis.urlPrefix + "/create", params);
  },

  /**
   * Edit
   *
   * @param {object} params
   *
   * @public
   */
  edit: function (params) {
    const oThis = this;
    params = params || {};

    _requestObj.post(oThis.urlPrefix + "/edit", params);
  },

  /**
   * List
   *
   * @param {object} params
   *
   * @public
   */
  list: function (params) {
    const oThis = this;
    params = params || {};

    _requestObj.get(oThis.urlPrefix + "/list", params);
  },

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

    _requestObj.post(oThis.urlPrefix + "/execute", params);
  },

  /**
   * Get Transaction Status
   *
   * @param {object} params
   *
   * @public
   */
  status: function (params) {
    const oThis = this;
    params = params || {};

    _requestObj.post(oThis.urlPrefix + "/status", params);
  }

};

module.exports = transactionType;