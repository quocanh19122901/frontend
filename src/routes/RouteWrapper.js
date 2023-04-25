import React from "react";

import {
  BrowserRouter as Router,
  Link,
  Routes,
  Route,
  Outlet,
  Navigate,
} from "react-router-dom";
import { routeConfig } from "./routes.config";

export default function RouteWrapper() {
  function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) {
      return parts.pop().split(";").shift();
    }
  }
  const token = getCookie("access_Token");
  return (
    <Router>
      <Routes>
        {routeConfig.map((item, index) => {
          if (!item.private || (item.private && token)) {
            return (
              <Route
                key={index}
                path={item.path}
                element={
                  <item.layout>
                    <item.component />
                  </item.layout>
                }
              />
            );
          } else {
            return (
              <Route
                key={index}
                path={item.path}
                element={
                  <item.layout>
                    <item.component />
                  </item.layout>
                }
              />
            );
          }
        })}
      </Routes>
    </Router>
  );
}
