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

async function getTransactionTypes(response) {
  var populateClientTransactionIdFor = ['userToUserValidData', 'companyToUserValidData', 'userToCompanyValidData'];
  for (i=0; i<response.data.transaction_types.length; i++) {
    if (populateClientTransactionIdFor.length == 0) {
      break;
    }
    var transaction_type = response.data.transaction_types[i];
    if (transaction_type.kind == 'user_to_user' && !userToUserValidData.client_transaction_id) {
      userToUserValidData.client_transaction_id = transaction_type.client_transaction_id;
      delete populateClientTransactionIdFor[populateClientTransactionIdFor.indexOf('userToUserValidData')];
    } else if (transaction_type.kind == 'company_to_user' && !companyToUserValidData.client_transaction_id) {
      companyToUserValidData.client_transaction_id = transaction_type.client_transaction_id;
      delete populateClientTransactionIdFor[populateClientTransactionIdFor.indexOf('companyToUserValidData')];
    } else if (transaction_type.kind == 'user_to_company' && !userToCompanyValidData.client_transaction_id) {
      userToCompanyValidData.client_transaction_id = transaction_type.client_transaction_id;
      delete populateClientTransactionIdFor[populateClientTransactionIdFor.indexOf('userToCompanyValidData')];
    }
  }
};

const userToUserValidData = {name: 'Like', kind: 'user_to_user', currency_type: 'usd', currency_value: '0.01', commission_percent: '1'};
const companyToUserValidData = {name: 'Grant', kind: 'company_to_user', currency_type: 'bt', currency_value: '0.01', commission_percent: '0'};
const userToCompanyValidData = {name: 'Buy', kind: 'user_to_company', currency_type: 'bt', currency_value: '0.01', commission_percent: '0'};

