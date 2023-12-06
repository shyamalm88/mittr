import React from "react";
import { DataEditContext } from "../providers/pollDataEdit.provider";

export const useEditDataContext = (): any => {
  const { editableData, setEditableData } = React.useContext(DataEditContext);
  return { editableData, setEditableData };
};
