// Load external packages
const chai = require('chai')
  , assert = chai.assert
;

// Load cache service
const rootPrefix = "../../.."
  ;


let helper = null
  , ostObj = null
  , transactionService = null
  , actionService = null
  , transactionData = null
;

let startTests = function (  ) {

  if ( !transactionService ) {
    transactionService = ostObj.services.transactions ;
  }

  if ( !actionService ) {
    actionService = ostObj.services.actions ;
  }

  transactionData = {from_user_id: helper.OST_KIT_TRANSFER_FROM_UUID, to_user_id: helper.OST_KIT_TRANSFER_TO_UUID, action_id: ''};

  it('FIRST PREPARE DATA FOR TRANSACTIONS', async function() {
    var actionData = {page_no: 1, limit: 100, order_by: 'created', order: 'desc', arbitrary_amount: false, arbitrary_commission: false};
    const response = await actionService.list(actionData).catch(function(e) {return e});
    transactionData.action_id = helper.getActionID( response );
  });

  it('Should fail when positive amount is sent', async function() {
    const dupData = JSON.parse(JSON.stringify(transactionData));
    dupData.amount = 1;
    const response = await transactionService.execute(dupData).catch(function(e) {return e});
    assert.equal(response.success, false);
    assert.equal(response.err.code, 'BAD_REQUEST');
    assert.deepEqual(helper.errorFields(response).sort(), ['amount'].sort());
  });

  it('Should fail when negative amount is sent', async function() {
    const dupData = JSON.parse(JSON.stringify(transactionData));
    dupData.amount = -1;
    const response = await transactionService.execute(dupData).catch(function(e) {return e});
    assert.equal(response.success, false);
    assert.equal(response.err.code, 'BAD_REQUEST');
    assert.deepEqual(helper.errorFields(response).sort(), ['amount'].sort());
  });

  it('Should fail when positive commission percent is sent', async function() {
    const dupData = JSON.parse(JSON.stringify(transactionData));
    dupData.commission_percent = 1;
    const response = await transactionService.execute(dupData).catch(function(e) {return e});
    assert.equal(response.success, false);
    assert.equal(response.err.code, 'BAD_REQUEST');
    assert.deepEqual(helper.errorFields(response).sort(), ['commission_percent'].sort());
  });

  it('Should fail when negative commission percent is sent', async function() {
    const dupData = JSON.parse(JSON.stringify(transactionData));
    dupData.commission_percent = -1;
    const response = await transactionService.execute(dupData).catch(function(e) {return e});
    assert.equal(response.success, false);
    assert.equal(response.err.code, 'BAD_REQUEST');
    assert.deepEqual(helper.errorFields(response).sort(), ['commission_percent'].sort());
  });

  it('Should fail when both commission percent and amount is sent', async function() {
    const dupData = JSON.parse(JSON.stringify(transactionData));
    dupData.commission_percent = 1;
    dupData.amount = 1;
    const response = await transactionService.execute(dupData).catch(function(e) {return e});
    assert.equal(response.success, false);
    assert.equal(response.err.code, 'BAD_REQUEST');
    assert.deepEqual(helper.errorFields(response).sort(), ['amount'].sort());
  });

  it('Should pass when valid data', async function() {
    const dupData = JSON.parse(JSON.stringify(transactionData));
    const response = await transactionService.execute(dupData).catch(function(e) {return e});

    assert.equal(response.success, true);
    assert.deepEqual(helper.responseKeys(response).sort(), ['success', 'data'].sort());
    assert.deepEqual(helper.responseKeys(response.data).sort(), ['result_type', 'transaction'].sort());
    assert.deepEqual(helper.responseKeys(response.data.transaction).sort(), ['id', 'from_user_id', 'to_user_id', 'amount', 'transaction_hash', 'action_id', 'timestamp', 'status', 'transaction_fee', 'commission_amount', 'gas_price', 'gas_used', 'block_number'].sort());

    assert.exists(response.data.transaction.id);
    assert.exists(response.data.transaction.from_user_id);
    assert.exists(response.data.transaction.to_user_id);
    assert.exists(response.data.transaction.action_id);
    assert.exists(response.data.transaction.timestamp);
    assert.exists(response.data.transaction.status);
    assert.exists(response.data.transaction.gas_price);
  });
};

module.exports = {
  startTests: startTests
  , setOSTSDK: function ( ostSdk ) {
    ostObj = ostSdk;
  }
  , setHelper: function ( helperObj ) {
    helper = helperObj;
  }
};