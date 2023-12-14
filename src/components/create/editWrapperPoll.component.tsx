import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import dynamic from "next/dynamic";
const PollFormWrapper = dynamic(
  () => import("./poll/createPollFormWrapper.component")
);
const SurveyFormWrapper = dynamic(
  () => import("./survey/createSurveyFormWrapper.component")
);
import { useRouter } from "next/router";

import React, { Suspense } from "react";

import { usePollOrSurveyContext } from "../../hooks/usePollOrSurveyContext";
import { useEditDataContext } from "../../hooks/useEditDataContext";
import { ComponentInputProps } from "../../types";

const EditWrapperPoll = ({ editContextData }: ComponentInputProps) => {
  const { pollOrSurvey, setPollOrSurvey } = usePollOrSurveyContext();
  const { setEditableData } = useEditDataContext();
  const { asPath, isReady } = useRouter();

  React.useEffect(() => {
    if (!isReady) return;
    if (asPath.includes("edit/survey")) {
      setPollOrSurvey("survey");
    }
  }, [asPath, setPollOrSurvey, isReady]);

  const [_, setPollOrSurveySwitch] = React.useState(pollOrSurvey);

  React.useEffect(() => {
    setPollOrSurveySwitch(pollOrSurvey);
  }, [pollOrSurvey]);

  React.useEffect(() => {
    // // console.log(editContextData);
    setEditableData(editContextData);
  }, [editContextData, setEditableData]);

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

export default EditWrapperPoll;
