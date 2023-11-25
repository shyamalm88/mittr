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
import { IconButton, Menu, useTheme } from "@mui/material";
import { usePollOrSurveyContext } from "../../hooks/usePollOrSurveyContext";
import { useConfirm } from "material-ui-confirm";
import { useQuestionTypeContext } from "../../hooks/useQuestionTypeContext";
import HdrStrongOutlinedIcon from "@mui/icons-material/HdrStrongOutlined";
import StarHalfOutlinedIcon from "@mui/icons-material/StarHalfOutlined";
import ArrowDropDownCircleOutlinedIcon from "@mui/icons-material/ArrowDropDownCircleOutlined";
import AccountBalanceOutlinedIcon from "@mui/icons-material/AccountBalanceOutlined";
import ContactMailOutlinedIcon from "@mui/icons-material/ContactMailOutlined";
import PhoneOutlinedIcon from "@mui/icons-material/PhoneOutlined";
import ShortTextOutlinedIcon from "@mui/icons-material/ShortTextOutlined";
import NotesOutlinedIcon from "@mui/icons-material/NotesOutlined";
import PersonPinCircleOutlinedIcon from "@mui/icons-material/PersonPinCircleOutlined";
import AlternateEmailOutlinedIcon from "@mui/icons-material/AlternateEmailOutlined";

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
    label: "Image Choice",
    value: "image_choice",
    displayFor: "survey",
    icon: <ImageOutlinedIcon />,
  },
  {
    id: uuidv4(),
    label: "Star Rating",
    value: "star_rating",
    displayFor: "survey",
    icon: <StarHalfOutlinedIcon />,
  },
  {
    id: uuidv4(),
    label: "Dropdown",
    value: "dropdown",
    displayFor: "survey",
    icon: <ArrowDropDownCircleOutlinedIcon />,
  },
  {
    id: uuidv4(),
    label: "Short Text",
    value: "short_text",
    displayFor: "survey",
    icon: <ShortTextOutlinedIcon />,
  },
  {
    id: uuidv4(),
    label: "Long Text",
    value: "long_text",
    displayFor: "survey",
    icon: <NotesOutlinedIcon />,
  },
  {
    id: uuidv4(),
    label: "Phone Number",
    value: "phone_number",
    displayFor: "survey",
    icon: <PhoneOutlinedIcon />,
  },
  {
    id: uuidv4(),
    label: "Address",
    value: "address",
    displayFor: "survey",
    icon: <PersonPinCircleOutlinedIcon />,
  },
  {
    id: uuidv4(),
    label: "Email",
    value: "email",
    displayFor: "survey",
    icon: <AlternateEmailOutlinedIcon />,
  },
  {
    id: uuidv4(),
    label: "Legal",
    value: "legal",
    displayFor: "survey",
    icon: <AccountBalanceOutlinedIcon />,
  },
  {
    id: uuidv4(),
    label: "Contact Info",
    value: "contact_info",
    displayFor: "survey",
    icon: <ContactMailOutlinedIcon />,
  },
  {
    id: uuidv4(),
    label: "Range",
    value: "range",
    displayFor: "survey",
    icon: <HdrStrongOutlinedIcon />,
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
  console.log(questionType);

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
          } else {
            const temp = questionType;
            temp[index] = e.target.value;
            setQuestionType(temp);
            setValue(`${fieldName}.votingType`, e.target.value);
          }
        })
        .catch((r) => {
          if (pollOrSurvey === "poll") {
            setQuestionType(oldSelectedValue.current[index].value as string);
            setValue(
              "votingType",
              oldSelectedValue.current[index].value as string
            );
          } else {
            const temp = questionType;
            temp[index] = oldSelectedValue.current[index].value as string;
            setQuestionType(temp);
            setValue(
              `${fieldName}.votingType`,
              oldSelectedValue.current[index].value as string
            );
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
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography
          component="h2"
          variant="subtitle2"
          sx={{ mb: 1, color: theme.palette.text.primary }}
        >
          {pollOrSurvey === "poll" ? "Voting Type" : "Question Type"}
        </Typography>
      </Stack>

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
