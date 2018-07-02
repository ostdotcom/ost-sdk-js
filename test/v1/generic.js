// Load cache service
const rootPrefix = "../.."
  , helper = require(rootPrefix + '/test/v1/helper')
;

describe('services/v1/generic', function () {
  const coreTestCases = require(rootPrefix + "/test/v1_core/generic");
  coreTestCases.setHelper( helper );
  coreTestCases.startTests();
});