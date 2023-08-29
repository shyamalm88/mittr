import React from "react";
import { StepWrapperProviderContext } from "../providers/stepWrapper.provider";

export const useStepWrapperContext = (): any => {
  const contextValue = React.useContext(StepWrapperProviderContext);
  return contextValue;
};
