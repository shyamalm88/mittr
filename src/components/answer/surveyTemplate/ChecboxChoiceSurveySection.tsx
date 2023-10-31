import React from "react";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import { ComponentInputProps } from "../../../types";
import { Box, Checkbox, Typography } from "@mui/material";

function CheckBoxChoiceSurveySection({ selectedValue }: ComponentInputProps) {
  return (
    <>
      <Typography component="div" variant="h6">
        {selectedValue.question}
      </Typography>
      <Box sx={{ p: 3 }}>
        {selectedValue?.options?.map((item: any, index: number) => {
          const fieldName = `options[${index}]`;
          return (
            <FormControl
              sx={{ mb: 1, width: "100%" }}
              variant="outlined"
              key={index}
            >
              <fieldset
                name={fieldName}
                style={{
                  border: "none",
                  margin: 0,
                  padding: 0,
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <FormControlLabel
                  value={item.option}
                  control={<Checkbox id={item._id} />}
                  label={item.choice}
                />
              </fieldset>
            </FormControl>
          );
        })}
      </Box>
    </>
  );
}

export default CheckBoxChoiceSurveySection;