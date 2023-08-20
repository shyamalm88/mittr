import Card from "@mui/material/Card";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import PollFormWrapper from "./pollFormWrapper.component";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import React from "react";
import { usePollCreationContext } from "../../hooks/usePollCreationContext";

const CreatePollWrapper = () => {
  const contextValue = usePollCreationContext();

  const stringToColor = (string: string) => {
    let hash = 0;
    let i;

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = "#";

    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */

    return color;
  };
  const stringAvatar = (name: string) => {
    return {
      sx: {
        bgcolor: stringToColor(name),
      },
      children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
    };
  };

  const submitHandler = (e: any) => {
    e.preventDefault();
    contextValue.submit();
  };

  return (
    <Box component="form" onSubmit={submitHandler}>
      <Card
        variant="outlined"
        sx={{
          backgroundColor: "rgb(31, 40, 62)",
          border: "1px solid #233149",
          boxShadow:
            "0px 3px 3px -2px rgba(0,0,0,0.2),0px 3px 4px 0px rgba(0,0,0,0.14),0px 1px 8px 0px rgba(0,0,0,0.12)",
          p: 2,
          borderRadius: "4px",
          borderTop: "2px solid #ffc107",
        }}
      >
        <Stack
          direction="row"
          spacing={{ xs: 0, sm: 2, md: 4 }}
          sx={{ display: "flex" }}
        >
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            <Avatar {...stringAvatar("Arghya Majumder")} />
          </Box>
          <Box
            sx={{
              display: "flex",
              width: "100%",
              borderRadius: "4px",
            }}
          >
            <PollFormWrapper />
          </Box>
        </Stack>

        <Button
          variant="contained"
          style={{ float: "right" }}
          type="submit"
          startIcon={<SendIcon />}
        >
          Create
        </Button>
        <Button
          variant="outlined"
          style={{ float: "right", marginRight: "10px" }}
        >
          Cancel
        </Button>
      </Card>
    </Box>
  );
};

export default CreatePollWrapper;
