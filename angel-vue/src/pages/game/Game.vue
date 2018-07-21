<!-- 1、模板 -->
<template>
  <div id="gwh_game" class="gwh_game">   
    
    game
   
  </div>
</template>
<!-- 2、行为：处理逻辑 -->

<script>



export default {
  name: 'gwh_game'
 
 /* mounted: function() {
    document.getElementsByTagName("html")[0].className="gwh_gamegb"; 
  }*/
 
}
</script>
<!-- 3、样式：解决样式 -->
<style scoped>
.gwh_game{	
	position: fixed;
	width: 100%;
	height: 100%;	
	background-size: 100% 100%;
	overflow-x: hidden;
	overflow-y: hidden;	
}
</style>