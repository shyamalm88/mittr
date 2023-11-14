import React from "react";
import Box from "@mui/material/Box";
import { Typography, Divider } from "@mui/material";

import RecentPollList from "./recentPollList";
import { ComponentInputProps } from "../../../types";

const MyRecentCreatedPollTemplate = () => {
  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        mb: 2,
        display: { xs: "none", sm: "none", lg: "block" },
      }}
    >
      <Divider sx={{ my: 1 }} />
      <RecentPollList />
    </Box>
  );
};

export default MyRecentCreatedPollTemplate;
