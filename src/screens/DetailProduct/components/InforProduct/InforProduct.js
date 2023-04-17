import { Box, Divider, Typography } from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

import axios from "axios";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";

function InforProduct() {
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
    </Box>
  );
}

export default React.memo(InforProduct);
