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
    const response = await userService.list().catch(function(e) {return e});
    assert.equal(response.success, true);
    assert.deepEqual(helper.responseKeys(response).sort(), ['success', 'data'].sort());
    assert.deepEqual(Object.keys(response.data).sort(), ['result_type', 'economy_users', 'meta'].sort());
    assert.equal(response.data.result_type, "economy_users");
    assert.isAbove(response.data.economy_users.length, 1);
    assert.deepEqual(Object.keys(response.data.economy_users[0]).sort(), ['id', 'name', 'uuid', 'total_airdropped_tokens', 'token_balance'].sort());
    assert.deepEqual(Object.keys(response.data.meta).sort(), ['next_page_payload'].sort());

    if (Object.keys(response.data.meta.next_page_payload).length > 0) {
      assert.deepEqual(helper.responseKeys(response.data.meta.next_page_payload).sort(), ['order_by', 'order', 'page_no', 'limit'].sort());

      // Send next page request
      const responsePage2 = await userService.list(response.data.meta.next_page_payload).catch(function(e) {return e});
      assert.equal(responsePage2.success, true);
      assert.isAbove(responsePage2.data.economy_users.length, 0);
    }
  });

  it('should return promise', async function() {
    const response = userService.list().catch(function(e) {return e});
    assert.typeOf(response, 'Promise');
  });

});