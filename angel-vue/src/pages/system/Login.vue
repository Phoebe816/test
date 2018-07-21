<template>
<el-main class="vertical-horizontal">
	<div class="login">
	  	<div class="loginFunc">
		    <div :class="{loginFuncApp:!activeTab}" @click="toggle">账号密码登录</div>
		    <div :class="{loginFuncNormal:activeTab}" @click="toggle">手机验证码登录</div>
		</div>
    	<div class="login_card" v-show="activeTab">
			<el-form
				ref="login_pwd"
				:model="login_pwd"
				:rules="rules"
				status-icon>
				<el-form-item prop="phoneNum">
					<el-input v-model="login_pwd.phoneNum" placeholder="请输入手机号"></el-input>
				</el-form-item>
				<el-form-item prop="password">
					<el-input type="password" v-model="login_pwd.password" placeholder="请输入密码" @keyup.enter.native="onSubmit('login_pwd')"></el-input>
				</el-form-item>
				<el-form-item v-if="errorCount > 1 " prop="captchaCode" :rules="rules.required">
					<el-input v-model="login_pwd.captchaCode" class="code-input" placeholder="请输入图形验证码"></el-input>
					<img class="img_valid" @click="rnd = Math.random()" :src="'/api/code/getCaptchaImage?rnd=' + rnd">
				</el-form-item>
				<el-form-item>
					<el-button type="success" size="medium" @click="onSubmit('login_pwd')">登录</el-button>
				</el-form-item>
			</el-form>
			<div class="register">还没有账号，<router-link :to="{path:'/register'}">点击注册</router-link>
				<div class="resetPassword">
					<router-link :to="{path:'/resetPassword'}"><i class="el-icon-question"></i>忘记密码</router-link>
				</div>
			</div>
		</div>
   		<div class="login_card" v-show="!activeTab">
			<el-form
				ref="login_code"
				:model="login_code"
				:rules="rules"
				status-icon>
				<el-form-item prop="phoneNum">
					<el-input v-model="login_code.phoneNum" placeholder="请输入手机号"></el-input>
				</el-form-item>
				<el-form-item prop="smsCode" :rules="rules.required">
					<el-input v-model="login_code.smsCode" class="code-input" placeholder="请输入验证码"></el-input>
					<el-button @click="getCode" :disabled="codeDisabled">{{countdown == 60 ? '免费获取验证码' : '重新发送(' + countdown + ')'}}</el-button>
				</el-form-item>
				<el-form-item>
					<el-button type="success" size="medium" @click="onSubmit('login_code')">登录</el-button>
				</el-form-item>
				<div class="register">还没有注册手机号，<router-link :to="{path:'/register'}">点击注册</router-link></div>
			</el-form>
		</div>
	</div>
</el-main>
</template>
<script scoped>
import {validator,getVeriCode} from '@/utils'
import {submitLoginApi,getValidImgApi} from '@/apis'
import {mapActions} from 'vuex'
export default {
	name:'login',
	data(){
		return {
			activeTab:true,
			login_pwd:{},
			login_code:{},
			rules:validator,
			codeDisabled:false,
			countdown:60,
			errorCount:0,
			rnd:0
		}
	},
	methods:{
		...mapActions(['UserLogin']),
		onSubmit(formName){
			this.$refs[formName].validate((valid) => {
				if(valid){
					let url = formName === 'login_pwd' ? 'pwdLogin' : 'smsLogin';
					let params = formName === 'login_pwd' ? this.login_pwd : this.login_code;
					submitLoginApi(url,params).then((res)=>{
						if(res.status === 200){
							let _data = res.data;
							if(_data.success === true){
								this.UserLogin(_data.operateCallBackObj);
								this.$router.push('/homePage');
							}else{
								this.errorCount = _data.errorCount;
								this.$message({
									message:_data.operateMessage,
									type:'error'
								})
							}
						}
					})
				}
			})
		},
		getCode(){
			getVeriCode(this,'login_code',this.login_code.phoneNum,true)
		},
		toggle(){
			this.activeTab = !this.activeTab
		}
	}
}
</script>
<style scoped lang="stylus" rel="stylesheet">
@import '../../assets/css/index.styl'
.login_card{
	width 360px
	padding 30px
	button{
		float right
	}
	.img_valid{
		height 32px
		vertical-align middle
		width 30%
		float right
	}
	.img_valid:hover{
		cursor pointer
	}
}
.register{
	font-size 14px
	.resetPassword{
		float right
	}
}
.login{
	border $--border
	border-radius 5px
	box-shadow 0 0 10px #ddd
}
.loginFunc{
	font-size 0px
	line-height 50px
	text-align center
	cursor pointer
	div{
		height 100%
		width 209.5px
		font-size 14px
		display inline-block
	}
	.loginFuncApp{
		background-color #f5f5f5
		border-right $--border
		border-bottom $--border
	}
	.loginFuncNormal{
		background-color #f5f5f5
		border-left $--border
		border-bottom $--border
	}
}
</style>