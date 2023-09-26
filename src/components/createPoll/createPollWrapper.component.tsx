import Card from "@mui/material/Card";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import dynamic from "next/dynamic";
const PollFormWrapper = dynamic(() => import("./pollFormWrapper.component"));
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import RestartAltOutlinedIcon from "@mui/icons-material/RestartAltOutlined";
import React from "react";
import * as _ from "underscore";
import urlSlug from "url-slug";
import { toast } from "react-toastify";
import {
  useForm,
  FormProvider,
  SubmitHandler,
  useFieldArray,
} from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import { CreatePollSubmittedValueType } from "../../types";
import HttpService from "../../services/@http/HttpClient";

const CreatePollWrapper = () => {
  const http = new HttpService();
  const stringToColor = (string: string) => {
    let hash = 0;
    let i;

    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = "#";

    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }

    return color;
  };
  const stringAvatar = (name: string) => {
    return {
      sx: {
        bgcolor: stringToColor(name),
      },
      children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
    };
  };

  const methods = useForm<CreatePollSubmittedValueType>({
    defaultValues: {
      question: "",
      options: [
        { id: uuidv4(), label: "Option", enabled: true, option: "" },
        { id: uuidv4(), label: "Option", enabled: true, option: "" },
      ],
      additionalQuestions: [
        {
          id: uuidv4(),
          questionLabel: "Question",
          answerType: "",
          question: "",
        },
      ],
      settings: {
        captureGender: false,
        closePollOnScheduledDate: false,
        captureCity: false,
        captureCountry: false,
      },
      duration: "",
    },
  });

  const {
    handleSubmit,
    setError,
    reset,
    formState: { errors },
    control,
    getValues,
    setValue,
    clearErrors,
  } = methods;

  const { fields, append, prepend, remove, swap, move, insert, update } =
    useFieldArray({
      control,
      name: "additionalQuestions",
    });

  const resetHandler = () => {
    reset();
  };

  const onSubmit: SubmitHandler<CreatePollSubmittedValueType> = async (
    data
  ) => {
    setValue("questionSlug", urlSlug(data.question));
    const additionalQuestions = getValues("additionalQuestions");
    const genderFound = additionalQuestions.some(
      (item) => item.answerType === "gender"
    );
    const countryFound = additionalQuestions.some(
      (item) => item.answerType === "country"
    );
    if (data.settings && data.settings.captureGender && !genderFound) {
      const temp = {
        id: uuidv4(),
        questionLabel: "Question",
        answerType: "gender",
        question: "Please select your Gender",
      };
      append(temp);
    } else {
      if (data.settings && !data.settings.captureGender && genderFound) {
        const idx = additionalQuestions.findIndex(
          (item) => item.answerType === "gender"
        );
        remove(idx);
      }
    }
    if (data.settings && data.settings.captureCity && !countryFound) {
      const temp = {
        id: uuidv4(),
        questionLabel: "Question",
        answerType: "city",
        question: "Your residing Country and City",
      };
      append(temp);
    } else {
      if (data.settings && !data.settings.captureGender && countryFound) {
        const idx = additionalQuestions.findIndex(
          (item) => item.answerType === "city"
        );
        remove(idx);
      }
    }
    if (data.settings && data.settings.captureCountry && !countryFound) {
      const temp = {
        id: uuidv4(),
        questionLabel: "Question",
        answerType: "country",
        question: "Your residing Country",
      };
      append(temp);
    } else {
      if (data.settings && !data.settings.captureGender && countryFound) {
        const idx = additionalQuestions.findIndex(
          (item) => item.answerType === "country"
        );
        remove(idx);
      }
    }
    const dataToBeSubmitted = getValues();
    dataToBeSubmitted.options = _.map(dataToBeSubmitted.options, function (o) {
      return _.omit(o, ["id", "enabled", "label"]);
    });
    dataToBeSubmitted.additionalQuestions = _.map(
      dataToBeSubmitted.additionalQuestions,
      function (o) {
        return _.omit(o, ["id", "questionLabel"]);
      }
    );
    console.log(dataToBeSubmitted);
    try {
      const resp = await postSurvey(dataToBeSubmitted);
      console.log(resp);
      clearErrors();
      reset();
      toast.success(`You have successfully created Poll`, {
        position: toast.POSITION.TOP_RIGHT,
        theme: "colored",
      });
    } catch (err) {
      toast.error(`Error While Creating Poll`, {
        position: toast.POSITION.TOP_RIGHT,
        theme: "colored",
      });
    }
  };

  const postSurvey = async (data: any) => {
    const response = await http.service().post(`/survey`, data);
    return response;
  };

  return (
    // <Box component="form" onSubmit={submitHandler}>
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Card
          variant="outlined"
          sx={{
            p: 2,
            borderRadius: "4px",
            borderTopColor: (theme) => theme.palette.primary.main,
            borderTopStyle: "solid",
            borderTopWidth: "2px",
          }}
          className="card"
        >
          <Stack
            direction="row"
            spacing={{ xs: 0, sm: 2, md: 4 }}
            sx={{ display: "flex" }}
          >
            <Box sx={{ display: { xs: "none", sm: "block" } }}>
              <Avatar {...stringAvatar("Arghya Majumder")} />
            </Box>
            <Box
              sx={{
                display: "flex",
                width: "100%",
                borderRadius: "4px",
              }}
            >
              <PollFormWrapper />
            </Box>
          </Stack>

          <Button
            variant="contained"
            style={{ float: "right" }}
            type="submit"
            startIcon={<SendIcon />}
          >
            Create
          </Button>
          <Button
            variant="outlined"
            color="inherit"
            style={{ float: "right", marginRight: "10px", opacity: 0.6 }}
            startIcon={<RestartAltOutlinedIcon />}
            onClick={resetHandler}
          >
            Reset
          </Button>
          <Button
            variant="outlined"
            style={{ float: "right", marginRight: "10px" }}
          >
            Cancel
          </Button>
        </Card>
      </form>
    </FormProvider>
    // </Box>
  );
};

export default CreatePollWrapper;
