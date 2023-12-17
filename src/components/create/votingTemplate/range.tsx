import React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { OutlinedInput, Stack, TextField, Typography } from "@mui/material";
import { ComponentInputProps } from "../../../types";
import FormValidationError from "../../../utility/FormValidationError";
import OptionActions from "../common/optionActions";
import { useFieldArray, useFormContext } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import { PATTERN, REQUIRED } from "../../../constants/error";

function RangeSlider({
  control,
  errors,
  register,
  deleteOption,
  getValues,
  fieldName,
  index,
}: ComponentInputProps) {
  const [startValue, setStartValue] = React.useState();
  const [endValue, setEndValue] = React.useState();
  const [stepValue, setStepValue] = React.useState();
  const { setValue } = useFormContext();

  const handleStartNumChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = (e.target as HTMLInputElement).value;
    setStartValue((val as any).replace(/[^0-9]/g, ""));
    setValue(e.target.name, val);
  };

  const handleEndNumChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = (e.target as HTMLInputElement).value;
    setEndValue((val as any).replace(/[^0-9]/g, ""));
    setValue(e.target.name, val);
  };

  const handleStepNumChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = (e.target as HTMLInputElement).value;
    setStepValue((val as any).replace(/[^0-9]/g, ""));
    setValue(e.target.name, val);
  };

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
      label: "slider",
      startValue: "",
      endValue: "",
      stepValue: "",
    };
    append(temp);
  };

  React.useEffect(() => {
    if (getValues("survey")?.[index]?.options?.length === 0) {
      addOption();
    }
  }, []);

  return (
    <React.Fragment>
      {fields?.map((item: any, index: number) => {
        const fieldNameOptions = `${fieldName}.options.${index}`;
        return (
          <React.Fragment key={item.id}>
            <Stack
              direction={{ xs: "column", md: "row" }}
              spacing={{ xs: 1, md: 2 }}
              useFlexGap
              sx={{ alignItems: "center" }}
            >
              <Box sx={{ width: { xs: "100%", md: "50%" }, my: 2 }}>
                <FormControl size="small" fullWidth>
                  <OutlinedInput
                    size="small"
                    margin="dense"
                    sx={{
                      borderRadius: "4px",
                      marginRight: "20px",
                    }}
                    value={startValue}
                    className="input"
                    error={
                      !!(errors as any)?.[fieldNameOptions.split(".")[0]]?.[
                        fieldNameOptions.split(".")[1]
                      ]?.[fieldNameOptions.split(".")[2]]?.[index]?.startValue
                        ?.message
                    }
                    {...register(`${fieldNameOptions}.startValue` as const, {
                      required: REQUIRED.RANGE_START_VALUE,
                      onChange: (e: any) => {
                        handleStartNumChange(e);
                      },
                    })}
                    fullWidth
                    placeholder="Start Value"
                  />
                  <FormValidationError
                    errorText={
                      (errors as any)?.[fieldNameOptions.split(".")[0]]?.[
                        fieldNameOptions.split(".")[1]
                      ]?.[fieldNameOptions.split(".")[2]]?.[index]?.startValue
                        ?.message
                    }
                  />
                </FormControl>
              </Box>

              <Box sx={{ width: { xs: "100%", md: "50%" }, my: 2 }}>
                <FormControl size="small" fullWidth>
                  <OutlinedInput
                    size="small"
                    margin="dense"
                    sx={{
                      borderRadius: "4px",
                      marginRight: "20px",
                    }}
                    value={endValue}
                    className="input"
                    error={
                      !!(errors as any)?.[fieldNameOptions.split(".")[0]]?.[
                        fieldNameOptions.split(".")[1]
                      ]?.[fieldNameOptions.split(".")[2]]?.[index]?.endValue
                        ?.message
                    }
                    {...register(`${fieldNameOptions}.endValue` as const, {
                      required: REQUIRED.RANGE_END_VALUE,
                      onChange: (e: any) => {
                        handleEndNumChange(e);
                      },
                    })}
                    fullWidth
                    placeholder="End Value"
                  />
                  <FormValidationError
                    errorText={
                      (errors as any)?.[fieldNameOptions.split(".")[0]]?.[
                        fieldNameOptions.split(".")[1]
                      ]?.[fieldNameOptions.split(".")[2]]?.[index]?.endValue
                        ?.message
                    }
                  />
                </FormControl>
              </Box>
            </Stack>
            <Stack
              direction={{ xs: "column", md: "row" }}
              spacing={{ xs: 1, md: 2 }}
              useFlexGap
              sx={{ alignItems: "center" }}
            >
              <Box sx={{ width: { xs: "100%", md: "50%" }, my: 1 }}>
                <FormControl size="small" fullWidth>
                  <OutlinedInput
                    size="small"
                    margin="dense"
                    sx={{
                      borderRadius: "4px",
                      marginRight: "20px",
                    }}
                    value={stepValue}
                    className="input"
                    error={
                      !!(errors as any)?.[fieldNameOptions.split(".")[0]]?.[
                        fieldNameOptions.split(".")[1]
                      ]?.[fieldNameOptions.split(".")[2]]?.[index]?.stepValue
                        ?.message
                    }
                    {...register(`${fieldNameOptions}.stepValue` as const, {
                      required: REQUIRED.RANGE_STEP_VALUE,
                      onChange: (e: any) => {
                        handleStepNumChange(e);
                      },
                    })}
                    fullWidth
                    placeholder="Step Value"
                  />
                  <FormValidationError
                    errorText={
                      (errors as any)?.[fieldNameOptions.split(".")[0]]?.[
                        fieldNameOptions.split(".")[1]
                      ]?.[fieldNameOptions.split(".")[2]]?.[index]?.stepValue
                        ?.message
                    }
                  />
                </FormControl>
              </Box>
            </Stack>
          </React.Fragment>
        );
      })}
      <OptionActions
        getValues={getValues}
        fieldName={fieldName}
        index={index}
      />
    </React.Fragment>
  );
}

export default RangeSlider;
