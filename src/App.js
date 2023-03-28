import React from "react";
import "antd/dist/reset.css";
import "./App.css";
import Dashboard from "./Page/Dashboard";
import { BrowserRouter, Link, Routes, Route, Outlet } from "react-router-dom";
import TableDetail from "./component/Dasboard/TableUser";
import TaskDetail from "./component/Dasboard/TableTasks";

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Dashboard />}>
        <Route path="/home" element={<TableDetail />} />
        <Route path="/videos" />
        <Route path="/uploads" element={<TaskDetail />} />
        <Route path="/charts" />
      </Route>
    </Routes>
  </BrowserRouter>
);

export default App;
