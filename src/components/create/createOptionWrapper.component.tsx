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
import AltRouteOutlinedIcon from "@mui/icons-material/AltRouteOutlined";
import { Topic } from "./topic/topic.component";
import Tooltip from "@mui/material/Tooltip";
import { Chip, useTheme } from "@mui/material";
import { useFormContext, useFieldArray } from "react-hook-form";
import FormValidationError from "../../utility/FormValidationError";
import VotingType from "./votingType";
import VotingTemplateSwitch from "./votingTemplateSwitch";

const PollOptionWrapper = () => {
  const theme = useTheme();

  const {
    register,
    setValue,
    unregister,
    control,
    getValues,
    formState: { errors, isSubmitSuccessful },
    reset,
    resetField,
  } = useFormContext();

  const { fields, append, prepend, remove, swap, move, insert } = useFieldArray(
    {
      control,
      name: "options",
    }
  );

  const [selectedValue, setSelectedValue] = React.useState(
    getValues("votingType")
  );

  React.useEffect(() => {
    resetField("options");
  }, [selectedValue]);

  const [addedTopics, setAddedTopics] = React.useState<
    { id: string; label: string }[]
  >([]);

  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );
  const open = Boolean(anchorEl);

  const addOption = () => {
    const temp = { id: uuidv4(), label: "Option", enabled: true };
    append(temp);
  };

  const addOtherOption = () => {
    const temp = {
      id: uuidv4(),
      label: "Other",
      enabled: false,
    };
    append(temp);
    setValue(`options.${getValues("options").length - 1}.option`, "Other");
  };

  const deleteOption = (index: number) => {
    remove(index);
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
      <VotingType
        setSelectedValue={setSelectedValue}
        selectedValue={selectedValue}
        register={register}
      />
      <VotingTemplateSwitch
        fields={fields}
        errors={errors}
        register={register}
        deleteOption={deleteOption}
        getValues={getValues}
        selectedValue={selectedValue}
        isSubmitSuccessful={isSubmitSuccessful}
        reset={reset}
      />
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
              disabled={getValues("options")?.length >= 5}
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
              disabled={getValues("options").length >= 5}
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
