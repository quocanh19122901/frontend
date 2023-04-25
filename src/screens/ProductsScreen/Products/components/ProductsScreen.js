import React from "react";
import { Box, Container } from "@mui/material";
import AllProducts from "./Products/AllProducts";
import SearchBar from "components/SearchBar/SearchBar";
import ResponsiveAppBar from "components/Header/components/Appbar/ResponsiveAppBar";
import FooterCM from "components/Footer/Footer/FooterCM";

function ProductsScreen() {
  return (
    <Box>
      <AllProducts />
    </Box>
  );
}

export default ProductsScreen;
