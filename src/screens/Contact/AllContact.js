import {
  Container,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  Box,
  Button,
} from "@mui/material";
import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { toast } from "react-toastify";

export default function AllContact() {
  const [data, setData] = useState([]);

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
      .get("http://localhost:5000/api/contact/mycontact", {
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
  const handleClick = async (id) => {
    try {
      const response = await axios.put(
        `http://localhost:5000/api/contact/${id}`
      );
      location.reload();
      toast.success("Đã hoàn thành phiếu hỗ trợ");
    } catch (error) {
      console.error(error);
      toast.error("Có lỗi xảy ra");
    }
  };
  return (
    <Container maxWidth="xl">
      <Typography variant="h4" sx={{ marginTop: "20px" }}>
        Theo dõi phiếu hỗ trợ
      </Typography>

      <Table sx={{ minWidth: 650, minHeight: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center">Mã phiếu hỗ trợ</TableCell>
            <TableCell align="center">Vấn đề gặp phải</TableCell>
            <TableCell align="center">Id đơn hàng</TableCell>
            <TableCell align="center">Mong muốn</TableCell>
            <TableCell align="center">Tình trạng</TableCell>
            <TableCell align="center"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, index) => (
            <TableRow key={index}>
              <TableCell component="th" scope="row">
                {row._id}
              </TableCell>
              <TableCell align="center">{row.problem}</TableCell>
              <TableCell align="center">{row.OrderId}</TableCell>
              <TableCell align="center">{row.desire}</TableCell>
              <TableCell
                align="center"
                sx={{
                  color: row.status === "Đã giải quyết" ? "green" : "blue",
                }}
              >
                {row.status}
              </TableCell>
              <TableCell align="center">
                {row.status === "Đã giải quyết" ? (
                  ""
                ) : (
                  <Box>
                    <Button onClick={() => handleClick(row._id)}>
                      Hoàn thành
                    </Button>
                  </Box>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Container>
  );
}
