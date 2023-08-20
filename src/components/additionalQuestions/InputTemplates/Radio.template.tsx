import React from "react";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { v4 as uuidv4 } from "uuid";
import { ComponentInputProps, OptionProp } from "../../../types";
import { usePollCreationContext } from "../../../hooks/usePollCreationContext";

export default function RadioTemplate({ fieldName }: ComponentInputProps) {
  const contextValue = usePollCreationContext();
  const [options, setOptions] = React.useState([
    { id: uuidv4(), label: "Option", value: "" },
  ]);
  const addOption = () => {
    const temp = { id: uuidv4(), label: "Option", value: "" };
    setOptions([...options, temp]);
  };

  const deleteOption = (option: OptionProp, fieldName: string) => {
    setOptions(options.filter((item) => item.id != option.id));
    contextValue.handleDeleteFromList(fieldName);
  };
  return (
    <>
      <Box
        sx={{
          width: "100%",
          border: "1px solid rgba(52, 71, 103, 0.9)",
          borderRadius: "4px",
          px: 2,
          py: 1,
          mr: "135px",
        }}
      >
        <Button
          size="small"
          sx={{ textTransform: "none" }}
          startIcon={<AddCircleOutlineIcon />}
          onClick={addOption}
        >
          Add
          <Box sx={{ display: { xs: "none", lg: "flex", paddingLeft: "5px" } }}>
            another choice
          </Box>
        </Button>
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
                    background: "rgb(55, 65, 81)",
                    borderRadius: "4px",
                  }}
                  name={`${fieldName}.choices[${index}].choice`}
                  multiline
                  onChange={(e) => contextValue.handleChange(e)}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="Delete Option"
                        edge="end"
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
