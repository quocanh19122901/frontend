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
import { useParams } from "react-router-dom";

export default function Cart() {
  const theme = useTheme();
  const [total, setTotal] = useState(200);
  const [count, setCount] = useState(0);
  const [cart, setCart] = useState();
  const price = 200;

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
        console.log(response.data);
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

  const list = (anchor) => (
    <Box
      sx={{
        width: 450,
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
      }}
      mt={2}
      role="presentation"
      onClick={toggleDrawer(anchor, true)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <Card sx={{ display: "flex" }}>
        <CardMedia
          component="img"
          sx={{ width: 160 }}
          image="https://media-cdn-v2.laodong.vn/Storage/NewsPortal/2023/3/30/1173675/Pinkvenom-Jisoo-6.jpg"
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
              Live From Space
            </Typography>
            <Box display="flex" alignItems="center">
              <Button
                onClick={() => {
                  setCount(count - 1);
                }}
              >
                -
              </Button>
              <Typography>{count}</Typography>
              <Button onClick={() => setCount(count + 1)}>+</Button>
              <Button color="error" startIcon={<DeleteIcon />}>
                Remove
              </Button>
            </Box>
            <Typography
              variant="subtitle2"
              sx={{ float: "left" }}
              color="#33333"
              component="div"
            >
              Thành tiền: {total}
            </Typography>
          </CardContent>
          <Box
            sx={{ display: "flex", alignItems: "center", pl: 1, pb: 1 }}
          ></Box>
        </Box>
      </Card>
    </Box>
  );

  return (
    <div>
      <Button onClick={toggleDrawer("right", true)}>
        <AddShoppingCartIcon />
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
