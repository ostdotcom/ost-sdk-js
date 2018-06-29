// Load cache service
const rootPrefix = "../../.."
  , helper = require(rootPrefix + '/test/v1_1/helper')
  , OSTSDK = require(rootPrefix + '/index')
  , ostObj = new OSTSDK({apiEndpoint: helper.OST_KIT_API_ENDPOINT, apiKey: helper.OST_KIT_API_KEY, apiSecret: helper.OST_KIT_API_SECRET})
;


describe('services/v1_1/transactions/execute (NON ARBITRARY PARAMS)', function () {
  const coreTestCases = require(rootPrefix + "/test/v1_core/transactions/execute_non_arbitrary_params");
  var transactionObjKeys =  coreTestCases.getTransactionObjKeys();
  transactionObjKeys.push("airdropped_amount");
  coreTestCases.setOSTSDK( ostObj );
  coreTestCases.setHelper( helper );
  coreTestCases.startTests();
});