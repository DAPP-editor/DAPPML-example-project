import { ChainEnum, IConf } from "../types/config";

const conf: IConf = {
  Chain: ChainEnum.Etherium,
  Network: "Mumbai",
  Wallets: ["*"],
  cacheTime: 1000 * 60 * 1,
};

export default conf;
