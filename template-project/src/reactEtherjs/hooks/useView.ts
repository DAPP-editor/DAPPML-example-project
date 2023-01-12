import { BigNumber } from "ethers";
import { useCache } from "./useCache";
import { useConfig } from "./useConfig";
import { useContract } from "./useContract";
import { useWallet } from "./useWallet";
import { useEffect, useMemo, useState } from "react";
import { EventFilter } from "../classes/EventFilter";
import { useQuery, useQueryClient } from "react-query";

export function useView<Type>(
  contract: string,
  func: string,
  args: Array<any>,
  deps: Array<any>,
  event?: string | EventFilter,
  initalValue?: any
): [Type | undefined, boolean] {
  const queryClient = useQueryClient();
  const contractInstance = useContract(contract);
  const configuration = useConfig();

  function paranmsToKey(contract: string, func: string, args: Array<any>) {
    return (
      configuration.networks[configuration.config.Network].CHAIN_ID +
      "_" +
      contract +
      "." +
      func +
      "(" +
      args.map((e) => (BigNumber.isBigNumber(e) ? e.toString() : e)).join(",") +
      ")"
    );
  }

  const cacheKey = useMemo(() => {
    return paranmsToKey(contract, func, args);
  }, [contract, func, args, configuration]);

  const { isLoading, error, data, status } = useQuery(
    cacheKey,
    () => {
      if (validateArgs()) {
        return contractInstance[func](...args);
      }
      throw new Error("Invalid args");
    },
    {
      enabled: !!contractInstance || !!cacheKey,
    }
  );

  const validateArgs = () => {
    const inputs = contractInstance.interface.fragments.filter((e: any) => {
      return e.type == "function" && e.stateMutability == "view", e.name == func;
    })[0].inputs;
    console.log("validating", func);
    if (args.length != inputs.length) {
      console.warn("validating invalid number of args", args.length, inputs.length);
      return false;
    }
    console.log("validating correct number of args");
    const correctType =
      inputs
        .map((e: any, index: number) => {
          if (
            e.type === "address" &&
            (typeof args[index] != "string" || args[index].length !== 42 || args[index].substring(0, 2) !== "0x")
          ) {
            return false;
          }
          if (e.type === "uint256" && !(BigNumber.isBigNumber(args[index]) || typeof args[index] == "number")) {
            return false;
          }
          return true;
        })
        .filter((e: any) => !e).length === 0;

    if (!correctType) {
      console.warn("validating invalid args");
      return false;
    }
    console.log("validating correct types");
    return true;
  };

  useEffect(() => {
    //queryClient.invalidateQueries(cacheKey);
  }, [contract, func, args, configuration, deps]);

  useEffect(() => {
    //is event string
    const invalidate = () => {
      queryClient.invalidateQueries(cacheKey);
    };
    if (typeof event === "string") {
      contractInstance.removeAllListeners(event);
      if (event) {
        contractInstance.on(event, invalidate);
      }
    } else if (event) {
      contractInstance.removeAllListeners(event.getFilter(contractInstance));
      if (event) {
        contractInstance.on(event.getFilter(contractInstance), invalidate);
      }
    }
  }, [contractInstance, event, cacheKey]);

  useEffect(() => {
    if (error) {
      console.error(error);
    }
  }, [error]);

  console.log("useView", contract, ".", func, "(" + args + ")=", data, isLoading, status);
  if (isLoading && initalValue) {
    return [initalValue, isLoading];
  }
  return [data, isLoading];
}
