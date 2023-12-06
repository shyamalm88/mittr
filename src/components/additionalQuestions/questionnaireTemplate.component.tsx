import React from "react";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import Stack from "@mui/material/Stack";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Button from "@mui/material/Button";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import AnswerFieldSwitchTemplate from "./answerFieldSwitchTemplate.component";
import { ComponentInputProps, OptionProp } from "../../types";

import Divider from "@mui/material/Divider";
import { useConfirm } from "material-ui-confirm";
import Box from "@mui/material/Box";
import { useFormContext, useFormState } from "react-hook-form";
import FormValidationError from "../../utility/FormValidationError";
import { PATTERN, REQUIRED } from "../../constants/error";
import { useEditDataContext } from "../../hooks/useEditDataContext";

export default function QuestionnaireTemplate({
  typeOptions,
  questionItem,
  index,
  questionnaire,
  fieldName,
  remove,
  update,
}: ComponentInputProps) {
  const confirm = useConfirm();
  const {
    register,
    setValue,
    unregister,
    control,
    getValues,
    resetField,
    formState: { errors, dirtyFields, touchedFields, isSubmitted },
    setError,
    clearErrors,
    watch,
  } = useFormContext();

  const oldSelectedValue = React.useRef<HTMLInputElement[]>([]);
  const oldSelectedQuestionValue = React.useRef<HTMLInputElement[]>([]);

  const [selectedValue, setSelectedValue] = React.useState("");
  const { editableData } = useEditDataContext();
  const item = questionItem;

  React.useEffect(() => {
    if (editableData) {
      setSelectedValue(item.answerType);
    }
  }, [editableData]);

  const handleChange = (event: SelectChangeEvent, index: number) => {
    const value = event.target.value;
    if (!oldSelectedValue.current[index].value) {
      setSelectedValue(value as string);
      setValue(event.target.name, value);
    } else {
      confirm({
        description:
          "Do you wish to proceed with changing the answer type option? Please note that selecting a different option will reset all entries related to the previous selection. Are you sure you want to continue?",
      })
        .then(() => {
          const defaultValues = {
            id: "",
            questionLabel: "Question",
            answerType: "",
            question: "",
          };
          const { id, question } = getValues(`additionalQuestions.${index}`);
          defaultValues.id = id;
          defaultValues.question = question;
          setValue(`additionalQuestions.${index}`, defaultValues, {
            shouldValidate: true,
          });
          setSelectedValue(value);
          setValue(event.target.name, value);
        })
        .catch(() => {
          setSelectedValue(oldSelectedValue.current[index].value as string);
          setValue(event.target.name, oldSelectedValue.current[index].value);
        });
    }
  };

  const [answerTypeValues, questionValues] = getValues([
    `additionalQuestions.${index}.answerType`,
    `additionalQuestions.${index}.question`,
  ]);

  React.useEffect(() => {
    if (isSubmitted && questionValues && !answerTypeValues) {
      setError(`additionalQuestions.${index}.answerType`, {
        type: "required",
        message: "Please Select Type from Dropdown",
      });
    } else {
      clearErrors(`additionalQuestions.${index}.answerType`);
    }
  }, [
    setError,
    answerTypeValues,
    questionValues,
    clearErrors,
    index,
    isSubmitted,
  ]);

  return (
    <Stack direction="column" sx={{ mb: 2, px: 1, borderRadius: "4px" }}>
      <Stack
        direction="row"
        spacing={2}
        sx={{ my: 1, color: "rgb(156, 163, 175)" }}
      >
        <Stack
          direction="column"
          spacing={2}
          sx={{ color: "rgb(156, 163, 175)", width: "100%" }}
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
            <FormControl variant="outlined">
              <OutlinedInput
                size="small"
                margin="dense"
                error={
                  !!(errors as any)?.additionalQuestions?.[index]?.question
                    ?.message
                }
                {...register(`${fieldName}.question` as const, {
                  required: REQUIRED.ADDITIONAL_QUESTION,
                  pattern: {
                    value: PATTERN,
                    message: REQUIRED.PATTERN,
                  },
                })}
                sx={{
                  borderRadius: "4px",
                }}
                fullWidth
                multiline
                autoFocus
                className="input"
                inputRef={(el) =>
                  (oldSelectedQuestionValue.current[index] = el)
                }
                placeholder={`Please enter ${item?.questionLabel} ${index + 1}`}
              />
              <FormValidationError
                errorText={
                  (errors as any)?.additionalQuestions?.[index]?.question
                    ?.message
                }
              />
            </FormControl>
            <FormControl
              variant="outlined"
              style={{ marginTop: "5px" }}
              size="small"
            >
              <Select
                fullWidth
                onChange={(e: any) => handleChange(e, index)}
                error={
                  !!(errors as any)?.additionalQuestions?.[index]?.answerType
                    ?.message
                }
                name={`${fieldName}.answerType`}
                style={{
                  color: "inherit",
                }}
                value={selectedValue}
                className="select"
                inputRef={(el) => (oldSelectedValue.current[index] = el)}
                displayEmpty
              >
                <MenuItem value="">
                  <em style={{ color: "#b3b3b3" }}>Please Select Type</em>
                </MenuItem>
                {typeOptions?.map((item: OptionProp) => {
                  return (
                    <MenuItem value={item.value} key={item?.id}>
                      <Stack
                        spacing={2}
                        direction="row"
                        alignItems="flex-start"
                        alignSelf="end"
                        useFlexGap
                      >
                        <Box sx={{ color: "inherit", display: "flex" }}>
                          {item.icon}
                        </Box>
                        <Box>{item.label}</Box>
                      </Stack>
                    </MenuItem>
                  );
                })}
              </Select>
              <FormValidationError
                errorText={
                  (errors as any)?.additionalQuestions?.[index]?.answerType
                    ?.message
                }
              />
            </FormControl>
          </fieldset>
        </Stack>
        <Button
          size="small"
          sx={{
            textTransform: "none",
            width: "auto",
            minWidth: { xs: "20px", lg: "120px" },
            justifyContent: "flex-start",
            alignSelf: "center",
          }}
          startIcon={<DeleteOutlineIcon />}
          color="inherit"
          onClick={() => remove(index)}
          disabled={questionnaire?.length === 1}
        >
          <Box
            sx={{
              display: {
                xs: "none",
                lg: "flex",
              },
            }}
          >
            Remove
          </Box>
        </Button>
      </Stack>
      <Stack
        direction="row"
        spacing={1}
        sx={{ mb: 1, mt: 0, color: "rgb(156, 163, 175)" }}
        key={item?.id}
      >
        <AnswerFieldSwitchTemplate
          selectedValue={selectedValue}
          fieldName={fieldName}
          index={index}
        />
      </Stack>
      <Divider
        textAlign="center"
        sx={{
          color: "#9E9E9E",
          mr: { xs: "50px", lg: "135px" },
        }}
      >
        <small>{`# End of ${item?.questionLabel} ${index + 1}`}</small>
      </Divider>
    </Stack>
  );
}
