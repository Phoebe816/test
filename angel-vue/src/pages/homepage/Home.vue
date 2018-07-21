<!-- 1、模板 -->
<template>
  <div id="home" class="home">      
    <photowall></photowall>    
  </div>
</template>
<!-- 2、行为：处理逻辑 -->

<script>
import Photowall from './Photowall'

export default {
  name: 'home',
  data(){
    return {
         /* navLists:[
          {name:"首页"},
          {name:"孕育"},
          {name:"工作"},
          {name:"购物"},
          {name:"旅游"},
          {name:"娱乐"},
          {name:"健身"},
          {name:"学习"},
          {name:"互助"}
          ]*/
      }
    },
  components:{
    "photowall":Photowall
   
  }
 
}
</script>
<!-- 3、样式：解决样式 -->
<style>

</style>

