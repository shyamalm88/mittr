import React from "react";
import Box from "@mui/material/Box";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import { ComponentInputProps } from "../../../types";
import { useTheme } from "@mui/material/styles";
import { useFormContext } from "react-hook-form";
import { useEditDataContext } from "../../../hooks/useEditDataContext";

export default function DateTemplate({
  fieldName,
  index,
}: ComponentInputProps) {
  const { register, setValue, unregister, control, getValues } =
    useFormContext();
  const theme = useTheme();
  const { editableData } = useEditDataContext();
  const [dateValidationOption, setDateValidationOption] =
    React.useState<string>("");

  React.useEffect(() => {
    if (editableData) {
      setDateValidationOption(
        editableData.additionalQuestions[index]?.dateValidationOption
      );
      setValue(
        `${fieldName}.dateValidationOption`,
        editableData.additionalQuestions[index].dateValidationOption
      );
    }
  }, [editableData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = (e.target as HTMLInputElement).value;
    setDateValidationOption(val);
    setValue(e.target.name, val);
  };

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
      <FormControl>
        <RadioGroup
          row
          value={dateValidationOption}
          name={`${fieldName}.dateValidationOption`}
          onChange={handleChange}
        >
          <FormControlLabel
            value="disable_future_dates"
            control={<Radio />}
            label="Disable Future Dates"
            sx={{ color: theme.palette.text.primary }}
          />
          <FormControlLabel
            value="disable_past_dates"
            control={<Radio />}
            label="Disable Past Dates"
            sx={{ color: theme.palette.text.primary }}
          />
        </RadioGroup>
      </FormControl>
    </Box>
  );
}
