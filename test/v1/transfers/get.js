// Load external packages
const chai = require('chai')
  , assert = chai.assert
;

// Load cache service
const rootPrefix = "../../.."
  , helper = require(rootPrefix + '/test/v1/helper')
  , OSTSDK = require(rootPrefix + '/index')
  , ostObj = new OSTSDK({apiEndpoint: helper.OST_KIT_API_ENDPOINT, apiKey: helper.OST_KIT_API_KEY, apiSecret: helper.OST_KIT_API_SECRET})
  , transferService = ostObj.services.transfers
;

const transferData = {id: ''};

describe('services/v1/transfers/get', function () {

  it('Should return promise', async function() {
    const dupData = JSON.parse(JSON.stringify(transferData));
    dupData.id = '1';
    const response = transferService.get(dupData).catch(function(e) {return e});
    assert.typeOf(response, 'Promise');
  });

  it('Should fail when request data is undefined', async function() {
    const dupData = undefined;
    try {
      const response = await transferService.get(dupData).catch(function(e) {return e});
    } catch (e) {
      assert.notEqual(e.message, '');
    }
  });

  it('Should fail when request data is empty object', async function() {
    const dupData = {};
    try {
      const response = await transferService.get(dupData).catch(function(e) {return e});
    } catch (e) {
      assert.notEqual(e.message, '');
    }
  });

  it('Should pass when id is blank, but will return the list', async function() {
    const dupData = JSON.parse(JSON.stringify(transferData));
    dupData.id = '';
    const response = await transferService.get(dupData).catch(function(e) {return e});
    assert.equal(response.success, true);
  });

  it('Should fail when id is invalid', async function() {
    const dupData = JSON.parse(JSON.stringify(transferData));
    dupData.id = '86268074-18d7-4118-942f-fc9c8fd1429d111';
    const response = await transferService.get(dupData).catch(function(e) {return e});
    assert.equal(response.success, false);
    assert.equal(response.err.code, 'BAD_REQUEST');
    assert.deepEqual(helper.errorFields(response).sort(), ['id'].sort());
  });

  it('Should fail when id belongs to someone else', async function() {
    const dupData = JSON.parse(JSON.stringify(transferData));
    dupData.id = '25203d79-7ebd-458d-9231-31844ae2bb9f';
    const response = await transferService.get(dupData).catch(function(e) {return e});
    assert.equal(response.success, false);
    assert.equal(response.err.code, 'BAD_REQUEST');
    assert.deepEqual(helper.errorFields(response).sort(), ['id'].sort());
  });

  it('Should fail when id is comma separated list', async function() {
    const dupData = JSON.parse(JSON.stringify(transferData));
    dupData.id = '86268074-18d7-4118-942f-fc9c8fd1429d,86268074-18d7-4118-942f-fc9c8fd1429d';
    const response = await transferService.get(dupData).catch(function(e) {return e});
    assert.equal(response.success, false);
    assert.equal(response.err.code, 'BAD_REQUEST');
    assert.deepEqual(helper.errorFields(response).sort(), ['id'].sort());
  });

  it('Should pass when id is valid', async function() {
    const transferResponse = await transferService.execute({to_address: '0x062ded9304cd96af6fa4780d6d6fd873e2b52410', amount: 1}).catch(function(e) {return e});
    //console.log(JSON.stringify(transferResponse));

    const dupData = JSON.parse(JSON.stringify(transferData));
    dupData.id = transferResponse.data.transfer.id;
    const response = await transferService.get(dupData).catch(function(e) {return e});
    assert.equal(response.success, true);
    assert.deepEqual(helper.responseKeys(response).sort(), ['success', 'data'].sort());
    assert.deepEqual(helper.responseKeys(response.data).sort(), ['result_type', 'transfer'].sort());
    assert.deepEqual(helper.responseKeys(response.data.transfer).sort(), ['id', 'from_address', 'to_address', 'amount', 'transaction_hash', 'timestamp', 'status', 'gas_price', 'gas_used', 'block_number', 'chain_id'].sort());

    assert.exists(response.data.transfer.id);
    assert.exists(response.data.transfer.from_address);
    assert.exists(response.data.transfer.to_address);
    assert.exists(response.data.transfer.amount);
    assert.exists(response.data.transfer.timestamp);
    assert.exists(response.data.transfer.status);
    assert.exists(response.data.transfer.gas_price);
    assert.exists(response.data.transfer.chain_id);
  });

});