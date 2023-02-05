import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { MdOutlineCancel } from "react-icons/md";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";
import { links } from "../data/Links";
import { useStateContext } from "../contexts/ContextProvider";
import Logo from "../assets/LogoTest.png";
import { BASE_URL, error_server_side } from "../data/Constant";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";

const Sidebar = () => {
  const { currentColor, activeMenu, setActiveMenu, screenSize } =
    useStateContext();

  const handleCloseSideBar = () => {
    if (activeMenu !== undefined && screenSize <= 900) {
      setActiveMenu(false);
    }
  };

  const [seguradora, setSeguradora] = useState([])

  const navigate = useNavigate()

  const getUserSeguradora = () => {
    axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${localStorage.getItem("access_token")}`;

    axios.get(`${BASE_URL}/seguradoras/check-employement`).then((res) => {
      setSeguradora(res.data.data)
    }).catch((err) => {
      // if (err.request.status === 401) {
      //   error_server_side("A sua sessão expirou.")
      //   navigate("/")
      // }
    })
  }

  useEffect(() => {
    getUserSeguradora()
  }, [])

  const activeLink =
    "flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg transition-all  text-black  text-md m-2";
  const normalLink =
    "flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg transition-all text-md text-gray-200 hover:text-black hover:bg-white";

  return (
    <div
      style={
        activeMenu
          ? { backgroundColor: 'rgb(14 159 110)' }
          : { backgroundColor: "white", display: "hidden" }
      }
      className="relative z-0 px-3 h-screen shadow-md md:overflow-hidden overflow-auto md:hover:overflow-auto pb-10">
      {activeMenu && (
        <>
          <div className="flex justify-between items-center transition-all">
            <Link
              to="/kula"
              className="w-full">
              <div className="flex items-center justify-center mt-4 text-xl font-extrabold tracking-tight dark:text-black text-slate-900">
                <img
                  src={Logo}
                  className="w-36"
                  alt="logoseguradora"
                />

              </div>
            </Link>
            <TooltipComponent content="Menu" position="BottomCenter">
              <button
                type="button"
                onClick={() => setActiveMenu(!activeMenu)}
                style={{ color: "white" }}
                className="text-xl rounded-full p-3 hover:bg-light-gray mt-4 block md:hidden">
                <MdOutlineCancel />
              </button>
            </TooltipComponent>
          </div>
          <div className="mt-10 ">
            {links.map((item) => (
              <div key={item.title}>
                <p className="text-white m-3 mt-4 uppercase">{item.title}</p>
                {item.links.map((link) => (
                  <NavLink
                    to={`/app/${link.name
                      .replace("ç", "c")
                      .replace("õ", "o")
                      .replace("ú", "u")}`}
                    key={link.name}
                    onClick={handleCloseSideBar}
                    style={({ isActive }) => ({
                      backgroundColor: isActive ? "white" : "",
                    })}
                    className={({ isActive }) =>
                      isActive ? activeLink : normalLink
                    }>
                    {link.icon}
                    <span className="capitalize ">{link.name}</span>
                  </NavLink>
                ))}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Sidebar;
