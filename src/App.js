import React from "react";
import "./App.css";
import Dashboard from "./Page/Dashboard";
import { BrowserRouter as Router, Link, Routes, Route, Outlet } from "react-router-dom";
import TableDetail from "./component/Dasboard/User/TableUser";
import CategoryDetail from "./component/Dasboard/Category/TableCategory";
import Login from "./Page/Login";  
import Main from "./Page/Main";
const App = () => (
  <Router>
    <Routes path="/">
      <Route path="/dashboard/*" element={<Dashboard />}>
        <Route exact path="home" element={<TableDetail />} />
        <Route exact path="videos" />
        <Route exact path="uploads" element={<CategoryDetail />} />
        <Route exact path="charts" />
        <Route path="*" element={<Dashboard />} />
      </Route>
      <Route path="/login" element = {<Login/>}/>
      <Route path="/homePage"></Route>
    </Routes>
  </Router>
  // <Main/>
);

export default App;
