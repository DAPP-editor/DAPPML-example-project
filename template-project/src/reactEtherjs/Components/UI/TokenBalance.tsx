import { Grid, Paper, Skeleton, Tooltip, Typography } from "@mui/material";

import aveta from "aveta";
import { ITokenBalance } from "../../types/props";
import { useBalance } from "../../hooks/useBalance";
import { useSymbol } from "../../hooks/useSymbol";

export function TokenBalance(props: ITokenBalance) {
  const decimals = props.decimals ? props.decimals : 2;
  const decimalDelimiter = props.delimiter ? props.delimiter : ".";

  const [balance, loadingBalance] = useBalance(props.token);
  const [symbol, loadingSymbol] = useSymbol(props.token);
  console.log("loading balance", loadingBalance, loadingSymbol);
  if (loadingBalance || loadingSymbol) {
    return (
      <>
        <Grid container direction="row" justifyContent="space-between">
          {loadingBalance && <Skeleton variant="text" width={100} />}
          {loadingSymbol && <Skeleton variant="text" width={100} />}
        </Grid>
      </>
    );
  }

  return (
    <Tooltip key={props.token + "_tooltip"} placement="top-start" title={balance + " " + symbol}>
      <Typography variant={props.variant ?? "body1"} noWrap>
        {props.units
          ? aveta(balance, {
              precision: props.units ? decimals : balance.toString().length,
              separator: decimalDelimiter,
            })
          : balance.toFixed(balance > 1000 ? 0 : decimals)}{" "}
        {symbol}
      </Typography>
    </Tooltip>
  );
}
