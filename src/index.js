
const ethers = require("ethers");
const base64 = require('base-64')
const { corruptionABI } = require("./abi.js");
const corruptionAddress = "0x5bdf397bb2912859dbd8011f320a222f79a28d2e";

class Corruption {
  constructor(rpcProvider) {
    const rpc = new ethers.providers.JsonRpcProvider(rpcProvider);
    const Corruption = new ethers.Contract(corruptionAddress, corruptionABI, rpc);

    this.Corruption = Corruption;
  }

  async bag(corruptionId) {

      const [insight, InsightMap] =
        await Promise.all([
          this.Corruption.insight(corruptionId),
          this.Corruption.insightMap(corruptionId),
        ]);

      let bag = {
        id: corruptionId,
        insight: insight,
        InsightMap: InsightMap,
      }

      return bag;
  }

  hex_to_ascii(str1)
  {
    var hex  = str1.toString();
    var str = '';
    for (var n = 0; n < hex.length; n += 2) {
      str += String.fromCharCode(parseInt(hex.substr(n, 2), 16));
    }
    return str;
  }

  async insight(corruptionId) {

    let insight = await this.Corruption.insight(corruptionId);
    
    //this.hex_to_ascii(insight)
    return JSON.parse(insight);
  }

  async insightMap(corruptionId) {

    let insightMap = await this.Corruption.insightMap(corruptionId);
    const insightMapParsed = {
      savedXP: JSON.parse(insightMap[0]),
      lastSavedBlock : JSON.parse(insightMap[1])
    }
    return insightMapParsed;
  }


  async tokenURI(corruptionId) {

    let token = await this.Corruption.tokenURI(corruptionId);
    
    token = base64.decode(token.split(',')[1])
    let image = JSON.parse(token).image
    image = base64.decode(image.split(",")[1])

    return image;
  }

  async hiddenAttribute(corruptionId) {
    const image = await this.tokenURI(corruptionId)
    const hiddenAttribute = image.substring(217,227)
    return hiddenAttribute;
  }

  async border(corruptionId) {
    const image = await this.tokenURI(corruptionId)
    // This takes the last row that has no corruptors
    const border = image.substring(2417,2418)
    return border;
  }

  async corruptor(corruptionId) {
    const image = await this.tokenURI(corruptionId)
    const border = await this.border(corruptionId)

    //take the first line
    const first = image.substring(406,437)

    //remove the corruptor to find out
    const removeCorruptor = first.split(border).join('')
    const corruptor = removeCorruptor.substring(0,1)

    return corruptor;
  }

  corruption(corruptionId) {

    return  corruptionId % 1024;
  }
  async attributes(corruptionId) {
    const insight = await this.insight(corruptionId);
    const insightMap = await this.insightMap(corruptionId);
    const hiddenAttribute = await this.hiddenAttribute(corruptionId);
    const border = await this.border(corruptionId);
    const corruptor = await this.corruptor(corruptionId);
    const corruption = this.corruption(corruptionId);
    return {
      id: corruptionId,
      insight: insight,
      insightMap: insightMap,
      hiddenAttribute: hiddenAttribute,
      border: border,
      corruptor: corruptor,
      corruption: corruption
    }
  }
  async numberOfNFTsInWallet(address) {
    let balance = await this.Corruption.balanceOf(address);

    return balance.toNumber();
  }

  async corruptionIdsInWallet(address) {
    const numberOfNFTs = await this.numberOfNFTsInWallet(address);
    let corruptionIds = [];
    let tasks = [];
    for (var i = 0;i < numberOfNFTs; i++) {
      tasks.push(this.Corruption.tokenOfOwnerByIndex(address, i));
    }

    const data = await Promise.all(tasks);
    for (const corruptionIdBN of data) {
      corruptionIds.push(corruptionIdBN.toString());
    }

    return corruptionIds;
  }
}

module.exports = Corruption;
