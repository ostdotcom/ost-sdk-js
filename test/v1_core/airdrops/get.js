// Load external packages
const chai = require('chai')
  , assert = chai.assert
;

// Load cache service
const rootPrefix = "../../.."
    , OSTSDK     = require(rootPrefix + '/index')
;

const airdropData = {id: ''};

let  helper         = null
  , ostObj          = null
  , airdropService  = null
;

let startTests = function ( it ) {

  if ( !helper ) {
    helper = require(rootPrefix + '/test/v1/helper');
  }

  ostObj = ostObj || new OSTSDK({apiEndpoint: helper.OST_KIT_API_ENDPOINT, apiKey: helper.OST_KIT_API_KEY, apiSecret: helper.OST_KIT_API_SECRET}) ;

  if ( !airdropService ) {
    airdropService = ostObj.services.airdrops
  }

  it('Should return promise', async function() {
    const dupData = JSON.parse(JSON.stringify(airdropData));
    const response = airdropService.get(dupData).catch(function(e) {return e});
    assert.typeOf(response, 'Promise');
  });

  it('Should fail when request data is undefined', async function() {
    const dupData = undefined;
    try {
      const response = await airdropService.get(dupData).catch(function(e) {return e});
    } catch (e) {
      assert.notEqual(e.message, '');
    }
  });

  it('Should fail when request data is empty object', async function() {
    const dupData = {};
    try {
      const response = await airdropService.get(dupData).catch(function(e) {return e});
    } catch (e) {
      assert.notEqual(e.message, '');
    }
  });

  it('Should pass when id is blank, but will return the list', async function() {
    const dupData = JSON.parse(JSON.stringify(airdropData));
    dupData.id = '';
    const response = await airdropService.get(dupData).catch(function(e) {return e});
    assert.equal(response.success, true);
  });

  it('Should fail when id is invalid', async function() {
    const dupData = JSON.parse(JSON.stringify(airdropData));
    dupData.id = '86268074-18d7-4118-942f-fc9c8fd1429d111';
    const response = await airdropService.get(dupData).catch(function(e) {return e});
    assert.equal(response.success, false);
    assert.equal(response.err.code, 'NOT_FOUND');
  });

  it('Should fail when id belongs to someone else', async function() {
    const dupData = JSON.parse(JSON.stringify(airdropData));
    dupData.id = '86268074-18d7-4118-942f-fc9c8fd1429d';
    const response = await airdropService.get(dupData).catch(function(e) {return e});
    assert.equal(response.success, false);
    assert.equal(response.err.code, 'NOT_FOUND');
  });

  it('Should fail when id is comma separated list', async function() {
    const dupData = JSON.parse(JSON.stringify(airdropData));
    dupData.id = '86268074-18d7-4118-942f-fc9c8fd1429d,86268074-18d7-4118-942f-fc9c8fd1429d';
    const response = await airdropService.get(dupData).catch(function(e) {return e});
    assert.equal(response.success, false);
    assert.equal(response.err.code, 'NOT_FOUND');
  });

  it('Should pass when id is valid', async function() {
    const airdropResponse = await airdropService.execute({amount: 0.00001}).catch(function(e) {return e});
    //console.log(JSON.stringify(airdropResponse));

    const dupData = JSON.parse(JSON.stringify(airdropData));
    dupData.id = airdropResponse.data.airdrop.id;
    const response = await airdropService.get(dupData).catch(function(e) {return e});
    assert.equal(response.success, true);
    assert.deepEqual(helper.responseKeys(response).sort(), ['success', 'data'].sort());
    assert.deepEqual(helper.responseKeys(response.data).sort(), ['result_type', 'airdrop'].sort());
    assert.deepEqual(helper.responseKeys(response.data.airdrop).sort(), ['id', 'current_status', 'steps_complete'].sort());
  });

};

module.exports = {
  startTests: startTests
};