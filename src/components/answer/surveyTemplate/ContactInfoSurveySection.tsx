import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import { ComponentInputProps } from "../../../types";
import ReactCountryFlag from "react-country-flag";
import { countryWisePhoneNumbers } from "../../../data/countryWisePhoneNumber";
import he from "he";

function ContactInfoSurveySection({ selectedValue }: ComponentInputProps) {
  const theme = useTheme();
  return (
    <>
      <Typography
        component="div"
        variant="h6"
        dangerouslySetInnerHTML={{
          __html: he.decode(selectedValue.question),
        }}
      ></Typography>
      {selectedValue.options.map((item: any, index: number) => {
        return (
          <Box sx={{ p: 3, pb: 1 }} key={index}>
            <InputLabel>{item.option}</InputLabel>
            {item.option === "Phone Number" ? (
              <Stack direction="row" useFlexGap spacing={1}>
                <FormControl size="small" sx={{ width: "100px" }}>
                  <Select
                    labelId="demo-simple-select-label"
                    defaultValue={"+91"}
                    renderValue={(selected) => (
                      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                        {selected}
                      </Box>
                    )}
                  >
                    <MenuItem value="">
                      <em style={{ color: "#b3b3b3" }}>
                        Please Select Country
                      </em>
                    </MenuItem>
                    {countryWisePhoneNumbers.map((item) => {
                      return (
                        <MenuItem value={item.dial_code} key={item.code}>
                          <Stack
                            direction="row"
                            spacing={1}
                            useFlexGap
                            alignItems="center"
                          >
                            <ReactCountryFlag countryCode={item.code} svg />
                            <Typography>
                              {item.name}
                              {item.dial_code}
                            </Typography>
                          </Stack>
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
                <OutlinedInput
                  label={item.option}
                  placeholder={`Please enter your ${item.option}`}
                  fullWidth
                  size="small"
                  margin="dense"
                  sx={{
                    borderRadius: "4px",
                  }}
                  className="input"
                />
              </Stack>
            ) : (
              <OutlinedInput
                label={item.option}
                placeholder={`Please enter your ${item.option}`}
                fullWidth
                size="small"
                margin="dense"
                sx={{
                  borderRadius: "4px",
                }}
                className="input"
              />
            )}
          </Box>
        );
      })}
    </>
  );
}

export default ContactInfoSurveySection;