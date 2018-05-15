// Load external packages
const chai    = require('chai')
  , assert    = chai.assert
  , BigNumber = require('bignumber.js')
;

// Load action service
const rootPrefix    = "../../.."
  , helper          = require(rootPrefix + '/test/v1/helper')
  , OSTSDK          = require(rootPrefix + '/index')
  , sdkConfig       = {
      apiEndpoint : helper.OST_KIT_API_ENDPOINT
      , apiKey    : helper.OST_KIT_API_KEY
      , apiSecret : helper.OST_KIT_API_SECRET
    }
  , ostObj          = new OSTSDK( sdkConfig )
  , actionsService  = ostObj.services.actions
  , logMe           = true
;

      

// Main Describe Method.
const describeMethod = function () { 
  // Execute create Action Test-Cases.
  createActionTestCases();
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

    assert.isNotOk( bnAmount.isNaN(), "action.bnAmount is NaN" );
    assert.isOk( bnAmount.isGreaterThanOrEqualTo( bnMin ), "action.amount is not greater than or equal to minimum expected value." );
  }

  //7. Validate commission_percent
  if ( action.arbitrary_commission || action.kind !== ActionKinds.USER_TO_USER ) {
    assert.isNull( action.commission_percent, "action.kind is not null when action.arbitrary_commission is true OR action.kind is not " + ActionKinds.USER_TO_USER );
  } else {
    let bnCommissionPercent = new BigNumber( action.commission_percent );
    assert.isNotOk( bnCommissionPercent.isNaN(), "action.commission_percent is NaN" );
    assert.isOk( bnCommissionPercent.isGreaterThanOrEqualTo( 0 ), "action.commission_percent is lesser than 0.");
    assert.isOk( bnCommissionPercent.isLessThanOrEqualTo( 100 ), "action.commission_percent is greater than 100.");
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

const createActionTestCases = function () {
  // Generate Test Case.
  let ArbitraryAmountVals = [true, false]
    , ArbitraryCommissionVals = [true, false]
    
    // kind length & count
    , kinds   = ActionKindsArray
    , kindLen = kinds.length
    , kindCnt
    , cKind   /* Current Kind */
    , isKindValid

    // currency length & count
    , currencies  = ActionCurrenciesArray
    , currencyLen = currencies.length
    , currencyCnt
    , cCurrency
    , isCurrencyValid


    // amounts
    , amountData = {
      valid: {
        "USD"   : [{arbitrary_amount: true}, { amount: 0.01, arbitrary_amount: false }, { amount: 99.99, arbitrary_amount: false }, { amount: "99.99", arbitrary_amount: false } ]
        , "BT"  : [{arbitrary_amount: true}, { amount: 0.00001, arbitrary_amount: false }, { amount: "0.00001", arbitrary_amount: false }, { amount: 99.99999, arbitrary_amount: false }, { amount: "99.99999", arbitrary_amount: false }]
        , "UNKNOWN": [{arbitrary_amount: true}]
      }
      , invalid: {
        "USD"   : [{arbitrary_amount: false}, { amount: 0.0099, arbitrary_amount: false }, { amount: 99.99, arbitrary_amount: true }]
        , "BT"  : [{arbitrary_amount: false}, { amount: 0.0000099, arbitrary_amount: false }, { amount: 99.99999, arbitrary_amount: true }]
      }
    }
    , amtTestCaseKey
    , amounts
    , amtCnt
    , amtLen
    , cAmountData
    , isAmountDataValid

    //commission
    , commissionData = {
      valid: { 
        "user_to_user": [{arbitrary_commission: true}, { commission_percent: 0.01, arbitrary_commission: false }, { commission_percent: 100, arbitrary_commission: false }]
      }
      , invalid: {
        "user_to_user"      : [{ commission_percent: -0.01, arbitrary_commission: false }, { commission_percent: 100.01, arbitrary_commission: false }]
        , "company_to_user" : [{arbitrary_commission: true}, { commission_percent: 1.00, arbitrary_commission: false }]
        , "user_to_company" : [{arbitrary_commission: true}, { commission_percent: 1.00, arbitrary_commission: false }]
        , "UNKNOWN_KIND": [{arbitrary_commission: true}]
      }
    }
    , comTestCaseKey
    , commissions
    , comCnt
    , comLen
    , cComData
    , isCommissionValid

    , params
    , finalParams
    , testCaseMeta
    , shouldBreak 
  ;

  //determine kind.
  for( kindCnt = 0; kindCnt <= kindLen; kindCnt++ ) {
    if ( kindCnt === kindLen ) {
      cKind = "UNKNOWN_KIND";
      isKindValid = false;
      shouldBreak = true;
    } else {
      cKind = kinds[ kindCnt ];
      isKindValid = true;      
      shouldBreak = false;
    }

    //determine currency.
    for ( currencyCnt = 0; currencyCnt <= currencyLen; currencyCnt++ ) {

      if ( currencyCnt === currencyLen ) {
        cCurrency = "UNKNOWN";
        isCurrencyValid = false;
        shouldBreak = true;
      } else {
        cCurrency = currencies[ currencyCnt ];
        isCurrencyValid = true;        
      }


      //determine amount.
      for( amtTestCaseKey in amountData ) { 
        if ( !amountData.hasOwnProperty( amtTestCaseKey ) ) { continue; }
        isAmountDataValid = amtTestCaseKey === "valid";

        amounts = amountData[ amtTestCaseKey ][ cCurrency ];        
        amtLen = amounts.length;

        for( amtCnt = 0; amtCnt < amtLen; amtCnt++ )  {
          cAmountData = amounts[ amtCnt ];

          // Build params
          params = {
            kind        : cKind
            , currency  : cCurrency
          };
          Object.assign( params, cAmountData);

          // Build testCaseMeta.
          testCaseMeta = {
            isCommissionValid: true
            , isAmountDataValid: isAmountDataValid
            , isKindValid: isKindValid
            , isCurrencyValid: isCurrencyValid
          };

          if ( !isAmountDataValid ) {
            finalParams = Object.assign( {}, params);

            commissions = commissionData[ "valid" ][ cKind ];
            if ( commissions && commissions.length ) {
              cComData = commissions[ 0 ];
              Object.assign( finalParams, cComData);
            }
            testCreateAction( finalParams, testCaseMeta );
            if ( shouldBreak ) { break; } else { continue; }
          }

          //determine commission.
          for( comTestCaseKey in commissionData ) {
            if ( !commissionData.hasOwnProperty( comTestCaseKey ) ) { continue; }

            isCommissionValid = comTestCaseKey === "valid";
            testCaseMeta.isCommissionValid = isCommissionValid;
            commissions = commissionData[ comTestCaseKey ][ cKind ];


            if ( !commissions || !commissions.length ) { 
              //No commission data for this Test-Case.
              if ( isCommissionValid ) {
                finalParams = Object.assign( {}, params);
                testCreateAction( params, testCaseMeta );
              }
              if ( shouldBreak ) { break; } else { continue; }
            }

            comLen = commissions.length;
            for( comCnt = 0; comCnt < comLen; comCnt++ ) {
              
              finalParams = Object.assign( {}, params);
              cComData = commissions[ comCnt ];
              Object.assign( finalParams, cComData);
              testCreateAction( finalParams, testCaseMeta );

              if ( shouldBreak ) { break; }
            } /* End: for comCnt < comLen */

            if ( shouldBreak ) { break; }
          } /* End: for comTestCaseKey in commissionData */

          if ( shouldBreak ) { break; }
        } /* End: for amtCnt < amtLen */

        if ( shouldBreak ) { break; }
      } /* End: for amtTestCaseKey in amountData */

      if ( shouldBreak ) { break; }
    } /* End: for currencyCnt < currencyLen */

  } /* End: for kindCnt < kindLen */
};


let createActionCnt = 0;
const testCreateAction = function ( params, testCaseMeta ) {
  createActionCnt ++;

  let allValid = true
    , metaKey
    , itMsg
    , paramKey
    , paramVal
    , metaMsg
    , metaVal
  ;

  metaMsg = " TestCaseMeta [";
  for( metaKey in testCaseMeta ) {
    if ( !testCaseMeta.hasOwnProperty( metaKey) ) { continue; }

    metaVal   = testCaseMeta[ metaKey ];
    if ( allValid === false && metaVal === false ) {
      console.log("Unnecessary test-case. params", params, "testCaseMeta", testCaseMeta);
      throw "Unnecessary test-case";
    }
    allValid  = allValid && metaVal;
    metaMsg  += metaKey + ": " + metaVal + " ";
  }
  metaMsg += "]";

  itMsg = allValid ? "should create new action with " : "should FAIL to create new action with ";
  let namePostFix = allValid ? "P" : "F";
  params.name =  "C" + createActionCnt + " " + Date.now() + namePostFix;
  testCaseMeta.isNameValid = true;

  for( paramKey in params ) {
    if ( !params.hasOwnProperty( paramKey) ) { continue; }
    paramVal = params[ paramKey ] ;
    itMsg += paramKey + ": " + paramVal + "<" + typeof paramVal + "> ";
  }

  itMsg += metaMsg;
  if ( allValid ) {
    it( itMsg, async function () {
      let finalParams = Object.assign( {}, params );
      let response = await actionsService.create( finalParams ).catch(function(e) {return e});
      if ( response.err ) {
        console.log("UNEXPECTED :: response.err", response.err);  
      }
      

      // Response should be valid.
      helper.validateSuccessResponse( response );

      let action = response.data.action;
      // Validate received action.
      validateAction( action, params );
    });

  } else {
    it( itMsg, async function () {
      let finalParams = Object.assign( {}, params );

      let response = await actionsService.create( finalParams ).catch(function(e) {return e});
      if ( response.data ) {
        console.log("UNEXPECTED :: response.data", response.data);  
      }


      // Response should be invalid.
      helper.validateErrorResponse(response, "BAD_REQUEST");

      // Validate err_data.
      let error_data  = response.err.error_data
        , len         = error_data.length
        , cnt
        , errObj
        , errParameter
        , assertMsg
      ;

      for( cnt = 0; cnt < len; cnt++ ) {
        errObj = error_data[ cnt ];
        errParameter = errObj.parameter;
        assertMsg = "Unexpected Error: Did not expect '" + errParameter + "' to be invalid. params." + errParameter + " = " + params[ errParameter ]; 

        switch( errParameter ) {
          case "name": 
            assert.isNotOk( testCaseMeta.isNameValid, assertMsg);
            break;
          case "kind":
            assert.isNotOk( testCaseMeta.isKindValid, assertMsg);
            break;
          case "currency":
            assert.isNotOk( testCaseMeta.isCurrencyValid, assertMsg);
            break;
          case "arbitrary_amount":
          case "amount":
            assert.isNotOk( testCaseMeta.isAmountValid, assertMsg);
            break;
          case "arbitrary_commission":
          case "commission_percent":
            assert.isNotOk( testCaseMeta.isCommissionValid, assertMsg);
            break;
          default:
            assert.isOk( false, assertMsg );
            break;
        }
      }
    });    
  }
};

describe('services/v1/actions/create', describeMethod );
