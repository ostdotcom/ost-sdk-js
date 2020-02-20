"use strict";

/**
 * Redemptions Service
 *
 * @module services/redemptions
 */

const rootPrefix = ".."
    , validate = require(rootPrefix + '/lib/validate')
;

// hide request object
var _requestObj = null;

/**
 * Redemptions Service constructor
 *
 * @constructor
 */
const redemptions = function (requestObj) {
    const oThis = this;

    // Assign request object
    _requestObj = requestObj;

    // Define the url prefix
    oThis.urlPrefix = '/users';
    oThis.redemptionsUrlPrefix = '/redemptions';

    return oThis;
};

redemptions.prototype = {
    /**
     * Get user redemptions list.
     *
     * @param {object} params
     *
     * @returns {*}
     */
    getList: function(params) {
        const oThis = this;

        params = params || {};

        return _requestObj.get(oThis.urlPrefix + "/" + validate.getUserId(params) + "/" + oThis.redemptionsUrlPrefix, params);
    },

    /**
     * Get user redemption by redemption id.
     *
     * @param {object} params
     *
     * @returns {*}
     */
    get: function(params) {
        const oThis = this;

        params = params || {};

        return _requestObj.get(oThis.urlPrefix + "/" + validate.getUserId(params) + "/" + oThis.redemptionsUrlPrefix + validate.getRedemptionId(params), params);
    }

};

module.exports = redemptions;
