import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { store } from "./app/store";
import { Provider } from "react-redux";
import { CssBaseline } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { themeCustom } from "./themes/theme.main";


const rootElement = document.getElementById("root");
const root = ReactDOM.createRoot(rootElement);
const theme = createTheme(themeCustom);
root.render(
  <Provider store={store}>
     <ThemeProvider theme={theme}>
     <App/>
    <CssBaseline />
     </ThemeProvider>
  </Provider>
);

