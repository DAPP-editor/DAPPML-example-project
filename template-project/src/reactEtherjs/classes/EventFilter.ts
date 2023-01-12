import { ethers } from "ethers";

export class EventFilter {
  public event: string;
  public args: Array<any | undefined>;
  constructor(event: string, args: Array<any | undefined>) {
    this.event = event;
    this.args = args;
  }

  public getFilter(contract: ethers.Contract) {
    const newArgs = this.args.map((e) => (e === undefined ? null : e));
    return contract.filters[this.event](...newArgs);
  }
}
