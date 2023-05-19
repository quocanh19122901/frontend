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
import { Formik, Form, Field, ErrorMessage } from "formik";
import { validationSchema } from "./validationSchema";
const Item = styled(Box)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: "center",
  color: theme.palette.text.secondary,
  height: "100%",
}));
export default function Payment() {
  const [cart, setCart] = useState([]);
  const totalPrice = cart.reduce((acc, item) => acc + item.product[0].price, 0);

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
        console.log(response.data.quantity);
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
  const navigate = useNavigate();

  const handleSubmit = async (values, { setSubmitting }) => {
    const { firstName, lastName, address, phone, note } = values;

    await axios
      .post(
        `http://localhost:5000/api/order`,
        {
          userId: `${userId}`,
          product: products,
          firstName: firstName,
          lastName: lastName,
          phone: phone,
          address: address,
          note: note,
          total: totalPrice,
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      )
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
        toast.warning("Số lượng sản phẩm không đủ", {
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

    setSubmitting(false);
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
              zIndex: "0",
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
              <Formik
                initialValues={{
                  firstName: "",
                  lastName: "",
                  address: "",
                  phone: "",
                  note: "",
                }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
              >
                {({ handleSubmit }) => (
                  <Form onSubmit={handleSubmit}>
                    <Field
                      name="firstName"
                      type="text"
                      label="Họ"
                      as={TextField}
                      fullWidth
                      size="small"
                      sx={{ mb: "10px" }}
                    />
                    <ErrorMessage
                      name="firstName"
                      component={Typography}
                      color="error"
                    />

                    <Field
                      name="lastName"
                      type="text"
                      label="Tên"
                      as={TextField}
                      fullWidth
                      size="small"
                      sx={{ mb: "10px" }}
                    />
                    <ErrorMessage
                      name="lastName"
                      component={Typography}
                      color="error"
                    />

                    <Field
                      name="address"
                      type="text"
                      label="Địa chỉ người nhận"
                      as={TextField}
                      fullWidth
                      size="small"
                      sx={{ mb: "10px" }}
                    />
                    <ErrorMessage
                      name="address"
                      component={Typography}
                      color="error"
                    />

                    <Field
                      name="phone"
                      type="text"
                      label="Số điện thoại"
                      as={TextField}
                      fullWidth
                      size="small"
                      sx={{ mb: "10px" }}
                    />
                    <ErrorMessage
                      name="phone"
                      component={Typography}
                      color="error"
                    />

                    <Field
                      name="note"
                      type="text"
                      label="Ghi chú"
                      as={TextField}
                      fullWidth
                      size="small"
                      sx={{ mb: "10px" }}
                      multiline
                      rows={4}
                    />

                    <Button
                      variant="outlined"
                      sx={{ margin: "20px 20px" }}
                      startIcon={<PaymentIcon />}
                      type="submit"
                    >
                      Hoàn tất
                    </Button>
                  </Form>
                )}
              </Formik>
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
                          justifyContent: "space-between",
                        }}
                      >
                        <CardContent
                          sx={{
                            flex: "1 0 auto",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "space-between",
                          }}
                        >
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
                            Thành tiền:{" "}
                            {item.product[0].price.toLocaleString("vi-VN")} đ
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
                Tổng đơn giá: {totalPrice.toLocaleString("vi-VN")} đ{" "}
              </Typography>
            </Item>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
