import { Box, OutlinedInput, Typography, useTheme } from "@mui/material";
import { ComponentInputProps } from "../../../../types";
import he from "he";
import { useFormContext } from "react-hook-form";

function ShortTextChoiceSurveySection({
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
        <OutlinedInput
          placeholder="Please enter some value"
          fullWidth
          size="small"
          margin="dense"
          sx={{
            borderRadius: "4px",
          }}
          className="input"
          {...register(
            `${fieldName}.segments[${actualIndex}].selectedValue[${idx}].shortText` as const
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

export default ShortTextChoiceSurveySection;
