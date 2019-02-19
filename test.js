"use strict";
const rootPrefix = ".",

    chai = require("chai"),
    assert = chai.assert,
    RequestKlass = require(rootPrefix + "/lib/request"),
    fs = require("fs"),
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
        config: {timeout: 15}
    }),
    userService = ostObj.services.users,
    chainService = ostObj.services.chains,
    tokenService = ostObj.services.tokens,
    deviceService = ostObj.services.devices,
    sessionService = ostObj.services.sessions,
    pricePoints = ostObj.services.price_points;


var userId, deviceAddrs;

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
        userId = res["data"]["user"]["id"];

    });
}

function getUser() {

    it("test get user ", async function () {
        let res = await userService.get({id: userId}).catch(function (err) {
            console.log(JSON.stringify(err));
            assert.fail('get User testcase is failed');
        });
        assert.equal(res.success, true);
    });

}

function getChain() {

    it("test get chain ", async function () {
        let res = await chainService.get({chain_id: '200'}).catch(function (err) {
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
            deviceAddrs = res;
            let resp = await deviceService.create(
                {
                    user_id: userId,
                    address: res,
                    api_signer_address: '0x5F860598383868e8E8Ee0ffC5ADD92369Db37455',
                    device_uuid: '593a967f-87bd-49a6-976c-52edf46c4df4',
                    device_name: 'Iphone S'
                }).catch(function (err) {
                console.log(JSON.stringify(err));
                assert.fail('create device testcase is failed');
            });
            assert.equal(resp.success, true);
            // get device device testcase
            getDevice();
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
    let sessionAddrs = process.env.OST_KIT_SESSION_ADDRESS;
    if (sessionAddrs) {
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
}

function getpricePoints() {

    it("test get price points", async function () {
        let res = await pricePoints.get({a: [1, 2, 3, "a"]}).catch(function (err) {
            console.log(JSON.stringify(err));
            assert.fail('get price points testcase is failed');
        });
        assert.equal(res.success, true);
    });


}

async function generateRandomAddrs() {
    let buffer = await require('crypto').randomBytes(20);
    return "0x" + buffer.toString("hex");
}


function testcases() {
    createUser();
    userList();
    getChain();
    getUser();
    getTokenDetails();
    createDevice();
    getDeviceList();
    getUserSessionList();
    getUserSession();
    getpricePoints();
}

testcases();
