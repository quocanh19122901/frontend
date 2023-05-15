import {
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { toast } from "react-toastify";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import SettingsIcon from "@mui/icons-material/Settings";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
export default function Profile() {
  const [data, setData] = useState([]);
  const [fullName, setFullName] = useState();
  const [birthDay, setBirthDay] = useState();
  const [phone, setPhone] = useState();
  const [address, setAddress] = useState();
  const [avatar, setAvatar] = useState();
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));
  useEffect(() => {
    function getCookie(name) {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) {
        return parts.pop().split(";").shift();
      }
    }
    const token = getCookie("access_Token");
    axios
      .get("http://localhost:5000/api/profile", {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => {
        setData(response.data);
        console.log(response.data);
      })

      .catch((error) => {
        console.log(error);
      });
  }, [setData]);

  const handleAddressChange = (e) => {
    setAddress(e.target.value);
  };

  const handlePhoneChange = (e) => {
    setPhone(e.target.value);
  };

  const handleFullNameChange = (e) => {
    setFullName(e.target.value);
  };

  const handleBirthdayChange = (e) => {
    setBirthDay(e.target.value);
  };
  const handleAvatarChange = (e) => {
    setAvatar(e.target.value);
  };
  const handleAdd = async () => {
    function getCookie(name) {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) {
        return parts.pop().split(";").shift();
      }
    }
    const token = getCookie("access_Token");
    const decodeToken = jwt_decode(token);
    const userId = decodeToken.id;
    await axios
      .post(`http://localhost:5000/api/profile`, {
        userId: userId,
        fullName: fullName,
        address: address,
        phone: phone,
        birthday: birthDay,
        avatar: avatar,
      })
      .then((response) => {
        toast.success("Update thông tin thành công !", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        location.reload();
      });
  };
  return (
    <Box>
      {data.length === 0 ? (
        <Container
          maxWidth="md"
          sx={{
            minHeight: "650px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-around",
          }}
        >
          <Item>
            <Typography align="center" variant="h5" sx={{ marginTop: "20px" }}>
              Thông tin cá nhân:
            </Typography>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <img
                src="https://scontent.fhan14-2.fna.fbcdn.net/v/t39.30808-6/343985130_603187924864846_2158226703914102593_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=8bfeb9&_nc_ohc=KCZuMFDAvMkAX8aNCLa&_nc_ht=scontent.fhan14-2.fna&oh=00_AfBFSDerMZlB3A0jtLXZOPVcWqmHDHVLduefV1MsDWyiUg&oe=64579BE5"
                alt=""
                style={{
                  height: "250px",
                  width: "250px",
                  objectFit: "cover",
                  borderRadius: "50%",
                }}
              />
            </Box>
            <Box>
              <TextField
                fullWidth
                label="Url image for avatar"
                variant="standard"
                onChange={handleAvatarChange}
              />
            </Box>
            <Box>
              <TextField
                fullWidth
                label="Tên đầy đủ"
                variant="standard"
                onChange={handleFullNameChange}
              />
            </Box>
            <Box>
              <TextField
                fullWidth
                label="Địa chỉ"
                variant="standard"
                onChange={handleAddressChange}
              />
            </Box>
            <Box>
              <TextField
                fullWidth
                label="Số điện thoại"
                variant="standard"
                onChange={handlePhoneChange}
              />
            </Box>
            <Box>
              <TextField
                fullWidth
                label="Ngày sinh"
                variant="standard"
                onChange={handleBirthdayChange}
              />
            </Box>
            <Button
              variant="outlined"
              sx={{ margin: "20px 20px" }}
              onClick={handleAdd}
            >
              Hoàn tất
            </Button>
          </Item>
        </Container>
      ) : (
        <Box>
          {data?.map((item, index) => (
            <Container
              key={index}
              maxWidth="md"
              sx={{
                minHeight: "650px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-around",
              }}
            >
              <Item>
                <Typography
                  align="left"
                  variant="h5"
                  sx={{ marginTop: "20px" }}
                >
                  Thông tin cá nhân:
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <img
                    src={item.avatar}
                    alt=""
                    style={{
                      height: "250px",
                      width: "250px",
                      objectFit: "cover",
                    }}
                  />
                </Box>
                <Box
                  sx={{
                    height: "400px",
                    display: "flex",
                    flexDirection: "column",
                    textAlign: "center",
                    justifyContent: "space-around",
                  }}
                >
                  <Grid container spacing={0}>
                    <Grid item xs={6}>
                      <Typography
                        variant="h6"
                        sx={{ fontFamily: "monospace" }}
                        align="center"
                      >
                        Tên tài khoàn :
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="h6" align="center" color="primary">
                        {item.userId.username}
                      </Typography>
                    </Grid>
                  </Grid>
                  <Grid container spacing={0}>
                    <Grid item xs={6}>
                      <Typography
                        variant="h6"
                        sx={{ fontFamily: "monospace" }}
                        align="center"
                      >
                        Email đăng ký:
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="h6" align="center" color="primary">
                        {item.userId.email}
                      </Typography>
                    </Grid>
                  </Grid>
                  <Grid container spacing={0}>
                    <Grid item xs={6}>
                      <Typography
                        variant="h6"
                        sx={{ fontFamily: "monospace" }}
                        align="center"
                      >
                        Tên đầy đủ:
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="h6" align="center" color="primary">
                        {item.fullName}
                      </Typography>
                    </Grid>
                  </Grid>
                  <Grid container spacing={0}>
                    <Grid item xs={6}>
                      <Typography
                        variant="h6"
                        sx={{ fontFamily: "monospace" }}
                        align="center"
                      >
                        Ngày sinh:
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="h6" align="center" color="primary">
                        {item.birthday}
                      </Typography>
                    </Grid>
                  </Grid>
                  <Grid container spacing={0}>
                    <Grid item xs={6}>
                      <Typography
                        variant="h6"
                        sx={{ fontFamily: "monospace" }}
                        align="center"
                      >
                        Địa chỉ:
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="h5" align="center" color="primary">
                        {item.address}
                      </Typography>
                    </Grid>
                  </Grid>
                  <Grid container spacing={0}>
                    <Grid item xs={6}>
                      <Typography
                        variant="h5"
                        sx={{ fontFamily: "monospace" }}
                        align="center"
                      >
                        Số điện thoại:
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="h5" align="center" color="primary">
                        {item.phone}
                      </Typography>
                    </Grid>
                  </Grid>
                </Box>

                <Button
                  component={Link}
                  to={"/order"}
                  variant="outlined"
                  sx={{ margin: "20px 20px" }}
                  startIcon={<ShoppingBagIcon />}
                  color="secondary"
                >
                  Đến lịch sử mua hàng
                </Button>
                <Button
                  component={Link}
                  to={"/profile/edit"}
                  variant="outlined"
                  sx={{ margin: "20px 20px" }}
                  startIcon={<SettingsIcon />}
                >
                  Chỉnh sửa
                </Button>
                <Button
                  component={Link}
                  to={"/support"}
                  variant="outlined"
                  startIcon={<SupportAgentIcon />}
                  sx={{ margin: "20px 20px" }}
                  color="secondary"
                >
                  Theo dõi phiếu hỗ trợ
                </Button>
              </Item>
            </Container>
          ))}
        </Box>
      )}
    </Box>
  );
}
