import React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import PollOptionWrapper from "./pollOptionWrapper.component";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import FormatListNumberedRtlIcon from "@mui/icons-material/FormatListNumberedRtl";
import ChatOutlinedIcon from "@mui/icons-material/ChatOutlined";
import FactCheckOutlinedIcon from "@mui/icons-material/FactCheckOutlined";
import AdditionalQuestions from "../additionalQuestions/additionalQuestions.component";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import Hidden from "@mui/material/Hidden";
import { usePollCreationContext } from "../../hooks/usePollCreationContext";
import PollSettings from "../additionalQuestions/pollSettings.component";
import { Divider, Tooltip, Typography } from "@mui/material";
import { useTheme } from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { useFormContext } from "react-hook-form";

const PollFormWrapper = () => {
  const theme = useTheme();
  const [question, setQuestion] = React.useState();

  const contextValue = usePollCreationContext();
  const {
    register,
    setFocus,
    formState: { errors },
  } = useFormContext();

  React.useEffect(() => {
    setFocus("question");
  }, [setFocus]);

  return (
    <Box
      sx={{ display: "flex", flexDirection: "column", flex: 1, width: "100%" }}
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
          helperText={<>{errors?.question?.message}</>}
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
      {/* <Box
        sx={{
          width: "100%",
          backgroundColor: (theme: any) =>
            theme.palette.customColors.bottomPanel,
          borderWidth: "1px",
          borderStyle: "solid",
          borderColor: (theme: any) => theme.palette.customColors.borderAlt,
          px: 2,
          py: 0.3,
          borderRadius: "0px 0px 4px 4px",
          borderTop: "0px solid transparent",
        }}
      >
        <Stack
          direction="row"
          spacing={2}
          sx={{
            display: "flex",
            justifyContent: "space-between",
            color: (theme) => theme.palette.text.secondary,
            position: "relative",
          }}
        >
          {/* <Button
            size="small"
            sx={{ textTransform: "none" }}
            startIcon={<AccessTimeIcon />}
            color="inherit"
            onClick={(e: any) => setDisplayCalender(!displayCalender)}
          >
            {date ? date.toDateString() : "Duration"}
          </Button> */}
      {/* {displayCalender && (
            <ClickAwayListener onClickAway={handleCloseCalendar}>
              <div
                style={{
                  width: "300px",
                  position: "absolute",
                  zIndex: 9,
                  top: "80%",
                }}
              >
                <Calendar
                  onChange={(date) => {
                    handleDateChange(date, "duration");
                  }}
                  date={date}
                />
              </div>
            </ClickAwayListener>
          )} 
          <Box>
            <RadioGroup
              name="pollType"
              defaultValue="multiple_choice"
              onChange={(e) => contextValue.handleChange(e)}
            >
              <Stack
                direction="row"
                spacing={0.5}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  color: "rgb(156, 163, 175)",
                }}
              >
                <FormControlLabel
                  value="multiple_choice"
                  className="radioImage"
                  control={
                    <Radio
                      icon={<FormatListBulletedIcon />}
                      checkedIcon={<FormatListBulletedIcon />}
                      size="small"
                    />
                  }
                  label={<Hidden smDown>Multiple Choice</Hidden>}
                  labelPlacement="bottom"
                />

                <FormControlLabel
                  value="reorder_list"
                  className="radioImage"
                  control={
                    <Radio
                      icon={<FormatListNumberedRtlIcon />}
                      checkedIcon={<FormatListNumberedRtlIcon />}
                      size="small"
                    />
                  }
                  label={<Hidden smDown>Reorder List</Hidden>}
                  labelPlacement="bottom"
                />

                <FormControlLabel
                  value="q_and_a"
                  className="radioImage"
                  control={
                    <Radio
                      icon={<ChatOutlinedIcon />}
                      checkedIcon={<ChatOutlinedIcon />}
                      size="small"
                    />
                  }
                  label={<Hidden smDown>Q&A</Hidden>}
                  labelPlacement="bottom"
                />

                <FormControlLabel
                  value="survey"
                  className="radioImage"
                  control={
                    <Radio
                      icon={<FactCheckOutlinedIcon />}
                      checkedIcon={<FactCheckOutlinedIcon />}
                      size="small"
                    />
                  }
                  label={<Hidden smDown>Survey</Hidden>}
                  labelPlacement="bottom"
                />
              </Stack>
            </RadioGroup>
          </Box>
        </Stack>
      </Box> */}

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
