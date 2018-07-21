<template>
	<el-card class="register-card vertical-horizontal">
		<div slot="header" class="text-center">重置密码</div>
		<el-form
			ref="resetPassword"
			:model="resetPassword"
			:rules="rules"
			status-icon>
			<el-form-item prop="phoneNum">
				<el-input v-model="resetPassword.phoneNum" placeholder="请输入手机号"></el-input>
			</el-form-item>
			<el-form-item prop="smsCode" :rules="rules.required">
				<el-input v-model="resetPassword.smsCode" class="code-input" placeholder="验证码"></el-input>
				<el-button @click="getCode" :disabled="codeDisabled">{{countdown == 60 ? '免费获取验证码' : '重新发送(' + countdown + ')'}}</el-button>
			</el-form-item>
			<el-form-item prop="password">
				<el-input type="password" v-model="resetPassword.password" placeholder="设置密码"></el-input>
				<small>必须包含字母和数字，长度至少为 6 位</small>
			</el-form-item>
			<el-form-item prop="repeatPassword" :rules="{validator:valPwd,trigger:['blur','change']}">
				<el-input type="password" v-model="resetPassword.repeatPassword" placeholder="重复密码"></el-input>
			</el-form-item>
			<el-form-item>
				<router-link :to="{path:'/login'}">放弃</router-link>
				<el-button type="primary" @click="onSubmit('resetPassword')">重置密码</el-button>
			</el-form-item>
		</el-form>
		<hr>
		<p class="text-center">您也可以选择手机验证码登录，点击 <router-link :to="{path:'/login'}">登录</router-link></p>
	</el-card>
</template>
<script type="ecmascript-6">
import {validator,getVeriCode} from '@/utils'
import {submitLoginApi} from '@/apis'
export default {
	name:'resetPassword',
	data(){
		return {
			resetPassword:{},
			rules:validator,
			codeDisabled:false,
			countdown:60
		}
	},
	methods:{
		onSubmit(formName){
			this.$refs[formName].validate((valid) => {
				if(valid){
					submitLoginApi('user/resetPassword',this.resetPassword).then((res)=>{
						if(res.status === 200){
							let type = 'error';
							if(res.data.success === true){
								type = 'success';
								this.$router.push('/login');
							}
							this.$message({
								message:res.data.operateMessage,
								type:type
							})
						}
					})
				}
			})
		},
		getCode(){
			getVeriCode(this,'resetPassword',this.resetPassword.phoneNum,true)
		},
		valPwd(rule, value, callback) {            
	        if (!value) {
	            callback(new Error('请再次输入密码'));
	        } else if (value !== this.resetPassword.password) {
	            callback(new Error('两次输入密码不一致!'));
	        } else {
	            callback();
	        }
	  	}
	}
}
</script>
<style scoped lang="stylus" rel="stylesheet">
@import '../../assets/css/index.styl'
</style>