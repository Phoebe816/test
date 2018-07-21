//公共的方法工具文件
import {getVeriCodeApi} from '@/apis'

//通知提示方法
import Vue from 'vue'
import ElementUI from 'element-ui'
Vue.use(ElementUI, {size: 'small'})
const instance = new Vue()
export const message = instance.$message
export const notify = instance.$notify
export const confirm = instance.$confirm

//获取验证码
export const getVeriCode = (vueInstance,formName,phone,validPhone) => {
	vueInstance.$refs[formName].validateField('phoneNum',(validMessage)=>{
		if(validMessage != ""){
			return false;
		}
		//获取短信验证码
		getVeriCodeApi(phone,validPhone).then((res) =>{
			if(res.status === 200){
				let _data = res.data;
				if(_data.success === true){
					vueInstance.$message({
						message:'验证码已发送，请注意查收。',
						type:'success'
					})
				}else{
					vueInstance.$message({
						message:_data.operateMessage,
						type:'error'
					})
				}
			}
		})

		vueInstance.codeDisabled = true;
		let countTime = setInterval(() => {
			--vueInstance.countdown;
			if(vueInstance.countdown == 0){
				clearInterval(countTime);
				vueInstance.countdown = 60;
				vueInstance.codeDisabled = false;
				return;
			}
		},1000);
	})
}

//表格筛选初始化数据过滤方法
export const initFilter = (array,item) => {
	let _obj = {
		text:item,
		value:item
	}
	if(JSON.stringify(array).indexOf(JSON.stringify(_obj)) === -1){
		array.push(_obj)
	}
}
