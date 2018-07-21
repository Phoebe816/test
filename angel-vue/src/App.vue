<!-- 1、模板 -->
<template>
  <el-container :class="['app uf-col']">    
    <template v-if="$route.meta.fullScreen">
      <router-view></router-view>
    </template>
    <template v-else-if="$route.meta.homePages">
      <Nav></Nav>
      <router-view></router-view>
      <Footer></Footer>
    </template>   
  </el-container>
</template>
<!-- 2、行为：处理逻辑 -->

<script>
import Nav from '@/components/Topnav'
import Footer from '@/components/Footer'

export default {
  name: 'App',
  components: {
    Nav,
    Footer
  },
  computed:{
    activeQuery(){
      return this.$route.query + new Date()
    }
  }
}
</script>
<!-- 3、样式：解决样式 -->
<style>
.app {
  position relative
  width 100%
  height 100%
  flex-direction: column
}

</style>

