import { Box, Card, Stack, TextField } from "@mui/material";
import React from "react";
import { ComponentInputProps } from "../../../types";

function NewSection({
  register,
  titleFieldName,
  descriptionFieldName,
  index,
}: ComponentInputProps) {
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
            placeholder="Write Survey Title Here"
            variant="standard"
            size="small"
            fullWidth
            {...register(`${titleFieldName}` as const, {
              required: "Please provide a Survey Title",
              pattern: {
                value: /^[a-zA-Z0-9 .,?!@#$%^&*()_+-=;:'"|\\]*$/,
                message: `Please enter a valid text. Only few special characters allowed. ">", "\`", "~", "{", "}", "[", "]", "'", "\"" are not allowed`,
              },
            })}
            InputProps={{
              style: {
                color: "inherit",
              },
            }}
          />
          <TextField
            multiline
            rows={2}
            placeholder="Write Survey Description Here"
            variant="standard"
            size="small"
            fullWidth
            {...register(`${descriptionFieldName}` as const, {
              required: "Please provide a Survey Description",
              pattern: {
                value: /^[a-zA-Z0-9 .,?!@#$%^&*()_+-=;:'"|\\]*$/,
                message: `Please enter a valid text. Only few special characters allowed. ">", "\`", "~", "{", "}", "[", "]", "'", "\"" are not allowed`,
              },
            })}
            InputProps={{
              style: {
                color: "inherit",
              },
            }}
          />
        </Stack>
      </Card>
    </Box>
  );
}

export default NewSection;
