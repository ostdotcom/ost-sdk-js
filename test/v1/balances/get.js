// Load external packages
const chai = require('chai')
  , assert = chai.assert
;

// Load cache service
const rootPrefix = "../../.."
  , helper = require(rootPrefix + '/test/v1/helper')
  , OSTSDK = require(rootPrefix + '/index')
  , ostObj = new OSTSDK({apiEndpoint: helper.OST_KIT_API_ENDPOINT, apiKey: helper.OST_KIT_API_KEY, apiSecret: helper.OST_KIT_API_SECRET})
  , balanceService = ostObj.services.balances
;

const id = '8338d43f-6a8e-4204-8e3a-392d183668a8';


describe('services/v1/balances/get', function () {

  it('Should return promise', async function () {
    const response = balanceService.get({id: id}).catch(function (e) {
      return e
    });
    assert.typeOf(response, 'Promise');
  });

  it('Should fail when request data is undefined', async function() {
    const id = undefined;
    try {
      const response = await balanceService.get({id: id}).catch(function(e) {return e});
    } catch (e) {
      assert.notEqual(e.message, '');
    }
  });

  it('Should fail when request data is empty object', async function() {
    const data = {};
    try {
      const response = await balanceService.get(data).catch(function(e) {return e});
    } catch (e) {
      assert.notEqual(e.message, '');
    }
  });

  it('Should fail when id is invalid', async function() {
    const data = {};
    data.id = '86268074-18d7-4118-942f-fc9c8fd1429d';
    const response = await balanceService.get(data).catch(function(e) {return e});
    assert.equal(response.success, false);
    assert.equal(response.err.code, 'NOT_FOUND');
  });

  it('Should fail when id belongs to someone else', async function() {
    const data = {};
    data.id = '86268074-18d7-4118-942f-fc9c8fd1429d';
    const response = await balanceService.get(data).catch(function(e) {return e});
    assert.equal(response.success, false);
    assert.equal(response.err.code, 'NOT_FOUND');
  });

  it('Should fail when id is comma separated list', async function() {
    const data = {};
    data.id = '86268074-18d7-4118-942f-fc9c8fd1429d,86268074-18d7-4118-942f-fc9c8fd1429d';
    const response = await balanceService.get(data).catch(function(e) {return e});
    assert.equal(response.success, false);
    assert.equal(response.err.code, 'NOT_FOUND');
  });

  it('Should pass when id is valid', async function() {

    const userService = ostObj.services.users;

    const userResponse = await userService.list().catch(function(e) {return e});
    assert.equal(userResponse.success, true);

    let id = userResponse.data.users[0].id;

    const data = {};
    data.id = id;
    const response = await balanceService.get(data).catch(function(e) {return e});
    assert.equal(response.success, true);
    assert.deepEqual(helper.responseKeys(response).sort(), ['success', 'data'].sort());
    assert.deepEqual(helper.responseKeys(response.data).sort(), ['airdropped_balance', 'available_balance'].sort());
  });

});

