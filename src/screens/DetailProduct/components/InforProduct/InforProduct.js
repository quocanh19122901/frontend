import { Box, Button, Divider, Grid, Typography } from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { styled } from "@mui/material/styles";
import axios from "axios";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import jwt_decode from "jwt-decode";

function InforProduct() {
  const Item = styled(Box)(({ theme }) => ({
    ...theme.typography.body2,
    textAlign: "center",
    color: theme.palette.text.secondary,
    marginTop: theme.spacing(2),
    display: "flex",
    justifyContent: "space-around",
  }));
  const [count, setCount] = useState(1);
  const handleDecrease = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  const handleIncrease = () => {
    setCount(count + 1);
  };
  let params = useParams();
  // console.log(params);
  const [data, setData] = useState([]);
  const [desc, setDesc] = useState([]);
  const [selectedColor, setSelectedColor] = useState();
  const [selectedSize, setSelectedSize] = useState();
  const [color, setColor] = useState([]);
  const [size, setSize] = useState([]);

  const [cart, setCart] = useState([]);
  const handleOnChangeSize = (event, value) => {
    setSelectedSize(value);
  };
  const handleOnChangeColor = (event, value) => {
    setSelectedColor(value);
  };

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/products/${params.id}`)
      .then((response) => {
        setData(response.data);
        setDesc(response.data.desc);
        setColor(response.data.color);
        setSize(response.data.size);
      })
      .catch((error) => {
        console.log(error);
        toast("fetch loi roi!");
      });
  }, [params.id]);
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
  const handleAdd = async () => {
    try {
      if (!selectedSize || !selectedColor) {
        throw new Error("Hãy chọn size và màu");
      }
      await axios
        .post(`http://localhost:5000/api/cart`, {
          userId: `${userId}`,
          product: [
            {
              productId: `${params.id}`,
              quantity: count,
              size: selectedSize,
              color: selectedColor,
              price: data.price,
            },
          ],
        })
        .then((response) => {
          toast.success("Đã thêm vào giỏ hàng thành công !", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
        });
    } catch (error) {
      toast.error("Hãy chọn size và màu", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  };
  const flatOptions = size.flat();
  const flatOptionsColor = color.flat();

  return (
    <Box>
      <React.Fragment>
        <Typography variant="h5" align="left">
          {data.productName}
        </Typography>
        <Typography sx={{ marginTop: "20px" }} variant="subtitle2">
          Giá sản phẩm: {data.price} đ
        </Typography>
        <Box>
          <br />
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={flatOptionsColor.map((item, index) => item.text)}
            onChange={handleOnChangeColor}
            sx={{ width: 300, marginTop: "20px" }}
            renderInput={(params) => <TextField {...params} label="Màu sắc" />}
          />
        </Box>
        <Box>
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={flatOptions.map((item, index) => item.text)}
            onChange={handleOnChangeSize}
            sx={{ width: 300, marginTop: "20px" }}
            renderInput={(params) => <TextField {...params} label="Kích cỡ" />}
          />
        </Box>
        <Box>
          <br />
          <Typography variant="subtitle1">Đặc điểm: </Typography>
          <ul>
            {desc.map((item, index) =>
              item.map((value, index) => (
                <li key={index}>
                  <Typography>{value.text}</Typography>
                </li>
              ))
            )}
          </ul>
        </Box>
      </React.Fragment>
      <Box>
        <Grid sx={{ alignItems: "center" }} container columns={12}>
          <Grid item xs={6}>
            <Item>
              <Box display="flex" alignItems="center">
                <Button onClick={handleDecrease}>-</Button>
                <Typography>{count}</Typography>
                <Button onClick={handleIncrease}>+</Button>
              </Box>
            </Item>
          </Grid>
          <Grid item xs={6}>
            <Item
              sx={{
                backgroundColor: "#f0f0f0",
                borderRadius: " 0px 20px",
              }}
            >
              <Button
                startIcon={<LocalShippingIcon />}
                sx={{ width: "100%", borderRadius: "inherit" }}
              >
                <Typography
                  variant="overline"
                  sx={{ padding: "10px 0px 5px 10px" }}
                  onClick={handleAdd}
                >
                  Thêm vào giỏ hàng
                </Typography>
              </Button>
            </Item>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

export default React.memo(InforProduct);
