"use strict";

/**
 * Service manifest
 *
 * @module services/v0/manifest
 */
const rootPrefix = "../.."
  , requestKlass = require(rootPrefix + '/lib/request')
  , userKlass = require(rootPrefix + '/services/v0/user')
  , transactionKindKlass = require(rootPrefix + '/services/v0/transaction_kind')
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
  oThis.transactionKind = new transactionKindKlass(_requestObj);

  return oThis;
};

manifest.prototype = {

  // Services at /users endpoint
  user: null,

  // Services at /transaction-types endpoint
  transactionKind: null
};

module.exports = manifest;