import { Portal } from "@mui/material";
import Alert from "@mui/material/Alert";
import React from "react";
import Snackbar from "@mui/material/Snackbar";

const defaultValue = {
  setStatus: (val: string) => {},
  setMessage: (val: string) => {},
  message: "",
  status: "",
};

export const SubmitStatusContext = React.createContext(defaultValue);
function SubmitStatusProvider({ children }: { children: React.ReactNode }) {
  const [message, setMessage] = React.useState("");
  const [status, setStatus] = React.useState("");

  const value = {
    message,
    setMessage,
    status,
    setStatus,
  };

  return (
    <SubmitStatusContext.Provider value={value}>
      <Portal>
        <>
          <Snackbar open={Boolean(value.status)} autoHideDuration={3000}>
            <Alert
              variant="filled"
              severity={value.status === "error" ? "error" : "success"}
            >
              {value.message}
            </Alert>
          </Snackbar>
        </>
      </Portal>

      {children}
    </SubmitStatusContext.Provider>
  );
}

export default SubmitStatusProvider;
