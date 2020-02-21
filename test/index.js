"use strict";
const rootPrefix = "..",

    chai = require("chai"),
    qs = require("qs"),
    assert = chai.assert,
    RequestKlass = require(rootPrefix + "/lib/request"),
    fs = require("fs"),
    configObj = JSON.parse(fs.readFileSync("test/config.json", 'utf8')),
    credentialObject = {
        apiKey: process.env.OST_KIT_API_KEY,
        secret: process.env.OST_KIT_API_SECRET
    },
    apiEndpont = process.env.OST_KIT_API_ENDPOINT,

    OSTSDK = require(rootPrefix + "/index"),
    //config is optional param, timeout should be given in seconds
    ostObj = new OSTSDK({
        apiKey: credentialObject.apiKey,
        apiSecret: credentialObject.secret,
        apiEndpoint: apiEndpont,
        config: {timeout: 100000}
    }),
    userService = ostObj.services.users,
    chainService = ostObj.services.chains,
    tokenService = ostObj.services.tokens,
    deviceService = ostObj.services.devices,
    sessionService = ostObj.services.sessions,
    pricePoints = ostObj.services.price_points,
    balanceService = ostObj.services.balance,
    deviceManagersService = ostObj.services.device_managers,
    recoveryOwnersService = ostObj.services.recovery_owners,
    rulesService = ostObj.services.rules,
    transactionsService = ostObj.services.transactions,
    baseTokensService = ostObj.services.base_tokens,
    webhooksService = ostObj.services.webhooks,
    redemptionsService = ostObj.services.redemptions,
    redeemableSkusService = ostObj.services.redeemable_skus,


    userId = process.env.OST_KIT_USER_ID,
    companyUserId = process.env.OST_KIT_COMPANY_USER_ID,
    auxChainId = process.env.OST_KIT_AUX_CHAIN_ID,
    transactionId = process.env.OST_KIT_TRANSACTION_ID,
    deviceAddrs = process.env.OST_KIT_USER_DEVICE_ADDRESS,
    sessionAddrs = process.env.OST_KIT_SESSION_ADDRESS,
    ruleAddress = process.env.OST_KIT_RULE_ADDRESS,
    user2TokenHolderAddress = process.env.OST_KIT_USER2_TOKEN_HOLDER_ADDRESS,
    recoveryOwnerAddress = process.env.OST_KIT_RECOVERY_OWNER_ADDRESS,
    redemptionId = process.env.OST_KIT_USER_REDEMPTION_ID,
    redeemableSkuId = process.env.OST_KIT_REDEEMABLE_SKU_ID
;

let webhookId = null;


function userList() {
    it("test user list", async function () {
        let res = await userService.getList().catch(function (err) {
            console.log(JSON.stringify(err));
            assert.fail('GET User list testcase is failed');
        });
        assert.equal(res.success, true);
    });
}

function createUser() {

    it("test create user ", async function () {
        let res = await userService.create({}).catch(function (err) {
            console.log(JSON.stringify(err));
            assert.fail('create User testcase is failed');
        });
        assert.equal(res.success, true);
    });

}


function getUser() {

    it("test get user ", async function () {
        let res = await userService.get({user_id: userId}).catch(function (err) {
            console.log(JSON.stringify(err));
            assert.fail('get User testcase is failed');
        });
        assert.equal(res.success, true);
    });

}

function getChain() {

    it("test get chain ", async function () {
        let res = await chainService.get({chain_id: auxChainId}).catch(function (err) {
            console.log(JSON.stringify(err));
            assert.fail('get chain testcase is failed');
        });
        assert.equal(res.success, true);
    });
}

function getTokenDetails() {

    it("test get token details ", async function () {
        let res = await tokenService.get({}).catch(function (err) {
            assert.fail('get token details testcase is failed');
        });
        assert.equal(res.success, true);
    });
}

function createDevice() {

    it("test create device ", function () {
        generateRandomAddrs().then(async function (res) {
            let resp = await deviceService.create(
                {
                    user_id: userId,
                    address: res,
                    api_signer_address: '0x5F860598383868e8E8Ee0ffC5ADD92369Db37455'
                }).catch(function (err) {
                console.log(JSON.stringify(err));
                assert.fail('create device testcase is failed');
            });
            assert.equal(resp.success, true);
            // get device device testcase

        })
    });

}


function getDevice() {
    it("test get device", async function () {
        let res = await deviceService.get({
            user_id: userId,
            device_address: deviceAddrs
        }).catch(function (err) {
            console.log(JSON.stringify(err));
            assert.fail('get device testcase is failed');
        });
        assert.equal(res.success, true);
    });

}


