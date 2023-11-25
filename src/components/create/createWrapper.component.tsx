import Card from "@mui/material/Card";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import dynamic from "next/dynamic";
const PollFormWrapper = dynamic(
  () => import("./poll/createPollFormWrapper.component")
);

const SurveyFormWrapper = dynamic(
  () => import("./survey/createSurveyFormWrapper.component")
);

import React from "react";

import PollOrSurveyOptionChoose from "./pollOrSurveyOptionChoose";
import { usePollOrSurveyContext } from "../../hooks/usePollOrSurveyContext";

const CreatePollWrapper = () => {
  const { pollOrSurvey } = usePollOrSurveyContext();
  const [pollOrSurveySwitch, setPollOrSurveySwitch] =
    React.useState(pollOrSurvey);

  React.useEffect(() => {
    setPollOrSurveySwitch(pollOrSurvey);
  }, [pollOrSurvey]);

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

  return (
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
        spacing={{ xs: 0, sm: 2 }}
        sx={{ display: "flex" }}
      >
        <Box
          sx={{
            display: { xs: "none", sm: "flex", justifyContent: "center" },
          }}
        >
          <Stack
            direction={"column"}
            spacing={2}
            useFlexGap
            alignItems={"center"}
          >
            <Avatar {...stringAvatar("Arghya Majumder")} />
            <PollOrSurveyOptionChoose />
          </Stack>
        </Box>
        <Box
          sx={{
            width: "100%",
            borderRadius: "4px",
          }}
        >
          {pollOrSurveySwitch == "poll" ? (
            <PollFormWrapper />
          ) : (
            <SurveyFormWrapper />
          )}
        </Box>
      </Stack>
    </Card>
  );
};

export default CreatePollWrapper;
