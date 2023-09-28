import React from "react";
import ImageOutlinedIcon from "@mui/icons-material/ImageOutlined";
import RadioButtonCheckedOutlinedIcon from "@mui/icons-material/RadioButtonCheckedOutlined";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Typography from "@mui/material/Typography";
import { v4 as uuidv4 } from "uuid";
import FormControl from "@mui/material/FormControl";
import Box from "@mui/material/Box";
import { ComponentInputProps, OptionProp } from "../../types";
import Stack from "@mui/material/Stack";
import { useTheme } from "@mui/material";

function VotingType({
  setSelectedValue,
  selectedValue,
  register,
}: ComponentInputProps) {
  const theme = useTheme();
  const [votingTypeOptions] = React.useState([
    {
      id: uuidv4(),
      label: "Multiple Choice",
      value: "multiple_choice",
      icon: <RadioButtonCheckedOutlinedIcon />,
    },
    {
      id: uuidv4(),
      label: "Image Poll",
      value: "image",
      icon: <ImageOutlinedIcon />,
    },
  ]);

  return (
    <>
      <Typography
        component="h2"
        variant="subtitle2"
        sx={{ mb: 1, color: theme.palette.text.primary }}
      >
        Voting Type
      </Typography>
      <FormControl
        variant="outlined"
        sx={{
          mb: 1,
          display: "flex",
          width: { xs: "100%", md: "50%" },
        }}
        size="small"
      >
        <Select
          fullWidth
          style={{
            color: "inherit",
          }}
          className="select"
          displayEmpty
          defaultValue={selectedValue}
          {...register(`votingType` as const, {
            onChange: (e: any) => {
              setSelectedValue(e.target.value);
            },
          })}
        >
          <MenuItem value="">
            <em style={{ color: "#b3b3b3" }}>Please Select Type</em>
          </MenuItem>
          {votingTypeOptions?.map((item: OptionProp) => {
            return (
              <MenuItem value={item.value} key={item?.id}>
                <Stack
                  spacing={2}
                  direction="row"
                  alignItems="center"
                  alignSelf="end"
                  useFlexGap
                >
                  <Box sx={{ color: "inherit", display: "flex" }}>
                    {item.icon}
                  </Box>
                  <Box>{item.label}</Box>
                </Stack>
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </>
  );
}

export default VotingType;
