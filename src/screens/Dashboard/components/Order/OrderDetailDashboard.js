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
import {
  PDFDownloadLink,
  PDFViewer,
  Document,
  Page,
  Text,
} from "@react-pdf/renderer";
import ReactPDF from "@react-pdf/renderer";
import Title from "antd/es/typography/Title";
import { Tag } from "antd";
import InvoiceContent from "./InvoiceContent";
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

  const handleAccept = async () => {
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
        const totalPrice = response.data.product.reduce(
          (acc, item) => acc + item.price,
          0
        );
        response.data.product.totalPrice = totalPrice;
        setProduct(response.data.product);

        // console.log(response.data.product);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [setData, setProduct]);
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Container maxWidth="xl">
        <Table id="orderTable">
          <Title sx={{ marginTop: "20px" }}>Chi tiết đơn hàng</Title>
          <Box>
            {product.length > 0 && (
              <PDFDownloadLink
                document={<InvoiceContent product={product} data={data} />}
                fileName="example.pdf"
              >
                Xuất hóa đơn
              </PDFDownloadLink>
            )}
          </Box>
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
              <TableCell align="center">
                {item.price.toLocaleString("vi-VN")} đ
              </TableCell>
            </TableRow>
          ))}
          <TableRow>
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell align="center"></TableCell>
            <TableCell align="center"></TableCell>
            <TableCell align="center" sx={{ fontWeight: "bold" }}>
              <Typography variant="h6">Tổng giá trị hóa đơn</Typography>
            </TableCell>
            <TableCell
              align="center"
              sx={{ color: "green", fontWeight: "bold" }}
            >
              <Typography variant="h6">
                {product?.totalPrice &&
                  product?.totalPrice.toLocaleString("vi-VN")}
                đ
              </Typography>
            </TableCell>
          </TableRow>
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
