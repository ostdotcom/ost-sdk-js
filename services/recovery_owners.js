/**
 * recovery_owners Service
 *
 * @module services/recovery_owners
 */

const rootPrefix = ".."
    , validate = require(rootPrefix + '/lib/validate')
;

// hide request object
var _requestObj = null;

/**
 * recovery_owners service
 *
 * @constructor
 */
const recovery_owners = function (requestObj) {
    const oThis = this;

    // Assign request object
    _requestObj = requestObj;

    // Define the url prefix
    oThis.urlPrefix = '/users';
    oThis.urlSufix = '/recovery-owners';

    return oThis;
};

recovery_owners.prototype = {


    /**
     * Get recovery_owners
     *
     * @param {object} params
     *
     * @public
     */
    get: function (params) {
        const oThis = this;
        var params = params || {};
        return _requestObj.get(oThis.urlPrefix + "/" + validate.getUserId(params)  + oThis.urlSufix +
            "/" + validate.getRecoveryOwnerAddress(params), params);
    },
};

module.exports = recovery_owners;