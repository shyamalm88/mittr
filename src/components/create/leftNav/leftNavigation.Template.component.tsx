import React from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

import CottageOutlinedIcon from "@mui/icons-material/CottageOutlined";
import DashboardCustomizeOutlinedIcon from "@mui/icons-material/DashboardCustomizeOutlined";
import BookmarkAddedOutlinedIcon from "@mui/icons-material/BookmarkAddedOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import InsightsOutlinedIcon from "@mui/icons-material/InsightsOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import uniqid from "uniqid";
import LeftNavigationMenu from "./leftNavMenu";

function LeftNavigationTemplate() {
  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        display: { sm: "none", lg: "flex" },
      }}
      className="sideNav"
    >
      <nav aria-label="main mailbox folders">
        <LeftNavigationMenu />
      </nav>
    </Box>
  );
}

export default LeftNavigationTemplate;
