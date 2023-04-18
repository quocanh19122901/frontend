import { Box, Button, Divider, Grid, Typography } from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { styled } from "@mui/material/styles";
import axios from "axios";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";

function InforProduct() {
  const Item = styled(Box)(({ theme }) => ({
    ...theme.typography.body2,
    textAlign: "center",
    color: theme.palette.text.secondary,
    marginTop: theme.spacing(2),
    display: "flex",
    justifyContent: "space-around",
  }));
  const [count, setCount] = useState(0);
  const handleDecrease = () => {
    if (count > 0) {
      setCount(count - 1);
    }
  };

  const handleIncrease = () => {
    setCount(count + 1);
  };
  let params = useParams();
  console.log(params);
  const [data, setData] = useState([]);
  const [desc, setDesc] = useState([]);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);

  const color = useMemo(() => data.color || [], [data.color]);
  const size = useMemo(() => data.size || [], [data.size]);

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
      })
      .catch((error) => {
        console.log(error);
        toast("fetch loi roi!");
      });
  }, [params.id]);

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
            options={color}
            onChange={handleOnChangeColor}
            sx={{ width: 300, marginTop: "20px" }}
            renderInput={(params) => <TextField {...params} label="Màu sắc" />}
          />
        </Box>
        <Box>
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={size}
            onChange={handleOnChangeSize}
            sx={{ width: 300, marginTop: "20px" }}
            renderInput={(params) => <TextField {...params} label="Kích cỡ" />}
          />
        </Box>
        <Box>
          <br />
          <Typography variant="subtitle1">Đặc điểm: </Typography>
          <ul>
            {desc.map((item, index) => (
              <li key={index}>
                <Typography>{item}</Typography>
              </li>
            ))}
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
