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

const userValidData = {name: 'Alice'};

describe('services/v1/user/create', function () {

  it('should pass when response data keys match', async function() {
    const dupData = JSON.parse(JSON.stringify(userValidData));
    dupData.name = dupData.name + ' ' + Math.round((new Date()).getTime() / 1000);
    const response = await userService.create(dupData).catch(function(e) {return e});
    assert.equal(response.success, true);
    assert.deepEqual(helper.responseKeys(response).sort(), ['success', 'data'].sort());
    assert.deepEqual(helper.responseKeys(response.data).sort(), ['result_type', 'user'].sort());
    assert.equal(response.data.result_type, "user");
    assert.deepEqual(Object.keys(response.data.user).sort(), ['id', 'addresses', 'name', 'airdropped_tokens', 'token_balance'].sort());
    assert.equal(response.data.user.addresses.length, 1);
    assert.equal(response.data.user.addresses[0].length, 2);
    assert.exists(response.data.user.addresses[0][0]);
    assert.exists(response.data.user.addresses[0][1]);
  });

  it('should return promise', async function() {
    const dupData = JSON.parse(JSON.stringify(userValidData));
    dupData.name = dupData.name + ' ' + Math.round((new Date()).getTime() / 1000);
    const response = userService.create(dupData).catch(function(e) {return e});
    assert.typeOf(response, 'Promise');
  });

  it('should fail when name is less than 3 chars', async function() {
    const dupData = JSON.parse(JSON.stringify(userValidData));
    dupData.name = "12";
    const response = await userService.create(dupData).catch(function(e) {return e});
    assert.equal(response.success, false);
    assert.deepEqual(helper.errorFields(response).sort(), ['name'].sort());
  });

  it('should fail when name is more than 20 chars', async function() {
    const dupData = JSON.parse(JSON.stringify(userValidData));
    dupData.name = "123456789012345678901";
    const response = await userService.create(dupData).catch(function(e) {return e});
    assert.equal(response.success, false);
    assert.deepEqual(helper.errorFields(response).sort(), ['name'].sort());
  });

  it('should fail when name has stop word', async function() {
    const dupData = JSON.parse(JSON.stringify(userValidData));
    dupData.name = "Fuck";
    const response = await userService.create(dupData).catch(function(e) {return e});
    assert.equal(response.success, false);
    assert.deepEqual(helper.errorFields(response).sort(), ['name'].sort());
  });

  it('should fail when name has special chars', async function() {
    const dupData = JSON.parse(JSON.stringify(userValidData));
    dupData.name = "User &^ 1";
    const response = await userService.create(dupData).catch(function(e) {return e});
    assert.equal(response.success, false);
    assert.deepEqual(helper.errorFields(response).sort(), ['name'].sort());
  });

  it('should pass when data is undefined', async function() {
    const dupData = undefined;
    const response = await userService.create(dupData).catch(function(e) {return e});
    assert.equal(response.success, true);
  });

  it('should pass when name is undefined', async function() {
    const dupData = JSON.parse(JSON.stringify(userValidData));
    dupData.name = undefined;
    const response = await userService.create(dupData).catch(function(e) {return e});
    assert.equal(response.success, true);
  });

  it('should pass when name is blank', async function() {
    const dupData = JSON.parse(JSON.stringify(userValidData));
    dupData.name = '';
    const response = await userService.create(dupData).catch(function(e) {return e});
    assert.equal(response.success, true);
  });

});