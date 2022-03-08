const { create } = require("ipfs-http-client");

const ipfs = create("https://ipfs.infura.io:5001");
// or, if you have a local node running:
// const ipfs = create("http://127.0.0.1:5001");

export default async function ipfsUpload(buffer) {
  const result = await ipfs.add(buffer);
  return `https://gateway.ipfs.io/ipfs/${result.path}`;
}
