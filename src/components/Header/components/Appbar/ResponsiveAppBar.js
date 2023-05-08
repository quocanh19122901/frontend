import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import Cart from "../Cart/Cart";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "redux/auth/authSlice";
import { useDispatch } from "react-redux";

const pages = [
  { item: "Sản phẩm", path: "/products" },
  { item: "About Us", path: "/aboutus" },
  { item: "Liên hệ", path: "/contact" },
];
const settings = [
  { item: "Profile", path: "/profile" },
  { item: "Đơn hàng của tôi", path: "/order" },
  { item: "Theo dõi phiếu hỗ trợ", path: "/support" },
  { item: "Đăng xuất", path: "/" },
];

function ResponsiveAppBar(props) {
  function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) {
      return parts.pop().split(";").shift();
    }
  }
  const token = getCookie("access_Token");
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };
  return (
    <AppBar
      position="static"
      sx={{
        position: { sm: "static", md: "sticky" },
        top: { md: 0 },
        backgroundColor: "white",
        zIndex: 999,
        fontFamily: "monospace",
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AdbIcon
            sx={{ display: { xs: "none", md: "flex" } }}
            style={{ color: "7B68EE" }}
          />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/home"
            sx={{
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "#7B68EE",
              textDecoration: "none",
            }}
          >
            Coolmate
          </Typography>

          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "flex", md: "none" },
            }}
          >
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="#7B68EE"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page, index) => (
                <MenuItem key={index} onClick={handleCloseNavMenu}>
                  <Button
                    component={Link}
                    to={page.path}
                    sx={{ width: "100%" }}
                  >
                    {page.item}
                  </Button>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/home"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "#7B68EE",
              textDecoration: "none",
            }}
          >
            COOLMATE
          </Typography>
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
            }}
          >
            {pages.map((page, index) => (
              <MenuItem key={index} onClick={handleCloseNavMenu}>
                <Button
                  component={Link}
                  to={page.path}
                  sx={{
                    fontFamily: "monospace",
                    fontWeight: 700,
                    fontSize: "15px",
                  }}
                >
                  {page.item}
                </Button>
              </MenuItem>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0, display: "flex" }}>
            {token ? <Cart /> : ""}
            {token ? (
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                </IconButton>
              </Tooltip>
            ) : (
              <Link to={"/"}>
                <Button>Đăng nhập</Button>
              </Link>
            )}

            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting, index) => (
                <MenuItem key={index} onClick={handleCloseNavMenu}>
                  {setting.item === "logout" ? (
                    <Button onClick={handleLogout}>{setting.item}</Button>
                  ) : (
                    <Button component={Link} to={setting.path}>
                      {setting.item}
                    </Button>
                  )}
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
