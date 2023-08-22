import {
  amber,
  grey,
  deepOrange,
  blueGrey,
  blue,
  teal,
} from "@mui/material/colors";
import { PaletteMode } from "@mui/material";

export const getDesignTokens = (mode: PaletteMode) => ({
  palette: {
    mode,
    ...(mode === "light"
      ? {
          // palette values for light mode
          primary: {
            light: blue[300],
            main: blue[500],
            dark: blue[700],
            darker: blue[900],
          },
          divider: "#ddd",
          background: {
            default: "#f7f7f7",
            paper: "#fff",
          },
          customColors: {
            bottomPanel: "#cccccc4a",
            backgroundColor: "#fff",
            border: "#ddd",
            borderAlt: "#ddd",
            borderTransparent: "transparent",
          },
          text: {
            primary: grey[900],
            secondary: grey[600],
          },
        }
      : {
          // palette values for dark mode
          primary: amber,
          divider: "#293246",
          background: {
            default: "rgb(17, 24, 39)",
            paper: "rgb(31, 40, 62)",
          },
          customColors: {
            bottomPanel: "rgb(17 24 39 / 53%)",
            backgroundColor: "rgb(55, 65, 81)",
            border: "rgb(55, 65, 81)",
            borderAlt: "rgba(52, 71, 103, 0.9)",
            borderTransparent: "transparent",
          },
          text: {
            primary: "#fff",
            secondary: "rgb(156, 163, 175)",
          },
        }),
  },
});
