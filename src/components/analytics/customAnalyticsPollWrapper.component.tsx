import { Card, Divider, Stack, Typography } from "@mui/material";
import React from "react";
import Analyzer from "./analyze/analyzer.component";

function CustomAnalyticsPollWrapper() {
  return (
    <Stack
      spacing={{ xs: 1, sm: 2 }}
      direction="row"
      useFlexGap
      flexWrap="wrap"
      justifyContent="space-between"
    >
      <Analyzer />
      <Card
        variant="elevation"
        sx={{
          p: 2,
          my: 2,
          borderRadius: "4px",
          flex: 3,
        }}
        className="card"
      >
        ascvbcvdad
      </Card>
    </Stack>
  );
}

export default CustomAnalyticsPollWrapper;
