import React from "react";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import { ComponentInputProps } from "../../../types";
import { Box, Typography } from "@mui/material";
import he from "he";

function MultipleChoiceSurveySection({ selectedValue }: ComponentInputProps) {
  return (
    <>
      <Typography
        component="div"
        variant="body1"
        dangerouslySetInnerHTML={{
          __html: he
            .decode(selectedValue.question)
            .replace(/(<p[^>]+?>|<p>|<\/p>)/gim, ""),
        }}
      ></Typography>
      <Box sx={{ p: 3 }}>
        <RadioGroup
          aria-labelledby="demo-radio-buttons-group-label"
          name="selectedOption"
          className="answer"
        >
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
                    control={<Radio id={item._id} />}
                    label={item.option}
                  />
                </fieldset>
              </FormControl>
            );
          })}
        </RadioGroup>
      </Box>
    </>
  );
}

export default MultipleChoiceSurveySection;
