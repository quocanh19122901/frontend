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
export default function SideBarLayout() {
  const { Sider } = Layout;

  const labels = [
    "Tài khoản",
    "Sản phẩm",
    "Danh mục",
    "Danh mục phụ",
    "Liên hệ",
    "Đơn hàng",
    "Thống kê",
    "Về trang chủ",
  ];

  const items = [
    {
      key: "1",
      icon: <UserOutlined />,
      label: labels[0],
      link: "/dashboard/account",
    },
    {
      key: "2",
      icon: <CheckroomIcon />,
      label: labels[1],
      link: "/dashboard/products",
    },
    {
      key: "3",
      icon: <CategoryIcon />,
      label: labels[2],
      link: "/dashboard/category",
    },
    {
      key: "4",
      icon: <ClassIcon />,
      label: labels[3],
      link: "/dashboard/subcategory",
    },
    {
      key: "5",
      icon: <ContactSupportIcon />,
      label: labels[4],
      link: "/dashboard/contact",
    },
    {
      key: "6",
      icon: <FactCheckIcon />,
      label: labels[5],
      link: "/dashboard/order",
    },
    {
      key: "7",
      icon: <BarChartOutlined />,
      label: labels[6],
      link: "/dashboard/statistics",
    },
    {
      key: "8",
      icon: <HomeOutlined />,
      label: labels[7],
      link: "/home",
    },
  ];
  function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) {
      return parts.pop().split(";").shift();
    }
  }
  const username = getCookie("username");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };
  return (
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
        <Typography
          style={{
            color: "white",
            fontFamily: "monospace",
            fontSize: "large",
            textAlign: "center",
          }}
        >
          Hello, {username}
        </Typography>
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

      <Button
        variant="text"
        onClick={handleLogout}
        style={{ width: "100%", color: "red" }}
      >
        Đăng xuất
      </Button>
    </Sider>
  );
}
