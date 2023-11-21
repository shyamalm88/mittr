import React from "react";
import Box from "@mui/material/Box";

import urlSlug from "url-slug";
import FileCopyOutlinedIcon from "@mui/icons-material/FileCopyOutlined";
import LaunchIcon from "@mui/icons-material/Launch";
import PollSettings from "../../additionalQuestions/pollSettings.component";
import CloseIcon from "@mui/icons-material/Close";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
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
import Timeline from "@mui/lab/Timeline";
import TimelineItem, { timelineItemClasses } from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";

import HttpService from "../../../services/@http/HttpClient";

import { v4 as uuidv4 } from "uuid";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import RestartAltOutlinedIcon from "@mui/icons-material/RestartAltOutlined";
import { toast } from "react-toastify";
import * as _ from "underscore";
import FastfoodIcon from "@mui/icons-material/Fastfood";

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
import AddingSectionsControl from "../common/addingSectionsControl";

const PollFormWrapper = () => {
  const http = new HttpService();
  const theme = useTheme();
  const { questionType, setQuestionType } = useQuestionTypeContext();
  const [copyDone, setCopyDone] = React.useState(false);
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
        `${location.protocol}//${location.hostname}:${
          location.port
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

  const handleCopy = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopyDone(true);
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
              pl: 2,
            }}
            className="surveyQuestionSection"
          >
            <Timeline
              sx={{
                p: 0,
                m: 0,
                [`& .${timelineItemClasses.root}:before`]: {
                  flex: 0,
                  padding: 0,
                },
              }}
            >
              {fields.map((item: any, index: number) => {
                if (item.type === "section") {
                  return (
                    <>
                      <AddingSectionsControl
                        key={item.id}
                        append={append}
                        index={index}
                      />
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
                    </>
                  );
                }
                return (
                  <TimelineItem key={item.id}>
                    <TimelineSeparator>
                      <TimelineDot color="primary" variant="outlined" />
                      <TimelineConnector />
                    </TimelineSeparator>
                    <TimelineContent>
                      <AddingSectionsControl append={append} index={index} />
                      <SurveyQuestionnaire
                        fieldName={`survey.${index}`}
                        key={item.id}
                        append={append}
                        update={update}
                        index={index}
                        remove={remove}
                        fields={fields}
                        swap={swap}
                      />
                    </TimelineContent>
                  </TimelineItem>
                );
              })}
            </Timeline>
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
                {copyDone ? (
                  <Button
                    autoFocus
                    variant="contained"
                    startIcon={<TaskAltIcon />}
                    onClick={handleCopy}
                    color="primary"
                    size="small"
                  >
                    Copied
                  </Button>
                ) : (
                  <Button
                    autoFocus
                    variant="outlined"
                    startIcon={<FileCopyOutlinedIcon />}
                    onClick={handleCopy}
                    size="small"
                  >
                    Copy Link
                  </Button>
                )}
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
