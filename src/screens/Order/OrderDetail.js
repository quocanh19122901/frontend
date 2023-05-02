import {
  Box,
  Container,
  Table,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function OrderDetail() {
  let params = useParams();

  const [data, setData] = useState([]);
  const [product, setProduct] = useState([]);
  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/order/myorder/${params.id}`)
      .then((response) => {
        setData(response.data);
        setProduct(response.data.product);
        console.log(response.data.product);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [setData, setProduct]);
  return (
    <Container maxWidth="xl" sx={{ minHeight: "650px" }}>
      <Table>
        <Typography variant="h4" sx={{ marginTop: "20px" }}>
          Chi tiết đơn hàng
        </Typography>
        <TableRow>
          <TableCell>Tên sản phẩm</TableCell>
          <TableCell>Ảnh sản phẩm</TableCell>
          <TableCell align="center">Size</TableCell>
          <TableCell align="center">Màu</TableCell>
          <TableCell align="center">Số lượng</TableCell>
          <TableCell align="center">Tổng tiền</TableCell>
        </TableRow>
        {product.map((item, index) => (
          <TableRow key={index} sx={{ width: "100%", height: "50px" }}>
            <TableCell>{item.productId.productName}</TableCell>
            <TableCell sx={{ width: "150px" }}>
              <img src={item.productId.avatar} style={{ width: "100%" }}></img>
            </TableCell>
            <TableCell align="center">{item.size}</TableCell>
            <TableCell align="center">{item.color}</TableCell>
            <TableCell align="center">{item.quantity}</TableCell>
            <TableCell align="center">{item.price} đ</TableCell>
          </TableRow>
        ))}
      </Table>
    </Container>
  );
}
