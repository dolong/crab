# crab.js

## Install

```Shell
npm install --save crab.js
```

## Get started

```javascript
var Crab = require('crab.js');

// init
// https://rinkeby.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161
const address = "0x84AB05F09B5ad3a1de6941FBf29BdF77CC7E2100";
let crab = new Crab("http://localhost:8545");

// get OG Crab balance
const ogCount = await crab.numberOfOGBagsInWallet(address);

// get More Crab balance
const moreCount = await crab.numberOfMoreBagsInWallet(address);

// get OG and More Crab balance
const allCount = await crab.numberOfBagsInWallet(address, false);

// get OG and More CrabIds
var crabIds = await crab.crabIdsInWallet(address, false);

// 👁️ Bag #1000 (an OG Crab)
var bag = await crab.bag(1);
console.log(bag);
/*
{
  id: 1,
  body: '..',
  claw: '..',
  shell: '..',
  leg: '..',
  background: '..',
}

*/

```
