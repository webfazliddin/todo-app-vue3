import type { AxiosError } from "axios";
import axios from "axios";

axios.defaults.baseURL = "https://jsonplaceholder.typicode.com";

axios.defaults.headers.Accept = "application/json";
axios.defaults.headers["Content-Type"] = "application/json";
axios.defaults.withCredentials = true;

axios.interceptors.response.use(
  (config) => config,
  (error: AxiosError) => {
    if (error) return error;
  }
);

export default axios;
