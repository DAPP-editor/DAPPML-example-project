import { BigNumber } from "ethers";
import { useView } from "./useView";

export function useDecimals(name: string): [number, boolean] {
  const [decimals, loading] = useView<number>(name, "decimals", [], [], undefined, BigNumber.from(0));
  console.log("useDecimals: update", decimals);
  if (loading || !decimals) {
    return [0, loading];
  }

  return [decimals, loading];
}
