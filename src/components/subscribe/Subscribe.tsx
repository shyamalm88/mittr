import React from "react";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { Typography } from "@mui/material";
import NotificationsActiveOutlinedIcon from "@mui/icons-material/NotificationsActiveOutlined";
import Image from "next/image";
// import Bell from "./../../images/svg/Bell.svg";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

function Subscribe() {
  const theme = useTheme();
  const smallScreen = useMediaQuery(theme.breakpoints.up("sm"));
  return (
    <Box sx={{ m: 2, textAlign: "center" }}>
      <Box className="bell">
        {/* <Image
          src={Bell}
          width={60}
          height={60}
          sizes="100vw"
          style={{ marginRight: "10px" }}
          alt="Mittr Logo"
        /> */}
      </Box>

      <Box sx={{ m: 2 }}>
        <Typography component="h3" sx={{ mb: 1 }} variant="h5">
          Subscribe to this Poll
        </Typography>
        <Typography variant="body1" component="p" sx={{ mb: 5 }}>
          To stay informed about the latest developments concerning this poll,
          kindly provide your email address. This will allow you to receive
          daily updates and stay connected with the poll.
        </Typography>
      </Box>
      <Box sx={{ m: 2 }}>
        <Stack direction={smallScreen ? "row" : "column"} spacing={2}>
          <TextField id="" label="Please Enter Your Email" fullWidth />
          <Button
            variant="contained"
            color="info"
            startIcon={<NotificationsActiveOutlinedIcon />}
            sx={{ minWidth: "150px" }}
          >
            Subscribe
          </Button>
        </Stack>
      </Box>
    </Box>
  );
}

export default Subscribe;
