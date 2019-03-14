# OST JavaScript SDK
[![Build Status](https://travis-ci.org/ostdotcom/ost-sdk-js.svg?branch=master)](https://travis-ci.org/ostdotcom/ost-sdk-js)


The official [OST](https://dev.ost.com/) JavaScript SDK.

## Introduction

OST is a complete technology solution enabling mainstream businesses 
to easily launch blockchain-based economies without 
requiring blockchain development.

At the core of OST is the concept of OST-powered Brand Tokens (BTs). 
BTs are white-label cryptocurrency tokens with utility representations 
running on highly-scalable Ethereum-based side blockchains, 
backed by OST tokens staked on Ethereum mainnet. Within a business’s 
token economy, BTs can only be transferred to whitelisted user addresses. 
This ensures that they stay within the token economy.

The OST technology stack is designed to give businesses everything they need 
to integrate, test, and deploy BTs. Within the OST suite of products, developers 
can use OST KIT to create, test, and launch Brand Tokens backed by OST. 

OST APIs and server-side SDKs make it simple and easy for developers to 
integrate blockchain tokens into their apps.

## Requirements

Integrating an OST SDK into your application can begin as soon as you create an account 
with OST KIT, requiring only three steps:
1. Sign-up on [https://kit.ost.com](https://kit.ost.com).
2. Create your Brand Token in OST KIT.
3. Obtain an API Key and API Secret from [https://kit.ost.com/mainnet/developer](https://kit.ost.com/mainnet/developer).

## Documentation

[https://dev.ost.com/](https://dev.ost.com/)

## Installation

Install OST JavaScript SDK

```bash
> npm install @ostdotcom/ost-sdk-js
```

## Getting Started

Require the SDK:

```node.js
const OSTSDK = require('@ostdotcom/ost-sdk-js');
```

Initialize the SDK object:

```node.js
// the latest valid API endpoint is "https://api.ost.com/mainnet/v2/"
const ostObj = new OSTSDK({apiKey: <api_key>, apiSecret: <api_secret>, apiEndpoint: <api_endpoint>,
config: {timeout: <timeout>});
```


## SDK Modules

If a user's private key is lost, they could lose access 
to their tokens. To tackle this risk, OST promotes a 
mobile-first approach and provides mobile (client) and server SDKs. 


* The server SDKs enable you to register users with KIT.
* The client SDKs provide the additional support required for 
the ownership and management of Brand Tokens by users so 
that they can create keys and control their tokens. 

### Users Module 

To register users with KIT, you can use the services provided in the Users module. 

Initialize a Users object to perform user-specific actions, like creating users:
    
```node.js
const usersService = ostObj.services.users;
```

Create a User with KIT:

```node.js
usersService.create({}).then(function(res) { console.log(JSON.stringify(res)); }).catch(function(err) { console.log(JSON.stringify(err)); });
```

Get User Detail:

```node.js
usersService.get({user_id: 'c2c6fbb2-2531-4c80-9e43-e67195bb01c7'}).then(function(res) { console.log(JSON.stringify(res)); }).catch(function(err) { console.log(JSON.stringify(err)); });
```

Get Users List:

```node.js
usersService.getList({ 
 // ids: ["c2c6fbb2-2531-4c80-9e43-e67195bb01c7", "d2c6fbb2-2531-4c80-9e43-e67195bb01c7"]
 // limit: 10 
}).then(function(res) { console.log(JSON.stringify(res)); }).catch(function(err) { console.log(JSON.stringify(err)); });
```


### Devices Module 

Once a user is created via the API, you can register the 
user’s device with KIT. Next, activate the user’s 
wallet on the user's device. Multiple devices can be 
registered per user. 


Initialize a Devices object to perform device-specific actions, 
like registering devices:

```node.js
const devicesService = ostObj.services.devices;
```

Create a Device for User:

```node.js
devicesService.create(
    {
    user_id: 'c2c6fbb2-2531-4c80-9e43-e67195bb01c7', 
    address: '0x1Ea365269A3e6c8fa492eca9A531BFaC8bA1649E',
    api_signer_address: '0x5F860598383868e8E8Ee0ffC5ADD92369Db37455',
    device_uuid: '593a967f-87bd-49a6-976c-52edf46c4df4',
    device_name: 'Iphone S'
    }).then(function(res) { console.log(JSON.stringify(res)); }).catch(function(err) { console.log(JSON.stringify(err)); });
```


Get User Device Detail:

```node.js
devicesService.get({
   user_id: "d194aa75-acd5-4f40-b3fb-e73a7cf7c0d9",
   device_address: "0x1Ea365269A3e6c8fa492eca9A531BFaC8bA1649E"
}).then(function(res) { console.log(JSON.stringify(res)); }).catch(function(err) { console.log(JSON.stringify(err)); });
```

Get User Devices List:

```node.js
devicesService.getList({user_id: 'c2c6fbb2-2531-4c80-9e43-e67195bb01c7',
// pagination_identifier: 'eyJsYXN0RXZhbHVhdGVkS2V5Ijp7InVpZCI6eyJTIjoiZDE5NGFhNzUtYWNkNS00ZjQwLWIzZmItZTczYTdjZjdjMGQ5In0sIndhIjp7IlMiOiIweDU4YjQxMDY0NzQ4OWI4ODYzNTliNThmZTIyMjYwZWIxOTYwN2IwZjYifX19',
// addresses: ["0x5906ae461eb6283cf15b0257d3206e74d83a6bd4","0xab248ef66ee49f80e75266595aa160c8c1abdd5a"]
// limit: 10 
}).then(function(res) { console.log(JSON.stringify(res)); }).catch(function(err) { console.log(JSON.stringify(err)); });
```


### Device Managers Module 

After a user is created and their device is registered via the API, 
their wallet can be activated. Activating a wallet involves the deployment of the following contracts:

* TokenHolder - each user in the economy is represented by a TokenHolder that holds the user's token balance.
* Device Manager (multi-signature) - this contract is configured to control the user's TokenHolder contract.
* DelayedRecoveryModule - this contract enables recovery in the event a key is lost.

In order to enable a user to access their tokens, i.e., interact 
with their TokenHolder contract, from multiple devices without 
having to share private keys across devices, a multi-signature 
contract is employed. We refer to this entity as the Device 
Manager in OST APIs.

To get information about a user’s Device Manager, use services provided in the Device Managers module.

```node.js
const deviceManagersService = ostObj.services.device_managers;
```
Get Device Manager Detail:

```node.js
deviceManagersService.get({
            user_id: 'c2c6fbb2-2531-4c80-9e43-e67195bb01c7'
        }).then(function(res) { console.log(JSON.stringify(res)); }).catch(function(err) { console.log(JSON.stringify(err)); });
```

### Session Module 
In order to create a more seamless user experience, so that users don't have to 
sign a new transaction at every move in the application, we use session keys. 
These keys are authorized to sign transactions on the user's behalf 
for a predetermined amount of time and with a defined maximum spending 
limit per transaction.

These session keys are created in a user's wallet. A user’s TokenHolder 
contract can have multiple authorized session keys.

To get information about a user’s session keys, use services provided in the Sessions module.

```node.js
const sessionsService = ostObj.services.sessions;
```

Get User Session Detail:

```node.js
sessionsService.get({user_id: 'c2c6fbb2-2531-4c80-9e43-e67195bb01c7', 
  session_address: '0x1Ea365269A3e6c8fa492eca9A531BFaC8bA1649E'}).then(function(res) { console.log(JSON.stringify(res)); }).catch(function(err) { console.log(JSON.stringify(err)); });
```

Get User Sessions List:

```node.js
sessionsService.getList({user_id: 'c2c6fbb2-2531-4c80-9e43-e67195bb01c7', 
    // addresses: ["0x5906ae461eb6283cf15b0257d3206e74d83a6bd4","0xab248ef66ee49f80e75266595aa160c8c1abdd5a"],
    // pagination_identifier: 'eyJsYXN0RXZhbHVhdGVkS2V5Ijp7InVpZCI6eyJTIjoiZDE5NGFhNzUtYWNkNS00ZjQwLWIzZmItZTczYTdjZjdjMGQ5In0sIndhIjp7IlMiOiIweDU4YjQxMDY0NzQ4OWI4ODYzNTliNThmZTIyMjYwZWIxOTYwN2IwZjYifX19',
    // limit: 10 
}).then(function(res) { console.log(JSON.stringify(res)); }).catch(function(err) { console.log(JSON.stringify(err)); });
```


### Executing Transactions

For executing transactions, you need to understand the 3 modules described below.

#### Rules Module

When executing a token transfer, a user's TokenHolder contract 
interacts with a token rule contract. A token economy can have 
multiple token rule contracts. To enable a user to execute a 
token transfer, you need to start with fetching details of 
registered rule contracts and understanding their methods and the 
corresponding parameters passed in those methods.

To get information about deployed rule contracts, use services provided in the Rules module.

```node.js
const rulesService = ostObj.services.rules;
```
List Rules:

```node.js
rulesService.getList({}).then(function(res) { console.log(JSON.stringify(res)); }).catch(function(err) { console.log(JSON.stringify(err)); });
```


#### Transactions Module

After reviewing the rules information received using services in the Rules 
module, you will know what data is required to execute transfers 
with a token rule using the services provided in the Transaction module.

```node.js
const transactionsService = ostObj.services.transactions;
```

Execute Transaction DIRECT-TRANSFERS:

```node.js
let transferTo = "0xa31e988eebc89d0bc3e4a9a5463545ea534593e4",
transferAmount = '1',
let raw_calldata = JSON.stringify({
            method: "directTransfers",  
            parameters: [[transferTo],[transferAmount]]
        });
   meta_property = {
      "name": "transaction_name" , //like, download
      "type": "user_to_user", // user_to_user, company_to_user, user_to_company
      "details" : "" // memo field to add additional info about the transaction
    }     
        

let executeParams = {
    user_id: "ee89965c-2fdb-41b5-8b6f-94f441463c7b",
    to: "0xe37906219ad67cc1301b970539c9860f9ce8d991",
    raw_calldata: raw_calldata,
   //meta_property: meta_property
};

transactionsService.execute(executeParams).then(function(res) { console.log(JSON.stringify(res)); }).catch(function(err) { console.log(JSON.stringify(err)); });
```

Execute Transaction PAY:


```node.js
let transferTo = "0xa31e988eebc89d0bc3e4a9a5463545ea534593e4",
transferAmount = '1',
tokenHolderSender = "0xa9632350057c2226c5a10418b1c3bc9acdf7e2ee",
payCurrencyCode = "USD",
ostToUsdInWei = "23757000000000000" // get price-point response
raw_calldata = JSON.stringify({
            method: "pay",  
            parameters: [tokenHolderSender, [transferTo],[transferAmount], payCurrencyCode, ostToUsdInWei]
        });
   meta_property = {
      "name": "transaction_name" , //like, download
      "type": "user_to_user", // user_to_user, company_to_user, user_to_company
      "details" : "" // memo field to add additional info about the transaction
    }     
        

let executeParams = {
    user_id: "ee89965c-2fdb-41b5-8b6f-94f441463c7b",
    to: "0xe37906219ad67cc1301b970539c9860f9ce8d991",
    raw_calldata: raw_calldata,
    
   //meta_property: meta_property
};

transactionsService.execute(executeParams).then(function(res) { console.log(JSON.stringify(res)); }).catch(function(err) { console.log(JSON.stringify(err)); });
```


Get Transaction Detail:

```node.js
transactionsService.get({ user_id: 'c2c6fbb2-2531-4c80-9e43-e67195bb01c7', transaction_id: 'f1d6fbb2-2531-4c80-9e43-e67195bb01c7' }).then(function(res) { console.log(JSON.stringify(res)); }).catch(function(err) { console.log(JSON.stringify(err)); });
```

Get User Transactions:

```node.js

 var metaPropertiesArray =  JSON.stringify(
        [{
        "name":  "transaction_name" , //like, download IMP : Max length 25 characters (numbers alphabets spaces _ - allowed)
        "type":  "user_to_user", // user_to_user, company_to_user, user_to_company
        "details" : "test" // memo field to add additional info about the transaction .  IMP : Max length 120 characters (numbers alphabets spaces _ - allowed)
        }
       ]);

transactionsService.getList({ 
    user_id: 'c2c6fbb2-2531-4c80-9e43-e67195bb01c7'
    // statuses: ["CREATED", "SUBMITTED", "SUCCESS", "FAILED"],
    // meta_properties: metaPropertiesArray,
    // limit: 10
 }).then(function(res) { console.log(JSON.stringify(res)); }).catch(function(err) { console.log(JSON.stringify(err)); });
```


#### Balances Module

Balance services offer the functionality to view a user’s balances.

```node.js
const balancesService = ostObj.services.balance;
```
Get User Balance:

```node.js
balancesService.get({
            user_id: 'c2c6fbb2-2531-4c80-9e43-e67195bb01c7'
        }).then(function(res) { console.log(JSON.stringify(res)); }).catch(function(err) { console.log(JSON.stringify(err)); });
```


### Recovery Owners Module 

A user’s Brand Tokens are held by a TokenHolder contract that is controlled ("owned") 
by a Device Manager; the device manager is controlled ("owned") by device keys created 
and held by the user in their wallets; and if any of those keys is lost, the Device 
Manager (which is a multi-signature contract) is programmed to allow replacement of a 
key by the recovery owner key for the user, via the DelayedRecoveryModule, which is deployed
at the time of the creation of the user's initial wallet.

To fetch the recovery owner address for a particular user, use services provided 
in the Users module. To fetch that recovery owner's information, then services 
provided in the Recovery Owners Module are used.


```node.js
const recoveryOwnersService = ostObj.services.recovery_owners;
```
Get Recovery Owner Detail:

```node.js
recoveryOwnersService.get({
            user_id: 'c2c6fbb2-2531-4c80-9e43-e67195bb01c7',
            recovery_owner_address: '0xe37906219ad67cc1301b970539c9860f9ce8d991'
        }).then(function(res) { console.log(JSON.stringify(res)); }).catch(function(err) { console.log(JSON.stringify(err)); });
```


### Tokens Module

To get information about the Brand Token created on the OST KIT interface, use services provided 
by the Tokens module. You can use this service to obtain the chain ID of the auxiliary 
chain on which the token economy is running, in addition to other information.


```node.js
const tokensService = ostObj.services.tokens;
```

Get Token Detail:

```node.js
tokensService.get({}).then(function(res) { console.log(JSON.stringify(res)); }).catch(function(err) { console.log(JSON.stringify(err)); });
```


### Chains Module 

To get information about the auxiliary chain on which the token economy is running, use services 
provided by the Chains module.

```node.js
const chainsService = ostObj.services.chains;
```
Get Chain Detail:

```node.js
chainsService.get({chain_id: 2000}).then(function(res) { console.log(JSON.stringify(res)); }).catch(function(err) { console.log(JSON.stringify(err)); });
```

### Price Points Module

To know the OST price point in USD and when it was last updated, 
use services provided by the Price Points module.

```node.js
const pricePoints = ostObj.services.price_points;
```
Get Price Points Detail:

```node.js
pricePoints.get({chain_id: 2000}).then(function(res) { console.log(JSON.stringify(res)); }).catch(function(err) { console.log(JSON.stringify(err)); });
```


