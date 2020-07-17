import axios from "axios";
import { Notify, Toast } from "vant";
import encryptUtil from '@/utils/aesCrypto';
const service = axios.create({
  baseURL: getBaseUrl(), // url = base url + request url
  withCredentials: true, // send cookies when cross-domain requests
  timeout: 60000, // request timeout
});

// request
service.interceptors.request.use(
  (config) => {
    config.headers["x-requested-with"] = "XMLHttpRequest";
    if (process.env.NODE_ENV === "development") {
      //走网关
      // config.headers['X-Origin-maniujk'] = "maniujk-app";
      // config.headers['token'] = "dcbee512-df21-479e-b431-8f4a23064ede";

      //不走网关
      config.headers["X-Origin"] = "GATEWAY_APP";
      config.headers["userInfo"] =
        "eyJhdmF0YXIiOm51bGwsIm1vYmlsZSI6IjE1NzY1NTYwNjg0Iiwibmlja05hbWUiOiIxNTcqKioqMDY4NCIsImlkZW50aWZ5U3RhdHVzIjpudWxsLCJ1c2VySWQiOiI2OTIzMjQwNDk5OTI0MjEzNzYiLCJsb2dpbkNoYW5uZWwiOiJtYW5pdWprLWNoYW5uZWwtY29uc3VtZXItYXBwIn0KIA==";
    }

    let code = getCode();
    code && (config.headers["oauth-code"] = code);

    Toast.loading({
      message: "加载中...",
      forbidClick: true,
      duration: 0,
    });

    return config;
  },
  (error) => {
    Toast.clear();
    return Promise.reject(error);
  }
);

// response
service.interceptors.response.use(
  (response) => {
    Toast.clear();
    if (response.data.code && response.data.code !== 200) {
      if (response.data.message) {
        Notify({
          type: "warning",
          message: JSON.stringify(response.data.message),
        });
      } else {
        Notify({ type: "warning", message: JSON.stringify(response.data) });
      }
      return Promise.reject(response.data);
    }
    if (response.data.code == 200) {
      // TODO: 解密 引入加解密模块后开启注释
      if (process.env.VUE_APP_ENCRYPT === "true") {
        response = encryptUtil.encryptResponse(response);
        console.log("解密：", response.data);
      }
    }

    return response.data;
  },
  (error) => {
    Toast.clear();

    var redirect = error.response.headers.redirect;
    if (redirect === "REDIRECT") {
      console.log("error", error.response.headers);
      window.location.replace(error.response.headers.contextpath);
    }

    return Promise.reject(error);
  }
);

// 如果存在code参数，return code对应的值
function getCode() {
  return (
    decodeURIComponent(
      (new RegExp("[?|&]" + "code" + "=" + "([^&;]+?)(&|#|;|$)").exec(
        location
      ) || [, ""])[1].replace(/\+/g, "%20")
    ) || null
  );
}

// 获取baseUrl
function getBaseUrl() {
  if (process.env.NODE_ENV !== "development") {
    //return "/";
    return "/app-gateway";
  } else {
    return "/proxy";
    //return "";
  }
}

export default service;
