import Axios from "./Axios";
const refreshToken = async () => {
  const refresh = JSON.parse(localStorage.getItem("refresh"));
  try {
    const res = await Axios.post("/refresh_token", {
      refresh_token: refresh || null,
    });
    if (res.status === 200) {
      const { access_token, refresh_token } = res.data;

      return { access_token, refresh_token };
    }
  } catch (error) {
    return null;
  }
};

export default refreshToken;
