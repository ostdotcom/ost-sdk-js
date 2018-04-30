"use strict";

/**
 * Service manifest
 *
 * @module services/v0/manifest
 */
const rootPrefix = "../.."
  , requestKlass = require(rootPrefix + '/lib/request')
  , userKlass = require(rootPrefix + '/services/v0/user')
  , transactionTypeKlass = require(rootPrefix + '/services/v0/transaction_type')
;

// hide request object
var _requestObj = null;

/**
 * Service manifest constructor
 *
 * @constructor
 */
const manifest = function (params) {
  const oThis = this;

  // Create request object
  _requestObj = new requestKlass(params);

  // Define services available in V0
  oThis.user = new userKlass(_requestObj);
  oThis.transactionType = new transactionTypeKlass(_requestObj);

  return oThis;
};

manifest.prototype = {

  // Services at /users endpoint
  user: null,

  // Services at /transaction-types endpoint
  transactionType: null
};

module.exports = manifest;