// Load external packages
const chai = require('chai')
  , assert = chai.assert
;

const rootPrefix = "../../.."
    , OSTSDK = require(rootPrefix + '/index')
;

let helper        = null
  , ostObj        = null
  , tokenService  = null
;


let startTests = function ( it ) {

  if ( !helper ) {
    helper = require(rootPrefix + '/test/v1/helper');
  }

  ostObj = ostObj || new OSTSDK({apiEndpoint: helper.OST_KIT_API_ENDPOINT, apiKey: helper.OST_KIT_API_KEY, apiSecret: helper.OST_KIT_API_SECRET});

  if ( !tokenService ) {
    tokenService = ostObj.services.token;
  }

  it('Should return promise', async function() {
    const response = tokenService.get({}).catch(function(e) {return e});
    assert.typeOf(response, 'Promise');
  });

  it('Should pass when id is valid', async function() {
    const response = await tokenService.get({}).catch(function(e) {return e});

    assert.equal(response.success, true);
    assert.deepEqual(helper.responseKeys(response).sort(), ['success', 'data'].sort());
    assert.deepEqual(helper.responseKeys(response.data).sort(), ['result_type', 'token', 'price_points'].sort());
    assert.equal(response.data.result_type, "token");
    assert.deepEqual(Object.keys(response.data.token).sort(), ["company_uuid","name","symbol","symbol_icon",
      "conversion_factor","token_erc20_address","simple_stake_contract_address", "airdrop_contract_address",
      "total_supply","ost_utility_balance"].sort());

    assert.exists(response.data.token.company_uuid);
    assert.exists(response.data.token.name);
    assert.exists(response.data.token.symbol);
    assert.exists(response.data.token.symbol_icon);
    assert.exists(response.data.token.conversion_factor);
    assert.exists(response.data.token.token_erc20_address);
    assert.exists(response.data.token.simple_stake_contract_address);
    assert.exists(response.data.token.total_supply);

    assert.equal(response.data.token.ost_utility_balance.length, 1);
    assert.equal(response.data.token.ost_utility_balance[0].length, 2);
    assert.exists(response.data.token.ost_utility_balance[0][0]);
    assert.exists(response.data.token.ost_utility_balance[0][1]);

    assert.deepEqual(Object.keys(response.data.price_points).sort(), ['OST'].sort());
    assert.deepEqual(Object.keys(response.data.price_points.OST).sort(), ['USD'].sort());
    assert.isAbove(parseFloat(response.data.price_points.OST.USD), 0);
  });
};

module.exports = {
  startTests: startTests
};