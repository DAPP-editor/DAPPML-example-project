import { useMemo, useContext } from "react";
import { ethers } from "ethers";
import { useConfig } from "./useConfig";
import { useErrors } from "./useErrors";
import { useWallet } from "./useWallet";

export function useContract(name: string) {
  const wallet = useWallet();
  const config = useConfig();

  const getContract = () => {
    if (!wallet.provider) {
      throw new Error("No provider");
    }
    var addres = null;
    var abi = null;
    if (config.contracts[config.config.Network].Tokens[name]) {
      addres = config.contracts[config.config.Network].Tokens[name];
      abi = config.abis.ERC20;
    } else if (config.contracts[config.config.Network].Custom[name]) {
      abi = config.abis[name];
      addres = config.contracts[config.config.Network].Custom[name];
    }
    if (addres && abi) {
      return new ethers.Contract(addres, abi, wallet.provider);
    }
    throw new Error("No know address or abi for contract with name: " + name);
  };

  const contract = useMemo(() => {
    console.log("REcalculating memo for contract " + name);

    return getContract();
  }, [name, wallet]);
  console.debug("useContract is returning ", contract);
  return contract;
}
