"use strict";
const rootPrefix = ".",

  
  RequestKlass = require(rootPrefix + "/lib/request"),
  fs = require("fs"),
  credentialObject = {
    apiKey: process.env.OST_API_KEY,
    secret: process.env.OST_API_SECRET
  },
  apiEndpont = process.env.OST_API_ENDPOINT,

  OSTSDK = require(rootPrefix + "/index"),
  //config is optional param, timeout should be given in seconds
    ostObj = new OSTSDK({apiKey: credentialObject.apiKey, apiSecret: credentialObject.secret, apiEndpoint: apiEndpont, config:{timeout:15}}),
  userService = ostObj.services.users,
  chainService = ostObj.services.chains,
    tokenService = ostObj.services.tokens,
    deviceService = ostObj.services.devices,
    sessionService = ostObj.services.sessions,
    pricePoints = ostObj.services.price_points;
  // usersKycService = kycSdk.services.usersKyc,
  // usersKycDetailsService = kycSdk.services.usersKycDetails,
  // validateService = kycSdk.services.validators

;

function userList(){
    userService.list().then(function(res) { console.log(JSON.stringify(res)); }).catch(function(err) { console.log(JSON.stringify(err)); });
}

function createUser(){
    // id: c2c6fbb2-2531-4c80-9e43-e67195bb01c7
    userService.create({}).then(function(res) { console.log(JSON.stringify(res)); }).catch(function(err) { console.log(JSON.stringify(err)); });
}
function getUser(){
    userService.get({id: 'c2c6fbb2-2531-4c80-9e43-e67195bb01c7'}).then(function(res) { console.log(JSON.stringify(res)); }).catch(function(err) { console.log(JSON.stringify(err)); });
}

function getChain(){
    chainService.get({chain_id: '200'}).then(function(res) { console.log(JSON.stringify(res)); }).catch(function(err) { console.log(JSON.stringify(err)); });
}

function getTokenDetails() {
    tokenService.get({}).then(function(res) { console.log(JSON.stringify(res)); }).catch(function(err) { console.log(JSON.stringify(err)); });
}

function createDevice(){
    deviceService.create(
        {
            user_id: 'c2c6fbb2-2531-4c80-9e43-e67195bb01c7',
            address: '0x1Ea365269A3e6c8fa492eca9A531BFaC8bA1649E',
            api_signer_address: '0x5F860598383868e8E8Ee0ffC5ADD92369Db37455',
            device_uuid: '593a967f-87bd-49a6-976c-52edf46c4df4',
            device_name: 'Iphone S'
        }).then(function(res) { console.log(JSON.stringify(res)); }).catch(function(err) { console.log(JSON.stringify(err)); });
}


function getDevice() {
    deviceService.get({user_id: 'c2c6fbb2-2531-4c80-9e43-e67195bb01c7',
        device_address: '0x1Ea365269A3e6c8fa492eca9A531BFaC8bA1649E'}).then(function(res) { console.log(JSON.stringify(res)); }).catch(function(err) { console.log(JSON.stringify(err)); });
}


function getDeviceList() {
    deviceService.getList({user_id: 'c2c6fbb2-2531-4c80-9e43-e67195bb01c7',
// pagination_identifier: 'eyJsYXN0RXZhbHVhdGVkS2V5Ijp7InVpZCI6eyJTIjoiZDE5NGFhNzUtYWNkNS00ZjQwLWIzZmItZTczYTdjZjdjMGQ5In0sIndhIjp7IlMiOiIweDU4YjQxMDY0NzQ4OWI4ODYzNTliNThmZTIyMjYwZWIxOTYwN2IwZjYifX19',
// addresses: ["0x5906ae461eb6283cf15b0257d3206e74d83a6bd4","0xab248ef66ee49f80e75266595aa160c8c1abdd5a"]
    }).then(function(res) { console.log(JSON.stringify(res)); }).catch(function(err) { console.log(JSON.stringify(err)); });
}

function getUserSessionList(){
    sessionService.getList({user_id: 'c2c6fbb2-2531-4c80-9e43-e67195bb01c7',
    }).then(function(res) { console.log(JSON.stringify(res)); }).catch(function(err) { console.log(JSON.stringify(err)); });
}

function getUserSession(){
    sessionService.get({user_id: 'c2c6fbb2-2531-4c80-9e43-e67195bb01c7',
        session_address: '0x1Ea365269A3e6c8fa492eca9A531BFaC8bA1649E'}).then(function(res) { console.log(JSON.stringify(res)); }).catch(function(err) { console.log(JSON.stringify(err)); });

}

function getpricePoints(){
    pricePoints.get({a: [1,2,3,"a"]}).then(function(res) { console.log(JSON.stringify(res)); }).catch(function(err) { console.log(JSON.stringify(err)); });
}


function testcases() {
    userList();
    getChain();
    getUser();
    createUser();
    getTokenDetails();
    createDevice();
    getDevice();
    getDeviceList();
    getUserSessionList();
    getUserSession();
    getpricePoints();

}
testcases();
