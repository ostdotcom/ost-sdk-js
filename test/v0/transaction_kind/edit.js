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
    if (transaction_type.kind === 'user_to_user' && !userToUserValidData.client_transaction_id) {
      userToUserValidData.client_transaction_id = transaction_type.client_transaction_id;
      delete populateClientTransactionIdFor[populateClientTransactionIdFor.indexOf('userToUserValidData')];
    } else if (transaction_type.kind === 'company_to_user' && !companyToUserValidData.client_transaction_id) {
      companyToUserValidData.client_transaction_id = transaction_type.client_transaction_id;
      delete populateClientTransactionIdFor[populateClientTransactionIdFor.indexOf('companyToUserValidData')];
    } else if (transaction_type.kind === 'user_to_company' && !userToCompanyValidData.client_transaction_id) {
      userToCompanyValidData.client_transaction_id = transaction_type.client_transaction_id;
      delete populateClientTransactionIdFor[populateClientTransactionIdFor.indexOf('userToCompanyValidData')];
    }
  }
};

const userToUserValidData = {name: 'Like', kind: 'user_to_user', currency_type: 'USD', currency_value: '0.01', commission_percent: '1'};
const companyToUserValidData = {name: 'Grant', kind: 'company_to_user', currency_type: 'BT', currency_value: '0.01'};
const userToCompanyValidData = {name: 'Buy', kind: 'user_to_company', currency_type: 'BT', currency_value: '0.01'};

