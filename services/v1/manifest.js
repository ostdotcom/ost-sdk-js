"use strict";

/**
 * Service Manifest
 *
 * @module services/v1/manifest
 */

const rootPrefix = "../.."
  , requestKlass = require(rootPrefix + '/lib/request')
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

  return oThis;
};

manifest.prototype = {
};

module.exports = manifest;