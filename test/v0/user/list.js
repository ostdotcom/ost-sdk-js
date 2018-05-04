// Load external packages
const chai = require('chai')
  , assert = chai.assert
;

// Load cache service
const rootPrefix = "../../.."
  , helper = require(rootPrefix + '/test/v0/helper')
  , OSTSDK = require(rootPrefix + '/index')
  , ostObj = new OSTSDK({apiEndpoint: helper.OST_KIT_API_ENDPOINT, apiKey: helper.OST_KIT_API_KEY, apiSecret: helper.OST_KIT_API_SECRET})
  , userService = ostObj.services.user
;

describe('services/v0/user/list', function () {

  it('should pass when response data keys match', async function() {
    const response = await userService.list();
    assert.equal(response.success, true);
    assert.deepEqual(helper.responseKeys(response).sort(), ['success', 'data'].sort());
    assert.deepEqual(Object.keys(response.data).sort(), ['result_type', 'economy_users', 'meta'].sort());
    assert.equal(response.data.result_type, "economy_users");
    assert.isAbove(response.data.economy_users.length, 1);
    assert.deepEqual(Object.keys(response.data.economy_users[0]).sort(), ['id', 'name', 'uuid', 'total_airdropped_tokens', 'token_balance'].sort());
    assert.deepEqual(Object.keys(response.data.meta).sort(), ['next_page_payload'].sort());
  });

  it('should return promise', async function() {
    const response = userService.list();
    assert.typeOf(response, 'Promise');
  });

});