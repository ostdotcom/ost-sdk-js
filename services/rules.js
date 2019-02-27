/**
 * Devices Service
 *
 * @module services/device_managers
 */

const rootPrefix = ".."
    , validate = require(rootPrefix + '/lib/validate')
;

// hide request object
var _requestObj = null;

/**
 * rules service
 *
 * @constructor
 */
const rules = function (requestObj) {
    const oThis = this;

    // Assign request object
    _requestObj = requestObj;

    // Define the url prefix
    oThis.urlPrefix = '/rules';

    return oThis;
};

rules.prototype = {


    /**
     * Get rules
     *
     * @param {object} params
     *
     * @public
     */
    get: function (params) {
        const oThis = this;
        var params = params || {};
        return _requestObj.get(oThis.urlPrefix , params);
    },

};

module.exports = rules;