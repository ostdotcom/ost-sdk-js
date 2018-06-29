"use strict";

/**
 * OST v0 Test Helper and config
 */
const myProcess  = require('process')
    , pid        = String( myProcess.pid )
;


const rootPrefix = "../../.."
;

const helperKlass = function () {};

helperKlass.prototype = {
  // API Endpoint and authentication details
  // For Travis detailed at: https://travis-ci.org/OpenSTFoundation/ost-sdk-js/settings
  OST_KIT_API_ENDPOINT: process.env.OST_KIT_API_ENDPOINT,
  OST_KIT_API_KEY: process.env.OST_KIT_API_KEY,
  OST_KIT_API_SECRET: process.env.OST_KIT_API_SECRET,
  OST_KIT_TRANSFER_FROM_UUID: process.env.OST_KIT_TRANSFER_FROM_UUID,
  OST_KIT_TRANSFER_TO_UUID: process.env.OST_KIT_TRANSFER_TO_UUID,

  // helper functions
  responseKeys: function (response) {
    return Object.keys(response);
  },

  errorKeys: function (errorResponse) {
    return Object.keys(errorResponse.err);
  },

  errorFields: function (errorResponse) {
    var errorFields = []
      , errorData = errorResponse.err.error_data;
    for (var i=0; i < errorData.length; i++) {
      errorFields = errorFields.concat(errorData[i].parameter);
    }
    return errorFields;
  },

  getActionName : function( name ){
    const divider = 1000,
      multiplier  = 10000
    ;

    let processId       = Number( pid ) ,
      processMultiplier = processId * multiplier,
      currentTimeStamp  = (new Date()).getTime() ,
      finalTimeStamp    =  Math.round( currentTimeStamp / divider)
    ;

    finalTimeStamp += processMultiplier;
    return name + " " + finalTimeStamp;
  }

};

//Validate required ENV variables
if (!process.env.OST_KIT_API_ENDPOINT || !process.env.OST_KIT_API_KEY || !process.env.OST_KIT_API_SECRET
  || !process.env.OST_KIT_TRANSFER_FROM_UUID || !process.env.OST_KIT_TRANSFER_TO_UUID) {
  console.log("USAGES: To run test cases, please define following ENV variables");
  console.log("----------------------------------------------------------------");
  console.log("export OST_KIT_API_ENDPOINT='https://playgroundapi.ost.com/'");
  console.log("export OST_KIT_API_KEY='3359e6b46dfccc305c29'");
  console.log("export OST_KIT_API_SECRET='79faff8d51498a98e7601bf09bba86b0765d4488a34416cce2455f2d82689273'");
  console.log("export OST_KIT_TRANSFER_FROM_UUID='cd890eeb-6376-48d4-9e28-d29527013a2d'");
  console.log("export OST_KIT_TRANSFER_TO_UUID='8acdbc49-6eb1-4555-9440-d961981cfeec'");
  process.exit(1);
}

module.exports = new helperKlass();