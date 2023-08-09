import React from "react";
import Checkbox from "@mui/material/Checkbox";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import { usePollCreationContext } from "../../../hooks/usePollCreationContext";
import { ComponentInputProps } from "../../../types";

export default function CountryStateCityCombiTemplate({
  fieldName,
}: ComponentInputProps) {
  const contextValue = usePollCreationContext();

  const [cityDisabled, setCityDisabled] = React.useState(true);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const eventMock = {
      target: { value: e.target.checked, name: e.target.name },
    };
    contextValue.handleChange(eventMock);
    if (e.target.checked) {
      setCityDisabled(false);
    } else {
      setCityDisabled(true);
    }
  };

  const handleCityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const eventMock = {
      target: { value: e.target.checked, name: e.target.name },
    };
    contextValue.handleChange(eventMock);
  };

  return (
    <Box
      sx={{
        flex: 1,
        display: "flex",
        border: "1px solid #e7e7e7",
        borderRadius: "4px",
        px: 2,
        py: 1,
        mr: "135px",
      }}
    >
      <Stack
        direction="row"
        spacing={2}
        sx={{ color: "#6B6B6B", width: "100%" }}
      >
        <FormControlLabel
          control={
            <Checkbox
              onChange={handleChange}
              name={`${fieldName}.allowState`}
            />
          }
          label="Allow State"
        />
      </Stack>
      <Stack
        direction="row"
        spacing={2}
        sx={{ color: "#6B6B6B", width: "100%" }}
      >
        <FormControlLabel
          disabled={cityDisabled ? true : undefined}
          control={
            <Checkbox
              onChange={handleCityChange}
              name={`${fieldName}.allowCity`}
            />
          }
          label="Allow City"
        />
      </Stack>
    </Box>
  );
}
