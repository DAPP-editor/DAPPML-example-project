export interface IConectors {
  [key: string]: IConnector;
}

export interface IConnector {
  icon: string;
  name: string;
  callback: (props: any) => Promise<void>;
}
