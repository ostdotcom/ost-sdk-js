// Load external packages
const chai = require('chai')
  , assert = chai.assert
;

// Load cache service
const rootPrefix = "../../.."
  , helper = require(rootPrefix + '/test/v1/helper')
  , OSTSDK = require(rootPrefix + '/index')
  , ostObj = new OSTSDK({apiEndpoint: helper.OST_KIT_API_ENDPOINT, apiKey: helper.OST_KIT_API_KEY, apiSecret: helper.OST_KIT_API_SECRET})
  , userService = ostObj.services.users
;

const userData = {airdropped: 'true', limit: '10', order: 'asc', order_by: 'created', page_no: '1'};

describe('services/v1/users/list', function () {

  it('should return promise', async function() {
    const response = userService.list().catch(function(e) {return e});
    assert.typeOf(response, 'Promise');
  });

  it('Should pass when id is invalid, with empty data', async function() {
    const dupData = JSON.parse(JSON.stringify(userData));
    dupData.id = '4a090517-c16a-4f1a-b000-6987059da51c';
    const response = await userService.list(dupData).catch(function(e) {return e});
    assert.equal(response.success, true);
    assert.deepEqual(helper.responseKeys(response).sort(), ['success', 'data'].sort());
    assert.deepEqual(helper.responseKeys(response.data).sort(), ['result_type', 'users', 'meta'].sort());
    assert.equal(response.data.users.length, 0);
    assert.deepEqual(helper.responseKeys(response.data.meta.next_page_payload).sort(), [].sort());
  });

  it('Should fail when id belongs to someone else, with empty data', async function() {
    const dupData = JSON.parse(JSON.stringify(userData));
    dupData.id = '4a090517-c16a-4f1a-bbca-6987059da51c';
    const response = await userService.list(dupData).catch(function(e) {return e});
    assert.equal(response.success, true);
    assert.deepEqual(helper.responseKeys(response).sort(), ['success', 'data'].sort());
    assert.deepEqual(helper.responseKeys(response.data).sort(), ['result_type', 'users', 'meta'].sort());
    assert.equal(response.data.users.length, 0);
    assert.deepEqual(helper.responseKeys(response.data.meta.next_page_payload).sort(), [].sort());
  });

  it('Should fail when id wrong comma separated list, with empty data', async function() {
    const dupData = JSON.parse(JSON.stringify(userData));
    dupData.id = '86268074-18d7-4118-942f-fc9c8fd1429d,86268074-18d7-4118-942f-fc9c8fd1429d';
    const response = await userService.list(dupData).catch(function(e) {return e});
    assert.equal(response.success, true);
    assert.deepEqual(helper.responseKeys(response).sort(), ['success', 'data'].sort());
    assert.deepEqual(helper.responseKeys(response.data).sort(), ['result_type', 'users', 'meta'].sort());
    assert.equal(response.data.users.length, 0);
    assert.deepEqual(helper.responseKeys(response.data.meta.next_page_payload).sort(), [].sort());
  });

  it('Should pass when id is valid', async function() {
    const userResponse = await userService.create({name: 'ABC'}).catch(function(e) {return e});

    const dupData = JSON.parse(JSON.stringify(userData));
    dupData.id = userResponse.data.user.id;
    delete dupData.airdropped;
    const response = await userService.list(dupData).catch(function(e) {return e});
    assert.equal(response.success, true);
  });

  it('Should fail when airdropped is blank', async function() {
    const dupData = JSON.parse(JSON.stringify(userData));
    dupData.airdropped = '';
    const response = await userService.list(dupData).catch(function(e) {return e});
    assert.equal(response.success, false);
    assert.equal(response.err.code, 'BAD_REQUEST');
    assert.deepEqual(helper.errorFields(response).sort(), ['airdropped'].sort());
  });

  it('Should fail when airdropped is invalid', async function() {
    const dupData = JSON.parse(JSON.stringify(userData));
    dupData.airdropped = 'abc';
    const response = await userService.list(dupData).catch(function(e) {return e});
    assert.equal(response.success, false);
    assert.equal(response.err.code, 'BAD_REQUEST');
    assert.deepEqual(helper.errorFields(response).sort(), ['airdropped'].sort());
  });

  it('Should pass when airdropped is true as string', async function() {
    const dupData = JSON.parse(JSON.stringify(userData));
    dupData.airdropped = 'true';
    const response = await userService.list(dupData).catch(function(e) {return e});
    assert.equal(response.success, true);
  });

  it('Should pass when airdropped is true', async function() {
    const dupData = JSON.parse(JSON.stringify(userData));
    dupData.airdropped = true;
    const response = await userService.list(dupData).catch(function(e) {return e});
    assert.equal(response.success, true);
  });

  it('Should pass when airdropped is false', async function() {
    const dupData = JSON.parse(JSON.stringify(userData));
    dupData.airdropped = false;
    const response = await userService.list(dupData).catch(function(e) {return e});
    assert.equal(response.success, true);
  });

  it('Should pass when airdropped is not sent', async function() {
    const dupData = JSON.parse(JSON.stringify(userData));
    delete dupData.airdropped;
    const response = await userService.list(dupData).catch(function(e) {return e});
    assert.equal(response.success, true);
  });

  it('Should fail when limit is 0', async function() {
    const dupData = JSON.parse(JSON.stringify(userData));
    dupData.limit = 0;
    const response = await userService.list(dupData).catch(function(e) {return e});
    assert.equal(response.success, false);
    assert.equal(response.err.code, 'BAD_REQUEST');
    assert.deepEqual(helper.errorFields(response).sort(), ['limit'].sort());
  });

  it('Should fail when limit is negative', async function() {
    const dupData = JSON.parse(JSON.stringify(userData));
    dupData.limit = -1;
    const response = await userService.list(dupData).catch(function(e) {return e});
    assert.equal(response.success, false);
    assert.equal(response.err.code, 'BAD_REQUEST');
    assert.deepEqual(helper.errorFields(response).sort(), ['limit'].sort());
  });

  it('Should fail when limit is greater than 100', async function() {
    const dupData = JSON.parse(JSON.stringify(userData));
    dupData.limit = 101;
    const response = await userService.list(dupData).catch(function(e) {return e});
    assert.equal(response.success, false);
    assert.equal(response.err.code, 'BAD_REQUEST');
    assert.deepEqual(helper.errorFields(response).sort(), ['limit'].sort());
  });

  it('Should fail when limit is string', async function() {
    const dupData = JSON.parse(JSON.stringify(userData));
    dupData.limit = 'ABC';
    const response = await userService.list(dupData).catch(function(e) {return e});
    assert.equal(response.success, false);
    assert.equal(response.err.code, 'BAD_REQUEST');
    assert.deepEqual(helper.errorFields(response).sort(), ['limit'].sort());
  });

  it('Should fail when limit is blank', async function() {
    const dupData = JSON.parse(JSON.stringify(userData));
    dupData.limit = '';
    const response = await userService.list(dupData).catch(function(e) {return e});
    assert.equal(response.success, false);
    assert.equal(response.err.code, 'BAD_REQUEST');
    assert.deepEqual(helper.errorFields(response).sort(), ['limit'].sort());
  });

  it('Should pass when limit is 20', async function() {
    const dupData = JSON.parse(JSON.stringify(userData));
    dupData.limit = '20';
    const response = await userService.list(dupData).catch(function(e) {return e});
    assert.equal(response.success, true);
  });

  it('Should pass when limit is not sent', async function() {
    const dupData = JSON.parse(JSON.stringify(userData));
    delete dupData.limit;
    const response = await userService.list(dupData).catch(function(e) {return e});
    assert.equal(response.success, true);
  });

  it('Should fail when order is invalid', async function() {
    const dupData = JSON.parse(JSON.stringify(userData));
    dupData.order = 'abc';
    const response = await userService.list(dupData).catch(function(e) {return e});
    assert.equal(response.success, false);
    assert.equal(response.err.code, 'BAD_REQUEST');
    assert.deepEqual(helper.errorFields(response).sort(), ['order'].sort());
  });

  it('Should pass when order is blank', async function() {
    const dupData = JSON.parse(JSON.stringify(userData));
    dupData.order = '';
    const response = await userService.list(dupData).catch(function(e) {return e});
    assert.equal(response.success, true);
  });

  it('Should pass when order is asc', async function() {
    const dupData = JSON.parse(JSON.stringify(userData));
    dupData.order = 'asc';
    const response = await userService.list(dupData).catch(function(e) {return e});
    assert.equal(response.success, true);
  });

  it('Should pass when order is desc', async function() {
    const dupData = JSON.parse(JSON.stringify(userData));
    dupData.order = 'desc';
    const response = await userService.list(dupData).catch(function(e) {return e});
    assert.equal(response.success, true);
  });

  it('Should pass when order is not sent', async function() {
    const dupData = JSON.parse(JSON.stringify(userData));
    delete dupData.order;
    const response = await userService.list(dupData).catch(function(e) {return e});
    assert.equal(response.success, true);
  });

  it('Should fail when order_by is invalid', async function() {
    const dupData = JSON.parse(JSON.stringify(userData));
    dupData.order_by = 'abc';
    const response = await userService.list(dupData).catch(function(e) {return e});
    assert.equal(response.success, false);
    assert.equal(response.err.code, 'BAD_REQUEST');
    assert.deepEqual(helper.errorFields(response).sort(), ['order_by'].sort());
  });

  it('Should pass when order_by is blank', async function() {
    const dupData = JSON.parse(JSON.stringify(userData));
    dupData.order_by = '';
    const response = await userService.list(dupData).catch(function(e) {return e});
    assert.equal(response.success, true);
  });

  it('Should pass when order_by is created', async function() {
    const dupData = JSON.parse(JSON.stringify(userData));
    dupData.order_by = 'created';
    const response = await userService.list(dupData).catch(function(e) {return e});
    assert.equal(response.success, true);
  });

  it('Should pass when order_by is created', async function() {
    const dupData = JSON.parse(JSON.stringify(userData));
    dupData.order_by = 'name';
    const response = await userService.list(dupData).catch(function(e) {return e});
    assert.equal(response.success, true);
  });

  it('Should pass when order_by is not sent', async function() {
    const dupData = JSON.parse(JSON.stringify(userData));
    delete dupData.order_by;
    const response = await userService.list(dupData).catch(function(e) {return e});
    assert.equal(response.success, true);
  });

  it('Should fail when page_no is 0', async function() {
    const dupData = JSON.parse(JSON.stringify(userData));
    dupData.page_no = 0;
    const response = await userService.list(dupData).catch(function(e) {return e});
    assert.equal(response.success, false);
    assert.equal(response.err.code, 'BAD_REQUEST');
    assert.deepEqual(helper.errorFields(response).sort(), ['page_no'].sort());
  });

  it('Should fail when page_no is negative', async function() {
    const dupData = JSON.parse(JSON.stringify(userData));
    dupData.page_no = -1;
    const response = await userService.list(dupData).catch(function(e) {return e});
    assert.equal(response.success, false);
    assert.equal(response.err.code, 'BAD_REQUEST');
    assert.deepEqual(helper.errorFields(response).sort(), ['page_no'].sort());
  });

  it('Should fail when page_no is string', async function() {
    const dupData = JSON.parse(JSON.stringify(userData));
    dupData.page_no = 'ABC';
    const response = await userService.list(dupData).catch(function(e) {return e});
    assert.equal(response.success, false);
    assert.equal(response.err.code, 'BAD_REQUEST');
    assert.deepEqual(helper.errorFields(response).sort(), ['page_no'].sort());
  });

  it('Should fail when page_no is blank', async function() {
    const dupData = JSON.parse(JSON.stringify(userData));
    dupData.page_no = '';
    const response = await userService.list(dupData).catch(function(e) {return e});
    assert.equal(response.success, false);
    assert.equal(response.err.code, 'BAD_REQUEST');
    assert.deepEqual(helper.errorFields(response).sort(), ['page_no'].sort());
  });

  it('Should fail when page_no is too big number', async function() {
    const dupData = JSON.parse(JSON.stringify(userData));
    dupData.page_no = 1000000000000000000;
    const response = await userService.list(dupData).catch(function(e) {return e});
    assert.equal(response.success, false);
    assert.equal(response.err.code, 'BAD_REQUEST');
    assert.deepEqual(helper.errorFields(response).sort(), ['page_no'].sort());
  });

  it('Should pass when page_no is not sent', async function() {
    const dupData = JSON.parse(JSON.stringify(userData));
    delete dupData.page_no;
    const response = await userService.list(dupData).catch(function(e) {return e});
    assert.equal(response.success, true);
  });

  it('should pass when response data keys match', async function() {
    const response = await userService.list().catch(function(e) {return e});
    assert.equal(response.success, true);
    assert.deepEqual(helper.responseKeys(response).sort(), ['success', 'data'].sort());
    assert.deepEqual(Object.keys(response.data).sort(), ['result_type', 'users', 'meta'].sort());
    assert.equal(response.data.result_type, "users");
    assert.isAbove(response.data.users.length, 1);
    assert.deepEqual(Object.keys(response.data.users[0]).sort(), ['id', 'addresses', 'name', 'airdropped_tokens', 'token_balance'].sort());
    assert.equal(response.data.users[0].addresses.length, 1);
    assert.equal(response.data.users[0].addresses[0].length, 2);
    assert.exists(response.data.users[0].addresses[0][0]);
    assert.exists(response.data.users[0].addresses[0][1]);
    assert.deepEqual(Object.keys(response.data.meta).sort(), ['next_page_payload'].sort());

    if (Object.keys(response.data.meta.next_page_payload).length > 0) {
      assert.deepEqual(helper.responseKeys(response.data.meta.next_page_payload).sort(), ['order_by', 'order', 'page_no', 'limit'].sort());

      // Send next page request
      const responsePage2 = await userService.list(response.data.meta.next_page_payload).catch(function(e) {return e});
      assert.equal(responsePage2.success, true);
      assert.isAbove(responsePage2.data.users.length, 0);
    }
  });

});