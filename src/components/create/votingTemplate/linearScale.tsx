import React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Stack, TextField, Typography } from "@mui/material";
import { ComponentInputProps } from "../../../types";
import FormValidationError from "../../../utility/FormValidationError";
import OptionActions from "../common/optionActions";
import { useFieldArray } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import { PATTERN, REQUIRED } from "../../../constants/error";

function LinearScale({
  control,
  errors,
  register,
  deleteOption,
  getValues,
  fieldName,
  index,
}: ComponentInputProps) {
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
      label: "linearScale",
      from: "",
      to: "",
      formText: "",
      toText: "",
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
                  <InputLabel id="demo-simple-select-label">From</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="From"
                    error={
                      !!(errors as any)?.[fieldNameOptions.split(".")[0]]?.[
                        fieldNameOptions.split(".")[1]
                      ]?.[fieldNameOptions.split(".")[2]]?.[index]?.from
                        ?.message
                    }
                    {...register(`${fieldNameOptions}.from` as const, {
                      required: REQUIRED.LINEAR_SCALE,
                    })}
                  >
                    <MenuItem value={""}>Please Select</MenuItem>
                    <MenuItem value={0}>0</MenuItem>
                    <MenuItem value={1}>1</MenuItem>
                  </Select>
                  <FormValidationError
                    errorText={
                      (errors as any)?.[fieldNameOptions.split(".")[0]]?.[
                        fieldNameOptions.split(".")[1]
                      ]?.[fieldNameOptions.split(".")[2]]?.[index]?.from
                        ?.message
                    }
                  />
                </FormControl>
              </Box>
              <Typography component={"small"} sx={{ my: 2 }}>
                To
              </Typography>
              <Box sx={{ width: { xs: "100%", md: "50%" }, my: 2 }}>
                <FormControl size="small" fullWidth>
                  <InputLabel id="demo-simple-select-label">To</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="To"
                    error={
                      !!(errors as any)?.[fieldNameOptions.split(".")[0]]?.[
                        fieldNameOptions.split(".")[1]
                      ]?.[fieldNameOptions.split(".")[2]]?.[index]?.to?.message
                    }
                    {...register(`${fieldNameOptions}.to` as const, {
                      required: REQUIRED.LINEAR_SCALE,
                    })}
                  >
                    <MenuItem value={""}>Please Select</MenuItem>
                    <MenuItem value={1}>1</MenuItem>
                    <MenuItem value={2}>2</MenuItem>
                    <MenuItem value={3}>3</MenuItem>
                    <MenuItem value={4}>4</MenuItem>
                    <MenuItem value={5}>5</MenuItem>
                    <MenuItem value={6}>6</MenuItem>
                    <MenuItem value={7}>7</MenuItem>
                    <MenuItem value={8}>8</MenuItem>
                    <MenuItem value={9}>9</MenuItem>
                    <MenuItem value={10}>10</MenuItem>
                  </Select>
                  <FormValidationError
                    errorText={
                      (errors as any)?.[fieldNameOptions.split(".")[0]]?.[
                        fieldNameOptions.split(".")[1]
                      ]?.[fieldNameOptions.split(".")[2]]?.[index]?.to?.message
                    }
                  />
                </FormControl>
              </Box>
            </Stack>
            <Box sx={{ mb: 2, width: "50%" }}>
              <Stack
                direction={{ xs: "column", md: "row" }}
                spacing={2}
                useFlexGap
                sx={{ alignItems: "flex-start" }}
              >
                <Box sx={{ mb: 2, width: "50%" }}>
                  <Stack
                    direction={"column"}
                    spacing={1}
                    useFlexGap
                    justifyContent={"flex-start"}
                  >
                    <TextField
                      size="small"
                      placeholder="Text for From"
                      error={
                        !!(errors as any)?.[fieldNameOptions.split(".")[0]]?.[
                          fieldNameOptions.split(".")[1]
                        ]?.[fieldNameOptions.split(".")[2]]?.[index]?.formText
                          ?.message
                      }
                      {...register(`${fieldNameOptions}.formText` as const, {
                        pattern: {
                          value: PATTERN,
                          message: REQUIRED.PATTERN,
                        },
                      })}
                    />
                    <FormValidationError
                      errorText={
                        (errors as any)?.[fieldNameOptions.split(".")[0]]?.[
                          fieldNameOptions.split(".")[1]
                        ]?.[fieldNameOptions.split(".")[2]]?.[index]?.formText
                          ?.message
                      }
                    />
                  </Stack>
                </Box>
                <Box sx={{ mb: 2, width: "50%" }}>
                  <Stack
                    direction={"column"}
                    spacing={1}
                    useFlexGap
                    justifyContent={"flex-start"}
                  >
                    <TextField
                      size="small"
                      placeholder="Text for To"
                      error={
                        !!(errors as any)?.[fieldNameOptions.split(".")[0]]?.[
                          fieldNameOptions.split(".")[1]
                        ]?.[fieldNameOptions.split(".")[2]]?.[index]?.toText
                          ?.message
                      }
                      {...register(`${fieldNameOptions}.toText` as const, {
                        pattern: {
                          value: PATTERN,
                          message: REQUIRED.PATTERN,
                        },
                      })}
                    />
                    <FormValidationError
                      errorText={
                        (errors as any)?.[fieldNameOptions.split(".")[0]]?.[
                          fieldNameOptions.split(".")[1]
                        ]?.[fieldNameOptions.split(".")[2]]?.[index]?.toText
                          ?.message
                      }
                    />
                  </Stack>
                </Box>
              </Stack>
            </Box>
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

export default LinearScale;
