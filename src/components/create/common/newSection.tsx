import {
  Box,
  Card,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  TextField,
  useTheme,
} from "@mui/material";
import React from "react";
import { ComponentInputProps } from "../../../types";
import FormValidationError from "../../../utility/FormValidationError";
import { PATTERN, REQUIRED } from "../../../constants/error";
import { usePollOrSurveyContext } from "../../../hooks/usePollOrSurveyContext";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import ContentCopyOutlinedIcon from "@mui/icons-material/ContentCopyOutlined";

function NewSection({
  register,
  titleFieldName,
  descriptionFieldName,
  index,
  errors,
  fields,
  remove,
}: ComponentInputProps) {
  const theme = useTheme();
  const { pollOrSurvey, setPollOrSurvey } = usePollOrSurveyContext();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleSurveyQuestionRemove = (index: Number) => {
    remove(index);
  };
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
          borderTopColor: (theme) => theme.palette.info.main,
          borderTopStyle: "solid",
          borderTopWidth: "4px",
          pb: fields ? 0 : 4,
        }}
        className="card"
      >
        <Stack direction={"column"} spacing={2} useFlexGap>
          <Stack direction={"column"} spacing={0} useFlexGap>
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
                required: index
                  ? REQUIRED.SECTION_TITLE
                  : REQUIRED.SURVEY_TITLE,
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
          </Stack>

          <Stack direction={"column"} spacing={0} useFlexGap>
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
        </Stack>
        {pollOrSurvey === "survey" && fields && (
          <Box
            sx={{
              width: "100%",
              borderRadius: "0px 0px 4px 4px",
              backgroundColor: (theme: any) =>
                theme.palette.customColors.backgroundColor,
            }}
          >
            <Stack
              direction={"row"}
              spacing={1}
              useFlexGap
              justifyContent="flex-end"
            >
              <IconButton
                onClick={() => handleSurveyQuestionRemove(index)}
                disabled={fields?.length === 1}
                size="small"
              >
                <DeleteOutlinedIcon
                  fontSize="small"
                  sx={{ color: theme.palette.text.secondary }}
                />
              </IconButton>
              <IconButton size="small">
                <ContentCopyOutlinedIcon
                  fontSize="small"
                  sx={{ color: theme.palette.text.secondary }}
                />
              </IconButton>
              <IconButton size="small" onClick={handleClick}>
                <MoreVertIcon sx={{ color: theme.palette.text.secondary }} />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
              >
                <MenuItem dense disabled={index === 0}>
                  <Stack direction="row" spacing={2} useFlexGap>
                    <ExpandLessIcon />
                    Move Up
                  </Stack>
                </MenuItem>
                <MenuItem dense disabled={fields?.length - 1 === index}>
                  <Stack direction="row" spacing={2} useFlexGap>
                    <ExpandMoreIcon />
                    Move Down
                  </Stack>
                </MenuItem>
              </Menu>
            </Stack>
          </Box>
        )}
      </Card>
    </Box>
  );
}

export default NewSection;
