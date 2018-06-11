
/**
 * Balances Service
 *
 * @module services/v1/balances
 */

const rootPrefix = "../.."
  , validate = require(rootPrefix + '/lib/validate')
;

// hide request object
var _requestObj = null;

/**
 * Balances Service constructor
 *
 * @constructor
 */
const balances = function (requestObj) {
  const oThis = this;

  // Assign request object
  _requestObj = requestObj;

  // Define the url prefix
  oThis.urlPrefix = '/balances';

  return oThis;
};

balances.prototype = {

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
  }
};

module.exports = balances;