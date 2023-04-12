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
import { useDispatch} from "react-redux";
import { logout } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";

const { Header, Content, Sider } = Layout;

const labels = ["Account", "Products", "Category", "Orders"];

const items = [
  { key: "1", icon: <UserOutlined />, label: labels[0], link: "/dashboard/home" },
  {
    key: "2",
    icon: <VideoCameraOutlined />,
    label: labels[1],
    link: "/dashboard/products",
  },
  { key: "3", icon: <UploadOutlined />, label: labels[2], link: "/dashboard/category" },
  { key: "4", icon: <BarChartOutlined />, label: labels[3], link: "/dashboard/charts" },
];

const Dashboard = () => {

  function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) {
      return parts.pop().split(";").shift();
    }
  }
  const username = getCookie("username");
  const dispatch = useDispatch();
  const navigate= useNavigate();
  const handleLogout = () => {
    dispatch(logout());
    navigate("/login")
  };
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout hasSider>
      <Sider
        style={{
          overflow: "auto",
          height: "100vh",
          position: "fixed",
          left: 0,
          top: 0,
          bottom: 0,
        }}
      >
        <Typography
          style={{
            fontSize: 20,
            color: "white",
            fontWeight: "bold",
            textAlign: "center",
            fontFamily: "Helvetica",
            padding: 4,
            margin: 12,
            letterSpacing: 4,
          }}
        >
          DASHBOARD
        </Typography>
        <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
          {items.map((item) => (
            <Menu.Item key={item.key} icon={item.icon}>
              <Link to={item.link}>{item.label}</Link>
            </Menu.Item>
          ))}
        </Menu>
        <Typography style={{color:"blue",fontSize: "large", textAlign: "center"}}>Hello, {username} </Typography>
        <Button variant="contained" onClick={handleLogout} style={{position: "absolute",
    left: "50px"}}>Log out</Button>
      </Sider>
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
