// scripts/deploy_all.js
const path = require('path');
const { ethers } = require('hardhat');
const fs = require('fs');

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deployer:", deployer.address);

  // 1) Registry
  const OPERATOR = process.env.OPERATOR || "0x8626f6940e2eb28930efb4cef49b2d1f2c9c1199";
  const Reg = await ethers.getContractFactory("CacRegistry");
  const reg = await Reg.deploy(OPERATOR);
  await reg.waitForDeployment();
  const regAddr = await reg.getAddress();
  console.log("Registry deployed at:", regAddr);

  // 2) CAC (Allowance20) – registry cím a konstruktorba
  const Cac = await ethers.getContractFactory("Allowance20");
  const cac = await Cac.deploy(regAddr);
  await cac.waitForDeployment();
  const cacAddr = await cac.getAddress();
  console.log("CAC deployed at:", cacAddr);

  // 3) Marketplace
  const Mkt = await ethers.getContractFactory("CacMarketplace");
  const mkt = await Mkt.deploy(cacAddr, regAddr);
  await mkt.waitForDeployment();
  const mktAddr = await mkt.getAddress();
  console.log("Marketplace deployed at:", mktAddr);

  // — címek lementése a gyökérbe
  fs.writeFileSync(".addr.registry.local", regAddr);
  fs.writeFileSync(".addr.allowance.local", cacAddr);
  fs.writeFileSync(".addr.market.local", mktAddr);
  console.log("Saved addresses to .addr.*.local files");

  // — dapp .env.local helyes útvonala
  const dappEnv = path.join(__dirname, '..', 'carbon-dapp', '.env.local');
  const dappEnvBody =
`NEXT_PUBLIC_RPC_URL=http://127.0.0.1:8545
NEXT_PUBLIC_CHAIN_ID=31337
NEXT_PUBLIC_ALLOWANCE20_ADDRESS=${cacAddr}
NEXT_PUBLIC_REGISTRY_ADDRESS=${regAddr}
NEXT_PUBLIC_MARKET_ADDRESS=${mktAddr}
# opcionális, ha használsz Pinatát
# PINATA_GATEWAY=https://gateway.pinata.cloud/ipfs/
# NEXT_PUBLIC_PINATA_GATEWAY=https://gateway.pinata.cloud/ipfs/
`;
  fs.writeFileSync(dappEnv, dappEnvBody);
  console.log("Wrote dapp env:", dappEnv);

  // — quota-calculator .env.local (ha létezik ez a projektmappa)
  const qcEnv = path.join(__dirname, '..', 'quota-calculator', '.env.local');
  let warn = false;
  if (!process.env.DUMMY_SERVER_WALLET) {
    console.warn("⚠️  DUMMY_SERVER_WALLET nincs megadva .env-ben — a dummy oldal nem tud majd kvótát állítani.");
    warn = true;
  }
  const qcEnvBody =
`RPC_URL=http://127.0.0.1:8545
CAC_ADDRESS=${cacAddr}
FACTOR_PER_M2=0.05
DUMMY_SERVER_WALLET=${process.env.DUMMY_SERVER_WALLET || ''}
`;
  try {
    fs.writeFileSync(qcEnv, qcEnvBody);
    console.log("Wrote quota-calculator env:", qcEnv);
  } catch (e) {
    console.log("quota-calculator nem található – ezt a részt kihagytam.");
  }

  // (opcionális) Add jogosultságot a dummy szerver walletnek, ha szükséges
  // — CSAK akkor futtasd, ha a CAC szerződésedben van quota beállító függvény,
  //   amihez role kell (pl. DEFAULT_ADMIN_ROLE vagy SERVER_ROLE).
  if (process.env.DUMMY_SERVER_WALLET) {
    const serverPk = process.env.DUMMY_SERVER_WALLET;
    const server = new ethers.Wallet(serverPk, ethers.provider);
    console.log("Dummy server addr:", server.address);

    // példa: ha SERVER_ROLE létezik, így:
    // const SERVER_ROLE = ethers.keccak256(ethers.toUtf8Bytes('SERVER_ROLE'));
    // await cac.grantRole(SERVER_ROLE, server.address);

    // ha csak admin tud kvótát állítani és a deployer az admin, akkor pl.:
    // const ADMIN = await cac.DEFAULT_ADMIN_ROLE();
    // await cac.grantRole(ADMIN, server.address);
  }

  if (warn) {
    console.log("ℹ️  Adj meg DUMMY_SERVER_WALLET-et a gyökér .env-ben, majd futtasd újra a deploy-t.");
  }
}

main().catch((e) => { console.error(e); process.exit(1); });
