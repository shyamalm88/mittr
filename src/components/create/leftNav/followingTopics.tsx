import React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

import TagOutlinedIcon from "@mui/icons-material/TagOutlined";
import uniqid from "uniqid";

const pages = [
  {
    id: uniqid(),
    icon: <TagOutlinedIcon fontSize="small" />,
    label: "blaze",
  },
  {
    id: uniqid(),
    icon: <TagOutlinedIcon fontSize="small" />,
    label: "politics",
  },
  {
    id: uniqid(),
    icon: <TagOutlinedIcon fontSize="small" />,
    label: "technology",
  },
  {
    id: uniqid(),
    icon: <TagOutlinedIcon fontSize="small" />,
    label: "fun",
  },
  {
    id: uniqid(),
    icon: <TagOutlinedIcon fontSize="small" />,
    label: "iOS",
  },
];

function FollowingTopics() {
  return (
    <List>
      {pages.map((item) => {
        return (
          <ListItem disablePadding key={item.id} dense disableGutters>
            <ListItemButton
              sx={{ fontSize: "12px", pl: 0, borderRadius: "4px" }}
            >
              <ListItemIcon sx={{ minWidth: "30px", px: 2 }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.label} disableTypography />
            </ListItemButton>
          </ListItem>
        );
      })}
    </List>
  );
}

export default FollowingTopics;