describe('services/v0/transaction_kind/edit', function () {

  it('FIRST PREPARE DATA FOR EDIT', async function() {
    const response = await transactionKindService.list().catch(function(e) {return e});
    getTransactionTypes(response);
  });

  it('should pass when response data keys match', async function() {
    const dupData = JSON.parse(JSON.stringify(userToUserValidData));
    dupData.name = helper.getActionName( dupData.name );
    const response = await transactionKindService.edit(dupData).catch(function(e) {return e});
    assert.equal(response.success, true);
    assert.deepEqual(helper.responseKeys(response).sort(), ['success', 'data'].sort());
    assert.equal(response.data.result_type, "transactions");
    assert.equal(response.data.transactions.length, 1);
    assert.deepEqual(Object.keys(response.data.transactions[0]).sort(), ['id', 'name', 'client_transaction_id', 'kind', 'currency_type', 'currency_value', 'commission_percent', 'uts'].sort());
    assert.equal(response.data.transactions[0].name, dupData.name);
    assert.equal(response.data.transactions[0].kind, dupData.kind);
    assert.equal(response.data.transactions[0].currency_type, dupData.currency_type);
    assert.equal(parseFloat(response.data.transactions[0].currency_value), parseFloat(dupData.currency_value));
    assert.equal(parseFloat(response.data.transactions[0].commission_percent), parseFloat(dupData.commission_percent));
  });

  it('should pass when name is not sent', async function() {
    const dupData = JSON.parse(JSON.stringify(userToUserValidData));
    delete dupData.name;
    const response = await transactionKindService.edit(dupData).catch(function(e) {return e});
    assert.equal(response.success, true);
    assert.deepEqual(helper.responseKeys(response).sort(), ['success', 'data'].sort());
    assert.equal(response.data.result_type, "transactions");
    assert.equal(response.data.transactions.length, 1);
    assert.deepEqual(Object.keys(response.data.transactions[0]).sort(), ['id', 'name', 'client_transaction_id', 'kind', 'currency_type', 'currency_value', 'commission_percent', 'uts'].sort());
    assert.equal(response.data.transactions[0].kind, dupData.kind);
    assert.equal(response.data.transactions[0].currency_type, dupData.currency_type);
    assert.equal(parseFloat(response.data.transactions[0].currency_value), parseFloat(dupData.currency_value));
    assert.equal(parseFloat(response.data.transactions[0].commission_percent), parseFloat(dupData.commission_percent));
  });

  it('should pass when kind is not sent', async function() {
    const dupData = JSON.parse(JSON.stringify(userToUserValidData));
    dupData.name = helper.getActionName( dupData.name );
    delete dupData.kind;
    const response = await transactionKindService.edit(dupData).catch(function(e) {return e});
    assert.equal(response.success, true);
    assert.deepEqual(helper.responseKeys(response).sort(), ['success', 'data'].sort());
    assert.equal(response.data.result_type, "transactions");
    assert.equal(response.data.transactions.length, 1);
    assert.deepEqual(Object.keys(response.data.transactions[0]).sort(), ['id', 'name', 'client_transaction_id', 'kind', 'currency_type', 'currency_value', 'commission_percent', 'uts'].sort());
    assert.equal(response.data.transactions[0].name, dupData.name);
    assert.equal(response.data.transactions[0].currency_type, dupData.currency_type);
    assert.equal(parseFloat(response.data.transactions[0].currency_value), parseFloat(dupData.currency_value));
    assert.equal(parseFloat(response.data.transactions[0].commission_percent), parseFloat(dupData.commission_percent));
  });

  it('should return promise', async function() {
    const dupData = JSON.parse(JSON.stringify(userToUserValidData));
    dupData.name = helper.getActionName( dupData.name );
    const response = transactionKindService.edit(dupData).catch(function(e) {return e});
    assert.typeOf(response, 'Promise');
  });

  it('should fail when data is undefined', async function() {
    const dupData = undefined;
    const response = await transactionKindService.edit(dupData).catch(function(e) {return e});
    assert.equal(response.success, false);
    assert.deepEqual(helper.errorFields(response).sort(), ['client_transaction_id'].sort());
  });

  it('should fail when client transaction id is undefined', async function() {
    const dupData = JSON.parse(JSON.stringify(userToUserValidData));
    dupData.client_transaction_id = undefined;
    const response = await transactionKindService.edit(dupData).catch(function(e) {return e});
    assert.equal(response.success, false);
    assert.deepEqual(helper.errorFields(response).sort(), ['client_transaction_id'].sort());
  });

  it('should fail when client transaction id is not present', async function() {
    const dupData = JSON.parse(JSON.stringify(userToUserValidData));
    delete dupData.client_transaction_id;
    const response = await transactionKindService.edit(dupData).catch(function(e) {return e});
    assert.equal(response.success, false);
    assert.deepEqual(helper.errorFields(response).sort(), ['client_transaction_id'].sort());
  });

  it('should pass when name is undefined', async function() {
    const dupData = JSON.parse(JSON.stringify(userToUserValidData));
    dupData.name = undefined;
    const response = await transactionKindService.edit(dupData).catch(function(e) {return e});
    assert.equal(response.success, true);
    assert.deepEqual(helper.responseKeys(response).sort(), ['success', 'data'].sort());
    assert.equal(response.data.result_type, "transactions");
    assert.equal(response.data.transactions.length, 1);
    assert.deepEqual(Object.keys(response.data.transactions[0]).sort(), ['id', 'name', 'client_transaction_id', 'kind', 'currency_type', 'currency_value', 'commission_percent', 'uts'].sort());
    assert.equal(response.data.transactions[0].kind, dupData.kind);
    assert.equal(response.data.transactions[0].currency_type, dupData.currency_type);
    assert.equal(parseFloat(response.data.transactions[0].currency_value), parseFloat(dupData.currency_value));
    assert.equal(parseFloat(response.data.transactions[0].commission_percent), parseFloat(dupData.commission_percent));
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

  it('should pass when kind is undefined', async function() {
    const dupData = JSON.parse(JSON.stringify(userToUserValidData));
    dupData.name = helper.getActionName( dupData.name );
    dupData.kind = undefined;
    const response = await transactionKindService.edit(dupData).catch(function(e) {return e});
    assert.equal(response.success, true);
    assert.deepEqual(helper.responseKeys(response).sort(), ['success', 'data'].sort());
    assert.equal(response.data.result_type, "transactions");
    assert.equal(response.data.transactions.length, 1);
    assert.deepEqual(Object.keys(response.data.transactions[0]).sort(), ['id', 'name', 'client_transaction_id', 'kind', 'currency_type', 'currency_value', 'commission_percent', 'uts'].sort());
    assert.equal(response.data.transactions[0].name, dupData.name);
    assert.equal(response.data.transactions[0].currency_type, dupData.currency_type);
    assert.equal(parseFloat(response.data.transactions[0].currency_value), parseFloat(dupData.currency_value));
    assert.equal(parseFloat(response.data.transactions[0].commission_percent), parseFloat(dupData.commission_percent));
  });

  it('should pass when kind is invalid', async function() {
    const dupData = JSON.parse(JSON.stringify(userToUserValidData));
    dupData.name = helper.getActionName( dupData.name );
    dupData.kind = "test";
    const response = await transactionKindService.edit(dupData).catch(function(e) {return e});
    assert.equal(response.success, true);
    assert.deepEqual(helper.responseKeys(response).sort(), ['success', 'data'].sort());
    assert.equal(response.data.result_type, "transactions");
    assert.equal(response.data.transactions.length, 1);
    assert.deepEqual(Object.keys(response.data.transactions[0]).sort(), ['id', 'name', 'client_transaction_id', 'kind', 'currency_type', 'currency_value', 'commission_percent', 'uts'].sort());
    assert.equal(response.data.transactions[0].name, dupData.name);
    assert.equal(response.data.transactions[0].currency_type, dupData.currency_type);
    assert.equal(parseFloat(response.data.transactions[0].currency_value), parseFloat(dupData.currency_value));
    assert.equal(parseFloat(response.data.transactions[0].commission_percent), parseFloat(dupData.commission_percent));
  });

  it('should pass when currency type is undefined', async function() {
    const dupData = JSON.parse(JSON.stringify(userToUserValidData));
    dupData.name = helper.getActionName( dupData.name );
    dupData.currency_type = undefined;
    const response = await transactionKindService.edit(dupData).catch(function(e) {return e});
    assert.equal(response.success, true);
    assert.deepEqual(helper.responseKeys(response).sort(), ['success', 'data'].sort());
    assert.equal(response.data.result_type, "transactions");
    assert.equal(response.data.transactions.length, 1);
    assert.deepEqual(Object.keys(response.data.transactions[0]).sort(), ['id', 'name', 'client_transaction_id', 'kind', 'currency_type', 'currency_value', 'commission_percent', 'uts'].sort());
    assert.equal(response.data.transactions[0].name, dupData.name);
    assert.equal(response.data.transactions[0].kind, dupData.kind);
    assert.equal(parseFloat(response.data.transactions[0].currency_value), parseFloat(dupData.currency_value));
    assert.equal(parseFloat(response.data.transactions[0].commission_percent), parseFloat(dupData.commission_percent));
  });

  it('should fail when currency type is invalid', async function() {
    const dupData = JSON.parse(JSON.stringify(userToUserValidData));
    dupData.name = helper.getActionName( dupData.name );
    dupData.currency_type = "ABC";
    const response = await transactionKindService.edit(dupData).catch(function(e) {return e});
    assert.equal(response.success, false);
    assert.deepEqual(helper.errorFields(response).sort(), ['currency_type'].sort());
  });

  it('should fail when currency value (USD) is less than 0.01', async function() {
    const dupData = JSON.parse(JSON.stringify(userToUserValidData));
    dupData.name = helper.getActionName( dupData.name );
    dupData.currency_value = 0.009;
    dupData.currency_type = 'usd';
    const response = await transactionKindService.edit(dupData).catch(function(e) {return e});
    assert.equal(response.success, false);
    assert.deepEqual(helper.errorFields(response).sort(), ['currency_value'].sort());
  });

  it('should fail when currency value (USD) is greater than 100', async function() {
    const dupData = JSON.parse(JSON.stringify(userToUserValidData));
    dupData.name = helper.getActionName( dupData.name );
    dupData.currency_value = 100.01;
    dupData.currency_type = 'usd';
    const response = await transactionKindService.edit(dupData).catch(function(e) {return e});
    assert.equal(response.success, false);
    assert.deepEqual(helper.errorFields(response).sort(), ['currency_value'].sort());
  });

  it('should fail when currency value (BT) is undefined', async function() {
    const dupData = JSON.parse(JSON.stringify(userToUserValidData));
    dupData.name = helper.getActionName( dupData.name );
    dupData.currency_value = undefined;
    dupData.currency_type = 'bt';
    const response = await transactionKindService.edit(dupData).catch(function(e) {return e});
    assert.equal(response.success, false);
    assert.deepEqual(helper.errorFields(response).sort(), ['currency_value'].sort());
  });

  it('should fail when currency value (BT) is less than 0.00001', async function() {
    const dupData = JSON.parse(JSON.stringify(userToUserValidData));
    dupData.name = helper.getActionName( dupData.name );
    dupData.currency_value = 0.000009;
    dupData.currency_type = 'bt';
    const response = await transactionKindService.edit(dupData).catch(function(e) {return e});
    assert.equal(response.success, false);
    assert.deepEqual(helper.errorFields(response).sort(), ['currency_value'].sort());
  });

  it('should fail when currency value (BT) is greater than 100', async function() {
    const dupData = JSON.parse(JSON.stringify(userToUserValidData));
    dupData.name = helper.getActionName( dupData.name );
    dupData.currency_value = 100.01;
    dupData.currency_type = 'bt';
    const response = await transactionKindService.edit(dupData).catch(function(e) {return e});
    assert.equal(response.success, false);
    assert.deepEqual(helper.errorFields(response).sort(), ['currency_value'].sort());
  });

  it('U2U: should pass when data is correct', async function() {
    const dupData = JSON.parse(JSON.stringify(userToUserValidData));
    dupData.name = helper.getActionName( dupData.name );
    dupData.currency_type = (dupData.currency_type=='USD' ? 'BT' : 'USD');
    const response = await transactionKindService.edit(dupData).catch(function(e) {return e});
    assert.equal(response.success, true);
    assert.equal(response.data.transactions[0].name, dupData.name);
    assert.equal(response.data.transactions[0].kind, dupData.kind);
    assert.equal(response.data.transactions[0].currency_type, dupData.currency_type);
    assert.equal(parseFloat(response.data.transactions[0].currency_value), parseFloat(dupData.currency_value));
    assert.equal(response.data.transactions[0].commission_percent, dupData.commission_percent);
  });

  it('C2U: should pass when data is correct', async function() {
    const dupData = JSON.parse(JSON.stringify(companyToUserValidData));
    dupData.name = helper.getActionName( dupData.name );
    dupData.currency_type = (dupData.currency_type=='USD' ? 'BT' : 'USD');
    dupData.commission_percent = undefined;
    const response = await transactionKindService.edit(dupData).catch(function(e) {return e});
    assert.equal(response.success, true);
    assert.equal(response.data.transactions[0].name, dupData.name);
    assert.equal(response.data.transactions[0].kind, dupData.kind);
    assert.equal(response.data.transactions[0].currency_type, dupData.currency_type);
    assert.equal(parseFloat(response.data.transactions[0].currency_value), parseFloat(dupData.currency_value));
    assert.equal(response.data.transactions[0].commission_percent, null);
  });

  it('U2C: should pass when data is correct', async function() {
    const dupData = JSON.parse(JSON.stringify(userToCompanyValidData));
    dupData.name = helper.getActionName( dupData.name );
    dupData.currency_type = (dupData.currency_type=='USD' ? 'BT' : 'USD');
    dupData.commission_percent = undefined;
    const response = await transactionKindService.edit(dupData).catch(function(e) {return e});
    assert.equal(response.success, true);
    assert.equal(response.data.transactions[0].name, dupData.name);
    assert.equal(response.data.transactions[0].kind, dupData.kind);
    assert.equal(response.data.transactions[0].currency_type, dupData.currency_type);
    assert.equal(parseFloat(response.data.transactions[0].currency_value), parseFloat(dupData.currency_value));
    assert.equal(response.data.transactions[0].commission_percent, null);
  });

});