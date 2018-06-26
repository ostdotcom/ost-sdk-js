// Load cache service
const rootPrefix = "../../.."
  , helper = require(rootPrefix + '/test/v1_1/helper')
  , OSTSDK = require(rootPrefix + '/index')
  , ostObj = new OSTSDK({apiEndpoint: helper.OST_KIT_API_ENDPOINT, apiKey: helper.OST_KIT_API_KEY, apiSecret: helper.OST_KIT_API_SECRET})
;

describe('services/v1_1/transactions/list', function () {
  const coreTestCases = require(rootPrefix + "/test/v1_core/transactions/list");
  var transactionObjKeys =  coreTestCases.getTransactionObjKeys();
  transactionObjKeys.push("airdrop_amount");
  coreTestCases.setOSTSDK( ostObj );
  coreTestCases.setHelper( helper );
  coreTestCases.startTests();
});