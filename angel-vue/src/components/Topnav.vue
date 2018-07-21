<!-- 1、模板 -->
<template>
  <el-header class="topnav"> 
    <div class="nav">
      <div class="logo">
        <h1 class="logo"><router-link to="/" title="天使网首页" class="logo"></router-link></h1>     
      </div>      
      <div class="navbox"> 
        <span id="diamond" class="diamond"></span>
        <ul>          
          <li class="navlist" 
            :class="{bigsize:current==0 && index==0, changesize:index==current}" 
            v-for="(navtitle, index) of navTitle" 
            :key="navtitle.id"
            :router=navtitle.pathTo
            @mouseover="diamondMove(index)" @mouseout="diamondMove(0)">
            <!-- <span slot="title"> {{ navtitle.name }} </span> -->
            <router-link :to=navtitle.pathTo> {{ navtitle.name }} </router-link>        
          </li>           
        </ul>
      </div> 
      <ul class="usermsg">   
           <li class="userlist grey">
              <router-link to="/login" id="loginIn" class="system">登录</router-link>
              <span>｜</span>
              <router-link to="/register" class="system"> 注册 </router-link>
           </li>         
      </ul> 
    </div>         
  </el-header>
</template>
<!-- 2、行为：处理逻辑 -->
<script>
export default {
  name: 'topnav',
  props:["Lists"],
  data: function(){
    return {
      navTitle:[
        { name: "首页", pathTo: "/", id:"homePage"},
        { name: "孕育", pathTo: "/pregnant", id:"pregnantPage"},
        { name: "工作", pathTo: "/job", id:"jobPage"},
        { name: "购物", pathTo: "/shopping", id:"shoppingPage"},
        { name: "旅游", pathTo: "/tour", id:"tourPage"},
        { name: "娱乐", pathTo: "/amusement", id:"amusementPage"},
        { name: "健身", pathTo: "/gyms", id:"gymsPage"},       
        { name: "互助", pathTo: "/mutualaid", id:"mutualAidPage"},
        { name: "游戏", pathTo: "/game", id:"gamePage"}
      ],
      current: 0     
    }
  },
  methods: {
    diamondMove:function(index){
      var oDiamond = document.getElementById("diamond");    
      this.current = index;         
      var Target = oDiamond.offsetWidth*this.current;            
      oDiamond.style.left = Target + 'px';       
    }             
    /*handleSelect(key, keyPath) {
      switch (key) {
        case 1:
          // statements_1
          break;
        case 2-1:
          break;
        default:
          // statements_def
          break;
      }
    }*/
  }
 
}
</script>
<!-- 3、样式：解决样式 -->
<style scoped>
 .topnav{
  width:100%;
  height: 50px;   
  background: #fff; 
  position: fixed;
  top:0px;  
  z-index: 99;    
 }  
 .nav{
  width: 1200px;
  height: 100%;
  margin: 0px auto;
  font-size: 18px;
  line-height: 50px;  
 }
 .logo{
 width: 200px;
 height: 100%;
 float: left;
 background: url("../assets/logo.png") no-repeat;
} 
 .navbox{  
  height: 100%;
  width: 600px;      
  float: left; 
  position: relative; 
  display: inline-block;
 } 
 .navlist{       
  width: 50px;    
  display: inline-block;
  position: relative;
  text-align: center;   
 }   
 .diamond{
  position: absolute;
  width: 50px;
  height: 100%;
  background: url("../assets/img/diamonds.png") no-repeat;     
  filter:alpha(opacity:50); 
  opacity:0.5;  
  -moz-opacity:0.5;
  -khtml-opacity: 0.5;
 } 
 .usermsg{
  float: right;    
 }
 .userli{
  width: 150px;
  height: 100%;  
  display: inline-block;  
  float: right;  
  text-align: center;
  color: #ccc;
 } 
 .system:hover{
  color:#FF83FA;
 }
 .changesize{
  transition: font 0.5s;
  -webkit-transition: font 0.5s; /* Safari */  
 }
 .changesize:hover{
  font-size: 22px;
  font-weight: bold;
 }
 .bigsize{
  font-size: 22px;
  font-weight: bold;    
 }
</style>