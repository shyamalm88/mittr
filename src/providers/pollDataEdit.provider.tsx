import React from "react";
import { ComponentInputProps } from "../types";
import HttpService from "../services/@http/HttpClient";

export const PollDataEditContext = React.createContext<{
  pollEditData: any;
  setPollEditData: Function;
}>({ pollEditData: null, setPollEditData: () => {} });

function PollDataEditProvider({ children }: ComponentInputProps) {
  const [pollEditData, setPollEditData] = React.useState<any | null>(null);

  return (
    <PollDataEditContext.Provider value={{ pollEditData, setPollEditData }}>
      {children}
    </PollDataEditContext.Provider>
  );
}

export default PollDataEditProvider;
