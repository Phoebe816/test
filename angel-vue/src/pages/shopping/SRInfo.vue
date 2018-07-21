<template>
<el-main v-loading="loading">
	<el-row :gutter="20">
	<el-col :span="16">
		<div class="group_btn">
			<el-button-group>
			  <el-button icon="el-icon-edit" :disabled="disabled" plain round @click="updateSR = true">更新SR</el-button>
			  <el-button icon="el-icon-upload" :disabled="disabled" plain round @click="uploadSR = true">添加附件</el-button>
			  <el-button icon="el-icon-close" :disabled="disabled" plain round @click="closeSR">关闭SR</el-button>
			  <el-button icon="el-icon-upload2" :disabled="disabled" plain round @click="upgrade">升级SR</el-button>
			</el-button-group>
		</div>
		
		<el-dialog class="dialogStyle" title="更新SR" center :visible.sync="updateSR" top="0" custom-class="vertical-horizontal">
			<el-form ref="aqForm" :model="aqForm" staus-icon :rules="rules">
				<el-form-item prop="aqinfo" :rules="rules.required">
					<el-input type="textarea" :rows="8" placeholder="问题详情" v-model="aqForm.aqinfo"></el-input>
				</el-form-item>
				<el-form-item>
					<div class="btn_right">
						<el-button @click="updateSR = false">取消</el-button>
			    		<el-button type="primary" @click="updateSRText">确定</el-button>
					</div>
				</el-form-item>
			</el-form>
		</el-dialog>

		<el-dialog class="dialogStyle" center title="添加附件" :visible.sync="uploadSR" top="0" custom-class="vertical-horizontal" width="40%">
			<el-upload
			  class="upload-file"
			  drag
			  :action="doUpload"
			  :data="uploadData"
			  :on-success="uploadSuccess"
			  :on-error="uploadError"
			  ref="newupload">
			  <i class="el-icon-upload"></i>
			  <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
			</el-upload>
		</el-dialog>

		<el-dialog class="dialogStyle" title="升级SR" :visible.sync="upgradeSR" center top="0" custom-class="vertical-horizontal" width="40%">
			<el-form ref="upForm" :model="upForm" label-width="80px">
				<el-form-item label="问题等级">
					<el-select v-model="upForm.level">
			    		<el-option 
			    		v-for="item in levelOptions" 
			    		:key="item.values" 
			    		:label="item.values" 
			    		:value="item.values" 
			    		v-if="item.name == 'SR LEVEL'" 
			    		:disabled="showOption(item)">
			    		</el-option>
			    	</el-select>
				</el-form-item>
				<el-form-item>
					<div class="btn_right">
						<el-button @click="upgradeSR = false">取消</el-button>
						<el-button type="primary" @click="upgradeSRText">确定</el-button>
					</div>
				</el-form-item>
			</el-form>
		</el-dialog>

		<div class="aq_container">
		    <div v-for="item in quesObj" class="aq">
			  	<div :class="[item.role_name == 'user' ? 'customer' : 'expert']">
				  	<div class='title'>{{item.account + '：' + item.aqtime}}</div>
				  	<div class="description">{{item.aqinfo}}</div>
				</div>
		    </div>
		    <div class="aq">
				<div class="customer">
				  	<div class="title">{{quesContent.subtime}}</div>
				  	<div class="description">{{quesContent.srinfo}}</div>
				</div>
			</div>
		</div>
	</el-col>
	<el-col :span="8">
		<div class="vertical-horizontal card-content">
		<el-card :body-style="{ padding: '20px 10px' }">
		<div class="question_des">
			<div>
		        <span>问题描述：</span>
		        <span>{{quesContent.title}}</span>
	    	</div>
	    	<div>
		        <span>重要程度：</span>
		        <span>{{quesContent.level}}</span>
	    	</div>
	    	<div>
		        <span>问题类型：</span>
		        <span>{{quesContent.type}}</span>
	    	</div>
	    	<div>
		        <span>状态：</span>
		        <span>{{statusChn[quesContent.status]}}</span>
	    	</div>
	    	<div>
		        <span>SR创建时间：</span>
		        <span>{{quesContent.subtime}}</span>
	    	</div>
	    	<div>
		        <span>上次更新时间：</span>
		        <span>{{quesContent.updttime}}</span>
	    	</div>
	    </div>
	    <div class="customer_info">
	    	<div>
		        <span>联系人：</span>
		        <span>{{quesContent.contname}}</span>
	    	</div>
	    	<div>
		        <span>电话：</span>
		        <span>{{quesContent.conttel}}</span>
	    	</div>
	    	<div>
		        <span>Email：</span>
		        <span>{{quesContent.contemail}}</span>
	    	</div>
	    </div>
	    </el-card>
	    <el-card :body-style="{ padding: '20px 10px' }">
			<h5>附件列表</h5>
			<el-table :data="quesObj.filter(item => item.attach)">
				<el-table-column label="附件名称" align="center">
					<template slot-scope="scope">
						<a :download="scope.row.attach" :href="'/api/hbase/readFile?fileName=' + scope.row.attach">{{scope.row.attach}}</a>
					</template>
				</el-table-column>
			</el-table>
	    </el-card>
		</div>
	</el-col>
	</el-row>
