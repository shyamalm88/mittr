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
import CheckBoxOutlineBlankOutlinedIcon from "@mui/icons-material/CheckBoxOutlineBlankOutlined";
import OptionActions from "../common/optionActions";
import { useFieldArray } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import { useQuestionTypeContext } from "../../../hooks/useQuestionTypeContext";
import { PATTERN, REQUIRED } from "../../../constants/error";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";

function Checkbox({
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

  const addOption = () => {
    const temp = {
      id: uuidv4(),
      label: "Choice",
      enabled: true,
      choice: "",
    };
    append(temp, {
      shouldFocus:
        getValues(
          `${pollOrSurvey === "poll" ? `${fieldName}` : `${fieldName}.options`}`
        )?.length === 0
          ? false
          : true,
    });
  };

  React.useEffect(() => {
    if (getValues("survey")?.[index]?.options?.length === 0) {
      addOption();
    }
  }, []);

  const addOtherOption = async () => {
    const temp = { id: uuidv4(), label: "Other", enabled: false, choice: "" };
    await append(temp);

    setValue(
      `${fieldName}.options.${
        getValues(`${fieldName}.options`)?.length - 1
      }.choice`,
      "Other"
    );
  };

  const deleteOption = (index: number) => {
    remove(index);
  };

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
                      ]?.choice?.message
                    : !!(errors as any)?.[fieldNameOptions.split(".")[0]]?.[
                        fieldNameOptions.split(".")[1]
                      ]?.[fieldNameOptions.split(".")[2]]?.[index]?.choice
                        ?.message
                }
                {...register(`${fieldNameOptions}.choice` as const, {
                  required: REQUIRED.SURVEY_CHOICE,
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
                    <CheckBoxOutlineBlankOutlinedIcon />
                  </InputAdornment>
                }
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
                      disabled={
                        getValues(
                          `${
                            pollOrSurvey === "poll"
                              ? `${fieldName}`
                              : `${fieldName}.options`
                          }`
                        )?.length === 1
                      }
                    >
                      <CloseOutlinedIcon />
                    </IconButton>
                  </InputAdornment>
                }
                placeholder={`${item?.label} ${index + 1}`}
              />
              <FormValidationError
                errorText={
                  pollOrSurvey === "poll"
                    ? (errors as any)?.[fieldNameOptions.split(".")[0]]?.[index]
                        ?.choice?.message
                    : (errors as any)?.[fieldNameOptions.split(".")[0]]?.[
                        fieldNameOptions.split(".")[1]
                      ]?.[fieldNameOptions.split(".")[2]]?.[index]?.choice
                        ?.message
                }
              />
            </fieldset>
          </FormControl>
        );
      })}
      <OptionActions
        addOption={addOption}
        addOtherOption={addOtherOption}
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

export default Checkbox;
