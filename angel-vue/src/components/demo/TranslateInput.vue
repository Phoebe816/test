<template>
  <div class="translateInput">   
    <form @submit="submitForm()">
      <textarea cols="30" rows="10" placeholder="请输入需要翻译的文字" v-model="textToTranslate"></textarea>
      <input type="submit" value="翻译">
      <select>
        <option value="en">英语（English）</option>
        <option value="ja">日语（Japanese）</option>
      </select>
    </form>
  </div>
</template>

<script>
export default {
  name: 'translateInput',
  data(){
    return {
      textToTranslate:""
    }
  },
  methods:{
    submitForm:function(ev){
      ev = ev || window.event;
      ev.preventDefault();
      this.$emit("translateText",this.textToTranslate)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>