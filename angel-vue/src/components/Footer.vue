<!-- 1、模板 -->
<template>
  <el-footer>
    <div id="appfooter" class="footer">   
   
    </div>
  </el-footer>
</template>
<!-- 2、行为：处理逻辑 -->
<script>


export default {
  name: 'appfooter',
  data(){
  	return {
  		lists:"首页"
  	}
  }
 
}
</script>
<!-- 3、样式：解决样式 -->
<style>
.footer{
  background: lightgreen;
  width: 100%;
  height: 200px;
  bottom:0;
}
</style>