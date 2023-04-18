import React from "react";

import {
  BrowserRouter as Router,
  Link,
  Routes,
  Route,
  Outlet,
} from "react-router-dom";
import { routeConfig } from "./routes.config";

export default function RouteWrapper() {
  return (
    <Router>
      <Routes>
        {routeConfig.map((item, index) => {
          if (!item.private) {
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
          if (item.isAdmin) {
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
                element={<item.component />}
              />
            );
          }
        })}
      </Routes>
    </Router>
  );
}
