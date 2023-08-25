import * as React from "react";
import SearchIcon from "@mui/icons-material/Search";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";

const Search = () => {
  const Search = styled("div")(({ theme }) => ({
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    marginLeft: 0,
    width: "100%",
    display: "flex",
    justifyContent: "end",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
  }));

  const SearchIconWrapper = styled("div")(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "end",

    [theme.breakpoints.up("xs")]: {
      display: "flex",
    },
  }));

  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: theme.palette.text.primary,
    display: "flex",

    justifyContent: "end",
    "& .MuiInputBase-input": {
      padding: theme.spacing(1, 1, 1, 1),
      paddingRight: `calc(1em + ${theme.spacing(4)})`,
      paddingLeft: `calc(1em + ${theme.spacing(2)})`,
      transition: theme.transitions.create("width"),
      borderStyle: "solid",
      borderWidth: "1px",
      borderColor: theme.palette.text.secondary,
      borderRadius: "50px",
      [theme.breakpoints.up("sm")]: {
        width: "20%",
        "&:focus": {
          width: "100%",
        },
      },
    },
  }));
  return (
    <>
      <Box
        sx={{
          display: { xs: "none", md: "flex" },
          color: "#333",
        }}
      >
        <Search>
          <SearchIconWrapper>
            <SearchIcon
              sx={{ zIndex: 9, color: (theme) => theme.palette.text.secondary }}
            />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Search…"
            inputProps={{ "aria-label": "search" }}
          />
        </Search>
      </Box>
      <Box sx={{ display: { xs: "flex", md: "none" } }}>
        <IconButton aria-label="search">
          <SearchIcon />
        </IconButton>
      </Box>
    </>
  );
};

export default Search;
