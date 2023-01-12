import { ethers } from "ethers";
import { Address } from "./basic";

export interface IWeb3Provider extends ethers.providers.Web3Provider {
  disconnects?: () => void;
}

export interface IWalletContext {
  provider: null | ethers.providers.JsonRpcProvider | ethers.providers.JsonRpcSigner | IWeb3Provider;
  address: Address;
  isConnected: boolean;
}

export interface ITxPendingContext {
  transactions: Array<ethers.Transaction>;
  addTransaction: (tx: ethers.Transaction) => void;
}
