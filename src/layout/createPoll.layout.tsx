import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import React from "react";
import { ChildrenProps } from "../types";
import { Paper } from "@mui/material";
import Container from "@mui/material/Container";

const CreatePollLayout = ({ children }: ChildrenProps) => {
  return (
    <React.Fragment>
      <Container disableGutters>
        <CssBaseline />
        <Paper
          sx={{
            background: "rgb(31, 40, 62)",
            boxShadow: {
              xs: "none",
              sm: "rgba(52, 71, 103, 0.9) 0rem 0rem 0.0625rem 0.0625rem inset, rgba(0, 0, 0, 0.05) 0rem 1.25rem 1.6875rem 0rem",
            },
          }}
        >
          <Box sx={{ p: { xs: 0, sm: 2 } }}>{children}</Box>
        </Paper>
      </Container>
    </React.Fragment>
  );
};

export default CreatePollLayout;
