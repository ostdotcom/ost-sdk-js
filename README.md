# OST JavaScript SDK
[![Build Status](https://travis-ci.org/ostdotcom/ost-sdk-js.svg?branch=master)](https://travis-ci.org/ostdotcom/ost-sdk-js)


The official [OST JavaScript SDK](https://dev.ost.com/).

## Introduction

OST is a complete technology solution enabling mainstream businesses 
to easily launch blockchain-based economies at low risk and without 
requiring blockchain development.

At the core of OST is the concept of OST-powered Brand Tokens (BTs). 
BTs are white-label cryptocurrency tokens running on highly scalable 
Ethereum-based side blockchains, backed by staking OST Tokens into smart 
contracts on Ethereum mainnet. BTs can only be transferred to whitelisted 
user addresses within a business's community. This ensures that they stay 
within a specific BT community.

The OST technology stack is designed to give businesses everything they need 
to integrate, test, and deploy BTs.Within the OST suite of products developers 
can use OST KIT to create, test and launch Branded Tokens backed by OST. 

OST APIs and Server Side SDKs make it simple and easy for developers to 
integrate blockchain tokens into their apps.

## Advantages

Using the OST SDKs provides a number of advantages
* Simplicity: The SDKs reduce the complexity of integration by handling multiple authentication scenarios automatically. This means that the appropriate method call will be to minimize the end-user interactions.
* Performance: Caching, key management and nonce management ensure that end-users overall experience is improved.
* Security: Separating the Server Side API interactions from the client ensures that user's private keys are generated and stored securely on the user's device and not shared across the network.


## Requirements

Integrating OST SDK into your application can begin as soon as you create an account, with OST KIT. It is a three step process:
Sign-up on [https://kit.ost.com](https://kit.ost.com).
Create your branded token in OST KIT.
Obtain an API Key and API Secret from [https://kit.ost.com/mainnet/developer](https://kit.ost.com/mainnet/developer).


## Documentation

[https://dev.ost.com/](https://dev.ost.com/)

## Installation

Install OST JavaScript SDK

```bash
> npm install @ostdotcom/ost-sdk-js
```

## Example Usage

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


### Users Module 

Given that Brand Tokens are valuable to users, if their private keys are compromised it could result in the user being unable to access their tokens. 
To tackle this OST promotes a mobile-first approach and provides mobile(client) and server SDKs. 
* The server SDKs enable you to register users with KIT server.
* The client SDKs provides the additional support required for the ownership and management of Brand Tokens by end users so that they can create keys and control their tokens. 

To register user with KIT you can use the services provided in user module.

Initialize a Users object to perform user specific actions, like creating users: 
    
```node.js
const userService = ostObj.services.users;
```

Creating a user with KIT:

```node.js
userService.create({}).then(function(res) { console.log(JSON.stringify(res)); }).catch(function(err) { console.log(JSON.stringify(err)); });
```

Get an existing user:

```node.js
userService.get({user_id: 'c2c6fbb2-2531-4c80-9e43-e67195bb01c7'}).then(function(res) { console.log(JSON.stringify(res)); }).catch(function(err) { console.log(JSON.stringify(err)); });
```

Get list of users:

```node.js
userService.getList({ 
 // ids: ["c2c6fbb2-2531-4c80-9e43-e67195bb01c7", "d2c6fbb2-2531-4c80-9e43-e67195bb01c7"]
 // limit: 10 
}).then(function(res) { console.log(JSON.stringify(res)); }).catch(function(err) { console.log(JSON.stringify(err)); });
```


### Devices Module 

Once a user is created via API, partner company should register user’s device with KIT.  
Post which they can activate user’s wallet on their device. Partner company can register multiple devices per user. 
 
Initialize a Device object to perform device specific actions, like registering devices:

```node.js
const deviceService = ostObj.services.devices;
```

Create a new device for an existing user:

```node.js
deviceService.create(
    {
    user_id: 'c2c6fbb2-2531-4c80-9e43-e67195bb01c7', 
    address: '0x1Ea365269A3e6c8fa492eca9A531BFaC8bA1649E',
    api_signer_address: '0x5F860598383868e8E8Ee0ffC5ADD92369Db37455',
    device_uuid: '593a967f-87bd-49a6-976c-52edf46c4df4',
    device_name: 'Iphone S'
    }).then(function(res) { console.log(JSON.stringify(res)); }).catch(function(err) { console.log(JSON.stringify(err)); });
```

Get devices of an existing user:

```node.js
deviceService.getList({user_id: 'c2c6fbb2-2531-4c80-9e43-e67195bb01c7',
// pagination_identifier: 'eyJsYXN0RXZhbHVhdGVkS2V5Ijp7InVpZCI6eyJTIjoiZDE5NGFhNzUtYWNkNS00ZjQwLWIzZmItZTczYTdjZjdjMGQ5In0sIndhIjp7IlMiOiIweDU4YjQxMDY0NzQ4OWI4ODYzNTliNThmZTIyMjYwZWIxOTYwN2IwZjYifX19',
// addresses: ["0x5906ae461eb6283cf15b0257d3206e74d83a6bd4","0xab248ef66ee49f80e75266595aa160c8c1abdd5a"]
// limit: 10 
}).then(function(res) { console.log(JSON.stringify(res)); }).catch(function(err) { console.log(JSON.stringify(err)); });
```


Get device of an existing user:

```node.js
deviceService.get({
   user_id: "d194aa75-acd5-4f40-b3fb-e73a7cf7c0d9",
   device_address: "0x1Ea365269A3e6c8fa492eca9A531BFaC8bA1649E"
}).then(function(res) { console.log(JSON.stringify(res)); }).catch(function(err) { console.log(JSON.stringify(err)); });
```


### Device Managers Module 

After  user is created and their device is registered via API,  a wallet can be activated. 
Activating a wallet involves the deployment of :
* TokenHolder contract - each user in the economy is be represented by this smart contract on blockchain.  It holde the user's balances,
* Device Manager (Multisig contract) - This contract is configured to control the user's TokenHolder contract, and 
* DelayedRecoveryModule contract - that supports recovery via a 6 digit PIN.
 
In order to enable user to access their tokens i.e their TokenHolder contract from multiple devices without having to share private keys across devices we came up with a multi-signature contract. 
We refer to this entity as device manager in OST APIs.  
To get information about user’s device manager use services provided in device manager module. 

```node.js
const deviceManagersService = ostObj.services.device_managers;
```
Get device manager details of an existing user:

```node.js
deviceManagersService.get({
            user_id: 'c2c6fbb2-2531-4c80-9e43-e67195bb01c7'
        }).then(function(res) { console.log(JSON.stringify(res)); }).catch(function(err) { console.log(JSON.stringify(err)); });
```

### Session Module 
In order to create a seamless user experience so that users don't have to sign a new transaction at every move in the application we came up with the concept of sessionKeys. 
These keys are used to sign messages on user's behalf for a predetermined amount of time and with a defined maximum spending limit per-transaction. 
These keys are created on the mobile device from where the end user participates in the economy. Each key has a corresponding public key, which in-turn has a corresponding public address. 
User’s TokenHolder contract can have multiple sessionKeys for signing messages on user’s behalf. 

To get information about user’s session keys use services provided in session module. 

```node.js
const sessionService = ostObj.services.sessions;
```

Get session of an existing user:

```node.js
sessionService.get({user_id: 'c2c6fbb2-2531-4c80-9e43-e67195bb01c7', 
  session_address: '0x1Ea365269A3e6c8fa492eca9A531BFaC8bA1649E'}).then(function(res) { console.log(JSON.stringify(res)); }).catch(function(err) { console.log(JSON.stringify(err)); });
```

Get sessions of an existing user:

```node.js
sessionService.getList({user_id: 'c2c6fbb2-2531-4c80-9e43-e67195bb01c7', 
    // addresses: ["0x5906ae461eb6283cf15b0257d3206e74d83a6bd4","0xab248ef66ee49f80e75266595aa160c8c1abdd5a"],
    // pagination_identifier: 'eyJsYXN0RXZhbHVhdGVkS2V5Ijp7InVpZCI6eyJTIjoiZDE5NGFhNzUtYWNkNS00ZjQwLWIzZmItZTczYTdjZjdjMGQ5In0sIndhIjp7IlMiOiIweDU4YjQxMDY0NzQ4OWI4ODYzNTliNThmZTIyMjYwZWIxOTYwN2IwZjYifX19',
    // limit: 10 
}).then(function(res) { console.log(JSON.stringify(res)); }).catch(function(err) { console.log(JSON.stringify(err)); });
```


## For executing transactions we need to understand 3 modules listed below

To enable partner companies to design Rules that align with their economy goals and define the behavior of the token transfer, 
they have the flexibility to write their custom rules contract. 
OST has written one rule contract the [PricerRule Contract](https://github.com/OpenSTFoundation/openst-contracts/blob/develop/contracts/rules/PricerRule.sol)  for partner companies to use. 
For executing a token transfer, end-user's TokenHolder contract interacts with Rules Contract.


### Rules Module

So for executing a token transfer, partner company need to start with fetching details of deployed rules contract and understand 
the methods written within them and the corresponding parameters passed in those methods.
 To get information about rules contracts deployed use services provided in rule module.  

```node.js
const rulesService = ostObj.services.rules;
```
List all rules:

```node.js
rulesService.getList({}).then(function(res) { console.log(JSON.stringify(res)); }).catch(function(err) { console.log(JSON.stringify(err)); });
```


### Transactions Module 

Once you’ve fetched the rule method and rule parameters to be passed using services in rule module you can start with executing 
the transfer using the services provided in transaction module.

```node.js
const transactionsService = ostObj.services.transactions;
```

Execute transaction directTransfers

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

Execute transaction PAY


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


Get transactions of an exiting user:

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

Get transaction of an exiting user:

```node.js
transactionsService.get({ user_id: 'c2c6fbb2-2531-4c80-9e43-e67195bb01c7', transaction_id: 'f1d6fbb2-2531-4c80-9e43-e67195bb01c7' }).then(function(res) { console.log(JSON.stringify(res)); }).catch(function(err) { console.log(JSON.stringify(err)); });
```


### Balance Module 

Balance services offer the functionality to view user’s balances. 

```node.js
const balanceService = ostObj.services.balance;
```
Get token balance of an existing user:

```node.js
balanceService.get({
            user_id: 'c2c6fbb2-2531-4c80-9e43-e67195bb01c7'
        }).then(function(res) { console.log(JSON.stringify(res)); }).catch(function(err) { console.log(JSON.stringify(err)); });
```


### Recovery Owners Module 

End user’s brand tokens are held by a token holder contract that is controlled ("owned") by device manager; 
the device manager is controlled ("owned") by device keys created and held by the user in their wallets; and if those keys are compromised, 
the device manager (which is a multi-signature contract) is programmed to allow replacement of a key by a recovery key.

The DelayedRecoveryModule is deployed at the time of the creation of the wallet. The recoveryOwner public-private key pair 
is created using inputs from the Partner, OST and the user. The public addresse of the recoveryOwner is stored 
on this DelayedRecoveryModule contract.

Recovering access to tokens after the owner key becomes compromised

User requests recovery from partner company application by entering their 6-digit recovery PIN. Once the request has 
been raised user waits for defined delay which is 12 hours currently.

OST wallet SDK Create the recoveryOwner private key using the inputs from the Partner, OST and the user.  This should exactly match the recoveryOwner that was made when the wallet was initially created. 

To fetch the recoveryOwner address for a particular user services provided in Recovery Owner Module are used.


```node.js
const recoveryOwnersService = ostObj.services.recovery_owners;
```
Get recovery owner of an existing user:

```node.js
recoveryOwnersService.get({
            user_id: 'c2c6fbb2-2531-4c80-9e43-e67195bb01c7',
            recovery_owner_address: '0xe37906219ad67cc1301b970539c9860f9ce8d991'
        }).then(function(res) { console.log(JSON.stringify(res)); }).catch(function(err) { console.log(JSON.stringify(err)); });
```


### Token Module 
To get information about the token created on the OST KIT interface use services provided by token module. 
Partner company can use this service to know the chain id , the auxiliary chain on which their economy is running apart from
 other information.


```node.js
const tokenService = ostObj.services.tokens;
```

Get token details:

```node.js
tokenService.get({}).then(function(res) { console.log(JSON.stringify(res)); }).catch(function(err) { console.log(JSON.stringify(err)); });
```


### chains Module 

To get information about the auxiliary chain on which the token economy is running use services provided by chain module.

```node.js
const chainService = ostObj.services.chains;
```
Get chain details:

```node.js
chainService.get({chain_id: 2000}).then(function(res) { console.log(JSON.stringify(res)); }).catch(function(err) { console.log(JSON.stringify(err)); });
```

### Price Points Module 

To know the OST price point in USD and the last timestamp when it was updateds use  services provided by Price Point module.

```node.js
const pricePoints = ostObj.services.price_points;
```
Get price points of an auxiliary chain:

```node.js
pricePoints.get({chain_id: 2000}).then(function(res) { console.log(JSON.stringify(res)); }).catch(function(err) { console.log(JSON.stringify(err)); });
```


