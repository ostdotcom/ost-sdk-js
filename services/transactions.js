/**
 * Transactions Service
 *
 * @module services/transactions
 */

const rootPrefix = ".."
    , validate = require(rootPrefix + '/lib/validate')
;

// hide request object
var _requestObj = null;

/**
 * Transactions Service constructor
 *
 * @constructor
 */
const transactions = function (requestObj) {
    const oThis = this;

    // Assign request object
    _requestObj = requestObj;

    // Define the url prefix
    oThis.urlPrefix = '/users';
    oThis.urlSuffix = '/transactions';

    return oThis;
};

transactions.prototype = {


    /**
     * execute transaction
     *
     * @param {object} params
     *
     * @public
     */
    execute: function (params) {
        const oThis = this;
        var params = params || {};
            return _requestObj.post(oThis.urlPrefix + "/" + validate.getUserId(params) + oThis.urlSuffix, params);
    },

    /**
     * Get List of transactions for user
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
     * Get a transaction
     *
     * @param {object} params
     *
     * @public
     */
    get: function (params) {
        const oThis = this;
        var params = params || {};
        return _requestObj.get(oThis.urlPrefix + "/" + validate.getUserId(params) + oThis.urlSuffix +
            "/" + validate.getTransactionId(params), params);
    },

};

module.exports = transactions;