import React from "react";
import { SnackbarProvider } from "notistack";
import { errorHistory } from "../../hooks";
import { ErrorInfo } from "../../hooks";
import { Box } from "@mui/material";

export default function ErrorHistory() {
  return (
    <>
      {errorHistory.map((error: ErrorInfo, i) => {
        return (
          <Box
            key={error.key}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
              bgcolor: "background.paper",
              border: "2px solid #000",
              boxShadow: 24,
              p: 4,
            }}
          >
            {error.error.message}
          </Box>
        );
      })}
    </>
  );
}
