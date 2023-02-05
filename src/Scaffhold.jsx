import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { FiSettings } from "react-icons/fi";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";
import "./App.css";

import { Navbar, Footer, Sidebar } from "./components";

import "./App.css";

import { useStateContext } from "./contexts/ContextProvider";
import axios from "axios";

export function Scaffhold() {
  const {
    setCurrentColor,
    setCurrentMode,
    currentMode,
    activeMenu,
    currentColor,
    themeSettings,
    setThemeSettings,
  } = useStateContext();

  const [loading, isLoading] = useState(false);

  axios.interceptors.request.use(
    (config) => {
      isLoading(true);
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  useEffect(() => {
    const currentThemeColor = localStorage.getItem("colorMode");
    const currentThemeMode = localStorage.getItem("themeMode");
    if (currentThemeColor && currentThemeMode) {
      setCurrentColor(currentThemeColor);
      setCurrentMode(currentThemeMode);
    }
  }, []);

  return (
    <div>
      <div className="flex relative dark:bg-main-dark-bg">
        {activeMenu ? (
          <div
            style={{ zIndex: 3000 }}
            className="w-72 fixed sidebar dark:bg-secondary-dark-bg bg-white ">
            <Sidebar />
          </div>
        ) : (
          <div
            style={{ zIndex: 3000 }}
            className="w-0 hidden dark:bg-secondary-dark-bg">
            <Sidebar />
          </div>
        )}
        <div
          className={
            activeMenu
              ? "dark:bg-main-dark-bg  bg-main-bg min-h-screen md:ml-72 w-full overflow-hidden "
              : "bg-main-bg dark:bg-main-dark-bg  w-full min-h-screen flex-2 "
          }>
          <div
            style={{ zIndex: 2000 }}
            className="fixed md:static bg-main-bg dark:bg-main-dark-bg navbar w-full ">
            <Navbar />
          </div>
          <div className="overflow-x-hidden">
            <Outlet />
          </div>
          <Footer />
        </div>
      </div>
    </div>
  );
}
