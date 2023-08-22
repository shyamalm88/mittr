import React from "react";
import type { AppProps } from "next/app";
import RootLayout from "../layout/root.layout";
import "../styles/styles.scss";
import { ConfirmProvider } from "material-ui-confirm";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Fab from "@mui/material/Fab";
import { PaletteMode } from "@mui/material";
import { getDesignTokens } from "../theme/designTokens";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";

const ColorModeContext = React.createContext({ toggleColorMode: () => {} });

export default function MyApp({ Component, pageProps }: AppProps) {
  const [themeMode, setThemeMode] = React.useState<PaletteMode>("dark");
  const colorMode = React.useMemo(
    () => ({
      // The dark mode switch would invoke this method
      toggleColorMode: () => {
        setThemeMode((prevMode: PaletteMode) =>
          prevMode === "light" ? "dark" : "light"
        );
      },
    }),
    []
  );

  const theme = React.useMemo(
    () => createTheme(getDesignTokens(themeMode)),
    [themeMode]
  );

  React.useEffect(() => {
    document.body.classList.remove(themeMode === "dark" ? "light" : "dark");
    document.body.classList.add(themeMode === "light" ? "light" : "dark");
  }, [themeMode]);

  return (
    <React.Fragment>
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <Fab
            size="small"
            aria-label="Change Theme"
            color="primary"
            variant="extended"
            sx={{ position: "fixed", bottom: "16px", right: "16px" }}
            onClick={() =>
              setThemeMode(themeMode === "dark" ? "light" : "dark")
            }
          >
            {theme.palette.mode === "dark" ? (
              <Brightness7Icon color="inherit" />
            ) : (
              <Brightness4Icon color="inherit" />
            )}
          </Fab>
          <CssBaseline />
          <RootLayout>
            <ConfirmProvider>
              <Component {...pageProps} />
            </ConfirmProvider>
          </RootLayout>
        </ThemeProvider>
      </ColorModeContext.Provider>
    </React.Fragment>
  );
}
