"use strict";

/**
 * OST Javascript SDK
 *
 * @module index
 */

const rootPrefix = "."
  , serviceV0ManifestKlass    = require(rootPrefix + '/services/v0/manifest')
  , serviceV1ManifestKlass    = require(rootPrefix + '/services/v1/manifest')
  , serviceV1_1ManifestKlass  = require(rootPrefix + '/services/v1_1/manifest')
;

const OSTSDK = function (params) {
  const oThis = this;

  params = params || {};

  // Extract API major version
  const apiEndpointVersion = ((params.apiEndpoint || '').split("/")[3] || '').toLowerCase();
  oThis.apiEndpointMajorVersion = (apiEndpointVersion.split('.')[0] || '');

  // Provide access to version specific API endpoints
  if (apiEndpointVersion == '') {
    //console.warn("You are using an deprecated version of OST API. Please update to the latest version.");
    oThis.services = new serviceV0ManifestKlass(params);
  } else if (apiEndpointVersion == 'v1') {
    oThis.services = new serviceV1ManifestKlass(params);
  } else if (apiEndpointVersion == 'v1.1') {
    oThis.services = new serviceV1_1ManifestKlass(params);
  } else {
    throw new Error('Api endpoint is invalid');
  }

};

module.exports = OSTSDK;