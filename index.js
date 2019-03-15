"use strict";

/**
 * OST Javascript SDK
 *
 * @module index
 */

const rootPrefix = "."
  , serviceManifestKlass  = require(rootPrefix + '/services/manifest')
;

const OSTSDK = function (params) {
  const oThis = this;

  params = params || {};

  // Extract API major version
  const apiEndpointVersion = ((params.apiEndpoint || '').split("/")[4] || '').toLowerCase();
  if (apiEndpointVersion =="v2"){
    oThis.services = new serviceManifestKlass(params);
  } else{
    throw new Error('Api endpoint is invalid');
  }

};

module.exports = OSTSDK;