import { IContractsAddresses } from "re-ether";

const addresses: IContractsAddresses = {
  Local: {
    Tokens: { BUSD: "0x5FC8d32690cc91D4c39d9d3abcBD16989F875707" },
    Custom: { StakingContract: "0x0165878A594ca255338adfa4d48449f69242Eb8F" },
  },
  Mumbai: {
    Tokens: { BUSD: "0x60e2A35A4ACf6A9b4382ae5F6a81176dcB655a80" },
    Custom: { StakingContract: "0xCc458220b8f109c7dFEF6acB0e5E083586b5B1c5" },
  },
};

export default addresses;
