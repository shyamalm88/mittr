import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import React from "react";
import NavBar from "../components/Navbar/NavBar.components";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <React.Fragment>
      <CssBaseline />
      <NavBar />
      <Container maxWidth="xl">{children}</Container>
    </React.Fragment>
  );
}
