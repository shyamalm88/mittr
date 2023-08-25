import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import React from "react";
import AnalyticsPollView from "./analyticsPollView.component";

import DefaultAnalyticsPollWrapper from "./defaultAnalyticsPollWrapper.component";
import CustomAnalyticsPollWrapper from "./customAnalyticsPollWrapper.component";
import Analyzer from "./analyze/analyzer.component";

const AnalyticsPollWrapper = () => {
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

      <Analyzer />
      <DefaultAnalyticsPollWrapper />
      {/* <CustomAnalyticsPollWrapper /> */}
    </>
  );
};

export default AnalyticsPollWrapper;
