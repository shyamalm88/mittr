import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import DoneOutlinedIcon from "@mui/icons-material/DoneOutlined";
import React from "react";
import AnswerPollFormWrapper from "./answerPollFormWrapper.component";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import { useRouter } from "next/router";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import StepWrapperProvider from "../../providers/stepWrapper.provider";
import { Divider, Typography, useTheme } from "@mui/material";
import Confetti from "react-confetti";
import { usePollQuestionContext } from "../../hooks/usePollQuestionContext";
// import { usePollAnswerContext } from "../../hooks/usePollAnswerContext";
import CheckmarkUtility from "../../utility/checkMark";
import { useMotionValue, motion } from "framer-motion";
import Subscribe from "../subscribe/Subscribe";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { toast } from "react-toastify";
import {
  AnswerPollSubmittedValueType,
  CreatePollSubmittedValueType,
} from "../../types";
import { FormProvider, useForm } from "react-hook-form";
import { checkValueAndValidity } from "../../utility/util";
import * as _ from "underscore";
import HttpService from "../../services/@http/HttpClient";

const AnswerPollWrapper = () => {
  let progress = useMotionValue(90);
  const http = new HttpService();
  const targetRef = React.useRef();
  const router = useRouter();
  const { index, slug } = router.query;
  const theme = useTheme();
  // let questionId = usePollQuestionContext("id");
  let additionalQuestionsLength = usePollQuestionContext(
    "additionalQuestions"
  )?.length;
  // let questionContext = usePollQuestionContext();

  const [activeIndex, setActiveIndex] = React.useState(-1);
  const [open, setOpen] = React.useState(false);
  const [submitted, setSubmitted] = React.useState(false);
  const [displaySubscribeOrSave, setDisplaySubscribeOrSave] =
    React.useState(false);

  React.useEffect(() => {
    if (open) {
      setTimeout(() => {
        setDisplaySubscribeOrSave(true);
      }, 4000);
    }
  }, [open]);

  const handleClose = () => {
    setOpen(false);
  };
  const handleViewAnalytics = () => {
    handleClose();
    router.push("/viewAnalytics/" + index + "/" + slug);
  };
  const submitHandler = async (data: any) => {
    if (
      checkValueAndValidity(
        activeIndex,
        getValues,
        _,
        toast,
        setActiveIndex,
        true
      )
    ) {
      console.log(data);
      try {
        const resp = http.post("/answer", data);
        console.log(resp);
        setDisplaySubscribeOrSave(true);
      } catch (err) {
        console.log(err);
      }
    }
  };

  const nextHandler = async () => {
    checkValueAndValidity(
      activeIndex,
      getValues,
      _,
      toast,
      setActiveIndex,
      false
    );
  };
  const prevHandler = () => {
    setActiveIndex((prev) => prev - 1);
  };

  const resetHandler = () => {
    setActiveIndex(-1);
  };

  const methods = useForm<AnswerPollSubmittedValueType>({
    defaultValues: {
      selectedPrimaryQuestionOption: "",
      selectedPrimaryQuestionId: "",
      additionalQuestionsAnswers: [],
      answeredByUserRef: "",
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

  return (
    <>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(submitHandler)}>
          <Card
            variant="outlined"
            sx={{
              p: 2,
              borderRadius: "4px",
              borderTopColor: theme.palette.primary.main,
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
              <Box
                sx={{
                  display: "flex",
                  width: "100%",
                  borderRadius: "4px",
                }}
              >
                <StepWrapperProvider activeIndex={activeIndex}>
                  <AnswerPollFormWrapper />
                </StepWrapperProvider>
              </Box>
            </Stack>
            <Divider
              sx={{
                mb: 2,
                borderBottomWidth: 0,
              }}
            />

            <Button
              variant="contained"
              sx={{
                float: { xs: "none", sm: "right" },
                marginRight: "10px",
                width: { xs: "100%", sm: "auto" },
                mt: { xs: 2, sm: 0 },
              }}
              startIcon={<DoneOutlinedIcon />}
              disabled={
                additionalQuestionsLength > activeIndex + 1 && !submitted
              }
              type="submit"
            >
              Submit
            </Button>

            <Button
              variant="contained"
              sx={{
                float: { xs: "none", sm: "right" },
                marginRight: "10px",
                width: { xs: "100%", sm: "auto" },
                mt: { xs: 2, sm: 0 },
              }}
              endIcon={<ArrowForwardIosIcon />}
              onClick={nextHandler}
              disabled={
                additionalQuestionsLength <= activeIndex + 1 || submitted
              }
            >
              Next
            </Button>

            <Button
              variant="outlined"
              startIcon={<ArrowBackIosIcon />}
              sx={{
                float: { xs: "none", sm: "right" },
                marginRight: "10px",
                width: { xs: "100%", sm: "auto" },
                mt: { xs: 2, sm: 0 },
              }}
              onClick={prevHandler}
              disabled={activeIndex === -1}
            >
              Prev
            </Button>
            <Button
              variant="outlined"
              sx={{
                float: { xs: "none", sm: "left" },
                width: { xs: "100%", sm: "auto" },
                ml: { xs: "0px", sm: "15px" },
                mt: { xs: 2, sm: 0 },
                color: (theme) => theme.palette.grey[500],
                borderColor: (theme) => theme.palette.grey[500],
                "&:hover": {
                  color: (theme) => theme.palette.grey[400],
                  borderColor: (theme) => theme.palette.grey[400],
                },
              }}
              onClick={resetHandler}
              startIcon={<RestartAltIcon />}
            >
              Reset
            </Button>
          </Card>
        </form>
      </FormProvider>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
        disableEscapeKeyDown
        fullWidth
        maxWidth="md"
      >
        <DialogTitle
          id="scroll-dialog-title"
          sx={{ color: (theme) => theme.palette.primary.main }}
        >
          {displaySubscribeOrSave ? "Subscribe" : "Success"}
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <Divider />
        <DialogContent>
          {displaySubscribeOrSave ? (
            <Subscribe />
          ) : (
            <Box sx={{ m: 2 }} ref={targetRef}>
              <Confetti width={900} height={445} recycle={true} />
              <Typography textAlign="center" sx={{ m: 3 }}>
                You have submitted the Answer
              </Typography>
              <motion.div
                initial={{ x: 0 }}
                animate={{ x: 100 }}
                style={{ x: progress }}
                transition={{ duration: 1 }}
              />
              <CheckmarkUtility progress={progress} />
            </Box>
          )}
        </DialogContent>
        {displaySubscribeOrSave && (
          <DialogActions>
            <Button
              variant="outlined"
              onClick={handleClose}
              startIcon={<ArrowBackOutlinedIcon />}
            >
              Back To Home
            </Button>
            <Button
              variant="contained"
              onClick={handleViewAnalytics}
              startIcon={<BarChartOutlinedIcon />}
            >
              View Analytics
            </Button>
          </DialogActions>
        )}
      </Dialog>
    </>
  );
};

export default AnswerPollWrapper;
