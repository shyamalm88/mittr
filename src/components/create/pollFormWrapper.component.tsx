import React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import PollOptionWrapper from "./pollOptionWrapper.component";
import Stack from "@mui/material/Stack";
import AdditionalQuestions from "../additionalQuestions/additionalQuestions.component";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardMedia from "@mui/material/CardMedia";
import PollSettings from "../additionalQuestions/pollSettings.component";
import { IconButton, Tooltip, Typography } from "@mui/material";
import { useTheme } from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { useFormContext } from "react-hook-form";
import FormValidationError from "../../utility/FormValidationError";
import WallpaperIcon from "@mui/icons-material/Wallpaper";
import HttpService from "../../services/@http/HttpClient";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

const PollFormWrapper = () => {
  const http = new HttpService();
  const theme = useTheme();
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
    register,
    setFocus,
    formState: { errors },
  } = useFormContext();

  React.useEffect(() => {
    setFocus("question");
  }, [setFocus]);

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
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        flex: 1,
        width: "100%",
        position: "relative",
      }}
    >
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
          placeholder="Write Poll Question Here"
          variant="standard"
          size="small"
          fullWidth
          autoFocus
          error={!!errors.question}
          {...register("question" as const, {
            required: "Please provide a Poll Question",
            pattern: {
              value: /^[a-zA-Z0-9 .,?!@#$%^&*()_+-=;:'"|\\]*$/,
              message: `Please enter a valid text. Only few special characters allowed. ">", "\`", "~", "{", "}", "[", "]", "'", "\"" are not allowed`,
            },
          })}
          value={question}
          InputProps={{
            disableUnderline: !Boolean(errors?.question?.message),
            style: {
              color: "inherit",
            },
          }}
        />
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
        <FormValidationError errorText={(errors as any)?.question?.message} />

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
          borderColor: (theme: any) => theme.palette.customColors.borderAlt,
          px: 2,
          py: 1,
        }}
      >
        <PollOptionWrapper />
      </Box>

      <PollSettings />
      <Stack
        direction="row"
        alignItems="center"
        sx={{ color: theme.palette.text.secondary, mt: 2 }}
      >
        <Tooltip title="These supplementary questions can be tailored to the specific subject matter of your poll to enhance the quality of responses.">
          <InfoOutlinedIcon color="inherit" />
        </Tooltip>

        <Typography variant="body2" component="small" sx={{ m: 2 }}>
          Kindly suggest supplementary questions that can be incorporated to
          elicit deeper insights from those contributing to the poll.
        </Typography>
      </Stack>
      <AdditionalQuestions />
    </Box>
  );
};

export default PollFormWrapper;
