import { Button, Grid, Menu, Typography } from "@mui/material";
import WalletContext from "../Provieder/WalletContext";
import { useContext, useState } from "react";

import { IConnectButtonProps } from "../../types/props";

import "./connector.css";

export function ConnectButton(props: IConnectButtonProps) {
  const wallet = useContext(WalletContext);
  const [anchorEl, setAnchorEl] = useState<any>(null);
  console.log("connect button update");
  console.log(wallet);

  if (!wallet.isConnected) {
    return (
      <button
        className={"re-ether-connect-button"}
        onClick={() => {
          document?.getElementById("wallet_connect_phantom_button")?.click();
        }}
      >
        Connect wallet
      </button>
    );
  }

  if (props.children) {
    return <>{props.children}</>;
  }
  return (
    <>
      <div
        style={{
          cursor: "pointer",
        }}
        onClick={(event: React.MouseEvent<HTMLElement>) => {
          setAnchorEl(event.currentTarget);
        }}
      >
        {props.children ? props.children : "Connected"}
      </div>
      <Menu
        open={Boolean(anchorEl)}
        onClose={() => {
          setAnchorEl(null);
        }}
        id="account-menu"
        anchorEl={anchorEl}
        style={{
          padding: "10px",
        }}
      >
        <Grid
          container
          sx={{
            padding: "30px",
          }}
          spacing={3}
          direction="column"
          alignItems="center"
          justifyContent="center"
        >
          <Grid item>
            <Typography>Connected to:</Typography>
          </Grid>
          <Grid item>
            <Typography>{wallet.address}</Typography>
          </Grid>
          <Grid item>
            <Button
              variant="outlined"
              onClick={() => {
                setAnchorEl(null);
                document.getElementById("wallet_disconnect_phantom_button")?.click();
              }}
            >
              Disconnect
            </Button>
          </Grid>
        </Grid>
      </Menu>
    </>
  );
}
