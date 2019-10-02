/**
 * Webhooks service.
 *
 * @module services/webhooks
 */
const crypto = require('crypto');

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
const webhooks = function (requestObj, webhookSecret) {
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
  },

  /**
   * Verify signature
   *
   * @param version
   * @param stringifiedData
   * @param requestTimestamp
   * @param signature
   * @param webhookSecret
   * @return {boolean}
   */
  verifySignature: function (version, stringifiedData, requestTimestamp, signature, webhookSecret) {
    if(typeof stringifiedData !== 'string') stringifiedData = JSON.stringify(stringifiedData);

    const buff = new Buffer.from(webhookSecret, 'utf8')
      , hmac = crypto.createHmac('sha256', buff);

    hmac.update(`${requestTimestamp}.${version}.${stringifiedData}`);

    let computedSignature = hmac.digest('hex');

    return signature.indexOf(computedSignature) >= 0;
  }

};

module.exports = webhooks;