describe('services/v0/transaction_kind/edit', function () {

  it('FIRST PREPARE DATA FOR EDIT', async function() {
    const response = await transactionKindService.list();
    getTransactionTypes(response);
  });

  it('should pass when response data keys match', async function() {
    const dupData = JSON.parse(JSON.stringify(userToUserValidData));
    dupData.name = dupData.name + ' ' + Math.round((new Date()).getTime() / 1000);
    const response = await transactionKindService.edit(dupData);
    assert.equal(response.success, true);
    assert.deepEqual(helper.responseKeys(response).sort(), ['success', 'data'].sort());
    assert.equal(response.data.result_type, "transactions");
    assert.equal(response.data.transactions.length, 1);
    assert.deepEqual(Object.keys(response.data.transactions[0]).sort(), ['id', 'client_id', 'name', 'kind', 'currency_type', 'currency_value', 'commission_percent', 'uts'].sort());
  });

  it('should return promise', async function() {
    const dupData = JSON.parse(JSON.stringify(userToUserValidData));
    dupData.name = dupData.name + ' ' + Math.round((new Date()).getTime() / 1000);
    const response = transactionKindService.edit(dupData);
    assert.typeOf(response, 'Promise');
  });

  it('should fail when data is undefined', async function() {
    const dupData = undefined;
    const response = await transactionKindService.edit(dupData).catch(function(e) {return e});
    assert.equal(response.success, false);
    assert.deepEqual(helper.errorFields(response).sort(), [].sort());
  });

  it('should pass when name is undefined but name is not present in response', async function() {
    const dupData = JSON.parse(JSON.stringify(userToUserValidData));
    dupData.name = undefined;
    const response = await transactionKindService.edit(dupData).catch(function(e) {return e});
    assert.equal(response.success, true);
    assert.deepEqual(Object.keys(response.data.transactions[0]).sort(), ['id', 'client_id', 'kind', 'currency_type', 'currency_value', 'commission_percent', 'uts'].sort());
  });

  it('should fail when name is less than 3 chars', async function() {
    const dupData = JSON.parse(JSON.stringify(userToUserValidData));
    dupData.name = "12";
    const response = await transactionKindService.edit(dupData).catch(function(e) {return e});
    assert.equal(response.success, false);
    assert.deepEqual(helper.errorFields(response).sort(), ['name'].sort());
  });

  it('should fail when name is more than 20 chars', async function() {
    const dupData = JSON.parse(JSON.stringify(userToUserValidData));
    dupData.name = "123456789012345678901";
    const response = await transactionKindService.edit(dupData).catch(function(e) {return e});
    assert.equal(response.success, false);
    assert.deepEqual(helper.errorFields(response).sort(), ['name'].sort());
  });

  it('should fail when kind is invalid', async function() {
    const dupData = JSON.parse(JSON.stringify(userToUserValidData));
    dupData.name = dupData.name + ' ' + Math.round((new Date()).getTime() / 1000);
    dupData.kind = "test";
    const response = await transactionKindService.edit(dupData).catch(function(e) {return e});
    assert.equal(response.success, false);
    assert.deepEqual(helper.errorFields(response).sort(), ['kind', 'commission_percent'].sort());
  });

  it('should fail when currency type is invalid', async function() {
    const dupData = JSON.parse(JSON.stringify(userToUserValidData));
    dupData.name = dupData.name + ' ' + Math.round((new Date()).getTime() / 1000);
    dupData.currency_type = "ABC";
    const response = await transactionKindService.edit(dupData).catch(function(e) {return e});
    assert.equal(response.success, false);
    assert.deepEqual(helper.errorFields(response).sort(), ['currency_type'].sort());
  });

  it('should fail when currency value (USD) is less than 0.01', async function() {
    const dupData = JSON.parse(JSON.stringify(userToUserValidData));
    dupData.name = dupData.name + ' ' + Math.round((new Date()).getTime() / 1000);
    dupData.currency_value = 0.009;
    dupData.currency_type = 'usd';
    const response = await transactionKindService.edit(dupData).catch(function(e) {return e});
    assert.equal(response.success, false);
    assert.deepEqual(helper.errorFields(response).sort(), ['currency_value'].sort());
  });

  it('should fail when currency value (USD) is greater than 100', async function() {
    const dupData = JSON.parse(JSON.stringify(userToUserValidData));
    dupData.name = dupData.name + ' ' + Math.round((new Date()).getTime() / 1000);
    dupData.currency_value = 100.01;
    dupData.currency_type = 'usd';
    const response = await transactionKindService.edit(dupData).catch(function(e) {return e});
    assert.equal(response.success, false);
    assert.deepEqual(helper.errorFields(response).sort(), ['currency_value'].sort());
  });

  it('should fail when currency value (BT) is less than 0.00001', async function() {
    const dupData = JSON.parse(JSON.stringify(userToUserValidData));
    dupData.name = dupData.name + ' ' + Math.round((new Date()).getTime() / 1000);
    dupData.currency_value = 0.000009;
    dupData.currency_type = 'bt';
    const response = await transactionKindService.edit(dupData).catch(function(e) {return e});
    assert.equal(response.success, false);
    assert.deepEqual(helper.errorFields(response).sort(), ['currency_value'].sort());
  });

  it('should fail when currency value (BT) is greater than 100', async function() {
    const dupData = JSON.parse(JSON.stringify(userToUserValidData));
    dupData.name = dupData.name + ' ' + Math.round((new Date()).getTime() / 1000);
    dupData.currency_value = 100.01;
    dupData.currency_type = 'bt';
    const response = await transactionKindService.edit(dupData).catch(function(e) {return e});
    assert.equal(response.success, false);
    assert.deepEqual(helper.errorFields(response).sort(), ['currency_value'].sort());
  });

  it('U2U: should pass when data is correct', async function() {
    const dupData = JSON.parse(JSON.stringify(userToUserValidData));
    dupData.name = dupData.name + ' ' + Math.round((new Date()).getTime() / 1000);
    dupData.currency_type = (dupData.currency_type=='usd' ? 'bt' : 'usd');
    const response = await transactionKindService.create(dupData).catch(function(e) {return e});
    assert.equal(response.success, true);
  });

  it('C2U: should pass when data is correct', async function() {
    const dupData = JSON.parse(JSON.stringify(companyToUserValidData));
    dupData.name = dupData.name + ' ' + Math.round((new Date()).getTime() / 1000);
    dupData.currency_type = (dupData.currency_type=='usd' ? 'bt' : 'usd');
    const response = await transactionKindService.create(dupData).catch(function(e) {return e});
    assert.equal(response.success, true);
  });

  it('U2C: should pass when data is correct', async function() {
    const dupData = JSON.parse(JSON.stringify(userToCompanyValidData));
    dupData.name = dupData.name + ' ' + Math.round((new Date()).getTime() / 1000);
    dupData.currency_type = (dupData.currency_type=='usd' ? 'bt' : 'usd');
    const response = await transactionKindService.create(dupData).catch(function(e) {return e});
    assert.equal(response.success, true);
  });

});