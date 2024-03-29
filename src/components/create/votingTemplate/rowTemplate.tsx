import React from "react";
import { ComponentInputProps } from "../../../types";
import { useFieldArray } from "react-hook-form";
import uniqid from "uniqid";
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
import { REQUIRED } from "../../../constants/error";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";

function RowTemplate({
  register,
  control,
  fieldName,
  getValues,
  index,
  errors,
  parentIndex,
}: ComponentInputProps) {
  const theme = useTheme();
  const { pollOrSurvey, setPollOrSurvey } = usePollOrSurveyContext();
  const { questionType, setQuestionType } = useQuestionTypeContext();

  const {
    fields: rowFields,
    append: rowAppend,
    remove: rowRemove,
  } = useFieldArray({
    control,
    name: `${fieldName}.rows`,
  });

  const addRows = () => {
    const temp = {
      id: uniqid(),
      label: "Row",
      option: "",
    };
    rowAppend(temp);
  };

  const deleteOption = (index: number) => {
    rowRemove(index);
  };

  React.useEffect(() => {
    if (getValues(`${fieldName}.rows`)?.length === 0) {
      addRows();
    }
  }, [getValues, fieldName]);

  return (
    <>
      {rowFields.map((item: any, index) => {
        const fieldNameOptions = `${fieldName}.rows.${index}`;
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
                error={
                  !!(errors as any)?.[fieldNameOptions.split(".")[0]]?.[
                    fieldNameOptions.split(".")[1]
                  ]?.[fieldNameOptions.split(".")[2]]?.[
                    fieldNameOptions.split(".")[3]
                  ]?.[fieldNameOptions.split(".")[4]]?.[
                    fieldNameOptions.split(".")[5]
                  ]?.option?.message
                }
                placeholder={`Row ${index + 1}`}
                {...register(`${fieldNameOptions}.option` as const, {
                  required: REQUIRED.SURVEY_ROW,
                })}
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
                      <CloseOutlinedIcon />
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
        addOption={addRows}
        getValues={getValues}
        fieldName={fieldName}
        selectedValue={
          pollOrSurvey === "poll" ? questionType : questionType[parentIndex]
        }
        index={index}
      />
    </>
  );
}

export default RowTemplate;
