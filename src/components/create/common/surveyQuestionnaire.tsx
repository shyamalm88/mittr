import React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import PollOptionWrapper from "../createOptionWrapper.component";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardMedia from "@mui/material/CardMedia";
import { IconButton, Stack } from "@mui/material";
import FormValidationError from "../../../utility/FormValidationError";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { useFormContext } from "react-hook-form";
import HttpService from "../../../services/@http/HttpClient";
import WallpaperIcon from "@mui/icons-material/Wallpaper";
import { ComponentInputProps } from "../../../types";
import { usePollOrSurveyContext } from "../../../hooks/usePollOrSurveyContext";
import Paper from "@mui/material/Paper";
import MenuList from "@mui/material/MenuList";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";
import ListItemIcon from "@mui/material/ListItemIcon";
import ContentCopy from "@mui/icons-material/ContentCopy";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import TextFieldsOutlinedIcon from "@mui/icons-material/TextFieldsOutlined";
import Portal from "@mui/material/Portal";
import Tooltip from "@mui/material/Tooltip";
import { v4 as uuidv4 } from "uuid";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import ContentCopyOutlinedIcon from "@mui/icons-material/ContentCopyOutlined";
import { useQuestionTypeContext } from "../../../hooks/useQuestionTypeContext";
import CalendarViewDayOutlinedIcon from "@mui/icons-material/CalendarViewDayOutlined";

