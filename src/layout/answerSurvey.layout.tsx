import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import React from "react";
import { ChildrenProps } from "../types";
import { Paper } from "@mui/material";
import Container from "@mui/material/Container";

const AnswerSurveyLayout = ({ children }: ChildrenProps) => {
  return (
    <React.Fragment>
      <Container maxWidth="lg">
        <CssBaseline />
        <Box sx={{ p: { xs: 0, sm: 2 } }}>{children}</Box>
      </Container>
    </React.Fragment>
  );
};

export default AnswerSurveyLayout;
