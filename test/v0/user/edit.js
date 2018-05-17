// Load external packages
const chai = require('chai')
  , assert = chai.assert
;

// Load cache service
const rootPrefix = "../../.."
  , helper = require(rootPrefix + '/test/v0/helper')
  , OSTSDK = require(rootPrefix + '/index')
  , ostObj = new OSTSDK({apiEndpoint: helper.OST_KIT_API_ENDPOINT, apiKey: helper.OST_KIT_API_KEY, apiSecret: helper.OST_KIT_API_SECRET})
  , userService = ostObj.services.user
;

const userValidData = {name: 'Alice'};

describe('services/v0/user/edit', function () {

  it('FIRST PREPARE DATA FOR EDIT', async function() {
    const response = await userService.list().catch(function(e) {return e});
    userValidData.uuid = response.data.economy_users[0].id;
  });

  it('should pass when response data keys match', async function() {
    const dupData = JSON.parse(JSON.stringify(userValidData));
    dupData.name = dupData.name + ' ' + Math.round((new Date()).getTime() / 1000);
    const response = await userService.edit(dupData).catch(function(e) {return e});
    assert.equal(response.success, true);
    assert.deepEqual(helper.responseKeys(response).sort(), ['success', 'data'].sort());
    assert.deepEqual(helper.responseKeys(response.data).sort(), ['result_type', 'economy_users'].sort());
    assert.equal(response.data.result_type, "economy_users");
    assert.equal(response.data.economy_users.length, 1);
    assert.deepEqual(Object.keys(response.data.economy_users[0]).sort(), ['id', 'uuid', 'name', 'total_airdropped_tokens', 'token_balance'].sort());
  });

  it('should return promise', async function() {
    const dupData = JSON.parse(JSON.stringify(userValidData));
    dupData.name = dupData.name + ' ' + Math.round((new Date()).getTime() / 1000);
    const response = userService.edit(dupData).catch(function(e) {return e});
    assert.typeOf(response, 'Promise');
  });

  it('should fail when name is less than 3 chars', async function() {
    const dupData = JSON.parse(JSON.stringify(userValidData));
    dupData.name = "12";
    const response = await userService.edit(dupData).catch(function(e) {return e});
    assert.equal(response.success, false);
    assert.deepEqual(helper.errorFields(response).sort(), ['name'].sort());
  });

  it('should fail when name is more than 20 chars', async function() {
    const dupData = JSON.parse(JSON.stringify(userValidData));
    dupData.name = "123456789012345678901";
    const response = await userService.edit(dupData).catch(function(e) {return e});
    assert.equal(response.success, false);
    assert.deepEqual(helper.errorFields(response).sort(), ['name'].sort());
  });

  it('should fail when data is undefined', async function() {
    const dupData = undefined;
    const response = await userService.edit(dupData).catch(function(e) {return e});
    assert.equal(response.success, false);
    assert.deepEqual(helper.errorFields(response).sort(), ['uuid', 'name'].sort());
  });

  it('should fail when uuid is undefined', async function() {
    const dupData = JSON.parse(JSON.stringify(userValidData));
    dupData.uuid = undefined;
    const response = await userService.edit(dupData).catch(function(e) {return e});
    assert.equal(response.success, false);
    assert.deepEqual(helper.errorFields(response).sort(), ['uuid'].sort());
  });

  it('should fail when name is undefined', async function() {
    const dupData = JSON.parse(JSON.stringify(userValidData));
    dupData.name = undefined;
    const response = await userService.edit(dupData).catch(function(e) {return e});
    assert.equal(response.success, false);
    assert.deepEqual(helper.errorFields(response).sort(), ['name'].sort());
  });

});