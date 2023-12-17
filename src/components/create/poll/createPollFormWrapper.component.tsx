import React from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import AdditionalQuestions from "../../additionalQuestions/additionalQuestions.component";
import PollSettings from "../../additionalQuestions/pollSettings.component";
import { Tooltip, Typography } from "@mui/material";
import { useTheme } from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import HttpService from "../../../services/@http/HttpClient";
import * as _ from "underscore";
import { v4 as uuidv4 } from "uuid";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import RestartAltOutlinedIcon from "@mui/icons-material/RestartAltOutlined";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import { toast } from "react-toastify";
import CloseIcon from "@mui/icons-material/Close";
import LaunchIcon from "@mui/icons-material/Launch";
import FileCopyOutlinedIcon from "@mui/icons-material/FileCopyOutlined";

import { Autosave } from "react-autosave";

import {
  useForm,
  FormProvider,
  SubmitHandler,
  useFieldArray,
} from "react-hook-form";
import { CreatePollSubmittedValueType } from "../../../types";
import { usePollOrSurveyContext } from "../../../hooks/usePollOrSurveyContext";
import SurveyQuestionnaire from "../common/surveyQuestionnaire";
import { useQuestionTypeContext } from "../../../hooks/useQuestionTypeContext";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  InputAdornment,
  OutlinedInput,
} from "@mui/material";
import { pollFormDataUpdate } from "../../../utility/formatSubmitData";
import { DELAY } from "../../../constants/properties";
import { useAuthenticatedUserData } from "../../../hooks/useAuthenticatedUserDataContext";
import { useEditDataContext } from "../../../hooks/useEditDataContext";
import he from "he";
import { useRouter } from "next/router";

const PollFormWrapper = () => {
  const [shareUrlDialog, setShareUrlDialog] = React.useState(false);
  const { editableData } = useEditDataContext();
  const [shareUrl, setShareUrl] = React.useState("");
  const http = new HttpService();
  const theme = useTheme();
  const [copyDone, setCopyDone] = React.useState(false);
  const { authenticatedUser, setAuthenticatedUser } =
    useAuthenticatedUserData();
  const [alreadySavedDataId, setAlreadySavedDataId] = React.useState("");
  const [updatedDataToBeSaved, setUpdatedDataToBeSaved] = React.useState();
  const [questionImageValue, setQuestionImageValue] = React.useState<{
    imageId: string;
    dimensions: {
      width: number;
      height: number;
    };
    destination: string;
    filename: string;
  }>();
  const router = useRouter();

  const methods = useForm<CreatePollSubmittedValueType>({
    defaultValues: {
      question: "",
      votingType: "multiple_choice",
      questionImageRef: undefined,
      questionSlug: "",
      options: [],
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

  React.useEffect(() => {
    if (editableData) {
      setValue("createdByUserRef", editableData.createdByUserRef._id);
      setValue("questionImageRef", editableData.questionImageRef);
      setValue("settings", editableData.settings);
      setAlreadySavedDataId(editableData._id);
    }
  }, [editableData, setValue]);

  const { fields, append, prepend, remove, swap, move, insert, update } =
    useFieldArray({
      control,
      name: "additionalQuestions",
    });

  React.useEffect(() => {
    setFocus("question");
  }, [setFocus]);

  React.useEffect(() => {
    if (router.asPath.includes("edit/poll")) {
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

  const onSubmit = async (fileData: any) => {
    const formData: any = new FormData();
    formData.append("image", fileData);
    try {
      const response: any = await http
        .service()
        .postMultipart(`/poll/image/upload`, formData);
      setQuestionImageValue(response.body);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopyDone(true);
  };
  console.log(errors);

  const onSubmitPollForm: SubmitHandler<CreatePollSubmittedValueType> = async (
    data
  ) => {
    const dataToBeSubmitted = await pollFormDataUpdate(
      data,
      setValue,
      getValues,
      append,
      remove
    );

    try {
      const resp = await postSurvey(dataToBeSubmitted);
      setShareUrlDialog(true);
      setShareUrl(
        `${location.protocol}//${location.hostname}:${location.port}/answer/${
          (resp as any)?._id
        }/${(resp as any)?.questionSlug}`
      );
      clearErrors();
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
          alreadySavedDataId ? `/poll/${alreadySavedDataId}` : `/poll`,
          data
        );
      setAlreadySavedDataId((response as any)?._id);
      return response;
    } catch (err) {
      console.error(err);
    }
  };

  const resetHandler = () => {
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
        <form onSubmit={handleSubmit(onSubmitPollForm)}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              flex: 1,
              width: "100%",
              position: "relative",
            }}
          >
            <SurveyQuestionnaire fieldName={"options"} />
            <PollSettings />
            <Stack
              direction="row"
              alignItems="center"
              sx={{ color: theme.palette.text.secondary, mt: 2 }}
            >
              <Tooltip title="These supplementary questions can be tailored to the specific subject matter of your poll to enhance the quality of responses.">
                <InfoOutlinedIcon color="inherit" />
              </Tooltip>

              <Typography variant="body2" component="small" sx={{ m: 2 }}>
                Kindly suggest supplementary questions that can be incorporated
                to elicit deeper insights from those contributing to the Poll.
              </Typography>
            </Stack>
            <AdditionalQuestions />
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
          {"Share Poll URL within you network"}
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
