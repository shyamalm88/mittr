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
import { usePollOrSurveyContext } from "../../../hooks/usePollOrSurveyContext";
import RadioButtonUncheckedOutlinedIcon from "@mui/icons-material/RadioButtonUncheckedOutlined";
import { useFieldArray } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import OptionActions from "../common/optionActions";
import { useQuestionTypeContext } from "../../../hooks/useQuestionTypeContext";
import { PATTERN, REQUIRED } from "../../../constants/error";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";

function Legal({
  control,
  errors,
  register,
  getValues,
  fieldName,
  index,
  setValue,
}: ComponentInputProps) {
  const { pollOrSurvey, setPollOrSurvey } = usePollOrSurveyContext();
  const { questionType, setQuestionType } = useQuestionTypeContext();
  const theme = useTheme();
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
    name: pollOrSurvey === "poll" ? `${fieldName}` : `${fieldName}.options`,
  });

  const addOption = React.useCallback(() => {
    () => {
      const temp = [
        {
          id: uuidv4(),
          label: "Option",
          enabled: true,
          option: "Accept",
        },
        {
          id: uuidv4(),
          label: "Option",
          enabled: true,
          option: "Reject",
        },
      ];
      temp.forEach((item) => {
        append(item, {
          shouldFocus:
            getValues(
              `${
                pollOrSurvey === "poll"
                  ? `${fieldName}`
                  : `${fieldName}.options`
              }`
            )?.length === 0
              ? false
              : true,
        });
      });
    };
  }, [append, fieldName, getValues, pollOrSurvey]);

  React.useEffect(() => {
    if (!fields.length) {
      addOption();
    }
    return () => {
      remove(0);
    };
  }, [remove, addOption, fields.length]);

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
                size="small"
                margin="dense"
                sx={{
                  borderRadius: "4px",
                }}
                className="input"
                error={
                  pollOrSurvey === "poll"
                    ? !!(errors as any)?.[fieldNameOptions.split(".")[0]]?.[
                        index
                      ]?.option?.message
                    : !!(errors as any)?.[fieldNameOptions.split(".")[0]]?.[
                        fieldNameOptions.split(".")[1]
                      ]?.[fieldNameOptions.split(".")[2]]?.[index]?.option
                        ?.message
                }
                {...register(`${fieldNameOptions}.option` as const, {
                  required: REQUIRED.POLL_OPTION,
                  pattern: {
                    value: PATTERN,
                    message: REQUIRED.PATTERN,
                  },
                })}
                multiline
                readOnly={!item?.enabled}
                startAdornment={
                  <InputAdornment
                    position="start"
                    sx={{ color: theme.palette.action.disabled }}
                  >
                    <RadioButtonUncheckedOutlinedIcon />
                  </InputAdornment>
                }
                placeholder={`${item?.label} ${index + 1}`}
              />
              <FormValidationError
                errorText={
                  pollOrSurvey === "poll"
                    ? (errors as any)?.[fieldNameOptions.split(".")[0]]?.[index]
                        ?.option?.message
                    : (errors as any)?.[fieldNameOptions.split(".")[0]]?.[
                        fieldNameOptions.split(".")[1]
                      ]?.[fieldNameOptions.split(".")[2]]?.[index]?.option
                        ?.message
                }
              />
            </fieldset>
          </FormControl>
        );
      })}
      <OptionActions
        addOption={addOption}
        getValues={getValues}
        fieldName={fieldName}
        selectedValue={
          pollOrSurvey === "poll" ? questionType : questionType[index]
        }
        index={index}
      />
    </React.Fragment>
  );
}

export default Legal;
