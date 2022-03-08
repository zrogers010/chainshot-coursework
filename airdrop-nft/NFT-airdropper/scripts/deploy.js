async function main() {
  const AirdropperNFT = await hre.ethers.getContractFactory("AirdropperNFT");
  const nft = await AirdropperNFT.deploy();

  await nft.deployed();

  console.log("AirdropperNFT deployed to:", nft.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
