import React from "react";
import { Link, Routes, Route, Outlet } from "react-router-dom";
import {
  BarChartOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Layout, Menu, theme, Typography } from "antd";
import { Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/auth/authSlice";
import { useNavigate } from "react-router-dom";
import SideBar from "./components/SideBar";
import SideBarLayout from "./components/SideBar";

const { Header, Content } = Layout;

const Dashboard = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout hasSider>
      <SideBarLayout />
      <Layout className="site-layout" style={{ marginLeft: 200 }}>
        <Header style={{ padding: 0, background: colorBgContainer }} />
        <Content style={{ margin: "24px 16px 0", overflow: "initial" }}>
          <div
            style={{
              padding: 24,
              textAlign: "center",
              background: colorBgContainer,
            }}
          >
            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Dashboard;
