# OST JavaScript SDK
The official [OST JavaScript SDK](https://dev.ost.com/).

## Requirements

To use this node module, developers will need to:
1. Sign-up on [https://kit.ost.com](https://kit.ost.com).
2. Launch a branded price_points economy with the OST KIT Economy Planner.
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
// the latest valid API endpoint is "https://sandboxapi.ost.com/v2/", this may change in the future
const ostObj = new OSTSDK({apiKey: <api_key>, apiSecret: <api_secret>, apiEndpoint: <api_endpoint>,
config: {timeout: <timeout>});
```


### chains Module 

```node.js
const chainService = ostObj.services.chains;
```
Get chain:

```node.js
chainService.get({chain_id: '2000'}).then(function(res) { console.log(JSON.stringify(res)); }).catch(function(err) { console.log(JSON.stringify(err)); });
```


### Token Module 

```node.js
const tokenService = ostObj.services.tokens;
```

Get details:

```node.js
tokenService.get({}).then(function(res) { console.log(JSON.stringify(res)); }).catch(function(err) { console.log(JSON.stringify(err)); });
```


### Users Module 

```node.js
const userService = ostObj.services.users;
```

Create a new user:

```node.js
userService.create({}).then(function(res) { console.log(JSON.stringify(res)); }).catch(function(err) { console.log(JSON.stringify(err)); });
```

Get an existing user:

```node.js
userService.get({id: '1234-1928-1081dsds-djhksjd'}).then(function(res) { console.log(JSON.stringify(res)); }).catch(function(err) { console.log(JSON.stringify(err)); });
```

Get a list of users and other data:

```node.js
userService.getList({}).then(function(res) { console.log(JSON.stringify(res)); }).catch(function(err) { console.log(JSON.stringify(err)); });
```

### Devices Module 

```node.js
const deviceService = ostObj.services.devices;
```

Create a device for user:

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

Get an user device:

```node.js
deviceService.get({user_id: 'c2c6fbb2-2531-4c80-9e43-e67195bb01c7', 
  device_address: '0x1Ea365269A3e6c8fa492eca9A531BFaC8bA1649E'}).then(function(res) { console.log(JSON.stringify(res)); }).catch(function(err) { console.log(JSON.stringify(err)); });
```

Get a list of devices:

```node.js
deviceService.getList({user_id: 'c2c6fbb2-2531-4c80-9e43-e67195bb01c7',
// pagination_identifier: 'eyJsYXN0RXZhbHVhdGVkS2V5Ijp7InVpZCI6eyJTIjoiZDE5NGFhNzUtYWNkNS00ZjQwLWIzZmItZTczYTdjZjdjMGQ5In0sIndhIjp7IlMiOiIweDU4YjQxMDY0NzQ4OWI4ODYzNTliNThmZTIyMjYwZWIxOTYwN2IwZjYifX19',
// addresses: ["0x5906ae461eb6283cf15b0257d3206e74d83a6bd4","0xab248ef66ee49f80e75266595aa160c8c1abdd5a"] 
}).then(function(res) { console.log(JSON.stringify(res)); }).catch(function(err) { console.log(JSON.stringify(err)); });
```


### Session Module 

```node.js
const sessionService = ostObj.services.sessions;
```
Get an user session:

```node.js
sessionService.get({user_id: 'c2c6fbb2-2531-4c80-9e43-e67195bb01c7', 
  session_address: '0x1Ea365269A3e6c8fa492eca9A531BFaC8bA1649E'}).then(function(res) { console.log(JSON.stringify(res)); }).catch(function(err) { console.log(JSON.stringify(err)); });
```

Get a list of sessions:

```node.js
sessionService.getList({user_id: 'c2c6fbb2-2531-4c80-9e43-e67195bb01c7', 
}).then(function(res) { console.log(JSON.stringify(res)); }).catch(function(err) { console.log(JSON.stringify(err)); });
```


### Device Manager Module 

```node.js
const deviceManager = ostObj.services.device_managers;
```
Get User's Device Manager Details:

```node.js
deviceManager.get({user_id: 'c2c6fbb2-2531-4c80-9e43-e67195bb01c7'}).then(function(res) { console.log(JSON.stringify(res)); }).catch(function(err) { console.log(JSON.stringify(err)); });
```


### Price Points Module 

```node.js
const pricePoints = ostObj.services.price_points;
```
Get:

```node.js
pricePoints.get({}).then(function(res) { console.log(JSON.stringify(res)); }).catch(function(err) { console.log(JSON.stringify(err)); });
```
