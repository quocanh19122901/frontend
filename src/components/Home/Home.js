import React from "react";
import ResponsiveAppBar from "./components/Appbar/ResponsiveAppBar";
import Search from "./components/Search/Search";
import Hastag from "./components/Hastag/Hastag";
import NewProduct from "./components/NewProduct/NewProduct";
import Hastag2 from "./components/Hastag/Hastag2";
import AboutUs from "./components/AboutUs/AboutUs";
import PolicyCM from "./components/Policy/PolicyCM";
import NewCategory from "./components/Category/NewCategory";

export default function Home() {
  return (
    <div>
        <Search />
        <NewCategory />
        <Hastag />
        <NewProduct />
        <Hastag2 />
        <AboutUs />
        <PolicyCM />
    </div>
  );
}
