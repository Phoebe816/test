/**
 * 校验规则文件
 * 触发方式：type=['blur','change']
 */
//定义phone验证全局变量
const validPhone = (rule, value, callback) => {
	const reg = /^1[3|4|5|7|8][0-9]\d{8}$/;
	if (!value){
	  	callback(new Error('请输入电话号码'))
	}else  if (!reg.test(value)){
		callback(new Error('请输入正确的11位手机号码'))
	}else {
	  	callback()
	}
}
//定义password验证
const validPassword = (rule, value, callback) => {
	const reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,10}$/;
	if (!value){
	  	callback(new Error('请输入密码'))
	}else  if (!reg.test(value)){
		callback(new Error('密码格式不正确'))
	}else {
	  	callback()
	}
}
//定义只能输入数字
const validNumber = (rule,value,callback) => {
	const reg = /^[0-9]*$/
	if(!value){
		callback(new Error('必填项'))
	}else if(!reg.test(value)){
		callback(new Error('只能输入数字'))
	}else{
		callback()
	}
}
//验证方法
export const validCallback = (instance,formName,callback) => {
	instance.$refs[formName].validate(valid => {
		if(valid){
			callback()
		}
	})
}
//验证规则
export const validator = {
	required:{
		required:true,
		message:'必填项',
		trigger:['blur','change']
	},
	email:{
		type:'email',
		message:'请输入正确的邮箱',
		trigger:['blur','change']
	},
	phoneNum:{
		required:true,
		validator:validPhone,
		trigger:['blur','change']
	},
	password:{
		required:true,
		validator:validPassword,
		trigger:['blur','change']
	},
	number:{
		required:true,
		validator:validNumber,
		trigger:['blur','change']
	}
}