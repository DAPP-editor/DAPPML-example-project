import { createContext } from "react";
import { ISettings } from "../../types/config";
import config from "../../config/config";
import addresses from "../../config/ContractAdresses";
import ABIs from "../../config/Abi";
import networks from "../../config/Networks";

export default createContext<ISettings>({
  config,
  contracts: addresses,
  abis: ABIs,
  networks,
});
