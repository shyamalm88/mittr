import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import React from "react";
import { ChildrenProps } from "../types";
import { Paper } from "@mui/material";
import Container from "@mui/material/Container";

const AnswerPollLayout = ({ children }: ChildrenProps) => {
  return (
    <React.Fragment>
      <Container maxWidth="md">
        <CssBaseline />
        <Paper
          sx={{
            minHeight: "100vh",
            boxShadow: {
              xs: "none",
              sm: "0px 3px 3px -2px rgba(0,0,0,0.2),0px 3px 4px 0px rgba(0,0,0,0.14),0px 1px 8px 0px rgba(0,0,0,0.12)",
            },
          }}
          square
        >
          <Box sx={{ p: { xs: 0, sm: 2 } }}>{children}</Box>
        </Paper>
      </Container>
    </React.Fragment>
  );
};

export default AnswerPollLayout;
