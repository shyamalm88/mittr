import Card from "@mui/material/Card";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import PollFormWrapper from "./pollFormWrapper.component";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import React from "react";
import {
  useForm,
  FormProvider,
  useFormContext,
  SubmitHandler,
} from "react-hook-form";
import { usePollCreationContext } from "../../hooks/usePollCreationContext";
import { validateQuestionCreation } from "../../utility/validations";
import { v4 as uuidv4 } from "uuid";

const CreatePollWrapper = () => {
  const contextValue = usePollCreationContext();

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

  const submitHandler = async (e: any) => {
    e.preventDefault();
    console.log("Submit");

    const updatedContextCityValue = await contextValue.getState();
    if (updatedContextCityValue.settings.captureCity) {
      contextValue.handleChange({
        target: {
          name: `additionalQuestions[${contextValue.additionalQuestions.length}].question`,
          value: "Your residing Country and City",
        },
      });
      contextValue.handleChange({
        target: {
          name: `additionalQuestions[${contextValue.additionalQuestions.length}].answerType`,
          value: "country",
        },
      });
    }

    const updatedContextGenderValue = await contextValue.getState();

    if (updatedContextGenderValue.settings.captureGender) {
      contextValue.handleChange({
        target: {
          name: `additionalQuestions[${contextValue.additionalQuestions.length}].question`,
          value: "Please select your Gender",
        },
      });
      contextValue.handleChange({
        target: {
          name: `additionalQuestions[${contextValue.additionalQuestions.length}].answerType`,
          value: "gender",
        },
      });
    }

    const validateState = contextValue.getState();
    console.log(validateState);
    const validationSuccess = validateQuestionCreation(validateState);
    console.log(validationSuccess);
    if (validationSuccess) {
      // contextValue.submit();
    }
  };

  const methods = useForm({
    defaultValues: {
      question: "",
      options: [
        { id: uuidv4(), label: "Option", enabled: true },
        { id: uuidv4(), label: "Option", enabled: true },
      ],
      additionalQuestions: [],
      settings: {
        captureGender: false,
        closePollOnScheduledDate: false,
        captureCity: false,
      },
      duration: "",
    },
  });
  const { handleSubmit } = methods;
  const onSubmit: SubmitHandler<any> = (data) => console.log(data);

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
