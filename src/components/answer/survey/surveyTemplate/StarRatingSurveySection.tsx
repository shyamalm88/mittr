import React from "react";
import { Box, Typography } from "@mui/material";
import { ComponentInputProps } from "../../../../types";
import Rating from "@mui/material/Rating";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import MoodIcon from "@mui/icons-material/Mood";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import he from "he";
import { useFormContext } from "react-hook-form";

function StarRatingSurveySection({
  selectedValue,
  fieldName,
  item,
  index: idx,
  actualIndex,
}: ComponentInputProps) {
  const [sliderValue, setSliderValue] = React.useState<number | null>(0);
  const {
    formState: { errors },
    register,
    getValues,
    setValue,
  } = useFormContext();
  const [hover, setHover] = React.useState(-1);

  React.useEffect(() => {
    setValue(
      `${fieldName}.segments[${actualIndex}].selectedValue[${idx}].starRating`,
      sliderValue
    );
  }, [sliderValue]);
  return (
    <>
      <Typography className="required">
        {selectedValue?.required && "*"}
      </Typography>
      <Typography
        component="div"
        variant="body1"
        dangerouslySetInnerHTML={{
          __html: selectedValue.question
            ? he.decode(selectedValue.question)
            : "",
        }}
      ></Typography>
      <Box sx={{ p: 3, display: "flex", alignItems: "center" }}>
        {selectedValue.options.map((item: any) => {
          return (
            <React.Fragment key={item.id}>
              <Rating
                sx={{ color: item.color ? item.color : "#FCCB00" }}
                name="hover-feedback"
                icon={
                  item.icon === "star" || !item.icon ? (
                    <StarIcon fontSize="inherit" />
                  ) : item.icon === "love" ? (
                    <FavoriteIcon fontSize="inherit" />
                  ) : item.icon === "smiley" ? (
                    <EmojiEmotionsIcon fontSize="inherit" />
                  ) : null
                }
                emptyIcon={
                  item.icon === "star" || !item.icon ? (
                    <StarBorderIcon fontSize="inherit" />
                  ) : item.icon === "love" ? (
                    <FavoriteBorderIcon fontSize="inherit" />
                  ) : item.icon === "smiley" ? (
                    <MoodIcon fontSize="inherit" />
                  ) : null
                }
                value={sliderValue}
                precision={item.precision ? item.precision : 1}
                size="large"
                onChange={(event, newValue) => {
                  setSliderValue(newValue);
                }}
                onChangeActive={(event, newHover) => {
                  setHover(newHover);
                }}
                max={item.starCount ? item.starCount : 5}
              />
              <input
                type="hidden"
                value={selectedValue?.required}
                {...register(
                  `${fieldName}.segments[${actualIndex}].selectedValue[${idx}].required` as const
                )}
              />
            </React.Fragment>
          );
        })}

        {/* {value !== null && (
          <Box sx={{ ml: 2 }}>{labels[hover !== -1 ? hover : value]}</Box>
        )} */}
      </Box>
    </>
  );
}

export default StarRatingSurveySection;
