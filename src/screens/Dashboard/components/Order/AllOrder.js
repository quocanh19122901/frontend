import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import axios from "axios";
import { useState, useEffect } from "react";
import { Box, Button, Container, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import "./AllOrder.css";
import { Tag } from "antd";
export default function AllOrder() {
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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
      .get("http://localhost:5000/api/order", {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => {
        setData(response.data);
        console.log(response.data);
      })

      .catch((error) => {
        console.log(error);
      });
  }, [setData]);
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "550px",
    bgcolor: "background.paper",
    border: "1px solid #000",
    boxShadow: 24,
    p: 4,
  };
  return (
    <Container maxWidth="xl">
      <Typography variant="h4" sx={{ marginTop: "20px" }}>
        Danh sách các đơn hàng
      </Typography>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Mã đơn hàng</TableCell>
            <TableCell align="center">Tên người nhận</TableCell>
            <TableCell align="center">Số điện thoại</TableCell>
            <TableCell align="center">Địa chỉ</TableCell>
            <TableCell align="center">Ghi chú</TableCell>
            <TableCell align="center">Tình trạng đơn hàng</TableCell>
            <TableCell align="center">Ngày đặt</TableCell>
            <TableCell align="center">Tổng giá tiền</TableCell>
            <TableCell align="center"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, index) => (
            <TableRow key={index}>
              <TableCell component="th" scope="row">
                {row._id}
              </TableCell>
              <TableCell align="center">
                {row.firstName} {row.lastName}
              </TableCell>
              <TableCell align="center">{row.phone}</TableCell>
              <TableCell align="center">{row.note}</TableCell>
              <TableCell align="center">{row.address}</TableCell>
              <TableCell align="center">
                <Tag
                  style={{
                    color: row.status === "Đã xác nhận" ? "green" : "blue",
                    height: "40px",
                    fontSize: "15px",
                    lineHeight: "40px",
                  }}
                >
                  {row.status}
                </Tag>
              </TableCell>
              <TableCell align="center">{row.createdAt}</TableCell>
              <TableCell align="center">{row.total}đ</TableCell>
              <TableCell align="center">
                <Box>
                  <Link to={`/dashboard/order/${row._id}`} key={index}>
                    {row.status === "Đã xác nhận" ? (
                      <Button
                        style={{
                          color: "green",
                        }}
                      >
                        Xác nhận đơn hàng
                      </Button>
                    ) : (
                      <Button
                        style={{
                          color: "blue",
                        }}
                      >
                        Xem chi tiết
                      </Button>
                    )}
                  </Link>
                </Box>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Container>
  );
}
