import React from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import OutlinedInput from "@mui/material/OutlinedInput";
import { ComponentInputProps } from "../../../types";
import { useFormContext } from "react-hook-form";
import FormValidationError from "../../../utility/FormValidationError";
import { useEditDataContext } from "../../../hooks/useEditDataContext";

export default function RangeTemplate({
  fieldName,
  index,
}: ComponentInputProps) {
  const {
    register,
    setValue,
    unregister,
    control,
    getValues,
    formState: { errors, dirtyFields, touchedFields, isSubmitted },
    setError,
    clearErrors,
  } = useFormContext();
  const [startNum, setStartNum] = React.useState();
  const [endNum, setEndNum] = React.useState();
  const [stepNum, setStepNum] = React.useState();
  const { editableData } = useEditDataContext();

  React.useEffect(() => {
    if (editableData) {
      setStartNum(editableData.additionalQuestions[index].rangeStartValue);
      setEndNum(editableData.additionalQuestions[index].rangeEndValue);
      setStepNum(editableData.additionalQuestions[index].rangeStepValue);
    }
  }, [editableData]);

  const handleStartNumChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = (e.target as HTMLInputElement).value;
    setStartNum((val as any).replace(/[^0-9]/g, ""));
    setValue(e.target.name, val);
  };

  const handleEndNumChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = (e.target as HTMLInputElement).value;
    setEndNum((val as any).replace(/[^0-9]/g, ""));
    setValue(e.target.name, val);
  };

  const handleStepNumChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = (e.target as HTMLInputElement).value;
    setStepNum((val as any).replace(/[^0-9]/g, ""));
    setValue(e.target.name, val);
  };

  const [rangeStartValue, rangeEndValue, rangeStepValue] = getValues([
    `additionalQuestions.${index}.rangeStartValue`,
    `additionalQuestions.${index}.rangeEndValue`,
    `additionalQuestions.${index}.rangeStepValue`,
  ]);

  React.useEffect(() => {
    if (
      (touchedFields?.additionalQuestions?.[index]?.rangeStartValue ||
        isSubmitted) &&
      !rangeStartValue
    ) {
      setError(`additionalQuestions.${index}.rangeStartValue`, {
        type: "required",
        message: "Please provide Range Start Value",
      });
    } else {
      clearErrors(`additionalQuestions.${index}.rangeStartValue`);
    }
    if (
      (touchedFields?.additionalQuestions?.[index]?.rangeEndValue ||
        isSubmitted) &&
      !rangeEndValue
    ) {
      setError(`additionalQuestions.${index}.rangeEndValue`, {
        type: "required",
        message: "Please provide Range End Value",
      });
    } else {
      clearErrors(`additionalQuestions.${index}.rangeEndValue`);
    }

    if (
      (touchedFields?.additionalQuestions?.[index]?.rangeStepValue ||
        isSubmitted) &&
      !rangeStepValue
    ) {
      setError(`additionalQuestions.${index}.rangeStepValue`, {
        type: "required",
        message: "Please provide Range End Value",
      });
    } else {
      clearErrors(`additionalQuestions.${index}.rangeStepValue`);
    }
  }, [
    setError,
    rangeStartValue,
    rangeEndValue,
    rangeStepValue,
    clearErrors,
    index,
    isSubmitted,
    touchedFields,
  ]);

  return (
    <Box
      sx={{
        flex: 1,
        display: "flex",
        borderRadius: "4px",
        px: 1,
        py: 1,
        mr: { xs: "40px", sm: "135px" },
        flexDirection: { xs: "column", sm: "column", md: "row" },
      }}
    >
      <Stack
        direction="row"
        spacing={2}
        sx={{ color: "rgb(156, 163, 175)", width: "100%" }}
        marginTop={2}
        marginBottom={2}
      >
        <Stack direction="column" spacing={1} sx={{ mr: { md: 1 } }}>
          <OutlinedInput
            size="small"
            margin="dense"
            name={`${fieldName}.rangeStartValue`}
            error={
              !!(errors as any)?.additionalQuestions?.[index]?.rangeStartValue
                ?.message
            }
            sx={{
              borderRadius: "4px",
              marginRight: "20px",
            }}
            className="input"
            value={startNum}
            onChange={handleStartNumChange}
            fullWidth
            placeholder="Start Value"
          />

          <FormValidationError
            errorText={
              (errors as any)?.additionalQuestions?.[index]?.rangeStartValue
                ?.message
            }
          />
        </Stack>
      </Stack>
      <Stack
        direction="row"
        spacing={2}
        sx={{ color: "rgb(156, 163, 175)", width: "100%" }}
        marginTop={2}
        marginBottom={2}
      >
        <Stack direction="column" spacing={1} sx={{ mr: { md: 1 } }}>
          <OutlinedInput
            size="small"
            margin="dense"
            name={`${fieldName}.rangeEndValue`}
            error={
              !!(errors as any)?.additionalQuestions?.[index]?.rangeEndValue
                ?.message
            }
            sx={{
              borderRadius: "4px",
              marginRight: "20px",
            }}
            className="input"
            value={endNum}
            onChange={handleEndNumChange}
            fullWidth
            placeholder="End Value"
          />

          <FormValidationError
            errorText={
              (errors as any)?.additionalQuestions?.[index]?.rangeEndValue
                ?.message
            }
          />
        </Stack>
      </Stack>
      <Stack
        direction="row"
        spacing={2}
        sx={{ color: "rgb(156, 163, 175)", width: "100%" }}
        marginTop={2}
        marginBottom={2}
      >
        <Stack direction="column" spacing={1}>
          <OutlinedInput
            size="small"
            margin="dense"
            name={`${fieldName}.rangeStepValue`}
            error={
              !!(errors as any)?.additionalQuestions?.[index]?.rangeStepValue
                ?.message
            }
            sx={{
              borderRadius: "4px",
              marginRight: "20px",
            }}
            className="input"
            value={stepNum}
            onChange={handleStepNumChange}
            fullWidth
            placeholder="Step Value"
          />

          <FormValidationError
            errorText={
              (errors as any)?.additionalQuestions?.[index]?.rangeStepValue
                ?.message
            }
          />
        </Stack>
      </Stack>
    </Box>
  );
}
