import { Box, Button, Container, TextField, Typography } from "@mui/material";
import React from "react";
import SendIcon from "@mui/icons-material/Send";
import { useState } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function ContactScreen() {
  const [fullName, setFullName] = useState();
  const [phone, setPhone] = useState();
  const [address, setAddress] = useState();
  const [orderId, setOrderId] = useState();
  const [problems, setProblems] = useState();
  const [desire, setDesire] = useState();
  const navigate = useNavigate();
  const handleFullNameChange = (e) => {
    setFullName(e.target.value);
  };
  const handleAddressChange = (e) => {
    setAddress(e.target.value);
  };
  const handlePhoneChange = (e) => {
    setPhone(e.target.value);
  };
  const handleOrderIdChange = (e) => {
    setOrderId(e.target.value);
  };
  const handleProblemChange = (e) => {
    setProblems(e.target.value);
  };
  const handleDesireChange = (e) => {
    setDesire(e.target.value);
  };

  const handleSend = async () => {
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

    await axios
      .post("http://localhost:5000/api/contact", {
        userId: userId,
        fullName: fullName,
        phone: phone,
        OrderId: orderId,
        address: address,
        problem: problems,
        desire: desire,
      })
      .then((result) => {
        toast.success("Đã tạo phiếu hỗ trợ");
        navigate("/support");
      })
      .catch((err) => {
        toast.error("Hãy điền đủ thông tin để có thể tạo phiếu");
      });
  };
  return (
    <Container maxWidth="lg">
      <Box sx={{ margin: "30px 0px" }}>
        <Typography variant="h4">Phiếu hỗ trợ khách hàng</Typography>
      </Box>
      <Box sx={{ margin: "30px 0px" }}>
        <TextField
          value={fullName}
          fullWidth
          label="Tên khách hàng"
          variant="outlined"
          onChange={handleFullNameChange}
        />
      </Box>
      <Box sx={{ margin: "30px 0px" }}>
        <TextField
          value={phone}
          fullWidth
          label="Số điện thoại"
          variant="outlined"
          onChange={handlePhoneChange}
        />
      </Box>
      <Box sx={{ margin: "30px 0px" }}>
        <TextField
          value={address}
          fullWidth
          label="Địa chỉ"
          variant="outlined"
          onChange={handleAddressChange}
        />
      </Box>
      <Box sx={{ margin: "30px 0px" }}>
        <TextField
          value={problems}
          fullWidth
          label="Vấn đề gặp phải"
          variant="outlined"
          onChange={handleProblemChange}
        />
      </Box>
      <Box sx={{ margin: "30px 0px" }}>
        <TextField
          value={orderId}
          fullWidth
          label="ID đơn hàng"
          variant="outlined"
          onChange={handleOrderIdChange}
        />
      </Box>
      <Box sx={{ margin: "30px 0px" }}>
        <TextField
          value={desire}
          multiline
          rows={6}
          fullWidth
          label="Mong muốn"
          variant="outlined"
          onChange={handleDesireChange}
        />
      </Box>
      <Box sx={{ height: 100 }}>
        <Button variant="contained" endIcon={<SendIcon />} onClick={handleSend}>
          Tạo phiếu hỗ trợ
        </Button>
      </Box>
    </Container>
  );
}
