// ++++++++++++++++ Define Contracts ++++++++++++++++ 

//Deploy Token First
const HDT = artifacts.require("./HDT.sol");

//Deploy Pool
const HDTBNBPool = artifacts.require("./HDTBNBPool.sol");
const HDTGOFPool = artifacts.require("./HDTGOFPool.sol");
const HDTHTPool = artifacts.require("./HDTHTPool.sol");
const HDTUSDTPool = artifacts.require("./HDTUSDTPool.sol");
const HDTWETHPool = artifacts.require("./HDTWETHPool.sol");

// ++++++++++++++++  Main Migration ++++++++++++++++ 

const migration = async (deployer, network, accounts) => {
  await Promise.all([
    deployPool(deployer, network),
  ]);
};

module.exports = migration;

// ++++++++++++++++  Deploy Functions ++++++++++++++++ 
async function deployPool(deployer, network) {
  
  let hdt = new web3.eth.Contract(GOF.abi, '0x1A754244EC6C879C38dD4a774e3979d77D414Bc1');

  let reward_account = "0x424abfc7c0Defb02447D621Bf0f6eF80eD5C01fB";

  console.log("[HUB] 1.Start deploy pool on Network= " + network);

  await deployer.deploy(HDTBNBPool);
  await deployer.deploy(HDTGOFPool);
  await deployer.deploy(HDTHTPool);
  await deployer.deploy(HDTUSDTPool);
  await deployer.deploy(HDTWETHPool);
  
  console.log("[HUB] 2.Start add minter acl for pool");
  await Promise.all([
    hdt.methods.addMinter(HDTBNBPool.address),
    hdt.methods.addMinter(HDTGOFPool.address),
    hdt.methods.addMinter(HDTHTPool.address),
    hdt.methods.addMinter(HDTUSDTPool.address),
    hdt.methods.addMinter(HDTWETHPool.address)
  ]);

  // console.log("[Golff] 3.Start set reward distributor");

  // let bnb_pool = new web3.eth.Contract(HDTBNBPool.abi, HDTBNBPool.address);
  // let gof_pool = new web3.eth.Contract(HDTGOFPool.abi, HDTGOFPool.address);
  // let ht_pool = new web3.eth.Contract(HDTHTPool.abi, HDTHTPool.address);
  // let usdt_pool = new web3.eth.Contract(HDTUSDTPool.abi, HDTUSDTPool.address);
  // let weth_pool = new web3.eth.Contract(HDTWETHPool.abi, HDTWETHPool.address);

  // await Promise.all([
  //   bnb_pool.methods.setRewardDistribution(reward_account).send({ from: reward_account}),
  //   gof_pool.methods.setRewardDistribution(reward_account).send({ from: reward_account}),
  //   ht_pool.methods.setRewardDistribution(reward_account).send({ from: reward_account}),
  //   usdt_pool.methods.setRewardDistribution(reward_account).send({ from: reward_account}),
  //   weth_pool.methods.setRewardDistribution(reward_account).send({ from: reward_account}),
  // ]);

  // console.log("[Golff] 4.Start reward Gof to pool");

  // let init_quota = web3.utils.toBN(10 ** 18).mul(web3.utils.toBN(70000)).div(web3.utils.toBN(10 ** 4));

  // await Promise.all([
  //   bnb_pool.methods.notifyRewardAmount(init_quota.toString()).send({ from: reward_account, gas: 100000}),
  //   gof_pool.methods.notifyRewardAmount(init_quota.toString()).send({ from: reward_account, gas: 100000}),
  //   ht_pool.methods.notifyRewardAmount(init_quota.toString()).send({ from: reward_account, gas: 100000}),
  //   usdt_pool.methods.notifyRewardAmount(init_quota.toString()).send({ from: reward_account, gas: 100000}),
  //   weth_pool.methods.notifyRewardAmount(init_quota.toString()).send({ from: reward_account, gas: 100000})
  // ]);
}