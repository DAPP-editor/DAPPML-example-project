import { useView } from "./useView";

export function useSymbol(name: string): [string, boolean] {
  const [symbol, loading] = useView<string>(name, "symbol", [], [name], undefined, "");
  console.log("useSymbol: update", symbol);
  return [symbol ?? "", loading];
}
