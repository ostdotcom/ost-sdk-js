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

const transactionData = {limit: '10', order: 'asc', order_by: 'created', page_no: '1'};

describe('services/v1/transactions/list', function () {

  it('Should return promise', async function() {
    const dupData = undefined;
    const response = transactionService.list(dupData).catch(function(e) {return e});
    assert.typeOf(response, 'Promise');
  });

  it('Should pass when id is invalid, but with empty data', async function() {
    const dupData = JSON.parse(JSON.stringify(transactionData));
    dupData.id = '86268074-18d7-4118-942f-fc9c8fd1429d111';
    const response = await transactionService.list(dupData).catch(function(e) {return e});
    assert.equal(response.success, true);
    assert.deepEqual(helper.responseKeys(response).sort(), ['success', 'data'].sort());
    assert.deepEqual(helper.responseKeys(response.data).sort(), ['result_type', 'transactions', 'meta'].sort());
    assert.equal(response.data.transactions.length, 0);
    assert.deepEqual(helper.responseKeys(response.data.meta.next_page_payload).sort(), [].sort());
  });

  it('Should pass when id belongs to someone else, but with empty data', async function() {
    const dupData = JSON.parse(JSON.stringify(transactionData));
    dupData.id = '4ba5b1dd-fa13-4923-b7fd-4286424d5605';
    const response = await transactionService.list(dupData).catch(function(e) {return e});
    assert.equal(response.success, true);
    assert.deepEqual(helper.responseKeys(response).sort(), ['success', 'data'].sort());
    assert.deepEqual(helper.responseKeys(response.data).sort(), ['result_type', 'transactions', 'meta'].sort());
    assert.equal(response.data.transactions.length, 0);
    assert.deepEqual(helper.responseKeys(response.data.meta.next_page_payload).sort(), [].sort());
  });

  it('Should pass when id is invalid comma separated list, but with empty data', async function() {
    const dupData = JSON.parse(JSON.stringify(transactionData));
    dupData.id = '86268074-18d7-4118-942f-fc9c8fd1429d,86268074-18d7-4118-942f-fc9c8fd1429d';
    const response = await transactionService.list(dupData).catch(function(e) {return e});
    assert.equal(response.success, true);
    assert.deepEqual(helper.responseKeys(response).sort(), ['success', 'data'].sort());
    assert.deepEqual(helper.responseKeys(response.data).sort(), ['result_type', 'transactions', 'meta'].sort());
    assert.equal(response.data.transactions.length, 0);
    assert.deepEqual(helper.responseKeys(response.data.meta.next_page_payload).sort(), [].sort());
  });

  it('Should pass when id is valid', async function() {
    const transactionResponse = await transactionService.list().catch(function(e) {return e});

    const dupData = {};
    dupData.id = transactionResponse.data.transactions[0].id;
    const response = await transactionService.list(dupData).catch(function(e) {return e});
    assert.equal(response.success, true);
  });

  it('Should fail when limit is 0', async function() {
    const dupData = JSON.parse(JSON.stringify(transactionData));
    dupData.limit = 0;
    const response = await transactionService.list(dupData).catch(function(e) {return e});
    assert.equal(response.success, false);
    assert.equal(response.err.code, 'BAD_REQUEST');
    assert.deepEqual(helper.errorFields(response).sort(), ['limit'].sort());
  });

  it('Should fail when limit is negative', async function() {
    const dupData = JSON.parse(JSON.stringify(transactionData));
    dupData.limit = -1;
    const response = await transactionService.list(dupData).catch(function(e) {return e});
    assert.equal(response.success, false);
    assert.equal(response.err.code, 'BAD_REQUEST');
    assert.deepEqual(helper.errorFields(response).sort(), ['limit'].sort());
  });

  it('Should fail when limit is greater than 100', async function() {
    const dupData = JSON.parse(JSON.stringify(transactionData));
    dupData.limit = 101;
    const response = await transactionService.list(dupData).catch(function(e) {return e});
    assert.equal(response.success, false);
    assert.equal(response.err.code, 'BAD_REQUEST');
    assert.deepEqual(helper.errorFields(response).sort(), ['limit'].sort());
  });

  it('Should fail when limit is string', async function() {
    const dupData = JSON.parse(JSON.stringify(transactionData));
    dupData.limit = 'ABC';
    const response = await transactionService.list(dupData).catch(function(e) {return e});
    assert.equal(response.success, false);
    assert.equal(response.err.code, 'BAD_REQUEST');
    assert.deepEqual(helper.errorFields(response).sort(), ['limit'].sort());
  });

  it('Should fail when limit is blank', async function() {
    const dupData = JSON.parse(JSON.stringify(transactionData));
    dupData.limit = '';
    const response = await transactionService.list(dupData).catch(function(e) {return e});
    assert.equal(response.success, false);
    assert.equal(response.err.code, 'BAD_REQUEST');
    assert.deepEqual(helper.errorFields(response).sort(), ['limit'].sort());
  });

  it('Should pass when limit is 20', async function() {
    const dupData = JSON.parse(JSON.stringify(transactionData));
    dupData.limit = '20';
    const response = await transactionService.list(dupData).catch(function(e) {return e});
    assert.equal(response.success, true);
  });

  it('Should pass when limit is not sent', async function() {
    const dupData = JSON.parse(JSON.stringify(transactionData));
    delete dupData.limit;
    const response = await transactionService.list(dupData).catch(function(e) {return e});
    assert.equal(response.success, true);
  });

  it('Should fail when order is invalid', async function() {
    const dupData = JSON.parse(JSON.stringify(transactionData));
    dupData.order = 'abc';
    const response = await transactionService.list(dupData).catch(function(e) {return e});
    assert.equal(response.success, false);
    assert.equal(response.err.code, 'BAD_REQUEST');
    assert.deepEqual(helper.errorFields(response).sort(), ['order'].sort());
  });

  it('Should pass when order is blank', async function() {
    const dupData = JSON.parse(JSON.stringify(transactionData));
    dupData.order = '';
    const response = await transactionService.list(dupData).catch(function(e) {return e});
    assert.equal(response.success, true);
  });

  it('Should pass when order is asc', async function() {
    const dupData = JSON.parse(JSON.stringify(transactionData));
    dupData.order = 'asc';
    const response = await transactionService.list(dupData).catch(function(e) {return e});
    assert.equal(response.success, true);
  });

  it('Should pass when order is desc', async function() {
    const dupData = JSON.parse(JSON.stringify(transactionData));
    dupData.order = 'desc';
    const response = await transactionService.list(dupData).catch(function(e) {return e});
    assert.equal(response.success, true);
  });

  it('Should pass when order is not sent', async function() {
    const dupData = JSON.parse(JSON.stringify(transactionData));
    delete dupData.order;
    const response = await transactionService.list(dupData).catch(function(e) {return e});
    assert.equal(response.success, true);
  });

  it('Should fail when order_by is invalid', async function() {
    const dupData = JSON.parse(JSON.stringify(transactionData));
    dupData.order_by = 'abc';
    const response = await transactionService.list(dupData).catch(function(e) {return e});
    assert.equal(response.success, false);
    assert.equal(response.err.code, 'BAD_REQUEST');
    assert.deepEqual(helper.errorFields(response).sort(), ['order_by'].sort());
  });

  it('Should pass when order_by is blank', async function() {
    const dupData = JSON.parse(JSON.stringify(transactionData));
    dupData.order_by = '';
    const response = await transactionService.list(dupData).catch(function(e) {return e});
    assert.equal(response.success, true);
  });

  it('Should pass when order_by is created', async function() {
    const dupData = JSON.parse(JSON.stringify(transactionData));
    dupData.order_by = 'created';
    const response = await transactionService.list(dupData).catch(function(e) {return e});
    assert.equal(response.success, true);
  });

  it('Should pass when order_by is not sent', async function() {
    const dupData = JSON.parse(JSON.stringify(transactionData));
    delete dupData.order_by;
    const response = await transactionService.list(dupData).catch(function(e) {return e});
    assert.equal(response.success, true);
  });

  it('Should fail when page_no is 0', async function() {
    const dupData = JSON.parse(JSON.stringify(transactionData));
    dupData.page_no = 0;
    const response = await transactionService.list(dupData).catch(function(e) {return e});
    assert.equal(response.success, false);
    assert.equal(response.err.code, 'BAD_REQUEST');
    assert.deepEqual(helper.errorFields(response).sort(), ['page_no'].sort());
  });

  it('Should fail when page_no is negative', async function() {
    const dupData = JSON.parse(JSON.stringify(transactionData));
    dupData.page_no = -1;
    const response = await transactionService.list(dupData).catch(function(e) {return e});
    assert.equal(response.success, false);
    assert.equal(response.err.code, 'BAD_REQUEST');
    assert.deepEqual(helper.errorFields(response).sort(), ['page_no'].sort());
  });

  it('Should fail when page_no is string', async function() {
    const dupData = JSON.parse(JSON.stringify(transactionData));
    dupData.page_no = 'ABC';
    const response = await transactionService.list(dupData).catch(function(e) {return e});
    assert.equal(response.success, false);
    assert.equal(response.err.code, 'BAD_REQUEST');
    assert.deepEqual(helper.errorFields(response).sort(), ['page_no'].sort());
  });

  it('Should fail when page_no is blank', async function() {
    const dupData = JSON.parse(JSON.stringify(transactionData));
    dupData.page_no = '';
    const response = await transactionService.list(dupData).catch(function(e) {return e});
    assert.equal(response.success, false);
    assert.equal(response.err.code, 'BAD_REQUEST');
    assert.deepEqual(helper.errorFields(response).sort(), ['page_no'].sort());
  });

  it('Should fail when page_no is too big number', async function() {
    const dupData = JSON.parse(JSON.stringify(transactionData));
    dupData.page_no = 1000000000000000000;
    const response = await transactionService.list(dupData).catch(function(e) {return e});
    assert.equal(response.success, false);
    assert.equal(response.err.code, 'BAD_REQUEST');
    assert.deepEqual(helper.errorFields(response).sort(), ['page_no'].sort());
  });

  it('Should pass when page_no is not sent', async function() {
    const dupData = JSON.parse(JSON.stringify(transactionData));
    delete dupData.page_no;
    const response = await transactionService.list(dupData).catch(function(e) {return e});
    assert.equal(response.success, true);
  });

  it('Should pass when request data is undefined, also test pagination', async function() {
    const dupData = undefined;
    const response = await transactionService.list(dupData).catch(function(e) {return e});

    assert.equal(response.success, true);
    assert.deepEqual(helper.responseKeys(response).sort(), ['success', 'data'].sort());
    assert.deepEqual(helper.responseKeys(response.data).sort(), ['result_type', 'transactions', 'meta'].sort());
    assert.isAbove(response.data.transactions.length, 0);
    assert.deepEqual(helper.responseKeys(response.data.transactions[0]).sort(), ['id', 'from_user_id', 'to_user_id', 'amount', 'transaction_hash', 'action_id', 'timestamp', 'status', 'transaction_fee', 'commission_amount', 'gas_price', 'gas_used', 'block_number'].sort());

    assert.exists(response.data.transactions[0].id);
    assert.exists(response.data.transactions[0].from_user_id);
    assert.exists(response.data.transactions[0].to_user_id);
    assert.exists(response.data.transactions[0].action_id);
    assert.exists(response.data.transactions[0].timestamp);
    assert.exists(response.data.transactions[0].status);
    assert.exists(response.data.transactions[0].gas_price);

    if (Object.keys(response.data.meta.next_page_payload).length > 0) {
      assert.deepEqual(helper.responseKeys(response.data.meta.next_page_payload).sort(), ['order_by', 'order', 'page_no', 'limit'].sort());

      // Send next page request
      const responsePage2 = await transactionService.list(response.data.meta.next_page_payload).catch(function(e) {return e});
      assert.equal(responsePage2.success, true);
      assert.isAbove(responsePage2.data.transactions.length, 0);
    }
  });

});
