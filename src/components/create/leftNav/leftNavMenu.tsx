import React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import CottageOutlinedIcon from "@mui/icons-material/CottageOutlined";
import DashboardCustomizeOutlinedIcon from "@mui/icons-material/DashboardCustomizeOutlined";
import BookmarkAddedOutlinedIcon from "@mui/icons-material/BookmarkAddedOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import InsightsOutlinedIcon from "@mui/icons-material/InsightsOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import BackupTableOutlinedIcon from "@mui/icons-material/BackupTableOutlined";
import WidgetsOutlinedIcon from "@mui/icons-material/WidgetsOutlined";
import { v4 as uuidv4 } from "uuid";
import { Box, useTheme } from "@mui/material";
import Link from "next/link";
import { usePathname } from "next/navigation";

const pages = [
  {
    id: uuidv4(),
    icon: <BackupTableOutlinedIcon fontSize="small" />,
    label: "Feed",
  },
  {
    id: uuidv4(),
    icon: <DashboardCustomizeOutlinedIcon fontSize="small" />,
    label: "Create",
  },
  {
    id: uuidv4(),
    icon: <WidgetsOutlinedIcon fontSize="small" />,
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

function LeftNavigationMenu() {
  const pathname = usePathname();
  const theme = useTheme();

  return (
    <List>
      {pages.map((item: any) => {
        return (
          <ListItem
            disablePadding
            key={item.id}
            dense
            disableGutters
            component={Link}
            href={item.label.toLowerCase().replace(/ /g, "_")}
          >
            <ListItemButton
              selected={pathname.includes(
                item.label.toLowerCase().replace(/ /g, "_")
              )}
              sx={{
                pl: 0,
                borderRadius: "4px",
                color:
                  theme.palette.mode === "dark"
                    ? theme.palette.info.light
                    : theme.palette.info.dark,
              }}
            >
              <ListItemIcon sx={{ minWidth: "30px", px: 2 }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText
                primary={item.label}
                sx={{
                  color:
                    theme.palette.mode === "dark"
                      ? theme.palette.info.light
                      : theme.palette.info.dark,
                }}
              />
            </ListItemButton>
          </ListItem>
        );
      })}
    </List>
  );
}

export default LeftNavigationMenu;
