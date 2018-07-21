const Mock = require("mockjs")
const Random = Mock.Random;

Mock.mock('/api/getReports', "post", {   ///api/getReports  ajax请求的地址  模拟ajax,会把函数执行的结果作为ajax回调返回
    "list|1-7": [{         //数组重复1-7次
       	"id|+1":1,         //生成1，若循环每次+1
      	"name": "@CNAME", // 随机生成中文人名
      	"date": "@DATE",
      	"interval": "@integer(6, 30)"    //随机最小值是6,最大值是30
    }]
})

Mock.mock(/\/api\/packetInfo/,'get',{
	'packetInfo':{
		'databaseType|1':['ORACLE DATABASE','MYSQL DATABASE'],
		'system':'@NAME',
		'packet|1':['RACADB_20180119210924','RACADB_20180119210925','RACADB_20180119210926'],
		'version|1':['2.2.1','2.2.3','2.2.2'],
		'top':'@integer(1,10)',
		'awr':'@integer(1,10)',
		'topSegment':'@integer(1,10)',
		'monitorLog':'@integer(1,60)',
		'collectLog':'@integer(1,60)',
		'alarmLog':'@integer(1,60)',
		'collectTime':'@now'
	}
})

Mock.mock(/\/api\/dbTime/,'get',{
	'xData|100':['@datetime'],
	'series|2':[{
		'name':'@NAME',   //随机生成常见英文姓名
		'type':'bar',
		'stack':'total',
		'data|100':['@integer(1,600)']
	}]
})

Mock.mock(/\/api\/getLogswitchByBatchid/,'get',function(options){
	let	series=[];
	for(let n=1;n<18;n++){
		let _obj={};
		_obj.log_day = '05-' + (n <= 9 ? '0' + n : n);
		let _data=[];
		for(let i=0;i<24;i++){
			let _d = Random.integer(1,10) * (i%2 == 0 ? 10 : 90);
			_data.push(_d);
		}
		_obj.switch=_data.join(',');
		series.push(_obj);
	}
	return series;
})

Mock.mock(/\/api\/getReview/,'get',{
	'series|2':[{
		'service_class':'@NAME',
		'service_name':'@NAME',
		'service_price':'@integer(1,600)',
		'review_data':'@NAME'
	}]
})