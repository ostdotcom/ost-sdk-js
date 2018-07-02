// Load cache service
const rootPrefix = "../.."
  , helper = require(rootPrefix + '/test/v1_1/helper')
;

describe('services/v1_1/generic', function () {
  const coreTestCases = require(rootPrefix + "/test/v1_core/generic");
  coreTestCases.setHelper( helper );
  coreTestCases.startTests();
});