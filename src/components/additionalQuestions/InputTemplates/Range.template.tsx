import React from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import OutlinedInput from "@mui/material/OutlinedInput";
import { ComponentInputProps } from "../../../types";
import { usePollCreationContext } from "../../../hooks/usePollCreationContext";

export default function RangeTemplate({ fieldName }: ComponentInputProps) {
  const contextValue = usePollCreationContext();
  const [startNum, setStartNum] = React.useState();
  const [endNum, setEndNum] = React.useState();

  const handleStartNumChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = (e.target as HTMLInputElement).value;
    setStartNum((val as any).replace(/[^0-9]/g, ""));
    contextValue.handleChange(e);
  };

  const handleEndNumChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = (e.target as HTMLInputElement).value;
    setEndNum((val as any).replace(/[^0-9]/g, ""));
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
        mr: "135px",
      }}
    >
      <Stack
        direction="row"
        spacing={2}
        sx={{ color: "rgb(156, 163, 175)", width: "100%" }}
        marginTop={2}
        marginBottom={2}
      >
        <OutlinedInput
          size="small"
          margin="dense"
          name={`${fieldName}.rangeStartValue`}
          sx={{
            borderRadius: "4px",
            marginRight: "20px",
          }}
          className="input"
          onChange={handleStartNumChange}
          fullWidth
          placeholder="Start Value"
        />
      </Stack>
      <Stack
        direction="row"
        spacing={2}
        sx={{ color: "rgb(156, 163, 175)", width: "100%" }}
        marginTop={2}
        marginBottom={2}
      >
        <OutlinedInput
          size="small"
          margin="dense"
          name={`${fieldName}.rangeEndValue`}
          sx={{
            borderRadius: "4px",
          }}
          className="input"
          onChange={handleEndNumChange}
          fullWidth
          placeholder="End Value"
        />
      </Stack>
    </Box>
  );
}
