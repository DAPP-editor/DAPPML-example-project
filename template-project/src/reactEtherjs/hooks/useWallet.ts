import { useContext, useMemo } from "react";
import { ISettings } from "../types/config";
import WalletContext from "../Components/Provieder/WalletContext";
import { IWalletContext } from "../types/context";

export function useWallet(): IWalletContext {
  return useContext(WalletContext);
}
