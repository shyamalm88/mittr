import React from "react";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import Stack from "@mui/material/Stack";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Button from "@mui/material/Button";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import AnswerFieldSwitchTemplate from "./answerFieldSwitchTemplate.component";
import { ComponentInputProps, OptionProp } from "../../types";
import { usePollCreationContext } from "../../hooks/usePollCreationContext";
import Divider from "@mui/material/Divider";
import { useConfirm } from "material-ui-confirm";
import Box from "@mui/material/Box";

export default function QuestionnaireTemplate({
  typeOptions,
  questionItem,
  index,
  questionnaire,
  setQuestionnaire,
  fieldName,
}: ComponentInputProps) {
  const confirm = useConfirm();
  const contextValue = usePollCreationContext();
  const oldSelectedValue = React.useRef<HTMLInputElement[]>([]);
  const oldSelectedQuestionValue = React.useRef<HTMLInputElement[]>([]);

  const [selectedValue, setSelectedValue] = React.useState("");
  const item = questionItem;

  const handleChange = (
    event: SelectChangeEvent,
    fieldName: string,
    index: number
  ) => {
    const value = event.target.value;
    if (!oldSelectedValue.current[index].value) {
      contextValue.handleChange(event);
      setSelectedValue(value as string);
    } else {
      confirm({
        description:
          "Do you wish to proceed with changing the answer type option? Please note that selecting a different option will reset all entries related to the previous selection. Are you sure you want to continue?",
      })
        .then(() => {
          setSelectedValue(value);
          contextValue.handleUpdateAnswerType(fieldName);
          oldSelectedQuestionValue.current[index].value = "";
          contextValue.handleChange(event);
        })
        .catch(() => {
          setSelectedValue(oldSelectedValue.current[index].value as string);
          // contextValue.handleChange(event);
        });
    }
  };

  const removeQuestionnaire = (item: OptionProp, fieldName: string) => {
    setQuestionnaire(questionnaire.filter((x: OptionProp) => x.id != item.id));
    contextValue.handleDeleteFromList(fieldName);
  };

  return (
    <Stack direction="column" sx={{ mb: 2, px: 1, borderRadius: "4px" }}>
      <Stack
        direction="row"
        spacing={2}
        sx={{ my: 1, color: "rgb(156, 163, 175)" }}
      >
        <Stack
          direction="column"
          spacing={2}
          sx={{ color: "rgb(156, 163, 175)", width: "100%" }}
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
              <OutlinedInput
                size="small"
                margin="dense"
                name={`${fieldName}.question`}
                onChange={(e) => contextValue.handleChange(e)}
                sx={{
                  borderRadius: "4px",
                }}
                fullWidth
                multiline
                className="input"
                inputRef={(el) =>
                  (oldSelectedQuestionValue.current[index] = el)
                }
                placeholder={`${item?.questionLabel} ${index + 1}`}
              />
            </FormControl>
            <FormControl variant="outlined" style={{ marginTop: "5px" }}>
              <Select
                fullWidth
                size="small"
                onChange={(e) => handleChange(e, fieldName, index)}
                value={selectedValue}
                name={`${fieldName}.answerType`}
                style={{
                  color: "inherit",
                }}
                className="select"
                inputRef={(el) => (oldSelectedValue.current[index] = el)}
                displayEmpty
              >
                <MenuItem value="">
                  <em style={{ color: "#b3b3b3" }}>Please Select Type</em>
                </MenuItem>
                {typeOptions?.map((item: OptionProp) => {
                  return (
                    <MenuItem value={item.value} key={item?.id}>
                      <Stack spacing={2} direction="row">
                        <Box sx={{ color: "inherit" }}>{item.icon}</Box>
                        <Box>{item.label}</Box>
                      </Stack>
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </fieldset>
        </Stack>
        <Button
          size="small"
          sx={{
            textTransform: "none",
            width: "auto",
            minWidth: { xs: "20px", lg: "120px" },
            justifyContent: "flex-start",
            alignSelf: "center",
          }}
          startIcon={<DeleteOutlineIcon />}
          color="inherit"
          onClick={() => removeQuestionnaire(item, fieldName)}
          disabled={questionnaire?.length === 1}
        >
          <Box
            sx={{
              display: {
                xs: "none",
                lg: "flex",
              },
            }}
          >
            Remove This
          </Box>
        </Button>
      </Stack>
      <Stack
        direction="row"
        spacing={1}
        sx={{ mb: 1, mt: 0, color: "rgb(156, 163, 175)" }}
        key={item?.id}
      >
        <AnswerFieldSwitchTemplate
          selectedValue={selectedValue}
          fieldName={fieldName}
        />
      </Stack>
      <Divider
        textAlign="center"
        sx={{
          color: "#9E9E9E",
          mr: "135px",
          display: { xs: "none", sm: "flex" },
        }}
      >
        <small>{`# End of ${item?.questionLabel} ${index + 1}`}</small>
      </Divider>
    </Stack>
  );
}
