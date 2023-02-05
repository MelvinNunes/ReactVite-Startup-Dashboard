import React, { useEffect } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { MdKeyboardArrowDown } from "react-icons/md";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";
import { useStateContext } from "../contexts/ContextProvider";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import jwt from "jwt-decode";
import Moment from "moment";
import { BASE_URL } from "../data/Constant";
import { useState } from "react";
import SideDrawer from "./Kula-Components/SideDrawer";
import MobileSideBar from "./MobileSideBar";
import { add } from "../reducers/userSlice";

const NavButton = ({ title, customFunc, icon, color, dotColor }) => (
  <TooltipComponent content={title} position="BottomCenter">
    <button
      type="button"
      style={{ color }}
      className="relative text-xl rounded-full p-3 hover:bg-light-gray">
      <span
        style={{ background: dotColor }}
        className="absolute inline-flex rounded-full h-2 w-2 right-2 top-2"
      />
      {icon}
    </button>
  </TooltipComponent>
);

const Navbar = () => {
  const {
    currentColor,
    activeMenu,
    setActiveMenu,
    handleClick,
    isClicked,
    setScreenSize,
    screenSize,
  } = useStateContext();

  const [user, setUser] = useState([]);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const setDefaultHeaders = () => {
    const token = localStorage.getItem("access_token");
  };

  const getMyUserData = () => {
    axios
      .get(`${BASE_URL}/auth/me`)
      .then((res) => {
        setUser(res.data.data);
        dispatch(add(res.data.data))
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getMyUserData();
  }, []);

  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);
    window.addEventListener("resize", handleResize);
    handleResize();
    setDefaultHeaders();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (screenSize <= 900) {
      setActiveMenu(false);
    } else {
      setActiveMenu(true);
    }
  }, [screenSize]);

  return (
    <div className="flex w-full justify-between md:justify-end bg-white p-2  relative">
      <div className="flex md:hidden">
        <SideDrawer
          opener={
            <NavButton title="Menu" color={"black"} icon={<AiOutlineMenu />} />
          }
          content={<MobileSideBar />}
        />
      </div>
      <div className="flex">
        <div className="flex gap-2 items-center mt-1 mx-2 cursor-pointer">
          <p>
            <span className="text-balck text-14">Olá,</span>{" "}
            <span
              className="font-bold ml-1 text-kula_primary">
              {user?.first_name || "Usúario"}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
