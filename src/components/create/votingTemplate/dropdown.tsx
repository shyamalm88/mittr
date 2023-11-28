import React from "react";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import Typography from "@mui/material/Typography";
import { ComponentInputProps } from "../../../types";
import { useTheme } from "@mui/material";
import FormValidationError from "../../../utility/FormValidationError";
import { usePollOrSurveyContext } from "../../../hooks/usePollOrSurveyContext";
import { useFieldArray } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import { useQuestionTypeContext } from "../../../hooks/useQuestionTypeContext";
import { PATTERN, REQUIRED } from "../../../constants/error";

function DropDown({
  control,
  errors,
  register,
  getValues,
  fieldName,
  index,
  selectedValue,
  setValue,
}: ComponentInputProps) {
  const theme = useTheme();
  const { pollOrSurvey, setPollOrSurvey } = usePollOrSurveyContext();
  const { questionType, setQuestionType } = useQuestionTypeContext();
  const {
    fields,
    append,
    prepend,
    remove,
    swap,
    move,
    insert,
    update,
    replace,
  } = useFieldArray({
    control,
    name: `${fieldName}.options`,
  });

  const addOption = React.useCallback(() => {
    () => {
      const temp = {
        id: uuidv4(),
        label: "Dropdown",
        dropdownOptions: "",
      };
      append(temp, {
        shouldFocus:
          getValues(
            `${
              pollOrSurvey === "poll" ? `${fieldName}` : `${fieldName}.options`
            }`
          )?.length === 0
            ? false
            : true,
      });
    };
  }, [append, fieldName, getValues, pollOrSurvey]);

  React.useEffect(() => {
    if (getValues("survey")?.[index]?.options?.length === 0) {
      addOption();
    }
  }, [addOption, getValues, index]);

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
        const fieldNameOptions =
          pollOrSurvey === "poll"
            ? `${fieldName}.${index}`
            : `${fieldName}.options.${index}`;

        return (
          <FormControl
            sx={{ mb: 1, width: "100%", color: theme.palette.text.primary }}
            variant="outlined"
            key={item.id}
          >
            <fieldset
              name={fieldNameOptions}
              style={{
                border: "none",
                margin: 0,
                padding: 0,
                display: "flex",
                flexDirection: "column",
              }}
            >
              <OutlinedInput
                size="medium"
                margin="dense"
                sx={{
                  borderRadius: "4px",
                }}
                className="textarea"
                error={
                  pollOrSurvey === "poll"
                    ? !!(errors as any)?.[fieldNameOptions.split(".")[0]]?.[
                        index
                      ]?.choice?.message
                    : !!(errors as any)?.[fieldNameOptions.split(".")[0]]?.[
                        fieldNameOptions.split(".")[1]
                      ]?.[fieldNameOptions.split(".")[2]]?.[index]
                        ?.dropdownOptions?.message
                }
                {...register(`${fieldNameOptions}.dropdownOptions` as const, {
                  required: REQUIRED.SURVEY_DROPDOWN,
                  pattern: {
                    value: PATTERN,
                    message: REQUIRED.PATTERN,
                  },
                })}
                multiline
                inputComponent="textarea"
                minRows={6}
                notched
                placeholder="Put Dropdown Each options in comma separated values. e.g. USA,INDIA"
              />

              <FormValidationError
                errorText={
                  pollOrSurvey === "poll"
                    ? (errors as any)?.[fieldNameOptions.split(".")[0]]?.[index]
                        ?.dropdownOptions?.message
                    : (errors as any)?.[fieldNameOptions.split(".")[0]]?.[
                        fieldNameOptions.split(".")[1]
                      ]?.[fieldNameOptions.split(".")[2]]?.[index]
                        ?.dropdownOptions?.message
                }
              />
            </fieldset>
          </FormControl>
        );
      })}
    </React.Fragment>
  );
}

export default DropDown;
