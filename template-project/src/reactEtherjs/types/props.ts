import React from "react";
import { Address } from "./basic";
import { IWalletContext } from "./context";
import { ISettings } from "./config";

export interface BasicProps {
  children?: React.ReactNode;
}

export interface IWalletProviderProps {
  configuration: ISettings;
}

export interface ISettingsProviderProps {
  configuration: ISettings;
}

export interface IConnectButtonProps extends BasicProps {
  connectClass?: any;
}

export interface IApproveButtonProps extends BasicProps {
  token: string;
  spender: string;
  needed?: number;
  buttonProps?: any;
}

export interface ITokenBalance extends BasicProps {
  decimals?: number;
  delimiter?: string;
  units?: boolean;
  token: string;
  variant?:
    | "h1"
    | "h2"
    | "h3"
    | "h4"
    | "h5"
    | "h6"
    | "subtitle1"
    | "subtitle2"
    | "body1"
    | "body2"
    | "caption"
    | "button"
    | "overline"
    | "inherit";
}

export interface IContractForm extends BasicProps {
  contract: string;
  function: string;
  args?: Array<any>;
  addressList?: { [name: string]: string };
  buttonName?: string;
}

export interface IReadContract extends BasicProps {
  contract: string;
  addressList?: { [name: string]: string };
}

export interface IMarketCapProps extends BasicProps {
  token: string;
}

export interface ITotalSupplyProps extends BasicProps {
  token: string;
}

export interface IConnectorProps extends BasicProps {
  setProvider: (context: IWalletContext | ((prev: IWalletContext) => IWalletContext)) => void;
  onClose: () => void;
  open: boolean;
}
