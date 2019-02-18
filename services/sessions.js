/**
 * Sessions Service
 *
 * @module services/sessions
 */

const rootPrefix = ".."
    , validate = require(rootPrefix + '/lib/validate')
;

// hide request object
var _requestObj = null;

/**
 * Sessions Service constructor
 *
 * @constructor
 */
const sessions = function (requestObj) {
    const oThis = this;

    // Assign request object
    _requestObj = requestObj;

    // Define the url prefix
    oThis.urlPrefix = '/users';
    oThis.urlSuffix = '/sessions';

    return oThis;
};

sessions.prototype = {


    /**
     * Get List of sessions for user
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
     * Get a session
     *
     * @param {object} params
     *
     * @public
     */
    get: function (params) {
        const oThis = this;
        var params = params || {};
        return _requestObj.get(oThis.urlPrefix + "/" + validate.getUserId(params) + oThis.urlSuffix +
            "/" + validate.getSessionAddress(params), params);
    },

};

module.exports = sessions;