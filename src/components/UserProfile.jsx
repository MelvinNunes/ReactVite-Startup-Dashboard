import React from "react";

import { Button } from ".";
import { useStateContext } from "../contexts/ContextProvider";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../data/Constant";
import { useState } from "react";
import { useEffect } from "react";
import { Skeleton } from "@mantine/core";
import { useDispatch } from "react-redux";
import { remove } from "../reducers/userSlice";

const UserProfile = () => {
  const { currentColor } = useStateContext();

  const [user, setUser] = useState([]);

  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const logout = () => {
    localStorage.clear();
    dispatch(remove());
    const jwt = localStorage.getItem('access_token');
    axios.post(`${BASE_URL}/auth/logout`, { token: jwt }).then((res) => {
      navigate("/");
    }).catch((err) => {
      console.log(err)
    })
  };

  const getMyUserData = () => {
    axios
      .get(`${BASE_URL}/auth/me`)
      .then((res) => {
        setUser(res.data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getMyUserData();
  }, []);

  return (
    <div className="nav-item absolute right-1 md:right-0 top-0 bg-white shadow-md p-8 rounded-lg w-96">
      <div className="flex justify-between items-center">
        <p className="font-semibold text-lg dark:text-gray-200">
          Perfil do Utilizador
        </p>
      </div>
      <div className="flex gap-5 items-center mt-6 border-color border-b-1 pb-6">
        {loading ? (
          <Skeleton height={90} circle mb="xl" />
        ) : (
          // <img
          //   className="rounded-full h-24 w-24"
          //   src={user?.avatar ? `${FILES_URL}${user?.avatar}` : avatar}
          //   alt="user-profile"
          // />
          // )}
          <p>Tezt</p>
        )}
        <div>
          {loading ? (
            <Skeleton height={8} mt={6} radius="xl" />
          ) : (
            <p className="font-semibold text-xl ">
              {`${user?.first_name || "NOME"} ${user?.last_name || "APELIDO"}`}
            </p>
          )}
          {loading ? (
            <Skeleton height={8} mt={6} radius="xl" />
          ) : (
            <p className="text-gray-500 text-sm font-semibold ">
              {user?.email}
            </p>
          )}
        </div>
      </div>
      {/* <div onClick={() => navigate("/app/usuario")}>
        {userProfileData.map((item, index) => (
          <div
            key={index}
            className="flex gap-5 border-b-1 border-color p-4 hover:bg-light-gray cursor-pointer  ">
            <button
              type="button"
              style={{ color: item.iconColor, backgroundColor: item.iconBg }}
              className=" text-xl rounded-lg p-3 hover:bg-light-gray">
              {item.icon}
            </button>
            <div>
              <p className="font-semibold ">{item.title}</p>
              <p className="text-gray-500 text-sm "> {item.desc} </p>
            </div>
          </div>
        ))}
      </div> */}
      <div onClick={logout} className="mt-5">
        <Button
          color="white"
          bgColor={currentColor}
          text="Sair"
          borderRadius="10px"
          width="full"
        />
      </div>
    </div>
  );
};

export default UserProfile;
