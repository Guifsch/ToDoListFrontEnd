import axios from "axios";
import { useDispatch } from "react-redux";
import { signOut } from "../redux/user/userSlice";
import { snackBarMessageError } from "../redux/snackbar/snackBarSlice";

export const useAxiosConfig = () => {
  const dispatch = useDispatch();

  // Definindo a URL base com base na variável de ambiente
  const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:4000/";

  const axiosClient = axios.create({
    baseURL,
    timeout: 30000,
    headers: {
      "Content-Type": "application/json",
    },
  });

  axiosClient.interceptors.request.use(
    (config) => {
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  axiosClient.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (!error.response) {
        dispatch(
          snackBarMessageError("Ops, ocorreu um erro, verifique sua conexão!")
        );
        dispatch(signOut());
      } else if (
        error.response.statusText === "Unauthorized" ||
        error.response.statusText === "Not Found" ||
        error.response.data.error === "Você não está autentificado!"
      ) {
        dispatch(signOut());
      }
      return Promise.reject(error);
    }
  );

  return axiosClient;
};
