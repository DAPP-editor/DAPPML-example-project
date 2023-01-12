export interface IAbiCollection {
  [name: string]: IABI;
}

export type IABI = IABIelement[];

export interface IABIelement {
  inputs: Put[];
  stateMutability?: StateMutability;
  type: IABIType;
  anonymous?: boolean;
  name?: string;
  outputs?: Put[];
}

export interface Put {
  internalType: InternalTypeEnum;
  name: string;
  type: InternalTypeEnum;
  indexed?: boolean;
}

export enum InternalTypeEnum {
  Address = "address",
  Bool = "bool",
  Bytes = "bytes",
  Bytes4 = "bytes4",
  String = "string",
  TypeAddress = "address[]",
  TypeUint256 = "uint256",
  Uint256 = "uint256[]",
}

export enum StateMutability {
  Nonpayable = "nonpayable",
  Payable = "payable",
  View = "view",
}

export enum IABIType {
  Constructor = "constructor",
  Event = "event",
  Function = "function",
}
