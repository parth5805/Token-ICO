
const hre = require("hardhat");

async function main() {
  
  const Token = await hre.ethers.getContractFactory("MINDPAY");
  const mindpay = await Token.deploy();
  await mindpay.deployed();


  const TokenReward = await hre.ethers.getContractFactory("MINDREWARD");
  const mindreward = await TokenReward.deploy();
  await mindreward.deployed();


  const Liquidity = await hre.ethers.getContractFactory("Liquidity");
  const liquidity = await Liquidity.deploy();
  await liquidity.deployed();

  const Staking = await hre.ethers.getContractFactory("Staking");
  const staking = await Staking.deploy(mindpay.address,mindreward.address);
  await staking.deployed();


  console.log("MINDPAY deployed to:", mindpay.address);
  console.log("MINDREWARD deployed to:", mindreward.address);
  console.log("Liquidity deployed to:", liquidity.address);
    //staking need mindpay and mindreward address as constructor

  console.log("Staking deployed to:", staking.address);



}


main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
