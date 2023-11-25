import * as React from "react";
import { Box, Card, CardContent, Stack, Typography } from "@mui/material";
import { usePollAnswerContext } from "../../hooks/usePollAnswerContext";
import { usePollQuestionContext } from "../../hooks/usePollQuestionContext";
import SurveySwitchQuestionOptions from "./surveySwitchQuestionOptions";
import { ComponentInputProps } from "../../types";
import he from "he";
import { useTheme } from "@mui/material/styles";

const AnswerSurveySectionsWrapper = ({ item, index }: ComponentInputProps) => {
  const questionContext = usePollQuestionContext();
  const theme = useTheme();
  const answerContext = usePollAnswerContext();
  const [radioValue, setRadioValue] = React.useState("");
  const [selectedValue, setSelectedValue] = React.useState(item);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRadioValue(e.target.value);
    answerContext.handleChange(e);
  };

  return (
    <>
      <React.Fragment>
        <Card
          sx={{
            p: selectedValue?.type === "section" ? 1 : 3,
            mb: 2,
            borderTopColor:
              selectedValue?.type === "section"
                ? theme.palette.primary.dark
                : theme.palette.primary.light,
            borderTopStyle: "solid",
            borderTopWidth: "2px",
            overflow: "auto",
          }}
        >
          {selectedValue?.type === "section" ? (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                width: "100%",
              }}
            >
              <CardContent sx={{ flex: "1 0 auto", py: "10px !important" }}>
                <Stack
                  direction={"column"}
                  alignContent={"space-between"}
                  spacing={2}
                  useFlexGap
                >
                  <Typography component="div" variant="h5">
                    {selectedValue?.title}
                  </Typography>
                  <Typography
                    component="div"
                    variant="body2"
                    dangerouslySetInnerHTML={{
                      __html: he.decode(selectedValue?.description),
                    }}
                  ></Typography>
                </Stack>
              </CardContent>
            </Box>
          ) : (
            <SurveySwitchQuestionOptions
              handleChange={handleChange}
              radioValue={radioValue}
              selectedValue={selectedValue}
            />
          )}
        </Card>
      </React.Fragment>
    </>
  );
};
export default AnswerSurveySectionsWrapper;
