import { ethers } from "ethers";

const getTxCount = async (address) => {
  const provider = new ethers.providers.JsonRpcProvider(
    process.env.REACT_APP_ALCHEMY_URL
  );
  
  const response = await provider.getTransactionCount(address).then((result) => {
    return result;
  }, (error) => {
    console.log(error);
    return "Error, invalid address."
  });

  return response;
}

export default getTxCount;