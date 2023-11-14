import React from "react";
import Box from "@mui/material/Box";

import urlSlug from "url-slug";
import FileCopyOutlinedIcon from "@mui/icons-material/FileCopyOutlined";
import LaunchIcon from "@mui/icons-material/Launch";
import PollSettings from "../../additionalQuestions/pollSettings.component";
import CloseIcon from "@mui/icons-material/Close";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  InputAdornment,
  OutlinedInput,
  useTheme,
} from "@mui/material";

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
import { useQuestionTypeContext } from "../../../hooks/useQuestionTypeContext";

const PollFormWrapper = () => {
  const http = new HttpService();
  const theme = useTheme();
  const { questionType, setQuestionType } = useQuestionTypeContext();
  const [shareUrlDialog, setShareUrlDialog] = React.useState(false);
  const [shareUrl, setShareUrl] = React.useState("");

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
    setValue("questionSlug", urlSlug(data.title));

    const dataToBeSubmitted = getValues();
    (dataToBeSubmitted.survey as any) = _.map(
      dataToBeSubmitted.survey,
      function (o) {
        return _.omit(o, ["id"]);
      }
    );
    try {
      const resp = await postSurvey(dataToBeSubmitted);
      setShareUrlDialog(true);
      setShareUrl(
        `${location.protocol}:${location.port}//${
          location.hostname
        }/participate/${(resp as any)?._id}/${(resp as any)?.questionSlug}`
      );
      clearErrors();
      resetHandler();
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
    setQuestionType(["multiple_choice"]);
    reset();
  };

  const handleShareUrlDialogClose = () => {
    setShareUrlDialog(false);
  };

  const viewSurveyParticipatePage = () => {
    window.open(shareUrl, "_blank");
  };

  return (
    <>
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
                    fields={fields}
                    remove={remove}
                    swap={swap}
                    getValues={getValues}
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
                  swap={swap}
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
      <Dialog
        open={shareUrlDialog}
        onClose={handleShareUrlDialogClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth
      >
        <DialogTitle id="alert-dialog-title">
          {"Share Survey URL within you network"}
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleShareUrlDialogClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
          <OutlinedInput
            value={shareUrl}
            fullWidth
            endAdornment={
              <InputAdornment position="end">
                <Button
                  autoFocus
                  variant="outlined"
                  startIcon={<FileCopyOutlinedIcon />}
                >
                  Copy Link
                </Button>
              </InputAdornment>
            }
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={viewSurveyParticipatePage}
            autoFocus
            variant="contained"
            startIcon={<LaunchIcon />}
          >
            Open in a New Tab
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default PollFormWrapper;
