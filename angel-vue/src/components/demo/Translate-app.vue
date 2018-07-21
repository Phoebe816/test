<!-- 1、模板 -->
<template>
  <div id="app">   
    <div>
      <h1>{{ title }}</h1>   
      <translateInput @translateText="translate()"></translateInput>
      <translateOutput v-text="translatedText"></translateOutput>
    </div>
  </div>
</template>
<!-- 2、行为：处理逻辑 -->
<script>
// import HelloWorld from './components/HelloWorld'
// import Users from './components/Users'
import TranslateInput from './components/TranslateInput'
import TranslateOutput from './components/TranslateOutput'

export default {
  name: 'App',
   data () {
    return {
        title:"在线翻译",
        translatedText:""
    }
  },
  components:{
    TranslateInput,TranslateOutput
  },
  methods:{
    translate:function(text){
        this.$http.get('https://translate.yandex.net/api/v1.5/tr.json/translate ?key=trnsl.1.1.20180630T145852Z.baf7ddf6f380d7af.75d03127650a633a67c5b1e427cf0b1949f7cb83 & lang=en & text='+text)
          .then((response)=>{
          this.translatedText = response.body.text[0];
        })
    }
  }
}
</script>
<!-- 3、样式：解决样式 -->
<style>

</style>
