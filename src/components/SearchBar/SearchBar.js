import React from "react";
import TextField from "@mui/material/TextField";
import "./SearchBar.css";
import { Box } from "@mui/material";

function SearchBar() {
  return (
    <Box className="searchDiv">
      <TextField
        className="inputRounded"
        id="outlined-basic"
        label="Search"
        variant="outlined"
      />
    </Box>
  );
}

export default SearchBar;
