/**
 * Chains Service
 *
 * @module services/chains
 */

const rootPrefix = ".."
    , validate = require(rootPrefix + '/lib/validate')
;

// hide request object
var _requestObj = null;

/**
 * Chains Service constructor
 *
 * @constructor
 */
const chains = function (requestObj) {
    const oThis = this;

    // Assign request object
    _requestObj = requestObj;

    // Define the url prefix
    oThis.urlPrefix = '/chains';

    return oThis;
};

chains.prototype = {

    /**
     * Get chains details
     *
     * @param {object} params
     *
     * @public
     */
    get: function (params) {
        const oThis = this;
        params = params || {};

        return _requestObj.get(oThis.urlPrefix + "/" + validate.getChainId(params), params);
    }
};

module.exports = chains;