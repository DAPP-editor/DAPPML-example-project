import React, { useState } from "react";
import { ethers } from "ethers";
import PendingTransactionContext from "./PendingTransactionContext";
import PendingTxSnackbar from "./PendingTxSnackbar";
import CacheContext, { ICacheItem } from "./CacheContext";
import { useConfig } from "../../hooks/useConfig";

export default function CacheProvider(props: React.PropsWithChildren<any>) {
  const [cache, setCache] = useState<Map<string, ICacheItem>>(new Map());
  const config = useConfig();
  const addCache = (key: string, value: any, loading: boolean) => {
    setCache((cache) => {
      cache.set(key, {
        value: value,
        timestamp: new Date().getTime(),
        loading: loading,
      });
      console.log("Cache: adding: ", cache.size);
      return cache;
    });
    console.log("Cache: adding:2 ", cache.size);
  };

  const removeCache = (key: string) => {
    setCache((cache) => {
      cache.delete(key);
      return cache;
    });
  };

  const getCache = (key: string) => {
    const el = cache.get(key);
    if (el) {
      if (el.timestamp + config.config.cacheTime < new Date().getTime()) {
        removeCache(key);
        return undefined;
      }
      return el;
    }
  };

  console.log("Cache: current ", cache);
  return (
    <React.Fragment>
      <CacheContext.Provider
        value={{ cache, addCacheItem: addCache, getCacheItem: getCache, removeCacheItem: removeCache }}
      >
        {props.children}
        <PendingTxSnackbar></PendingTxSnackbar>
      </CacheContext.Provider>
    </React.Fragment>
  );
}
