import React from "react";
import ImageOutlinedIcon from "@mui/icons-material/ImageOutlined";
import RadioButtonCheckedOutlinedIcon from "@mui/icons-material/RadioButtonCheckedOutlined";
import EventOutlinedIcon from "@mui/icons-material/EventOutlined";
import CheckBoxOutlinedIcon from "@mui/icons-material/CheckBoxOutlined";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import LinearScaleOutlinedIcon from "@mui/icons-material/LinearScaleOutlined";
import AppsRoundedIcon from "@mui/icons-material/AppsRounded";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Typography from "@mui/material/Typography";
import { v4 as uuidv4 } from "uuid";
import FormControl from "@mui/material/FormControl";
import Box from "@mui/material/Box";
import { ComponentInputProps, OptionProp } from "../../types";
import Stack from "@mui/material/Stack";
import { useTheme } from "@mui/material";
import { usePollOrSurveyContext } from "../../hooks/usePollOrSurveyContext";

const pollOrSurveyOptionsType = [
  {
    id: uuidv4(),
    label: "Multiple Choice",
    value: "multiple_choice",
    displayFor: "all",
    icon: <RadioButtonCheckedOutlinedIcon />,
  },
  {
    id: uuidv4(),
    label: "Check Boxes",
    value: "check_box",
    displayFor: "survey",
    icon: <CheckBoxOutlinedIcon />,
  },
  {
    id: uuidv4(),
    label: "Image Poll",
    value: "image",
    displayFor: "poll",
    icon: <ImageOutlinedIcon />,
  },
  {
    id: uuidv4(),
    label: "Date",
    value: "date",
    displayFor: "survey",
    icon: <EventOutlinedIcon />,
  },
  {
    id: uuidv4(),
    label: "Time",
    value: "time",
    displayFor: "survey",
    icon: <AccessTimeOutlinedIcon />,
  },
  {
    id: uuidv4(),
    label: "Linear Scale",
    value: "linear_scale",
    displayFor: "survey",
    icon: <LinearScaleOutlinedIcon />,
  },
  {
    id: uuidv4(),
    label: "Multiple Choice Grid",
    value: "multiple_choice_grid",
    displayFor: "survey",
    icon: <AppsRoundedIcon />,
  },
  {
    id: uuidv4(),
    label: "Checkbox Grid",
    value: "checkbox_grid",
    displayFor: "survey",
    icon: <AppsRoundedIcon />,
  },
];

function VotingType({
  setSelectedValue,
  selectedValue,
  register,
  fieldName,
}: ComponentInputProps) {
  const theme = useTheme();
  const { pollOrSurvey, setPollOrSurvey } = usePollOrSurveyContext();

  const [votingTypeOptions, setVotingTypeOptions] = React.useState<any>([]);

  React.useEffect(() => {
    if (pollOrSurvey === "poll") {
      setVotingTypeOptions(
        pollOrSurveyOptionsType.filter((x) => x.displayFor != "survey")
      );
    } else {
      setVotingTypeOptions(
        pollOrSurveyOptionsType.filter((x) => x.displayFor != "poll")
      );
    }
  }, [pollOrSurvey]);

  return (
    <>
      <Typography
        component="h2"
        variant="subtitle2"
        sx={{ mb: 1, color: theme.palette.text.primary }}
      >
        {pollOrSurvey === "poll" ? "Voting Type" : "Question Type"}
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
          value={selectedValue}
          {...register(
            `${
              pollOrSurvey === "poll" ? "votingType" : `${fieldName}.votingType`
            }` as const,
            {
              onChange: (e: any) => {
                setSelectedValue(e.target.value);
              },
            }
          )}
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
