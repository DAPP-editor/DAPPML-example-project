import { BigNumber } from "ethers";
import { useCache } from "./useCache";
import { useConfig } from "./useConfig";
import { useContract } from "./useContract";
import { useWallet } from "./useWallet";
import { useEffect, useMemo, useState } from "react";
import { EventFilter } from "../classes/EventFilter";

export function useView(
  contract: string,
  func: string,
  args: Array<any>,
  deps: Array<any>,
  event?: string | EventFilter,
  initalValue?: any
): [any, boolean] {
  return [initalValue ?? 0, true];
  // const wallet = useWallet();
  // const contractInstance = useContract(contract);
  // const [value, setValue] = useState<any>(initalValue ?? 0);
  // const [loading, setLoading] = useState<boolean>(false);
  // const cache = useCache();
  // const configuration = useConfig();

  // function paranmsToKey(contract: string, func: string, args: Array<any>, deps: Array<any>) {
  //   return (
  //     configuration.networks[configuration.config.Network].CHAIN_ID +
  //     "_" +
  //     contract +
  //     "." +
  //     func +
  //     "(" +
  //     args.map((e) => (BigNumber.isBigNumber(e) ? e.toString() : e)).join(",") +
  //     ")"
  //   );
  // }

  // const cacheKey = useMemo(() => {
  //   return paranmsToKey(contract, func, args, deps);
  // }, [contract, func, args, configuration]);

  // console.log("Cache: useViev caled for ", contract, func, args, deps, event, initalValue);

  // const getValue = async () => {
  //   setLoading(true);
  //   cache.addCacheItem(cacheKey, undefined, true);
  //   return contractInstance[func](...args)
  //     .then((e: any) => {
  //       console.warn("Cache: before adding cache item for ", contract, func, args, deps, event, initalValue, cacheKey);
  //       cache.addCacheItem(cacheKey, e, false);
  //       setValue(e);
  //     })
  //     .catch((e: any) => {
  //       console.error("Cache: error in getValue for ", contract, func, args, e);
  //     })
  //     .finally(() => {
  //       setLoading(false);
  //     });
  // };

  // const validateArgs = () => {
  //   const inputs = contractInstance.interface.fragments.filter((e: any) => {
  //     return e.type == "function" && e.stateMutability == "view", e.name == func;
  //   })[0].inputs;
  //   console.log("validating", func);
  //   if (args.length != inputs.length) {
  //     console.warn("validating invalid number of args", args.length, inputs.length);
  //     return false;
  //   }
  //   console.log("validating correct number of args");
  //   const correctType =
  //     inputs
  //       .map((e: any, index: number) => {
  //         if (
  //           e.type === "address" &&
  //           (typeof args[index] != "string" || args[index].length !== 42 || args[index].substring(0, 2) !== "0x")
  //         ) {
  //           return false;
  //         }
  //         if (e.type === "uint256" && !(BigNumber.isBigNumber(args[index]) || typeof args[index] == "number")) {
  //           return false;
  //         }
  //         return true;
  //       })
  //       .filter((e: any) => !e).length === 0;

  //   if (!correctType) {
  //     console.warn("validating invalid args");
  //     return false;
  //   }
  //   console.log("validating correct types");
  //   return true;
  // };

  // useEffect(() => {
  //   if (
  //     contractInstance.interface.fragments.filter((e: any) => {
  //       return e.type === "function" && e.stateMutability === "view" && e.name === func;
  //     }).length !== 1
  //   ) {
  //     throw new Error("Not a view function (" + contract + ", " + func + ")");
  //   }
  // }, [contractInstance, func, contract]);

  // useEffect(() => {
  //   const cEl = cache.getCacheItem(cacheKey);
  //   if (cEl && !cEl.loading) {
  //     console.log("Cache: useView is getting value from cache for ", contract, func, args);
  //     setValue(cEl.value);
  //     setLoading(false);
  //     return;
  //   } else if (cEl?.loading) {
  //     console.log("Cache: useView is subscribing for ", contract, func, args);
  //     setLoading(true);
  //     return;
  //   } else if (validateArgs()) {
  //     console.log("Cache: useView is calling getValue for ", contract, func, args, cacheKey);
  //     getValue();
  //   }
  // }, [wallet, contract, ...deps, contractInstance, func, ...args]);

  // useEffect(() => {
  //   const cEl = cache.getCacheItem(cacheKey);
  //   console.log("Cache: updated");
  //   if (cEl && !cEl.loading) {
  //     console.log("Cache: useView is getting subscribed value from cache for ", contract, func, args, cEl);
  //     setValue(cEl.value);
  //     setLoading(false);
  //     return;
  //   }
  // }, [cache]);

  // useEffect(() => {
  //   //is event string
  //   if (typeof event === "string") {
  //     contractInstance.removeAllListeners(event);
  //     if (event) {
  //       contractInstance.on(event, getValue);
  //     }
  //   } else if (event) {
  //     contractInstance.removeAllListeners(event.getFilter(contractInstance));
  //     if (event) {
  //       contractInstance.on(event.getFilter(contractInstance), getValue);
  //     }
  //   }
  // }, [contractInstance, event]);

  // console.log("Cashe:useView " + func + " is returning ", value, loading);
  // return [value, loading];
}
