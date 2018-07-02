// Load external packages
const chai    = require('chai')
  , assert    = chai.assert
  , BigNumber = require('bignumber.js')
;

// Load action service
const rootPrefix    = "../../.."
;

const OTHER_ACTION_ID = "123456"
    , INVALID_ACTION_IDS = "123456,123457"
;

let helper          = null
  , ostObj          = null
  , tokenService    = null
  , actionsService  = null
  , logMe           = false
;

// Main Describe Method.
let startTests = function () {

  logMe = helper.DEBUG;

  if (!tokenService) {
    tokenService = ostObj.services.token;
  }

  if( !actionsService ){
    actionsService  = ostObj.services.actions;
  }

// Execute list Action Test-Cases.
  listActionTestCases();
};


const listParams = {limit: '10', order: 'asc', order_by: 'created', page_no: '1'};
const listActionTestCases = function () {

  it('Should return promise', async function() {
    const params = undefined;
    const response = actionsService.list(params);
    assert.typeOf(response, 'Promise');
  });


  let createdActionIds = []
    , idValidator
  ;
  idValidator = async function() {
    const actionData = await createAction({
      kind: "user_to_user"
      , currency: "BT"
      , arbitrary_amount: true
      , arbitrary_commission: true
    });

    logMe && console.log("actionData\n", JSON.stringify( actionData ));

    const params    = {}
        , actionId  = actionData.id
    ;
    createdActionIds.push( actionId );
    params.id = createdActionIds.join(",");

    const response = await actionsService.list(params).catch(function(e) {return e});
    logMe && console.log("params\n", JSON.stringify( params ), "\nresponse\n", JSON.stringify( response ) );

    helper.validateSuccessResponse( response, "actions", true );

    assert.equal( response.data.actions.length, createdActionIds.length, "Unexpected number of records." );
  };

  it('Should pass when id is valid', idValidator);
  it('Should pass when id is comma separated list of 2 ids', idValidator);
  it('Should pass when id is comma separated list of 3 ids', idValidator);


  it('Should pass when id is invalid (Must have zero records)', async function() {
    const params = Object.assign({}, listParams);
    params.id = '86268074-18d7-4118-942f-fc9c8fd1429d111';
    const response = await actionsService.list(params).catch(function(e) {return e});
    
    helper.validateSuccessResponse( response, "actions", true );

    assert.equal( response.data.actions.length, 0, "No of expected records do not match." );

  });

  it('Should fail when id belongs to someone else', async function() {
    const params = Object.assign({}, listParams);
    params.id = OTHER_ACTION_ID;
    const response = await actionsService.list(params).catch(function(e) {return e});

    helper.validateSuccessResponse( response, "actions", true );

    assert.equal( response.data.actions.length, 0, "No of expected records do not match." );
  });

  it('Should fail when limit is 0', async function() {
    const params = Object.assign({}, listParams);
    params.limit = 0;
    const response = await actionsService.list(params).catch(function(e) {return e});
    helper.validateErrorResponse(response, 'BAD_REQUEST');
    assert.deepEqual(helper.errorFields(response).sort(), ['limit'].sort());
  });

  it('Should fail when limit is negative', async function() {
    const params = Object.assign({}, listParams);
    params.limit = -1;
    const response = await actionsService.list(params).catch(function(e) {return e});
    helper.validateErrorResponse(response, 'BAD_REQUEST');
    assert.deepEqual(helper.errorFields(response).sort(), ['limit'].sort());
  });

  it('Should fail when limit is greater than 100', async function() {
    const params = Object.assign({}, listParams);
    params.limit = 101;
    const response = await actionsService.list(params).catch(function(e) {return e});
    helper.validateErrorResponse(response, 'BAD_REQUEST');
    assert.deepEqual(helper.errorFields(response).sort(), ['limit'].sort());
  });

  it('Should fail when limit is string', async function() {
    const params = Object.assign({}, listParams);
    params.limit = 'ABC';
    const response = await actionsService.list(params).catch(function(e) {return e});
    helper.validateErrorResponse(response, 'BAD_REQUEST');
    assert.deepEqual(helper.errorFields(response).sort(), ['limit'].sort());
  });

  it('Should fail when limit is blank', async function() {
    const params = Object.assign({}, listParams);
    params.limit = '';
    const response = await actionsService.list(params).catch(function(e) {return e});
    helper.validateErrorResponse(response, 'BAD_REQUEST');
    assert.deepEqual(helper.errorFields(response).sort(), ['limit'].sort());
  });

  it('Should pass when limit is 20', async function() {
    const params = Object.assign({}, listParams);
    params.limit = '20';
    const response = await actionsService.list(params).catch(function(e) {return e});
    assert.equal(response.success, true);
  });

  it('Should fail when order is invalid', async function() {
    const params = Object.assign({}, listParams);
    params.order = 'abc';
    const response = await actionsService.list(params).catch(function(e) {return e});
    helper.validateErrorResponse(response, 'BAD_REQUEST');
    assert.deepEqual(helper.errorFields(response).sort(), ['order'].sort());
  });

  testListActionOrderBy("", true);
  testListActionOrderBy("name", true);
  testListActionOrderBy("kind", false);

  it('Should fail when page_no is 0', async function() {
    const params = Object.assign({}, listParams);
    params.page_no = 0;
    const response = await actionsService.list(params).catch(function(e) {return e});
    helper.validateErrorResponse(response, 'BAD_REQUEST');
    assert.deepEqual(helper.errorFields(response).sort(), ['page_no'].sort());
  });

  it('Should fail when page_no is negative', async function() {
    const params = Object.assign({}, listParams);
    params.page_no = -1;
    const response = await actionsService.list(params).catch(function(e) {return e});
    helper.validateErrorResponse(response, 'BAD_REQUEST');
    assert.deepEqual(helper.errorFields(response).sort(), ['page_no'].sort());
  });

  it('Should fail when page_no is string', async function() {
    const params = Object.assign({}, listParams);
    params.page_no = 'ABC';
    const response = await actionsService.list(params).catch(function(e) {return e});
    helper.validateErrorResponse(response, 'BAD_REQUEST');
    assert.deepEqual(helper.errorFields(response).sort(), ['page_no'].sort());
  });

  it('Should fail when page_no is blank', async function() {
    const params = Object.assign({}, listParams);
    params.page_no = '';
    const response = await actionsService.list(params).catch(function(e) {return e});
    helper.validateErrorResponse(response, 'BAD_REQUEST');
    assert.deepEqual(helper.errorFields(response).sort(), ['page_no'].sort());
  });

  it('Should fail when page_no is big number', async function() {
    const params = Object.assign({}, listParams);
    params.page_no = 1000000000000000000;
    const response = await actionsService.list(params).catch(function(e) {return e});
    helper.validateErrorResponse(response, 'BAD_REQUEST');
    assert.deepEqual(helper.errorFields(response).sort(), ['page_no'].sort());
  });

  testListActionFilter( "kind", ["user_to_user", "company_to_user", "user_to_company"] );
  testListActionFilter( "currency", ["USD", "BT"] );
  testListActionFilter( "arbitrary_amount", [true, false] );
  testListActionFilter( "arbitrary_commission", [true, false] );
  
};


