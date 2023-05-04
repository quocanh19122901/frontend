import React from "react";
import TextField from "@mui/material/TextField";
import "./SearchBar.css";
import { Box, Button } from "@mui/material";
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
        label="Search"
        variant="outlined"
        value={searchTerm}
        onChange={handleChange}
      />
      <Button onClick={handleSearch}>
        <SearchIcon />
      </Button>
    </Box>
  );
}

export default SearchBar;
