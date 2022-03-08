
import { ethers } from 'ethers';
import './App.css';
import React from 'react';
import { EtherscanProvider } from '@ethersproject/providers';
import { contractJSON } from './utils/Greeter.json'

const contractAddress = "";

function App() {

  // pure javascript

  // 1) Set up Metamask API (provider + requestAccounts)
  const [address, setAddress] = React.useState("");
  const [balance, setBalance] = React.useState(0);
  const [currentGreeting, setCurrentGreeting] = React.useState("");
  React.useEffect(() => {
    // this logic runs everytime the page reloads.
    getGrettingFromGreeter();
  });
  const { ethereum } = window;
  let provider;
  //provider = new ethers.providers.JsonRpcProvider("alchemy_url")

  if(ethereum) {
    console.log("This user has Metamask");
    ethereum.request({ method: 'eth_requestAccounts'});
    provider = new ethers.providers.Web3Provider(ethereum);
    displayUserDetails();
  } else {
    console.log("Please install Metamask");
  }

  // 2). Create a Contract instance (using ethers.js)
  //const contractInstance = new ethers.Contract();
  // const signer = await provider.getSigner();
  // const contractInstance = new ethers.Contract(contractAddress, contractJSON.abi, signer);

  // 3). 
  async function getGreetingFromGreeter() {
    const signer = await provider.getSigner();
    const contractInstance = new ethers.Contract(contractAddress, contractJSON.abi, signer);
    const currentGreeting = await contractInstance.greet();
    setCurrentGreeting(currentGreeting);
  }

  async function setGreeting() {
    const signer = await provider.getSigner();
    const contractInstance = new ethers.Contract(contractAddress, contractJSON.abi, signer);
    await contractInstance.setGreeting("hello!!!!");

  }

  async function displayUserDetails() {
    const signer = await provider.getSigner();
    const addr1 = await signer.getAddress();
    const userBalance = await provider.getBalance(addr1);
    setAddress(addr1);
    setBalance(ethers.utils.formatEther(userBalance));
  }

  return (
    <div className="App">
      <div>
        <p>Your Address: {address}</p>
        <p>Your Balance: {balance}</p>
      </div>
      <button onClick={getGreetingFromGreeter}>
        Interact With Contract!
      </button >
    </div>
  );
}

export default App;
