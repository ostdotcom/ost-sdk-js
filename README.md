# OST JavaScript SDK
The official [OST JavaScript SDK](https://dev.ost.com/).

## Requirements

To use this node module, developers will need to:
1. Sign-up on [https://kit.ost.com](https://kit.ost.com).
2. Launch a branded token economy with the OST KIT Economy Planner.
3. Obtain an API Key and API Secret from [https://kit.ost.com/developer-api-console](https://kit.ost.com/developer-api-console).

## Documentation

[https://dev.ost.com/](https://dev.ost.com/)

## Installation

Install OST JavaScript SDK

```bash
> npm install @ostdotcom/ost-sdk
```

## Example Usage

Require the SDK:

```node.js
const OSTSDK = require('@ostdotcom/ost-sdk');
```

Initialize the SDK object:

```node.js
// the currently valid API endpoint is "https://playgroundapi.ost.com", this may change in the future
const ostObj = new OSTSDK({apiKey: <api_key>, apiSecret: <api_secret>, apiEndpoint: <api_endpoint>});
```

### Transaction Kind Module 

Initialize a `TransactionKind` object to perform transaction-related actions:

```node.js
const transactionKindService = ostObj.services.transactionKind;
```

Create new transaction types:

```node.js
transactionKindService.create({name: 'Like', kind: 'user_to_user', currency_type: 'usd', currency_value: '1.25', commission_percent: '12'}).then(function(res) { console.log(JSON.stringify(res)); }).catch(function(err) { console.log(JSON.stringify(err)); });
```

```node.js
transactionKindService.create({name: 'Grant', kind: 'company_to_user', currency_type: 'bt', currency_value: '12', commission_percent: '0'}).then(function(res) { console.log(JSON.stringify(res)); }).catch(function(err) { console.log(JSON.stringify(err)); });
```

```node.js
transactionKindService.create({name: 'Buy', kind: 'user_to_company', currency_type: 'bt', currency_value: '100', commission_percent: '0'}).then(function(res) { console.log(JSON.stringify(res)); }).catch(function(err) { console.log(JSON.stringify(err)); });
```

Get a list of existing transaction kinds and other data:

```node.js
transactionKindService.list().then(function(res) { console.log(JSON.stringify(res)); }).catch(function(err) { console.log(JSON.stringify(err)); });
```

Edit an existing transaction kind:

```node.js
transactionKindService.edit({client_transaction_id: '12', name: 'New Transaction Kind'}).then(function(res) { console.log(JSON.stringify(res)); }).catch(function(err) { console.log(JSON.stringify(err)); });
```

Execute a branded token transfer by transaction kind:

```node.js
transactionKindService.execute({from_uuid: '1234-1928-1081dsds-djhksjd', to_uuid: '1234-1928-1081-1223232', transaction_kind: 'Purchase'}).then(function(res) { console.log(JSON.stringify(res)); }).catch(function(err) { console.log(JSON.stringify(err)); });
```

Get the status of an executed transaction:

```node.js
transactionKindService.status({transaction_uuids: ['5f79063f-e22a-4d28-99d7-dd095f02c72e']}).then(function(res) { console.log(JSON.stringify(res)); }).catch(function(err) { console.log(JSON.stringify(err)); });
```

### User Module

Initialize a `User` object to perform user specific actions:

```node.js
const userService = ostObj.services.user;
```

Create a new user:

```node.js
userService.create({name: 'Alice'}).then(function(res) { console.log(JSON.stringify(res)); }).catch(function(err) { console.log(JSON.stringify(err)); });
```

Get a list of users and other data:

```node.js
userService.list().then(function(res) { console.log(JSON.stringify(res)); }).catch(function(err) { console.log(JSON.stringify(err)); });
```

Edit an existing user:

```node.js
userService.edit({uuid: '1234-1928-1081dsds-djhksjd', name: 'Bob'}).then(function(res) { console.log(JSON.stringify(res)); }).catch(function(err) { console.log(JSON.stringify(err)); });
```

Airdrop branded tokens to users:

```node.js
userService.airdropTokens({amount: 1, list_type: 'all'}).then(function(res) { console.log(JSON.stringify(res)); }).catch(function(err) { console.log(JSON.stringify(err)); });
```

As airdropping tokens is an asynchronous task, you can check the airdrop's status:

```node.js
userService.airdropStatus({airdrop_uuid: 'd8303e01-5ce0-401f-8ae4-d6a0bcdb2e24'}).then(function(res) { console.log(JSON.stringify(res)); }).catch(function(err) { console.log(JSON.stringify(err)); });
```
