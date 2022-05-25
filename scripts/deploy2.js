
const hre = require("hardhat");

async function main() {
  
  const Reserve = await hre.ethers.getContractFactory("Reserve");
  const reserve = await Reserve.deploy("0x1Fa75022bC9b986ab1f90a38AD0A0eBdcB2A8d6C");
  await reserve.deployed();

    //RESERVE need mindpay  address as constructor
  console.log("RESERVE deployed to:", reserve.address);
  
}


main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
