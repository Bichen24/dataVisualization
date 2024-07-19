import axios from "axios";
const request = axios.create({
  baseURL: "/api",
  timeout: 5000,
});
request.interceptors.request.use((config) => {
  config.headers.icode = "helloqianduanxunlianying";
  return config;
});

request.interceptors.response.use((response) => {
  const { success, message, data } = response.data;
  if (success) {
    return data;
  } else {
    return Promise.reject(new Error(message));
  }
});
export default request;
