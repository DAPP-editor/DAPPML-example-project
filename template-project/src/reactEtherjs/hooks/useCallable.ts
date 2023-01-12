import { BigNumber, ethers } from "ethers";
import { FunctionFragment } from "ethers/lib/utils";
import { useCallback, useContext, useEffect } from "react";
import WalletContext from "../Components/Provieder/WalletContext";
import { useConfig } from "./useConfig";
import { useContract } from "./useContract";
import { useDecimals } from "./useDecimals";
import { useErrors } from "./useErrors";
import { useTransactions } from "./useTransactions";
import { useWallet } from "./useWallet";
import { formatError } from "../Components/Provieder/formatErrors";

export function useCallable(contract: string, func: string): (...args: Array<any>) => Promise<void> {
  const contractInstance = useContract(contract);
  const wallet = useWallet();
  const transactions = useTransactions();
  const errors = useErrors();
  const conf = useConfig();

  const getContractName = (name: string) => {
    if (name.startsWith("0x")) {
      return name;
    } else if (conf.contracts[conf.config.Network].Tokens[name]) {
      return conf.contracts[conf.config.Network].Tokens[name];
    } else if (conf.contracts[conf.config.Network].Custom[name]) {
      return conf.contracts[conf.config.Network].Custom[name];
    } else {
      console.warn("Unknown element type, maybe its ESN address?", name);
      return name;
    }
  };

  const onError = (e: any) => {
    console.log(e, "caught error");
    let fErr = formatError(e);
    console.log("fErr", fErr);
    if (fErr) {
      errors(
        new Error(fErr, {
          cause: e.message,
        }),
        "error"
      );
    } else {
      errors(
        new Error("Something went wrong", {
          cause: e.message,
        }),
        "error"
      );
    }
  };

  const functionFragment = contractInstance.interface.fragments.filter((f: any) => {
    return f.name === func;
  })[0] as FunctionFragment;
  console.debug("functionFragment", functionFragment);

  if (!functionFragment) {
    throw new Error("Function not found");
  }

  return useCallback<(...args: Array<any>) => Promise<void>>(
    (...args: Array<any>) => {
      functionFragment.inputs.map((input, index) => {
        if (input.type == "address") {
          args[index] = getContractName(args[index]);
        }
      });
      if (functionFragment.stateMutability != "view") {
        if (wallet.isConnected) {
          console.warn("all OK", wallet.provider);
        }
        console.log("calling", contractInstance.address, func, args);
        return contractInstance[func](...args)
          .then((tx: any) => {
            console.log("in then");
            transactions.addTransaction(tx);
            return tx.wait();
          })
          .catch(onError);
      } else {
        console.log("calling", contract, func, args);
        return contractInstance[func](...args)
          .then((value: any) => {
            console.log("in then", value);
            return value;
          })
          .catch(onError);
      }
    },
    [contract, func, wallet]
  );
}
