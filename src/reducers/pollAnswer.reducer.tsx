import {
  CHANGE_ANSWER_TYPE,
  DELETE_FROM_LIST,
  HANDLE_CHANGE,
  SUBMIT,
} from "../constants";
import { Reducer } from "react";
import { CreatePollAnswerType } from "../types";

export const PollAnswerReducer: Reducer<any, any> = (
  state: CreatePollAnswerType,
  action: any
) => {
  const { type, payload } = action;
  switch (type) {
    case HANDLE_CHANGE:
      let key: string = "";
      console.log(payload);
      if (payload.name.includes("[") && payload.name.includes(".")) {
        const temp = payload.name.split(".")[0];
        key = temp.split("[")[0];
        const key2 = payload.name.split(".")[1];
        const keyVal = parseInt(temp.split("[")[1].replace("]", ""));
        const arr: any = state[key as keyof typeof state];
        arr[keyVal] = {
          [key2]:
            typeof payload.value === "object" &&
            !Array.isArray(payload.value) &&
            payload.value !== null
              ? { ...payload.value }
              : payload.value,
          questionId: payload.id,
        };
        return {
          ...state,
          [key]: arr,
        };
      } else {
        key = payload.name;
        return {
          ...state,
          [key]: Array.isArray(payload.value)
            ? [...payload.value]
            : payload.value,
        };
      }

    case SUBMIT:
      console.log(state);
      console.log(JSON.stringify(state));
      return state;
  }
};
