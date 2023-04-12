import React from "react";
import { Container } from "@mui/material";
import ResponsiveAppBar from "../../Home/components/Appbar/ResponsiveAppBar";
import Search from "../../Home/components/Search/Search";
import AllProducts from "./Products/AllProducts";
import FooterCM from "../../Home/components/Footer/FooterCM";

function ProductsPage() {
  return (
    <>
      <ResponsiveAppBar/>
      <Container maxWidth="xl">
        <Search />
        <AllProducts />
        <AllProducts />
      </Container>
      <FooterCM />
    </>
  );
}

export default ProductsPage;
