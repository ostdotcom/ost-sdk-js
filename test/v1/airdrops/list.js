// Load external packages
const chai = require('chai')
  , assert = chai.assert
;

// Load cache service
const rootPrefix = "../../.."
  , helper = require(rootPrefix + '/test/v1/helper')
  , OSTSDK = require(rootPrefix + '/index')
  , ostObj = new OSTSDK({apiEndpoint: helper.OST_KIT_API_ENDPOINT, apiKey: helper.OST_KIT_API_KEY, apiSecret: helper.OST_KIT_API_SECRET})
  , airdropService = ostObj.services.airdrops
;

// order desc (default)/asc
// order_by created (default)
// limit 1 to 100 (10)
// current_status incomplete, failed, complete, processing
// page_no (default 1)

const airdropData = {current_status: 'complete', limit: '10', order: 'asc', order_by: 'created', page_no: '1'};

describe('services/v1/airdrops/list', function () {

  it('Should return promise', async function() {
    const dupData = undefined;
    const response = airdropService.list(dupData);
    assert.typeOf(response, 'Promise');
  });

  it('Should fail when id is invalid', async function() {
    const dupData = JSON.parse(JSON.stringify(airdropData));
    dupData.id = '86268074-18d7-4118-942f-fc9c8fd1429d111';
    const response = await airdropService.get(dupData).catch(function(e) {return e});
    assert.equal(response.success, false);
    assert.equal(response.err.code, 'BAD_REQUEST');
    assert.deepEqual(helper.errorFields(response).sort(), ['id'].sort());
  });

  it('Should fail when id belongs to someone else', async function() {
    const dupData = JSON.parse(JSON.stringify(airdropData));
    dupData.id = '86268074-18d7-4118-942f-fc9c8fd1429d';
    const response = await airdropService.get(dupData).catch(function(e) {return e});
    assert.equal(response.success, false);
    assert.equal(response.err.code, 'BAD_REQUEST');
    assert.deepEqual(helper.errorFields(response).sort(), ['id'].sort());
  });

  it('Should fail when id is comma separated list', async function() {
    const dupData = JSON.parse(JSON.stringify(airdropData));
    dupData.id = '86268074-18d7-4118-942f-fc9c8fd1429d,86268074-18d7-4118-942f-fc9c8fd1429d';
    const response = await airdropService.get(dupData).catch(function(e) {return e});
    assert.equal(response.success, false);
    assert.equal(response.err.code, 'BAD_REQUEST');
    assert.deepEqual(helper.errorFields(response).sort(), ['id'].sort());
  });

  it('Should pass when id is valid', async function() {
    const airdropResponse = await airdropService.execute({amount: 0.00001}).catch(function(e) {return e});

    const dupData = {};
    dupData.id = airdropResponse.data.airdrop.id;
    const response = await airdropService.get(dupData).catch(function(e) {return e});
    assert.equal(response.success, true);
  });

  it('Should fail when current_status is invalid', async function() {
    const dupData = JSON.parse(JSON.stringify(airdropData));
    dupData.current_status = 'abc';
    const response = await airdropService.list(dupData).catch(function(e) {return e});
    assert.equal(response.success, false);
    assert.equal(response.err.code, 'BAD_REQUEST');
    assert.deepEqual(helper.errorFields(response).sort(), ['current_status'].sort());
  });

  it('Should fail when one of the current_status is invalid', async function() {
    const dupData = JSON.parse(JSON.stringify(airdropData));
    dupData.current_status = 'incomplete,abc';
    const response = await airdropService.list(dupData).catch(function(e) {return e});
    assert.equal(response.success, false);
    assert.equal(response.err.code, 'BAD_REQUEST');
    assert.deepEqual(helper.errorFields(response).sort(), ['current_status'].sort());
  });

  it('Should pass when current_status has few valid values', async function() {
    const dupData = JSON.parse(JSON.stringify(airdropData));
    dupData.current_status = 'incomplete,complete';
    const response = await airdropService.list(dupData).catch(function(e) {return e});
    assert.equal(response.success, true);
  });

  it('Should pass when current_status has all valid values', async function() {
    const dupData = JSON.parse(JSON.stringify(airdropData));
    dupData.current_status = 'incomplete,processing,complete,failed';
    const response = await airdropService.list(dupData).catch(function(e) {return e});
    assert.equal(response.success, true);
  });

  it('Should fail when limit is 0', async function() {
    const dupData = JSON.parse(JSON.stringify(airdropData));
    dupData.limit = 0;
    const response = await airdropService.list(dupData).catch(function(e) {return e});
    assert.equal(response.success, false);
    assert.equal(response.err.code, 'BAD_REQUEST');
    assert.deepEqual(helper.errorFields(response).sort(), ['limit'].sort());
  });

  it('Should fail when limit is negative', async function() {
    const dupData = JSON.parse(JSON.stringify(airdropData));
    dupData.limit = -1;
    const response = await airdropService.list(dupData).catch(function(e) {return e});
    assert.equal(response.success, false);
    assert.equal(response.err.code, 'BAD_REQUEST');
    assert.deepEqual(helper.errorFields(response).sort(), ['limit'].sort());
  });

  it('Should fail when limit is greater than 100', async function() {
    const dupData = JSON.parse(JSON.stringify(airdropData));
    dupData.limit = 101;
    const response = await airdropService.list(dupData).catch(function(e) {return e});
    assert.equal(response.success, false);
    assert.equal(response.err.code, 'BAD_REQUEST');
    assert.deepEqual(helper.errorFields(response).sort(), ['limit'].sort());
  });

  it('Should fail when limit is string', async function() {
    const dupData = JSON.parse(JSON.stringify(airdropData));
    dupData.limit = 'ABC';
    const response = await airdropService.list(dupData).catch(function(e) {return e});
    assert.equal(response.success, false);
    assert.equal(response.err.code, 'BAD_REQUEST');
    assert.deepEqual(helper.errorFields(response).sort(), ['limit'].sort());
  });

  it('Should fail when limit is blank', async function() {
    const dupData = JSON.parse(JSON.stringify(airdropData));
    dupData.limit = '';
    const response = await airdropService.list(dupData).catch(function(e) {return e});
    assert.equal(response.success, false);
    assert.equal(response.err.code, 'BAD_REQUEST');
    assert.deepEqual(helper.errorFields(response).sort(), ['limit'].sort());
  });

  it('Should pass when limit is 20', async function() {
    const dupData = JSON.parse(JSON.stringify(airdropData));
    dupData.limit = '20';
    const response = await airdropService.list(dupData).catch(function(e) {return e});
    assert.equal(response.success, true);
  });

  it('Should fail when order is invalid', async function() {
    const dupData = JSON.parse(JSON.stringify(airdropData));
    dupData.order = 'abc';
    const response = await airdropService.list(dupData).catch(function(e) {return e});
    assert.equal(response.success, false);
    assert.equal(response.err.code, 'BAD_REQUEST');
    assert.deepEqual(helper.errorFields(response).sort(), ['order'].sort());
  });

  it('Should pass when order is blank', async function() {
    const dupData = JSON.parse(JSON.stringify(airdropData));
    dupData.order = '';
    const response = await airdropService.list(dupData).catch(function(e) {return e});
    assert.equal(response.success, true);
  });

  it('Should pass when order is asc', async function() {
    const dupData = JSON.parse(JSON.stringify(airdropData));
    dupData.order = 'asc';
    const response = await airdropService.list(dupData).catch(function(e) {return e});
    assert.equal(response.success, true);
  });

  it('Should pass when order is desc', async function() {
    const dupData = JSON.parse(JSON.stringify(airdropData));
    dupData.order = 'desc';
    const response = await airdropService.list(dupData).catch(function(e) {return e});
    assert.equal(response.success, true);
  });

  it('Should fail when order_by is invalid', async function() {
    const dupData = JSON.parse(JSON.stringify(airdropData));
    dupData.order_by = 'abc';
    const response = await airdropService.list(dupData).catch(function(e) {return e});
    assert.equal(response.success, false);
    assert.equal(response.err.code, 'BAD_REQUEST');
    assert.deepEqual(helper.errorFields(response).sort(), ['order_by'].sort());
  });

  it('Should pass when order_by is blank', async function() {
    const dupData = JSON.parse(JSON.stringify(airdropData));
    dupData.order_by = '';
    const response = await airdropService.list(dupData).catch(function(e) {return e});
    assert.equal(response.success, true);
  });

  it('Should fail when page_no is 0', async function() {
    const dupData = JSON.parse(JSON.stringify(airdropData));
    dupData.page_no = 0;
    const response = await airdropService.list(dupData).catch(function(e) {return e});
    assert.equal(response.success, false);
    assert.equal(response.err.code, 'BAD_REQUEST');
    assert.deepEqual(helper.errorFields(response).sort(), ['page_no'].sort());
  });

  it('Should fail when page_no is negative', async function() {
    const dupData = JSON.parse(JSON.stringify(airdropData));
    dupData.page_no = -1;
    const response = await airdropService.list(dupData).catch(function(e) {return e});
    assert.equal(response.success, false);
    assert.equal(response.err.code, 'BAD_REQUEST');
    assert.deepEqual(helper.errorFields(response).sort(), ['page_no'].sort());
  });

  it('Should fail when page_no is string', async function() {
    const dupData = JSON.parse(JSON.stringify(airdropData));
    dupData.page_no = 'ABC';
    const response = await airdropService.list(dupData).catch(function(e) {return e});
    assert.equal(response.success, false);
    assert.equal(response.err.code, 'BAD_REQUEST');
    assert.deepEqual(helper.errorFields(response).sort(), ['page_no'].sort());
  });

  it('Should pass when page_no is blank', async function() {
    const dupData = JSON.parse(JSON.stringify(airdropData));
    dupData.page_no = '';
    const response = await airdropService.list(dupData).catch(function(e) {return e});
    assert.equal(response.success, false);
    assert.equal(response.err.code, 'BAD_REQUEST');
    assert.deepEqual(helper.errorFields(response).sort(), ['page_no'].sort());
  });

  it('Should pass when page_no is big number, but with empty data', async function() {
    const dupData = JSON.parse(JSON.stringify(airdropData));
    dupData.page_no = 1000000000000000000;
    const response = await airdropService.list(dupData).catch(function(e) {return e});
    assert.equal(response.success, true);
    assert.deepEqual(helper.responseKeys(response).sort(), ['success', 'data'].sort());
    assert.deepEqual(helper.responseKeys(response.data).sort(), ['result_type', 'airdrops', 'meta'].sort());
    assert.equal(response.data.airdrops.length, 0);
    assert.deepEqual(helper.responseKeys(response.data.meta.next_page_payload).sort(), [].sort());
  });

  it('Should pass when request data is undefined, also test pagination', async function() {
    const dupData = undefined;
    const response = await airdropService.list(dupData).catch(function(e) {return e});
    assert.equal(response.success, true);
    assert.deepEqual(helper.responseKeys(response).sort(), ['success', 'data'].sort());
    assert.deepEqual(helper.responseKeys(response.data).sort(), ['result_type', 'airdrops', 'meta'].sort());
    assert.isAbove(response.data.airdrops.length, 0);
    assert.deepEqual(helper.responseKeys(response.data.airdrops[0]).sort(), ['id', 'current_status', 'steps_complete'].sort());
    assert.isAbove(response.data.airdrops[0].steps_complete.length, 0);
    if (Object.keys(response.data.meta.next_page_payload).length > 0) {
      assert.deepEqual(helper.responseKeys(response.data.meta.next_page_payload).sort(), ['order_by', 'order', 'page_no', 'limit'].sort());

      // Send next page request
      const responsePage2 = await airdropService.list(response.data.meta.next_page_payload).catch(function(e) {return e});
      assert.equal(responsePage2.success, true);
      assert.isAbove(responsePage2.data.airdrops.length, 0);
    }
  });

});