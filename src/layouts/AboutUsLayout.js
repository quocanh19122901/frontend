import { Box } from "@mui/material";
import FooterCM from "components/Footer/Footer/FooterCM";
import ResponsiveAppBar from "components/Header/components/Appbar/ResponsiveAppBar";
import React from "react";

export default function AboutUsLayout({ children }) {
  return (
    <Box>
      <ResponsiveAppBar />
      <Box sx={{ minHeight: "100vh" }}> {children}</Box>
      <FooterCM />
    </Box>
  );
}
