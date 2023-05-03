import axios from "axios";
const Axios = axios.create({
  baseURL: "http://localhost:5000",
  timeout: 5000,
  withCredentials: true,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

export default Axios;