const testListActionOrderBy = function ( orderByValue, shouldPass ) {

  let orderByMsgStr = orderByValue
    , passMsgStr    = shouldPass ? "pass" : "fail"
  ;

  if ( !orderByMsgStr ) {
    orderByMsgStr = "blank";
  }

  if ( !shouldPass ) {
    orderByMsgStr = "invalid (" + orderByMsgStr + ")";
  }

  it('Should ' + passMsgStr + ' when order is blank and order_by is ' + orderByMsgStr , async function() {
    const params = Object.assign({}, listParams);
    params.order = '';
    params.order_by = orderByValue;
    const response = await actionsService.list(params).catch(function(e) {return e});
    assert.equal(response.success, shouldPass);
  });

  it('Should ' + passMsgStr + ' when order is asc and order_by is ' + orderByMsgStr, async function() {
    const params = Object.assign({}, listParams);
    params.order = 'asc';
    params.order_by = orderByValue;
    const response = await actionsService.list(params).catch(function(e) {return e});
    assert.equal(response.success, shouldPass);
  });

  it('Should ' + passMsgStr + ' when order is desc and order_by is ' + orderByMsgStr , async function() {
    const params = Object.assign({}, listParams);
    params.order = 'desc';
    params.order_by = orderByValue;
    const response = await actionsService.list(params).catch(function(e) {return e});
    assert.equal(response.success, shouldPass);
  });

};

