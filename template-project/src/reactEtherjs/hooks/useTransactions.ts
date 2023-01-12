import { BigNumber, ethers } from "ethers";
import { useContext } from "react";
import PendingTransactionContext from "../Components/Provieder/PendingTransactionContext";

export function useTransactions() {
  return useContext(PendingTransactionContext);
}
