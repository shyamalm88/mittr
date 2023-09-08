import Card from "@mui/material/Card";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import PollFormWrapper from "./pollFormWrapper.component";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import React from "react";
import urlSlug from "url-slug";

import { usePollCreationContext } from "../../hooks/usePollCreationContext";
import HttpService from "../../hooks/@http/HttpClient";
import { useSubmitStatusContext } from "../../hooks/useSubmitStatusContext";

const CreatePollWrapper = () => {
  const http = new HttpService();
  const { setError, setSuccess, setMessage } = useSubmitStatusContext();
  const contextValue = usePollCreationContext();

  const stringToColor = (string: string) => {
    let hash = 0;
    let i;

    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = "#";

    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }

    return color;
  };
  const stringAvatar = (name: string) => {
    return {
      sx: {
        bgcolor: stringToColor(name),
      },
      children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
    };
  };

  const submitHandler = (e: any) => {
    e.preventDefault();
    const createPollFormValue = contextValue;
    const tempObj = createPollFormValue;
    tempObj.questionSlug = urlSlug(tempObj.question);
    tempObj.surveyType = "poll";
    const res = postSurvey(tempObj);
    res
      .then((data) => {
        console.log("responseData", data);
        setMessage("Successfully Created Survey");
        setSuccess("success");
      })
      .catch((err) => {
        console.log(err);
        setMessage(`Error while saving Survey ${err.message}`);
        setError("error");
      });
  };

  const postSurvey = async (data: any) => {
    const response = await http.service().post(`/survey`, data);
    return response;
  };

  return (
    <Box component="form" onSubmit={submitHandler}>
      <Card
        variant="outlined"
        sx={{
          p: 2,
          borderRadius: "4px",
          borderTopColor: (theme) => theme.palette.primary.main,
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
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            <Avatar {...stringAvatar("Arghya Majumder")} />
          </Box>
          <Box
            sx={{
              display: "flex",
              width: "100%",
              borderRadius: "4px",
            }}
          >
            <PollFormWrapper />
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

export default CreatePollWrapper;
