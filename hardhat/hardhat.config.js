require("@nomicfoundation/hardhat-toolbox");
require("hardhat-abi-exporter");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {},
    sepolia: {
      // add API key
      url: "https://eth-sepolia.g.alchemy.com/v2/{api-key}",
      // add privatekey references
      accounts: [],
    },
    mainnet: {
      // add API key
      url: "https://eth-mainnet.g.alchemy.com/v2/{api-key}",
      // add privatekey references
      accounts: [],
    },
  },
  solidity: {
    version: "0.8.24",

    settings: {
      // update evm version as required
      evmVersion: "paris",
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts",
  },
  abiExporter: [
    {
      path: "../client/app/_abi",
      runOnCompile: true,
      format: "json",
      spacing: 4,
      clear: true,
    },
  ],
};
