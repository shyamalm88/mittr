import React from "react";
import FormControl from "@mui/material/FormControl";
import Stack from "@mui/material/Stack";
import { ComponentInputProps, OptionProp } from "../../types";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import PollAnswerFieldSwitchTemplate from "./pollAnswerFieldSwitchTemplate.component";

export default function QuestionnairePollAnswerTemplate({
  questionItem,
  index,
  fieldName,
}: ComponentInputProps) {
  const item = questionItem;

  return (
    <Stack direction="column" sx={{ mb: 2, px: 1, borderRadius: "4px" }}>
      <Stack direction="row" spacing={2} sx={{ my: 1, color: "#6B6B6B" }}>
        <Stack
          direction="column"
          spacing={2}
          sx={{ color: "#6B6B6B", width: "100%", mr: "20px" }}
        >
          <fieldset
            name={fieldName}
            style={{
              border: "none",
              margin: 0,
              padding: 0,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <FormControl variant="outlined">
              <Typography
                variant="body1"
                component="h2"
                sx={{ textTransform: "capitalize", mb: 2 }}
              >
                {item.question}
              </Typography>
            </FormControl>
            <FormControl variant="outlined" style={{ marginTop: "5px" }}>
              <PollAnswerFieldSwitchTemplate
                selectedValue={item.answerType}
                fieldName={fieldName}
                item={item}
              />
            </FormControl>
          </fieldset>
        </Stack>
      </Stack>

      <Divider
        textAlign="center"
        sx={{
          color: "#9E9E9E",
          mr: "25px",
          display: { xs: "none", sm: "flex" },
        }}
      >
        <small>{`# End of Question ${index + 1}`}</small>
      </Divider>
    </Stack>
  );
}
