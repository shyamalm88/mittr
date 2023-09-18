import {
  CHANGE_ANSWER_TYPE,
  DELETE_FROM_LIST,
  HANDLE_CHANGE,
  SUBMIT,
} from "../constants";
import { Reducer } from "react";
import { CreatePollAnswerType } from "../types";
import HttpService from "../services/@http/HttpClient";
import { toast } from "react-toastify";
const http = new HttpService();

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
        console.log(keyVal);
        console.log(key);
        const arr: any = state[key as keyof typeof state];
        console.log(arr);

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
      const tempObj = state;
      const res = postAnswer(tempObj);
      res
        .then((data: any) => {
          console.log("responseData", data);
          toast.success("Successfully Answered for this poll", {
            position: toast.POSITION.TOP_RIGHT,
            hideProgressBar: true,
            theme: "colored",
          });
        })
        .catch((err: any) => {
          console.log(err);
          toast.error(`Error while saving Answers ${err.message}`, {
            position: toast.POSITION.TOP_RIGHT,
            hideProgressBar: true,
            theme: "colored",
          });
        });
      return state;
  }
};

const postAnswer = async (data: any) => {
  const response = await http.service().post(`/survey/answer`, data);
  return response;
};
