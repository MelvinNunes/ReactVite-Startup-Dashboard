import axios from "axios";
import { useEffect } from "react";
import { BASE_URL, error_client_side } from "../data/Constant";
import { Formik } from "formik";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import jwt from "jwt-decode";
import { add } from "../reducers/userSlice";
import { Button } from "@mantine/core";
import Moment from "moment";
import * as Yup from "yup";
import "react-toastify/dist/ReactToastify.css";
import { error_server_side } from "../data/Constant";
import LoginImage from "../assets/login-image.svg";
import { Helmet } from "react-helmet";

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const loginSchema = Yup.object().shape({
    username: Yup.string().required(
      "O nome de usúario é um campo obrigatório!"
    ),
    password: Yup.string()
      .min(5, "A password deve ter no minímo 5 digitos!")
      .required("A password é um campo obrigatório!"),
  });

  const login = async (data, isSubmitting) => {
    axios
      .post(`${BASE_URL}/auth/login`, {
        username: data.username,
        password: data.password,
      })
      .then(async (res) => {
        isSubmitting(false);
        const access_token = res.data.access;
        localStorage.setItem("access_token", access_token);
        const user = jwt(access_token);

        const roles = user.roles;
        var role_admin = false;

        for (let i = 0; i < roles.length; i++) {
          if (roles[i].name == 'seguradora_admin' || roles[i].name == 'delegacao_admin') {
            role_admin = true;
            dispatch(add(user));
            if (data.remember) {
              const refresh_token = res.data.refresh;
              localStorage.setItem("refresh_token", refresh_token);
            }
            navigate("/kula");
          }
        }
        if (role_admin == false) {
          error_client_side("Não possui o acesso a essa plataforma.")
        }

      })
      .catch((err) => {
        isSubmitting(false);
        if (err.code === "ERR_NETWORK") {
          error_server_side("Não está conectado a internet!");
        }
        if (err.response.status == 401) {
          error_server_side("Verifique as suas credênciais!");
        } else {
          error_server_side("Erro interno no servidor!");
        }
      });
  };


  return (
    <div className="flex w-full justify-center md:px-80 md:py-10">
      <Helmet>
        <title>Kula | Login</title>
      </Helmet>
      <div>
        <div className="flex w-full justify-center items-center grow-0 shrink-1 md:shrink-0 basis-auto">
          <img className="w-60 mx-5 px-10" src={LoginImage} alt="login-image" />
        </div>
        <div className="w-full">
          {/* Login Form */}
          <Formik
            initialValues={{ username: "", password: "", remember: false }}
            validationSchema={loginSchema}
            onSubmit={(values, { setSubmitting }) => {
              login(values, setSubmitting);
            }}>
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting,
            }) => (
              <form onSubmit={handleSubmit}>
                <div className="flex items-center my-4 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5">
                  <p className="text-center font-semibold mx-4 mb-0">Entrar</p>
                </div>
                {/* Email */}
                <div className="mb-6">
                  <input
                    type="text"
                    name="username"
                    className={errors.username && touched.username ? "md:w-96 w-full px-4 py-2 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-red-700 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:outline-none" : "md:w-96 w-full px-4 py-2 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:outline-none"}
                    placeholder="Nome de Usúario"
                    value={values.username}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.username && touched.username && (
                    <p className="text-red-700 my-2">{errors.username}</p>
                  )}
                </div>

                {/* Password */}
                <div className="mb-6">
                  <input
                    type="password"
                    name="password"
                    className={errors.password && touched.password ? "md:w-96 w-full px-4 py-2 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-red-700 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:outline-none" : "md:w-96 w-full px-4 py-2 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:outline-none"}
                    placeholder="Password"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.password && touched.password && (
                    <p className="text-red-700 my-2">{errors.password}</p>
                  )}
                </div>
                {/* <div className="flex flex-col md:flex-row gap-2 justify-between items-center mb-5">
                  <div className="form-group form-check">
                    <input
                      type="checkbox"
                      className="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                      id="lembrar"
                      name="lembrar"
                    />
                    <label
                      className="form-check-label inline-block text-gray-800"
                      for="lembrar">
                      Lembrar-me
                    </label>
                  </div>
                  <a href="#!" className="text-red-500 hover:underline hover:text-red-600 transition-all">
                    Esqueceu a password?
                  </a>
                </div> */}
                <div className="text-center lg:text-left">
                  <LoginButton isSubmitting={isSubmitting} errors={errors} />
                </div>
              </form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
}

function LoginButton({ isSubmitting, errors }) {
  return (
    <Button
      className="px-7 py-3 w-full bg-kula_primary text-white  uppercase rounded shadow-md hover:bg-green-700 hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
      type={"submit"}
      loading={isSubmitting ? true : false}
      disabled={Object.keys(errors).length !== 0 ? true : false}>
      Entrar
    </Button>
  );
}
