import { IAbiCollection } from "./abi";
import { Address } from "./basic";

export interface ISettings {
  config: IConf;
  contracts: IContractsAddresses;
  abis: IAbiCollection;
  networks: INetworks;
}

export enum ChainEnum {
  Etherium,
}

export interface IConf {
  AppName?: string;
  Chain: ChainEnum;
  Network: string;
  Wallets: Array<string>;
  cacheTime: number;
}

//====================================

export interface IContractsAddresses {
  [chain: string]: IChain;
}

export interface IChain {
  Tokens: ITokens;
  Custom: ICustom;
  Holdings?: IHoldings;
  Exchange?: IExchange;
}

export interface IExchange {
  Factory: Address;
  ToDollarMapping: ITokensMap;
  FixedPares: IFixedPare[];
}

export interface ITokensMap {
  [tokn1: string]: string;
}

export interface IFixedPare {
  CoinA: string;
  CoinB: string;
  Conversion_AtoB: number;
}

export interface ITokens {
  [name: string]: Address;
}

export interface IHoldings {
  Treasury: ITreasury;
}

export interface ITreasury {
  Address: Address;
  Holdings: string[];
}

export interface ICustom {
  [name: string]: Address;
}

//==========================

export interface INetworks {
  [chain: string]: IChainData;
}

export interface IChainData {
  CHAIN_ID: number;
  RPC_STATIC: string;
  NODE_KEY: string;
  EXPLORER_URL: string;
}
