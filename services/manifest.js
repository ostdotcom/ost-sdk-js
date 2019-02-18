"use strict";

/**
 * Service Manifest
 *
 * @module services/v1/manifest
 */

const rootPrefix = ".."
  , requestKlass = require(rootPrefix + '/lib/request')
  , chainsKlass = require(rootPrefix + '/services/chains')
  , deviceManagersKlass = require(rootPrefix + '/services/device_managers')
  , devicesKlass = require(rootPrefix + '/services/devices')
  , pricePointsKlass = require(rootPrefix + '/services/price_points')
  , sessionsKlass = require(rootPrefix + '/services/sessions')
  , tokensKlass = require(rootPrefix + '/services/tokens')
  , usersKlass = require(rootPrefix + '/services/users')
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
  // Define services available in V2
  oThis.chains = new chainsKlass(_requestObj);
  oThis.device_managers = new deviceManagersKlass(_requestObj);
  oThis.devices = new devicesKlass(_requestObj);
  oThis.price_points = new pricePointsKlass(_requestObj);
  oThis.sessions = new sessionsKlass(_requestObj);
  oThis.tokens = new tokensKlass(_requestObj);
  oThis.users = new usersKlass(_requestObj);

  return oThis;
};

manifest.prototype = {

  // Services at /chains endpoint
  chains: null,

  // Services at /device_managers endpoint
  device_managers: null,

  // Services at /devices endpoint
  devices: null,

  // Services at /price_points endpoint
  price_points: null,

  // Services at /sessions endpoint
  sessions: null,

  // Services at /tokens endpoint
  tokens: null,

  // Services at /users endpoint
  users: null,


};

module.exports = manifest;