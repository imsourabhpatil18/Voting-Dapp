require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */

const ALCHEMY_API_KEY = "_EemJldI7Q2EbIcwTPXcuKVT_X_UaS5r";
const SEPOLIA_PRIVATE_KEY =
  "b9d9221b388aa929da06b6063e4fd7b59e293656cad06702f40493f16d1637ef";

module.exports = {
  solidity: "0.8.19",

  paths: {
    sources: "./client/src/contracts", // Specify the correct path to your contracts
  },

  networks: {
    sepolia: {
      accounts: [SEPOLIA_PRIVATE_KEY],
      url: "https://eth-sepolia.g.alchemy.com/v2/_EemJldI7Q2EbIcwTPXcuKVT_X_UaS5r",
    },
  },
};
