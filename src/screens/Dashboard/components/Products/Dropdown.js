import React, { useState, useEffect } from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function CustomDropdown() {
  const [data, setData] = useState([]);
  const [category, setCategory] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/category")
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error(error);
      });    
  }, []);

  const handleSelectChange = (event) => {
    setCategory(event.target.value);
  };
 
  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-select-label">Select an option</InputLabel>
        <Select
          labelId="demo-select-label"
          id="demo-select"
          value={category}
          label="Select an option"
          onChange={handleSelectChange}
        >
          {data.map((item) => (
            <MenuItem key={item._id} value={item.CategoryName}>
              {item.CategoryName}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}
