// Load external packages
const chai    = require('chai')
  , assert    = chai.assert
  , BigNumber = require('bignumber.js')
;

// Load cache service
const rootPrefix = "../.."
  , helper = require(rootPrefix + '/test/v1/helper')
  , OSTSDK = require(rootPrefix + '/index')
;

// Main Describe Method.
const describeMethod = function () { 
  actionListTestCase();
}

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

const validateAction = function ( action ) {
  console.log("Validating Action", action);
  //1. Validate id
  assert.isString( action.id, "action.id is not a String");
  assert.isOk(action.id, "action.id is not valid (empty string)");

  //2. Validate arbitrary_amount
  assert.isBoolean( action.arbitrary_amount, "action.arbitrary_amount is not Boolean.");

  //3. Validate arbitrary_commission
  assert.isBoolean( action.arbitrary_commission, "action.arbitrary_commission is not Boolean.");

  //4. Validate name
  assert.isString( action.name, "action.name is not String");

  //5. Validate kind
  assert.include( ActionKindsArray, action.kind, "Invalid action.kind " + action.kind );

  //6. Validate currency
  assert.include( ActionCurrenciesArray, action.currency, "Invalid action.currency " + action.currency );  

  //7. Validate amount
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

    assert.isOk( bnAmount.isGreaterThanOrEqualTo( bnMin ), "action.amount is not greater than or equal to minimum expected value." );

  }

  //7. Validate commission_percent
  if ( action.arbitrary_commission || action.kind !== ActionKinds.USER_TO_USER ) {
    assert.isNull( action.commission_percent, "action.kind is not null when action.arbitrary_commission is true OR action.kind is not " + ActionKinds.USER_TO_USER );
  } else {
    let bnCommissionPercent = new BigNumber( action.commission_percent );

    assert.isOk( bnCommissionPercent.isGreaterThanOrEqualTo( 0 ), "action.commission_percent is lesser than 0");
    assert.isOk( bnCommissionPercent.isLessThanOrEqualTo( 100 ), "action.commission_percent is greater than 100");
  }
  

};


const actionListTestCase = function ( minLength ) {
    it('should fetch the list of available actions', async function() {
    const ostObj = new OSTSDK({apiEndpoint: helper.OST_KIT_API_ENDPOINT, apiKey: helper.OST_KIT_API_KEY, apiSecret: helper.OST_KIT_API_SECRET})
      , actionsService = ostObj.services.actions
      , response = await actionsService.list().catch(function(e) {return e})
    ;
    helper.validateSuccessResponse( response, "actions" );

    let data        = response.data
      , actions     = data.actions
      , len         = actions.length
      , actionNames = []
      , cnt
    ;

    for( cnt = 0; cnt< len; cnt++ ) {
      validateAction( actions[ cnt ] );
    }

  });
};

describe('services/v1/actions', describeMethod );
