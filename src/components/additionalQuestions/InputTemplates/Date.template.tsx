import React from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { ComponentInputProps } from "../../../types";
import { usePollCreationContext } from "../../../hooks/usePollCreationContext";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

export default function DateTemplate({ fieldName }: ComponentInputProps) {
  const contextValue = usePollCreationContext();
  const theme = useTheme();
  const smallScreen = useMediaQuery(theme.breakpoints.up("sm"));
  const [dateValidationOption, setDateValidationOption] =
    React.useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = (e.target as HTMLInputElement).value;
    console.log(val);
    setDateValidationOption(val);
    contextValue.handleChange(e);
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
          name={`${fieldName}.dateValidationOption`}
          value={dateValidationOption}
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
