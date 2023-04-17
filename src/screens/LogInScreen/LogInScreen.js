import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import { themeCustom } from "../../themes/theme.main";
import LoginImg from "./Login/LoginImg";
import LoginMain from "./Login/LoginMain";

const theme = createTheme(themeCustom);

export default function LogInScreen() {
  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <LoginImg />
        <LoginMain />s
      </Grid>
    </ThemeProvider>
  );
}
