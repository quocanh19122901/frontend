import { Box } from "@mui/material";
import FooterCM from "components/Footer/Footer/FooterCM";
import ResponsiveAppBar from "components/Header/components/Appbar/ResponsiveAppBar";
import React from "react";

export default function DefaultLayout({ children }) {
  return (
    <Box>
      <ResponsiveAppBar style={{ zIndex: 999 }} />
      <Box sx={{ padding: "3rem", minHeight: "100vh" }}> {children}</Box>
      <FooterCM />
    </Box>
  );
}
