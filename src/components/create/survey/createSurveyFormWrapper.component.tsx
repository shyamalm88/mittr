import React from "react";
import Box from "@mui/material/Box";

import urlSlug from "url-slug";

import PollSettings from "../../additionalQuestions/pollSettings.component";
import { useTheme } from "@mui/material";

import HttpService from "../../../services/@http/HttpClient";

import { v4 as uuidv4 } from "uuid";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import RestartAltOutlinedIcon from "@mui/icons-material/RestartAltOutlined";
import { toast } from "react-toastify";
import * as _ from "underscore";

import {
  useForm,
  FormProvider,
  SubmitHandler,
  useFieldArray,
} from "react-hook-form";
import { CreateSurveySubmittedValueType } from "../../../types";
import SurveyQuestionnaire from "../common/surveyQuestionnaire";
import NewSection from "../common/newSection";

const PollFormWrapper = () => {
  const http = new HttpService();
  const theme = useTheme();

  const methods = useForm<CreateSurveySubmittedValueType>({
    defaultValues: {
      title: "Untitled Survey",
      description: "",
      survey: [
        {
          question: "",
          id: uuidv4(),
          votingType: "multiple_choice",
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
    register,
    setFocus,
  } = methods;

  const { fields, append, prepend, remove, swap, move, insert, update } =
    useFieldArray({
      control,
      name: "survey",
    });

  React.useEffect(() => {
    setFocus("title");
  }, [setFocus]);

  const onSubmitSubmitForm: SubmitHandler<
    CreateSurveySubmittedValueType
  > = async (data) => {
    console.log(JSON.stringify(data));
    setValue("questionSlug", urlSlug(data.title));

    const dataToBeSubmitted = getValues();
    (dataToBeSubmitted.survey as any) = _.map(
      dataToBeSubmitted.survey,
      function (o) {
        return _.omit(o, ["id"]);
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

  const resetHandler = () => {
    reset();
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmitSubmitForm)}>
        <NewSection
          register={register}
          titleFieldName="title"
          descriptionFieldName="description"
          errors={errors}
        />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            flex: 1,
            width: "100%",
            position: "relative",
            mb: 2,
          }}
        >
          {fields.map((item: any, index: number) => {
            if (item.type === "section") {
              return (
                <NewSection
                  key={item.id}
                  register={register}
                  titleFieldName={`survey.${index}.title`}
                  descriptionFieldName={`survey.${index}.description`}
                  index={index}
                  errors={errors}
                />
              );
            }
            return (
              <SurveyQuestionnaire
                key={item.id}
                fieldName={`survey.${index}`}
                append={append}
                update={update}
                index={index}
                remove={remove}
                fields={fields}
              />
            );
          })}

          <PollSettings />
        </Box>
        <Button
          variant="contained"
          sx={{
            float: { xs: "none", sm: "right" },
            width: { xs: "100%", sm: "auto" },
            mb: { xs: 1, sm: 0 },
          }}
          type="submit"
          startIcon={<SendIcon />}
        >
          Create
        </Button>
        <Button
          variant="outlined"
          color="inherit"
          sx={{
            float: { xs: "none", sm: "right" },
            width: { xs: "100%", sm: "auto" },
            mb: { xs: 1, sm: 0 },
            marginRight: "10px",
            opacity: 0.6,
          }}
          startIcon={<RestartAltOutlinedIcon />}
          onClick={resetHandler}
        >
          Reset
        </Button>
        <Button
          variant="outlined"
          sx={{
            float: { xs: "none", sm: "right" },
            width: { xs: "100%", sm: "auto" },
            mb: { xs: 4, sm: 0 },
            marginRight: "10px",
          }}
        >
          Cancel
        </Button>
      </form>
    </FormProvider>
  );
};

export default PollFormWrapper;
