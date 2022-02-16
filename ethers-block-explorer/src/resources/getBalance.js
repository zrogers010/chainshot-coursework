import { ethers } from "ethers";

const getBalance = async (address) => {
  const provider = new ethers.providers.JsonRpcProvider(
    process.env.REACT_APP_ALCHEMY_URL
  );
  
  const response = await provider.getBalance(address).then((result) => {
    return ethers.utils.formatEther(result);
  }, (error) => {
    console.log(error);
    return "Error, invalid address."
  });

  return response;
}

export default getBalance;