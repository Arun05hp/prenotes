import axios from "axios";
import SecureStorage from "../helper/SecureStorage";
const BASE = process.env.REACT_APP_BASE_URL;

axios.defaults.baseURL = BASE;

axios.interceptors.request.use(
  async (config) => {
    const data = await SecureStorage.getItem("userData");

    if (data) {
      config.headers.Authorization = `PreNotes__20 ${data.token}`;
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
