import { useSnackbar } from "notistack";
import { useWallet } from "./useWallet";
import { IconButton } from "@mui/material";
import react from "react";

export interface ErrorInfo {
  error: Error;
  severity?: "error" | "warning" | "info" | "success";
  key: string;
}

export var  errorHistory:Array<ErrorInfo> = []

export function useErrors() {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const wallet = useWallet();

 return  (
    error: Error,
    severity?: "error" | "warning" | "info" | "success"
  ) => {
    const key = wallet.address + "_" + Date.now();
    errorHistory.push({
      error: error,
      severity: severity??"info",
      key: key,
    })
    enqueueSnackbar(error.message, {
      variant: severity,
      key: key,
      })
    };
}
