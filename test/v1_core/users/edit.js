// Load external packages
const chai = require('chai')
  , assert = chai.assert
;

// Load cache service
const rootPrefix = "../../.."
;

const userValidData = {name: 'Alice'};

let helper          = null
  , ostObj          = null
  , logMe           = false
  , userService     = null
;

let startTests = function () {

  logMe = helper.DEBUG;
  userService = userService || ostObj.services.users;

  it('FIRST PREPARE DATA FOR EDIT', async function() {
    const response = await userService.list().catch(function(e) {return e});
    userValidData.id = response.data.users[0].id;
  });

  it('should pass when response data keys match', async function() {
    const dupData = JSON.parse(JSON.stringify(userValidData));
    dupData.name = helper.getActionName( dupData.name );
    const response = await userService.edit(dupData).catch(function(e) {return e});
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
    dupData.name = helper.getActionName( dupData.name );
    const response = userService.edit(dupData).catch(function(e) {return e});
    assert.typeOf(response, 'Promise');
  });

  it('should fail when data is undefined', async function() {
    const dupData = undefined;
    try {
      const response = await userService.edit(dupData).catch(function(e) {return e});
    } catch (e) {
      assert.notEqual(e.message, '');
    }
  });

  it('should fail when id is undefined', async function() {
    const dupData = JSON.parse(JSON.stringify(userValidData));
    dupData.id = undefined;
    try {
      const response = await userService.edit(dupData).catch(function(e) {return e});
    } catch (e) {
      assert.notEqual(e.message, '');
    }
  });

  it('should fail when id is invalid', async function() {
    const dupData = JSON.parse(JSON.stringify(userValidData));
    dupData.id = "12";
    const response = await userService.edit(dupData).catch(function(e) {return e});
    assert.equal(response.success, false);
    assert.deepEqual(helper.errorFields(response).sort(), ['id'].sort());
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

  it('should fail when name has stop word', async function() {
    const dupData = JSON.parse(JSON.stringify(userValidData));
    dupData.name = "Fuck";
    const response = await userService.edit(dupData).catch(function(e) {return e});
    assert.equal(response.success, false);
    assert.deepEqual(helper.errorFields(response).sort(), ['name'].sort());
  });

  it('should fail when name has special chars', async function() {
    const dupData = JSON.parse(JSON.stringify(userValidData));
    dupData.name = "User &^ 1";
    const response = await userService.edit(dupData).catch(function(e) {return e});
    assert.equal(response.success, false);
    assert.deepEqual(helper.errorFields(response).sort(), ['name'].sort());
  });

  it('should fail when name is undefined', async function() {
    const dupData = JSON.parse(JSON.stringify(userValidData));
    dupData.name = undefined;
    const response = await userService.edit(dupData).catch(function(e) {return e});
    assert.equal(response.success, false);
    assert.deepEqual(helper.errorFields(response).sort(), ['name'].sort());
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