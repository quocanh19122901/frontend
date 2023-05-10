import React from "react";
import TextField from "@mui/material/TextField";
import "./SearchBar.css";
import { Box, Button, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
function SearchBar({ searchTerm, setSearchTerm, handleSearch }) {
  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };
  return (
    <Box className="searchDiv">
      <TextField
        className="inputRounded"
        id="outlined-basic"
        label="Tìm kiếm sản phẩm"
        variant="outlined"
        value={searchTerm}
        onChange={handleChange}
        InputProps={{
          endAdornment: (
            <InputAdornment position="start">
              <SearchIcon onClick={handleSearch} sx={{ cursor: "pointer" }} />
            </InputAdornment>
          ),
        }}
      />
    </Box>
  );
}

export default SearchBar;
