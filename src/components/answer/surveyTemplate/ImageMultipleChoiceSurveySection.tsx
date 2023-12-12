import React from "react";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import { ComponentInputProps } from "../../../types";
import {
  Box,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import TextTruncate from "react-text-truncate";
import Image from "next/image";
import NoImage from "./../../../images/svg/no-image.svg";
import he from "he";

function ImageMultipleChoiceSurveySection({
  selectedValue,
}: ComponentInputProps) {
  const theme = useTheme();
  return (
    <>
      <Typography className="required">
        {selectedValue?.required && "*"}
      </Typography>
      <Typography
        component="div"
        variant="body1"
        dangerouslySetInnerHTML={{
          __html: he.decode(selectedValue.question),
        }}
      ></Typography>
      <Box sx={{ p: 3 }}>
        <RadioGroup
          aria-labelledby="demo-radio-buttons-group-label"
          name="selectedOption"
          className="answer"
        >
          <Grid container spacing={2} sx={{ mb: 2 }}>
            {selectedValue?.options?.map((item: any, index: number) => {
              const fieldName = `options[${index}]`;
              return (
                <Grid
                  item
                  xs={12}
                  sm={6}
                  lg={4}
                  xl={3}
                  key={index}
                  sx={{ alignItems: "stretch", display: "flex" }}
                >
                  <Card
                    sx={{
                      flex: "1",
                      position: "relative",
                    }}
                    key={item._id}
                  >
                    {item.imageId ? (
                      <CardMedia
                        component="img"
                        loading="lazy"
                        image={`${item.imageId.destination.slice(1)}/${
                          item.imageId.filename
                        }`}
                        sx={{ height: "200px" }}
                        alt={item.option}
                      />
                    ) : (
                      <Image
                        src={NoImage}
                        width={0}
                        height={200}
                        sizes="100vw"
                        alt="No Image"
                        style={{ width: "100%" }}
                      />
                    )}
                    <CardContent>
                      <Stack
                        direction={"row"}
                        spacing={2}
                        useFlexGap
                        justifyContent={"space-between"}
                      >
                        <Typography
                          gutterBottom
                          variant="subtitle2"
                          component="div"
                        >
                          {item.option}
                        </Typography>
                      </Stack>

                      <Typography variant="body2" color="text.secondary">
                        <TextTruncate
                          line={3}
                          element="span"
                          truncateText="…"
                          text={item.description}
                          textTruncateChild={<a href="#">Read more</a>}
                        />
                      </Typography>
                    </CardContent>
                    <CardActions disableSpacing sx={{ p: 0 }}>
                      <FormControl
                        sx={{
                          border: "none",
                          margin: 0,
                          padding: 0,
                          position: "absolute",
                          width: 0,
                          height: 0,
                          top: 0,
                          right: 0,
                          borderStyle: "solid",
                          borderWidth: "0 62px 62px 0",
                          borderColor: `transparent ${
                            theme.palette.mode === "dark"
                              ? "#1f283e"
                              : "#fdfdfd"
                          } transparent transparent`,
                        }}
                        variant="outlined"
                      >
                        <fieldset
                          name={fieldName}
                          style={{
                            border: "none",
                          }}
                        >
                          <FormControlLabel
                            value={item.option}
                            control={<Radio id={item._id} />}
                            label=""
                            style={{
                              position: "absolute",
                              top: -4,
                              right: -80,
                              width: "42px",
                              height: "42px",
                              border: "none",
                            }}
                          />
                        </fieldset>
                      </FormControl>
                    </CardActions>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
        </RadioGroup>
      </Box>
    </>
  );
}

export default ImageMultipleChoiceSurveySection;
