import React from "react";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import uniqid from "uniqid";
import { ComponentInputProps, OptionProp } from "../../../types";

import Tooltip from "@mui/material/Tooltip";

export default function CheckboxTemplate({ fieldName }: ComponentInputProps) {
  const [options, setOptions] = React.useState([
    { id: uniqid(), label: "Option", value: "" },
  ]);
  const addOption = () => {
    const temp = { id: uniqid(), label: "Option", value: "" };
    setOptions([...options, temp]);
  };

  const deleteOption = (option: OptionProp, fieldName: string) => {
    setOptions(options.filter((item) => item.id != option.id));
  };
  return (
    <>
      <Box
        sx={{
          width: "100%",
          borderRadius: "4px",
          px: 1,
          py: 1,
          mr: "135px",
        }}
      >
        <Tooltip title="Add another choice" arrow placement="left">
          <Button
            size="small"
            sx={{ textTransform: "none" }}
            startIcon={<AddCircleOutlineIcon />}
            onClick={addOption}
            color="inherit"
            disabled={options.length >= 5}
          >
            Add
            <Box
              sx={{ display: { xs: "none", lg: "flex", paddingLeft: "5px" } }}
            >
              another
            </Box>
          </Button>
        </Tooltip>

        {options.map((item, index) => {
          return (
            <fieldset
              name={`${fieldName}.choices[${index}]`}
              style={{
                border: "none",
                margin: 0,
                padding: 0,
                display: "flex",
                flexDirection: "column",
              }}
              key={item.id}
            >
              <FormControl sx={{ my: 0.5, width: "100%" }} variant="outlined">
                <OutlinedInput
                  size="small"
                  margin="dense"
                  sx={{
                    borderRadius: "4px",
                  }}
                  className="input"
                  name={`${fieldName}.choices[${index}].choice`}
                  multiline
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="Delete Option"
                        edge="end"
                        sx={{ color: "#a1abc1" }}
                        onClick={() =>
                          deleteOption(
                            item,
                            `${fieldName}.choices[${index}].choice`
                          )
                        }
                        disabled={options.length === 1}
                      >
                        <DeleteOutlineIcon />
                      </IconButton>
                    </InputAdornment>
                  }
                  placeholder={`${item.label} ${index + 1}`}
                />
              </FormControl>
            </fieldset>
          );
        })}
      </Box>
    </>
  );
}
