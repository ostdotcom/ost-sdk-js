// Load external packages
const chai = require('chai')
  , assert = chai.assert
;

// Load cache service
const rootPrefix = "../../.."
  , helper = require(rootPrefix + '/test/v0/helper')
  , OSTSDK = require(rootPrefix + '/index')
  , ostObj = new OSTSDK({apiEndpoint: helper.OST_KIT_API_ENDPOINT, apiKey: helper.OST_KIT_API_KEY, apiSecret: helper.OST_KIT_API_SECRET})
  , transactionKindService = ostObj.services.transactionKind
;

describe('services/v0/transaction_kind/list', function () {

  it('should pass when response data keys match', async function() {
    const response = await transactionKindService.list().catch(function(e) {return e});
    assert.equal(response.success, true);
    assert.deepEqual(helper.responseKeys(response).sort(), ['success', 'data'].sort());
    assert.deepEqual(Object.keys(response.data).sort(), ['result_type', 'transaction_types', 'meta', 'price_points', 'client_tokens'].sort());
    assert.equal(response.data.result_type, "transaction_types");
    assert.isAbove(response.data.transaction_types.length, 1);
    assert.deepEqual(Object.keys(response.data.transaction_types[0]).sort(), ['id', 'client_transaction_id', 'name', 'kind', 'currency_type', 'currency_value', 'commission_percent', 'uts'].sort());
    assert.deepEqual(Object.keys(response.data.client_tokens).sort(), ['client_id', 'name', 'symbol', 'symbol_icon', 'conversion_factor', 'token_erc20_address', 'airdrop_contract_addr', 'simple_stake_contract_addr'].sort());
    assert.deepEqual(Object.keys(response.data.meta).sort(), ['next_page_payload'].sort());
    assert.deepEqual(Object.keys(response.data.meta.next_page_payload).sort(), ['limit', 'order_by', 'order', 'page_no'].sort());
    assert.deepEqual(Object.keys(response.data.price_points).sort(), ['OST'].sort());
    assert.deepEqual(Object.keys(response.data.price_points.OST).sort(), ['USD'].sort());
    assert.isAbove(parseFloat(response.data.price_points.OST.USD), 0);
  });

  it('should return promise', async function() {
    const response = transactionKindService.list().catch(function(e) {return e});
    assert.typeOf(response, 'Promise');
  });

});