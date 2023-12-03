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
import { useAuthenticatedUserData } from "../../hooks/useAuthenticatedUserDataContext";
import { green } from "@mui/material/colors";
import Image from "next/image";
import NoProfileImage from "./../../images/img/noProfileImage.png";

const CreatePollWrapper = () => {
  const { pollOrSurvey } = usePollOrSurveyContext();
  const { authenticatedUser, setAuthenticatedUser } =
    useAuthenticatedUserData();
  const [pollOrSurveySwitch, setPollOrSurveySwitch] =
    React.useState(pollOrSurvey);

  React.useEffect(() => {
    setPollOrSurveySwitch(pollOrSurvey);
  }, [pollOrSurvey]);

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
            {authenticatedUser?.user?.profileImgUrl ? (
              <Avatar
                variant="circular"
                alt={authenticatedUser?.user?.fullName}
                sx={{
                  width: 48,
                  height: 48,
                  backgroundColor: green[500],
                }}
                src={authenticatedUser?.user?.profileImgUrl}
              />
            ) : (
              <Image
                src={NoProfileImage}
                alt="noImage"
                width={48}
                height={48}
              />
            )}

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
