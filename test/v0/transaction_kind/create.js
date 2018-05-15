// Load external packages
const chai = require('chai')
  , assert = chai.assert
;

// Load cache service
const rootPrefix = "../../.."
  , helper = require(rootPrefix + '/test/v0/helper')
  , OSTSDK = require(rootPrefix + '/index')
  , ostObj = new OSTSDK({apiEndpoint: helper.OST_KIT_API_ENDPOINT, apiKey: helper.OST_KIT_API_KEY, apiSecret: helper.OST_KIT_API_SECRET})
  , transactionKindService = ostObj.services.transactionKind
;

const userToUserValidData = {name: 'Like', kind: 'user_to_user', currency_type: 'usd', currency_value: '0.01', commission_percent: '1'};
const companyToUserValidData = {name: 'Grant', kind: 'company_to_user', currency_type: 'bt', currency_value: '0.01', commission_percent: '0'};
const userToCompanyValidData = {name: 'Buy', kind: 'user_to_company', currency_type: 'bt', currency_value: '0.01', commission_percent: '0'};

describe('services/v0/transaction_kind/create', function () {

  it('should pass when response data keys match', async function() {
    const dupData = JSON.parse(JSON.stringify(userToUserValidData));
    dupData.name = dupData.name + ' ' + Math.round((new Date()).getTime() / 1000);
    const response = await transactionKindService.create(dupData);
    assert.equal(response.success, true);
    assert.deepEqual(helper.responseKeys(response).sort(), ['success', 'data'].sort());
    assert.equal(response.data.result_type, "transactions");
    assert.equal(response.data.transactions.length, 1);
    assert.deepEqual(Object.keys(response.data.transactions[0]).sort(), ['id', 'client_transaction_id', 'name', 'kind', 'currency_type', 'currency_value', 'commission_percent', 'uts'].sort());
  });

  it('should return promise', async function() {
    const dupData = JSON.parse(JSON.stringify(userToUserValidData));
    dupData.name = dupData.name + ' ' + Math.round((new Date()).getTime() / 1000);
    const response = transactionKindService.create(dupData);
    assert.typeOf(response, 'Promise');
  });

  it('should fail when data is undefined', async function() {
    const dupData = undefined;
    const response = await transactionKindService.create(dupData).catch(function(e) {return e});
    assert.equal(response.success, false);
    assert.deepEqual(helper.errorFields(response).sort(), ['name', 'kind', 'currency_value', 'currency_type'].sort());
  });

  it('should fail when name is undefined', async function() {
    const dupData = JSON.parse(JSON.stringify(userToUserValidData));
    dupData.name = undefined;
    const response = await transactionKindService.create(dupData).catch(function(e) {return e});
    assert.equal(response.success, false);
    assert.deepEqual(helper.errorFields(response).sort(), ['name'].sort());
  });

  it('should fail when name is less than 3 chars', async function() {
    const dupData = JSON.parse(JSON.stringify(userToUserValidData));
    dupData.name = "12";
    const response = await transactionKindService.create(dupData).catch(function(e) {return e});
    assert.equal(response.success, false);
    assert.deepEqual(helper.errorFields(response).sort(), ['name'].sort());
  });

  it('should fail when name is more than 20 chars', async function() {
    const dupData = JSON.parse(JSON.stringify(userToUserValidData));
    dupData.name = "123456789012345678901";
    const response = await transactionKindService.create(dupData).catch(function(e) {return e});
    assert.equal(response.success, false);
    assert.deepEqual(helper.errorFields(response).sort(), ['name'].sort());
  });

  it('should fail when kind is undefined', async function() {
    const dupData = JSON.parse(JSON.stringify(userToUserValidData));
    dupData.name = dupData.name + ' ' + Math.round((new Date()).getTime() / 1000);
    dupData.kind = undefined;
    const response = await transactionKindService.create(dupData).catch(function(e) {return e});
    assert.equal(response.success, false);
    assert.deepEqual(helper.errorFields(response).sort(), ['kind'].sort());
  });

  it('should fail when kind is invalid', async function() {
    const dupData = JSON.parse(JSON.stringify(userToUserValidData));
    dupData.name = dupData.name + ' ' + Math.round((new Date()).getTime() / 1000);
    dupData.kind = "test";
    const response = await transactionKindService.create(dupData).catch(function(e) {return e});
    assert.equal(response.success, false);
    assert.deepEqual(helper.errorFields(response).sort(), ['kind', 'commission_percent'].sort());
  });

  it('should fail when currency type is undefined', async function() {
    const dupData = JSON.parse(JSON.stringify(userToUserValidData));
    dupData.name = dupData.name + ' ' + Math.round((new Date()).getTime() / 1000);
    dupData.currency_type = undefined;
    const response = await transactionKindService.create(dupData).catch(function(e) {return e});
    assert.equal(response.success, false);
    assert.deepEqual(helper.errorFields(response).sort(), ['currency_type'].sort());
  });

  it('should fail when currency type is invalid', async function() {
    const dupData = JSON.parse(JSON.stringify(userToUserValidData));
    dupData.name = dupData.name + ' ' + Math.round((new Date()).getTime() / 1000);
    dupData.currency_type = "ABC";
    const response = await transactionKindService.create(dupData).catch(function(e) {return e});
    assert.equal(response.success, false);
    assert.deepEqual(helper.errorFields(response).sort(), ['currency_type'].sort());
  });

  it('should fail when currency value (USD) is undefined', async function() {
    const dupData = JSON.parse(JSON.stringify(userToUserValidData));
    dupData.name = dupData.name + ' ' + Math.round((new Date()).getTime() / 1000);
    dupData.currency_value = undefined;
    const response = await transactionKindService.create(dupData).catch(function(e) {return e});
    assert.equal(response.success, false);
    assert.deepEqual(helper.errorFields(response).sort(), ['currency_value'].sort());
  });

  it('should fail when currency value (USD) is less than 0.01', async function() {
    const dupData = JSON.parse(JSON.stringify(userToUserValidData));
    dupData.name = dupData.name + ' ' + Math.round((new Date()).getTime() / 1000);
    dupData.currency_value = 0.009;
    const response = await transactionKindService.create(dupData).catch(function(e) {return e});
    assert.equal(response.success, false);
    assert.deepEqual(helper.errorFields(response).sort(), ['currency_value'].sort());
  });

  it('should fail when currency value (USD) is greater than 100', async function() {
    const dupData = JSON.parse(JSON.stringify(userToUserValidData));
    dupData.name = dupData.name + ' ' + Math.round((new Date()).getTime() / 1000);
    dupData.currency_value = 100.01;
    const response = await transactionKindService.create(dupData).catch(function(e) {return e});
    assert.equal(response.success, false);
    assert.deepEqual(helper.errorFields(response).sort(), ['currency_value'].sort());
  });

  it('should fail when currency value (BT) is undefined', async function() {
    const dupData = JSON.parse(JSON.stringify(userToUserValidData));
    dupData.name = dupData.name + ' ' + Math.round((new Date()).getTime() / 1000);
    dupData.currency_value = undefined;
    dupData.currency_type = 'bt';
    const response = await transactionKindService.create(dupData).catch(function(e) {return e});
    assert.equal(response.success, false);
    assert.deepEqual(helper.errorFields(response).sort(), ['currency_value'].sort());
  });

  it('should fail when currency value (BT) is less than 0.00001', async function() {
    const dupData = JSON.parse(JSON.stringify(userToUserValidData));
    dupData.name = dupData.name + ' ' + Math.round((new Date()).getTime() / 1000);
    dupData.currency_value = 0.000009;
    dupData.currency_type = 'bt';
    const response = await transactionKindService.create(dupData).catch(function(e) {return e});
    assert.equal(response.success, false);
    assert.deepEqual(helper.errorFields(response).sort(), ['currency_value'].sort());
  });

  it('should fail when currency value (BT) is greater than 100', async function() {
    const dupData = JSON.parse(JSON.stringify(userToUserValidData));
    dupData.name = dupData.name + ' ' + Math.round((new Date()).getTime() / 1000);
    dupData.currency_value = 100.01;
    dupData.currency_type = 'bt';
    const response = await transactionKindService.create(dupData).catch(function(e) {return e});
    assert.equal(response.success, false);
    assert.deepEqual(helper.errorFields(response).sort(), ['currency_value'].sort());
  });

  it('U2U: should fail when commission percent is less than 0', async function() {
    const dupData = JSON.parse(JSON.stringify(userToUserValidData));
    dupData.name = dupData.name + ' ' + Math.round((new Date()).getTime() / 1000);
    dupData.commission_percent = -1;
    const response = await transactionKindService.create(dupData).catch(function(e) {return e});
    assert.equal(response.success, false);
    assert.deepEqual(helper.errorFields(response).sort(), ['commission_percent'].sort());
  });

  it('U2U: should fail when commission percent is greater than 100', async function() {
    const dupData = JSON.parse(JSON.stringify(userToUserValidData));
    dupData.name = dupData.name + ' ' + Math.round((new Date()).getTime() / 1000);
    dupData.commission_percent = 100.01;
    const response = await transactionKindService.create(dupData).catch(function(e) {return e});
    assert.equal(response.success, false);
    assert.deepEqual(helper.errorFields(response).sort(), ['commission_percent'].sort());
  });

  it('U2U: should pass when data is correct', async function() {
    const dupData = JSON.parse(JSON.stringify(userToUserValidData));
    dupData.name = dupData.name + ' ' + Math.round((new Date()).getTime() / 1000);
    dupData.commission_percent = 0;
    const response = await transactionKindService.create(dupData).catch(function(e) {return e});
    assert.equal(response.success, true);
  });

  it('C2U: should fail when commission percent is greater than 0', async function() {
    const dupData = JSON.parse(JSON.stringify(companyToUserValidData));
    dupData.name = dupData.name + ' ' + Math.round((new Date()).getTime() / 1000);
    dupData.commission_percent = 1;
    const response = await transactionKindService.create(dupData).catch(function(e) {return e});
    assert.equal(response.success, false);
    assert.deepEqual(helper.errorFields(response).sort(), ['commission_percent'].sort());
  });

  it('C2U: should pass when data is correct', async function() {
    const dupData = JSON.parse(JSON.stringify(companyToUserValidData));
    dupData.name = dupData.name + ' ' + Math.round((new Date()).getTime() / 1000);
    dupData.commission_percent = undefined;
    const response = await transactionKindService.create(dupData).catch(function(e) {return e});
    assert.equal(response.success, true);
  });

  it('U2C: should fail when commission percent is greater than 0', async function() {
    const dupData = JSON.parse(JSON.stringify(userToCompanyValidData));
    dupData.name = dupData.name + ' ' + Math.round((new Date()).getTime() / 1000);
    dupData.commission_percent = 1;
    const response = await transactionKindService.create(dupData).catch(function(e) {return e});
    assert.equal(response.success, false);
    assert.deepEqual(helper.errorFields(response).sort(), ['commission_percent'].sort());
  });

  it('U2C: should pass when data is correct', async function() {
    const dupData = JSON.parse(JSON.stringify(userToCompanyValidData));
    dupData.name = dupData.name + ' ' + Math.round((new Date()).getTime() / 1000);
    dupData.commission_percent = undefined;
    const response = await transactionKindService.create(dupData).catch(function(e) {return e});
    assert.equal(response.success, true);
  });


});