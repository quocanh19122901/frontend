import React from "react";
import { Layout } from "antd";
import SideBarLayout from "./components/SideBar";

const { Content } = Layout;

const Dashboard = () => {
  return (
    <Layout hasSider>
      <SideBarLayout />
    </Layout>
  );
};

export default Dashboard;
