import React from "react";
import { Container } from "@mui/material";
import AllProducts from "./Products/AllProducts";
import SearchBar from "components/SearchBar/SearchBar";
import ResponsiveAppBar from "components/Header/components/Appbar/ResponsiveAppBar";
import FooterCM from "components/Footer/Footer/FooterCM";

function ProductsScreen() {
  return (
    <>
      <Container maxWidth="xl">
        <AllProducts />
      </Container>
    </>
  );
}

export default ProductsScreen;
