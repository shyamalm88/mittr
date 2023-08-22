import Card from "@mui/material/Card";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import React from "react";
import AnswerPollFormWrapper from "./answerPollFormWrapper.component";

const AnswerPollWrapper = () => {
  // const submitHandler = (e: any) => {
  //   e.preventDefault();
  //   contextValue.submit();
  // };

  return (
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
    </Box>
  );
};

export default AnswerPollWrapper;
