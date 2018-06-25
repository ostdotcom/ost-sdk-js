
/**
 * Ledger Service
 *
 * @module services/v1/ledger
 */

const rootPrefix = "../.."
  , validate = require(rootPrefix + '/lib/validate')
;

// hide request object
var _requestObj = null;

/**
 * Ledger Service constructor
 *
 * @constructor
 */
const ledger = function (requestObj) {
  const oThis = this;

  // Assign request object
  _requestObj = requestObj;

  // Define the url prefix
  oThis.urlPrefix = '/ledger';

  return oThis;
};

ledger.prototype = {

  /**
   * Get ledger for user
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

module.exports = ledger;