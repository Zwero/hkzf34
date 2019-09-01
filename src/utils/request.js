import Axios from "axios";
import { REACT_APP_API_URL } from "./urls";

// 1 创建 axios 实例 
export let axios = Axios.create({
  baseURL: REACT_APP_API_URL
})

// 2 axios 的响应拦截器 
axios.interceptors.response.use(function (response) {
  // return 了什么 回去 那么   在其他的请求成功的 then中的res 就是什么 
  return response.data;  
}, function (error) {
  return Promise.reject(error);
});
