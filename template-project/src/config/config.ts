import { ChainEnum, IConf } from "re-ether";

const conf: IConf = {
  Chain: ChainEnum.Etherium,
  Network: "Mumbai",
  Wallets: ["*"],
  cacheTime: 1000 * 60 * 1,
};

export default conf;
