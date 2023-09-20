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
import Tooltip from "@mui/material/Tooltip";

export default function RadioTemplate({ fieldName }: ComponentInputProps) {
  const contextValue = usePollCreationContext();
  const [radioOption, setRadioOption] = React.useState([]);
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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index: number
  ) => {
    const val = (e.target as HTMLInputElement).value;
    setRadioOption((prevOptions) => {
      const result: any = [...prevOptions];
      result[index] = (val as any).replace(/[%{}\[\]<>~`\\$'"]/g, "");
      return result;
    });
    e.target.value = e.target.value.replace(/[%{}\[\]<>~`\\$'"]/g, "");
    contextValue.handleChange(e);
  };

  return (
    <>
      <Box
        sx={{
          width: "100%",
          borderRadius: "4px",
          px: 1,
          py: 1,
          mr: { xs: "0", md: "135px" },
        }}
      >
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
                  autoFocus
                  value={radioOption[index]}
                  onChange={(e) => handleChange(e, index)}
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
        <Tooltip title="Add another choice" arrow placement="left">
          <Button
            size="small"
            sx={{ textTransform: "none" }}
            startIcon={<AddCircleOutlineIcon />}
            onClick={addOption}
            color="info"
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
      </Box>
    </>
  );
}
