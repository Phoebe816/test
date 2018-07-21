<template>
    <el-pagination
    	v-show="count > 0"
    	background
    	@size-change="changePage('limit',$event)"
    	@current-change="changePage('curPageIdx',$event)"
    	:current-page="curPageIdx"
    	:page-sizes="pages"
    	:page-size="limit"
    	:total="count"
		layout="total, sizes, prev, pager, next, jumper">
    </el-pagination>
</template>
<script type="ecmascript-6">
export default {
	data(){
		return {}
	},
	props:{
		pages:{
			type:Array,
			default:() => {
				return [10,20,30] 
			}
		},
		limit:{
			type:Number
		},
		curPageIdx:{
			type:Number
		},
		count:{
			type:Number
		}
	},
	methods:{
		changePage(type,val){
			this.$emit("changePage",type,val)
		}
	}
}   
</script>
<style scoped lang="stylus" rel="stylesheet">
</style>