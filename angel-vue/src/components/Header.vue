<template>
  <el-header height="48px">
    <div class="header-cloud">
      <img class="logoImage" src="../assets/logo.png" height="48">
    </div>
    <div class="header-menu">
      <div v-if="userInfo && userInfo.roleName === 'user'">
        <el-badge :value="shopCartNum" class="item2 myBadge" :hidden="shopCartNum === 0">
          <router-link :to="'/shopCart'" tag="span" :style="{color:'#fff'}">
            <i class="messageStyle iconfont icon-gouwuche"></i>
            <span class="messageText">购物车</span>
          </router-link>
        </el-badge>
      </div>

      <div v-if="userInfo && userInfo.roleName === 'user'">
        <el-popover
          popper-class="messagePopper"
          placement="bottom"
          width="300"
          v-model="visiblity"
          trigger="click">
          <div class="messageBox">
            <div class="title">通知</div>
            <div class="message" v-if="messageData.length === 0">暂无通知</div>
            <div v-else>
            <div class="message" v-for="item in messageData" @click="readMessage(item.id)">
              <router-link :to="{
                name:item.route,
                query:{
                  messageId:item.rid
                }
              }">{{'【' + item.message + '】'}}</router-link>
              <span>{{item.message_time}}</span>
            </div>
            </div>
          </div>
          <el-badge slot="reference" :value="messageData.length" class="item myBadge" :hidden="messageData.length === 0">
            <i class="messageStyle iconfont icon-tongzhi"></i>
            <span class="messageText">通知</span>
          </el-badge>
        </el-popover>
      </div>

      <el-dropdown
        @command="handleCommand"
        class="header-menu-user"
        trigger="click">
        <span class="el-dropdown-link">
          <i class="messageStyle iconfont icon-user"></i>
          <span class="messageText">{{userInfo ? (userInfo.account ? userInfo.account : userInfo.phoneNum) : ""}}</span>
        </span>
        <el-dropdown-menu slot="dropdown">
          <router-link :to="'/userInfo'">
            <el-dropdown-item>个人信息</el-dropdown-item>
          </router-link>
          <router-link :to="'/userList'" v-if="userInfo && userInfo.roleName === 'dba'">
            <el-dropdown-item>用户列表</el-dropdown-item>
          </router-link>
          <router-link :to="'/account'" v-if="userInfo && userInfo.roleName === 'sys'">
            <el-dropdown-item>添加账户</el-dropdown-item>
          </router-link>
          <el-dropdown-item command="exit">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </el-header>
</template>
<script>
import {loginOutApi,getAllMessageApi,readMessageApi} from '@/apis'
import {mapGetters,mapActions} from 'vuex'
export default{
  name: 'Header',
  data(){
    return {
      messageData:[],
      visiblity:false,
      shopCartCount:0
    }
  },
  computed:{
    ...mapGetters(['userInfo','shopCartNum'])
  },
  methods:{
    ...mapActions(['UserLoginOut','ChangeShopCart']),
    handleCommand(command){
      if(command === 'exit'){
        loginOutApi().then((res) => {
          if(res.status === 200){
            let _data = res.data;
            if(_data.success === true){
              this.$router.push('/login');
              this.UserLoginOut();
            }
            this.$message({
              message:_data.operateMessage,
              type:_data.success === true ? 'success' : 'error'
            })
          }
        })
      }
    },
    fetchData(){
      getAllMessageApi().then(res => {
        if(res.status === 200){
          this.messageData = res.data.messages
          this.ChangeShopCart(res.data.cart)
        }
      })
    },
    readMessage(id){
      this.visiblity = false
      readMessageApi(id).then(res => {
        if(res.status === 200){
          this.fetchData()
        }
      })
    }
  },
  mounted(){
    this.fetchData()
  }
}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
@import '../assets/css/index.styl'
.el-header {
  color $--color-white
  background-color $--background-color-header
}

.header-cloud {
  display inline-block
  & i {
    font-size 40px
    line-height 48px
    vertical-align middle
  }
}

.logoImage{
  margin-left 12px
  vertical-align middle
}

.header-menu {
  float right
  height 48px
  & > div {
    position relative
    display inline-block
    vertical-align middle
    height inherit
    padding-left 16px
  }
}

.header-menu-user {
  cursor pointer
  line-height 48px
  & .el-dropdown-link {
    cursor pointer
    color $--color-white
  }
}

.messageStyle{
  line-height 48px
  vertical-align middle
  &:hover{
    cursor pointer
  }
}
.messageText{
  line-height 48px
  font-size 12px
  vertical-align middle
  &:hover{
    cursor pointer
  }
}
.el-badge.item /deep/ .el-badge__content.is-fixed {
  margin-top: 15px;
  margin-right:25px;
  border: none;
}
.el-badge.item2 /deep/ .el-badge__content.is-fixed {
  margin-top: 15px;
  margin-right:35px;
  border: none;
}

.el-badge.myBadge /deep/ .el-badge__content{
  font-size 10px
  height 15px
  line-height 15px
  padding 0px 4px
}
</style>
