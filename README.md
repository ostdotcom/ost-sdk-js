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
> npm install @ostdotcom/ost-sdk-js
```

## Example Usage

Require the SDK:

```node.js
const OSTSDK = require('@ostdotcom/ost-sdk-js');
```

Initialize the SDK object:

```node.js
// the latest valid API endpoint is "https://sandboxapi.ost.com/v1.1/", this may change in the future
const ostObj = new OSTSDK({apiKey: <api_key>, apiSecret: <api_secret>, apiEndpoint: <api_endpoint>});
```

### Users Module 

```node.js
const userService = ostObj.services.users;
```

Create a new user:

```node.js
userService.create({name: 'Alice'}).then(function(res) { console.log(JSON.stringify(res)); }).catch(function(err) { console.log(JSON.stringify(err)); });
```

Edit an existing user:

```node.js
userService.edit({id: '1234-1928-1081dsds-djhksjd', name: 'Bob'}).then(function(res) { console.log(JSON.stringify(res)); }).catch(function(err) { console.log(JSON.stringify(err)); });
```

Get an existing user:

```node.js
userService.get({id: '1234-1928-1081dsds-djhksjd'}).then(function(res) { console.log(JSON.stringify(res)); }).catch(function(err) { console.log(JSON.stringify(err)); });
```

Get a list of users and other data:

```node.js
userService.list({}).then(function(res) { console.log(JSON.stringify(res)); }).catch(function(err) { console.log(JSON.stringify(err)); });
```

### Airdrops Module 

```node.js
const airdropService = ostObj.services.airdrops;
```

Execute Airdrop:

```node.js
airdropService.execute({amount: 1, user_ids: 'f87346e4-61f6-4d55-8cb8-234c65437b01'}).then(function(res) { console.log(JSON.stringify(res)); }).catch(function(err) { console.log(JSON.stringify(err)); });
```

Get Airdrop Status:

```node.js
airdropService.get({id: 'ecd9b0b2-a0f4-422c-95a4-f25f8fc88334'}).then(function(res) { console.log(JSON.stringify(res)); }).catch(function(err) { console.log(JSON.stringify(err)); });
```

List Airdrop

```node.js
airdropService.list({page_no: 1, limit: 50, current_status: 'processing,complete'}).then(function(res) { console.log(JSON.stringify(res)); }).catch(function(err) { console.log(JSON.stringify(err)); });
```


### Token Module 

```node.js
const tokenService = ostObj.services.token;
```

Get details:

```node.js
tokenService.get({}).then(function(res) { console.log(JSON.stringify(res)); }).catch(function(err) { console.log(JSON.stringify(err)); });
```

### Actions Module 


```node.js
const actionService = ostObj.services.actions;
```

Create a new action:

```node.js
actionService.create({name: 'Voteup', kind: 'user_to_user', currency: 'USD', arbitrary_amount: false, amount: 1.01, commission_percent: 1}).then(function(res) { console.log(JSON.stringify(res)); }).catch(function(err) { console.log(JSON.stringify(err)); }); 
```

Edit an action:

```node.js
actionService.edit({id: 22599, name: 'Like'}).then(function(res) { console.log(JSON.stringify(res)); }).catch(function(err) { console.log(JSON.stringify(err)); });
```

Get an action:

```node.js
actionService.get({id: 22599}).then(function(res) { console.log(JSON.stringify(res)); }).catch(function(err) { console.log(JSON.stringify(err)); });
```

List actions:

```node.js
actionService.list({}).then(function(res) { console.log(JSON.stringify(res)); }).catch(function(err) { console.log(JSON.stringify(err)); });
```

### Transaction Module 

```node.js
const transactionService = ostObj.services.transactions;
```

Execute Transaction:

```node.js
transactionService.execute({from_user_id:'0a201640-77a7-49c8-b289-b6b5d7325323', to_user_id:'24580db2-bf29-4d73-bf5a-e1d0cf8c8928', action_id:'22599'}).then(function(res) { console.log(JSON.stringify(res)); }).catch(function(err) { console.log(JSON.stringify(err)); });
```

Get Transaction Status:

```node.js
transactionService.get({id: '84d97848-074f-4a9a-a214-19076cfe9dd1'}).then(function(res) { console.log(JSON.stringify(res)); }).catch(function(err) { console.log(JSON.stringify(err)); });
```

List Transactions:

```node.js
transactionService.list({page_no: 1, limit: 10}).then(function(res) { console.log(JSON.stringify(res)); }).catch(function(err) { console.log(JSON.stringify(err)); });
```

### Transfer Module 

```node.js
const transferService = ostObj.services.transfers;
```

Execute ST Prime Transfer:

```node.js
transferService.execute({to_address:'0xd2b789293674faEE51bEb2d0338d15401dEbfdE3', amount:1}).then(function(res) { console.log(JSON.stringify(res)); }).catch(function(err) { console.log(JSON.stringify(err)); });
```

Get Transfer Status:

```node.js
transferService.get({id: '38895b82-737e-4b23-b111-fec96e52f3b2'}).then(function(res) { console.log(JSON.stringify(res)); }).catch(function(err) { console.log(JSON.stringify(err)); });
```

List Transfers:

```node.js
transferService.list({}).then(function(res) { console.log(JSON.stringify(res)); }).catch(function(err) { console.log(JSON.stringify(err)); });
```

### Balance Module 

```node.js
const balanceService = ostObj.services.balances;
```

Get Balance of user:

```node.js
balanceService.get({id: '38895b82-737e-4b23-b111-fec96e52f3b2'}).then(function(res) { console.log(JSON.stringify(res)); }).catch(function(err) { console.log(JSON.stringify(err)); });
```

### Ledger Module 

```node.js
const ledgerService = ostObj.services.ledger;
```

Get ledger for user:

```node.js
ledgerService.get({id: '38895b82-737e-4b23-b111-fec96e52f3b2'}).then(function(res) { console.log(JSON.stringify(res)); }).catch(function(err) { console.log(JSON.stringify(err)); });
```

## OST API v0 (Previous Version)
To refer to the readme documentation of API v1 [Please Follow This Link](README_V1.md)

To refer to the readme documentation of API v0 [Please Follow This Link](README_V0.md)
