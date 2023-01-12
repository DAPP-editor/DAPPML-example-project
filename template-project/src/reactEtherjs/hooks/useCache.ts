import { useContext } from "react";
import CacheContext, { ICacheContext } from "../Components/Provieder/CacheContext";

export function useCache(): ICacheContext {
  return useContext(CacheContext);
}
