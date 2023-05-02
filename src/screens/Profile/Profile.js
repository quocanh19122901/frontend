import {
  Box,
  Button,
  ButtonBase,
  Container,
  FormControl,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import { useState } from "react";

export default function Profile() {
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [phone, setPhone] = useState();
  const [address, setAddress] = useState();
  const [note, setNote] = useState();
  const handleAddressChange = (e) => {
    setAddress(e.target.value);
  };

  const handlePhoneChange = (e) => {
    setPhone(e.target.value);
  };

  const handleFirstNameChange = (e) => {
    setFirstName(e.target.value);
  };

  const handleLastNameChange = (e) => {
    setLastName(e.target.value);
  };

  const handleNoteChange = (e) => {
    setNote(e.target.value);
  };
  return (
    <Box>
      <Container
        maxWidth="md"
        sx={{
          minHeight: "650px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-around",
        }}
      >
        <Typography align="left" variant="h5">
          Thông tin cá nhân:
        </Typography>
        <Box>
          <TextField
            fullWidth
            label="Họ"
            variant="standard"
            required
            onChange={handleFirstNameChange}
          />
        </Box>
        <Box>
          <TextField
            fullWidth
            label="Tên"
            variant="standard"
            required
            onChange={handleLastNameChange}
          />
        </Box>
        <Box>
          <TextField
            fullWidth
            label="Địa chỉ người nhận"
            variant="standard"
            required
            onChange={handleAddressChange}
          />
        </Box>
        <Box>
          <TextField
            fullWidth
            label="Số điện thoại"
            variant="standard"
            required
            onChange={handlePhoneChange}
          />
        </Box>

        <Box>
          <TextField
            fullWidth
            label="Email"
            variant="standard"
            required
            onChange={handlePhoneChange}
          />
        </Box>
        <Button
          variant="outlined"
          sx={{ margin: "20px 20px" }}
          //   startIcon={}

          type="submit"
        >
          Hoàn tất
        </Button>
      </Container>
    </Box>
  );
}
