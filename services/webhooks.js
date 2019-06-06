"use strict";

/**
 * Webhooks service.
 *
 * @module services/webhooks
 */

const rootPrefix = ".."
  , validate = require(rootPrefix + '/lib/validate')
;

// Hide request object.
let _requestObj = null;

/**
 * Webhooks service constructor.
 *
 * @constructor
 */
const webhooks = function (requestObj) {
  const oThis = this;

  // Assign request object.
  _requestObj = requestObj;

  // Define the url prefix
  oThis.urlPrefix = '/webhooks';

  return oThis;
};

webhooks.prototype = {

  /**
   * Create webhook.
   *
   * @param {object} params
   * @returns {*}
   * @public
   */
  create: function (params) {
    const oThis = this;
    var params = params || {};
    return _requestObj.post(oThis.urlPrefix + "/" , params);
  },

  /**
   * Update webhook.
   *
   * @param {object} params
   * @returns {*}
   * @public
   */
  update: function (params) {
    const oThis = this;
    var params = params || {};
    return _requestObj.post(oThis.urlPrefix + "/" + validate.getWebhookId(params), params);
  },

  /**
   * Get webhook.
   *
   * @param params
   * @returns {*}
   * @public
   */
  get: function (params) {
    const oThis = this;
    var params = params || {};
    return _requestObj.get(oThis.urlPrefix + "/" + validate.getWebhookId(params), params);
  },

  /**
   * Get list of webhooks.
   *
   * @param params
   * @returns {*}
   * @public
   */
  getList: function (params) {
    const oThis = this;
    var params = params || {};
    return _requestObj.get(oThis.urlPrefix + "/" , params);
  },

  /**
   * Delete webhook.
   *
   * @param params
   * @returns {*}
   * @public
   */
  deleteWebhook: function (params) {
    const oThis = this;
    var params = params || {};
    return _requestObj.deleteRequest(oThis.urlPrefix + "/" + validate.getWebhookId(params), params);
  }

};

module.exports = webhooks;