import { BigNumber, ethers } from "ethers";
import { useContext } from "react";
import WalletContext from "../Components/Provieder/WalletContext";
import { useDecimals } from "./useDecimals";
import { useView } from "./useView";

export function useBalance(name: string): [number, boolean] {
  const wallet = useContext(WalletContext);
  const [decimals, loadingDecimals] = useDecimals(name);
  const [balance, loading] = useView<BigNumber>(name, "balanceOf", [wallet.address], [], undefined, null);
  if (loading || balance == null || decimals == null || loadingDecimals) {
    return [0, true];
  }

  return [parseFloat(ethers.utils.formatUnits(balance, decimals)), false];
}
