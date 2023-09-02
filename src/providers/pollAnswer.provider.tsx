import React from "react";
import { ChildrenProps } from "../types";
import { PollAnswerReducer } from "../reducers/pollAnswer.reducer";
import { defaultPollAnswerFormValue } from "../store";
import {
  CHANGE_ANSWER_TYPE,
  DELETE_FROM_LIST,
  HANDLE_CHANGE,
  SUBMIT,
} from "../constants";

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
      },
    });
  };

  const submit = () => {
    dispatch({
      type: SUBMIT,
    });
  };

  const [state, dispatch] = React.useReducer(
    PollAnswerReducer,
    defaultPollAnswerFormValue
  );

  const value = {
    ...defaultPollAnswerFormValue,
    handleChange,
    submit,
  };

  return (
    <PollAnswerProviderContext.Provider value={value}>
      {children}
    </PollAnswerProviderContext.Provider>
  );
}

export default PollAnswerProvider;
