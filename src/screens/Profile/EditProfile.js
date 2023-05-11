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
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn";
import DoneIcon from "@mui/icons-material/Done";
import { toast } from "react-toastify";
export default function EditProfile() {
  const [data, setData] = useState([]);
  const [fullName, setFullName] = useState();
  const [birthDay, setBirthDay] = useState();
  const [phone, setPhone] = useState();
  const [address, setAddress] = useState();
  const [avatar, setAvatar] = useState();
  const navigate = useNavigate();
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
    console.log(e.target.value);
  };

  const handleBirthdayChange = (e) => {
    setBirthDay(e.target.value);
  };
  const handleAvatarChange = (e) => {
    setAvatar(e.target.value);
  };
  const handleReturn = (e) => {
    navigate("/profile");
  };
  const handleUpdate = () => {
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
    const requestOptions = {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    };
    const updatedData = {
      userId: userId,
      fullName: fullName,
      address: address,
      phone: phone,
      birthday: birthDay,
      avatar: avatar,
    };
    axios
      .put(
        `http://localhost:5000/api/profile`,

        updatedData,
        requestOptions
      )
      .then((response) => {
        toast.success("Cập nhật thành công");
        setData(response.data);
        navigate("/profile");
      })
      .catch((error) => {
        console.error("Error updating data:", error);
      });
  };
  return (
    <Box>
      {data.map((item, index) => (
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
          <Typography align="left" variant="h5" sx={{ marginTop: "20px" }}>
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
                borderRadius: "50%",
              }}
            />
          </Box>
          <Box>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography color="primary" align="center">
                  Url avatar:
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  defaultValue={item.avatar}
                  variant="standard"
                  onChange={handleAvatarChange}
                />
              </Grid>
            </Grid>
          </Box>
          <Box>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography color="primary" align="center">
                  Tên đầy đủ:
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  defaultValue={item.fullName}
                  variant="standard"
                  onChange={handleFullNameChange}
                />
              </Grid>
            </Grid>
          </Box>
          <Box>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography color="primary" align="center">
                  Ngày sinh:
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  defaultValue={item.birthday}
                  variant="standard"
                  onChange={handleBirthdayChange}
                />
              </Grid>
            </Grid>
          </Box>
          <Box>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography color="primary" align="center">
                  Địa chỉ:
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  defaultValue={item.address}
                  variant="standard"
                  onChange={handleAddressChange}
                />
              </Grid>
            </Grid>
          </Box>
          <Box>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography color="primary" align="center">
                  Số điện thoại:
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  defaultValue={item.phone}
                  variant="standard"
                  onChange={handlePhoneChange}
                />
              </Grid>
            </Grid>
          </Box>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Button
                fullWidth
                variant="outlined"
                sx={{ margin: "20px 20px" }}
                onClick={handleReturn}
              >
                Quay lại
                <KeyboardReturnIcon sx={{ margin: "0px 20px" }} />
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button
                fullWidth
                variant="outlined"
                sx={{
                  margin: "20px 20px",
                  color: "green",
                  borderColor: "green",
                  border: "1px solid green",
                }}
                onClick={handleUpdate}
              >
                Cập nhật
                <DoneIcon sx={{ margin: "0px 20px" }} />
              </Button>
            </Grid>
          </Grid>
        </Container>
      ))}
    </Box>
  );
}
