import React from "react";
import Box from "@mui/material/Box";
import { Divider, Link, Stack, Typography } from "@mui/material";
import PollOutlinedIcon from "@mui/icons-material/PollOutlined";
import useMediaQuery from "@mui/material/useMediaQuery";

const MyRecentCreatedPollTemplate = () => {
  const mobileView = useMediaQuery("(max-width:767px)");
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
      <Typography variant="body2" component="h2">
        Recently Created
      </Typography>
      <Divider sx={{ my: 1 }} />
      <Typography variant="body2" component="h2">
        <small>
          <Link href="#" underline="hover" color="rgb(129, 140, 248)">
            If you could go for a coffee with a figure from history, who would
            it be?
          </Link>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            gap={0.3}
            sx={{ color: "rgb(156, 163, 175)" }}
          >
            <Stack direction="row">
              <PollOutlinedIcon fontSize="small" color="inherit" />
              <Typography variant="caption" component="p">
                19 Contributions
              </Typography>
            </Stack>
            <Link href="#" underline="hover" color="rgb(129, 140, 248)">
              view
            </Link>
          </Stack>
        </small>
      </Typography>
      <Divider sx={{ my: 1 }} />
      <Typography variant="body2" component="h2">
        <small>
          <Link href="#" underline="hover" color="rgb(129, 140, 248)">
            If you could go for a coffee with a figure from history, who would
            it be?
          </Link>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            gap={0.3}
            sx={{ color: "rgb(156, 163, 175)" }}
          >
            <Stack direction="row">
              <PollOutlinedIcon fontSize="small" color="inherit" />
              <Typography variant="caption" component="p">
                5 Contributions
              </Typography>
            </Stack>
            <Link href="#" underline="hover" color="rgb(129, 140, 248)">
              view
            </Link>
          </Stack>
        </small>
      </Typography>
      <Divider sx={{ my: 1 }} />
      <Typography variant="body2" component="h2">
        <small>
          <Link href="#" underline="hover" color="rgb(129, 140, 248)">
            If you could go for a coffee with a figure from history, who would
            it be?
          </Link>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            gap={0.3}
            sx={{ color: "rgb(156, 163, 175)" }}
          >
            <Stack direction="row">
              <PollOutlinedIcon fontSize="small" color="inherit" />
              <Typography variant="caption" component="p">
                9 Contributions
              </Typography>
            </Stack>
            <Link href="#" underline="hover" color="rgb(129, 140, 248)">
              view
            </Link>
          </Stack>
        </small>
      </Typography>
    </Box>
  );
};

export default MyRecentCreatedPollTemplate;
