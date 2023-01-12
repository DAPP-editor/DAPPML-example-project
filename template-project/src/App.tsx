import "./App.css";
import { WalletProvider } from "re-ether";
import { configuration } from "./config";
import { Index } from "./app/app";

function App() {
  return (
    <WalletProvider configuration={configuration}>
      <Index />
    </WalletProvider>
  );
}

export default App;
