
var Crab = require('crab.js');

async function run() {
    // init
    // https://rinkeby.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161
    const address = "0xb61193014Fc983b3475d6bF365B7647c2E52b713";
    let crab = new Crab("https://rinkeby.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161");

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
}
run().then(function () { console.log("done") })
