import { Box, Grid } from "@mui/material";
import { Layout } from "antd";
import ResponsiveAppBar from "components/Header/components/Appbar/ResponsiveAppBar";
import React from "react";
import SidebarProfile from "screens/Profile/SidebarProfile";

export default function ProfileLayout({ children }) {
  return (
    <Box>
      <ResponsiveAppBar />
      <Layout hasSider>
        <Layout className="site-layout">
          <Box sx={{ padding: "3rem", minHeight: "100vh" }}> {children}</Box>
        </Layout>
      </Layout>
    </Box>
  );
}
