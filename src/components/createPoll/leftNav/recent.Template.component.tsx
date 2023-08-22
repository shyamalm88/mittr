import React from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import TagOutlinedIcon from "@mui/icons-material/TagOutlined";
import { v4 as uuidv4 } from "uuid";
import { Divider, Typography } from "@mui/material";

const pages = [
  {
    id: uuidv4(),
    icon: <TagOutlinedIcon fontSize="small" />,
    label: "fa-cup-final",
  },
  {
    id: uuidv4(),
    icon: <TagOutlinedIcon fontSize="small" />,
    label: "spider-man",
  },
  {
    id: uuidv4(),
    icon: <TagOutlinedIcon fontSize="small" />,
    label: "kraven",
  },
  {
    id: uuidv4(),
    icon: <TagOutlinedIcon fontSize="small" />,
    label: "john-mayer",
  },
  {
    id: uuidv4(),
    icon: <TagOutlinedIcon fontSize="small" />,
    label: "moonfall",
  },
];

function RecentTemplate() {
  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        mb: 2,
      }}
      className="sideNav"
    >
      <Typography variant="body2" component="h2">
        Trending Topics
      </Typography>
      <Divider sx={{ mt: 1 }} />
      <nav aria-label="main mailbox folders">
        <List>
          {pages.map((item) => {
            return (
              <ListItem disablePadding key={item.id} dense disableGutters>
                <ListItemButton sx={{ fontSize: "12px" }}>
                  <ListItemIcon sx={{ minWidth: "30px" }}>
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText primary={item.label} disableTypography />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      </nav>
    </Box>
  );
}

export default RecentTemplate;