</el-main>
</template>
<script type="ecmascript-6">
import axios from 'axios'
import {submitSRApi,closeSRApi,getSROptions,getServerListInfoApi,getAqInfoApi} from '@/apis'
import {validator,validCallback} from '@/utils'
export default {
	data(){
		return {
			rules:validator,
			loading:true
			,disabled:false
			,updateSR:false
			,uploadSR:false
			,upgradeSR:false
			,doUpload:'/api/hbase/uploadFile'
			,quesObj:[]
			,aqForm:{}
			,quesContent:{}
			,uploadData:{}
			,upForm:{}
			,levelOptions:[],
			statusChn:['已提交','已回复','已升级','已关闭']
		}
	},
	created(){
		this.fetchData()
	},
	methods:{
		fetchData(){
			let _id = ''
	    	if(this.$route.params.id){
	    		_id = this.$route.params.id
	    	}
	    	if(this.$route.query.messageId){
	    		_id = this.$route.query.messageId
	    	}
			axios.all([
				getAqInfoApi(_id),
				getServerListInfoApi(_id)
			]).then(axios.spread((res1,res2) => {
				this.quesObj = res1.data;
				this.quesContent = res2.data;
				this.aqForm.srid = this.quesContent.srid;
				this.uploadData.srid = this.quesContent.srid;
				this.disabled = res2.data.status === 3 ? true : false;
				this.upForm.srid = this.quesContent.srid;
				this.loading = false;
			}))
		},
		updateSRText(){
			this.aqForm.type = 2;
			validCallback(this,'aqForm',() => {
				submitSRApi('sr/reply',this.aqForm).then((response)=>{
					this.updateSR = false;
					this.fetchData();
				})
			})
		},
		//关闭sr
		closeSR(){
			this.$confirm('关闭之后不可恢复，确认关闭吗？').then(_ => {
		        closeSRApi(this.uploadData.srid).then((res)=>{
					if(res.status == 200){
						this.disabled = true;
						this.fetchData();
					}
				})
		    }).catch(_ => {})
		},
		//升级
		upgrade(){
			this.upgradeSR = true
			this.upForm.level = this.quesContent.level
			getSROptions().then(res => {
				if(res.status === 200){
					this.levelOptions = res.data
				}
			})
		},
		showOption(obj){
			if(obj.name == 'SR LEVEL'){
				let _base = parseInt(this.quesContent.level.split("-")[0],10);
				let _now = parseInt(obj.values.split("-")[0],10);
				return _base <= _now;
			}
			return false;
		},
		upgradeSRText(){
			submitSRApi('sr/escalate',this.upForm).then((res)=>{
				if(res.status == 200){
					this.upgradeSR = false;
					this.fetchData();
				}
			})
		},
		//添加附件
		uploadSuccess(response, file, fileList){
			this.uploadSR = false;
			this.fetchData();
			this.$message({
				message:'上传成功',
				type:'success'
			})
		},
		uploadError(err, file, fileList){
			this.$message({
				message:err,
				type:'error'
			})
		}
	}
}
</script>
<style scoped lang="stylus" rel="stylesheet">
@import '../../assets/css/index.styl'
.el-card{
	text-align center
	font-size 12px
	& div{
		margin-bottom 5px
	}
	& .customer_info{
		margin-top 30px
	}
}
.card-content{
	width 100%
}
.el-row,.el-col{
	height 100%
}
.el-col{
	position relative
}
.group_btn{
	text-align center
}
.aq_container{
	overflow auto
	height 97%
}
.aq{
	font-size 9px
	margin 3px 0px
	white-space pre-wrap
	word-break break-all
	border 1px solid #dcdfe6
	border-radius 8px
	& .expert{
		background-color #f4f4f5
		padding 8px 16px
	}
	& .customer{
		background-color lighten(#409eff,90%)
		padding 8px 16px
	}
	& .title{
		text-align right
		font-size 12px
	}
	& div {
		border-radius 8px
	}
}
.upload-file{
	text-align center
}
</style>