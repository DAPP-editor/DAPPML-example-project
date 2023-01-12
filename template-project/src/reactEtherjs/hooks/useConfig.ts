import { useContext, useMemo } from "react";
import { ISettings } from "../types/config";
import SettingsContext from "../Components/Provieder/SettingsContext";

export function useConfig(): ISettings {
  return useContext(SettingsContext);
}
