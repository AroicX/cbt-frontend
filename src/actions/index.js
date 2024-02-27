import axios from "axios";
import Toast from "toastr";
import { __deserialize } from "../helpers";

export const api = {
  BASE_URL: "https://payment.schoolmo.app",
};

export const fetcher = axios.create({
  baseURL: "https://cbtexams-api.schoolmo.app/api",
  // baseURL: "http://165.232.152.217/api",

  // timeout: 5000,
  transformResponse: axios.defaults.transformResponse.concat((data) => {
    if (data.status === "error" && data.message === "jwt expired") {
      Toast.error("Token Expired");
      localStorage.removeItem("adminUser");
      localStorage.removeItem("student");
      if (window.location.href.includes("/cbt"))
        return (window.location = "/cbt");
      return window.location = "/"
    }
    if (data.status === "error") {
      Toast.error(data.message);
    }

    return data;
  }),
  validateStatus: function (status) {
    return status >= 200 && status < 400;
  },
});

fetcher.interceptors.request.use(
  function (config) {
    config.headers = {
      ...config.headers,
    };
    config.headers.Accept = "application/json";
    config.headers["Content-Type"] = "application/json";
    config.headers["Access-Control-Allow-Origin"] = "*";
    let checkUser = __deserialize("adminUser");
    let student = __deserialize("student");
    if (checkUser) {
      config.headers["Authorization"] = `${checkUser.token}`;
    }
    if (student) {
      config.headers["Authorization"] = `${student.token}`;
    }

    // you can also do other modification in config

    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);
