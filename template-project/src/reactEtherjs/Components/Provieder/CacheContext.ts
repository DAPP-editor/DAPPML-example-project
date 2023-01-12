import { createContext } from "react";

export interface ICacheContext {
  cache: Map<string, ICacheItem>;
  addCacheItem: (key: string, value: any, loading: boolean) => void;
  getCacheItem: (key: string) => ICacheItem | undefined;
  removeCacheItem: (key: string) => void;
}

export interface ICacheItem {
  value: any;
  timestamp: number;
  loading: boolean;
}

export default createContext<ICacheContext>({
  cache: new Map<string, ICacheItem>(),
  addCacheItem: (key: string, v: any, l: boolean) => {},
  getCacheItem: (key: string) => undefined,
  removeCacheItem: (key: string) => {},
});
