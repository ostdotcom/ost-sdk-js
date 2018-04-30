"use strict";

/**
 * Users Service
 *
 * @module services/v0/user
 */

const rootPrefix = "../.."
;

// hide request object
var _requestObj = null;

/**
 * Users Service constructor
 *
 * @constructor
 */
const user = function (requestObj) {
  const oThis = this;

  // Assign request object
  _requestObj = requestObj;

  // Define the url prefix
  oThis.urlPrefix = '/users';

  return oThis;
};

user.prototype = {

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
   * Airdrop Tokens
   *
   * @param {object} params
   *
   * @public
   */
  airdropTokens: function (params) {
    const oThis = this;
    params = params || {};

    _requestObj.post(oThis.urlPrefix + "/airdrop/drop", params);
  },

  /**
   * Get Airdrop Status
   *
   * @param {object} params
   *
   * @public
   */
  airdropStatus: function (params) {
    const oThis = this;
    params = params || {};

    _requestObj.get(oThis.urlPrefix + "/airdrop/status", params);
  }

};

module.exports = user;