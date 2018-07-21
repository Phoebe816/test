import {
	ajax,
	BASEURL
} from '@/utils'
import qs from 'qs'

//提交登录信息
export const submitLoginApi = (url,params = {}) => ajax({
	url:BASEURL + url,
	method:'post',
	data:qs.stringify(params),
	headers:{'Content-Type':'application/x-www-form-urlencoded'}
})

//获取短信验证码
export const getVeriCodeApi = (phone,validPhone) => ajax({
	url:BASEURL + 'code/getSmsCode', 
	params:{
		phoneNum:phone,
		validPhone:validPhone
	}
})

//验证手机号是否存在
export const veriPhoneApi = (phone) => ajax({url:BASEURL + 'user/verifiedPhoneNum', params:{phoneNum:phone}})

//登出api
export const loginOutApi = () => ajax({url:BASEURL + 'loginout'})

//验证手机号是否已注册
export const validPhoneApi = (phone) => ajax({url:BASEURL + 'user/verifiedPhoneNum', params:{phoneNum:phone}})

//根据手机号查找用户信息
export const getUserIdInfosApi = (params = {}) => ajax({url:BASEURL + '/user/getUsers', params:params})

//添加/编辑数据库信息
export const setDatabaseInfoApi = (url,params = {}) => ajax({
	url:BASEURL + url,
	method:'post',
	data:params
})

//删除数据库
export const removeDBApi = (id) => ajax({url:BASEURL + 'deleteRemoteDbInfo/' + id})

//获取数据库列表信息
export const getDatabaseListApi = (params = {}) => ajax({url:BASEURL + 'findRemoteDbinfos',params:params})

//首页统计信息
export const getHomePageDataApi = () => ajax({url:BASEURL + 'user/getHomepageOverview'})

//获取全部通知
export const getAllMessageApi = () => ajax({url:BASEURL + 'findUserMessages'})

//读取通知
export const readMessageApi = (messageId) => ajax({
	url:BASEURL + 'readMessage/' + messageId,
	method:'post'
})