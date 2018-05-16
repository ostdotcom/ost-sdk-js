// Load external packages
const chai = require('chai')
  , assert = chai.assert
;

// Load cache service
const rootPrefix = "../../.."
  , helper = require(rootPrefix + '/test/v1/helper')
  , OSTSDK = require(rootPrefix + '/index')
  , ostObj = new OSTSDK({apiEndpoint: helper.OST_KIT_API_ENDPOINT, apiKey: helper.OST_KIT_API_KEY, apiSecret: helper.OST_KIT_API_SECRET})
  , userService = ostObj.services.users
;

const userData = {id: ''};

describe('services/v1/users/get', function () {

  it('Should return promise', async function() {
    const dupData = JSON.parse(JSON.stringify(userData));
    const response = userService.get(dupData).catch(function(e) {return e});
    assert.typeOf(response, 'Promise');
  });

  it('Should fail when request data is undefined', async function() {
    const dupData = undefined;
    try {
      const response = await userService.get(dupData).catch(function(e) {return e});
    } catch (e) {
      assert.notEqual(e.message, '');
    }
  });

  it('Should fail when request data is empty object', async function() {
    const dupData = {};
    try {
      const response = await userService.get(dupData).catch(function(e) {return e});
    } catch (e) {
      assert.notEqual(e.message, '');
    }
  });

  it('Should pass when id is blank, but will return the list', async function() {
    const dupData = JSON.parse(JSON.stringify(userData));
    dupData.id = '';
    const response = await userService.get(dupData).catch(function(e) {return e});
    assert.equal(response.success, true);
  });

  it('Should fail when id is invalid', async function() {
    const dupData = JSON.parse(JSON.stringify(userData));
    dupData.id = '86268074-18d7-4118-942f-fc9c8fd1429d111';
    const response = await userService.get(dupData).catch(function(e) {return e});
    assert.equal(response.success, false);
    assert.equal(response.err.code, 'BAD_REQUEST');
    assert.deepEqual(helper.errorFields(response).sort(), ['id'].sort());
  });

  it('Should fail when id belongs to someone else', async function() {
    const dupData = JSON.parse(JSON.stringify(userData));
    dupData.id = '4a090517-c16a-4f1a-bbca-6987059da51c';
    console.log(JSON.stringify(dupData));
    const response = await userService.get(dupData).catch(function(e) {return e});
    console.log(JSON.stringify(response));
    assert.equal(response.success, false);
    assert.equal(response.err.code, 'BAD_REQUEST');
    assert.deepEqual(helper.errorFields(response).sort(), ['id'].sort());
  });

  it('Should fail when id is comma separated list', async function() {
    const dupData = JSON.parse(JSON.stringify(userData));
    dupData.id = '86268074-18d7-4118-942f-fc9c8fd1429d,86268074-18d7-4118-942f-fc9c8fd1429d';
    const response = await userService.get(dupData).catch(function(e) {return e});
    assert.equal(response.success, false);
    assert.equal(response.err.code, 'BAD_REQUEST');
    assert.deepEqual(helper.errorFields(response).sort(), ['id'].sort());
  });

  it('Should pass when id is valid', async function() {
    const userResponse = await userService.create({name: 'ABC'}).catch(function(e) {return e});
    console.log(JSON.stringify(userResponse));

    const dupData = JSON.parse(JSON.stringify(userData));
    dupData.id = userResponse.data.user.id;
    const response = await userService.get(dupData).catch(function(e) {return e});
    assert.deepEqual(helper.responseKeys(response).sort(), ['success', 'data'].sort());
    assert.deepEqual(helper.responseKeys(response.data).sort(), ['result_type', 'user'].sort());
    assert.equal(response.data.result_type, "user");
    assert.deepEqual(Object.keys(response.data.user).sort(), ['id', 'addresses', 'name', 'airdropped_tokens', 'token_balance'].sort());
    assert.equal(response.data.user.addresses.length, 1);
    assert.equal(response.data.user.addresses[0].length, 2);
    assert.exists(response.data.user.addresses[0][0]);
    assert.exists(response.data.user.addresses[0][1]);
  });

});