import React from "react";
import Box from "@mui/material/Box";
import { Divider, Typography } from "@mui/material";
import TrendingTopics from "./trendingTopics";

function RecentTemplate() {
  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        mb: 2,
        display: { xs: "none", sm: "none", lg: "block" },
      }}
      className="sideNav"
    >
      <Typography variant="body1" component="h2" sx={{ fontWeight: 500 }}>
        Trending Topics
      </Typography>
      <Divider sx={{ mt: 1 }} />
      <nav aria-label="main mailbox folders">
        <TrendingTopics />
      </nav>
    </Box>
  );
}

export default RecentTemplate;
