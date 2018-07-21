<template>
<el-main>
	<div class="sr_title">提交SR</div>
    <el-form ref="form" :model="formData" :rules="rules" label-width="120px">
    	<el-form-item label="问题总结" prop="title" :rules="rules.required">
    		<el-input v-model="formData.title" placeholder="请输入问题标题"></el-input>
    	</el-form-item>
    	<el-row :gutter="20">
    		<el-col :span="12">
    			<el-form-item label="问题类型" prop="type" :rules="rules.required">
			    	<el-select v-model="formData.type" placeholder="问题类型">
			    		<el-option
			    		v-for="item in options" 
			    		:key="item.values" 
			    		:label="item.values" 
			    		:value="item.values"
			    		v-if="item.name === 'SR TYPE'">
			    		</el-option>
			    	</el-select>
		    	</el-form-item>
    		</el-col>
    		<el-col :span="12">
    			<el-form-item label="问题等级" prop="level" :rules="rules.required">
			    	<el-select v-model="formData.level" placeholder="问题等级">
			    		<el-option 
			    		v-for="item in options" 
			    		:key="item.values" 
			    		:label="item.values" 
			    		:value="item.values"
			    		v-if="item.name === 'SR LEVEL'">
			    		</el-option>
			    	</el-select>
		    	</el-form-item>
    		</el-col>
    	</el-row>
    	<el-form-item label="问题描述" prop="srinfo" :rules="rules.required">
    		<el-input type="textarea" v-model="formData.srinfo" :autosize="size" placeholder="请输入问题描述"></el-input>
    	</el-form-item>
    	<el-form-item label="配置相关信息" prop="otherinfo" :rules="rules.required">
    		<el-input type="textarea" v-model="formData.otherinfo" :autosize="{minRows:2,maxRows:8}" placeholder="请输入版本号、运行环境、当前补丁号、服务器配置等信息"></el-input>
    	</el-form-item>
    	<el-form-item label="对接人姓名">
    		<el-input v-model="formData.contname" placeholder="姓名"></el-input>
    	</el-form-item>
    	<el-form-item label="对接人Email" prop="contemail" :rules="rules.email">
    		<el-input v-model="formData.contemail" placeholder="Email"></el-input>
    	</el-form-item>
    	<el-form-item label="对接人电话" prop="conttel" :rules="[rules.required,rules.phoneNum]">
    		<el-input v-model="formData.conttel" placeholder="电话"></el-input>
    	</el-form-item>
    	<span>trace文件等附件请提交SR后单独上传。</span>
    </el-form>
    <div class="submit_btn">
		<el-button type="primary" @click="submitForm">提交</el-button>
		<router-link :to="'/server'">
			<el-button>取消</el-button>
		</router-link>
	</div>
</el-main>
</template>
<script type="ecmascript-6">
import {validator,validCallback} from '@/utils'
import {getSROptions,submitSRApi} from '@/apis'
import router from '@/router'
export default {
	data(){
		return {
			options:[],
			formData:{},
			rules:validator,
			size:{minRows:4,maxRows:18}
		}
	},
	methods:{
		submitForm(){
			validCallback(this,'form',() => {
				submitSRApi('sr/instSr',this.formData).then((response) => {
					if(response.status == 200){
						router.push('/server');
					}
				})
			})
		}
	},
	created(){
		let innerHeight = window.innerHeight;
		if(innerHeight > 615){
			this.size.minRows = (innerHeight - 615)/20 + 4
		}
	},
	mounted(){
		getSROptions().then((res) => {
			if(res.status == 200){
				this.options = res.data
			}
		})
	}
}
</script>
<style scoped lang="stylus" rel="stylesheet">
@import '../../assets/css/index.styl'
.submit_btn{
	float right
	margin-right 30px
}
.el-button{
	margin-right 30px
}
.sr_title{
	text-align center
	margin-bottom 20px
}
</style>