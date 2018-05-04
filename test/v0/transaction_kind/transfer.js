// Load external packages
const chai = require('chai')
  , assert = chai.assert
;

// Load cache service
const rootPrefix = "../../.."
  , helper = require(rootPrefix + '/test/v0/helper')
  , OSTSDK = require(rootPrefix + '/index')
  , ostObj = new OSTSDK({apiEndpoint: helper.OST_KIT_API_ENDPOINT, apiKey: helper.OST_KIT_API_KEY, apiSecret: helper.OST_KIT_API_SECRET})
  , transactionKindService = ostObj.services.transactionKind;
;

const transferTokenData = {from_uuid: helper.OST_KIT_TRANSFER_FROM_UUID, to_uuid: helper.OST_KIT_TRANSFER_TO_UUID, transaction_kind: helper.OST_KIT_TRANSFER_KIND};
const transferStatusData = {};

describe('services/v0/transaction_kind/transfer', function () {

  it('Transfer: should pass when response data keys match', async function() {
    const dupData = JSON.parse(JSON.stringify(transferTokenData));
    const response = await transactionKindService.execute(dupData);
    assert.equal(response.success, true);
    assert.deepEqual(helper.responseKeys(response).sort(), ['success', 'data'].sort());
    assert.deepEqual(helper.responseKeys(response.data).sort(), ['transaction_uuid', 'transaction_hash', 'from_uuid', 'to_uuid', 'transaction_kind'].sort());
    transferStatusData.transaction_uuids = [response.data.transaction_uuid];
  });

  it('Status: should pass when response data keys match', async function() {
    const dupData = JSON.parse(JSON.stringify(transferStatusData));
    const response = await transactionKindService.status(dupData);
    assert.equal(response.success, true);
    assert.deepEqual(helper.responseKeys(response).sort(), ['success', 'data'].sort());
    assert.deepEqual(Object.keys(response.data).sort(), ['client_tokens', 'transaction_types', 'economy_users', 'result_type', 'transactions'].sort());
    assert.equal(response.data.result_type, "transactions");
    assert.equal(response.data.transactions.length, 1);
    assert.deepEqual(Object.keys(response.data.transactions[0]).sort(), ['id', 'transaction_uuid', 'transaction_hash', 'from_user_id', 'to_user_id', 'transaction_type_id', 'client_token_id', 'status', 'gas_price', 'transaction_timestamp', 'uts'].sort());
  });

  it('Transfer: should return promise', async function() {
    const dupData = JSON.parse(JSON.stringify(transferTokenData));
    const response = transactionKindService.execute(dupData);
    assert.typeOf(response, 'Promise');
  });

  it('Status: should return promise', async function() {
    const dupData = JSON.parse(JSON.stringify(transferStatusData));
    const response = transactionKindService.status(dupData);
    assert.typeOf(response, 'Promise');
  });

  it('Transfer: should fail when data is undefined', async function() {
    const dupData = undefined;
    const response = await transactionKindService.execute(dupData).catch(function(e) {return e});
    assert.equal(response.success, false);
  });

  it('Transfer: should fail when from uuid is undefined', async function() {
    const dupData = JSON.parse(JSON.stringify(transferTokenData));
    dupData.from_uuid = undefined;
    const response = await transactionKindService.execute(dupData).catch(function(e) {return e});
    assert.equal(response.success, false);
  });

  it('Transfer: should fail when from uuid is invalid', async function() {
    const dupData = JSON.parse(JSON.stringify(transferTokenData));
    dupData.from_uuid = 'ad890eeb-6376-48d4-9e28-d29527013a2d';
    const response = await transactionKindService.execute(dupData).catch(function(e) {return e});
    assert.equal(response.success, false);
  });

  it('Transfer: should fail when to uuid is undefined', async function() {
    const dupData = JSON.parse(JSON.stringify(transferTokenData));
    dupData.to_uuid = undefined;
    const response = await transactionKindService.execute(dupData).catch(function(e) {return e});
    assert.equal(response.success, false);
  });

  it('Transfer: should fail when to uuid is invalid', async function() {
    const dupData = JSON.parse(JSON.stringify(transferTokenData));
    dupData.to_uuid = 'ad890eeb-6376-48d4-9e28-d29527013a2d';
    const response = await transactionKindService.execute(dupData).catch(function(e) {return e});
    assert.equal(response.success, false);
  });

  it('Transfer: should fail when transaction kind is undefined', async function() {
    const dupData = JSON.parse(JSON.stringify(transferTokenData));
    dupData.transaction_kind = undefined;
    const response = await transactionKindService.execute(dupData).catch(function(e) {return e});
    assert.equal(response.success, false);
  });

  it('Transfer: should fail when transaction kind is invalid', async function() {
    const dupData = JSON.parse(JSON.stringify(transferTokenData));
    dupData.transaction_kind = 'Acbsdhhkshdksd SDSDSDSD';
    const response = await transactionKindService.execute(dupData).catch(function(e) {return e});
    assert.equal(response.success, false);
  });

  it('Status: should fail when data is undefined', async function() {
    const dupData = undefined;
    const response = await transactionKindService.status(dupData).catch(function(e) {return e});
    assert.equal(response.success, false);
  });

  it('Status: should fail when transaction uuids is undefined', async function() {
    const dupData = JSON.parse(JSON.stringify(transferStatusData));
    dupData.transaction_uuids = undefined;
    const response = await transactionKindService.status(dupData).catch(function(e) {return e});
    assert.equal(response.success, false);
  });

  it('Status: should fail when transaction uuids is not array', async function() {
    const dupData = JSON.parse(JSON.stringify(transferStatusData));
    dupData.transaction_uuids = dupData.transaction_uuids[0];
    const response = await transactionKindService.status(dupData).catch(function(e) {return e});
    assert.equal(response.data.transactions.length, 0);
  });

  it('Status: should fail when transaction uuids is invalid', async function() {
    const dupData = JSON.parse(JSON.stringify(transferStatusData));
    dupData.transaction_uuids = dupData.transaction_uuids[0]+'12';
    const response = await transactionKindService.status(dupData).catch(function(e) {return e});
    assert.equal(response.success, false);
  });

});