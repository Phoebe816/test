<template>
<el-main v-if="userInfo && userInfo.grade === 0">
  <div class="bg_gray">
    <h5>注册用户暂无此功能权限，请升级为
      “<span class="text-red">标准云服务</span>”或
      “<span class="text-red">高级云服务</span>”或
      “<span class="text-red">专家云服务</span>”
    </h5>
  </div>
</el-main>
<el-main v-else v-loading="loading">
  <el-row class="topContent">
    <el-col :span="12">
      <el-button type="primary" icon="el-icon-search" plain round>知识库搜索答案</el-button>
    </el-col>
    <el-col :span="12">
      <router-link :to="'/serverRequest/submitSR'">
        <el-button type="primary" icon="el-icon-edit" plain round>提交SR</el-button>
      </router-link>
    </el-col>
  </el-row>
  <el-row>
    <el-col :span="12">
      <h5>我的SR列表：</h5>
    </el-col>
    <el-col :span="12">
      <el-input
      size="mini"
      placeholder="用户手机号"
      v-model="params.phoneNum"
      :style="{width:'250px',float:'right'}"
      v-if="userInfo && userInfo.roleName ==='dba'">
        <el-button slot="append" icon="el-icon-search" @click="queryList"></el-button>
      </el-input>
    </el-col>
  </el-row>
  <el-table
    :data="tabelData">
    <el-table-column v-if="userInfo && userInfo.roleName === 'dba'" prop="user_id" label="用户ID" width="80"></el-table-column>
    <el-table-column prop="title" label="问题总结" width="450">
      <template slot-scope="scope">
        <router-link :to="{name:'serverInfo',params:{id:scope.row.srid}}">
          <span>{{scope.row.title}}</span>
        </router-link>
      </template>
    </el-table-column>
    <el-table-column prop="srid" label="SRID">
      <template slot-scope="scope">
        <el-tooltip content="点击查看问题详情" placement="right">
          <router-link :to="{name:'serverInfo',params:{id:scope.row.srid}}">
            <span>{{scope.row.srid}}</span>
          </router-link>
        </el-tooltip>
      </template>
    </el-table-column>
    <el-table-column prop="type" label="问题类型"></el-table-column>
    <el-table-column prop="status" label="状态">
      <template slot-scope="scope">
        <span>{{statusChn[scope.row.status]}}</span>
      </template>
    </el-table-column>
    <el-table-column prop="level" label="重要程度"></el-table-column>
    <el-table-column prop="updttime" label="最后更新时间" width="150"></el-table-column>
  </el-table>
  <Pagination
    :curPageIdx="params.pageNum"
    :limit="params.pageSize"
    :count="total"
    @changePage="setParams">
  </Pagination>
</el-main>
</template>
<script type="ecmascript-6">
import Pagination from '@/components/Pagination'
import {getServerListApi} from '@/apis'
import {mapGetters} from 'vuex'
export default {
  data(){
    return {
      loading:true,
      tabelData:[],
      total:0,
      params: {
        pageNum: 1,
        pageSize: 10
      },
      statusChn:['已提交','已回复','已升级','已关闭','已更新']
    }
  },
  computed:{
    ...mapGetters(['userInfo'])
  },
  components:{
    Pagination
  },
  methods:{
    setParams(type,val){
      if(type === 'curPageIdx'){
        this.params.pageNum = val;
      }else{
        this.params.pageNum = 1;
        this.params.pageSize = val;
      }
      this.fetchData();
    },
    fetchData(){
      getServerListApi(this.params).then((response) => {
        if(response.status == 200){
          this.tabelData = response.data.list;
          this.total = response.data.total;
          this.loading = false;
        }
      })
    },
    queryList(){
      this.fetchData()
    }
  },
  mounted(){
  debugger
    this.params.status = this.$route.params.type
    this.fetchData()
  }
}
</script>
<style scoped lang="stylus" rel="stylesheet">
@import '../../assets/css/index.styl'
.topContent
  text-align center
  padding 30px
</style>
