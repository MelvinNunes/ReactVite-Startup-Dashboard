import { Link, NavLink } from "react-router-dom";
import { links } from "../data/Links.jsx";
import Logo from "../assets/LogoTest.png";
import { useDispatch, useSelector } from "react-redux";
import { FILES_URL } from "../data/Constant";
import { toggleSideBar } from "../reducers/navSlice";

export default function MobileSideBar() {
  const activeLink =
    "flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg transition-all  text-black  text-md m-2";
  const normalLink =
    "flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg transition-all text-md text-gray-200 hover:text-black";

  const seguradora = useSelector((state) => state.seguradora.seguradora);

  const isOpened = useSelector((state) => state.navbar.isOpened);

  const dispatch = useDispatch();

  return (
    <div className="bg-green-500">
      <div className=" pl-3 pt-6 h-screen md:overflow-hidden md:z-50 overflow-auto md:hover:overflow-auto pb-10">
        <div className="flex justify-between items-center transition-all">
          <Link
            to="/"
            onClick={() => dispatch(toggleSideBar(!isOpened))}
            className="items-center justify-center gap-3 ml-3 mt-4 flex text-xl font-extrabold tracking-tight dark:text-black text-slate-900">
            <img
              src={Logo}
              className="w-16"
              alt="logoseguradora"
            />
          </Link>
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
                  onClick={() => dispatch(toggleSideBar(!isOpened))}
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
      </div>
    </div>
  );
}
