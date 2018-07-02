// Load cache service
const rootPrefix = "../../.."
  , helper = require(rootPrefix + '/test/v1/helper')
  , OSTSDK = require(rootPrefix + '/index')
  , ostObj = new OSTSDK({apiEndpoint: helper.OST_KIT_API_ENDPOINT, apiKey: helper.OST_KIT_API_KEY, apiSecret: helper.OST_KIT_API_SECRET})
;

describe('services/v1/transactions/execute (ARBITRARY COMMISSION PERCENT AND AMOUNT)', function () {
  const coreTestCases = require(rootPrefix + "/test/v1_core/transactions/execute_arbitrary_commission_percent_and_amount");
  coreTestCases.setOSTSDK( ostObj );
  coreTestCases.setHelper( helper );
  coreTestCases.startTests();
});
