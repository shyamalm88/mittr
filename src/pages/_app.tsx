import React from "react";
import type { AppProps } from "next/app";
import RootLayout from "../layout/root.layout";
import "../styles/styles.scss";
import { ConfirmProvider } from "material-ui-confirm";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { amber } from "@mui/material/colors";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: amber,
    info: amber,
  },
});

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <React.Fragment>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <RootLayout>
          <ConfirmProvider>
            <Component {...pageProps} />
          </ConfirmProvider>
        </RootLayout>
      </ThemeProvider>
    </React.Fragment>
  );
}
