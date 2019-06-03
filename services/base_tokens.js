"use strict";

/**
 * Base Tokens Service
 *
 * @module /services/base_tokens
 */

// Hide request object
var _requestObj = null;

/**
 * Base tokens service constructor.
 *
 * @constructor
 */
const baseTokens = function (requestObj) {
    const oThis = this;

    // Assign request object
    _requestObj = requestObj;

    // Define the url prefix
    oThis.urlPrefix = '/base-tokens';

    return oThis;
};

baseTokens.prototype = {

    /**
     * Get base tokens details.
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

module.exports = baseTokens;