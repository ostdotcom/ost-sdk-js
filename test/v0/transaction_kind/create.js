// Load external packages
const chai = require('chai')
  , assert = chai.assert
  , Path = require('path')
  , os = require('os')
;

// Load cache service
const rootPrefix = "../../.."
  , OSTSDK = require(rootPrefix + '/index')
;

describe('services/v0/transaction_kind/create', function () {

  it('test', async function () {
    assert.equal(process.env.OST_KIT_HELLO_WORLD_VAR, 'hello world');
  });


});