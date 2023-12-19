import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import RadioGroup from "@mui/material/RadioGroup";
import { QuestionOptionProp } from "../../../../types";
import { usePollQuestionContext } from "../../../../hooks/usePollQuestionContext";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import TextTruncate from "react-text-truncate";
import { useTheme } from "@mui/material";
import Image from "next/image";
import NoImage from "./../../../../images/svg/no-image.svg";
import { useFormContext } from "react-hook-form";

function VotingImageMultipleChoice() {
  const theme = useTheme();
  const contextValue = usePollQuestionContext("options");
  const {
    formState: { errors },
    register,
    getValues,
  } = useFormContext();
  const handleChange = (e: any) => {};
  return (
    <RadioGroup
      aria-labelledby="demo-radio-buttons-group-label"
      name="selectedOption"
      className="answer"
      onChange={handleChange}
    >
      <Grid container spacing={2} sx={{ mb: 2 }}>
        {contextValue?.map((item: QuestionOptionProp, index: number) => {
          const fieldName = `options[${index}]`;
          return (
            <Grid
              item
              xs={12}
              sm={6}
              lg={4}
              xl={3}
              key={item._id}
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
                        theme.palette.mode === "dark" ? "#1f283e" : "#fdfdfd"
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
                        {...register(`selectedPrimaryQuestionOption` as const)}
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
  );
}

export default VotingImageMultipleChoice;
