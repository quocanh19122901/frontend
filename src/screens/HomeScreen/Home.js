import React from "react";
import ResponsiveAppBar from "../../components/Header/components/Appbar/ResponsiveAppBar";
import Hastag from "./components/Hastag/Hastag";
import NewProduct from "./components/NewProduct/NewProduct";
import Hastag2 from "./components/Hastag/Hastag2";
import AboutUs from "./components/AboutUs/AboutUs";
import PolicyCM from "./components/Policy/PolicyCM";
import NewCategory from "./components/Category/NewCategory";
import SlideImage from "./components/Carousel/SlideImage";
import SearchBar from "../../components/SearchBar/SearchBar";
import { Box } from "@mui/material";
function Home() {
  return (
    <Box>
      <SlideImage />
      <SearchBar />
      <NewCategory />
      <Hastag />
      <NewProduct />
      <Hastag2 />
      <AboutUs />
      <PolicyCM />
    </Box>
  );
}

export default Home;
