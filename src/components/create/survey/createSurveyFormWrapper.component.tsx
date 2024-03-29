import React from "react";
import Box from "@mui/material/Box";

import FileCopyOutlinedIcon from "@mui/icons-material/FileCopyOutlined";
import LaunchIcon from "@mui/icons-material/Launch";
import PollSettings from "../../additionalQuestions/pollSettings.component";
import CloseIcon from "@mui/icons-material/Close";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import { Autosave } from "react-autosave";
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

import uniqid from "uniqid";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import RestartAltOutlinedIcon from "@mui/icons-material/RestartAltOutlined";
import { toast } from "react-toastify";

import {
  useForm,
  FormProvider,
  SubmitHandler,
  useFieldArray,
} from "react-hook-form";
import { CreateSurveySubmittedValueType } from "../../../types";
import SurveyQuestionnaire from "../common/surveyQuestionnaire";
import TitleOrSeparatorSection from "../common/TitleOrSeparatorSection";
import { useQuestionTypeContext } from "../../../hooks/useQuestionTypeContext";
import AddingSectionsControl from "../common/addingSectionsControl";
import { DELAY } from "../../../constants/properties";
import { surveyFormDataUpdate } from "../../../utility/formatSubmitData";
import { useAuthenticatedUserData } from "../../../hooks/useAuthenticatedUserDataContext";
import { useEditDataContext } from "../../../hooks/useEditDataContext";
import { useRouter } from "next/router";

const PollFormWrapper = () => {
  const http = new HttpService();
  const theme = useTheme();
  const { questionType, setQuestionType } = useQuestionTypeContext();
  const [copyDone, setCopyDone] = React.useState(false);
  const [shareUrlDialog, setShareUrlDialog] = React.useState(false);
  const { authenticatedUser, setAuthenticatedUser } =
    useAuthenticatedUserData();
  const [shareUrl, setShareUrl] = React.useState("");
  const [alreadySavedDataId, setAlreadySavedDataId] = React.useState("");
  const [updatedDataToBeSaved, setUpdatedDataToBeSaved] = React.useState();
  const { editableData } = useEditDataContext();
  const router = useRouter();

  const methods = useForm<CreateSurveySubmittedValueType>({
    defaultValues: {
      title: "Untitled Survey",
      description: "",
      survey: [
        {
          question: "",
          id: uniqid(),
          votingType: "multiple_choice",
          options: [],
          required: false,
        },
      ],

      settings: {
        captureGender: false,
        closePollOnScheduledDate: false,
        captureCity: false,
        captureCountry: false,
      },
      duration: "",
      createdByUserRef: "",
    },
  });

  const {
    handleSubmit,
    setError,
    reset,
    formState: {
      errors,
      isDirty,
      dirtyFields,
      touchedFields,
      isSubmitSuccessful,
      isSubmitted,
    },
    control,
    getValues,
    setValue,
    clearErrors,
    register,
    setFocus,
    watch,
  } = methods;

  watch((data) => setUpdatedDataToBeSaved(data as any));
  console.log(errors);
  const { fields, append, prepend, remove, swap, move, insert, update } =
    useFieldArray({
      control,
      name: "survey",
    });

  React.useEffect(() => {
    setFocus("title");
  }, [setFocus]);

  React.useEffect(() => {
    if (router.asPath.includes("edit/survey")) {
      if (router.query.index) {
        setAlreadySavedDataId(router.query.index as string);
      }
    }
  }, [router.asPath, setAlreadySavedDataId]);

  React.useEffect(() => {
    if (authenticatedUser) {
      setValue("createdByUserRef", authenticatedUser.user._id);
    }
  }, [authenticatedUser]);

  const onSubmitSubmitForm: SubmitHandler<
    CreateSurveySubmittedValueType
  > = async (data) => {
    const dataToBeSubmitted = await surveyFormDataUpdate(
      data,
      setValue,
      getValues,
      append,
      remove
    );
    try {
      const resp = await postSurvey(dataToBeSubmitted);
      setShareUrlDialog(true);
      //
      setShareUrl(
        `${location.protocol}//${location.hostname}:${
          location.port
        }/participate/${(resp as any)?._id}/${(resp as any)?.questionSlug}`
      );
      clearErrors();
      // resetHandler();
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

  const handleAutoSave = async (data: any) => {
    try {
      toast.info("Saving changes...", {
        position: "bottom-right",
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: theme.palette.mode === "dark" ? "dark" : "light",
      });
      const res = await postSurvey(data);
      if (res) {
        toast.info("Saved Changes", {
          position: "bottom-right",
          autoClose: 1000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
          progress: undefined,
          theme: theme.palette.mode === "dark" ? "dark" : "light",
        });
      }
    } catch (err) {
      console.error(err);
    }
  };

  const postSurvey = async (data: any) => {
    try {
      const response = await http
        .service()
        .post(
          alreadySavedDataId ? `/survey/${alreadySavedDataId}` : `/survey`,
          data
        );
      setAlreadySavedDataId((response as any)?._id);
      return response;
    } catch (err) {
      console.error(err);
    }
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

  React.useEffect(() => {
    if (editableData && editableData.survey) {
      remove(0);
      setValue("settings", editableData.settings);
      setAlreadySavedDataId(editableData._id);
      editableData.survey.forEach((element: any) => {
        handleDataDrivenAddNewSurvey(element);
      });
    }
  }, [editableData, setValue, setAlreadySavedDataId, remove]);

  const handleDataDrivenAddNewSurvey = async (data: any) => {
    if (data) {
      if (data.type === "section") {
        const tempQuestion = {
          title: data.title,
          id: uniqid(),
          description: data.description,
          type: data.type,
        };
        await append(tempQuestion);
      } else {
        const tempQuestion = {
          question: "",
          id: uniqid(),
          votingType: data.votingType,
          options: data.options,
          required: data.required,
        };
        await append(tempQuestion);
      }
    }
  };

  return (
    <>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmitSubmitForm)}>
          <TitleOrSeparatorSection
            register={register}
            titleFieldName="title"
            descriptionFieldName="description"
            errors={errors}
            setValue={setValue}
            control={control}
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
                      <TitleOrSeparatorSection
                        key={`${item.id}${index}`}
                        register={register}
                        titleFieldName={`survey.${index}.title`}
                        descriptionFieldName={`survey[${index}].description`}
                        index={index}
                        errors={errors}
                        fields={fields}
                        remove={remove}
                        swap={swap}
                        getValues={getValues}
                        setValue={setValue}
                        control={control}
                      />
                    </>
                  );
                }
                return (
                  <TimelineItem key={item.id}>
                    <TimelineSeparator>
                      <TimelineDot color="primary" variant="outlined" />
                      <TimelineConnector
                        sx={{
                          width: "4px",
                          background:
                            theme.palette.mode === "light"
                              ? theme.palette.primary.light
                              : theme.palette.primary.dark,
                        }}
                      />
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
                        insert={insert}
                        move={move}
                        watch={watch}
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
            {editableData ? "Update" : "Create"}
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
      {/* {isDirty && (
        <Autosave
          data={updatedDataToBeSaved as any}
          onSave={handleAutoSave}
          interval={DELAY}
          saveOnUnmount={
            alreadySavedDataId ? (isSubmitSuccessful ? false : true) : false
          }
        />
      )} */}
    </>
  );
};

export default PollFormWrapper;
