// Load external packages
const chai = require('chai')
  , assert = chai.assert
;

// Load cache service
const rootPrefix = "../.."
  , helper = require(rootPrefix + '/test/v0/helper')
  , OSTSDK = require(rootPrefix + '/index')
;

describe('services/v0/generic', function () {

  it('should fail when api endpoint is invalid', async function() {
    const ostObj = new OSTSDK({apiEndpoint: "http://ost.com", apiKey: helper.OST_KIT_API_KEY, apiSecret: helper.OST_KIT_API_SECRET})
      , userService = ostObj.services.user
      , response = await userService.list().catch(function(e) {return e});
    assert.equal(response.success, false);
    assert.equal(response.err.code, 'SOMETHING_WENT_WRONG');
  });

  it('should fail when api key is invalid', async function() {
    const ostObj = new OSTSDK({apiEndpoint: helper.OST_KIT_API_ENDPOINT, apiKey: 'a', apiSecret: helper.OST_KIT_API_SECRET})
      , userService = ostObj.services.user
      , response = await userService.list().catch(function(e) {return e});
    assert.equal(response.success, false);
    //assert.equal(response.err.code, 'UNAUTHORIZED');
    assert.deepEqual(helper.responseKeys(response).sort(), ['success', 'err'].sort());
  });

  it('should fail when api secret is invalid', async function() {
    const ostObj = new OSTSDK({apiEndpoint: helper.OST_KIT_API_ENDPOINT, apiKey: helper.OST_KIT_API_KEY, apiSecret: 'a'})
      , userService = ostObj.services.user
      , response = await userService.list().catch(function(e) {return e});
    assert.equal(response.success, false);
    //assert.equal(response.err.code, 'UNAUTHORIZED');
    assert.deepEqual(helper.responseKeys(response).sort(), ['success', 'err'].sort());
  });

  it('should pass when api details are valid', async function() {
    const ostObj = new OSTSDK({apiEndpoint: helper.OST_KIT_API_ENDPOINT, apiKey: helper.OST_KIT_API_KEY, apiSecret: helper.OST_KIT_API_SECRET})
      , userService = ostObj.services.user
      , response = await userService.list().catch(function(e) {return e});
    assert.equal(response.success, true);
    assert.deepEqual(helper.responseKeys(response).sort(), ['success', 'data'].sort());
  });

});