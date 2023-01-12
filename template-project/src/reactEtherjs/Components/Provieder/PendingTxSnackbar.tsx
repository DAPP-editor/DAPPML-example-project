import React from "react";
import { Box, Button, Snackbar, Typography } from "@mui/material";
import { useTransactions } from "../../hooks/useTransactions";
import { ethers } from "ethers";
import { useConfig } from "../../hooks/useConfig";
import "./TxSnackbar.css";

function formatTxHash(address: string | undefined) {
  if (address === undefined) return "";
  return address.substring(0, 6) + "..." + address.substring(address.length - 4, address.length);
}

export default function PendingTxSnackbar(props: React.PropsWithChildren<any>) {
  const transactions = useTransactions();
  const config = useConfig();

  return (
    <React.Fragment>
      {transactions.transactions.length > 0 && (
        <Box className="txSnackbarContainer">
          <Box className="txSnackbarTitle">
            <Typography color="primary">{transactions.transactions.length} PENDING TRANSACTIONS</Typography>
          </Box>
          {transactions.transactions.map((txInf: ethers.Transaction, i: number) => {
            var URL = config.networks[config.config.Network].EXPLORER_URL;
            URL = URL.endsWith("/") ? URL.substring(0, URL.length - 1) : URL;
            URL = URL + "/tx/" + txInf.hash;
            return (
              <Box
                key={txInf.hash}
                className="txSnackbarElement"
                onClick={() => {
                  window.open(URL, "_blank");
                }}
              >
                <Typography color="primary">{formatTxHash(txInf.hash)}</Typography>
              </Box>
            );
          })}
        </Box>
      )}
    </React.Fragment>
  );
}
