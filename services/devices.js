/**
 * Devices Service
 *
 * @module services/devices
 */

const rootPrefix = ".."
    , validate = require(rootPrefix + '/lib/validate')
;

// hide request object
var _requestObj = null;

/**
 * Devices Service constructor
 *
 * @constructor
 */
const devices = function (requestObj) {
    const oThis = this;

    // Assign request object
    _requestObj = requestObj;

    // Define the url prefix
    oThis.urlPrefix = '/users';
    oThis.urlSuffix = '/devices';

    return oThis;
};

devices.prototype = {


    /**
     * Create
     *
     * @param {object} params
     *
     * @public
     */
    create: function (params) {
        const oThis = this;
        var params = params || {};
        return _requestObj.post(oThis.urlPrefix + "/" + validate.getUserId(params) + oThis.urlSuffix, params);
    },

    /**
     * Get List of devices for user
     *
     * @param {object} params
     *
     * @public
     */
    getList: function (params) {
        const oThis = this;
        var params = params || {};
        return _requestObj.get(oThis.urlPrefix + "/" + validate.getUserId(params) + oThis.urlSuffix, params);
    },


    /**
     * Get a devices
     *
     * @param {object} params
     *
     * @public
     */
    get: function (params) {
        const oThis = this;
        var params = params || {};
        return _requestObj.get(oThis.urlPrefix + "/" + validate.getUserId(params) + oThis.urlSuffix +
        "/" + validate.getDeviceAddress(params), params);
    },

};

module.exports = devices;