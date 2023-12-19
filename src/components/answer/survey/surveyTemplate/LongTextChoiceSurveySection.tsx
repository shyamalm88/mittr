import { Box, TextField, Typography, useTheme } from "@mui/material";
import { ComponentInputProps } from "../../../../types";
import he from "he";
import { useFormContext } from "react-hook-form";

function LongTextChoiceSurveySection({
  selectedValue,
  fieldName,
  item,
  index: idx,
  actualIndex,
}: ComponentInputProps) {
  const theme = useTheme();
  const {
    formState: { errors },
    register,
    getValues,
    setValue,
  } = useFormContext();

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
        <TextField
          size="small"
          margin="dense"
          fullWidth
          multiline
          rows={4}
          placeholder="Please provide some value"
          {...register(
            `${fieldName}.segments[${actualIndex}].selectedValue[${idx}].longText` as const
          )}
        />
        <input
          type="hidden"
          value={selectedValue?.required}
          {...register(
            `${fieldName}.segments[${actualIndex}].selectedValue[${idx}].required` as const
          )}
        />
      </Box>
    </>
  );
}

export default LongTextChoiceSurveySection;
