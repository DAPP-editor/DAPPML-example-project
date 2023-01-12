import { createContext } from "react";
import { IWalletContext } from "../../types/context";

export default createContext<IWalletContext>({
  provider: null,
  address: "",
  isConnected: false,
});
