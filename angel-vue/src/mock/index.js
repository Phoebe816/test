require('./inspection')
require('./system')

// 在这里可以做一些通用的配置
const Mock = require("mockjs")
// 设置所有ajax请求的超时时间，模拟网络传输耗时
Mock.setup({      //配置拦截ajax请求的行为，支持的配置项有timeout。
    timeout: 0-300
})
/*Mock.valid(template,data)
这个函数用来判断，数据模板和数据是否一样，
Mock.toJSONShema(template)
var template = Mock.mock({
    'name|1-3':5
})
var tjs = Mock.toJSONSchema(tempalte);
把template风格的模板转成JSON Schema。*/