function SurveyQuestionnaire({
  fieldName,
  append,
  index,
  update,
}: ComponentInputProps) {
  const http = new HttpService();

  const { pollOrSurvey, setPollOrSurvey } = usePollOrSurveyContext();
  const { questionType, setQuestionType } = useQuestionTypeContext();

  let fieldNameQuestion: any =
    pollOrSurvey === "poll" ? `${fieldName}` : `${fieldName}`.split(".");

  const [question, setQuestion] = React.useState();
  const [questionImageValue, setQuestionImageValue] = React.useState<{
    imageId: string;
    dimensions: {
      width: number;
      height: number;
    };
    destination: string;
    filename: string;
  }>();

  const {
    handleSubmit,
    setError,
    reset,
    formState: { errors },
    control,
    getValues,
    setValue,
    clearErrors,
    register,
    setFocus,
  } = useFormContext();

  const handleChange = (e: any) => {
    onSubmit(e.target.files[0]);
  };

  const handleRemove = (e: any) => {};

  const onSubmit = async (fileData: any) => {
    const formData: any = new FormData();
    formData.append("image", fileData);
    try {
      const response: any = await http
        .service()
        .postMultipart(`/survey/image`, formData);
      console.log(response);
      setQuestionImageValue(response.body);
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddNewSurvey = async () => {
    const tempQuestion = {
      question: "",
      id: uuidv4(),
      votingType: "multiple_choice",
    };
    await append(tempQuestion);

    setQuestionType([...questionType, "multiple_choice"]);

    console.log(getValues("survey"));
  };

  const handleAddNewSection = async () => {
    const tempQuestion = {
      title: "Section Title",
      id: uuidv4(),
      description: "",
      type: "section",
    };
    await append(tempQuestion);
  };

  return (
    <>
      <Box
        sx={{
          width: "100%",
          backgroundColor: (theme: any) =>
            theme.palette.customColors.backgroundColor,
          borderRadius: "4px 4px 0px 0px",
          px: 2,
          py: 1,
          borderWidth: "1px",
          borderStyle: "solid",
          borderColor: (theme: any) => theme.palette.customColors.border,
        }}
      >
        <TextField
          multiline
          rows={4}
          placeholder="Write Survey Question Here"
          variant="standard"
          size="small"
          fullWidth
          error={
            pollOrSurvey === "poll"
              ? !!errors.question
              : !!(errors as any)?.[fieldNameQuestion[0]]?.[
                  fieldNameQuestion[1]
                ]?.question
          }
          {...register(
            `${
              pollOrSurvey === "poll" ? "question" : `${fieldName}.question`
            }` as const,
            {
              required: "Please provide a Poll Question",
              pattern: {
                value: /^[a-zA-Z0-9 .,?!@#$%^&*()_+-=;:'"|\\]*$/,
                message: `Please enter a valid text. Only few special characters allowed. ">", "\`", "~", "{", "}", "[", "]", "'", "\"" are not allowed`,
              },
            }
          )}
          value={question}
          InputProps={{
            disableUnderline: !Boolean(
              pollOrSurvey === "poll"
                ? errors?.question?.message
                : (errors as any)?.[fieldNameQuestion[0]]?.[
                    fieldNameQuestion[1]
                  ]?.question?.message
            ),
            style: {
              color: "inherit",
            },
          }}
        />

        {pollOrSurvey === "poll" && (
          <>
            <input
              accept="image/*"
              type="file"
              style={{
                position: "absolute",
                right: "0px",
                zIndex: 1,
                cursor: "pointer",
                opacity: 0,
                height: "40px",
                width: "40px",
                top: 0,
              }}
              id={"questionImage"}
              {...register(`questionImage` as const, {
                onChange: (e: any) => {
                  handleChange(e);
                },
              })}
            />
            <label htmlFor={"questionImage"}>
              <IconButton
                aria-label="questionImage"
                sx={{ position: "absolute", top: 0, right: 0 }}
              >
                <WallpaperIcon />
              </IconButton>
            </label>
          </>
        )}

        <FormValidationError
          errorText={
            pollOrSurvey === "poll"
              ? errors?.question?.message
              : (errors as any)?.[fieldNameQuestion[0]]?.[fieldNameQuestion[1]]
                  ?.question?.message
          }
        />

        {questionImageValue && (
          <>
            {console.log(questionImageValue.imageId)}
            <input
              type="text"
              value={questionImageValue.imageId}
              {...register(`questionImageRef`)}
            />
            <Card sx={{ position: "relative" }}>
              <CardMedia
                component="img"
                sx={{
                  height: "300px",
                  backgroundSize: "contain",
                  backgroundPosition: "top",
                }}
                loading="lazy"
                image={
                  questionImageValue.destination +
                  "/" +
                  questionImageValue.filename
                }
                title="green iguana"
              />
              <CardActions sx={{ p: 0 }}>
                <IconButton
                  aria-label="delete"
                  sx={{ position: "absolute", top: 0, right: 0 }}
                  onClick={(e) => handleRemove(e)}
                >
                  <CloseRoundedIcon />
                </IconButton>
              </CardActions>
            </Card>
          </>
        )}
      </Box>
      <Box
        sx={{
          width: "100%",
          backgroundColor: "transparent",
          borderWidth: "1px",
          borderStyle: "solid",
          borderBottomWidth: pollOrSurvey === "poll" ? "1px" : "0px",
          borderColor: (theme: any) => theme.palette.customColors.borderAlt,
          px: 2,
          py: 1,
        }}
      >
        <PollOptionWrapper fieldName={`${fieldName}`} index={index} />
      </Box>
      {pollOrSurvey === "survey" && (
        <Box
          sx={{
            width: "100%",
            borderWidth: "1px",
            borderStyle: "solid",
            borderRadius: "0px 0px 4px 4px",
            borderColor: (theme: any) => theme.palette.customColors.borderAlt,
            backgroundColor: (theme: any) =>
              theme.palette.customColors.backgroundColor,
            px: 2,
            py: 1,
            mb: 2,
          }}
        >
          <Stack
            direction={"row"}
            spacing={2}
            useFlexGap
            divider={<Divider orientation="vertical" flexItem />}
          >
            <IconButton>
              <DeleteOutlinedIcon fontSize="small" />
            </IconButton>
            <IconButton>
              <ContentCopyOutlinedIcon fontSize="small" />
            </IconButton>
          </Stack>
        </Box>
      )}
      {pollOrSurvey == "survey" && index == 0 && (
        <Portal container={document.getElementById("surveyActionMenuPortal")}>
          <Paper
            sx={{
              width: 60,
            }}
          >
            <MenuList>
              <MenuItem onClick={handleAddNewSurvey}>
                <ListItemIcon>
                  <Tooltip title="Add Section" placement="top">
                    <AddCircleOutlineIcon />
                  </Tooltip>
                </ListItemIcon>
              </MenuItem>
              <MenuItem>
                <ListItemIcon>
                  <Tooltip title="Add Title Description" placement="top">
                    <TextFieldsOutlinedIcon />
                  </Tooltip>
                </ListItemIcon>
              </MenuItem>
              <MenuItem onClick={handleAddNewSection}>
                <ListItemIcon>
                  <Tooltip title="Add Section" placement="top">
                    <CalendarViewDayOutlinedIcon />
                  </Tooltip>
                </ListItemIcon>
              </MenuItem>
            </MenuList>
          </Paper>
        </Portal>
      )}
    </>
  );
}

export default SurveyQuestionnaire;