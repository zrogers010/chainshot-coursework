import { SHA256 } from "crypto-js";
import "./index.scss";
const EC = require('elliptic').ec;
//const { SHA256 } = require('crypto-js/sha256');
const ec = new EC('secp256k1');

const server = "http://localhost:3042";

document.getElementById("exchange-address").addEventListener('input', ({ target: {value} }) => {
  if(value === "") {
    document.getElementById("balance").innerHTML = 0;
    return;
  }

  fetch(`${server}/balance/${value}`).then((response) => {
    return response.json();
  }).then(({ balance }) => {
    document.getElementById("balance").innerHTML = balance;
  });
});

document.getElementById("transfer-amount").addEventListener('click', () => {
  const sender = document.getElementById("exchange-address").value;
  const pk = document.getElementById("private-key").value;
  const amount = document.getElementById("send-amount").value;
  const recipient = document.getElementById("recipient").value;

  console.log(sender);
  console.log(pk);
  
  const sigHash = SHA256(sender).toString();
  const signature = ec.keyFromPrivate(pk, 'hex').sign(sigHash);

  const body = JSON.stringify({
    sender, pk, amount, recipient, signature
  });

  console.log(body);
  
  const request = new Request(`${server}/send`, { method: 'POST', body });

  fetch(request, { headers: { 'Content-Type': 'application/json' }}).then(response => {
    return response.json();
  }).then((obj) => {
    if (obj.error){
      alert(obj.error);
    } else{
        document.getElementById("balance").innerHTML = obj.balance;
    }
  
  });
});
