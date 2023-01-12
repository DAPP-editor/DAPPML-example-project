import { QueryClient, QueryClientProvider } from "react-query";
import config from "../../config/config";
import { ChainEnum } from "../../types/config";
import { IWalletProviderProps } from "../../types/props";
import CacheProvider from "./CacheProvider";
import ErrorProvider from "./ErrorProvider";
import TransactionsProvider from "./PendingTxProvider";
import SettingsProvider from "./SettingsProvider";
import WalletProviderEther from "./WalletProviderEther";
import { ReactQueryDevtools } from "react-query/devtools";

const queryClient = new QueryClient();

export function WalletProvider(props: React.PropsWithChildren<IWalletProviderProps>) {
  if (config.Chain === ChainEnum.Etherium) {
    return (
      <QueryClientProvider client={queryClient}>
        <SettingsProvider configuration={props.configuration}>
          <CacheProvider>
            <ErrorProvider>
              <WalletProviderEther>
                <TransactionsProvider>{props.children}</TransactionsProvider>
              </WalletProviderEther>
            </ErrorProvider>
          </CacheProvider>
        </SettingsProvider>
        <ReactQueryDevtools initialIsOpen={true} />
      </QueryClientProvider>
    );
  }
  throw new Error("Unsupported chain type");
}
