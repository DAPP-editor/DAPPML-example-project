import React, { useState } from "react";
import { ethers } from "ethers";
import PendingTransactionContext from "./PendingTransactionContext";
import PendingTxSnackbar from "./PendingTxSnackbar";
import { useWallet } from "../../hooks/useWallet";

export default function TransactionsProvider(props: React.PropsWithChildren<any>) {
  const [transactions, setTransactions] = useState<Array<ethers.Transaction>>([]);

  const addTransaction = (tx: ethers.Transaction | any) => {
    setTransactions((txs) => [...txs, tx]);
    if (tx.wait) {
      tx.wait().then(() => {
        setTransactions((txs) => txs.filter((t) => t.hash !== tx.hash));
      });
    } else {
      setTimeout(() => {
        setTransactions((txs) => txs.filter((t) => t.hash !== tx.hash));
      }, 5000);
    }
  };
  return (
    <React.Fragment>
      <PendingTransactionContext.Provider value={{ transactions, addTransaction }} {...props}>
        {props.children}
        <PendingTxSnackbar></PendingTxSnackbar>
      </PendingTransactionContext.Provider>
    </React.Fragment>
  );
}
