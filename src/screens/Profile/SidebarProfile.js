import React from "react";
import { Link, Routes, Route, Outlet } from "react-router-dom";
import {
  BarChartOutlined,
  HomeOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Layout, Menu, theme, Typography } from "antd";
import { Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "redux/auth/authSlice";
import CategoryIcon from "@mui/icons-material/Category";
import CheckroomIcon from "@mui/icons-material/Checkroom";
import ClassIcon from "@mui/icons-material/Class";
import ContactSupportIcon from "@mui/icons-material/ContactSupport";
import FactCheckIcon from "@mui/icons-material/FactCheck";
export default function SidebarProfile() {
  const { Sider } = Layout;

  const labels = ["Thông tin cá nhân", "Đơn hàng", "Phiếu hỡ trợ"];

  const items = [
    {
      key: "1",
      icon: <UserOutlined />,
      label: labels[0],
      link: "/profile",
    },
    {
      key: "2",
      icon: <CheckroomIcon />,
      label: labels[1],
      link: "/profile/order",
    },
    {
      key: "3",
      icon: <CategoryIcon />,
      label: labels[2],
      link: "/profile/support",
    },
  ];

  return (
    <Sider
      style={{
        overflow: "auto",
        height: "100vh",
        position: "fixed",
        width: "100%",
        left: 0,
        top: 0,
        bottom: 0,
        backgroundColor: "#f5f5f5",
      }}
    >
      <Typography
        style={{
          fontSize: 20,
          color: "black",
          fontWeight: "bold",
          textAlign: "center",
          fontFamily: "Helvetica",
          padding: 4,
          margin: 12,
          letterSpacing: 4,
        }}
      >
        DASHBOARD
        <Typography
          style={{
            color: "black",
            fontFamily: "monospace",
            fontSize: "large",
            textAlign: "center",
          }}
        ></Typography>
      </Typography>
      <Menu theme="dark" mode="inline">
        {items.map((item) => (
          <Menu.Item
            key={item.key}
            style={{ fontFamily: "monospace" }}
            icon={item.icon}
          >
            <Link to={item.link}>{item.label}</Link>
          </Menu.Item>
        ))}
      </Menu>
    </Sider>
  );
}
