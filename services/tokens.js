"use strict";

/**
 * Token Service
 *
 * @module services/tokens
 */

const rootPrefix = ".."
;

// hide request object
var _requestObj = null;

/**
 * tokens Service constructor
 *
 * @constructor
 */
const tokens = function (requestObj) {
    const oThis = this;

    // Assign request object
    _requestObj = requestObj;

    // Define the url prefix
    oThis.urlPrefix = '/tokens';

    return oThis;
};

tokens.prototype = {

    /**
     * Get token details
     *
     * @param {object} params
     *
     * @public
     */
    get: function (params) {
        const oThis = this;
        params = params || {};

        return _requestObj.get(oThis.urlPrefix, params);
    }

};

module.exports = tokens;