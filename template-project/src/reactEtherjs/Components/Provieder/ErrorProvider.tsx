import React from "react";
import { SnackbarProvider } from "notistack";

export default function ErrorProvider(props: React.PropsWithChildren<any>) {
  return (
    <SnackbarProvider maxSnack={3}>
      <>{props.children}</>
    </SnackbarProvider>
  );
}
