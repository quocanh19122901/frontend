import React from "react";


import {
  BrowserRouter as Router,
  Link,
  Routes,
  Route,
  Outlet,
} from "react-router-dom";

export default function RouteWapper() {
  return (
    <Router>
    <Routes path="/">
      {/* <Route path="/dashboard/*" element={<Dashboard />}>
        <Route exact path="home" element={<TableDetail />} />
        <Route exact path="products" element= {<ProductDetail />} />
        <Route exact path="Category" element={<CategoryDetail />} />
        <Route exact path="charts" />
        <Route path="*" element={<Dashboard />} />
      </Route>
      <Route path="/login" element = {<Login/>}/> */}
    </Routes>
  </Router>

  )
}
