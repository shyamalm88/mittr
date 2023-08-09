import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import CottageIcon from "@mui/icons-material/Cottage";
import DashboardCustomizeIcon from "@mui/icons-material/DashboardCustomize";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import CssBaseline from "@mui/material/CssBaseline";
import { ElevateNavBar } from "./ElevateNavBar.component";
import NavigationElements from "./NavigationElements.component";
import ActionBar from "./ActionBar.component";
import Search from "./Search.component";
import { ComponentInputProps } from "../../types";

const pages = [
  { id: "1", icon: <CottageIcon />, label: "Home" },
  { id: "2", icon: <DashboardCustomizeIcon />, label: "Dashboard" },
  { id: "3", icon: <NotificationsActiveIcon />, label: "Notification" },
];

function NavBar(props: ComponentInputProps) {
  return (
    <React.Fragment>
      <CssBaseline />
      <ElevateNavBar {...props}>
        <AppBar
          position="fixed"
          color="default"
          className="AppBarCustomDisplay"
        >
          <Container maxWidth="xl">
            <Toolbar disableGutters variant="dense">
              <NavigationElements pages={pages} />
              <Search />
              <ActionBar />
            </Toolbar>
          </Container>
        </AppBar>
      </ElevateNavBar>
      <Toolbar variant="dense" />
    </React.Fragment>
  );
}
export default NavBar;
