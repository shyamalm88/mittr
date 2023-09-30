import React from "react";
import { Divider, Link, Stack, Typography } from "@mui/material";
import PollOutlinedIcon from "@mui/icons-material/PollOutlined";

function RecentPollList() {
  return (
    <>
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
    </>
  );
}

export default RecentPollList;
