require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.28",
  networks: {
    // beépített "hardhat" háló: nem kell hozzá külön node, 
    // a script futása alatt indul és leáll (ephemeral)
    hardhat: {},

    // külső lokális node-hoz (npx hardhat node) – alapértelmezett porton
    localhost: {
      url: "http://127.0.0.1:8545",
    },

    // másik porton futó node-hoz (ha 8545 foglalt)
    local8546: {
      url: "http://127.0.0.1:8546",
    },
  },
};
