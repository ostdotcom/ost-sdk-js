"use strict";

/**
 * pricePoints Service
 *
 * @module services/price_points
 */

const rootPrefix = ".."
;

// hide request object
var _requestObj = null;

/**
 * pricePoints Service constructor
 *
 * @constructor
 */
const pricePoints = function (requestObj) {
  const oThis = this;

  // Assign request object
  _requestObj = requestObj;

  // Define the url prefix
  oThis.urlPrefix = '/chains';
  oThis.urlSuffix = '/price-points';

  return oThis;
};

pricePoints.prototype = {

  /**
   * Get pricePoints details
   *
   * @param {object} params
   *
   * @public
   */
  get: function (params) {
    const oThis = this;
    params = params || {};

    return _requestObj.get(oThis.urlPrefix + "/" + validate.getChainId(params) + oThis.urlSuffix, params);
  }

};

module.exports = pricePoints;