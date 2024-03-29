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
import uniqid from "uniqid";
import { PATTERN, REQUIRED } from "../../../constants/error";
import { GithubPicker } from "react-color";
import { useEditDataContext } from "../../../hooks/useEditDataContext";
const colors = [
  "#B80000",
  "#DB3E00",
  "#FCCB00",
  "#008B02",
  "#006B76",
  "#1273DE",
  "#004DCF",
];

function StarRating({
  control,
  errors,
  register,
  deleteOption,
  getValues,
  fieldName,
  setValue,
  index,
}: ComponentInputProps) {
  const [colorState, setColorState] = React.useState("");
  const [starCount, setStarCount] = React.useState("");
  const [icon, setIcon] = React.useState("");
  const [precision, setPrecision] = React.useState("");

  const [displayColorPicker, setDisplayColorPicker] = React.useState(false);
  const { editableData } = useEditDataContext();
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
      id: uniqid(),
      label: "starRating",
      starCount: "",
      precision: "",
      icon: "",
      color: "",
    };
    append(temp);
  };

  const handleColorChange = (color: any) => {
    setColorState(color.hex);
    setDisplayColorPicker(false);
  };

  React.useEffect(() => {
    const fieldNameOp = `${fieldName}.options`;
    if (getValues("survey")?.[index]?.options?.[0]?.color) {
      setValue(
        `${fieldNameOp.split(".")[0]}.${fieldNameOp.split(".")[1]}.${
          fieldNameOp.split(".")[2]
        }.0.color`,
        colorState
      );
    }
  }, [colorState]);

  React.useEffect(() => {
    if (getValues("survey")?.[index]?.options?.length === 0) {
      addOption();
    }
  }, []);

  React.useEffect(() => {
    if (editableData) {
      const { starCount, precision, icon, color } =
        editableData.survey[index].options[0];
      setValue(`${fieldName}.options[0].color`, color);
      setValue(`${fieldName}.options[0].icon`, icon);
      setValue(`${fieldName}.options[0].precision`, precision);
      setValue(`${fieldName}.options[0].starCount`, starCount);

      setStarCount(starCount);
      setColorState(color);
      setIcon(icon);
      setPrecision(precision);
    }
  }, [editableData]);

  return (
    <React.Fragment>
      {fields?.map((item: any, index: number) => {
        const fieldNameOptions = `${fieldName}.options.${index}`;
        return (
          <React.Fragment key={index}>
            <Stack
              direction={{ xs: "column", md: "row" }}
              spacing={{ xs: 1, md: 2 }}
              useFlexGap
              sx={{ alignItems: "center" }}
            >
              <Box sx={{ width: { xs: "100%", md: "50%" }, my: 2 }}>
                <FormControl size="small" fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    Star Count
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Star Count"
                    value={starCount}
                    error={
                      !!(errors as any)?.[fieldNameOptions.split(".")[0]]?.[
                        fieldNameOptions.split(".")[1]
                      ]?.[fieldNameOptions.split(".")[2]]?.[index]?.starCount
                        ?.message
                    }
                    {...register(`${fieldNameOptions}.starCount` as const, {
                      onChange: (e: any) => {
                        setStarCount(e.target.value);
                      },
                    })}
                  >
                    <MenuItem value={""}>Please Select</MenuItem>
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
                      ]?.[fieldNameOptions.split(".")[2]]?.[index]?.starCount
                        ?.message
                    }
                  />
                </FormControl>
              </Box>

              <Box sx={{ width: { xs: "100%", md: "50%" }, my: 2 }}>
                <TextField
                  size="small"
                  fullWidth
                  onClick={() => setDisplayColorPicker(!displayColorPicker)}
                  value={colorState}
                  placeholder="Choose Color"
                  {...register(`${fieldNameOptions}.color` as const, {
                    onChange: (e: any) => {
                      setColorState(e.target.value);
                    },
                  })}
                />
                <FormValidationError
                  errorText={
                    (errors as any)?.[fieldNameOptions.split(".")[0]]?.[
                      fieldNameOptions.split(".")[1]
                    ]?.[fieldNameOptions.split(".")[2]]?.[index]?.color?.message
                  }
                />
                {displayColorPicker && (
                  <Box sx={{ position: "absolute" }}>
                    <GithubPicker
                      colors={colors}
                      onChange={handleColorChange}
                    />
                  </Box>
                )}
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
                    <FormControl size="small" fullWidth>
                      <InputLabel id="demo-simple-select-label">
                        Icon
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label="Icon"
                        size="small"
                        value={icon}
                        error={
                          !!(errors as any)?.[fieldNameOptions.split(".")[0]]?.[
                            fieldNameOptions.split(".")[1]
                          ]?.[fieldNameOptions.split(".")[2]]?.[index]?.icon
                            ?.message
                        }
                        {...register(`${fieldNameOptions}.icon` as const, {
                          onChange: (e: any) => {
                            setIcon(e.target.value);
                          },
                        })}
                      >
                        <MenuItem value={""}>Please Select</MenuItem>
                        <MenuItem value={"star"}>Star</MenuItem>
                        <MenuItem value={"love"}>Love</MenuItem>
                        <MenuItem value={"smiley"}>Smiley</MenuItem>
                      </Select>
                    </FormControl>

                    <FormValidationError
                      errorText={
                        (errors as any)?.[fieldNameOptions.split(".")[0]]?.[
                          fieldNameOptions.split(".")[1]
                        ]?.[fieldNameOptions.split(".")[2]]?.[index]?.icon
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
                    <FormControl size="small" fullWidth>
                      <InputLabel id="demo-simple-select-label">
                        Precision
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label="Precision"
                        size="small"
                        value={precision}
                        error={
                          !!(errors as any)?.[fieldNameOptions.split(".")[0]]?.[
                            fieldNameOptions.split(".")[1]
                          ]?.[fieldNameOptions.split(".")[2]]?.[index]
                            ?.precision?.message
                        }
                        {...register(`${fieldNameOptions}.precision` as const, {
                          onChange: (e: any) => {
                            setPrecision(e.target.value);
                          },
                        })}
                      >
                        <MenuItem value={""}>Please Select</MenuItem>
                        <MenuItem value={0.2}>0.2</MenuItem>
                        <MenuItem value={0.5}>0.5</MenuItem>
                        <MenuItem value={1}>1.0</MenuItem>
                      </Select>
                    </FormControl>

                    <FormValidationError
                      errorText={
                        (errors as any)?.[fieldNameOptions.split(".")[0]]?.[
                          fieldNameOptions.split(".")[1]
                        ]?.[fieldNameOptions.split(".")[2]]?.[index]?.icon
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

export default StarRating;
