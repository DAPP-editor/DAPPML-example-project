import { ApiRounded } from "@mui/icons-material";
import { Button, Skeleton } from "@mui/material";
import { BigNumber, ethers } from "ethers";
import { Fragment, useContext, useEffect, useMemo, useState } from "react";
import { useCallable } from "../../hooks/useCallable";
import { useDecimals } from "../../hooks/useDecimals";
import { useWallet } from "../../hooks/useWallet";
import { IApproveButtonProps } from "../../types/props";
import WalletContext from "../Provieder/WalletContext";
import { useConfig } from "../../hooks/useConfig";
import { useView } from "../../hooks/useView";

export function ApproveButton(props: IApproveButtonProps) {
  //const [approved, setApproved] = useState(0);
  const config = useConfig();
  const [displayText, setDisplayText] = useState("Approve");
  const [decimals, loadingDecimals] = useDecimals(props.token);
  const wallet = useWallet();

  const fromatSpender = (spender: string): string => {
    if (spender.startsWith("0x")) {
      return spender;
    } else if (config.contracts[config.config.Network].Tokens[spender]) {
      return config.contracts[config.config.Network].Tokens[spender];
    } else if (config.contracts[config.config.Network].Custom[spender]) {
      return config.contracts[config.config.Network].Custom[spender];
    } else {
      return spender;
    }
  };

  const onApprove = useCallable(props.token, "approve");
  const [approved, loadingApproved] = useView<BigNumber>(
    props.token,
    "allowance",
    [wallet.address, fromatSpender(props.spender)],
    [],
    "Approval",
    BigNumber.from(0)
  );

  const amount = useMemo(() => {
    const needed = props.needed ?? "1000000";
    console.log("amount", needed, decimals);
    if (!decimals) return BigNumber.from(0);
    return BigNumber.from(needed).mul(BigNumber.from(10).pow(decimals));
  }, [props.needed, decimals]);

  if (loadingApproved || loadingDecimals) {
    return <Skeleton variant="rounded"></Skeleton>;
  } else if (approved && amount.gt(approved)) {
    return (
      <button
        className="re-ether-connect-button"
        onClick={() => {
          onApprove(props.spender, amount.mul(10));
        }}
      >
        {displayText}
      </button>
    );
  }
  return <> {props.children} </>;
}
