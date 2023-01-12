import { Button, Dialog } from "@mui/material";
import React from "react";
import ErrorHistory from "./ErrorHistory";

export default function ErrorHistoryDialog() {
  const [open, setOpen] = React.useState(false);
  return (
    <>
      <Button
        onClick={() => {
          setOpen(true);
        }}
      >
        Notification history
      </Button>
      <Dialog
        open={open}
        onClose={() => {
          setOpen(false);
        }}
        maxWidth={"lg"}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          border: "2px solid #000",
          boxShadow: 24,
          p: 4,
        }}
      >
        <ErrorHistory></ErrorHistory>
      </Dialog>
    </>
  );
}
