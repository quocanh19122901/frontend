import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import axios from "axios";
import { useState, useEffect } from "react";
import { Box, Button, Container, Modal, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { Tag } from "antd";
export default function AllProduct() {
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [idDelete, setIdDelete] = useState();
  const handleOpen = (id) => {
    setIdDelete(id);
    setOpen(true);
  };
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
      .get("http://localhost:5000/api/products", {
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
  const handleDelete = async () => {
    await axios.delete(`http://localhost:5000/api/products/${idDelete}`);
    function getCookie(name) {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) {
        return parts.pop().split(";").shift();
      }
    }
    const token = getCookie("access_Token");
    axios
      .get(`http://localhost:5000/api/products`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => {
        setData(response.data);
        // console.log(response.data);
        handleClose();
      });
  };
  return (
    <Container maxWidth="xl">
      <Typography variant="h4" sx={{ marginTop: "20px" }}>
        Danh sách sản phẩm
      </Typography>
      <Link to="/dashboard/products/add">
        <Button
          sx={{ float: "right", backgroundColor: "blue", color: "white" }}
        >
          Thêm mới
        </Button>
      </Link>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center">Tên sản phẩm</TableCell>
            <TableCell align="center">Mô tả</TableCell>
            <TableCell align="center">Ảnh</TableCell>
            <TableCell align="center">Loại</TableCell>
            <TableCell align="center">Số lượng</TableCell>
            <TableCell align="center">Đã bán</TableCell>
            <TableCell align="center">Trạng thái</TableCell>
            <TableCell align="center"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, index) => (
            <TableRow key={index}>
              <TableCell component="th" scope="row">
                {row.productName}
              </TableCell>
              <TableCell align="left">
                {row.desc.map((value, index) =>
                  value.map((desc, index) => <li key={index}>{desc.text}</li>)
                )}
              </TableCell>
              <TableCell align="left" sx={{ width: "150px" }}>
                <img src={row.avatar}></img>
              </TableCell>
              <TableCell align="center">
                {row.CategoryId.CategoryName}
              </TableCell>
              <TableCell align="center">{row.quantity}</TableCell>
              <TableCell align="center">{row.sold}</TableCell>
              <TableCell align="center">
                <Tag
                  style={{
                    color: row.status === "Đang bày bán" ? "green" : "grey",
                    height: "40px",
                    fontSize: "15px",
                    lineHeight: "40px",
                  }}
                >
                  {row.status}
                </Tag>
              </TableCell>
              <TableCell align="center">
                <Box>
                  <Link to={`/dashboard/products/${row._id}`} key={index}>
                    <Button>Xem chi tiêt</Button>
                  </Link>
                  <Button
                    sx={{ color: "red" }}
                    onClick={() => handleOpen(row._id)}
                  >
                    Xóa
                  </Button>
                  <div>
                    <Modal
                      open={open}
                      onClose={handleClose}
                      aria-labelledby="modal-modal-title"
                      aria-describedby="modal-modal-description"
                    >
                      <Box sx={style}>
                        <Typography
                          id="modal-modal-title"
                          variant="h6"
                          component="h2"
                        >
                          Xác nhận xóa ?
                        </Typography>
                        <Button
                          onClick={() => handleDelete(idDelete)}
                          id="modal-modal-description"
                          sx={{ mt: 2 }}
                        >
                          Xác nhận
                        </Button>
                        <Button
                          onClick={() => handleClose()}
                          id="modal-modal-description"
                          sx={{ mt: 2, mr: 4 }}
                        >
                          Quay lại
                        </Button>
                      </Box>
                    </Modal>
                  </div>
                </Box>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Container>
  );
}
