import axios from "axios";
import refreshToken from "./refreshToken";
import jwtDecode from "jwt-decode";
import Axios from "./Axios";
const Auth = axios.create({
  baseURL: "http://localhost:5000",
  timeout: 5000,
  withCredentials: true,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization:
      typeof window !== "undefined" &&
      JSON.parse(localStorage.getItem("access"))
        ? "JWT " + JSON.parse(localStorage.getItem("access"))
        : null,
  },
});

Auth.interceptors.request.use(
  async (req) => {
    const access = JSON.parse(localStorage.getItem("access"));

    await Axios.get("/token_verify", {
      headers: {
        Authorization: access ? "JWT " + access : null,
      },
    })
      .then(() => {
        return req;
      })
      .catch(async (err) => {
        if (err?.response?.status === 401) {
          const token = await refreshToken();
          console.log("unauthorized");
          if (token) {
            console.log("access");
            localStorage.setItem("access", JSON.stringify(token.access_token));
            localStorage.setItem(
              "refresh",
              JSON.stringify(token.refresh_token)
            );
            console.log(token.access_token);
            req.headers.Authorization = "JWT " + token.access_token;
          }
        }
        console.log(err);
      });

    return req;
  },
  (err) => {
    return err;
  }
);

export default Auth;