const testListActionFilter = function ( filterKey, validValues, invalidValue ) {
  validValues   = validValues || [];
  invalidValue  = invalidValue || "asd";

  const generateValidator = function ( values, shouldPass ) {
    return async function () {
      const params = Object.assign({}, listParams);
      params[ filterKey ] = values.join(",");
      const response = await actionsService.list(params).catch(function(e) {return e});

      logMe && console.log("-----\nparams:\n", JSON.stringify(params), "\nresponse:\n", JSON.stringify(response) );

      if ( shouldPass ) {
        assert.equal( response.success, true );
        let actions = response.data.actions;

        assert.isArray( actions );
        let len = actions.length;
        while( len-- ) {
          validateAction( actions[ len ] );
        }

      } else {
        assert.equal(response.success, false);
        assert.equal(response.err.code, 'BAD_REQUEST');
        assert.deepEqual(helper.errorFields(response).sort(), [ filterKey ].sort());
      }
    };
  };

  it('Should fail when ' + filterKey + ' is invalid (' + invalidValue + ')', generateValidator([invalidValue], false) );

  if ( validValues.length < 1 ) {
    return;
  }

  let fewInvalid = [ validValues[0], invalidValue ];
  it('Should fail when ' + filterKey + ' has a valid & an invalid (' + fewInvalid + ') value.', generateValidator( fewInvalid, false) );

  let len = validValues.length
    , validVal
  ;
  while( len-- ) {
    validVal = validValues[ len ];
    it('Should pass when ' + filterKey + ' is valid (' + validVal + ') value.', generateValidator( [validVal], true ) );
  }

  if ( validValues.length > 1 ) {
    if (    validValues.length === 2 
        &&  typeof validValues[0] === "boolean"
        &&  typeof validValues[1] === "boolean"
    )  {
      it('Should fail when ' + filterKey + ' has all valid boolean (' + validValues + ') values.', generateValidator( validValues, false ) );
    } 
    else {
      it('Should pass when ' + filterKey + ' has all valid (' + validValues + ') values.', generateValidator( validValues, true ) );
    }
  }

  if ( validValues.length > 2 ) {
    let fewValid = [ validValues[0], validValues[ 1 ] ];
    it('Should pass when ' + filterKey + ' has few valid (' + fewValid + ') values.', generateValidator( fewValid, true ) );
  }



}

let createActionCnt = 0;
const createAction = async function ( params ) {
  createActionCnt++;
  params.name =  "L" + createActionCnt + " " + Date.now();
  let response = await actionsService.create( params ).catch(function(e) {return e});

  if ( response && response.success && response.data && response.data.action && response.data.action.id ) {
    let action = response.data.action;
    return action;
  } else {
    console.log("Failed to create action for testing actions/list. response.data: ", response.data );
    throw "Failed to create action for testing actions/list.";
  }


};

const ActionKinds = {
      USER_TO_USER: "user_to_user"
      , COMPANY_TO_USER: "company_to_user"
      , USER_TO_COMPANY: "user_to_company"
    }
    , ActionKindsArray = ["user_to_user", "company_to_user", "user_to_company"]
    , ActionCurrencies = {
      USD: "USD",
      BT: "BT"
    }
    , ActionCurrenciesArray = ["USD", "BT"]
    , MIN_USD_AMOUNT = new BigNumber("0.01")
    , MIN_BT_AMOUNT = new BigNumber("0.00001")