function getDeviceList() {

    it("test get device list ", async function () {
        let res = await deviceService.getList({
            user_id: userId
        }).catch(function (err) {
            console.log(JSON.stringify(err));
            assert.fail('get device list testcase is failed');
        });
        assert.equal(res.success, true);
    });

}

function getUserSessionList() {

    it("test get user session list", async function () {
        let res = await sessionService.getList({
            user_id: userId,
        }).catch(function (err) {
            console.log(JSON.stringify(err));
            assert.fail('get user session list testcase is failed');
        });
        assert.equal(res.success, true);
    });

}

function getUserSession() {
    it("test get user session", async function () {
        let res = await sessionService.get({
            user_id: userId,
            session_address: sessionAddrs
        }).catch(function (err) {
            console.log(JSON.stringify(err));
            assert.fail('get user session testcase is failed');
        });
        assert.equal(res.success, true);
    });
}

function getpricePoints() {

    it("test get price points", async function () {
        let res = await pricePoints.get({a: [1, 2, 3, "a"], chain_id: auxChainId}).catch(function (err) {
            console.log(JSON.stringify(err));
            assert.fail('get price points testcase is failed');
        });
        assert.equal(res.success, true);
    });


}

function getBalance() {
    it("test get balance", async function () {
        let res = await balanceService.get({
            user_id: userId
        }).catch(function (err) {
            assert.fail('get balance');
        });
        assert.equal(res.success, true);
    });
}


function getDeviceManagers() {
    it("test get device managers", async function () {
        let res = await deviceManagersService.get({
            user_id: userId,
            garbage_str: "~^[]%$#@!&*~,./?~()-_'this is garbage" // This garbage string is for testing
        }).catch(function (err) {
            console.log(JSON.stringify(err));
            assert.fail('get device managers');
        });
        assert.equal(res.success, true);
    });
}


function getRecoveryOwnerAddress() {
    it("test get recovery owners", async function () {
        let res = await recoveryOwnersService.get({
            user_id: userId,
            recovery_owner_address: recoveryOwnerAddress //"0x4e9314f004026F89Fc52790c3357b2D34FBA93b0"
        }).catch(function (err) {
            console.log(JSON.stringify(err));
            assert.fail('get recovery owners');
        });
        assert.equal(res.success, true);
    });
}


function getRules() {
    it("test get rules", async function () {
        let res = await rulesService.getList({}).catch(function (err) {
            console.log(JSON.stringify(err));
            assert.fail('get rules');
        });
        assert.equal(res.success, true);
    });
}

function executeTransactions() {
    it("test execute transaction", async function () {

        let raw_calldata = JSON.stringify({
            method: "directTransfers",
            parameters: [[user2TokenHolderAddress], ["1"]]
        });

        let executeParams = {
            user_id: companyUserId,
            to: ruleAddress,
            raw_calldata: raw_calldata
        };

        let res = await transactionsService.execute(executeParams).catch(function (err) {
            console.log(JSON.stringify(err));
            assert.fail('execute transaction');
        });
        assert.equal(res.success, true);
    });
}


function transactionsList() {
    it("test transaction list", async function () {
        let res = await transactionsService.getList({
            user_id: userId
        }).catch(function (err) {
            console.log(JSON.stringify(err));
            assert.fail('list transactions');
        });
        assert.equal(res.success, true);
    });
}


function getTransaction() {
    it("Test get transaction", async function () {
        let res = await transactionsService.get({
            user_id: userId,
            transaction_id: transactionId
        }).catch(function (err) {
            console.log(JSON.stringify(err));
            assert.fail('List transactions');
        });
        assert.equal(res.success, true);
    });
}

function createWebhook() {
  it("Test create webhook.", async function () {

    let webhookParams = {
      topics:['transactions/initiate','transactions/success'],
      url:`${"https://www.testingWebhooks.com"}/${Date.now()}/${process.version}`,
      status:"active"
    };

    let res = await webhooksService.create(webhookParams).catch(function (err) {
      console.log(JSON.stringify(err));
      assert.fail('Create webhook.');
    });
    assert.equal(res.success, true);

    webhookId = res.data[[res.data.result_type]].id;
  });
}

function updateWebhook() {
  it("Test update webhook.", async function () {

    let webhookParams = {
      webhook_id: webhookId,
      topics: ['transactions/initiate','transactions/success','transactions/failure'],
      status: "active"
    };

    let res = await webhooksService.update(webhookParams).catch(function (err) {
      console.log(JSON.stringify(err));
      assert.fail('Update webhook.');
    });
    assert.equal(res.success, true);
  });
}

