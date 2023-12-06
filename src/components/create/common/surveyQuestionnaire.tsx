import React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import PollOptionWrapper from "../createOptionWrapper.component";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardMedia from "@mui/material/CardMedia";

import {
  FormControlLabel,
  Hidden,
  IconButton,
  Menu,
  Stack,
  Switch,
  useTheme,
} from "@mui/material";
import FormValidationError from "../../../utility/FormValidationError";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { useFormContext } from "react-hook-form";
import HttpService from "../../../services/@http/HttpClient";
import WallpaperIcon from "@mui/icons-material/Wallpaper";
import { ComponentInputProps } from "../../../types";
import { usePollOrSurveyContext } from "../../../hooks/usePollOrSurveyContext";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import ContentCopyOutlinedIcon from "@mui/icons-material/ContentCopyOutlined";
import { useQuestionTypeContext } from "../../../hooks/useQuestionTypeContext";
import { REQUIRED } from "../../../constants/error";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import TipTapEditor from "./TipTap";
import { useEditDataContext } from "../../../hooks/useEditDataContext";
import he from "he";

function SurveyQuestionnaire({
  fieldName,
  append,
  index,
  update,
  remove,
  swap,
  fields,
}: ComponentInputProps) {
  const http = new HttpService();
  const { editableData } = useEditDataContext();

  const { pollOrSurvey, setPollOrSurvey } = usePollOrSurveyContext();
  const { questionType, setQuestionType } = useQuestionTypeContext();
  const [editable, setEditable] = React.useState(false);
  const [question, setQuestion] = React.useState("");

  const theme = useTheme();

  const handleEditorClick = () => {
    setEditable(true);
  };

  const handleEditorBlur = (e: any) => {
    setEditable(false);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  let fieldNameQuestion: any =
    pollOrSurvey === "poll" ? `${fieldName}` : `${fieldName}`.split(".");

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

  React.useEffect(() => {
    if (editableData) {
      if (editableData?.survey) {
        editableData?.survey.forEach((item: any, idx: number) => {
          if (index === idx) {
            setValue(`${fieldName}.question`, item.question);
            setQuestion(he.decode(item.question));
          }
        });
      } else {
        setValue("question", he.decode(editableData.question));
        setQuestion(he.decode(editableData.question));
      }
    }
  }, [editableData, setValue, setQuestion, fieldName]);

  const handleChange = (e: any) => {
    onSubmit(e.target.files[0]);
  };

  function htmlEncode(str: string) {
    return str.replace(/[&<>"']/g, function ($0) {
      return (
        "&" +
        { "&": "amp", "<": "lt", ">": "gt", '"': "quot", "'": "#39" }[$0] +
        ";"
      );
    });
  }

  const handleEditorChange = ({ editor }: any) => {
    const encodedHtml = htmlEncode(editor.getHTML().replace(/\s/g, "&nbsp;"));
    setQuestion(encodedHtml);
    setValue(
      `${pollOrSurvey === "poll" ? "question" : `${fieldName}.question`}`,
      encodedHtml,
      {
        shouldDirty: true,
        shouldTouch: true,
      }
    );
  };

  const handleRemove = (e: any) => {};

  const onSubmit = async (fileData: any) => {
    const formData: any = new FormData();
    formData.append("image", fileData);
    try {
      const response: any = await http
        .service()
        .postMultipart(`/survey/image/upload`, formData);
      setQuestionImageValue(response.body);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSurveyQuestionRemove = (index: Number) => {
    remove(index);
    const tempQType = questionType;
    tempQType.splice(index, 1);
    setQuestionType(tempQType);
  };

  const swapPositions = (fromIndex: number, toIndex: number) => {
    swap(fromIndex, toIndex);
    handleClose();
    const tempQType = questionType;
    let temp = tempQType[fromIndex];
    tempQType[fromIndex] = tempQType[toIndex];
    tempQType[toIndex] = temp;
    setQuestionType(tempQType);
    setTimeout(() => {
      // console.log(getValues());
      // console.log(questionType);
    }, 0);
  };

  return (
    <>
      <Box
        sx={{
          width: "100%",
          backgroundColor: (theme: any) =>
            theme.palette.customColors.backgroundColor,
          borderRadius: "4px 4px 0px 0px",
          // px: 2,
          // py: 1,
          // pt: 2,
          mb: 0,
          borderWidth: "1px",
          borderStyle: "solid",
          borderColor: (theme: any) => theme.palette.customColors.border,
          borderTopColor: (theme: any) =>
            pollOrSurvey === "poll"
              ? theme.palette.customColors.border
              : theme.palette.info.light,
          borderTopWidth: pollOrSurvey === "poll" ? "1px" : "2px",
        }}
      >
        <TipTapEditor
          placeHolder={
            pollOrSurvey === "poll"
              ? "Write Poll Question Here"
              : "Write Survey Question Here"
          }
          handleChange={handleEditorChange}
          handleEditorClick={handleEditorClick}
          handleEditorBlur={handleEditorBlur}
          editable={editable}
          dataContext={question}
        />

        <Hidden xsUp>
          <TextField
            rows={2}
            sx={{ pt: 0.7 }}
            placeholder={
              pollOrSurvey === "poll"
                ? "Write Poll Question Here"
                : "Write Survey Question Here"
            }
            variant="standard"
            size="small"
            fullWidth
            autoFocus
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
                required: REQUIRED.QUESTION,
                // pattern: {
                //   value: PATTERN,
                //   message: REQUIRED.PATTERN,
                // },
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
        </Hidden>
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
            p: 0.5,
            px: 2,
            mb: 2,
          }}
        >
          <Stack
            direction={"row"}
            spacing={1}
            useFlexGap
            justifyContent="flex-end"
            divider={<Divider orientation="vertical" flexItem />}
          >
            <IconButton
              onClick={() => handleSurveyQuestionRemove(index)}
              disabled={fields?.length === 1}
              size="small"
            >
              <DeleteOutlinedIcon
                sx={{
                  color: theme.palette.text.secondary,
                  opacity: fields?.length === 1 ? 0.4 : 1,
                }}
              />
            </IconButton>
            <IconButton size="small">
              <ContentCopyOutlinedIcon
                fontSize="small"
                sx={{ color: theme.palette.text.secondary }}
              />
            </IconButton>
            <FormControlLabel
              value="end"
              control={<Switch color="success" size="small" />}
              label="Required"
              labelPlacement="end"
              disableTypography
              sx={{ pl: 2, fontSize: ".75em" }}
            />
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
              <MenuItem
                dense
                disabled={index === 0}
                onClick={() => swapPositions(index, index - 1)}
              >
                <Stack direction="row" spacing={2} useFlexGap>
                  <ExpandLessIcon />
                  Move Up
                </Stack>
              </MenuItem>
              <MenuItem
                dense
                disabled={fields?.length - 1 === index}
                onClick={() => swapPositions(index, index + 1)}
              >
                <Stack direction="row" spacing={2} useFlexGap>
                  <ExpandMoreIcon />
                  Move Down
                </Stack>
              </MenuItem>
            </Menu>
          </Stack>
        </Box>
      )}
    </>
  );
}

export default SurveyQuestionnaire;
