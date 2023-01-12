import { useCallback } from "react";
import { useDecimals } from "./useDecimals";
import { BigNumber } from "ethers";

export function useAmountFormatter(token: string) {
  const [decimals, loading] = useDecimals(token);
  return useCallback(
    (amount: number) => {
      if (loading) {
        return BigNumber.from(0);
      }
      return BigNumber.from(amount).mul(BigNumber.from(10).pow(decimals));
    },
    [decimals, loading]
  );
}
