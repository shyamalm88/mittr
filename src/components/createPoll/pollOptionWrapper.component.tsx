import * as React from "react";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import Button from "@mui/material/Button";
import LocalFireDepartmentOutlinedIcon from "@mui/icons-material/LocalFireDepartmentOutlined";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import { v4 as uuidv4 } from "uuid";
import { OptionProp } from "../../types";
import { usePollCreationContext } from "../../hooks/usePollCreationContext";
import AltRouteOutlinedIcon from "@mui/icons-material/AltRouteOutlined";
import { Topic } from "./topic/topic.component";
import Tooltip from "@mui/material/Tooltip";
import { Chip, useTheme } from "@mui/material";

const PollOptionWrapper = () => {
  const theme = useTheme();
  const contextValue = usePollCreationContext();
  const [addedTopics, setAddedTopics] = React.useState<
    { id: string; label: string }[]
  >([]);

  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );
  const open = Boolean(anchorEl);

  const [options, setOptions] = React.useState([
    { id: uuidv4(), label: "Option", value: "", enabled: true },
    { id: uuidv4(), label: "Option", value: "", enabled: true },
  ]);
  const addOption = () => {
    const temp = { id: uuidv4(), label: "Option", value: "", enabled: true };
    setOptions([...options, temp]);
  };

  const addOtherOption = () => {
    const temp = {
      id: uuidv4(),
      label: "Other",
      value: "Other",
      enabled: false,
    };
    setOptions([...options, temp]);
  };

  const deleteOption = (option: OptionProp, fieldName: string) => {
    setOptions(options.filter((item) => item.id != option.id));
    contextValue.handleDeleteFromList(fieldName);
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleTopicSave = (e: any[]) => {
    setAddedTopics(e);
    handleClose();
  };

  return (
    <>
      <React.Fragment>
        {options.map((item, index) => {
          const fieldName = `options[${index}]`;
          return (
            <FormControl
              sx={{ mb: 1, width: "100%", color: theme.palette.text.primary }}
              variant="outlined"
              key={item.id}
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
                <OutlinedInput
                  size="small"
                  margin="dense"
                  sx={{
                    borderRadius: "4px",
                  }}
                  className="input"
                  name={`${fieldName}.option`}
                  multiline
                  readOnly={!item.enabled}
                  autoFocus
                  defaultValue={!item.enabled ? "Other" : ""}
                  endAdornment={
                    <InputAdornment
                      position="end"
                      sx={{ color: theme.palette.action.active }}
                    >
                      <IconButton
                        aria-label="Delete Option"
                        edge="end"
                        sx={{ color: "inherit" }}
                        onClick={() => deleteOption(item, fieldName)}
                        disabled={options.length === 1}
                      >
                        <DeleteOutlineIcon />
                      </IconButton>
                    </InputAdornment>
                  }
                  placeholder={`${item.label} ${index + 1}`}
                  onChange={(e) => contextValue.handleChange(e)}
                  onBlur={(e) => {
                    !item.enabled && contextValue.handleChange(e);
                  }}
                />
              </fieldset>
            </FormControl>
          );
        })}
      </React.Fragment>
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
          <Tooltip title="Add another choice" arrow placement="left">
            <Button
              size="small"
              sx={{ textTransform: "none" }}
              startIcon={<AddCircleOutlineIcon />}
              onClick={addOption}
              variant="outlined"
              disabled={options.length >= 5}
            >
              Add
              <Box
                sx={{ display: { xs: "none", lg: "flex", paddingLeft: "5px" } }}
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
              disabled={options.length >= 5}
            >
              Add Other
            </Button>
          </Tooltip>
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

        <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap={true}>
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
        </Stack>
      </Box>
    </>
  );
};
export default PollOptionWrapper;
