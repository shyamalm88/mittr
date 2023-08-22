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
import { v4 as uuidv4 } from "uuid";

const pages = [
  {
    id: uuidv4(),
    icon: <CottageOutlinedIcon fontSize="small" />,
    label: "Home",
  },
  {
    id: uuidv4(),
    icon: <DashboardCustomizeOutlinedIcon fontSize="small" />,
    label: "Dashboard",
  },
  {
    id: uuidv4(),
    icon: <AccountCircleOutlinedIcon fontSize="small" />,
    label: "Profile",
  },
  {
    id: uuidv4(),
    icon: <InsightsOutlinedIcon fontSize="small" />,
    label: "Analytics",
  },
  {
    id: uuidv4(),
    icon: <BookmarkAddedOutlinedIcon fontSize="small" />,
    label: "My Saved Items",
  },
  {
    id: uuidv4(),
    icon: <SettingsOutlinedIcon fontSize="small" />,
    label: "Settings",
  },
];

function LeftNavigationTemplate() {
  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
      }}
      className="sideNav"
    >
      <nav aria-label="main mailbox folders">
        <List>
          {pages.map((item) => {
            return (
              <ListItem disablePadding key={item.id} dense disableGutters>
                <ListItemButton sx={{ pl: 0 }}>
                  <ListItemIcon sx={{ minWidth: "30px" }}>
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
  );
}

export default LeftNavigationTemplate;
