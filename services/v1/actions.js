"use strict";

/**
 * Actions Service
 *
 * @module services/v1/actions
 */

const rootPrefix = "../.."
  , validate = require(rootPrefix + '/lib/validate')
;

// hide request object
var _requestObj = null;

/**
 * Actions Service constructor
 *
 * @constructor
 */
const actions = function (requestObj) {
  const oThis = this;

  // Assign request object
  _requestObj = requestObj;

  // Define the url prefix
  oThis.urlPrefix = '/actions';

  return oThis;
};

actions.prototype = {

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

    return _requestObj.post(oThis.urlPrefix + "/", params);
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

    return _requestObj.post(oThis.urlPrefix + "/" + validate.getId(params) + "/", params);
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

    return _requestObj.get(oThis.urlPrefix + "/", params);
  },

  /**
   * Get action details
   *
   * @param {object} params
   *
   * @public
   */
  get: function (params) {
    const oThis = this;
    params = params || {};

    return _requestObj.get(oThis.urlPrefix + "/" + validate.getId(params) + "/", params);
  }

};

module.exports = actions;