import React from "react";
import { ChildrenProps } from "../types";
import { PollAnswerReducer } from "../reducers/pollAnswer.reducer";
import { defaultPollAnswerFormValue } from "../store";
import { HANDLE_CHANGE, SUBMIT } from "../constants";

export const PollAnswerProviderContext = React.createContext(
  defaultPollAnswerFormValue
);

function PollAnswerProvider({ children }: ChildrenProps) {
  const handleChange = (event: React.FormEvent<HTMLInputElement>) => {
    dispatch({
      type: HANDLE_CHANGE,
      payload: {
        name: (event.target as HTMLInputElement).name,
        value: (event.target as HTMLInputElement).value,
        id: (event.target as HTMLInputElement).id,
      },
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

  const [state, dispatch] = React.useReducer(
    PollAnswerReducer,
    defaultPollAnswerFormValue
  );

  const value = {
    ...defaultPollAnswerFormValue,
    handleChange,
    submit,
    getState,
  };

  return (
    <PollAnswerProviderContext.Provider value={value}>
      {children}
    </PollAnswerProviderContext.Provider>
  );
}

export default PollAnswerProvider;
