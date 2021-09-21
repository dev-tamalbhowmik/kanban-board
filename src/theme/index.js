import { createTheme, responsiveFontSizes } from "@mui/material/styles";
import { red } from "@mui/material/colors";
import { PRIMARY, SECONDARY } from "../constants/colors";

const theme = createTheme({
  palette: {
    primary: {
      light: PRIMARY.light,
      main: PRIMARY.main,
      dark: PRIMARY.dark,
      contrastText: PRIMARY.contrastText,
    },
    secondary: {
      light: SECONDARY.light,
      main: SECONDARY.main,
      dark: SECONDARY.dark,
      contrastText: SECONDARY.contrastText,
    },
    error: {
      main: red.A400,
    },
  },
});

export default responsiveFontSizes(theme);
