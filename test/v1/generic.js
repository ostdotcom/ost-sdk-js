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


    assert.equal(response.success, false);
    assert.equal(response.err.code, 'SOMETHING_WENT_WRONG');
    assert.deepEqual(helper.responseKeys(response).sort(), ['success', 'err'].sort());
    assert.deepEqual(helper.responseKeys(response.err).sort(), ['code', 'error_data', 'internal_id', 'msg'].sort());
    assert.isArray(response.err.error_data);
  });

  it('should fail when api key is invalid', async function() {
    const ostObj = new OSTSDK({apiEndpoint: helper.OST_KIT_API_ENDPOINT, apiKey: 'a', apiSecret: helper.OST_KIT_API_SECRET})
      , userService = ostObj.services.users
      , response = await userService.list().catch(function(e) {return e})
    ;
    console.log("helper.OST_KIT_API_ENDPOINT", helper.OST_KIT_API_ENDPOINT);
    //1. success flag should be false.
    assert.strictEqual(response.success, false);

    //2. err Object should be present.
    assert.typeOf( response.err, 'object');

    //3. code should be UNAUTHORIZED.
    assert.strictEqual(response.err.code, 'UNAUTHORIZED');

    //4. both err & success key should be present.
    assert.deepEqual(helper.responseKeys(response).sort(), ['success', 'err'].sort());

    //5. err object should contain code, error_data & msg
    assert.deepEqual(helper.responseKeys(response.err).sort(), ['code', 'error_data', 'msg'].sort());

    //6. error_data should be an array.
    assert.isArray(response.err.error_data);
  });

  it('should fail when api secret is invalid', async function() {
    const ostObj = new OSTSDK({apiEndpoint: helper.OST_KIT_API_ENDPOINT, apiKey: helper.OST_KIT_API_KEY, apiSecret: 'a'})
      , userService = ostObj.services.users
      , response = await userService.list().catch(function(e) {return e});
    assert.equal(response.success, false);
    assert.equal(response.err.code, 'UNAUTHORIZED');
    assert.deepEqual(helper.responseKeys(response).sort(), ['success', 'err'].sort());
    assert.deepEqual(helper.responseKeys(response.err).sort(), ['code', 'error_data', 'internal_id', 'msg'].sort());
    assert.isArray(response.err.error_data);
  });

  it('should pass when api details are valid', async function() {
    const ostObj = new OSTSDK({apiEndpoint: helper.OST_KIT_API_ENDPOINT, apiKey: helper.OST_KIT_API_KEY, apiSecret: helper.OST_KIT_API_SECRET})
      , userService = ostObj.services.users
      , response = await userService.list().catch(function(e) {return e});
    assert.equal(response.success, true);
    assert.deepEqual(helper.responseKeys(response).sort(), ['success', 'data'].sort());
  });

});