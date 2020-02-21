"use strict";

/**
 * Redeemable SKUs Service
 *
 * @module services/redeemable_skus
 */

const rootPrefix = ".."
    , validate = require(rootPrefix + '/lib/validate')
;

// hide request object
var _requestObj = null;

/**
 * Redeemable SKUs Service constructor.
 *
 * @constructor
 */
const redeemable_skus = function (requestObj) {
    const oThis = this;

    // Assign request object.
    _requestObj = requestObj;

    // Define the url prefix.
    oThis.urlPrefix = '/redeemable-skus';

    return oThis;
};

redeemable_skus.prototype = {
    /**
     * Get redeemable skus list.
     *
     * @param {object} params
     *
     * @returns {*}
     */
    getList: function(params) {
        const oThis = this;

        params = params || {};

        return _requestObj.get(oThis.urlPrefix, params);
    },

    /**
     * Get redeemable sku by redeemable sku id.
     *
     * @param {object} params
     *
     * @returns {*}
     */
    get: function(params) {
        const oThis = this;

        params = params || {};

        return _requestObj.get(oThis.urlPrefix + "/" + validate.getRedeemableSkuId(params), params);
    }

};

module.exports = redeemable_skus;
