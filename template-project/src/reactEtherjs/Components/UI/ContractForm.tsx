import {
  Button,
  FormControl,
  Input,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Paper,
  Select,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";

import aveta from "aveta";
import { IContractForm } from "../../types/props";
import { useBalance } from "../../hooks/useBalance";
import { useSymbol } from "../../hooks/useSymbol";
import { useContract } from "../../hooks/useContract";
import { FunctionFragment } from "ethers/lib/utils";
import { FormEvent, FormEventHandler, useContext, useEffect, useState } from "react";
import WalletContext from "../Provieder/WalletContext";
import { useCallable } from "../../hooks/useCallable";
import { useView } from "../../hooks/useView_old";

export function ContractForm(props: IContractForm) {
  const contract = useContract(props.contract);
  const wallet = useContext(WalletContext);
  const functionInstance = useCallable(props.contract, props.function);
  const [argsArr, setArgaArr] = useState<Array<any>>(props.args ? props.args : []);
  const [func, setFunc] = useState<any>(null);
  const [isFragment, setIsFragment] = useState<boolean>(true);
  const [returnVal, setReturnVal] = useState<any>(null);
  console.log(contract.interface.functions);

  useEffect(() => {
    console.log(contract.interface);
    var funcT = contract.interface.fragments.filter((f: any) => {
      return f.name == props.function;
    })[0];
    if (!funcT) {
      Object.keys(contract.interface.functions).map((key) => {
        if (key.split("(")[0] == props.function) {
          funcT = contract.interface.functions[key];
        }
      });
      setIsFragment(false);
    }
    setFunc(funcT);
  }, [contract, props.function]);

  useEffect(() => {
    if (func && func.inputs.length == 0) {
      submiter();
    }
  }, [func]);

  if (!func) {
    return <div>No function</div>;
  }

  const cleanLabel = (label: string): string => {
    let str1 = label.trim().replace("_", "");
    return str1.charAt(0).toUpperCase() + str1.slice(1);
  };

  const getInput = (arg: any, index: number) => {
    const setValueToEl = (arg: any, index: number, value: any) => {
      document
        .getElementById(props.contract + "-" + props.function + "-" + arg.name + "-" + index)
        ?.setAttribute("value", wallet.address);
      setArgaArr((arr: any) => {
        //@ts-ignore
        arr[index] = wallet.address;
        console.log(arr);
        return arr;
      });
    };
    switch (arg.type) {
      case "address":
        if (props.addressList) {
          return (
            <Select label={cleanLabel(arg.name)}>
              {Object.keys(props.addressList).map((adr: string) => {
                //@ts-ignore
                return <MenuItem value={props.addressList[adr]}>{adr}</MenuItem>;
              })}
            </Select>
          );
        }
        return (
          <OutlinedInput
            id={props.contract + "-" + props.function + "-" + arg.name + "-" + index}
            placeholder={cleanLabel(arg.name)}
            value={argsArr[index]}
            endAdornment={
              <InputAdornment position="end">
                <Button
                  variant="contained"
                  size="small"
                  sx={{
                    borderRadius: "20px",
                  }}
                  onClick={(e) => {
                    setValueToEl(arg, index, wallet.address);
                  }}
                >
                  Me
                </Button>
              </InputAdornment>
            }
          ></OutlinedInput>
        );
        break;
      case "uint156":
        return (
          <TextField
            id={props.contract + "-" + props.function + "-" + arg.name + "-" + index}
            label={cleanLabel(arg.name)}
            variant="outlined"
          ></TextField>
        );
      default:
        break;
    }
    return (
      <TextField
        id={props.contract + "-" + props.function + "-" + arg.name + "-" + index}
        label={cleanLabel(arg.name)}
        variant="outlined"
      ></TextField>
    );
  };

  const submiter = (a: FormEvent | undefined = undefined) => {
    if (a) a.preventDefault();
    console.log("Call function ", props.function, "with args: ", argsArr);
    functionInstance(...argsArr).then((res: any) => {
      setReturnVal(res);
    });
  };

  const onChangeHandler = (e: any) => {
    console.log(e.target.value);
    var [tContract, tFunc, tArg, tIndex] = e.target.id.split("-");
    if (tFunc == props.function) {
      setArgaArr((arr: any) => {
        //@ts-ignore
        arr[tIndex] = e.target.value;
        console.log(arr);
        return arr;
      });
    }
  };

  const valToString = (val: any): string => {
    if (val.toString) {
      return val.toString();
    }
    return JSON.stringify(val);
  };

  return (
    <form onSubmit={submiter} onChange={onChangeHandler}>
      {func.inputs
        .map((value: any, index: number) => {
          if (!props.args || !props.args[index]) {
            return (
              <>
                <InputLabel>{cleanLabel(value.name)}</InputLabel>
                {getInput(value, index)}
              </>
            );
          }
          return <></>;
        })
        .filter((el: any) => !!el)}
      <Button type="submit">{props.buttonName ?? "Submit"}</Button>
      {isFragment && returnVal && <div>{valToString(returnVal)}</div>}
    </form>
  );
}
