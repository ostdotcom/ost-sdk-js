/**
 * Devices Managers Service
 *
 * @module services/device_managers
 */

const rootPrefix = ".."
    , validate = require(rootPrefix + '/lib/validate')
;

// hide request object
var _requestObj = null;

/**
 * Device Managers Service constructor
 *
 * @constructor
 */
const device_managers = function (requestObj) {
    const oThis = this;

    // Assign request object
    _requestObj = requestObj;

    // Define the url prefix
    oThis.urlPrefix = '/users';
    oThis.urlSuffix = '/device-managers';

    return oThis;
};

device_managers.prototype = {


    /**
     * Get a device managers
     *
     * @param {object} params
     *
     * @public
     */
    get: function (params) {
        const oThis = this;
        var params = params || {};
        return _requestObj.get(oThis.urlPrefix + "/" + validate.getUserId(params) + oThis.urlSuffix, params);
    },

};

module.exports = device_managers;