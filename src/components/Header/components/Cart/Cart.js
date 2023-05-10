import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { useTheme } from "@mui/material/styles";
import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import PaymentIcon from "@mui/icons-material/Payment";
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { toast } from "react-toastify";

export default function Cart() {
  const theme = useTheme();
  const [cart, setCart] = useState([]);

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
      });
  }, [setCart]);
  const [state, setState] = React.useState({
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };
  const handleRemove = async (id) => {
    await axios.delete(`http://localhost:5000/api/cart/${id}`);
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
        console.log(response.data);
      });
  };
  const handleGetCart = () => {
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
        console.log(response.data);
      });
  };
  const list = React.useMemo(() => (anchor) => (
    <List>
      {cart && cart.length > 0 ? (
        cart.map((item, index) => (
          <ListItem key={index} disablePadding>
            <ListItemButton>
              <Card sx={{ display: "flex" }}>
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
                  <CardContent sx={{ maxWidth: "400px", flex: "1 0 auto" }}>
                    <Typography component="div" variant="h6">
                      {item.product[0].productId.title}
                    </Typography>
                    <Box display="flex" alignItems="center">
                      <Typography>
                        Số lượng: {item.product[0].quantity}
                      </Typography>

                      <Button
                        color="error"
                        sx={{ float: "right" }}
                        startIcon={<DeleteIcon />}
                        onClick={() => handleRemove(item._id)}
                      >
                        Remove
                      </Button>
                    </Box>
                    <Typography>Màu sắc: {item.product[0].color}</Typography>
                    <Typography>Kích cỡ: {item.product[0].size}</Typography>
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
        ))
      ) : (
        <Typography>Không có sản phẩm trong giỏ hàng</Typography>
      )}
      <Box
        sx={{
          position: "sticky",
          bottom: "0",
        }}
      >
        {cart && cart.length > 0 ? (
          <Button
            variant="outlined"
            sx={{
              backgroundColor: "black",
              color: "white",
              width: "90%",
              margin: "20px 20px",
              "&:hover": {
                backgroundColor: "blue",
                color: "white",
              },
            }}
            startIcon={<PaymentIcon />}
            href="/payment"
          >
            Thanh toán
          </Button>
        ) : (
          <Button
            variant="outlined"
            sx={{
              backgroundColor: "grey",
              color: "white",
              width: "90%",
              margin: "20px 20px",
              "&:hover": {
                backgroundColor: "blue",
                color: "white",
              },
            }}
            startIcon={<PaymentIcon />}
            onClick={() => toast.error("Không có sản phẩm nào trong giỏ hàng")}
          >
            Thanh toán
          </Button>
        )}
      </Box>
    </List>
  ));

  return (
    <div>
      <Button onClick={toggleDrawer("right", true)}>
        <AddShoppingCartIcon onClick={handleGetCart} />
      </Button>
      <Drawer
        anchor="right"
        open={state.right}
        onClose={toggleDrawer("right", false)}
      >
        {list("right")}
      </Drawer>
    </div>
  );
}