function getWebhook() {
  it("Test get webhook.", async function () {

    let webhookParams = {
      webhook_id: webhookId
    };

    let res = await webhooksService.get(webhookParams).catch(function (err) {
      console.log(JSON.stringify(err));
      assert.fail('Get webhook.');
    });
    assert.equal(res.success, true);
  });
}

function getWebhookList() {
  it("Test get webhook list.", async function () {

    let res = await webhooksService.getList().catch(function (err) {
      console.log(JSON.stringify(err));
      assert.fail('Get webhook list.');
    });
    assert.equal(res.success, true);
  });
}

function deleteWebhook() {
  it("Test delete webhook.", async function () {

    let webhookParams = {
      webhook_id: webhookId
    };

    let res = await webhooksService.deleteWebhook(webhookParams).catch(function (err) {
      console.log(JSON.stringify(err));
      assert.fail('Delete webhook.');
    });
    assert.equal(res.success, true);
  });
}


function getRedemption() {
  it("Test get user redemption", async function () {
    let res = await redemptionsService.get({
      user_id: userId,
      redemption_id: redemptionId
    }).catch(function (err) {
      console.log(JSON.stringify(err));
      assert.fail('Get user redemption.');
    });
    assert.equal(res.success, true);
  });
}


function listRedemptions() {
  it("Test list user redemptions", async function () {
    let res = await redemptionsService.getList({
      user_id: userId,
      redemption_id: redemptionId
    }).catch(function (err) {
      console.log(JSON.stringify(err));
      assert.fail('List user redemptions.');
    });
    assert.equal(res.success, true);
  });
}

function getRedeemableSku() {
  it("Test get redeemable SKU by id", async function () {
    let res = await redeemableSkusService.get({
      redeemable_sku_id: redeemableSkuId
    }).catch(function (err) {
      console.log(JSON.stringify(err));
      assert.fail('Get redeemable SKU.');
    });
    assert.equal(res.success, true);
  });
}

function listRedeemableSkus() {
  it("Test list redeemable SKUs", async function () {
    let res = await redeemableSkusService.getList({}).catch(function (err) {
      console.log(JSON.stringify(err));
      assert.fail('List redeemable SKUs.');
    });
    assert.equal(res.success, true);
  });
}


function testWebhookRequestSignature() {
  it ("Tests webhook request signature.", async function () {
    let version = "2",
      requestTimestamp = '1559902637',
      signature = '2c56c143550c603a6ff47054803f03ee4755c9c707986ae27f7ca1dd1c92a824',
      stringifiedData = JSON.stringify({hello: "hello"}),
      webhookSecret = 'mySecret';

    let res = webhooksService.verifySignature(version, stringifiedData,requestTimestamp, signature, webhookSecret);
    assert.equal(res, true);
  })
}


function testSignature() {
    it("Signature should match with given one", function () {
        const requestObj = new RequestKlass({apiKey: '12121', apiSecret: 'dsdsd', apiEndpoint: "endpoint"}),
            credentialObjectForSignatureTest = {
                secret: configObj['api_secret_for_testing_signature']
            },
            testObjForSignature = configObj["testObjForSignature"],
            queryString = requestObj.formatQueryParams(testObjForSignature);
        var fullQueryString = requestObj.signQueryParamsTest(configObj["testResource"], queryString, credentialObjectForSignatureTest),
            queryStringObj = qs.parse(fullQueryString);
        assert.equal(queryStringObj.api_signature, configObj["signatureExpected"]);
    });
}

function getBaseTokensDetails() {

  it("test get base token details ", async function () {
    let res = await baseTokensService.get({}).catch(function (err) {
      assert.fail('get base token details testcase is failed');
    });
    assert.equal(res.success, true);
  });
}

async function generateRandomAddrs() {
    let buffer = await require('crypto').randomBytes(20);
    return "0x" + buffer.toString("hex");
}


async function testcases() {
    getBaseTokensDetails();
    createUser();
    userList();
    getChain();
    getUser();
    getTokenDetails();
    createDevice();
    getDeviceList();
    getUserSession();
    getUserSessionList();
    getpricePoints();
    getBalance();
    getDeviceManagers();
    getRecoveryOwnerAddress();
    getRules();
    executeTransactions();
    getTransaction();
    transactionsList();
    getDevice();
    testSignature();
    await createWebhook();
    await getWebhookList();
    await getWebhook();
    await updateWebhook();
    await deleteWebhook();
    testWebhookRequestSignature();
    getRedemption();
    listRedemptions();
    getRedeemableSku();
    listRedeemableSkus()
}

testcases();


