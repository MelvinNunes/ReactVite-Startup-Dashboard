import { toast } from "react-toastify";

const online_host = "https://segurosdataset.onrender.com/api";

const files_online_host = "https://segurosdataset.onrender.com";

const offline_host = "http://localhost:8000/api";

const offline_files = "http://localhost:8000";

export const BASE_URL = offline_host;

export const FILES_URL = offline_files;

export const error_server_side = (message) =>
  toast.error(message, {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });

export const error_client_side = (message) =>
  toast.error(message, {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });

export const success_server_side = (message) =>
  toast.success(message, {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });
