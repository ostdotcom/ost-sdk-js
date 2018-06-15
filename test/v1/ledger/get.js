// Load external packages
const chai = require('chai')
  , assert = chai.assert
;

// Load cache service
const rootPrefix = "../../.."
  , helper = require(rootPrefix + '/test/v1/helper')
  , OSTSDK = require(rootPrefix + '/index')
  , ostObj = new OSTSDK({apiEndpoint: helper.OST_KIT_API_ENDPOINT, apiKey: helper.OST_KIT_API_KEY, apiSecret: helper.OST_KIT_API_SECRET})
  , ledgerService = ostObj.services.ledger
;

const id = '8338d43f-6a8e-4204-8e3a-392d183668a8';

const ledgerData = {id: id, limit: '10', order: 'asc', order_by: 'created', page_no: '1'};


describe('services/v1/ledger/get', function () {

  it('Should return promise', async function () {
    const response = ledgerService.get(ledgerData).catch(function (e) {
      return e
    });
    assert.typeOf(response, 'Promise');
  });

  it('Should fail when request data is undefined', async function() {
    let dupData = undefined;
    try {
      const response = await ledgerService.get(dupData).catch(function(e) {return e});
    } catch (e) {
      assert.notEqual(e.message, '');
    }
  });

  it('Should fail when request data is empty object', async function() {
    const dupData = {};
    try {
      const response = await ledgerService.get(dupData).catch(function(e) {return e});
    } catch (e) {
      assert.notEqual(e.message, '');
    }
  });

  // should fail
  it('Should fail when id is invalid', async function() {
    const dupData = JSON.parse(JSON.stringify(ledgerData));
    dupData.id = '86268074-18d7-4118-942f-fc9c8fd1429d1114';
    try {
      const response = await ledgerService.get(dupData).catch(function(e) {return e});
    } catch (e) {
      assert.notEqual(e.message, '');
    }
  });

  it('Should pass when id belongs to someone else but with empty data', async function() {
    const dupData = JSON.parse(JSON.stringify(ledgerData));
    dupData.id = '8338d43f-6a8e-4204-8e3a-392d183668a8';
    const response = await ledgerService.get(dupData).catch(function(e) {return e});
    assert.equal(response.success, true);
    assert.deepEqual(helper.responseKeys(response).sort(), ['success', 'data'].sort());
    assert.deepEqual(helper.responseKeys(response.data).sort(), ['result_type', 'transactions', 'meta'].sort());
    assert.equal(response.data.transactions.length, 0);
    assert.deepEqual(helper.responseKeys(response.data.meta.next_page_payload).sort(), [].sort());
  });

  it('Should fail when id is comma separated list', async function() {
    const dupData = JSON.parse(JSON.stringify(ledgerData));
    dupData.id = '86268074-18d7-4118-942f-fc9c8fd1429d,86268074-18d7-4118-942f-fc9c8fd1429d';

    try {
      const response = await ledgerService.get(dupData).catch(function(e) {return e});
    } catch (e) {
      assert.notEqual(e.message, '');
    }
  });

  it('Should fail when limit is 0', async function() {
    const dupData = JSON.parse(JSON.stringify(ledgerData));
    dupData.limit = 0;
    const response = await ledgerService.get(dupData).catch(function(e) {return e});
    assert.equal(response.success, false);
    assert.equal(response.err.code, 'BAD_REQUEST');
    assert.deepEqual(helper.errorFields(response).sort(), ['limit'].sort());
  });

  it('Should fail when limit is negative', async function() {
    const dupData = JSON.parse(JSON.stringify(ledgerData));
    dupData.limit = -1;
    const response = await ledgerService.get(dupData).catch(function(e) {return e});
    assert.equal(response.success, false);
    assert.equal(response.err.code, 'BAD_REQUEST');
    assert.deepEqual(helper.errorFields(response).sort(), ['limit'].sort());
  });

  it('Should fail when limit is greater than 100', async function() {
    const dupData = JSON.parse(JSON.stringify(ledgerData));
    dupData.limit = 101;
    const response = await ledgerService.get(dupData).catch(function(e) {return e});
    assert.equal(response.success, false);
    assert.equal(response.err.code, 'BAD_REQUEST');
    assert.deepEqual(helper.errorFields(response).sort(), ['limit'].sort());
  });

  it('Should fail when limit is string', async function() {
    const dupData = JSON.parse(JSON.stringify(ledgerData));
    dupData.limit = 'ABC';
    const response = await ledgerService.get(dupData).catch(function(e) {return e});
    assert.equal(response.success, false);
    assert.equal(response.err.code, 'BAD_REQUEST');
    assert.deepEqual(helper.errorFields(response).sort(), ['limit'].sort());
  });

  it('Should fail when limit is blank', async function() {
    const dupData = JSON.parse(JSON.stringify(ledgerData));
    dupData.limit = '';
    const response = await ledgerService.get(dupData).catch(function(e) {return e});
    assert.equal(response.success, false);
    assert.equal(response.err.code, 'BAD_REQUEST');
    assert.deepEqual(helper.errorFields(response).sort(), ['limit'].sort());
  });

  it('Should pass when limit is 20', async function() {
    const dupData = JSON.parse(JSON.stringify(ledgerData));
    dupData.limit = '20';
    const response = await ledgerService.get(dupData).catch(function(e) {return e});
    assert.equal(response.success, true);
  });

  it('Should pass when limit is not sent', async function() {
    const dupData = JSON.parse(JSON.stringify(ledgerData));
    delete dupData.limit;
    const response = await ledgerService.get(dupData).catch(function(e) {return e});
    assert.equal(response.success, true);
  });

  it('Should fail when order is invalid', async function() {
    const dupData = JSON.parse(JSON.stringify(ledgerData));
    dupData.order = 'abc';
    const response = await ledgerService.get(dupData).catch(function(e) {return e});
    assert.equal(response.success, false);
    assert.equal(response.err.code, 'BAD_REQUEST');
    assert.deepEqual(helper.errorFields(response).sort(), ['order'].sort());
  });

  it('Should pass when order is blank', async function() {
    const dupData = JSON.parse(JSON.stringify(ledgerData));
    dupData.order = '';
    const response = await ledgerService.get(dupData).catch(function(e) {return e});
    assert.equal(response.success, true);
  });

  it('Should pass when order is asc', async function() {
    const dupData = JSON.parse(JSON.stringify(ledgerData));
    dupData.order = 'asc';
    const response = await ledgerService.get(dupData).catch(function(e) {return e});
    assert.equal(response.success, true);
  });

  it('Should pass when order is desc', async function() {
    const dupData = JSON.parse(JSON.stringify(ledgerData));
    dupData.order = 'desc';
    const response = await ledgerService.get(dupData).catch(function(e) {return e});
    assert.equal(response.success, true);
  });

  it('Should pass when order is not sent', async function() {
    const dupData = JSON.parse(JSON.stringify(ledgerData));
    delete dupData.order;
    const response = await ledgerService.get(dupData).catch(function(e) {return e});
    assert.equal(response.success, true);
  });

  it('Should fail when order_by is invalid', async function() {
    const dupData = JSON.parse(JSON.stringify(ledgerData));
    dupData.order_by = 'abc';
    const response = await ledgerService.get(dupData).catch(function(e) {return e});
    assert.equal(response.success, false);
    assert.equal(response.err.code, 'BAD_REQUEST');
    assert.deepEqual(helper.errorFields(response).sort(), ['order_by'].sort());
  });

  it('Should pass when order_by is blank', async function() {
    const dupData = JSON.parse(JSON.stringify(ledgerData));
    dupData.order_by = '';
    const response = await ledgerService.get(dupData).catch(function(e) {return e});
    assert.equal(response.success, true);
  });

  it('Should pass when order_by is created', async function() {
    const dupData = JSON.parse(JSON.stringify(ledgerData));
    dupData.order_by = 'created';
    const response = await ledgerService.get(dupData).catch(function(e) {return e});
    assert.equal(response.success, true);
  });

  it('Should pass when order_by is not sent', async function() {
    const dupData = JSON.parse(JSON.stringify(ledgerData));
    delete dupData.order_by;
    const response = await ledgerService.get(dupData).catch(function(e) {return e});
    assert.equal(response.success, true);
  });

  it('Should fail when page_no is 0', async function() {
    const dupData = JSON.parse(JSON.stringify(ledgerData));
    dupData.page_no = 0;
    const response = await ledgerService.get(dupData).catch(function(e) {return e});
    assert.equal(response.success, false);
    assert.equal(response.err.code, 'BAD_REQUEST');
    assert.deepEqual(helper.errorFields(response).sort(), ['page_no'].sort());
  });

  it('Should fail when page_no is negative', async function() {
    const dupData = JSON.parse(JSON.stringify(ledgerData));
    dupData.page_no = -1;
    const response = await ledgerService.get(dupData).catch(function(e) {return e});
    assert.equal(response.success, false);
    assert.equal(response.err.code, 'BAD_REQUEST');
    assert.deepEqual(helper.errorFields(response).sort(), ['page_no'].sort());
  });

  it('Should fail when page_no is string', async function() {
    const dupData = JSON.parse(JSON.stringify(ledgerData));
    dupData.page_no = 'ABC';
    const response = await ledgerService.get(dupData).catch(function(e) {return e});
    assert.equal(response.success, false);
    assert.equal(response.err.code, 'BAD_REQUEST');
    assert.deepEqual(helper.errorFields(response).sort(), ['page_no'].sort());
  });

  it('Should fail when page_no is blank', async function() {
    const dupData = JSON.parse(JSON.stringify(ledgerData));
    dupData.page_no = '';
    const response = await ledgerService.get(dupData).catch(function(e) {return e});
    assert.equal(response.success, false);
    assert.equal(response.err.code, 'BAD_REQUEST');
    assert.deepEqual(helper.errorFields(response).sort(), ['page_no'].sort());
  });

  it('Should fail when page_no is too big number', async function() {
    const dupData = JSON.parse(JSON.stringify(ledgerData));
    dupData.page_no = 1000000000000000000;
    const response = await ledgerService.get(dupData).catch(function(e) {return e});
    assert.equal(response.success, false);
    assert.equal(response.err.code, 'BAD_REQUEST');
    assert.deepEqual(helper.errorFields(response).sort(), ['page_no'].sort());
  });

  it('Should pass when page_no is not sent', async function() {
    const dupData = JSON.parse(JSON.stringify(ledgerData));
    delete dupData.page_no;
    const response = await ledgerService.get(dupData).catch(function(e) {return e});
    assert.equal(response.success, true);
  });

  it('Should pass when id is valid', async function() {

    const userService = ostObj.services.users;

    const userResponse = await userService.list().catch(function(e) {return e});
    assert.equal(userResponse.success, true);

    let id = userResponse.data.users[0].id;

    const dupData = JSON.parse(JSON.stringify(ledgerData));
    dupData.id = id;

    const response = await ledgerService.get(dupData).catch(function(e) {return e});
    assert.equal(response.success, true);
    assert.deepEqual(helper.responseKeys(response).sort(), ['success', 'data'].sort());
    assert.deepEqual(helper.responseKeys(response.data).sort(), ['result_type', 'transactions', 'meta'].sort());
    assert.isAtLeast(response.data.transactions.length, 0);

    if ( response.data.transactions.length > 0) {
      assert.deepEqual(helper.responseKeys(response.data.transactions[0]).sort(), ['id', 'from_user_id', 'to_user_id', 'amount', 'transaction_hash', 'action_id', 'timestamp', 'status', 'transaction_fee', 'commission_amount', 'gas_price', 'gas_used', 'block_number'].sort());
    }

    if (Object.keys(response.data.meta.next_page_payload).length > 0) {
      assert.deepEqual(helper.responseKeys(response.data.meta.next_page_payload).sort(), ['order_by', 'order', 'page_no', 'limit'].sort());

      let data = {};
      Object.assign(data, response.data.meta.next_page_payload, {id: id});
      // Send next page request
      const responsePage2 = await ledgerService.get(data).catch(function(e) {return e});
      assert.equal(responsePage2.success, true);
      assert.isAbove(responsePage2.data.transactions.length, 0);
    }
  });

});

