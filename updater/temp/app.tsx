
import React from "react";
import { useCallable, useSymbol, useView, useWallet } from "re-ether";
import { BigNumber } from "ethers";

export interface IndexProps {
    }
    export function Index({}: IndexProps) {
    
    const wallet = useWallet();

      return (<div>
            <p>
                   Lahko jee to je test pis
                </p>
          </div>);
    }

