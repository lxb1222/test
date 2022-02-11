import axios from "axios";
import store from "../store";
import router from "../router";
// 创建axios实例

// const baseUrl = "http://172.16.30.158:6005/open/";

const service = axios.create({
	baseURL: process.env.VUE_APP_URL, // api 的 VUE_APP_URL
	// baseUrl: baseUrl,
	timeout: 5000, // 请求超时时间
});

// request拦截器,在请求之前做一些处理
service.interceptors.request.use(
	(config) => {
		let token = window.localStorage.getItem("TOKEN_INDEX-V3-FIRST-newmedia")
			? window.localStorage.getItem("TOKEN_INDEX-V3-FIRST-newmedia")
			: "";
		config.headers["author-token-key-cms"] = token || "";
		return config;
	},
	(error) => {
		console.log(error);
		Promise.reject(error);
	}
);

// response 拦截器,数据返回后进行一些处理
service.interceptors.response.use;
(response) => {},
	(error) => {
		Promise.reject("网络异常");
	};
export default service;
