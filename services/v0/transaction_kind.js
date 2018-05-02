"use strict";

/**
 * Transaction Kind Service
 *
 * @module services/v0/transaction_kind
 */
const rootPrefix = "../.."
;

// hide request object
var _requestObj = null;

/**
 * Transaction Kind Service constructor
 *
 * @constructor
 */
const transactionKind = function (requestObj) {
  const oThis = this;

  // Assign request object
  _requestObj = requestObj;

  // Define the url prefix
  oThis.urlPrefix = '/transaction-types';

  return oThis;
};

transactionKind.prototype = {

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

module.exports = transactionKind;