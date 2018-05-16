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

const transferData = {to_address: '0x062ded9304cd96af6fa4780d6d6fd873e2b52410', amount: 1};

describe('services/v1/transfers/execute', function () {

  it('Should return promise', async function() {
    const dupData = JSON.parse(JSON.stringify(transferData));
    const response = transferService.execute(dupData).catch(function(e) {return e});
    assert.typeOf(response, 'Promise');
  });

  it('Should fail when request data is undefined', async function() {
    const dupData = undefined;
    const response = await transferService.execute(dupData).catch(function(e) {return e});
    assert.equal(response.success, false);
    assert.equal(response.err.code, 'BAD_REQUEST');
    assert.deepEqual(helper.errorFields(response).sort(), ['to_address', 'amount'].sort());
  });

  it('Should fail when request data is empty object', async function() {
    const dupData = {};
    const response = await transferService.execute(dupData).catch(function(e) {return e});
    assert.equal(response.success, false);
    assert.equal(response.err.code, 'BAD_REQUEST');
    assert.deepEqual(helper.errorFields(response).sort(), ['to_address', 'amount'].sort());
  });

  it('Should fail when amount is blank', async function() {
    const dupData = JSON.parse(JSON.stringify(transferData));
    dupData.amount = '';
    const response = await transferService.execute(dupData).catch(function(e) {return e});
    assert.equal(response.success, false);
    assert.equal(response.err.code, 'BAD_REQUEST');
    assert.deepEqual(helper.errorFields(response).sort(), ['amount'].sort());
  });

  it('Should fail when amount is 0', async function() {
    const dupData = JSON.parse(JSON.stringify(transferData));
    dupData.amount = 0;
    const response = await transferService.execute(dupData).catch(function(e) {return e});
    assert.equal(response.success, false);
    assert.equal(response.err.code, 'BAD_REQUEST');
    assert.deepEqual(helper.errorFields(response).sort(), ['amount'].sort());
  });

  it('Should fail when amount is negative', async function() {
    const dupData = JSON.parse(JSON.stringify(transferData));
    dupData.amount = -1;
    const response = await transferService.execute(dupData).catch(function(e) {return e});
    assert.equal(response.success, false);
    assert.equal(response.err.code, 'BAD_REQUEST');
    assert.deepEqual(helper.errorFields(response).sort(), ['amount'].sort());
  });

  it('Should fail when amount is in decimal', async function() {
    const dupData = JSON.parse(JSON.stringify(transferData));
    dupData.amount = 1.1;
    const response = await transferService.execute(dupData).catch(function(e) {return e});
    assert.equal(response.success, false);
    assert.equal(response.err.code, 'BAD_REQUEST');
    assert.deepEqual(helper.errorFields(response).sort(), ['amount'].sort());
  });

  it('Should fail when amount is not available', async function() {
    const dupData = JSON.parse(JSON.stringify(transferData));
    dupData.amount = '10000000000000000000000000000000000000000000000000000000';
    const response = await transferService.execute(dupData).catch(function(e) {return e});
    assert.equal(response.success, false);
    assert.equal(response.err.code, 'BAD_REQUEST');
    assert.deepEqual(helper.errorFields(response).sort(), ['amount'].sort());
  });

  it('Should fail when to address blank', async function() {
    const dupData = JSON.parse(JSON.stringify(transferData));
    dupData.to_address = '';
    const response = await transferService.execute(dupData).catch(function(e) {return e});
    assert.equal(response.success, false);
    assert.equal(response.err.code, 'BAD_REQUEST');
    assert.deepEqual(helper.errorFields(response).sort(), ['to_address'].sort());
  });

  it('Should fail when to address invalid', async function() {
    const dupData = JSON.parse(JSON.stringify(transferData));
    dupData.to_address = '0xac';
    console.log(JSON.stringify(dupData));
    const response = await transferService.execute(dupData).catch(function(e) {return e});
    console.log(JSON.stringify(response));
    assert.equal(response.success, false);
    assert.equal(response.err.code, 'BAD_REQUEST');
    assert.deepEqual(helper.errorFields(response).sort(), ['to_address'].sort());
  });

  it('Should pass when response data keys match', async function() {
    const dupData = JSON.parse(JSON.stringify(transferData));
    const response = await transferService.execute(dupData).catch(function(e) {return e});
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