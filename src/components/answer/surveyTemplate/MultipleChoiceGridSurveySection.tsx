import React from "react";
import {
  Typography,
  Box,
  RadioGroup,
  FormControl,
  FormControlLabel,
  Radio,
} from "@mui/material";
import { ComponentInputProps } from "../../../types";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

function MultipleChoiceGridSurveySection({
  selectedValue,
}: ComponentInputProps) {
  return (
    <>
      <Typography component="div" variant="h6">
        {selectedValue.question}
      </Typography>
      <Box sx={{ width: "100%", p: 2 }}>
        {selectedValue?.options.map((item: any) => {
          console.log(item);
          return (
            <div
              className="tableWithGrid"
              key={item.label}
              style={{
                gridTemplateColumns: `repeat(${
                  item?.columns?.length + 1
                }, 1fr)`,
              }}
            >
              <div className="tableHeader">&nbsp;</div>
              {item.columns.map((itm: any) => {
                return (
                  <div key={itm.option} className="tableHeader">
                    <Typography
                      variant="body1"
                      color="inherit"
                      align="center"
                      component="strong"
                    >
                      {itm.option}
                    </Typography>
                  </div>
                );
              })}

              {item.rows.map((itm: any) => {
                return (
                  <RadioGroup name="selectedOption" key={itm.option}>
                    <div className="tableHeader">
                      <strong>{itm.option}</strong>
                    </div>
                    {item.columns.map((itm: any) => {
                      return (
                        <div key={itm.option}>
                          <FormControl
                            sx={{
                              mb: 1,
                              width: "100%",
                            }}
                            variant="outlined"
                          >
                            <fieldset
                              style={{
                                border: "none",
                                margin: "0 auto",
                                padding: 0,
                                display: "block",
                              }}
                            >
                              <FormControlLabel
                                value={itm.option}
                                control={<Radio id={item._id} />}
                                label={""}
                                labelPlacement="top"
                              />
                            </fieldset>
                          </FormControl>
                        </div>
                      );
                    })}
                  </RadioGroup>
                );
              })}
            </div>
          );
        })}
      </Box>
    </>
  );
}

export default MultipleChoiceGridSurveySection;
