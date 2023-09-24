import React from "react";
import { ComponentInputProps } from "../types";
import FormHelperText from "@mui/material/FormHelperText";
import Alert from "@mui/material/Alert";
import { useTheme } from "@mui/material";

function FormValidationError({ errorText }: ComponentInputProps) {
  const theme = useTheme();
  return (
    <FormHelperText error component="div" sx={{ mx: 0, py: 0 }}>
      {errorText && (
        <Alert
          severity="error"
          variant="standard"
          sx={{
            py: 0,
            border: "1px solid #f44336",
            backgroundColor:
              theme.palette.mode === "dark" ? "#271622" : "rgb(253, 237, 237)",
          }}
        >
          {errorText}
        </Alert>
      )}
    </FormHelperText>
  );
}

export default FormValidationError;
