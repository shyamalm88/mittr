import React from "react";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import Typography from "@mui/material/Typography";
import { ComponentInputProps } from "../../../types";
import { useTheme } from "@mui/material";
import FormValidationError from "../../../utility/FormValidationError";

function MultipleChoice({
  fields,
  errors,
  register,
  deleteOption,
  getValues,
}: ComponentInputProps) {
  const theme = useTheme();
  return (
    <React.Fragment>
      <Typography
        component="h2"
        variant="subtitle2"
        sx={{ my: 1, color: theme.palette.text.primary }}
      >
        Answer Options
      </Typography>
      {fields.map((item: any, index: number) => {
        const fieldName = `options[${index}]`;
        // console.log(errors);
        return (
          <FormControl
            sx={{ mb: 1, width: "100%", color: theme.palette.text.primary }}
            variant="outlined"
            key={item.id}
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
              <OutlinedInput
                size="small"
                margin="dense"
                sx={{
                  borderRadius: "4px",
                }}
                className="input"
                error={!!(errors as any)?.options?.[index]?.option?.message}
                {...register(`${fieldName}.option` as const, {
                  required: "Please provide  Poll Option",
                  pattern: {
                    value: /^[a-zA-Z0-9 .,?!@#$%^&*()_+-=;:'"|\\]*$/,
                    message: `Please enter a valid text. Only few special characters allowed. ">", "\`", "~", "{", "}", "[", "]", "'", "\"" are not allowed`,
                  },
                })}
                multiline
                readOnly={!item?.enabled}
                autoFocus
                endAdornment={
                  <InputAdornment
                    position="end"
                    sx={{ color: theme.palette.action.active }}
                  >
                    <IconButton
                      aria-label="Delete Option"
                      edge="end"
                      sx={{ color: "inherit" }}
                      onClick={() => deleteOption(index)}
                      disabled={getValues("options").length === 1}
                    >
                      <DeleteOutlineIcon />
                    </IconButton>
                  </InputAdornment>
                }
                placeholder={`${item?.label} ${index + 1}`}
              />
              <FormValidationError
                errorText={(errors as any)?.options?.[index]?.option?.message}
              />
            </fieldset>
          </FormControl>
        );
      })}
    </React.Fragment>
  );
}

export default MultipleChoice;
