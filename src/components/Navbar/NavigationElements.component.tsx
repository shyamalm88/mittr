import * as React from "react";
import Box from "@mui/material/Box";
import LensBlurOutlinedIcon from "@mui/icons-material/LensBlurOutlined";
import Typography from "@mui/material/Typography";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { NavigationPageProps as PageProps } from "../../types";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Image from "next/image";
import Logo from "./../../images/svg/logo.svg";

const NavigationElements = ({ pages }: PageProps) => {
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
      <Drawer
        sx={{
          width: "300px",
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: "300px",
            boxSizing: "border-box",
          },
        }}
        anchor="left"
        open={drawerOpen}
        onClose={toggleDrawer}
      >
        <Box
          sx={{
            width: "100%",
            height: "100%",
            maxWidth: 360,
            background: "#9155FD",
            color: "#fff",
          }}
        >
          <nav aria-label="main mailbox folders">
            <List>
              {pages.map((item) => {
                return (
                  <ListItem disablePadding key={item.id}>
                    <ListItemButton>
                      <ListItemIcon sx={{ color: "#ffff" }}>
                        {item.icon}
                      </ListItemIcon>
                      <ListItemText primary={item.label} />
                    </ListItemButton>
                  </ListItem>
                );
              })}
            </List>
          </nav>
        </Box>
      </Drawer>
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
          display: { xs: "flex" },
          flexGrow: 1,
          fontFamily: "Roboto,sans-serif",
          fontWeight: 400,
          color: "inherit",
          textDecoration: "none",
          width: { xs: "220px" },
        }}
      >
        Mittr
      </Typography>
    </>
  );
};

export default NavigationElements;
