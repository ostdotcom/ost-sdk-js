/**
 * Balance Service
 *
 * @module services/balance
 */

const rootPrefix = ".."
    , validate = require(rootPrefix + '/lib/validate')
;

// hide request object
var _requestObj = null;

/**
 * balance service
 *
 * @constructor
 */
const balance = function (requestObj) {
    const oThis = this;

    // Assign request object
    _requestObj = requestObj;

    // Define the url prefix
    oThis.urlPrefix = '/users';
    oThis.urlSufix = '/balance';

    return oThis;
};

balance.prototype = {


    /**
     * Get balance
     *
     * @param {object} params
     *
     * @public
     */
    get: function (params) {
        const oThis = this;
        var params = params || {};
        return _requestObj.get(oThis.urlPrefix + "/" + validate.getUserId(params) + oThis.urlSufix, params);
    },

};

module.exports = balance;