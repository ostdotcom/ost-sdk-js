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

const airdropData = {amount: 0.001, list_type: 'all'};
const airdropStatusData = {};

describe('services/v0/user/airdrop', function () {

  it('Airdrop: should pass when response data keys match', async function() {
    const dupData = JSON.parse(JSON.stringify(airdropData));
    const response = await userService.airdropTokens(dupData).catch(function(e) {return e});
    assert.equal(response.success, true);
    assert.deepEqual(helper.responseKeys(response).sort(), ['success', 'data'].sort());
    assert.deepEqual(helper.responseKeys(response.data).sort(), ['airdrop_uuid'].sort());
    airdropStatusData.airdrop_uuid = response.data.airdrop_uuid;
  });

  it('Status: should pass when response data keys match', async function() {
    const dupData = JSON.parse(JSON.stringify(airdropStatusData));
    const response = await userService.airdropStatus(dupData).catch(function(e) {return e});
    assert.equal(response.success, true);
    assert.deepEqual(helper.responseKeys(response).sort(), ['success', 'data'].sort());
    assert.deepEqual(helper.responseKeys(response.data).sort(), ['airdrop_uuid', 'current_status', 'steps_complete'].sort());
  });

  it('Airdrop: should return promise', async function() {
    const dupData = JSON.parse(JSON.stringify(airdropData));
    const response = userService.airdropTokens(dupData).catch(function(e) {return e});
    assert.typeOf(response, 'Promise');
  });

  it('Status: should return promise', async function() {
    const dupData = JSON.parse(JSON.stringify(airdropStatusData));
    const response = userService.airdropStatus(dupData);
    assert.typeOf(response, 'Promise');
  });

  it('Airdrop: should fail when amount is 0', async function() {
    const dupData = JSON.parse(JSON.stringify(airdropData));
    dupData.amount = 0;
    const response = await userService.airdropTokens(dupData).catch(function(e) {return e});
    assert.equal(response.success, false);
  });

  it('Airdrop: should fail when list_type is not present', async function() {
    const dupData = JSON.parse(JSON.stringify(airdropData));
    delete dupData.list_type;
    const response = await userService.airdropTokens(dupData).catch(function(e) {return e});
    assert.equal(response.success, false);
  });

  it('Status: should fail when airdrop uuid is invalid', async function() {
    const dupData = JSON.parse(JSON.stringify(airdropStatusData));
    dupData.airdrop_uuid = 'abc';
    const response = await userService.airdropStatus(dupData).catch(function(e) {return e});
    assert.equal(response.success, false);
  });

  it('Status: should fail when airdrop uuid is undefined', async function() {
    const dupData = JSON.parse(JSON.stringify(airdropStatusData));
    dupData.airdrop_uuid = undefined;
    const response = await userService.airdropStatus(dupData).catch(function(e) {return e});
    assert.equal(response.success, false);
  });

});