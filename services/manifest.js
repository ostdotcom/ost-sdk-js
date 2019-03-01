"use strict";

/**
 * Service Manifest
 *
 * @module services/manifest
 */

const rootPrefix = ".."
  , requestKlass = require(rootPrefix + '/lib/request')
  , chainsKlass = require(rootPrefix + '/services/chains')
  , devicesKlass = require(rootPrefix + '/services/devices')
  , pricePointsKlass = require(rootPrefix + '/services/price_points')
  , sessionsKlass = require(rootPrefix + '/services/sessions')
  , tokensKlass = require(rootPrefix + '/services/tokens')
  , usersKlass = require(rootPrefix + '/services/users')
  , balanceKlass = require(rootPrefix + '/services/balance')
  , deviceManagersKlass = require(rootPrefix + '/services/device_managers')
  , recoveryOwnersKlass = require(rootPrefix + '/services/recovery_owners')
  , rulesKlass = require(rootPrefix + '/services/rules')
  , transactionsKlass = require(rootPrefix + '/services/transactions')

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

  // Define services
  oThis.chains = new chainsKlass(_requestObj);
  oThis.devices = new devicesKlass(_requestObj);
  oThis.price_points = new pricePointsKlass(_requestObj);
  oThis.sessions = new sessionsKlass(_requestObj);
  oThis.tokens = new tokensKlass(_requestObj);
  oThis.users = new usersKlass(_requestObj);
  oThis.balance = new balanceKlass(_requestObj);
  oThis.device_managers = new deviceManagersKlass(_requestObj);
  oThis.recovery_owners = new recoveryOwnersKlass(_requestObj);
  oThis.rules = new rulesKlass(_requestObj);
  oThis.transactions = new transactionsKlass(_requestObj);

  return oThis;
};

manifest.prototype = {

  chains: null,

  devices: null,

  price_points: null,

  sessions: null,

  tokens: null,

  users: null,

  balance: null,

  device_managers: null,

  recovery_owners: null,

  rules: null,

  transactions: null,

};

module.exports = manifest;