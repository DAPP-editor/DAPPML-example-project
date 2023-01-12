import { ethers } from "ethers";
import WalletConnect from "walletconnect";
import config from "../../config/config";
import networks from "../../config/Networks";
import { IWalletContext } from "../../types/context";

export default async function WalletConnectConnector(props: any) {
  try {
    console.log("WalletConnect", WalletConnect);
    var rpc = {
      [networks[config.Network].CHAIN_ID]: networks[config.Network].RPC_STATIC,
    };
    console.log(rpc);
    const wc = new WalletConnect({
      //@ts-ignore
      host: networks[config.Network].RPC_STATIC,
    });
    await wc.connect({ chainId: networks[config.Network].CHAIN_ID });

    const a = wc.connector;

    console.log("connector", a?.chainId);

    const prov = wc.getWeb3Provider({
      rpc: {
        [networks[config.Network].CHAIN_ID]: networks[config.Network].RPC_STATIC,
      },
    });
    console.log(await prov.enable());

    // Subscribe to accounts change
    prov.on("accountsChanged", (accounts: Array<string>) => {
      console.log(accounts);
      props.setProvider((prev: IWalletContext) => {
        return {
          provider: prev.provider,
          address: accounts[0],
          isConnected: true,
        };
      });
    });

    // Subscribe to chainId change
    prov.on("chainChanged", (chainId: string) => {
      console.log(chainId);
      //Add errors snackbar
      localStorage.setItem("ConnectedWallet", "");
      props.setProvider({
        provider: null,
        address: "0x0000000000000000000000000000000000000000",
        isConnected: false,
      });
    });

    // Subscribe to session disconnection
    prov.on("disconnect", (code: number, reason: any) => {
      console.log(code, reason);
      localStorage.setItem("ConnectedWallet", "");
      props.setProvider({
        provider: null,
        address: "0x0000000000000000000000000000000000000000",
        isConnected: false,
      });
    });

    const provWeb3 = new ethers.providers.Web3Provider(prov, "any");
    console.log(prov);
    console.log(provWeb3);
    props.setProvider({
      provider: provWeb3,
      address: a ? a.accounts[0] : "",
      isConnected: true,
    });
    localStorage.setItem("ConnectedWallet", "walletConnect");
  } catch (error) {
    localStorage.setItem("ConnectedWallet", "");
    console.log(error);
    props.setProvider({
      provider: null,
      address: "0x0000000000000000000000000000000000000000",
      isConnected: false,
    });
  }
  props.onClose();
}
