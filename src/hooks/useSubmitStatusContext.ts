import React from "react";
import { SubmitStatusContext } from "../providers/submitStatus.provider";

export const useSubmitStatusContext = (): any => {
  const contextValue = React.useContext(SubmitStatusContext);
  const setError = (status: string) => {
    contextValue.setStatus(status);
    setTimeout(() => {
      contextValue.setStatus("");
    }, 3000);
  };

  const setSuccess = (status: string) => {
    contextValue.setStatus(status);
    setTimeout(() => {
      contextValue.setStatus("");
    }, 3000);
  };

  const setWarning = (status: string) => {
    contextValue.setStatus(status);
    setTimeout(() => {
      contextValue.setStatus("");
    }, 3000);
  };

  const setMessage = (message: string) => {
    contextValue.setMessage(message);
    setTimeout(() => {
      contextValue.setMessage("");
    }, 3000);
  };

  return { setError, setSuccess, setWarning, setMessage };
};
