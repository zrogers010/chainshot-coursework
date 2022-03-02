const { ethers, upgrades } = require("hardhat");

async function main() {
  const BoxV1 = await ethers.getContractFactory("BoxV1");
  const instance = await upgrades.deployProxy(BoxV1, [12, 12]);
  await instance.deployed();

  console.log(instance.address);
}

main();