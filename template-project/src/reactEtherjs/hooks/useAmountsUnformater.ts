import { useCallback } from "react";
import { useDecimals } from "./useDecimals";
import { BigNumber } from "ethers";

export function useAmountUnformatter(token: string) {
  const [decimals, loading] = useDecimals(token);
  return useCallback(
    (amount: BigNumber): number => {
      if (loading) {
        return 0;
      }
      if (!decimals || loading) {
        return 0;
      }
      const roundedDecimals = Math.min(decimals, 4);
      if (!BigNumber.isBigNumber(amount)) {
        return 0;
      }

      return amount.div(BigNumber.from(10).pow(roundedDecimals)).toNumber() / 10 ** (decimals - roundedDecimals);
    },
    [decimals, loading]
  );
}
