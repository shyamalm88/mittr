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

const PollOptionWrapper = () => {
  const contextValue = usePollCreationContext();

  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );
  const open = Boolean(anchorEl);

  const [options, setOptions] = React.useState([
    { id: uuidv4(), label: "Option", value: "" },
    { id: uuidv4(), label: "Option", value: "" },
  ]);
  const addOption = () => {
    const temp = { id: uuidv4(), label: "Option", value: "" };
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

  return (
    <>
      <React.Fragment>
        {options.map((item, index) => {
          const fieldName = `options[${index}]`;
          return (
            <FormControl
              sx={{ mb: 1, width: "100%" }}
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
                    background: "#fff",
                    borderRadius: "4px",
                  }}
                  name={`${fieldName}.option`}
                  multiline
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="Delete Option"
                        edge="end"
                        onClick={() => deleteOption(item, fieldName)}
                        disabled={options.length === 1}
                      >
                        <DeleteOutlineIcon />
                      </IconButton>
                    </InputAdornment>
                  }
                  placeholder={`${item.label} ${index + 1}`}
                  onChange={(e) => contextValue.handleChange(e)}
                />
              </fieldset>
            </FormControl>
          );
        })}
      </React.Fragment>
      <Box>
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
            startIcon={<AddCircleOutlineIcon />}
            color="inherit"
            onClick={addOption}
          >
            Add
            <Box
              sx={{ display: { xs: "none", lg: "flex", paddingLeft: "5px" } }}
            >
              another choice
            </Box>
          </Button>
          <Button
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
          </Button>
          <Popover
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
          >
            <Typography sx={{ p: 2 }}>The content of the Popover.</Typography>
          </Popover>
        </Stack>
      </Box>
    </>
  );
};
export default PollOptionWrapper;
