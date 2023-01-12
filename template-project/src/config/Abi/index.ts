import { IABI, IAbiCollection } from "re-ether";
import ERC20 from "./ERC20.json";
import ERC721 from "./ERC721.json";
import StakingContract from "./StakingContract.json";

const abis: IAbiCollection = {
  ERC20: ERC20 as IABI,
  ERC721: ERC721 as IABI,
  StakingContract: StakingContract.abi as IABI,
};

export default abis;
