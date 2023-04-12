import React from "react";

import Dashboard from "./screens/Dashboard";
import {
  BrowserRouter as Router,
  Link,
  Routes,
  Route,
  Outlet,
} from "react-router-dom";


import { Box } from "@mui/material";
const App = () => (
  <Box>
    <RouteWapper />
  </Box>
);

export default App;
