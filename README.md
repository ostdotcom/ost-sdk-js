# OST Server-Side JavaScript SDK
[![Build Status](https://travis-ci.org/ostdotcom/ost-sdk-js.svg?branch=develop)](https://travis-ci.org/ostdotcom/ost-sdk-js)

[OST](https://dev.ost.com/) Platform SDK for JavaScript.

## Introduction

OST is a complete technology solution enabling mainstream businesses 
to easily launch blockchain based economies without requiring blockchain development.

Brand Tokens (BTs) are white-label cryptocurrency tokens with utility representations 
running on highly-scalable Ethereum-based utility blockchains, 
backed by value token (such as OST, USDC) staked on Ethereum mainnet. Within a business`s 
token economy, BTs can only be transferred to whitelisted user addresses. 
This ensures that they stay within the token economy.

The OST technology stack is designed to give businesses everything they need 
to integrate, test, and deploy BTs. Within the OST suite of products, developers 
can use OST Platform to create, test, and launch Brand Tokens.

OST APIs and server-side SDKs make it simple and easy for developers to 
integrate blockchain tokens into their apps.

For documentation, visit [https://dev.ost.com/](https://dev.ost.com/)

## Getting Started

### Setup Brand Token
1. Sign-up on [OST Platform](https://platform.ost.com) and setup your Brand Token.
2. Obtain your API Key and API Secret from [developers page](https://platform.ost.com/mainnet/developer).

### Installation

The preferred way to install the OST JavaScript SDK is to use the npm package manager for Node.js. Simply type the following into a terminal window:

```bash
 npm install @ostdotcom/ost-sdk-js
```

## Usage
* Require the OST JavaScript SDK.

    ```js
    const OSTSDK = require('@ostdotcom/ost-sdk-js');
    ```

* Initialize the SDK object.

    ```js
    // Declare connection parameters.
  
    /* Mandatory API parameters */
    let apiKey = '__abc'; // OBTAINED FROM DEVELOPER PAGE
  
    let apiSecret = '_xyz';  // OBTAINED FROM DEVELOPER PAGE
    
    /* 
      The valid API endpoints are:
      1. Mainnet: "https://api.ost.com/mainnet/v2/"
      2. Testnet: "https://api.ost.com/testnet/v2/"
    */
    let apiEndpoint = 'https://api.ost.com/testnet/v2/';
  
    /* Optional API parameters */
  
    // Connection timeout in seconds.
    let timeoutInSeconds = '60';
    let options = { timeout: timeoutInSeconds };
  
    const ostObj = new OSTSDK({apiKey: apiKey, apiSecret: apiSecret, apiEndpoint: apiEndpoint,config: options});
    ```

### Users Module 

* Initialize Users service object to perform user specific actions.

    ```js
    const usersService = ostObj.services.users;
    ```

* Create User. This creates a unique identifier for each user.

    ```js
    usersService.create({})
       .then(function(res) { console.log(JSON.stringify(res)); })
       .catch(function(err) { console.log(JSON.stringify(err)); });
    ```

* Get User Detail using the userId obtained in user create.

    ```js
    /* Mandatory API parameters */
  
    // UserId of user for whom user details needs to be fetched.
    let userId = 'c2c__';
    
    usersService.get({ user_id: userId })
        .then(function(res) { console.log(JSON.stringify(res)); })
        .catch(function(err) { console.log(JSON.stringify(err)); });
    ```

* Get Users List. Pagination is supported by this API.

    ```js
    /* Mandatory API parameters */
    // No mandatory parameters.
  
    /* Optional API parameters */    
  
    // Array of userIds for which data needs to be fetched.
    let userIdsArray = ["c2c__", "d2c__"];
  
    // Pagination identifier from the previous API call response. Not needed for page one.
    let paginationIdentifier = 'e77y___';
  
    // Limit.
    let limit = 10;
   
    usersService.getList({ ids: userIdsArray, limit: limit, pagination_identifier: paginationIdentifier })
        .then(function(res) { console.log(JSON.stringify(res)); })
        .catch(function(err) { console.log(JSON.stringify(err)); });
    ```

### Devices Module 

* Initialize Devices service object to perform device specific actions.
    ```js
    const devicesService = ostObj.services.devices;
    ```

* Create a Device for User.

    ```js
    /* Mandatory API parameters */
    
    // UserId of user for whom device needs to be created.
    let userId = 'c2c___';
    
    // Device address of user's device.
    let deviceAddress = '0x1Ea___';
    
    // Device API signer address.
    let apiSignerAddress = '0x5F8___';
    
    devicesService.create({
        user_id: userId,
        address: deviceAddress,
        api_signer_address: apiSignerAddress
    }).then(function(res) { console.log(JSON.stringify(res)); })
      .catch(function(err) { console.log(JSON.stringify(err)); });
    ```

* Get User Device Detail using userId and deviceAddress.

    ```js
    /* Mandatory API parameters */
    
    // UserId of user for whom device details needs to be fetched.
    let userId = 'c2c___';
    
    // Device address of user's device.
    let deviceAddress = '0x1E___';
    
    devicesService.get({
        user_id: userId,
        device_address: deviceAddress
    }).then(function(res) { console.log(JSON.stringify(res)); })
      .catch(function(err) { console.log(JSON.stringify(err)); });
    ```

* Get User Devices List. Pagination is supported by this API.

    ```js
    /* Mandatory API parameters */
    
    // UserId of user for whom device details needs to be fetched.
    let userId = 'c2c6___';
    
    /* Optional API parameters */
    
    // Pagination identifier from the previous API call response. Not needed for page one.
    let paginationIdentifier = 'eyJ___';
    
    // Array of device addresses of end user.
    let deviceAddressesArray = ['0x59___','0xab___'];
    
    // Limit.
    let limit = 10; 
    
    devicesService.getList({
        user_id: userId,
        addresses: deviceAddressesArray,
        pagination_identifier: paginationIdentifier,
        limit: limit 
    }).then(function(res) { console.log(JSON.stringify(res)); })
      .catch(function(err) { console.log(JSON.stringify(err)); });
    ```

### Device Managers Module

* Initialize Device Manager service object to perform device manager specific actions.

    ```js
    const deviceManagersService = ostObj.services.device_managers;
    ```

* Get Device Manager Detail using userId.

    ```js
    /* Mandatory API parameters */
    
    // UserId of user for whom device manager details needs to be fetched.
    let userId = 'c2c___';
    
    deviceManagersService.get({ user_id: userId })
        .then(function(res) { console.log(JSON.stringify(res)); })
        .catch(function(err) { console.log(JSON.stringify(err)); });
    ```

### Sessions Module

* Initialize Sessions service object to perform session specific actions.

    ```js
    const sessionsService = ostObj.services.sessions;
    ```

* Get User Session Detail using userId and session address.

    ```js
    /* Mandatory API parameters */
    
    // UserId of user for whom session details needs to be fetched.
    let userId = 'c2c___';
    
    // Session address of user for which details needs to be fetched.
    let sessionAddress = '0x1Ea___';
    
    sessionsService.get({
        user_id: userId, 
        session_address: sessionAddress
    }).then(function(res) { console.log(JSON.stringify(res)); })
      .catch(function(err) { console.log(JSON.stringify(err)); });
    ```

* Get User Sessions List using userId. Pagination is supported by this API.

    ```js
    /* Mandatory API parameters */
    
    // UserId of user for whom session details needs to be fetched.
    let userId = 'c2c___';
    
    /* Optional API parameters: */
    
    // Pagination identifier from the previous API call response. Not needed for page one.
    let paginationIdentifier = 'eyJs___';
    
    // Array of session addresses of end user.
    let sessionAddressesArray = ["0x59___","0xab___"];
    
    // Limit.
    let limit = 10; 
    
    sessionsService.getList({
        user_id: userId, 
        addresses: sessionAddressesArray,
        pagination_identifier: paginationIdentifier,
        limit: limit 
    }).then(function(res) { console.log(JSON.stringify(res)); })
      .catch(function(err) { console.log(JSON.stringify(err)); });
    ```


### Executing Transactions

For executing transactions, you need to understand the 4 modules described below.

#### Rules Module

* Initialize Rules service object to perform rules specific actions.

    ```js
    const rulesService = ostObj.services.rules;
    ```

* List Rules.

    ```js
    rulesService.getList({})
        .then(function(res) { console.log(JSON.stringify(res)); })
        .catch(function(err) { console.log(JSON.stringify(err)); });
    ```

#### Price Points Module

* Initialize Price Points service object to perform price points specific actions.

    ```js
    const pricePoints = ostObj.services.price_points;
    ```

* Get Price Points Detail.

    ```js
    /* Mandatory API parameters */
    
    // ChainId of your brand token economy.
    let chainId = 2000;
    
    pricePoints.get({ chain_id: chainId })
        .then(function(res) { console.log(JSON.stringify(res)); })
        .catch(function(err) { console.log(JSON.stringify(err)); });
    ```


#### Transactions Module

* Initialize Transactions service object to perform transaction specific actions.

    ```js
    const transactionsService = ostObj.services.transactions;
    ```

* DIRECT-TRANSFERS execute transaction should be used to transfer BTs to your end-users.

    ```js
    /* Mandatory API parameters */
    
    // Token holder address of receiver.
    let transferToAddress = '0xa3___';
    
    // Amount of tokens in weis to be transferred.
    let transferAmount = '1000000000000000000';
    
    // Parameters required for rule execution.
    let rawCalldata = JSON.stringify({
        method: 'directTransfers',  // Rule name which needs to be passed as-is.
        parameters: [[transferToAddress],[transferAmount]]
    });
    
    // Company userId.
    let senderUserId = 'ee89___';
    
    // Address of DirectTransfer rule. Use list rules API of Rules module to get the address of rules.
    // In the rules array which you will get in response, use the address having name "Direct Transfer".
    let directTransferRuleAddress = '0xe379___';
    
    /* Optional API parameters: */
    
    // Name of the transaction. Eg. 'like', 'download', etc.
    // NOTE: Max length 25 characters (Allowed characters: [A-Za-z0-9_/s])
    let transactionName = 'like';
    
    // Transaction type. Possible values: 'company_to_user', 'user_to_user', 'user_to_company'.
    let transactionType = 'company_to_user';
    
    // Some extra information about transaction.
    // NOTE: Max length 125 characters (Allowed characters: [A-Za-z0-9_/s])
    let details = 'lorem_ipsum';
    
    // Additional transaction information. There is no dependency between any of the metaProperty keys. 
    // However, if a key is present, its value cannot be null or undefined.       
    let metaProperty = {
        "name": transactionName,
        "type": transactionType,
        "details" : details
    };
    
    transactionsService.execute({
        user_id: senderUserId,
        to: directTransferRuleAddress,
        raw_calldata: rawCalldata,
        meta_property: metaProperty
    })
    .then(function(res) { console.log(JSON.stringify(res)); })
    .catch(function(err) { console.log(JSON.stringify(err)); });
    ```

* PAY Execute Transaction should be used when transactions of BTs equivalent to some fiat amount need to be executed.

    ```js
    /* Mandatory API parameters */
  
    // Token holder address of receiver.
    let transferToAddress = '0xa31__';
  
    // Amount of Fiat in atto units to be transferred. If 1 USD needs to be transferred, use 10^18, i.e. in atto units.
    let transferAmountInAtto = '1000000000000000000';
                               
    // Company token holder address.
    let companyTokenHolderAddress = '0xa963___';
  
    // Pay currency code. Supported currency codes are 'USD', 'EUR' and 'GBP'.
    let payCurrencyCode = 'USD';
  
    // In pay transaction, the transfer amounts are in pay currency (fiat currency like USD) which then are converted 
    // into tokens. Use get price point detail API of Price Points module to get this value.
    let pricePoint = 0.020606673;
  
    // Price point needs to be passed in atto. Also, this value should be a string.
    let intendedPricePoint = String(pricePoint * 10^18);
  
    // Parameters required for rule execution.
    let rawCalldata = JSON.stringify({
        method: 'pay',  // Rule name which needs to be passed as-is.
        parameters: [companyTokenHolderAddress, [transferToAddress],[transferAmountInAtto], payCurrencyCode, intendedPricePoint]
    });
  
    // Company userId.
    let senderUserId = 'ee8___';
    
    // Address of Pay rule. Use list rules API to get the address of rules.
    // In the rules array which you will get in response, use the address having name "Pricer".
    let payRuleAddress = '0xe37___';
  
    /* Optional API parameters: */
        
    // Name of the transaction. Eg. 'like', 'download', etc.
    // NOTE: Max length 25 characters (Allowed characters: [A-Za-z0-9_/s])
    let transactionName = 'like';
    
    // Transaction type. Possible values: 'company_to_user', 'user_to_user', 'user_to_company'.
    let transactionType = 'company_to_user';
    
    // Some extra information about transaction.
    // NOTE: Max length 125 characters (Allowed characters: [A-Za-z0-9_/s])
    let details = 'lorem_ipsum';
    
    // Additional transaction information. There is no dependency between any of the metaProperty keys. 
    // However, if a key is present, its value cannot be null or undefined.      
    let metaProperty = {
        "name": transactionName,
        "type": transactionType,
        "details" : details
    };
    
    transactionsService.execute({
        user_id: senderUserId,
        to: payRuleAddress,
        raw_calldata: rawCalldata,
        meta_property: metaProperty
      }).then(function(res) { console.log(JSON.stringify(res)); })
        .catch(function(err) { console.log(JSON.stringify(err)); });
    ```

* Get Transaction Detail using userId and transactionId.

    ```js
    /* Mandatory API parameters: */
  
    // UserId of end-user.
    let userId = 'ee8___';
  
    // Unique identifier of the transaction to be retrieved.
    let transactionId = 'f1d___';
  
    transactionsService.get({ user_id: userId, transaction_id: transactionId })
        .then(function(res) { console.log(JSON.stringify(res)); })
        .catch(function(err) { console.log(JSON.stringify(err)); });
    ```

* Get User Transactions using userId. Pagination is supported by this API.

    ```js
    /* Mandatory API parameters: */
  
    // UserId of end-user.
    let userId = 'ee89___';
  
    /* Optional API parameters: */
  
    // Array of status values.
    let statusesArray = ['CREATED', 'SUBMITTED', 'SUCCESS', 'FAILED'];
  
    // Name of the transaction. Eg. 'like', 'download', etc. 
    // NOTE: Max length 25 characters (Allowed characters: [A-Za-z0-9_/s])
    let transactionName = 'like';
    
    // Transaction type. Possible values: 'company_to_user', 'user_to_user', 'user_to_company'.
    let transactionType = 'company_to_user';
    
    // NOTE: Max length 125 characters (Allowed characters: [A-Za-z0-9_/s])
    let details = 'lorem_ipsum';
  
    // Additional transaction information. There is no dependency between any of the metaProperty keys. 
    // However, if a key is present, its value cannot be null or undefined. 
    let metaPropertiesArray =  JSON.stringify([
        {
            "name":  transactionName, 
            "type":  transactionType,
            "details" : details
        }
    ]);
  
    // Limit.
    let limit = 10;
  
    // Pagination identifier from the previous API call response.  Not needed for page one.
    let paginationIdentifier = 'eyJsY___';
    
    transactionsService.getList({ 
        user_id: userId,
        statuses: statusesArray,
        meta_properties: metaPropertiesArray,
        limit: limit,
        pagination_identifier: paginationIdentifier
     }).then(function(res) { console.log(JSON.stringify(res)); })
       .catch(function(err) { console.log(JSON.stringify(err)); });
    ```


#### Balances Module

* Initialize Balances service object to perform balances specific actions.

    ```js
    const balancesService = ostObj.services.balance;
    ```

* Get User Balance using userId.

    ```js
    /* Mandatory API parameters: */
  
    // UserId for whom balance needs to be fetched.
    let userId = 'c2c6___';
  
    balancesService.get({ user_id: userId })
        .then(function(res) { console.log(JSON.stringify(res)); })
        .catch(function(err) { console.log(JSON.stringify(err)); });
    ```


### Recovery Owners Module 

* Initialize Recovery Owners service object to perform recovery owners specific actions.

    ```js
    const recoveryOwnersService = ostObj.services.recovery_owners;
    ```

* Get Recovery Owner Detail using userId and recovery owner address.
    
  ```js
    /* Mandatory API parameters: */
    
    // UserId for whom recovery details needs to be fetched.
    let userId = 'c2c___';
    
    // Recovery address of user.
    let recoveryOwnerAddress = '0xe37___';
  
    recoveryOwnersService.get({
        user_id: userId,
        recovery_owner_address: recoveryOwnerAddress
    }).then(function(res) { console.log(JSON.stringify(res)); })
      .catch(function(err) { console.log(JSON.stringify(err)); });
    ```


### Tokens Module

* Initialize Tokens service object to perform tokens specific actions.

    ```js
    const tokensService = ostObj.services.tokens;
    ```

* Get Token Detail.

    ```js
    tokensService.get({})
        .then(function(res) { console.log(JSON.stringify(res)); })
        .catch(function(err) { console.log(JSON.stringify(err)); });
    ```

### Chains Module 

* Initialize Chains service object to perform chains specific actions.

    ```js
    const chainsService = ostObj.services.chains;
    ```

* Get Chain Detail using chainId.

    ```js
    /* Mandatory API parameters: */
    
    // ChainId for which details needs to be fetched. Only origin chainId and OST-specific auxiliary chainIds are allowed.
    let chainId = '2000';
  
    chainsService.get({ chain_id: chainId })
        .then(function(res) { console.log(JSON.stringify(res)); })
        .catch(function(err) { console.log(JSON.stringify(err)); });
    ```

### Base Tokens Module

* Initialize Base Tokens service object to perform base tokens specific actions.

    ```js
    const baseTokensService = ostObj.services.base_tokens;
    ```

* Get Base Tokens Detail.

    ```js
    baseTokensService.get({})
        .then(function(res) { console.log(JSON.stringify(res)); })
        .catch(function(err) { console.log(JSON.stringify(err)); });
    ```

### Webhooks Module

* Initialize Webhooks service object to perform webhooks specific actions.

    ```js
    const webhooksService = ostObj.services.webhooks;
    ```

* Create Webhook using the topics and the subscription url.

    ```js
    /* Mandatory API parameters: */
  
    // Array of topics.
    let topicParams = ['transactions/initiate','transactions/success'];
  
    // URL where you want to receive the event notifications.
    let url = 'https://www.testingWebhooks.com';
  
    /* Optional API parameters: */
  
    // Status of a webhook. Possible values are 'active' and 'inactive'.
    let status = 'active';
  
    webhooksService.create({ topics: topicParams , url: url, status: status})
        .then(function(res) { console.log(JSON.stringify(res)); })
        .catch(function(err) { console.log(JSON.stringify(err)); });
    ```

* Update existing Webhook using a webhookId and an array of topics.

    ```js
    /* Mandatory API parameters: */
  
    // Array of topics.
    let topicParams = ['transactions/initiate','transactions/success'];
  
    // Unique identifier for a webhook.
    let webhookId = 'a743___';
  
    /* Optional API parameters: */
  
    // Status of a webhook. Possible values are 'active' and 'inactive'.
    let status = 'active';
  
    webhooksService.update({ webhook_id: webhookId, topics: topicParams, status: status })
        .then(function(res) { console.log(JSON.stringify(res)); })
        .catch(function(err) { console.log(JSON.stringify(err)); });
    ```

* Get Webhook using webhookId.

    ```js
    /* Mandatory API parameters: */
  
    let webhookId = 'a743___';
    // Unique identifier for a webhook.
  
    webhooksService.get({ webhook_id: webhookId })
        .then(function(res) { console.log(JSON.stringify(res)); })
        .catch(function(err) { console.log(JSON.stringify(err)); });
    ```

* Get Webhook List. Pagination is supported by this API.

    ```js
    /* Mandatory API parameters: */
    // No mandatory parameters.
  
    /* Optional API parameters: */
  
    // Limit.
    let limit = 10;
  
    // Pagination identifier from the previous API call response.  Not needed for page one.
    let paginationIdentifier = 'eyJwY___';
  
    webhooksService.getList({ limit: limit, pagination_identifier: paginationIdentifier })
        .then(function(res) { console.log(JSON.stringify(res)); })
        .catch(function(err) { console.log(JSON.stringify(err)); });
    ```

* Delete Webhook using webhookId.

    ```js
    /* Mandatory API parameters: */
  
    // Unique identifier for a webhook.
    let webhookId = 'a743___';
  
    webhooksService.deleteWebhook({ webhook_id: webhookId })
        .then(function(res) { console.log(JSON.stringify(res)); })
        .catch(function(err) { console.log(JSON.stringify(err)); });
    ``` 

* Verify webhook request signature. This can be used to validate if the webhook received at your end from OST platform is correctly signed.

    ```js
    // Webhook data obtained.
    webhookEventData = JSON.stringify({"id":"54e3cd1c-afd7-4dcf-9c78-137c56a53582","topic":"transactions/success","created_at":1560838772,"webhook_id":"0823a4ea-5d87-44cf-8ca8-1e5a31bf8e46","version":"v2","data":{"result_type":"transaction","transaction":{"id":"ddebe817-b94f-4b51-9227-f543fae4715a","transaction_hash":"0x7ee737db22b58dc4da3f4ea4830ca709b388d84f31e77106cb79ee09fc6448f9","from":"0x69a581096dbddf6d1e0fff7ebc1254bb7a2647c6","to":"0xc2f0dde92f6f3a3cb13bfff43e2bd136f7dcfe47","nonce":3,"value":"0","gas_price":"1000000000","gas_used":120558,"transaction_fee":"120558000000000","block_confirmation":24,"status":"SUCCESS","updated_timestamp":1560838699,"block_timestamp":1560838698,"block_number":1554246,"rule_name":"Pricer","meta_property":{},"transfers":[{"from":"0xc2f0dde92f6f3a3cb13bfff43e2bd136f7dcfe47","from_user_id":"acfdea7d-278e-4ffc-aacb-4a21398a280c","to":"0x0a754aaab96d634337aac6556312de396a0ca46a","to_user_id":"7bc8e0bd-6761-4604-8f8e-e33f86f81309","amount":"112325386","kind":"transfer"}]}}});
    
    // Get webhoook version from webhook events data.
    version = "v2";
    
    // Get ost-timestamp from the response received in event.
    requestTimestamp = '1559902637';
    
    // Get signature from the response received in event.
    signature = '2c56c143550c603a6ff47054803f03ee4755c9c707986ae27f7ca1dd1c92a824';
    
    stringifiedData = webhookEventData;
    webhookSecret = 'mySecret';
    let resp = webhooksService.verifySignature(version, stringifiedData,requestTimestamp, signature, webhookSecret);
    console.log(resp);
    ```
