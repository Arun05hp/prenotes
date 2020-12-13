import axios from "axios";

const BASE = process.env.REACT_APP_BASE_URL;

axios.defaults.baseURL = BASE;
// axios.defaults.headers.post["Content-Type"] = "application/json";
// axios.interceptors.response.use(null, (error) => {
//   const expectedError =
//     error.response &&
//     error.response.status >= 400 &&
//     error.response.status < 500;
//   if (!expectedError) {
//     logger.log(error);
//     toast.error("An unexpected error occurred");
//   }
//   return Promise.reject(error);
// });
axios.interceptors.request.use(
  async (config) => {
    const token = await sessionStorage.getItem("preNotest");

    if (token) {
      config.headers.Authorization = `Pre@Notes20 ${token}`;
    }
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
};
