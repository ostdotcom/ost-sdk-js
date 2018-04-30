# OST Javascript SDK
The official [OST Javascript SDK](https://dev.ost.com/).

## Requirements

To use this node module, developers will need to:
1. Sign-up on [https://kit.ost.com](https://kit.ost.com).
2. Launch a branded token economy with the OST KIT Economy Planner.
3. Obtain an API Key and API Secret from [https://kit.ost.com/developer-api-console](https://kit.ost.com/developer-api-console).

## Documentation

[https://dev.ost.com/](https://dev.ost.com/)

## Installation

Install OST Javascript SDK

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
const ostObj = new OSTSDK({apiKey: <api_key>, apiSecret: <api_secret>, apiEndpoint: <api_endpoint>});
```

### Transaction Type Module 

Initialize a `TransactionType` object to perform transaction-related actions:

```node.js
var transactionTypeObj = ostObj.services.transactionType;
```

Create new transaction types:

```node.js
transactionTypeObj.create({name: 'Like', kind: 'user_to_user', currency_type: 'usd', currency_value: '1.25', commission_percent: '12'});
```

```node.js
transactionTypeObj.create({name: 'Grant', kind: 'company_to_user', currency_type: 'bt', currency_value: '12', commission_percent: '0'});
```

```node.js
transactionTypeObj.create({name: 'Buy', kind: 'user_to_company', currency_type: 'bt', currency_value: '100', commission_percent: '0'});
```

Get a list of existing transaction kinds and other data:

```node.js
transactionTypeObj.list();
```

Edit an existing transaction kind:

```node.js
transactionTypeObj.edit({client_transaction_id: '12', name: 'New Transaction Kind'});
```

Execute a branded token transfer by transaction kind:

```node.js
transactionTypeObj.execute({from_uuid: '1234-1928-1081dsds-djhksjd', to_uuid: '1234-1928-1081-1223232', transaction_kind: 'Purchase'});
```

Get the status of an executed transaction:

```node.js
transactionTypeObj.status({transaction_uuids: ['5f79063f-e22a-4d28-99d7-dd095f02c72e']});
```

### User Module

Initialize a `User` object to perform user specific actions:

```node.js
const ostUserObject = ostObj.services.user;
```

Create a new user:

```node.js
ostUserObject.create({name: 'Alice'});
```

Get a list of users and other data:

```node.js
ostUserObject.list();
```

Edit an existing user:

```node.js
ostUserObject.edit({uuid: '1234-1928-1081dsds-djhksjd', name: 'Bob'});
```

Airdrop branded tokens to users:

```node.js
ostUserObject.airdropTokens({amount: 100, list_type: 'all'});
```

As airdropping tokens is an asynchronous task, you can check the airdrop's status:

```node.js
ostUserObject.airdropStatus({airdrop_uuid: '1234-1928-1081dsds-djhksjd'});
```
