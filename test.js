
var Corruption = require('./src/index.js');
console.log("import", Corruption)
async function run() {
    // init
    const address = "0x5bdf397bb2912859dbd8011f320a222f79a28d2e";
    rpcProvider = "https://mainnet.infura.io/v3/752f065f467246a686ba54b11f77dcfd";
    let corruption = new Corruption(rpcProvider);

    // var numberOfNFTsInWallet = await corruption.numberOfNFTsInWallet("0xb61193014Fc983b3475d6bF365B7647c2E52b713")
    // var corruptionIdsInWallet = await corruption.corruptionIdsInWallet("0xb61193014Fc983b3475d6bF365B7647c2E52b713")
    // var insight = await corruption.insight("123")
    // var insightMap = await corruption.insightMap("123")
    // var tokenURI = await corruption.tokenURI("123")
    // var hiddenAttribute = await corruption.hiddenAttribute("223")
    // var border = await corruption.border("223")
    // var corruptor = await corruption.corruptor("223")
    // var totalCorruption = await corruption.corruption("223")
    // var attributes = await corruption.attributes("223")
    var attributes = await corruption.attributes("223")

    // console.log("Number of NFTs ", numberOfNFTsInWallet);
    // console.log("List of Corruption NFTs ", corruptionIdsInWallet);
    // console.log("Insight ", insight);
    // console.log("insightMap ", insightMap);
    // console.log("corruption ", totalCorruption);
    // console.log("tokenURI ", tokenURI);
    // console.log("hiddenAttribute ", hiddenAttribute);
    // console.log("border ", border);
    // console.log("corruptor ", corruptor);
    console.log("Full Attributes: ", attributes);
}
run().then(function () { console.log("done") })
