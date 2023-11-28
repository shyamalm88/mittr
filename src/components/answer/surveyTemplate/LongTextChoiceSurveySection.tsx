import { Box, TextField, Typography, useTheme } from "@mui/material";
import { ComponentInputProps } from "../../../types";
import he from "he";

function LongTextChoiceSurveySection({ selectedValue }: ComponentInputProps) {
  const theme = useTheme();
  return (
    <>
      <Typography
        component="div"
        variant="body1"
        dangerouslySetInnerHTML={{
          __html: he.decode(selectedValue.question),
        }}
      ></Typography>
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
