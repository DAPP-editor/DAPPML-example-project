import { ethers } from "ethers";
import config from "../../config/config";
import networks from "../../config/Networks";

export default async function MetamaskConnector(props: any) {
  if (window.ethereum) {
    const prov = new ethers.providers.Web3Provider(window.ethereum, "any");
    return prov
      .getNetwork()
      .then((network) => {
        if (network.chainId !== networks[config.Network].CHAIN_ID) {
          return window.ethereum.request({
            method: "wallet_switchEthereumChain",
            params: [
              {
                chainId: "0x" + networks[config.Network].CHAIN_ID.toString(16),
              },
            ], // chainId must be in hexadecimal numbers
          });
        }
      })
      .then(async (a) => {
        window.ethereum.on("accountsChanged", () => {
          MetamaskConnector(props);
        });
        try {
          props.setProvider({
            provider: prov.getSigner(),
            address: (
              await window.ethereum.request({
                method: "eth_requestAccounts",
              })
            )[0],
            isConnected: true,
          });
          localStorage.setItem("ConnectedWallet", "metamask");
        } catch (error) {
          console.log(error);
          props.setProvider({
            provider: prov,
            address: "",
            isConnected: false,
          });
          localStorage.setItem("ConnectedWallet", "");
        }

        props.onClose();
      })
      .catch((err) => console.log(err));
  } else {
    localStorage.setItem("ConnectedWallet", "");
    throw new Error("No metamask installed.");
  }
}
