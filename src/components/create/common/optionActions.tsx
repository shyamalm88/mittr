import { Box, Button, Stack, Tooltip, Typography } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import AltRouteOutlinedIcon from "@mui/icons-material/AltRouteOutlined";
import ViewDayOutlinedIcon from "@mui/icons-material/ViewDayOutlined";
import VerticalSplitOutlinedIcon from "@mui/icons-material/VerticalSplitOutlined";
import React from "react";
import { ComponentInputProps } from "../../../types";
import { usePollOrSurveyContext } from "../../../hooks/usePollOrSurveyContext";

function OptionActions({
  addOption,
  addOtherOption,
  getValues,
  fieldName,
  selectedValue,
}: ComponentInputProps) {
  const { pollOrSurvey, setPollOrSurvey } = usePollOrSurveyContext();

  return (
    <Box>
      <Stack
        direction="row"
        spacing={1}
        sx={{
          display: "flex",
          justifyContent: "flex-start",
          color: "rgb(156, 163, 175)",
        }}
      >
        {(selectedValue === "multiple_choice" ||
          selectedValue === "check_box" ||
          selectedValue === "image" ||
          selectedValue === "image_choice") && (
          <>
            <Tooltip title="Add another choice" arrow placement="left">
              <Button
                size="small"
                sx={{ textTransform: "none" }}
                startIcon={<AddCircleOutlineIcon />}
                onClick={addOption}
                variant="outlined"
                disabled={
                  getValues(
                    pollOrSurvey === "poll"
                      ? `${fieldName}`
                      : `${fieldName}.options`
                  )?.length >= 5
                }
              >
                Add
                <Box
                  sx={{
                    display: { xs: "none", lg: "flex", paddingLeft: "5px" },
                  }}
                >
                  another
                </Box>
              </Button>
            </Tooltip>
            <Typography
              variant="body2"
              sx={{ alignItems: "center", display: "flex" }}
            >
              Or
            </Typography>
            <Tooltip title="Add Other" arrow placement="left">
              <Button
                size="small"
                sx={{ textTransform: "none" }}
                startIcon={<AltRouteOutlinedIcon />}
                onClick={addOtherOption}
                disabled={
                  getValues(
                    pollOrSurvey === "poll"
                      ? `${fieldName}`
                      : `${fieldName}.options`
                  )?.length >= 5
                }
              >
                Add Other
              </Button>
            </Tooltip>
          </>
        )}
        {(selectedValue === "multiple_choice_grid" ||
          selectedValue === "checkbox_grid") && (
          <>
            {addOption && (
              <Tooltip title="Add another choice" arrow placement="left">
                <Button
                  size="small"
                  sx={{ textTransform: "none" }}
                  startIcon={<ViewDayOutlinedIcon />}
                  onClick={addOption}
                  variant="outlined"
                  disabled={
                    getValues(
                      pollOrSurvey === "poll"
                        ? `${fieldName}`
                        : `${fieldName}.options`
                    )?.length >= 5
                  }
                >
                  Add rows
                </Button>
              </Tooltip>
            )}
            {addOption && addOtherOption && (
              <Typography
                variant="body2"
                sx={{ alignItems: "center", display: "flex" }}
              >
                Or
              </Typography>
            )}
            {addOtherOption && (
              <Tooltip title="Add Other" arrow placement="left">
                <Button
                  size="small"
                  sx={{ textTransform: "none" }}
                  startIcon={<VerticalSplitOutlinedIcon />}
                  onClick={addOtherOption}
                  variant="outlined"
                  disabled={
                    getValues(
                      pollOrSurvey === "poll"
                        ? `${fieldName}`
                        : `${fieldName}.options`
                    )?.length >= 5
                  }
                >
                  Add Columns
                </Button>
              </Tooltip>
            )}
          </>
        )}
        {/* <Button
            size="small"
            sx={{ textTransform: "none" }}
            startIcon={<LocalFireDepartmentOutlinedIcon />}
            endIcon={<ExpandMoreIcon />}
            color="inherit"
            onClick={handleClick}
          >
            <Box
              sx={{
                display: {
                  xs: "none",
                  lg: "flex",
                  paddingLeft: "5px",
                  paddingRight: "5px",
                },
              }}
            >
              Choose
            </Box>
            Topics
          </Button> */}
        {/* <Popover
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            elevation={8}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
          >
            <Topic
              handleSave={(e: any) => handleTopicSave(e)}
              selectedTopics={addedTopics}
            />
          </Popover> */}
      </Stack>
      {/* <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap={true}>
        {addedTopics.map((item) => {
          return (
            <Chip
              key={item.id}
              variant="outlined"
              label={item.label}
              size="small"
              color="info"
            />
          );
        })}
      </Stack> */}
    </Box>
  );
}

export default OptionActions;
