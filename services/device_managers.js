"use strict";

/**
 * device managers Service
 *
 * @module services/device_managers
 */

const rootPrefix = ".."
    , validate = require(rootPrefix + '/lib/validate')
;

// hide request object
var _requestObj = null;

/**
 * device managers Service constructor
 *
 * @constructor
 */
const deviceManagers = function (requestObj) {
    const oThis = this;

    // Assign request object
    _requestObj = requestObj;

    // Define the url prefix
    oThis.urlPrefix = '/users';
    oThis.urlSuffix = "/device-managers";

    return oThis;
};

deviceManagers.prototype = {



    /**
     * Get Device Manager of a User
     *
     * @param params params for fetching device managers of a user
     *
     * @return object
     *
     */
    get: function (params){
        const oThis = this;
        var params = params || {};

        return _requestObj.get(oThis.urlPrefix + "/" + validate.getUserId(params) + oThis.urlSuffix, params);
    },

};

module.exports = deviceManagers;