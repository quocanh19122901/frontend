import React from "react";
import TextField from "@mui/material/TextField";
import "./Search.css";

function Search() {
  return (
    <div className="searchDiv">
      <TextField
        className="inputRounded"
        id="outlined-basic"
        label="Search"
        variant="outlined"
      />
    </div>
  );
}

export default Search;
