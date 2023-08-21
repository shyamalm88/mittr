import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { NavigationPageProps as PageProps } from "../../types";

import Image from "next/image";
import Logo from "./../../images/svg/logo.svg";

const NavigationElements = () => {
  const [drawerOpen, setDrawerOpen] = React.useState(false);

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <>
      <Box sx={{ display: { xs: "flex" } }}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          onClick={toggleDrawer}
          color="inherit"
        >
          <MenuIcon />
        </IconButton>
      </Box>

      <Image
        src={Logo}
        width={0}
        height={0}
        sizes="100vw"
        style={{ marginRight: "10px" }}
        alt="Mittr Logo"
      />
      <Typography
        variant="h5"
        noWrap
        component="a"
        href=""
        sx={{
          mr: 2,
          display: "flex",
          fontFamily: "Roboto,sans-serif",
          fontWeight: 400,
          color: "inherit",
          textDecoration: "none",
        }}
      >
        Mittr
      </Typography>
    </>
  );
};

export default NavigationElements;
