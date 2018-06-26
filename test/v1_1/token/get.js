const rootPrefix = "../../.."
    , testCases = require(rootPrefix + "/test/v1/core/token.get")
;


describe('services/v1_1/token/get', function () {
  testCases.startTests( it );
});
