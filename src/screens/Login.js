import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import LoginImg from "../component/Login/LoginImg";
import LoginMain from "../component/Login/LoginMain";
import { themeCustom } from "../themes/theme.main";

const theme = createTheme(themeCustom);

export default function SignInSide() {
  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <LoginImg />
        <LoginMain />
      </Grid>
    </ThemeProvider>
  );
}
