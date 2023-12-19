import * as React from "react";
import { Box, Card, CardContent, Stack, Typography } from "@mui/material";
import { usePollQuestionContext } from "../../../hooks/usePollQuestionContext";
import SurveySwitchQuestionOptions from "../surveySwitchQuestionOptions";
import { ComponentInputProps } from "../../../types";
import he from "he";
import { useTheme } from "@mui/material/styles";

const AnswerSurveySectionsWrapper = ({
  item,
  index,
  actualIndex,
}: ComponentInputProps) => {
  const questionContext = usePollQuestionContext();
  const fieldName = `survey[0]`;
  const theme = useTheme();
  const [radioValue, setRadioValue] = React.useState("");
  const [selectedValue, setSelectedValue] = React.useState(item);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRadioValue(e.target.value);
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
            position: "relative",
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
                    variant="body1"
                    dangerouslySetInnerHTML={{
                      __html: he.decode(selectedValue?.description),
                    }}
                  ></Typography>
                </Stack>
              </CardContent>
            </Box>
          ) : (
            <>
              <SurveySwitchQuestionOptions
                handleChange={handleChange}
                radioValue={radioValue}
                selectedValue={selectedValue}
                fieldName={fieldName}
                index={index}
                item={item}
                actualIndex={actualIndex}
                key={index}
              />
            </>
          )}
        </Card>
      </React.Fragment>
    </>
  );
};
export default AnswerSurveySectionsWrapper;
