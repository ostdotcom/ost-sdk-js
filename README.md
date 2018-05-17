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
// the latest valid API endpoint is "https://playgroundapi.ost.com/v1/", this may change in the future
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
airdropService.execute({amount: 1, airdropped: 'true', user_ids: 'f87346e4-61f6-4d55-8cb8-234c65437b01'}).then(function(res) { console.log(JSON.stringify(res)); }).catch(function(err) { console.log(JSON.stringify(err)); });
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
actionService.edit({id: 10, name: 'Like'}).then(function(res) { console.log(JSON.stringify(res)); }).catch(function(err) { console.log(JSON.stringify(err)); });
```

Get an action:

```node.js
actionService.get({id: 1234}).then(function(res) { console.log(JSON.stringify(res)); }).catch(function(err) { console.log(JSON.stringify(err)); });
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
transactionService.execute({from_user_id:'f87346e4-61f6-4d55-8cb8-234c65437b01', to_user_id:'c07bd853-e893-4400-b7e8-c358cfa05d85', action_id:'20145'}).then(function(res) { console.log(JSON.stringify(res)); }).catch(function(err) { console.log(JSON.stringify(err)); });
```

Get Transaction Status:

```node.js
transactionService.get({id: 'ecd9b0b2-a0f4-422c-95a4-f25f8fc88334'}).then(function(res) { console.log(JSON.stringify(res)); }).catch(function(err) { console.log(JSON.stringify(err)); });
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
transferService.get({id: 'd0589dc5-d0a0-4996-b9f8-847295fd2c3b'});
```

List Transfers:

```node.js
transferService.list({id: 'ff9ed3ff-9125-4e49-8cc2-174fd0fd3c30,e5c24167-a3b2-4073-a064-6a7fcdb13be8'}).then(function(res) { console.log(JSON.stringify(res)); }).catch(function(err) { console.log(JSON.stringify(err)); });
```

## OST API v0 (Previous Version)
To refer to the readme documentation of API v0 [Please Follow This Link](README_V0.md)
