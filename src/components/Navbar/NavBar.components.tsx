import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";

import CssBaseline from "@mui/material/CssBaseline";
import { ElevateNavBar } from "./ElevateNavBar.component";
import NavigationElements from "./NavigationElements.component";
import ActionBar from "./ActionBar.component";
import Search from "./Search.component";
import { ComponentInputProps } from "../../types";
import Box from "@mui/material/Box";
import "dotenv/config";

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
              <NavigationElements />
              <Box sx={{ display: "flex", justifyContent: "end", flex: 1 }}>
                <Search />
                <ActionBar />
              </Box>
            </Toolbar>
          </Container>
        </AppBar>
      </ElevateNavBar>
      <Toolbar />
    </React.Fragment>
  );
}
export default NavBar;
