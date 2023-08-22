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
// import { useTheme } from "@mui/material";

const PollFormWrapper = () => {
  const contextValue = usePollCreationContext();
  // const theme = useTheme();
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
          name="question"
          InputProps={{
            disableUnderline: true,
            style: {
              color: "inherit",
            },
          }}
          onChange={(e) => contextValue.handleChange(e)}
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
      <Box
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
          }}
        >
          <Button
            size="small"
            sx={{ textTransform: "none" }}
            startIcon={<AccessTimeIcon />}
            color="inherit"
          >
            Duration
          </Button>
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
      </Box>
      <AdditionalQuestions />
    </Box>
  );
};

export default PollFormWrapper;
