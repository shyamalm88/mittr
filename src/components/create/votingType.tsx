import React from "react";
import ImageOutlinedIcon from "@mui/icons-material/ImageOutlined";
import RadioButtonCheckedOutlinedIcon from "@mui/icons-material/RadioButtonCheckedOutlined";
import EventOutlinedIcon from "@mui/icons-material/EventOutlined";
import CheckBoxOutlinedIcon from "@mui/icons-material/CheckBoxOutlined";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import LinearScaleOutlinedIcon from "@mui/icons-material/LinearScaleOutlined";
import AppsRoundedIcon from "@mui/icons-material/AppsRounded";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Typography from "@mui/material/Typography";
import { v4 as uuidv4 } from "uuid";
import FormControl from "@mui/material/FormControl";
import Box from "@mui/material/Box";
import { ComponentInputProps, OptionProp } from "../../types";
import Stack from "@mui/material/Stack";
import { useTheme } from "@mui/material";
import { usePollOrSurveyContext } from "../../hooks/usePollOrSurveyContext";
import { useConfirm } from "material-ui-confirm";
import { useQuestionTypeContext } from "../../hooks/useQuestionTypeContext";

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
  register,
  fieldName,
  index,
  setValue,
  control,
  unregister,
  getValues,
}: ComponentInputProps) {
  const confirm = useConfirm();
  const theme = useTheme();
  const { questionType, setQuestionType } = useQuestionTypeContext();

  const oldSelectedValue = React.useRef<HTMLInputElement[]>([]);
  const { pollOrSurvey, setPollOrSurvey } = usePollOrSurveyContext();

  const [votingTypeOptions, setVotingTypeOptions] = React.useState<any>([]);

  const handleChangeVotingOptions = async (e: any) => {
    if (!oldSelectedValue.current[index]?.value) {
      if (pollOrSurvey === "poll") {
        setQuestionType(e.target.value);
        setValue(`votingType`, e.target.value);
      } else {
        const temp = questionType;
        temp[index] = e.target.value;
        setQuestionType(temp);
        setValue(`${fieldName}.votingType`, e.target.value);
      }
    } else {
      confirm({
        description:
          "Do you wish to proceed with changing the answer type option? Please note that selecting a different option will reset all entries related to the previous selection. Are you sure you want to continue?",
      })
        .then(async () => {
          pollOrSurvey === "poll"
            ? unregister("options")
            : unregister(`${fieldName}.options`);
          if (pollOrSurvey === "poll") {
            setQuestionType(e.target.value);
            setValue(`votingType`, e.target.value);
            console.log(getValues());
          } else {
            const temp = questionType;
            temp[index] = e.target.value;
            setQuestionType(temp);
            setValue(`${fieldName}.votingType`, e.target.value);
            console.log(getValues("survey"));
          }
        })
        .catch((r) => {
          if (pollOrSurvey === "poll") {
            console.log("old", oldSelectedValue.current[index].value);
            setQuestionType(oldSelectedValue.current[index].value as string);
            setValue(
              "votingType",
              oldSelectedValue.current[index].value as string
            );
            console.log(getValues());
          } else {
            const temp = questionType;
            temp[index] = oldSelectedValue.current[index].value as string;
            setQuestionType(temp);
            setValue(
              `${fieldName}.votingType`,
              oldSelectedValue.current[index].value as string
            );
            console.log(getValues("survey"));
          }
        });
    }
  };

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
          inputRef={(el) => (oldSelectedValue.current[index] = el)}
          onChange={(e: any) => handleChangeVotingOptions(e)}
          value={
            pollOrSurvey === "poll"
              ? getValues()?.votingType
              : getValues("survey")?.[index]?.votingType
          }
          // {...register(
          //   `${
          //     pollOrSurvey === "poll" ? "votingType" : `${fieldName}.votingType`
          //   }` as const,
          //   {
          //     onChange: (e: any) => handleChangeVotingOptions(e),
          //   }
          // )}
        >
          <MenuItem value={``}>
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