import React from "react";
import { Box } from "@mui/material";
import RouteWrapper from "./routes/RouteWrapper";
import ResponsiveAppBar from "components/Header/components/Appbar/ResponsiveAppBar";
import FooterCM from "components/Footer/Footer/FooterCM";
const App = () => (
  <Box>
    <RouteWrapper maxWidth="xl" />
  </Box>
);

export default App;
