import {
  Box,
  Button,
  Container,
  Grid,
  Paper,
  Table,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { styled } from "@mui/material/styles";
import { Avatar } from "antd";

export default function OrderDetailDashboard() {
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));
  let params = useParams();

  const [data, setData] = useState([]);
  const [product, setProduct] = useState([]);
  const [userId, setUserId] = useState("");
  const [user, setUser] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleAccept = async () => {
    setIsLoading(true);

    try {
      const response = await axios.put(
        `http://localhost:5000/api/order/${params.id}`
      );

      console.log(response.data);
      alert("Đã xác nhận đơn hàng");
    } catch (error) {
      console.error(error);
      alert("Có lỗi xảy ra khi cập nhật đơn hàng");
    }

    setIsLoading(false);
  };
  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/order/myorder/${params.id}`)
      .then((response) => {
        setData(response.data);
        setProduct(response.data.product);
        setUserId(response.data.userId);

        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [setData, setProduct]);
  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/user/find/${userId}`)
      .then((response) => {
        setUser(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [userId]);
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Container maxWidth="xl">
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
                <img
                  src={item.productId.avatar}
                  style={{ width: "100%" }}
                ></img>
              </TableCell>
              <TableCell align="center">{item.size}</TableCell>
              <TableCell align="center">{item.color}</TableCell>
              <TableCell align="center">{item.quantity}</TableCell>
              <TableCell align="center">{item.price} đ</TableCell>
            </TableRow>
          ))}
        </Table>
        {data.status === "Đã hủy" || data.status === "Đã xác nhận" ? (
          <Button href="/dashboard/order">Quay lại</Button>
        ) : (
          <Button onClick={handleAccept} href="/dashboard/order">
            Xác nhận đơn hàng
          </Button>
        )}
      </Container>
    </Box>
  );
}
