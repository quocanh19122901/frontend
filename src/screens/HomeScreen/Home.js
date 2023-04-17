import React from "react";
import ResponsiveAppBar from "../../components/Header/components/Appbar/ResponsiveAppBar";
import Hastag from "./components/Hastag/Hastag";
import NewProduct from "./components/NewProduct/NewProduct";
import Hastag2 from "./components/Hastag/Hastag2";
import AboutUs from "./components/AboutUs/AboutUs";
import PolicyCM from "./components/Policy/PolicyCM";
import NewCategory from "./components/Category/NewCategory";
import SlideImage from "./components/Carousel/SlideImage";
import FooterCM from "../../components/Footer/Footer/FooterCM";
import SearchBar from "../../components/SearchBar/SearchBar";
function Home() {
  return (
    <>
      <SlideImage />
      <SearchBar />
      <NewCategory />
      <Hastag />
      <NewProduct />
      <Hastag2 />
      <AboutUs />
      <PolicyCM />
    </>
  );
}

export default Home;
