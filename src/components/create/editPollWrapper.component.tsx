import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import dynamic from "next/dynamic";
const PollFormWrapper = dynamic(
  () => import("./poll/createPollFormWrapper.component")
);

import React from "react";

import { usePollOrSurveyContext } from "../../hooks/usePollOrSurveyContext";
import { usePollEditData } from "../../hooks/usePollEditDataContext";
import { ComponentInputProps } from "../../types";

const EditPollWrapper = ({ pollEditContextData }: ComponentInputProps) => {
  const { pollOrSurvey } = usePollOrSurveyContext();
  const { setPollEditData } = usePollEditData();

  const [_, setPollOrSurveySwitch] = React.useState(pollOrSurvey);

  React.useEffect(() => {
    setPollOrSurveySwitch(pollOrSurvey);
  }, [pollOrSurvey]);

  React.useEffect(() => {
    console.log(pollEditContextData);
    setPollEditData(pollEditContextData);
  }, [pollEditContextData, setPollEditData]);

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
            width: "100%",
            borderRadius: "4px",
          }}
        >
          <PollFormWrapper />
        </Box>
      </Stack>
    </Card>
  );
};

export default EditPollWrapper;
