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

const PollFormWrapper = () => {
  const contextValue = usePollCreationContext();
  return (
    <Box
      sx={{ display: "flex", flexDirection: "column", flex: 1, width: "100%" }}
    >
      <Box
        sx={{
          width: "100%",
          backgroundColor: "#fff",
          borderRadius: "4px 4px 0px 0px",
          px: 2,
          py: 1,
          border: "1px solid #e7e7e7",
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
          }}
          onChange={(e) => contextValue.handleChange(e)}
        />
      </Box>
      <Box
        sx={{
          width: "100%",
          backgroundColor: "#F3F3F3",
          border: "1px solid #e7e7e7",
          px: 2,
          py: 1,
        }}
      >
        <PollOptionWrapper />
      </Box>
      <Box
        sx={{
          width: "100%",
          backgroundColor: "#F6F6F6",
          border: "1px solid #E0E0E0",
          px: 2,
          py: 0.3,
          borderRadius: "0px 0px 4px 4px",
        }}
      >
        <Stack
          direction="row"
          spacing={2}
          sx={{
            display: "flex",
            justifyContent: "space-between",
            color: "#6B6B6B",
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
                  color: "#6B6B6B",
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
