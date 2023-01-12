import { INetworks } from "../index";

const networks: INetworks = {
  Avalanche: {
    CHAIN_ID: 43114,
    RPC_STATIC: "https://api.avax.network/ext/bc/C/rpc",
    NODE_KEY: "",
    EXPLORER_URL: "",
  },
  Polygon: {
    CHAIN_ID: 137,
    RPC_STATIC: "https://polygon-rpc.com",
    NODE_KEY: "def02d27706042989d1feb553d8ee23f",
    EXPLORER_URL: "",
  },
  Fuji: {
    CHAIN_ID: 43113,
    RPC_STATIC: "https://api.avax-test.network/ext/bc/C/rpc",
    NODE_KEY: "",
    EXPLORER_URL: "",
  },
  Mainnet: {
    CHAIN_ID: 1,
    RPC_STATIC: "https://main-light.eth.linkpool.io",
    NODE_KEY: "",
    EXPLORER_URL: "",
  },
  Rinkeby: {
    CHAIN_ID: 4,
    RPC_STATIC: "https://rinkeby-light.eth.linkpool.io",
    NODE_KEY: "",
    EXPLORER_URL: "",
  },
  Mumbai: {
    CHAIN_ID: 80001,
    RPC_STATIC: "https://matic-mumbai.chainstacklabs.com",
    NODE_KEY: "",
    EXPLORER_URL: "https://mumbai.polygonscan.com/",
  },
  Local: {
    CHAIN_ID: 1337,
    RPC_STATIC: "http://localhost:8545",
    NODE_KEY: "",
    EXPLORER_URL: "",
  },
};

export default networks;
