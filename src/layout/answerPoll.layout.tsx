import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import React from "react";
import { ChildrenProps } from "../types";
import { Paper } from "@mui/material";
import Container from "@mui/material/Container";

const AnswerPollLayout = ({ children }: ChildrenProps) => {
  return (
    <React.Fragment>
      <Container maxWidth="xl">
        <CssBaseline />
        <Paper
          sx={{
            boxShadow: {
              xs: "none",
            },
          }}
          className="paper"
        >
          <Box sx={{ p: { xs: 0, sm: 2 } }}>{children}</Box>
        </Paper>
      </Container>
    </React.Fragment>
  );
};

export default AnswerPollLayout;
