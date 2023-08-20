import React from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Chip from "@mui/material/Chip";
import TextField from "@mui/material/TextField";
import Divider from "@mui/material/Divider";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

import { TagOptionsType } from "../../../types";
import { v4 as uuidv4 } from "uuid";

const topics = [
  { id: uuidv4(), label: "New Topic1" },
  { id: uuidv4(), label: "New Topic2" },
  { id: uuidv4(), label: "New Topic3" },
];

export const Topic = () => {
  const [addedTopics, setAddedTopics] = React.useState<TagOptionsType[]>([]);
  const [customVal, setCustomVal] = React.useState<string>("");
  const handleClick = (e: React.SyntheticEvent, option: TagOptionsType) => {
    setAddedTopics([...addedTopics, option]);
  };

  const handleDelete = (e: React.SyntheticEvent, option: TagOptionsType) => {
    setAddedTopics(addedTopics.filter((x) => x.id !== option.id));
  };

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomVal(e.target.value);
  };

  const handleKeyPress = (
    e: React.KeyboardEvent<HTMLInputElement> | React.MouseEvent | any
  ) => {
    if (e.key == "Enter" || e.type === "click") {
      if (customVal.trim()) {
        setAddedTopics([...addedTopics, { label: customVal, id: uuidv4() }]);
      }
      setCustomVal("");
    }
  };

  return (
    <Box sx={{ p: 2, width: "300px" }}>
      <Stack sx={{ mx: 2 }} direction={"row"}>
        <FormControl sx={{ mb: 1, width: "100%" }} variant="outlined">
          <fieldset
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
                background: "rgb(55, 65, 81)",
                borderRadius: "4px",
              }}
              value={customVal}
              onChange={handleChangeInput}
              onKeyDown={handleKeyPress}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="Delete Option"
                    edge="end"
                    onClick={handleKeyPress}
                  >
                    <AddCircleOutlineIcon />
                  </IconButton>
                </InputAdornment>
              }
              placeholder="Add custom topic"
              //   onChange={(e) => contextValue.handleChange(e)}
            />
          </fieldset>
        </FormControl>
      </Stack>
      <Stack sx={{ mx: 2 }} direction={"row"}>
        <Box sx={{ color: "rgb(156, 163, 175)" }}>
          <Box sx={{ my: 2 }}>
            {addedTopics.length > 0 && (
              <Divider textAlign="left" variant="fullWidth">
                Added Topics
              </Divider>
            )}
            {addedTopics.map((option) => {
              return (
                <Chip
                  label={option.label}
                  onClick={(e) => handleClick(e, option)}
                  key={option.id}
                  size="small"
                  variant="outlined"
                  sx={{ m: 0.3 }}
                  onDelete={(e: any) => handleDelete(e, option)}
                />
              );
            })}
          </Box>

          <Divider textAlign="left" variant="fullWidth">
            Suggested Topics
          </Divider>
          {topics.map((option) => {
            return (
              <Chip
                label={option.label}
                onClick={(e) => handleClick(e, option)}
                key={option.id}
                size="small"
                variant="outlined"
                sx={{ m: 0.3 }}
                icon={<AddCircleOutlineIcon sx={{ color: "inherit" }} />}
                disabled={
                  addedTopics.findIndex((x) => x.id === option.id) != -1
                    ? true
                    : undefined
                }
              />
            );
          })}
        </Box>
      </Stack>
    </Box>
  );
};
