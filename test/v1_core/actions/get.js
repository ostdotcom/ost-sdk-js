// Load external packages
const chai    = require('chai')
  , assert    = chai.assert
  , BigNumber = require('bignumber.js')
;

// Load action service
const rootPrefix    = "../../.."
;

const defaultParams = {id: ''};

let helper          = null
  , ostObj          = null
  , tokenService    = null
  , actionsService  = null
  , logMe           = false
;


let startTests = function () {

  logMe = helper.DEBUG;

  if (!tokenService) {
    tokenService = ostObj.services.token;
  }

  if( !actionsService ){
    actionsService  = ostObj.services.actions;
  }

  it('Should return promise', async function() {
    const params = Object.assign({}, defaultParams);
    const response = actionsService.get(params).catch(function(e) {return e});
    assert.typeOf(response, 'Promise');
  });

  it('Should fail when request data is undefined', async function() {
    const params = undefined;
    try {
      const response = await actionsService.get(params).catch(function(e) {return e});
    } catch (e) {
      assert.notEqual(e.message, '');
    }
  });

  it('Should fail when request data is empty object', async function() {
    const params = {};
    try {
      const response = await actionsService.get(params).catch(function(e) {return e});
    } catch (e) {
      assert.notEqual(e.message, '');
    }
  });

  it('Should pass when id is blank, but will return the list', async function() {
    const params = Object.assign({}, defaultParams);
    params.id = '';
    const response = await actionsService.get(params).catch(function(e) {return e});
    helper.validateSuccessResponse( response, "actions", true );

    let actions = response.data.actions;
    let len = actions.length;
    while( len-- ) {
      validateAction( actions[ len ] );
    }

  });

  it('Should fail when id is invalid', async function() {
    const params = Object.assign({}, defaultParams);
    params.id = '86268074-18d7-4118-942f-fc9c8fd1429d111';
    const response = await actionsService.get(params).catch(function(e) {return e});
    helper.validateErrorResponse(response, "NOT_FOUND");
  });

  it('Should fail when id belongs to someone else', async function() {
    const params = Object.assign({}, defaultParams);
    params.id = '123456';
    const response = await actionsService.get(params).catch(function(e) {return e});
    helper.validateErrorResponse(response, "NOT_FOUND");
  });

  it('Should pass when id is valid', async function() {

    const newActionData = await createAction({
      kind: "user_to_user"
      , currency: "BT"
      , arbitrary_amount: true
      , arbitrary_commission: true
    });

    logMe && console.log("Newly Created Action Data", JSON.stringify(newActionData));

    const params = Object.assign({}, defaultParams);
    params.id = newActionData.id;
    const response = await actionsService.get(params).catch(function(e) {return e});
    helper.validateSuccessResponse( response, "action", false );
    assert.deepEqual(helper.responseKeys(response.data).sort(), ['result_type', 'action'].sort());
    validateAction( response.data.action );


  });

  it('Should fail when id is comma separated list', async function() {
    const newActionData = await createAction({
      kind: "user_to_user"
      , currency: "BT"
      , arbitrary_amount: true
      , arbitrary_commission: true
    });

    logMe && console.log("Newly Created Action Data", JSON.stringify(newActionData));


    const params = Object.assign({}, defaultParams);
    params.id = actionIds.join(",");
    const response = await actionsService.get(params).catch(function(e) {return e});
    helper.validateErrorResponse(response, "NOT_FOUND");
  });

};

let createActionCnt = 0
  , actionIds = []
;
const createAction = async function ( params ) {
  createActionCnt++;
  params.name =  "L" + createActionCnt + " " + Date.now();
  let response = await actionsService.create( params ).catch(function(e) {return e});

  if ( response && response.success && response.data && response.data.action && response.data.action.id ) {
    let action = response.data.action;
    actionIds.push( action.id );
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
