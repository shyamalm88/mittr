import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import React from "react";
import { ComponentInputProps } from "../../../types";
import { Box, Stack, Typography } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import he from "he";

function LinearScaleChoiceSurveySection({
  selectedValue,
}: ComponentInputProps) {
  const theme = useTheme();
  const largeScreen = useMediaQuery(theme.breakpoints.up("lg"));
  const [linearScaleUpto, setLinearScaleUpto] = React.useState(
    selectedValue?.options?.[0]?.to
  );
  const [linearScaleFrom, setLinearScaleFrom] = React.useState(
    selectedValue?.options?.[0]?.from
  );
  return (
    <>
      <Typography
        component="div"
        variant="body1"
        dangerouslySetInnerHTML={{
          __html: he.decode(selectedValue.question),
        }}
      ></Typography>
      <Box sx={{ width: "100%", p: 2 }}>
        {selectedValue?.options.map((item: any) => {
          return (
            <Stack
              key={item.id}
              spacing={2}
              useFlexGap
              direction={largeScreen ? "row" : "column"}
              alignContent="center"
              justifyContent="center"
            >
              {JSON.stringify(item?.from) && (
                <Typography
                  variant="body1"
                  sx={{
                    pr: { xs: 0, lg: 3 },
                    pt: 3,
                    display: { xs: "block", lg: "flex" },
                  }}
                  align="center"
                >
                  {item?.formText}
                </Typography>
              )}
              <Box
                sx={{
                  pl: 1,
                  pr: 1,
                  display: { xs: "block", sm: "flex" },
                  justifyContent: "center",
                }}
              >
                <RadioGroup
                  name="selectedLinearScaleOption"
                  className="answer"
                  row={largeScreen ? true : false}
                >
                  <ToggleButtonGroup>
                    {Array.from(
                      Array(linearScaleUpto + (item?.from === 0 ? 1 : 0)),
                      (e, i) => {
                        i = i + item?.from;
                        return (
                          <ToggleButton
                            value={i}
                            key={i}
                            sx={{ px: 0, border: "1px solid #ccc" }}
                          >
                            <FormControlLabel
                              value={i}
                              control={<Radio id={item._id} />}
                              label={i}
                              labelPlacement="top"
                            />
                          </ToggleButton>
                        );
                      }
                    )}
                  </ToggleButtonGroup>
                </RadioGroup>
              </Box>

              {JSON.stringify(item?.to) && (
                <Typography
                  variant="body1"
                  sx={{ pl: { xs: 0, lg: 3 }, pt: 3 }}
                  align="center"
                >
                  {item?.toText}
                </Typography>
              )}
            </Stack>
          );
        })}
      </Box>
    </>
  );
}

export default LinearScaleChoiceSurveySection;
