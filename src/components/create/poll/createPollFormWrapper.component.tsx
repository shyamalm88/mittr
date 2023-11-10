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
import urlSlug from "url-slug";
import { v4 as uuidv4 } from "uuid";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import RestartAltOutlinedIcon from "@mui/icons-material/RestartAltOutlined";
import { toast } from "react-toastify";
import CloseIcon from "@mui/icons-material/Close";
import LaunchIcon from "@mui/icons-material/Launch";
import FileCopyOutlinedIcon from "@mui/icons-material/FileCopyOutlined";

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

const PollFormWrapper = () => {
  const { pollOrSurvey, setPollOrSurvey } = usePollOrSurveyContext();
  const [shareUrlDialog, setShareUrlDialog] = React.useState(false);
  const [shareUrl, setShareUrl] = React.useState("");
  const http = new HttpService();
  const theme = useTheme();
  const [question, setQuestion] = React.useState();
  const [questionImageValue, setQuestionImageValue] = React.useState<{
    imageId: string;
    dimensions: {
      width: number;
      height: number;
    };
    destination: string;
    filename: string;
  }>();

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
      name: "additionalQuestions",
    });

  React.useEffect(() => {
    setFocus("question");
  }, [setFocus]);

  const handleChange = (e: any) => {
    onSubmit(e.target.files[0]);
  };

  const handleRemove = (e: any) => {};

  const onSubmit = async (fileData: any) => {
    const formData: any = new FormData();
    formData.append("image", fileData);
    try {
      const response: any = await http
        .service()
        .postMultipart(`/survey/image`, formData);
      setQuestionImageValue(response.body);
    } catch (error) {
      console.log(error);
    }
  };

  const onSubmitPollForm: SubmitHandler<CreatePollSubmittedValueType> = async (
    data
  ) => {
    setValue("questionSlug", urlSlug(data.question));
    const additionalQuestions = getValues("additionalQuestions").filter(
      (item) => item.question
    );
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
      return _.omit(o, ["id", "enabled", "label", "image"]);
    });
    dataToBeSubmitted.additionalQuestions = _.map(
      dataToBeSubmitted.additionalQuestions,
      function (o) {
        return _.omit(o, ["id", "questionLabel"]);
      }
    );

    try {
      const resp = await postSurvey(dataToBeSubmitted);
      setShareUrlDialog(true);
      setShareUrl(
        `${location.protocol}//${location.hostname}/answer/${
          (resp as any)?._id
        }/${(resp as any)?.questionSlug}`
      );
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
    const response = await http.service().post(`/poll`, data);

    return response;
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
