import { ethers } from "ethers";
import { createContext } from "react";
import { ITxPendingContext, IWalletContext } from "../../types/context";

export default createContext<ITxPendingContext>({
  transactions: [],
  addTransaction: (tx: ethers.Transaction) => {},
});
