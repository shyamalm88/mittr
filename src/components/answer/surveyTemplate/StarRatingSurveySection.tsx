import React from "react";
import { Box, Typography } from "@mui/material";
import { ComponentInputProps } from "../../../types";
import Rating from "@mui/material/Rating";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import MoodIcon from "@mui/icons-material/Mood";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import { styled } from "@mui/material/styles";

function StarRatingSurveySection({ selectedValue }: ComponentInputProps) {
  const [value, setValue] = React.useState<number | null>(0);
  const [hover, setHover] = React.useState(-1);
  return (
    <>
      <Typography component="div" variant="h6">
        {selectedValue.question}
      </Typography>
      <Box sx={{ p: 3, display: "flex", alignItems: "center" }}>
        {selectedValue.options.map((item: any) => {
          return (
            <Rating
              sx={{ color: item.color }}
              key={item.id}
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
              value={value}
              precision={item.precision ? item.precision : 1}
              size="large"
              onChange={(event, newValue) => {
                setValue(newValue);
              }}
              onChangeActive={(event, newHover) => {
                setHover(newHover);
              }}
              max={item.starCount ? item.starCount : 5}
            />
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
