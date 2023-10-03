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
import Tooltip from "@mui/material/Tooltip";
import { useFormContext, useFieldArray } from "react-hook-form";
import FormHelperText from "@mui/material/FormHelperText";
import FormValidationError from "../../../utility/FormValidationError";

const choices = [{ id: uuidv4(), label: "Choice" }];

export default function RadioTemplate({
  fieldName,
  index: idx,
}: ComponentInputProps) {
  const {
    register,
    setValue,
    unregister,
    control,
    getValues,
    formState: { errors, dirtyFields, touchedFields, isSubmitted },
  } = useFormContext();
  const { fields, append, prepend, remove, swap, move, insert } = useFieldArray(
    {
      control,
      name: `${fieldName}.choices`,
    }
  );
  const [radioOption, setRadioOption] = React.useState([]);

  const addOption = () => {
    const temp = { id: uuidv4(), label: "Choice" };
    append(temp);
  };

  const deleteOption = (index: number) => {
    remove(index);
  };

  React.useEffect(() => {
    if (fields.length === 0) append(choices);
  }, [fields.length, append]);

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
        {fields.map((item: any, index) => {
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
                  error={
                    !!(errors as any)?.additionalQuestions?.[idx]?.choices?.[
                      index
                    ]?.choice?.message
                  }
                  {...register(
                    `${fieldName}.choices[${index}].choice` as const,
                    {
                      required: "Please provide Choice Value",
                      pattern: {
                        value: /^[a-zA-Z0-9 .,?!@#$%^&*()_+-=;:'"|\\]*$/,
                        message: `Please enter a valid text. Only few special characters allowed. ">", "\`", "~", "{", "}", "[", "]", "'", "\"" are not allowed`,
                      },
                    }
                  )}
                  multiline
                  autoFocus
                  value={radioOption[index]}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="Delete Option"
                        edge="end"
                        sx={{ color: "#a1abc1" }}
                        onClick={() => deleteOption(index)}
                        disabled={fields.length === 1}
                      >
                        <DeleteOutlineIcon />
                      </IconButton>
                    </InputAdornment>
                  }
                  placeholder={`${item.label} ${index + 1}`}
                />
                <FormValidationError
                  errorText={
                    (errors as any)?.additionalQuestions?.[idx]?.choices?.[
                      index
                    ]?.choice?.message
                  }
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
            disabled={fields.length >= 5}
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
