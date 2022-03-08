const { create } = require("ipfs-http-client");

const ipfs = create("https://ipfs.infura.io:5001");

async function run() {
  const files = [{
    path: '/',
    content: JSON.stringify({
      name: "Airdropper",
      attributes: [
        {
          "trait_type": "Genesis",
          "value": "Extremely High"
        }
      ],
      image: "https://gateway.ipfs.io/ipfs/QmdpJtRdZieVuMRT7L757rid32nEtRDKjpagPnCRV6GXAu",
      description: "Let There Be Proof of Stake Consensus"
    })
  }];

  const result = await ipfs.add(files);
  console.log(result);
}

run();
