import { Button, FormControl, Grid, Input, Paper, TextField, Tooltip, Typography } from "@mui/material";

import aveta from "aveta";
import { IReadContract } from "../../types/props";
import { useBalance } from "../../hooks/useBalance";
import { useSymbol } from "../../hooks/useSymbol";
import { useContract } from "../../hooks/useContract";
import { FunctionFragment } from "ethers/lib/utils";
import { FormEvent, FormEventHandler, useEffect, useState } from "react";
import { ContractForm } from "./ContractForm";

export function ReadContract(props: IReadContract) {
  const contract = useContract(props.contract);

  return (
    <Grid>
      {contract.interface.fragments
        .filter((e: any) => {
          return e.type == "function" && e.stateMutability == "view";
        })
        .map((f: any) => {
          return (
            <Grid>
              <Paper variant="outlined">
                <Typography>{f.name}</Typography>
                <ContractForm
                  contract={props.contract}
                  function={f.name}
                  args={[]}
                  addressList={props.addressList}
                ></ContractForm>
              </Paper>
            </Grid>
          );

          //return <ContractForm contract={props.contract} function={f.}></ContractForm>;
        })}
    </Grid>
  );
}
