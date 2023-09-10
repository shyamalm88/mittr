import React from "react";
import { ChildrenProps } from "../types";
import { defaultPollFormValue } from "../store";
import {
  CHANGE_ANSWER_TYPE,
  DELETE_FROM_LIST,
  HANDLE_CHANGE,
  RESET,
  SUBMIT,
} from "../constants";
import { PollCreationReducer } from "../reducers/pollCreation.reducer";

export const PollCreationProviderContext =
  React.createContext(defaultPollFormValue);

function PollCreationProvider({ children }: ChildrenProps) {
  const handleChange = (event: React.FormEvent<HTMLInputElement>) => {
    dispatch({
      type: HANDLE_CHANGE,
      payload: {
        name: (event.target as HTMLInputElement).name,
        value: (event.target as HTMLInputElement).value,
      },
    });
  };

  const handleDeleteFromList = (key: string) => {
    dispatch({
      type: DELETE_FROM_LIST,
      payload: { name: key },
    });
  };

  const handleUpdateAnswerType = (key: string) => {
    dispatch({
      type: CHANGE_ANSWER_TYPE,
      payload: { name: key },
    });
  };

  const submit = () => {
    dispatch({
      type: SUBMIT,
    });
  };

  const getState = () => {
    return state;
  };

  const reset = () => {
    dispatch({
      type: RESET,
    });
  };

  const [state, dispatch] = React.useReducer(
    PollCreationReducer,
    defaultPollFormValue
  );

  const value = {
    ...defaultPollFormValue,
    handleChange,
    handleDeleteFromList,
    handleUpdateAnswerType,
    reset,
    submit,
    getState,
  };

  return (
    <PollCreationProviderContext.Provider value={value}>
      {children}
    </PollCreationProviderContext.Provider>
  );
}

export default PollCreationProvider;
