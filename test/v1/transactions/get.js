// Load external packages
const chai = require('chai')
  , assert = chai.assert
;

// Load cache service
const rootPrefix = "../../.."
  , helper = require(rootPrefix + '/test/v1/helper')
  , OSTSDK = require(rootPrefix + '/index')
  , ostObj = new OSTSDK({apiEndpoint: helper.OST_KIT_API_ENDPOINT, apiKey: helper.OST_KIT_API_KEY, apiSecret: helper.OST_KIT_API_SECRET})
  , transactionService = ostObj.services.transactions
;

const transactionData = {id: ''};

describe('services/v1/transactions/get', function () {

  it('Should return promise', async function() {
    const dupData = JSON.parse(JSON.stringify(transactionData));
    dupData.id = '1';
    const response = transactionService.get(dupData).catch(function(e) {return e});
    assert.typeOf(response, 'Promise');
  });

  it('Should fail when request data is undefined', async function() {
    const dupData = undefined;
    try {
      const response = await transactionService.get(dupData).catch(function(e) {return e});
    } catch (e) {
      assert.notEqual(e.message, '');
    }
  });

  it('Should fail when request data is empty object', async function() {
    const dupData = {};
    try {
      const response = await transactionService.get(dupData).catch(function(e) {return e});
    } catch (e) {
      assert.notEqual(e.message, '');
    }
  });

  it('Should pass when id is blank, but will return the list', async function() {
    const dupData = JSON.parse(JSON.stringify(transactionData));
    dupData.id = '';
    const response = await transactionService.get(dupData).catch(function(e) {return e});
    assert.equal(response.success, true);
  });

  it('Should fail when id is invalid', async function() {
    const dupData = JSON.parse(JSON.stringify(transactionData));
    dupData.id = '86268074-18d7-4118-942f-fc9c8fd1429d111';
    const response = await transactionService.get(dupData).catch(function(e) {return e});
    assert.equal(response.success, false);
    assert.equal(response.err.code, 'NOT_FOUND');
  });

  it('Should fail when id belongs to someone else', async function() {
    const dupData = JSON.parse(JSON.stringify(transactionData));
    dupData.id = '4ba5b1dd-fa13-4923-b7fd-4286424d5605';
    const response = await transactionService.get(dupData).catch(function(e) {return e});
    assert.equal(response.success, false);
    assert.equal(response.err.code, 'NOT_FOUND');
  });

  it('Should fail when id is comma separated list', async function() {
    const dupData = JSON.parse(JSON.stringify(transactionData));
    dupData.id = '86268074-18d7-4118-942f-fc9c8fd1429d,86268074-18d7-4118-942f-fc9c8fd1429d';
    const response = await transactionService.get(dupData).catch(function(e) {return e});
    assert.equal(response.success, false);
    assert.equal(response.err.code, 'NOT_FOUND');
  });

  it('Should pass when id is valid', async function() {
    const transactionResponse = await transactionService.list().catch(function(e) {return e});

    const dupData = JSON.parse(JSON.stringify(transactionData));
    dupData.id = transactionResponse.data.transactions[0].id;
    const response = await transactionService.get(dupData).catch(function(e) {return e});

    assert.equal(response.success, true);
    assert.deepEqual(helper.responseKeys(response).sort(), ['success', 'data'].sort());
    assert.deepEqual(helper.responseKeys(response.data).sort(), ['result_type', 'transaction'].sort());
    assert.deepEqual(helper.responseKeys(response.data.transaction).sort(), ['id', 'from_user_id', 'to_user_id', 'amount', 'transaction_hash', 'action_id', 'timestamp', 'status', 'transaction_fee', 'commission_amount', 'gas_price', 'gas_used', 'block_number'].sort());

    assert.exists(response.data.transaction.id);
    assert.exists(response.data.transaction.from_user_id);
    assert.exists(response.data.transaction.to_user_id);
    assert.exists(response.data.transaction.amount);
    assert.exists(response.data.transaction.action_id);
    assert.exists(response.data.transaction.timestamp);
    assert.exists(response.data.transaction.status);
    assert.exists(response.data.transaction.gas_price);
  });

});