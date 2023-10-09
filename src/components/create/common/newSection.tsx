import { Box, Card, Stack, TextField } from "@mui/material";
import React from "react";
import { ComponentInputProps } from "../../../types";
import FormValidationError from "../../../utility/FormValidationError";
import { PATTERN, REQUIRED } from "../../../constants/error";

function NewSection({
  register,
  titleFieldName,
  descriptionFieldName,
  index,
  errors,
}: ComponentInputProps) {
  console.log(errors);
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        flex: 1,
        width: "100%",
        position: "relative",
        mb: 2,
      }}
    >
      <Card
        variant="outlined"
        sx={{
          p: 2,
          borderRadius: "4px",
          borderTopColor: (theme) => theme.palette.info.light,
          borderTopStyle: "solid",
          borderTopWidth: "4px",
        }}
        className="card"
      >
        <Stack direction={"column"} spacing={2} useFlexGap>
          <TextField
            multiline
            rows={1}
            placeholder={
              index ? "Write Section Title Here" : "Write Survey Title Here"
            }
            variant="standard"
            size="small"
            fullWidth
            error={
              index
                ? !!(errors as any)?.[titleFieldName.split(".")[0]]?.[
                    titleFieldName.split(".")[1]
                  ]?.[titleFieldName.split(".")[2]]?.message
                : !!(errors as any)?.[titleFieldName]?.message
            }
            {...register(`${titleFieldName}` as const, {
              required: index ? REQUIRED.SECTION_TITLE : REQUIRED.SURVEY_TITLE,
              pattern: {
                value: PATTERN,
                message: REQUIRED.PATTERN,
              },
            })}
            InputProps={{
              style: {
                color: "inherit",
              },
            }}
          />
          <FormValidationError
            errorText={
              index
                ? (errors as any)?.[titleFieldName.split(".")[0]]?.[
                    titleFieldName.split(".")[1]
                  ]?.[titleFieldName.split(".")[2]]?.message
                : (errors as any)?.[titleFieldName]?.message
            }
          />
          <TextField
            multiline
            rows={2}
            placeholder={
              index
                ? "Write Section Description Here"
                : "Write Survey Description Here"
            }
            variant="standard"
            size="small"
            fullWidth
            error={
              index
                ? !!(errors as any)?.[descriptionFieldName.split(".")[0]]?.[
                    descriptionFieldName.split(".")[1]
                  ]?.[descriptionFieldName.split(".")[2]]?.message
                : !!(errors as any)?.[descriptionFieldName]?.message
            }
            {...register(`${descriptionFieldName}` as const, {
              pattern: {
                value: PATTERN,
                message: REQUIRED.PATTERN,
              },
            })}
            InputProps={{
              style: {
                color: "inherit",
              },
            }}
          />
          <FormValidationError
            errorText={
              index
                ? (errors as any)?.[descriptionFieldName.split(".")[0]]?.[
                    descriptionFieldName.split(".")[1]
                  ]?.[descriptionFieldName.split(".")[2]]?.message
                : (errors as any)?.[descriptionFieldName]?.message
            }
          />
        </Stack>
      </Card>
    </Box>
  );
}

export default NewSection;
