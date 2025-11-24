// src/abi/CacMarketplace.js
export const cacMarketAbi = [
  {
    "inputs": [
      { "internalType": "address", "name": "_cac", "type": "address" },
      { "internalType": "address", "name": "_reg", "type": "address" }
    ],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "inputs": [
      { "internalType": "uint256", "name": "amount", "type": "uint256" },
      { "internalType": "uint256", "name": "priceWei", "type": "uint256" }
    ],
    "name": "list",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{ "internalType": "uint256", "name": "id", "type": "uint256" }],
    "name": "cancel",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{ "internalType": "uint256", "name": "id", "type": "uint256" }],
    "name": "buy",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "nextId",
    "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{ "internalType": "uint256", "name": "id", "type": "uint256" }],
    "name": "listings",
    "outputs": [
      { "internalType": "address", "name": "seller", "type": "address" },
      { "internalType": "uint256", "name": "amount", "type": "uint256" },
      { "internalType": "uint256", "name": "priceWei", "type": "uint256" },
      { "internalType": "bool", "name": "active", "type": "bool" }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "type": "event",
    "name": "Listed",
    "inputs": [
      { "indexed": true,  "name": "id", "type": "uint256" },
      { "indexed": true,  "name": "seller", "type": "address" },
      { "indexed": false, "name": "amount", "type": "uint256" },
      { "indexed": false, "name": "priceWei", "type": "uint256" }
    ]
  },
  {
    "type": "event",
    "name": "Cancelled",
    "inputs": [
      { "indexed": true, "name": "id", "type": "uint256" },
      { "indexed": true, "name": "seller", "type": "address" }
    ]
  },
  {
    "type": "event",
    "name": "Purchased",
    "inputs": [
      { "indexed": true,  "name": "listingId", "type": "uint256" },
      { "indexed": true,  "name": "buyer", "type": "address" },
      { "indexed": false, "name": "amount", "type": "uint256" },
      { "indexed": false, "name": "priceWei", "type": "uint256" },
      { "indexed": true,  "name": "seller", "type": "address" }
    ]
  }
]
