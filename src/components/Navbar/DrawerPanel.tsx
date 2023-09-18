import React from "react";
import Drawer from "@mui/material/Drawer";
import { styled, useTheme } from "@mui/material/styles";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { ComponentInputProps } from "../../types";
import LeftNavMenu from "../createPoll/leftNav/leftNavMenu";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Typography from "@mui/material/Typography";
import FollowingTopics from "../createPoll/leftNav/followingTopics";
import TrendingTopics from "../createPoll/leftNav/trendingTopics";
import RecentPollList from "../createPoll/rightNav/recentPollList";

const drawerWidth = 240;

function DrawerPanel({ open, setDrawerOpen }: ComponentInputProps) {
  const DrawerHeader = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  }));

  return (
    <>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="temporary"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <Typography textAlign="left" display="flex" flexGrow={1}>
            Mittr Menu
          </Typography>

          <IconButton onClick={() => setDrawerOpen(false)}>
            <ChevronLeftIcon />
          </IconButton>
        </DrawerHeader>
        <Divider />
        <LeftNavMenu />
        <Accordion square={true}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header"
          >
            <Typography>Recently Created</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <RecentPollList />
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>Trending Topics</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <TrendingTopics />
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header"
          >
            <Typography>Following Topics</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <FollowingTopics />
          </AccordionDetails>
        </Accordion>
        <Divider />
      </Drawer>
    </>
  );
}

export default DrawerPanel;
