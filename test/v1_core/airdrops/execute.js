// Load external packages
const chai = require('chai')
  , assert = chai.assert
;

// Load cache service
const rootPrefix = "../../..";

let helper        = null
  ,ostObj         = null
  ,airdropService = null
  ,airdropData    = {}
;

let startTests = function (  ) {

  if ( !airdropService ) {
    airdropService = ostObj.services.airdrops;
  }

  airdropData = {amount: 0.00001, airdropped: true, user_ids: helper.OST_KIT_TRANSFER_FROM_UUID + "," + helper.OST_KIT_TRANSFER_TO_UUID};

  it('Should return promise', async function() {
    const dupData = JSON.parse(JSON.stringify(airdropData));
    const response = airdropService.execute(dupData).catch(function(e) {return e});
    assert.typeOf(response, 'Promise');
  });

  it('Should fail when request data is undefined', async function() {
    const dupData = undefined;
    const response = await airdropService.execute(dupData).catch(function(e) {return e});
    assert.equal(response.success, false);
    assert.equal(response.err.code, 'BAD_REQUEST');
    assert.deepEqual(helper.errorFields(response).sort(), ['amount'].sort());
  });

  it('Should fail when request data is empty object', async function() {
    const dupData = {};
    const response = await airdropService.execute(dupData).catch(function(e) {return e});
    assert.equal(response.success, false);
    assert.equal(response.err.code, 'BAD_REQUEST');
    assert.deepEqual(helper.errorFields(response).sort(), ['amount'].sort());
  });

  it('Should fail when amount is blank', async function() {
    const dupData = JSON.parse(JSON.stringify(airdropData));
    dupData.amount = '';
    const response = await airdropService.execute(dupData).catch(function(e) {return e});
    assert.equal(response.success, false);
    assert.equal(response.err.code, 'BAD_REQUEST');
    assert.deepEqual(helper.errorFields(response).sort(), ['amount'].sort());
  });

  it('Should fail when amount is 0', async function() {
    const dupData = JSON.parse(JSON.stringify(airdropData));
    dupData.amount = 0;
    const response = await airdropService.execute(dupData).catch(function(e) {return e});
    assert.equal(response.success, false);
    assert.equal(response.err.code, 'BAD_REQUEST');
    assert.deepEqual(helper.errorFields(response).sort(), ['amount'].sort());
  });

  it('Should fail when amount is negative', async function() {
    const dupData = JSON.parse(JSON.stringify(airdropData));
    dupData.amount = -1;
    const response = await airdropService.execute(dupData).catch(function(e) {return e});
    assert.equal(response.success, false);
    assert.equal(response.err.code, 'BAD_REQUEST');
    assert.deepEqual(helper.errorFields(response).sort(), ['amount'].sort());
  });

  it('Should fail when amount is not available to be airdropped', async function() {
    const dupData = JSON.parse(JSON.stringify(airdropData));
    dupData.amount = '10000000000000000000000000000000000000000000000';
    const response = await airdropService.execute(dupData).catch(function(e) {return e});
    assert.equal(response.success, false);
    assert.equal(response.err.code, 'INSUFFICIENT_FUNDS');
    assert.deepEqual(helper.errorFields(response).sort(), ['amount'].sort());
  });

  it('Should fail when airdropped filter is not boolean', async function() {
    const dupData = JSON.parse(JSON.stringify(airdropData));
    dupData.airdropped = 'ABC';
    const response = await airdropService.execute(dupData).catch(function(e) {return e});
    assert.equal(response.success, false);
    assert.equal(response.err.code, 'BAD_REQUEST');
    assert.deepEqual(helper.errorFields(response).sort(), ['airdropped'].sort());
  });

  it('Should fail when atleast one user ids are invalid', async function() {
    const dupData = JSON.parse(JSON.stringify(airdropData));
    dupData.user_ids = dupData.user_ids + '1';
    const response = await airdropService.execute(dupData).catch(function(e) {return e});
    assert.equal(response.success, false);
    assert.equal(response.err.code, 'BAD_REQUEST');
    assert.deepEqual(helper.errorFields(response).sort(), ['user_ids'].sort());
  });

  it('Should fail when user ids has comma', async function() {
    const dupData = JSON.parse(JSON.stringify(airdropData));
    dupData.user_ids = ',';
    const response = await airdropService.execute(dupData).catch(function(e) {return e});
    assert.equal(response.success, false);
    assert.equal(response.err.code, 'BAD_REQUEST');
    assert.deepEqual(helper.errorFields(response).sort(), ['user_ids'].sort());
  });

  it('Should fail when user ids does not belong to my economy', async function() {
    const dupData = JSON.parse(JSON.stringify(airdropData));
    dupData.user_ids = '8f3e17a6-34c8-415b-9aae-6f9a39e872ad';
    const response = await airdropService.execute(dupData).catch(function(e) {return e});
    assert.equal(response.success, false);
    assert.equal(response.err.code, 'BAD_REQUEST');
    assert.deepEqual(helper.errorFields(response).sort(), ['user_ids'].sort());
  });

  it('Should fail when airdropped is true and new user ids', async function() {
    const userService = ostObj.services.users;
    const usersResponse = await userService.create({name: 'Alice'}).catch(function(e) {return e});

    const dupData = JSON.parse(JSON.stringify(airdropData));
    dupData.user_ids = usersResponse.data.user.id;
    const response = await airdropService.execute(dupData).catch(function(e) {return e});
    assert.equal(response.success, false);
    assert.equal(response.err.code, 'UNPROCESSABLE_ENTITY');
  });

  it('Should fail when airdropped is false and old user ids', async function() {
    const dupData = JSON.parse(JSON.stringify(airdropData));
    dupData.airdropped = false;
    const response = await airdropService.execute(dupData).catch(function(e) {return e});
    assert.equal(response.success, false);
    assert.equal(response.err.code, 'UNPROCESSABLE_ENTITY');
  });

  it('Should pass when only amount is sent', async function() {
    const dupData = {amount: 0.00001};
    const response = await airdropService.execute(dupData).catch(function(e) {return e});
    assert.equal(response.success, true);
  });

  it('Should pass when only amount and airdropped is sent', async function() {
    const dupData = JSON.parse(JSON.stringify(airdropData));
    delete dupData.user_ids;
    const response = await airdropService.execute(dupData).catch(function(e) {return e});
    assert.equal(response.success, true);
  });

  it('Should pass when only amount and user_ids is sent', async function() {
    const dupData = JSON.parse(JSON.stringify(airdropData));
    delete dupData.airdropped;
    const response = await airdropService.execute(dupData).catch(function(e) {return e});
    assert.equal(response.success, true);
  });

  it('Should pass when airdropped is false and new user ids', async function() {
    const userService = ostObj.services.users;
    const usersResponse = await userService.create({name: 'Alice'}).catch(function(e) {return e});

    const dupData = JSON.parse(JSON.stringify(airdropData));
    dupData.user_ids = usersResponse.data.user.id;
    dupData.airdropped = false;
    const response = await airdropService.execute(dupData).catch(function(e) {return e});
    assert.equal(response.success, true);
  });

  it('Should pass when response data keys match', async function() {
    const dupData = JSON.parse(JSON.stringify(airdropData));
    const response = await airdropService.execute(dupData).catch(function(e) {return e});
    assert.equal(response.success, true);
    assert.deepEqual(helper.responseKeys(response).sort(), ['success', 'data'].sort());
    assert.deepEqual(helper.responseKeys(response.data).sort(), ['result_type', 'airdrop'].sort());
    assert.deepEqual(helper.responseKeys(response.data.airdrop).sort(), ['id', 'current_status', 'steps_complete'].sort());
  });

};

module.exports = {
  startTests: startTests
  , setOSTSDK: function ( ostSdk ) {
    ostObj = ostSdk;
  }
  , setHelper: function ( helperObj ) {
    helper = helperObj;
  }
};