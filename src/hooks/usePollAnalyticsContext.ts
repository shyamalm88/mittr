import React from "react";
import { AnalyticsOfPollContext } from "../providers/analyticsOfPoll.provider";

export const usePollAnalyticsContext = (): any => {
  const contextValue = React.useContext(AnalyticsOfPollContext);
  return contextValue;
};
