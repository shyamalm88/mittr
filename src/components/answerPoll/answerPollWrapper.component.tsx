import Card from "@mui/material/Card";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import DoneOutlinedIcon from "@mui/icons-material/DoneOutlined";
import React from "react";
import AnswerPollFormWrapper from "./answerPollFormWrapper.component";
import Dialog, { DialogProps } from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { CheckmarkUtility } from "../utility/checkMark";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import { Particles } from "../utility/Particle";
import { useRouter } from "next/router";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import StepWrapperProvider from "../../providers/stepWrapper.provider";
import { usePollQuestionContext } from "../../hooks/usePollQuestionContext";
import { Divider, useTheme } from "@mui/material";

const AnswerPollWrapper = () => {
  const router = useRouter();
  const theme = useTheme();
  const additionalQuestionsLength = usePollQuestionContext(
    "additionalQuestions"
  ).length;
  const [activeIndex, setActiveIndex] = React.useState(-1);
  const [open, setOpen] = React.useState(false);
  const [particles, setParticles] = React.useState([1, 2]);
  const handleClose = () => {
    setOpen(false);
  };
  const handleViewAnalytics = () => {
    handleClose();
    router.push("/viewAnalytics");
  };
  const submitHandler = (e: any) => {
    e.preventDefault();
    // contextValue.submit();
    setOpen(true);
  };

  const nextHandler = () => {
    setActiveIndex((prev) => prev + 1);
  };
  const prevHandler = () => {
    setActiveIndex((prev) => prev - 1);
  };

  const resetHandler = () => {
    setActiveIndex(-1);
  };

  return (
    <>
      <Box component="form">
        <Card
          variant="outlined"
          sx={{
            p: 2,
            borderRadius: "4px",
            borderTopColor: (theme: any) => theme.palette.primary.main,
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
          {additionalQuestionsLength === activeIndex + 1 ? (
            <>
              <Button
                variant="contained"
                sx={{ float: "right" }}
                startIcon={<DoneOutlinedIcon />}
                onClick={submitHandler}
              >
                Submit
              </Button>
              <Button
                variant="outlined"
                sx={{ float: "right", marginRight: "10px" }}
                startIcon={<ArrowBackIosIcon />}
                onClick={prevHandler}
              >
                Prev
              </Button>
              <Button
                variant="outlined"
                sx={{
                  float: "left",
                  ml: "15px",
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
            </>
          ) : (
            <>
              <Button
                variant="contained"
                sx={{ float: "right" }}
                endIcon={<ArrowForwardIosIcon />}
                onClick={nextHandler}
              >
                Next
              </Button>
              <Button
                variant="outlined"
                startIcon={<ArrowBackIosIcon />}
                sx={{ float: "right", marginRight: "10px" }}
                onClick={prevHandler}
                disabled={activeIndex === -1}
              >
                Prev
              </Button>
              <Button
                variant="outlined"
                sx={{
                  float: "left",
                  ml: "15px",
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
            </>
          )}
        </Card>
      </Box>
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
          Success
        </DialogTitle>
        <DialogContent>
          <Box sx={{ m: 2 }}>
            {particles.map((_: any, index: number) => (
              <Particles key={index} count={Math.floor(1000 / 10)} />
            ))}
            <CheckmarkUtility size="144px" />
          </Box>
        </DialogContent>
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
      </Dialog>
    </>
  );
};

export default AnswerPollWrapper;
