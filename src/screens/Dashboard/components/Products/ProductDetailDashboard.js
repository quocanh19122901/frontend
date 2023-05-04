import {
  Box,
  Button,
  Container,
  Input,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
export default function ProductDetailDashboard() {
  let params = useParams();

  const [data, setData] = useState([]);
  const [desc, setDesc] = useState([]);
  const [color, setColor] = useState([]);
  const [size, setSize] = useState([]);
  const [img, setImg] = useState([]);

  const handleAccept = async () => {
    const requestOptions = {
      headers: { "Content-Type": "application/json" },
    };
    const updatedData = {
      title: data.title,
      size: size,
      color: color,
      desc: desc,
      img: img,
      quantity: data.quantity,
      price: data.price,
      avatar: data.avatar,
    };
    axios
      .put(
        `http://localhost:5000/api/products/${params.id}`,
        updatedData,
        requestOptions
      )
      .then((response) => {
        toast.success("Cập nhật thành công");
        setData(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error updating data:", error);
      });
  };
  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/products/${params.id}`)
      .then((response) => {
        setData(response.data);
        setDesc(response.data.desc);
        setColor(response.data.color);
        setSize(response.data.size);
        setImg(response.data.img);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [setData]);
  const handleChangeTitle = (e) => {
    setData((prevData) => ({
      ...prevData,
      title: e.target.value,
    }));
  };
  const handleProductNameChange = (event) => {
    setData((prevData) => ({
      ...prevData,
      productName: event.target.value,
    }));
  };

  const handleSizeChange = (event, itemIndex, textFieldIndex) => {
    setSize((prevSize) => {
      const newSize = [...prevSize];
      newSize[itemIndex][textFieldIndex].text = event.target.value;
      return newSize;
    });
  };

  const handleColorChange = (event, itemIndex, textFieldIndex) => {
    setColor((prevColor) => {
      const newColor = [...prevColor];
      newColor[itemIndex][textFieldIndex].text = event.target.value;
      return newColor;
    });
  };

  const handleAvatarChange = (event) => {
    setData((prevData) => ({
      ...prevData,
      avatar: event.target.value,
    }));
  };

  const handleDescChange = (event, itemIndex, textFieldIndex) => {
    setDesc((prevDesc) => {
      const newDesc = [...prevDesc];
      newDesc[itemIndex][textFieldIndex].text = event.target.value;
      return newDesc;
    });
  };

  const handleImgChange = (event, itemIndex, textFieldIndex) => {
    setImg((prevImg) => {
      const newImg = [...prevImg];
      newImg[itemIndex][textFieldIndex].text = event.target.value;
      return newImg;
    });
  };

  const handleQuantityChange = (event) => {
    setData((prevData) => ({
      ...prevData,
      quantity: event.target.value,
    }));
  };

  const handlePriceChange = (event) => {
    setData((prevData) => ({
      ...prevData,
      price: event.target.value,
    }));
  };

  return (
    <Container>
      <Table>
        <TableBody>
          <TableRow>
            <TableCell>Tiêu đề</TableCell>
            <TableCell>
              <TextField
                value={data.title}
                onChange={(event) => handleChangeTitle(event)}
                fullWidth
              />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Tên sản phẩm</TableCell>
            <TableCell>
              <TextField
                value={data.productName}
                onChange={(event) => handleProductNameChange(event)}
                fullWidth
              />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Mô tả</TableCell>
            <TableCell>
              {desc.map((item, index) =>
                item.map((value, textFieldIndex) => (
                  <TextField
                    key={textFieldIndex}
                    value={value.text}
                    onChange={(event) =>
                      handleDescChange(event, index, textFieldIndex)
                    }
                    fullWidth
                  />
                ))
              )}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Màu sắc</TableCell>
            <TableCell>
              {color.map((item, index) =>
                item.map((value, textFieldIndex) => (
                  <TextField
                    key={textFieldIndex}
                    value={value.text}
                    onChange={(event) =>
                      handleColorChange(event, index, textFieldIndex)
                    }
                    fullWidth
                  />
                ))
              )}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Kích cỡ</TableCell>
            <TableCell>
              {size.map((item, index) =>
                item.map((value, textFieldIndex) => (
                  <TextField
                    key={textFieldIndex}
                    value={value.text}
                    onChange={(event) =>
                      handleSizeChange(event, index, textFieldIndex)
                    }
                    fullWidth
                  />
                ))
              )}
            </TableCell>
            <TableCell>
              <Button
                onClick={handleAccept}
                sx={{ color: "blue", fontSize: "20px" }}
              >
                Cập nhật
              </Button>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Ảnh</TableCell>
            <TableCell>
              <TextField
                value={data.avatar}
                onChange={(event) => handleAvatarChange(event)}
                fullWidth
              />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Danh sách ảnh</TableCell>
            <TableCell>
              {img.map((item, index) =>
                item.map((value, textFieldIndex) => (
                  <TextField
                    key={textFieldIndex}
                    value={value.text}
                    onChange={(event) =>
                      handleImgChange(event, index, textFieldIndex)
                    }
                    fullWidth
                  />
                ))
              )}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Số lượng</TableCell>
            <TableCell>
              <TextField
                value={data.quantity}
                onChange={(event) => handleQuantityChange(event)}
                fullWidth
              />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Giá</TableCell>
            <TableCell>
              <TextField
                value={data.price}
                onChange={(event) => handlePriceChange(event)}
                fullWidth
              />
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Container>
  );
}
