import React from "react";
import { ComponentInputProps } from "../../../types";
import { useFieldArray } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import {
  FormControl,
  IconButton,
  InputAdornment,
  OutlinedInput,
  useTheme,
} from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import FormValidationError from "../../../utility/FormValidationError";
import OptionActions from "../common/optionActions";
import { usePollOrSurveyContext } from "../../../hooks/usePollOrSurveyContext";
import { useQuestionTypeContext } from "../../../hooks/useQuestionTypeContext";
import CheckBoxOutlineBlankOutlinedIcon from "@mui/icons-material/CheckBoxOutlineBlankOutlined";
import RadioButtonUncheckedOutlinedIcon from "@mui/icons-material/RadioButtonUncheckedOutlined";

function ColumnTemplate({
  register,
  control,
  fieldName,
  getValues,
  index,
  errors,
  type,
}: ComponentInputProps) {
  const theme = useTheme();
  const { pollOrSurvey, setPollOrSurvey } = usePollOrSurveyContext();
  const { questionType, setQuestionType } = useQuestionTypeContext();

  const {
    fields: columnFields,
    append: columnAppend,
    remove: columnRemove,
  } = useFieldArray({
    control,
    name: `${fieldName}.columns`,
  });

  const addColumns = () => {
    const temp = {
      id: uuidv4(),
      label: "Column",
      option: "",
    };
    columnAppend(temp);
  };

  const deleteOption = (index: number) => {
    columnRemove(index);
  };

  React.useEffect(() => {
    if (getValues(`${fieldName}.columns`)?.length === 0) {
      console.log("columns");
      addColumns();
    }
  }, []);

  return (
    <>
      {columnFields.map((item: any, index) => {
        const fieldNameOptions = `${fieldName}.columns.${index}`;
        return (
          <FormControl
            sx={{
              mb: 1,
              width: "100%",
              color: theme.palette.text.primary,
            }}
            variant="outlined"
            key={item.id}
          >
            <fieldset
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
                multiline
                placeholder={`Column ${index + 1}`}
                error={
                  !!(errors as any)?.[fieldNameOptions.split(".")[0]]?.[
                    fieldNameOptions.split(".")[1]
                  ]?.[fieldNameOptions.split(".")[2]]?.[
                    fieldNameOptions.split(".")[3]
                  ]?.[fieldNameOptions.split(".")[4]]?.[
                    fieldNameOptions.split(".")[5]
                  ]?.option?.message
                }
                {...register(`${fieldNameOptions}.option` as const, {
                  required: "Please provide  Survey Column Choices for Grid",
                })}
                startAdornment={
                  <InputAdornment
                    position="start"
                    sx={{ color: theme.palette.action.disabled }}
                  >
                    {type === "radio" ? (
                      <RadioButtonUncheckedOutlinedIcon />
                    ) : (
                      <CheckBoxOutlineBlankOutlinedIcon />
                    )}
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
                        getValues(`${fieldNameOptions.replace(/.$/, "")}`)
                          ?.length === 1
                      }
                    >
                      <DeleteOutlineIcon />
                    </IconButton>
                  </InputAdornment>
                }
              />
              <FormValidationError
                errorText={
                  (errors as any)?.[fieldNameOptions.split(".")[0]]?.[
                    fieldNameOptions.split(".")[1]
                  ]?.[fieldNameOptions.split(".")[2]]?.[
                    fieldNameOptions.split(".")[3]
                  ]?.[fieldNameOptions.split(".")[4]]?.[
                    fieldNameOptions.split(".")[5]
                  ]?.option?.message
                }
              />
            </fieldset>
          </FormControl>
        );
      })}

      <OptionActions
        addOtherOption={addColumns}
        getValues={getValues}
        fieldName={fieldName}
        selectedValue={
          pollOrSurvey === "poll" ? questionType : questionType[index]
        }
        index={index}
      />
    </>
  );
}

export default ColumnTemplate;
