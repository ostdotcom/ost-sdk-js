"use strict";

/**
 * OST v1 Test Helper and config
 */

 // Load external packages
const chai = require('chai')
  , assert = chai.assert
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
  OST_KIT_TRANSFER_KIND: process.env.OST_KIT_TRANSFER_KIND,

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

  validateErrorResponse: function ( response, errorCode ) {
    //1. success flag should be false.
    assert.strictEqual(response.success, false, "response.success is not false");

    //2. err Object should be present.
    assert.typeOf( response.err, 'object', "response.err is not an Object");

    if ( errorCode ) {
      //3. code should be errorCode.
      assert.strictEqual(response.err.code, errorCode, "err.code is not " + errorCode);      
    }

    //4. error_data should be an array.
    if ( response.err.hasOwnProperty('error_data') ) {
      assert.isArray(response.err.error_data, "err.error_data is not an Array.");
    }

    //5. msg should be a String.
    if ( response.err.hasOwnProperty('msg') ) {
      assert.isString(response.err.msg, "err.msg is not a String");  
    }
    
    //6. internal_id should be a String.
    assert.isString(response.err.internal_id, "err.internal_id is not a String");

    //7. Should not include data 
    assert.notProperty(response, "data", "response.data property is present.");
  },

  validateSuccessResponse: function ( response, resultType ) {
    //1. success flag should be true.
    assert.strictEqual(response.success, true, "response.success is not true");

    //2. data should be an object.
    assert.typeOf(response.data, 'object', "response.data is not an Object");

    //3. Should not include err
    assert.notProperty(response, "err", "response.err property is present.");

    //4. Validate resultType
    if ( resultType ) {
      assert.strictEqual(response.data.result_type, resultType, "data.result_type is not '" + resultType + "'");

      let results = response.data[ resultType ];
      assert.isArray(results, "data." + resultType + " is not an Array.");
    }

  },

};

//Validate required ENV variables
if (!process.env.OST_KIT_API_ENDPOINT || !process.env.OST_KIT_API_KEY || !process.env.OST_KIT_API_SECRET
  || !process.env.OST_KIT_TRANSFER_FROM_UUID || !process.env.OST_KIT_TRANSFER_TO_UUID || !process.env.OST_KIT_TRANSFER_KIND) {
  console.log("USAGES: To run test cases, please define following ENV variables");
  console.log("----------------------------------------------------------------");
  console.log("export OST_KIT_API_ENDPOINT='https://playgroundapi.ost.com/'");
  console.log("export OST_KIT_API_KEY='3359e6b46dfccc305c29'");
  console.log("export OST_KIT_API_SECRET='79faff8d51498a98e7601bf09bba86b0765d4488a34416cce2455f2d82689273'");
  console.log("export OST_KIT_TRANSFER_FROM_UUID='cd890eeb-6376-48d4-9e28-d29527013a2d'");
  console.log("export OST_KIT_TRANSFER_TO_UUID='8acdbc49-6eb1-4555-9440-d961981cfeec'");
  console.log("export OST_KIT_TRANSFER_KIND='Purchase'");
  process.exit(1);
}

module.exports = new helperKlass();