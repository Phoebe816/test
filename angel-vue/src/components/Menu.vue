<template>
  <el-aside width="auto">
	<div class="el-menu-toggle" @click="toggleMenu">
	  <i class="iconfont icon-menu"></i>
	</div>	   
    <el-menu 
	  default-active="activeIndex" 
	  class="el-menu-vertical" 
	  @open="handleOpen" 
	  @close="handleClose" 
	  :collapse="isCollapse"
	  background-color="#364150"
  	  text-color="#fff"          
      unique-opened>
      <el-menu-item index="homePage" :route="{path:'/homePage'}>
        <i class="iconfont icon-home"></i>
        <span slot="title">首页</span>
      </el-menu-item>
      <el-menu-item index="2">
        <i class="iconfont icon-dingdanguanli"></i>
        <span slot="title">订单管理</span>
      </el-menu-item>
      <el-menu-item index="3">
        <i class="iconfont icon-database"></i>
        <span slot="title">数据库管理</span>
      </el-menu-item>
      <el-submenu index="cloud">
        <template slot="title">
          <i class="iconfont icon-cloud"></i>
          <span>云服务</span>
        </template>
        <el-menu-item-group>	          
          <el-menu-item index="cloud-1">
          	<i class="iconfont icon-cloud"></i>
          	<span>选项1</span>
          </el-menu-item>
          <el-menu-item index="cloud-2">
          	<i class="iconfont icon-cloud"></i>
          	<span>选项2</span>
          </el-menu-item>
          <el-menu-item index="cloud-3">
          	<i class="iconfont icon-cloud"></i>
          	<span>选项3</span>
      	  </el-menu-item>
          <el-menu-item index="serverRequest" :route="{path:'/serverRequest'}" >
          	<i class="iconfont icon-tijiao"></i>
          	<span>提交SR</span>
          </el-menu-item>
          <el-menu-item index="cloud-5">
          	<i class="iconfont icon-cloud"></i>
          	<span>选项5</span>
          </el-menu-item>
          <el-menu-item index="cloud-6">
          	<i class="iconfont icon-cloud"></i>
          	<span>选项6</span>
          </el-menu-item>
        </el-menu-item-group>        
      </el-submenu>
      <el-menu-item index="5">
        <i class="iconfont icon-gongju"></i>
        <span slot="title">工具脚本</span>
      </el-menu-item>	     
	</el-menu>  	
  </el-aside>
</template>
<script type="ecmascript-6">
export default {
	name:"Menu",
	data(){
		return {
			openMenu:false
		}
	},
	computed:{
		activeIndex(){
			return this.$route.path.split('/')[1]
		}
	},
	methods:{
		toggleMenu(){
			this.openMenu = !this.openMenu;
		}
	}
}

</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import '../assets/css/index.styl'
  .el-aside {
    background-color $--background-color-menu
  }

  .el-menu-toggle {
    text-align center
    cursor pointer
    &:hover {
      color $--color-primary
    }
    & .icon-menu {
      font-size 18px
      line-height 32px
      display inline-block
    }
  }

  .el-menu {
    border-right none
    background-color $--background-color-menu
  }

  .el-menu-vertical:not(.el-menu--collapse) {
    width 170px
    min-height 400px
  }

  .el-menu-item{
  	font-size 13px
  	letter-spacing 2px
  	&:hover{
  	  background-color $--background-color-menu-hover
  	}
  	&.is-active{
  	  border-left 3px solid #409Eff;
	  background-color $--background-color-menu-active;
	  i{
	  	color #409Eff
	  }
  	}
  }
  .el-submenu__title i,.el-menu-item i{
  	color #fff
  	margin-right 10px
  }
  .el-menu-vertical.el-menu{
  	overflow-x hidden
  }
</style>