;

const validateAction = function ( action, expectedAction ) {
  logMe && console.log("----- validateAction ----- \naction:", action, "\nexpectedAction:", expectedAction, "\n---------------");
  //1. Validate id
  assert.isString( action.id, "action.id is not a String");
  assert.isOk(action.id, "action.id is not valid (empty string)");

  //2. Validate arbitrary_amount
  assert.isBoolean( action.arbitrary_amount, "action.arbitrary_amount is not Boolean.");  

  //3. Validate name
  assert.isString( action.name, "action.name is not String");

  //4. Validate kind
  assert.include( ActionKindsArray, action.kind, "Invalid action.kind " + action.kind );

  //5. Validate currency
  assert.include( ActionCurrenciesArray, action.currency, "Invalid action.currency " + action.currency );  

  //6. Validate amount
  if ( action.arbitrary_amount ) {
    assert.isNull( action.amount, "action.amount is not null when action.arbitrary_amount is true");
  } else {
    assert.isString( action.amount, "action.amount is not a String");
    let bnAmount =  new BigNumber( action.amount )
      , bnMin
    ;
    assert.isNotOk( bnAmount.isNaN(), "action.amount is NaN" );

    switch( action.currency ) {
      case ActionCurrencies.USD:
        bnMin = MIN_USD_AMOUNT;
        break;
      case ActionCurrencies.BT:
        bnMin = MIN_BT_AMOUNT;
        break;
      default:
        assert.isOk( false, "Minimum amount for action currency " + action.currency + " is not known. Please update test case.");
    }

    assert.isNotOk( bnAmount.isNaN(), "action.bnAmount is NaN" );
    assert.isOk( bnAmount.isGreaterThanOrEqualTo( bnMin ), "action.amount is not greater than or equal to minimum expected value." );
  }

  //7. Validate commission_percent and arbitrary_commission
  if ( action.kind !== ActionKinds.USER_TO_USER ) {
    assert.isNull( action.arbitrary_commission, "action.arbitrary_commission is not null when action.kind is not " + ActionKinds.USER_TO_USER );
    assert.isNull( action.commission_percent, "action.commission_percent is not null when action.kind is not " + ActionKinds.USER_TO_USER );
  }
  else {
    //8. Validate arbitrary_commission
    assert.isBoolean( action.arbitrary_commission, "action.arbitrary_commission is not Boolean.");  

    if ( action.arbitrary_commission ) {
      assert.isNull( action.commission_percent, "action.commission_percent is not null when action.arbitrary_commission is true");
    } 
    else {
      let bnCommissionPercent = new BigNumber( action.commission_percent );
      assert.isNotOk( bnCommissionPercent.isNaN(), "action.commission_percent is NaN" );
      assert.isOk( bnCommissionPercent.isGreaterThanOrEqualTo( 0 ), "action.commission_percent is lesser than 0.");
      assert.isOk( bnCommissionPercent.isLessThanOrEqualTo( 100 ), "action.commission_percent is greater than 100.");
    }
  }

  if ( expectedAction ) {
    let bnKeys = ["amount", "commission_percent"]
      , expectedKey
      , expectedVal
      , actionVal
    ;
    for( expectedKey in expectedAction ) {
      if ( !expectedAction.hasOwnProperty( expectedKey ) ) {
        continue;
      }

      actionVal   = action[expectedKey];
      expectedVal = expectedAction[ expectedKey ];
      if ( bnKeys.indexOf( expectedKey ) < 0 ) {
        assert.equal( expectedVal, actionVal, "action." + expectedKey + " is not equal to expected value." );
      } else {
        actionVal   = new BigNumber( actionVal );
        expectedVal = new BigNumber( expectedVal );
        assert.isOk( actionVal.isEqualTo( expectedVal ), "action." + expectedKey + " is not equal to expected value. action." + expectedKey + " = " + actionVal.toString( 10 ) + ". expected Value = " + expectedVal.toString( 10 )  );
      }


    }
  }
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
