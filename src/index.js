
const ethers = require("ethers");
const { crabABI } = require("./abi.js");
const crabAddress = "0x7de22357d72517a89773c7c7124fecade4d7e554";

class Crab {

  constructor(rpcProvider) {
    const rpc = new ethers.providers.JsonRpcProvider(rpcProvider);
    const crab = new ethers.Contract(crabAddress, crabABI, rpc);

    this.crab = crab;
  }

  async bag(crabId) {

      const [body, claw, leg, shell, background] =
        await Promise.all([
          crab.getBody(crabId),
          crab.getClaw(crabId),
          crab.getLeg(crabId),
          crab.getShell(crabId),
          crab.getBackground(crabId),
        ]);

      let bag = {
        id: crabId,
        body: body,
        claw: claw,
        leg: leg,
        shell: shell,
        background: background,
      }

      return bag;
  }

  async numberOfOGBagsInWallet(address) {
    let balance = await this.crab.balanceOf(address);

    return balance.toNumber();
  }

  async numberOfMoreBagsInWallet(address) {
    let balance = await this.moreCrab.balanceOf(address);

    return balance.toNumber();
  }

  async numberOfBagsInWallet(address, excludingMoreCrab=true) {
    return await this.numberOfOGBagsInWallet(address) + (excludingMoreCrab ? 0 : await this.numberOfMoreBagsInWallet(address));
  }

  async crabIdsInWallet(address) {
    const numberOfBags = await this.numberOfBagsInWallet(address);
    let crabIds = [];
    let tasks = [];
    for (var i = 0;i < numberOfBags; i++) {
      tasks.push(this.crab.tokenOfOwnerByIndex(address, i));
    }

    const data = await Promise.all(tasks);
    for (const crabIdBN of data) {
      crabIds.push(crabIdBN.toString());
    }

    return crabIds;
  }
}

module.exports = Crab;
