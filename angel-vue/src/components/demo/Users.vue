<template>
  <div class="users">    
    <ul>
      <li v-for="user in users">
          {{ user }}       
      </li>
    </ul>
  </div>
</template>
<!-- 传值：string,boolean,number  /传值不会改变其他的地方
     引用：array object /传引用一个地方改变，所有都变，相当于传址-->
<script>
export default {
  name: 'users',
  props:{       // 父组件向子组件传值
    users{
      type:Array,
      required:true
    },
    lists{
      type:String,
      required:true
    }

  },
  data () {
    return {
        users:["This", "is", "my", "first", "project"]
    }
  },
  methods:{
    change:function(){
      this.$emit("titlechanged","子向父传值");//方法titlechanged，参数"子向父传值"
    }
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
