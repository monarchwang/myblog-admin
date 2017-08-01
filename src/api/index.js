/**
 * Created by liang on 2017/8/1.
 */
import axios from 'axios'
const qs = require('querystring');

const ROOT = (process.env.NODE_ENV === 'production') ? 'http://prodcution.env' : 'http://localhost:9090';

// 拦截request,设置全局请求为ajax请求
axios.interceptors.request.use((config) => {
	config.headers['X-Requested-With'] = 'XMLHttpRequest';
	config.headers['token'] = 'I am a token';

	return config;
});

// 拦截响应response，并做一些错误处理
axios.interceptors.response.use((response) => {
	const data = response.data;
	switch (data.code) {
		case 0:
			//正常返回数据
			return data;

		case 1001:
			// 需要重新登录
			location.replace(`/user/login?${search}`)
			break;
		default:
	}

	// 若不是正确的返回code，且已经登录，就抛出错误
	const err = new Error(data.msg);
	err.data = data;
	err.response = response;
	throw err

}, (err) => {
	// 这里是返回状态码不为200时候的错误处理
	if (err && err.response) {
		switch (err.response.status) {
			case 400:
				err.message = '请求错误';
				break;

			case 401:
				err.message = '未授权，请登录';
				break;

			case 403:
				err.message = '拒绝访问';
				break;

			case 404:
				err.message = `请求地址出错: ${err.response.config.url}`;
				break;

			case 408:
				err.message = '请求超时';
				break;

			case 500:
				err.message = '服务器内部错误';
				break;

			case 501:
				err.message = '服务未实现';
				break;

			case 502:
				err.message = '网关错误';
				break;

			case 503:
				err.message = '服务不可用';
				break;

			case 504:
				err.message = '网关超时';
				break;

			case 505:
				err.message = 'HTTP版本不受支持';
				break;

			default:
		}
	}
	return Promise.reject(err)
});



function config() {
	const base = {
		baseURL: ROOT
	};
	if (localStorage.getItem('user') && !base.headers) {
		base.headers = {Authorization: 'Bearer ' + localStorage.getItem('user').replace(/(^\")|(\"$)/g, '')};
	}
	return base
}

export default {
	createTag: function (data) {
		return axios.post('/tag/create', data, config())
	},
	queryTag: function (pageNum, pageSize) {
		return axios.get(`/tag/query?pageNum=${pageNum}&pageSize=${pageSize}`, config())
	}
}