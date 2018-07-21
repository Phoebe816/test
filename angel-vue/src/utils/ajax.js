//公共的axios文件
import axios from 'axios'
import router from '@/router'
import {message} from '@/utils'

export const BASEURL = '/api/'

export function ajax(options){
	debugger
	let config = {
		url:options.url,
		method:options.method || 'get',
		params:options.params || {},
		data:options.data || {},
		headers:options.headers || {}
	}
	axios.interceptors.response.use((response) => {     //拦截器
	    if (response.data.errorCode === '401') {
	      	router.push('/login')
	      	message({
				message:'会话失效，请重新登陆',
				type:'error'
			})
	      	return response
	    } else {
	      	return response
	    }
	}, (error) => {
    	return Promise.reject(error)
  	})
	return axios(config).catch((e) => {
		if(!e.response){
			router.push('/login')
			message({
				message:'会话失效，请重新登陆',
				type:'error'
			})
		}else{
			if(e.response.status === 504){
				message({
					message:"网关超时",
					type:'error'
				})
			}else{
				message({
					message:e.response.data.msg,
					type:'error'
				})
			}
		}
	})
}