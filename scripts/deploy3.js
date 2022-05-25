
const hre = require("hardhat");

async function main() {

  const Investment = await hre.ethers.getContractFactory("Investment");
  const investment = await Investment.deploy("0x1Fa75022bC9b986ab1f90a38AD0A0eBdcB2A8d6C","0xbc565A1eA3036679F77BED29696b7F171B443389","0xd3b7C38cA909ea4aE9d61adD0379b124aadBC1a7","0x9B142eB812a3c7B0880FDda1bbe4A130A2bD7700");
  await investment.deployed();

 //INVESTMENT need mindpay ,RESERVE,LIQUIDITY,STAKING address as constructor
  console.log("INVESTMENT deployed to:", investment.address);
  



}


main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
