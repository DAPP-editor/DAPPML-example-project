import React, { useEffect, useState } from "react";

import config from "../../config/config";
import networks from "../../config/Networks";

import SettingContext from "./SettingsContext";
import { ISettingsProviderProps } from "../../types/props";
import abis from "../../config/Abi";
import { ISettings } from "../../types/config";

export default function SettingsProvider(props: React.PropsWithChildren<ISettingsProviderProps>) {
  const mergedConfig: ISettings = {
    networks: { ...networks, ...props.configuration.networks },
    abis: { ...abis, ...props.configuration.abis },
    config: { ...config, ...props.configuration.config },
    contracts: props.configuration.contracts,
  };
  console.log("mergedConfig", mergedConfig);
  return (
    <React.Fragment>
      <SettingContext.Provider value={mergedConfig}>{props.children}</SettingContext.Provider>
    </React.Fragment>
  );
}
