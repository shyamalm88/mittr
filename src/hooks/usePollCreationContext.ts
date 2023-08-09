import React from "react";
import { PollCreationProviderContext } from "../providers/pollCreation.provider";

export const usePollCreationContext = () => {
  const contextValue = React.useContext(PollCreationProviderContext);
  return contextValue;
};
