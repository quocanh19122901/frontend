import React from "react";

import {
  BrowserRouter as Router,
  Link,
  Routes,
  Route,
  Outlet,
} from "react-router-dom";
import Home from "../screens/HomeScreen/Home";
import ProductsScreen from "screens/ProductsScreen/Products/components/ProductsScreen";
import Dashboard from "screens/Dashboard/Dashboard";
import ProductDetail from "screens/Dashboard/components/Products/ProductDetail";
import CategoryDetail from "screens/Dashboard/components/Category/TableCategory";
import TableUser from "screens/Dashboard/components/User/TableUser";
import LogInScreen from "screens/LogInScreen/LogInScreen";
import DetailProduct from "screens/DetailProduct/DetailProduct";

export default function RouteWrapper() {
  return (
    // <Router>
    //   <Routes path="/login">
    //     <Route path="/dashboard/*" element={<Dashboard />}>
    //       <Route exact path="home" element={<TableUser />} />
    //       <Route exact path="products" element={<ProductDetail />} />
    //       <Route exact path="Category" element={<CategoryDetail />} />
    //       <Route exact path="charts" />
    //       <Route path="*" element={<Dashboard />} />
    //     </Route>
    //     <Route path="/login" element={<LogInScreen />} />
    //   </Routes>
    // <Home />
    // </Router>
    <Router>
      <Routes>
        {/* <Route path="/" exact element={<Home />} /> */}
        <Route path="/products" element={<ProductsScreen />} />
        <Route path="/products/:id" element={<DetailProduct />} />
      </Routes>
    </Router>
    // <ProductsScreen />
    // <DetailProduct />
  );
}
