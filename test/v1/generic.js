// Load external packages
const chai = require('chai')
  , assert = chai.assert
;

// Load cache service
const rootPrefix = "../.."
  , helper = require(rootPrefix + '/test/v1/helper')
  , OSTSDK = require(rootPrefix + '/index')
;

describe('services/v1/generic', function () {

  it('should fail when api endpoint is invalid', async function() {
    const ostObj = new OSTSDK({apiEndpoint: "http://ost.com/v1/", apiKey: helper.OST_KIT_API_KEY, apiSecret: helper.OST_KIT_API_SECRET})
      , userService = ostObj.services.users
      , response = await userService.list().catch(function(e) {return e})
    ;

    helper.validateErrorResponse(response, "SOMETHING_WENT_WRONG");
  });

  it('should fail when api key is invalid', async function() {
    const ostObj = new OSTSDK({apiEndpoint: helper.OST_KIT_API_ENDPOINT, apiKey: 'a', apiSecret: helper.OST_KIT_API_SECRET})
      , userService = ostObj.services.users
      , response = await userService.list().catch(function(e) {return e})
    ;

    helper.validateErrorResponse(response, "UNAUTHORIZED");
  });

  it('should fail when api secret is invalid', async function() {
    const ostObj = new OSTSDK({apiEndpoint: helper.OST_KIT_API_ENDPOINT, apiKey: helper.OST_KIT_API_KEY, apiSecret: 'a'})
      , userService = ostObj.services.users
      , response = await userService.list().catch(function(e) {return e})
    ;

    helper.validateErrorResponse(response, "UNAUTHORIZED");

  });

  it('should pass when api details are valid', async function() {
    const ostObj = new OSTSDK({apiEndpoint: helper.OST_KIT_API_ENDPOINT, apiKey: helper.OST_KIT_API_KEY, apiSecret: helper.OST_KIT_API_SECRET})
      , userService = ostObj.services.users
      , response = await userService.list().catch(function(e) {return e})
    ;
    helper.validateSuccessResponse( response, "users" );
  });

});