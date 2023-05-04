import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import jwt_decode from "jwt-decode";
import PaymentIcon from "@mui/icons-material/Payment";
import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Container,
  Divider,
  FormControl,
  ListItem,
  ListItemButton,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Item = styled(Box)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: "center",
  color: theme.palette.text.secondary,
  height: "100%",
}));

export default function Payment() {
  const [cart, setCart] = useState([]);
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [phone, setPhone] = useState();
  const [address, setAddress] = useState();
  const [note, setNote] = useState();
  const totalPrice = cart.reduce((acc, item) => acc + item.product[0].price, 0);
  const handleAddressChange = (e) => {
    setAddress(e.target.value);
  };

  const handlePhoneChange = (e) => {
    setPhone(e.target.value);
  };

  const handleFirstNameChange = (e) => {
    setFirstName(e.target.value);
  };

  const handleLastNameChange = (e) => {
    setLastName(e.target.value);
  };

  const handleNoteChange = (e) => {
    setNote(e.target.value);
  };
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
      .get(`http://localhost:5000/api/cart`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })

      .then((response) => {
        setCart(response.data);
        // console.log(response.data);
      });
  }, [setCart]);
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
  const products = cart.map((item) => ({
    productId: item.product[0].productId._id,
    quantity: item.product[0].quantity,
    size: item.product[0].size[0],
    color: item.product[0].color[0],
    price: item.product[0].price,
  }));
  // console.log(products);
  const navigate = useNavigate();
  const handleSubmit = async () => {
    await axios
      .post(`http://localhost:5000/api/order`, {
        userId: `${userId}`,
        product: products,
        firstName: firstName,
        lastName: lastName,
        phone: phone,
        address: address,
        note: note,
        total: totalPrice,
      })
      .then((response) => {
        toast.success("Tạo đơn hàng thành công !", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        navigate("/order");
      })
      .catch((error) => {
        toast.error("Vui lòng điền đầy đủ thông tin cần thiết !", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      });
  };
  return (
    <Container maxWidth="lg" sx={{ margin: "60px auto" }}>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Grid container spacing={2} columns={16}>
          <Grid
            sx={{
              height: "100%",
              position: { sm: "static", md: "sticky" },
              top: { md: 60 },
              backgroundColor: "#fff",
              padding: "1rem",
              zIndex: "999",
            }}
            item
            xs={16}
            sm={16}
            md={8}
          >
            <Item>
              <Typography align="left" variant="h5">
                Thông tin người nhận:
              </Typography>
              <FormControl
                sx={{
                  minHeight: "500px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-around",
                }}
              >
                <Box>
                  <TextField
                    fullWidth
                    label="Họ"
                    variant="standard"
                    required
                    minLength={2}
                    maxLength={20}
                    pattern="[A-Za-z]+"
                    onChange={handleFirstNameChange}
                  />
                </Box>
                <Box>
                  <TextField
                    fullWidth
                    label="Tên"
                    variant="standard"
                    required
                    minLength={2}
                    maxLength={20}
                    pattern="[A-Za-z]+"
                    onChange={handleLastNameChange}
                  />
                </Box>
                <Box>
                  <TextField
                    fullWidth
                    label="Địa chỉ người nhận"
                    variant="standard"
                    required
                    minLength={5}
                    maxLength={100}
                    onChange={handleAddressChange}
                  />
                </Box>
                <Box>
                  <TextField
                    fullWidth
                    label="Số điện thoại"
                    variant="standard"
                    required
                    pattern="[0-9]+"
                    minLength={10}
                    maxLength={11}
                    onChange={handlePhoneChange}
                  />
                </Box>

                <Box>
                  <TextField
                    fullWidth
                    id="filled-multiline-static"
                    label="Ghi chú"
                    multiline
                    rows={4}
                    variant="filled"
                    onChange={handleNoteChange}
                  />
                </Box>
                <Button
                  variant="outlined"
                  sx={{ margin: "20px 20px" }}
                  startIcon={<PaymentIcon />}
                  onClick={handleSubmit}
                  type="submit"
                >
                  Hoàn tất
                </Button>
              </FormControl>
            </Item>
          </Grid>
          <Grid item xs={16} sm={16} md={8}>
            <Item>
              <Typography align="left" variant="h5">
                Thông tin đơn hàng:
              </Typography>
              {cart.map((item, index) => (
                <ListItem key={index} disablePadding>
                  <ListItemButton>
                    <Card
                      fullwidth="true"
                      sx={{ display: "flex", width: "100%", height: "100%" }}
                    >
                      <CardMedia
                        component="img"
                        sx={{ width: 160 }}
                        image={item.product[0].productId.avatar}
                        alt="Live from space album cover"
                      />
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                        }}
                      >
                        <CardContent sx={{ flex: "1 0 auto" }}>
                          <Typography component="div" variant="h6">
                            {item.product[0].productId.title}
                          </Typography>
                          <Box display="flex" alignItems="center">
                            <Typography>
                              Số lượng: {item.product[0].quantity}
                            </Typography>
                          </Box>
                          <Typography>
                            Màu sắc: {item.product[0].color}
                          </Typography>
                          <Typography>
                            Kích cỡ: {item.product[0].size}
                          </Typography>
                          <Typography
                            variant="subtitle2"
                            sx={{ float: "left" }}
                            color="#33333"
                            component="div"
                          >
                            Thành tiền: {item.product[0].price} đ
                          </Typography>
                        </CardContent>
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            pl: 1,
                            pb: 1,
                          }}
                        ></Box>
                      </Box>
                    </Card>
                  </ListItemButton>
                </ListItem>
              ))}
              <Divider
                light
                sx={{
                  borderBottomWidth: 4,
                  borderBottomStyle: "solid",
                  borderBottomColor: "#light",
                }}
              />
              <Typography
                variant="h5"
                sx={{ marginTop: "20px", color: "rgb(0,100,210)" }}
              >
                Tổng đơn giá: {totalPrice} đ{" "}
              </Typography>
            </Item>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
