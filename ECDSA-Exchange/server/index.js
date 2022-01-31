const express = require('express');
const app = express();
const cors = require('cors');
const port = 3042;

// 
const EC = require('elliptic').ec;
const { text } = require('express');
const ec = new EC('secp256k1');

//
const SHA256 = require('crypto-js/sha256');
const secp = require("@noble/secp256k1");


// localhost can have cross origin errors
// depending on the browser you use!
app.use(cors());
app.use(express.json());

// const balances = {
//   "1": 100,
//   "2": 50,
//   "3": 75,
// }

// Generate keypairs
const kp1 = ec.genKeyPair();
const kp2 = ec.genKeyPair();
const kp3 = ec.genKeyPair();

// Create wallet public keys
const publicKey1 = kp1.getPublic().encode('hex');
const publicKey2 = kp2.getPublic().encode('hex');
const publicKey3 = kp3.getPublic().encode('hex');

// Create wallet private keys
const privateKey1 = kp1.getPrivate().toString(16);
const privateKey2 = kp2.getPrivate().toString(16);
const privateKey3 = kp3.getPrivate().toString(16);

const publicKeys = {
  publicKey1: publicKey1,
  publicKey2: publicKey2,
  publicKey3: publicKey3
};
console.log("Public Keys: ");
console.log(publicKeys);

const privateKeys = {
  privateKey1: privateKey1,
  privateKey2: privateKey2,
  privateKey3: privateKey3
};
console.log("Private Keys: ");
console.log(privateKeys);

// Set balances for public key addresses
const balances = {
  [publicKey1]: 100,
  [publicKey2]: 50,
  [publicKey3]: 75
}
console.log("Balances: ");
console.log(balances);

app.get('/balance/:address', (req, res) => {
  const {address} = req.params;
  const balance = balances[address] || 0;
  res.send({ balance });
});

app.post('/send', (req, res) => {
  const {sender, recipient, amount, signature} = req.body;
  // console.log(sender);
  // console.log(signature);
  
  const sigHash = SHA256(sender).toString();
  console.log(ec.keyFromPublic(sender, 'hex').verify(sigHash, signature));


  // execute transaction
  if(ec.keyFromPublic(sender, 'hex').verify(sigHash, signature)) {
    balances[sender] -= amount;
    balances[recipient] = (balances[recipient] || 0) + +amount;
    console.log("Success!");
  } 
  else {
    console.log("Error, transaction failed to verify!")
  } 
  res.send({ balance: balances[sender] });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});
