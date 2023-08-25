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
import { Divider, Paper } from "@mui/material";
import { useRouter } from "next/router";

const AnswerPollWrapper = () => {
  const router = useRouter();
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
              <AnswerPollFormWrapper />
            </Box>
          </Stack>

          <Button
            variant="contained"
            style={{ float: "right" }}
            type="submit"
            startIcon={<DoneOutlinedIcon />}
            onClick={submitHandler}
          >
            Submit
          </Button>
          <Button
            variant="outlined"
            style={{ float: "right", marginRight: "10px" }}
          >
            Reset
          </Button>
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
          <Button variant="outlined" onClick={handleClose}>
            Cancel
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
