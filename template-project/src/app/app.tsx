import React from "react";
import { useCallable, useSymbol, useView, useWallet } from "re-ether";
import { BigNumber } from "ethers";

export interface IndexProps {}
export function Index({}: IndexProps) {
  const wallet = useWallet();
  //let balance = useView("myContract", "balanceOf", [wallet.address], []);

  return (
    <div>
      <p>Some children of my attribute</p>
    </div>
  );
}
