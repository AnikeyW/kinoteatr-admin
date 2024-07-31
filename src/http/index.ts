import axios from "axios";

const $api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SERVER_URL_API,
  withCredentials: true,
});

$api.interceptors.response.use(
  (config) => {
    return config;
  },
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status == 401 && error.config && !error.config._retry) {
      originalRequest._retry = true;
      try {
        await axios.get<any>(
          process.env.NEXT_PUBLIC_SERVER_URL_API + "auth/refresh",
          {
            withCredentials: true,
          },
        );
        $api.request(originalRequest);
      } catch (e) {
        console.log("Не авторизован");
      }
    }
    throw error;
  },
);

export default $api;
