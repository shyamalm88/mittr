import React from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import OutlinedInput from "@mui/material/OutlinedInput";
import { ComponentInputProps } from "../../../types";
import { useFormContext } from "react-hook-form";

export default function RangeTemplate({ fieldName }: ComponentInputProps) {
  const { register, setValue, unregister, control, getValues } =
    useFormContext();
  const [startNum, setStartNum] = React.useState();
  const [endNum, setEndNum] = React.useState();
  const [stepNum, setStepNum] = React.useState();

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
        <OutlinedInput
          size="small"
          margin="dense"
          name={`${fieldName}.rangeStartValue`}
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
            marginRight: "20px",
          }}
          className="input"
          value={endNum}
          onChange={handleEndNumChange}
          fullWidth
          placeholder="End Value"
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
          name={`${fieldName}.rangeStepValue`}
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
      </Stack>
    </Box>
  );
}
