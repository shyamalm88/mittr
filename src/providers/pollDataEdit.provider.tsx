import React from "react";
import { ComponentInputProps } from "../types";
import HttpService from "../services/@http/HttpClient";

export const DataEditContext = React.createContext<{
  editableData: any;
  setEditableData: Function;
}>({ editableData: null, setEditableData: () => {} });

function PollDataEditProvider({ children }: ComponentInputProps) {
  const [editableData, setEditableData] = React.useState<any | null>(null);

  return (
    <DataEditContext.Provider value={{ editableData, setEditableData }}>
      {children}
    </DataEditContext.Provider>
  );
}

export default PollDataEditProvider;
