import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import React from "react";
import AnalyticsPollView from "./analyticsPollView.component";
import Divider from "@mui/material/Divider";
import DefaultAnalyticsPollWrapper from "./defaultAnalyticsPollWrapper.component";
import { ComponentInputProps } from "../../types";
import { useAuthenticatedUserData } from "../../hooks/useAuthenticatedUserDataContext";
import { usePollAnalyticsContext } from "../../hooks/usePollAnalyticsContext";

const AnalyticsPollWrapper = ({
  lineData,
  pieData,
  geoData,
}: ComponentInputProps) => {
  const { authenticatedUser } = useAuthenticatedUserData();
  const { questionID } = usePollAnalyticsContext();
  return (
    <>
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
            <AnalyticsPollView />
          </Box>
        </Stack>
      </Card>
      {console.log(authenticatedUser)}
      {console.log(questionID.createdByUserRef)}
      {authenticatedUser &&
        authenticatedUser.id === questionID.createdByUserRef._id && (
          <>
            <Divider sx={{ mt: 3 }} textAlign="left">
              Poll Performance
            </Divider>
            <DefaultAnalyticsPollWrapper
              lineData={lineData}
              pieData={pieData}
              geoData={geoData}
            />
          </>
        )}
    </>
  );
};

export default AnalyticsPollWrapper;
