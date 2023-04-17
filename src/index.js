import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { store } from "./redux/store/store";
import { Provider } from "react-redux";
import { CssBaseline } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { themeCustom } from "./themes/theme.main";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const rootElement = document.getElementById("root");
const root = ReactDOM.createRoot(rootElement);
const theme = createTheme(themeCustom);
root.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <App />
      <ToastContainer />
      <CssBaseline />
    </ThemeProvider>
  </Provider>
);
