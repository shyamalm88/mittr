import React from "react";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import RadioGroup from "@mui/material/RadioGroup";
import { ComponentInputProps, QuestionOptionProp } from "../../../types";
import { usePollQuestionContext } from "../../../hooks/usePollQuestionContext";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";

function VotingImageMultipleChoice({
  handleChange,
  radioValue,
}: ComponentInputProps) {
  const contextValue = usePollQuestionContext("options");
  return (
    <RadioGroup
      aria-labelledby="demo-radio-buttons-group-label"
      name="selectedOption"
      className="answerPoll"
      onChange={handleChange}
      value={radioValue}
    >
      <Stack
        direction="column"
        spacing={2}
        sx={{ mb: 2, flexWrap: "wrap" }}
        useFlexGap
      >
        {contextValue?.map((item: QuestionOptionProp, index: number) => {
          const fieldName = `options[${index}]`;
          return (
            <Card
              sx={{
                display: "flex",
                flex: "1",
                justifyContent: "space-between",
              }}
              key={item._id}
            >
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <Box
                  sx={{ display: "flex", alignItems: "center", pl: 1, pb: 1 }}
                >
                  <FormControl sx={{ mb: 1, width: "100%" }} variant="outlined">
                    <fieldset
                      name={fieldName}
                      style={{
                        border: "none",
                        margin: 0,
                        padding: 0,
                      }}
                    >
                      <FormControlLabel
                        value={item.option}
                        control={<Radio id={item._id} />}
                        label=""
                      />
                    </fieldset>
                  </FormControl>
                </Box>
                <CardContent sx={{}}>
                  <Typography component="div" variant="h5">
                    {item.option}
                  </Typography>
                  <Divider sx={{ my: 1 }} />
                  <Typography
                    variant="subtitle1"
                    color="text.secondary"
                    component="div"
                    sx={{ height: "100px", overflow: "auto" }}
                  >
                    {item.description}
                  </Typography>
                </CardContent>
              </Box>
              {item.imageId && (
                <CardMedia
                  component="img"
                  sx={{ maxWidth: "20%" }}
                  image={`${item.imageId.destination.slice(1)}/${
                    item.imageId.filename
                  }`}
                  alt={item.option}
                />
              )}
            </Card>
          );
        })}
      </Stack>
    </RadioGroup>
  );
}

export default VotingImageMultipleChoice;
