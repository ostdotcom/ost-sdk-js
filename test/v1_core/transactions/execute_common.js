// Load external packages
const chai = require('chai')
  , assert = chai.assert
;

// Load cache service
const rootPrefix = "../../.."
;

const companyToUserData = {};
const userToCompanyData = {};
const userToUserData = {};

let helper              = null
  , ostObj              = null
  , transactionService  = null
  , actionService       = null
  , transactionData     = null
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
    transactionData.action_id = response.data.actions[0].id;
  });

  it('FIRST PREPARE DATA FOR COMPANY TO USER KIND TRANSACTIONS', async function() {
    var actionData = {page_no: 1, limit: 10, order_by: 'created', order: 'desc', arbitrary_amount: false, kind: 'company_to_user'
    };
    const response = await actionService.list(actionData).catch(function(e) {return e});
    companyToUserData.action_id = response.data.actions[0].id;
  });

  it('FIRST PREPARE DATA FOR USER TO COMPANY KIND TRANSACTIONS', async function() {
    var actionData = {page_no: 1, limit: 10, order_by: 'created', order: 'desc', arbitrary_amount: false, kind: 'user_to_company'
    };
    const response = await actionService.list(actionData).catch(function(e) {return e});
    userToCompanyData.action_id = response.data.actions[0].id;
  });

  it('FIRST PREPARE DATA FOR USER TO USER KIND TRANSACTIONS', async function() {
    var actionData = {page_no: 1, limit: 10, order_by: 'created', order: 'desc', arbitrary_amount: false, arbitrary_commission: false,
      kind: 'user_to_user'
    };
    const response = await actionService.list(actionData).catch(function(e) {return e});
    userToUserData.action_id = response.data.actions[0].id;
  });

  it('Should return promise', async function() {
    const dupData = JSON.parse(JSON.stringify(transactionData));
    const response = transactionService.execute(dupData).catch(function(e) {return e});
    assert.typeOf(response, 'Promise');
  });

  it('Should fail when request data is undefined', async function() {
    const dupData = undefined;
    const response = await transactionService.execute(dupData).catch(function(e) {return e});
    assert.equal(response.success, false);
    assert.equal(response.err.code, 'BAD_REQUEST');
    assert.deepEqual(helper.errorFields(response).sort(), ['action_id'].sort());
  });

  it('Should fail when request data is empty object', async function() {
    const dupData = {};
    const response = await transactionService.execute(dupData).catch(function(e) {return e});
    assert.equal(response.success, false);
    assert.equal(response.err.code, 'BAD_REQUEST');
    assert.deepEqual(helper.errorFields(response).sort(), ['action_id'].sort());
  });

  it('Should fail when from user id is undefined for user to user kind', async function() {
    const dupData = JSON.parse(JSON.stringify(transactionData));
    dupData.from_user_id = undefined;
    dupData.action_id = userToUserData.action_id;
    const response = await transactionService.execute(dupData).catch(function(e) {return e});
    assert.equal(response.success, false);
    assert.equal(response.err.code, 'BAD_REQUEST');
    assert.deepEqual(helper.errorFields(response).sort(), ['from_user_id'].sort());
  });

  it('Should fail when from user id is not sent for user to user kind', async function() {
    const dupData = JSON.parse(JSON.stringify(transactionData));
    delete dupData.from_user_id;
    dupData.action_id = userToUserData.action_id;
    const response = await transactionService.execute(dupData).catch(function(e) {return e});
    assert.equal(response.success, false);
    assert.equal(response.err.code, 'BAD_REQUEST');
    assert.deepEqual(helper.errorFields(response).sort(), ['from_user_id'].sort());
  });

  it('Should pass when from user id is not sent for company to user kind', async function() {
    const dupData = JSON.parse(JSON.stringify(transactionData));
    delete dupData.from_user_id;
    dupData.action_id = companyToUserData.action_id;
    const response = await transactionService.execute(dupData).catch(function(e) {return e});
    assert.equal(response.success, true);
  });

  it('Should fail when from user id is blank for user to user kind', async function() {
    const dupData = JSON.parse(JSON.stringify(transactionData));
    dupData.from_user_id = '';
    dupData.action_id = userToUserData.action_id;
    const response = await transactionService.execute(dupData).catch(function(e) {return e});
    assert.equal(response.success, false);
    assert.equal(response.err.code, 'BAD_REQUEST');
    assert.deepEqual(helper.errorFields(response).sort(), ['from_user_id'].sort());
  });

  it('Should pass when from user id is blank for company to user kind', async function() {
    const dupData = JSON.parse(JSON.stringify(transactionData));
    dupData.from_user_id = '';
    dupData.action_id = companyToUserData.action_id;
    const response = await transactionService.execute(dupData).catch(function(e) {return e});
    assert.equal(response.success, true);
  });

  it('Should fail when from user id is invalid', async function() {
    const dupData = JSON.parse(JSON.stringify(transactionData));
    dupData.from_user_id = '86268074-18d7-4118-942f-fc9c8fd1429d111';
    const response = await transactionService.execute(dupData).catch(function(e) {return e});
    assert.equal(response.success, false);
    assert.equal(response.err.code, 'BAD_REQUEST');
    assert.deepEqual(helper.errorFields(response).sort(), ['from_user_id'].sort());
  });

  it('Should fail when from user id belongs to someone else', async function() {
    const dupData = JSON.parse(JSON.stringify(transactionData));
    dupData.from_user_id = '4a090517-c16a-4f1a-bbca-6987059da51c';
    const response = await transactionService.execute(dupData).catch(function(e) {return e});
    assert.equal(response.success, false);
    assert.equal(response.err.code, 'BAD_REQUEST');
    assert.deepEqual(helper.errorFields(response).sort(), ['from_user_id'].sort());
  });

  it('Should fail when from user id is comma separated list', async function() {
    const dupData = JSON.parse(JSON.stringify(transactionData));
    dupData.from_user_id = '86268074-18d7-4118-942f-fc9c8fd1429d,86268074-18d7-4118-942f-fc9c8fd1429d';
    const response = await transactionService.execute(dupData).catch(function(e) {return e});
    assert.equal(response.success, false);
    assert.equal(response.err.code, 'BAD_REQUEST');
    assert.deepEqual(helper.errorFields(response).sort(), ['from_user_id'].sort());
  });

  it('C2U: Should fail when from user id is not reserve', async function() {
    var actionData = {page_no: 1, limit: 100, order_by: 'created', order: 'asc', kind: 'company_to_user', arbitrary_amount: false};
    const actionResponse = await actionService.list(actionData).catch(function(e) {return e});

    const dupData = JSON.parse(JSON.stringify(transactionData));
    dupData.action_id = actionResponse.data.actions[0].id;
    const response = await transactionService.execute(dupData).catch(function(e) {return e});
    assert.equal(response.success, false);
    assert.equal(response.err.code, 'BAD_REQUEST');
    assert.deepEqual(helper.errorFields(response).sort(), ['from_user_id'].sort());
  });

  it('Should fail when to user id is undefined for user to user kind', async function() {
    const dupData = JSON.parse(JSON.stringify(transactionData));
    dupData.to_user_id = undefined;
    dupData.action_id = userToUserData.action_id;
    const response = await transactionService.execute(dupData).catch(function(e) {return e});
    assert.equal(response.success, false);
    assert.equal(response.err.code, 'BAD_REQUEST');
    assert.deepEqual(helper.errorFields(response).sort(), ['to_user_id'].sort());
  });

  it('Should pass when to user id is undefined for user to company kind', async function() {
    const dupData = JSON.parse(JSON.stringify(transactionData));
    dupData.to_user_id = undefined;
    dupData.action_id = userToCompanyData.action_id;
    const response = await transactionService.execute(dupData).catch(function(e) {return e});
    assert.equal(response.success, true);
  });

  it('Should fail when to user id is not sent for user to user kind', async function() {
    const dupData = JSON.parse(JSON.stringify(transactionData));
    delete dupData.to_user_id;
    dupData.action_id = userToUserData.action_id;
    const response = await transactionService.execute(dupData).catch(function(e) {return e});
    assert.equal(response.success, false);
    assert.equal(response.err.code, 'BAD_REQUEST');
    assert.deepEqual(helper.errorFields(response).sort(), ['to_user_id'].sort());
  });

  it('Should pass when to user id is not sent for user to company kind', async function() {
    const dupData = JSON.parse(JSON.stringify(transactionData));
    delete dupData.to_user_id;
    dupData.action_id = userToCompanyData.action_id;
    const response = await transactionService.execute(dupData).catch(function(e) {return e});
    assert.equal(response.success, true);
  });

  it('Should fail when to user id is blank for user to user kind', async function() {
    const dupData = JSON.parse(JSON.stringify(transactionData));
    dupData.to_user_id = '';
    dupData.action_id = userToUserData.action_id;
    const response = await transactionService.execute(dupData).catch(function(e) {return e});
    assert.equal(response.success, false);
    assert.equal(response.err.code, 'BAD_REQUEST');
    assert.deepEqual(helper.errorFields(response).sort(), ['to_user_id'].sort());
  });

  it('Should pass when to user id is blank for user to company kind', async function() {
    const dupData = JSON.parse(JSON.stringify(transactionData));
    dupData.to_user_id = '';
    dupData.action_id = userToCompanyData.action_id;
    const response = await transactionService.execute(dupData).catch(function(e) {return e});

    assert.equal(response.success, true);
  });

  it('Should fail when to user id is invalid', async function() {
    const dupData = JSON.parse(JSON.stringify(transactionData));
    dupData.from_user_id = '86268074-18d7-4118-942f-fc9c8fd1429d111';
    const response = await transactionService.execute(dupData).catch(function(e) {return e});
    assert.equal(response.success, false);
    assert.equal(response.err.code, 'BAD_REQUEST');
    assert.deepEqual(helper.errorFields(response).sort(), ['from_user_id'].sort());
  });

  it('Should fail when to user id belongs to someone else', async function() {
    const dupData = JSON.parse(JSON.stringify(transactionData));
    dupData.from_user_id = '4a090517-c16a-4f1a-bbca-6987059da51c';
    const response = await transactionService.execute(dupData).catch(function(e) {return e});
    assert.equal(response.success, false);
    assert.equal(response.err.code, 'BAD_REQUEST');
    assert.deepEqual(helper.errorFields(response).sort(), ['from_user_id'].sort());
  });

  it('Should fail when to user id is comma separated list', async function() {
    const dupData = JSON.parse(JSON.stringify(transactionData));
    dupData.from_user_id = '86268074-18d7-4118-942f-fc9c8fd1429d,86268074-18d7-4118-942f-fc9c8fd1429d';
    const response = await transactionService.execute(dupData).catch(function(e) {return e});
    assert.equal(response.success, false);
    assert.equal(response.err.code, 'BAD_REQUEST');
    assert.deepEqual(helper.errorFields(response).sort(), ['from_user_id'].sort());
  });

  it('U2C: Should fail when to user id is not reserve for user to company kind', async function() {
    var actionData = {page_no: 1, limit: 100, order_by: 'created', order: 'asc', kind: 'user_to_company'};
    const actionResponse = await actionService.list(actionData).catch(function(e) {return e});

    const dupData = JSON.parse(JSON.stringify(transactionData));
    dupData.action_id = actionResponse.data.actions[0].id;
    const response = await transactionService.execute(dupData).catch(function(e) {return e});
    assert.equal(response.success, false);
    assert.equal(response.err.code, 'BAD_REQUEST');
    assert.deepEqual(helper.errorFields(response).sort(), ['to_user_id'].sort());
  });

  it('Should fail when action id is blank', async function() {
    const dupData = JSON.parse(JSON.stringify(transactionData));
    dupData.action_id = '';
    const response = await transactionService.execute(dupData).catch(function(e) {return e});
    assert.equal(response.success, false);
    assert.equal(response.err.code, 'BAD_REQUEST');
    assert.deepEqual(helper.errorFields(response).sort(), ['action_id'].sort());
  });

  it('Should fail when action id is undefined', async function() {
    const dupData = JSON.parse(JSON.stringify(transactionData));
    dupData.action_id = undefined;
    const response = await transactionService.execute(dupData).catch(function(e) {return e});
    assert.equal(response.success, false);
    assert.equal(response.err.code, 'BAD_REQUEST');
    assert.deepEqual(helper.errorFields(response).sort(), ['action_id'].sort());
  });

  it('Should fail when action id is not sent', async function() {
    const dupData = JSON.parse(JSON.stringify(transactionData));
    delete dupData.action_id;
    const response = await transactionService.execute(dupData).catch(function(e) {return e});
    assert.equal(response.success, false);
    assert.equal(response.err.code, 'BAD_REQUEST');
    assert.deepEqual(helper.errorFields(response).sort(), ['action_id'].sort());
  });

  it('Should fail when action id is 0', async function() {
    const dupData = JSON.parse(JSON.stringify(transactionData));
    dupData.action_id = 0;
    const response = await transactionService.execute(dupData).catch(function(e) {return e});
    assert.equal(response.success, false);
    assert.equal(response.err.code, 'BAD_REQUEST');
    assert.deepEqual(helper.errorFields(response).sort(), ['action_id'].sort());
  });

  it('Should fail when action id belongs to someone else', async function() {
    const dupData = JSON.parse(JSON.stringify(transactionData));
    dupData.action_id = 2000;
    const response = await transactionService.execute(dupData).catch(function(e) {return e});
    assert.equal(response.success, false);
    assert.equal(response.err.code, 'BAD_REQUEST');
    assert.deepEqual(helper.errorFields(response).sort(), ['action_id'].sort());
  });

  it('Should fail when action id if string', async function() {
    const dupData = JSON.parse(JSON.stringify(transactionData));
    dupData.action_id = '4a090517-c16a-4f1a-bbca-6987059da51c';
    const response = await transactionService.execute(dupData).catch(function(e) {return e});
    assert.equal(response.success, false);
    assert.equal(response.err.code, 'BAD_REQUEST');
    assert.deepEqual(helper.errorFields(response).sort(), ['action_id'].sort());
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