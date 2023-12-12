import { Box, OutlinedInput, Typography, useTheme } from "@mui/material";
import { ComponentInputProps } from "../../../types";
import he from "he";

function ShortTextChoiceSurveySection({ selectedValue }: ComponentInputProps) {
  const theme = useTheme();
  return (
    <>
    <Typography className="required">
        {selectedValue?.required && "*"}
      </Typography>
      <Typography
        component="div"
        variant="body1"
        dangerouslySetInnerHTML={{
          __html: he.decode(selectedValue.question),
        }}
      ></Typography>
      <Box sx={{ p: 3 }}>
        <OutlinedInput
          placeholder="Please enter some value"
          fullWidth
          size="small"
          margin="dense"
          sx={{
            borderRadius: "4px",
          }}
          className="input"
        />
      </Box>
    </>
  );
}

export default ShortTextChoiceSurveySection;
