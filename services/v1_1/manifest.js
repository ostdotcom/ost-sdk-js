"use strict";

/**
 * Service Manifest
 *
 * @module services/v1/manifest
 */

const rootPrefix = "../.."
  , requestKlass = require(rootPrefix + '/lib/request')
  , actionsKlass = require(rootPrefix + '/services/v1/actions')
  , airdropsKlass = require(rootPrefix + '/services/v1/airdrops')
  , tokenKlass = require(rootPrefix + '/services/v1/token')
  , transactionsKlass = require(rootPrefix + '/services/v1/transactions')
  , transfersKlass = require(rootPrefix + '/services/v1/transfers')
  , usersKlass = require(rootPrefix + '/services/v1/users')
  , balancesKlass = require(rootPrefix + '/services/v1_1/balances')
  , ledgerKlass = require(rootPrefix + '/services/v1_1/ledger')
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

  // Define services available in V1
  oThis.actions = new actionsKlass(_requestObj);
  oThis.airdrops = new airdropsKlass(_requestObj);
  oThis.token = new tokenKlass(_requestObj);
  oThis.transactions = new transactionsKlass(_requestObj);
  oThis.transfers = new transfersKlass(_requestObj);
  oThis.users = new usersKlass(_requestObj);
  oThis.balances = new balancesKlass(_requestObj);
  oThis.ledger = new ledgerKlass(_requestObj);

  return oThis;
};

manifest.prototype = {

  // Services at /actions endpoint
  actions: null,

  // Services at /airdrops endpoint
  airdrops: null,

  // Services at /token endpoint
  token: null,

  // Services at /transactions endpoint
  transactions: null,

  // Services at /transfers endpoint
  transfers: null,

  // Services at /users endpoint
  users: null,

  // Services at /balances endpoint
  balances: null,

  // Services at /ledger endpoint
  ledger: null

};

module.exports = manifest;