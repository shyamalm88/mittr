import { Box, TextField, Typography, useTheme } from "@mui/material";
import { ComponentInputProps } from "../../../types";

function LongTextChoiceSurveySection({ selectedValue }: ComponentInputProps) {
  const theme = useTheme();
  return (
    <>
      <Typography component="div" variant="h6">
        {selectedValue.question}
      </Typography>
      <Box sx={{ p: 3 }}>
        <TextField
          size="small"
          margin="dense"
          fullWidth
          multiline
          rows={4}
          placeholder="Please provide some value"
        />
      </Box>
    </>
  );
}

export default LongTextChoiceSurveySection;
