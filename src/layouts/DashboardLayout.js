import { Box } from "@mui/material";
import { Layout } from "antd";
import React from "react";
import SideBarLayout from "screens/Dashboard/components/SideBar";

function DashboardLayout({ children }) {
  return (
    <Layout hasSider>
      <SideBarLayout />
      <Layout className="site-layout" style={{ marginLeft: 200 }}>
        {children}
      </Layout>
    </Layout>
  );
}

export default DashboardLayout;
