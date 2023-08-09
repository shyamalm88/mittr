import {
  CHANGE_ANSWER_TYPE,
  DELETE_FROM_LIST,
  HANDLE_CHANGE,
  SUBMIT,
} from "../constants";
import { Reducer } from "react";
import { CreatePollValueType } from "../types";

export const PollCreationReducer: Reducer<any, any> = (
  state: CreatePollValueType,
  action: any
) => {
  const { type, payload } = action;
  switch (type) {
    case HANDLE_CHANGE:
      // console.log("HANDLE_CHANGE", payload);
      let key = "";
      if (payload.name.includes("[") && payload.name.includes(".")) {
        const { keyVal, arr } = handlingDataAssignment(
          payload.name,
          state,
          payload
        );
        key = keyVal;
        return {
          ...state,
          [key]: arr,
        };
      } else {
        key = payload.name;
        return {
          ...state,
          [key]: payload.value,
        };
      }
    case DELETE_FROM_LIST:
      // console.log("DELETE_FROM_LIST", payload);
      if (payload.name.includes("[")) {
        if (payload.name.lastIndexOf("[") > payload.name.indexOf("[")) {
          const lastIndex = payload.name.lastIndexOf(".");
          const temp = payload.name.substr(0, lastIndex);
          const tempKeyI = temp.lastIndexOf(".");
          const tempKey = temp.substr(tempKeyI)?.replace(".", "");
          console.log(tempKey);
          const tempT = tempKey?.split("[");
          key = tempT[0];
          const indx = parseInt(tempT[1]?.replace("]", ""));
          const tempPayloadName = payload.name?.split("[");
          const keyNew = tempPayloadName[0];
          const indxNew = parseInt(tempPayloadName[1]?.replace("]", ""));
          const arrN: any = state[keyNew as keyof typeof state];
          return {
            ...state,
            [keyNew]: [
              ...arrN.map((q: any, i: number) => {
                if (i === indxNew) {
                  return {
                    ...q,
                    [key]: q[key].filter(
                      (_: string, index: number) => index != indx
                    ),
                  };
                } else {
                  return { ...q };
                }
              }),
            ],
          };
        } else {
          const temp = payload.name?.split("[");
          key = temp[0];
          const indx = parseInt(temp[1]?.replace("]", ""));
          const arr: any = state[key as keyof typeof state];
          return {
            ...state,
            [key]: [...arr.filter((_: string, index: number) => index != indx)],
          };
        }
      } else {
        throw new Error(
          "payload name not properly constructed for array element update and insert"
        );
      }
    case CHANGE_ANSWER_TYPE:
      if (payload.name.includes("[")) {
        const temp = payload.name?.split("[");
        key = temp[0];
        const indx = parseInt(temp[1]?.replace("]", ""));
        const arr: any = state[key as keyof typeof state];
        return {
          ...state,
          [key]: [
            ...arr.map((x: string, index: number) => {
              if (index !== indx) {
                return x;
              }
            }),
          ],
        };
      } else {
        return state;
      }

    case SUBMIT:
      console.log(state);
      console.log(JSON.stringify(state));
      return state;
  }
};

const handlingDataAssignment = (name: string, state: any, payload: any) => {
  let keyVal = "";
  const optionName = name.substring(name.lastIndexOf(".") + 1);
  console.log(optionName);
  const keyName = name.split(".")[1];
  const temp = name?.split("[");
  keyVal = temp[0];
  const indx = parseInt(temp[1].replace("]", ""));
  const arr: any = state[keyVal as keyof typeof state];
  if (keyName.includes("[") && keyName.includes("]")) {
    const tempN = keyName?.split("[");
    const keyValN = tempN[0];
    const indxN = parseInt(tempN[1].replace("]", ""));
    if (!arr[indx][keyValN]) {
      arr[indx][keyValN] = [{ [optionName]: payload.value }];
    } else {
      arr[indx][keyValN][indxN] = { [optionName]: payload.value };
    }
  } else {
    arr[indx] = { ...arr[indx], [keyName]: payload.value };
  }
  return { keyVal, arr };
};
