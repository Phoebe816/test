const Mock = require("mockjs")
const Random = Mock.Random;   //用于生成各种类型的数据。 
//Mock.Random的方法在模板数据中被称为占位符

Mock.mock('/api/pwdLogin','post',{
	'operateMessage|1':['手机号不存在','密码错误'],   // 'name1|1':arr,  从数组里随机取出1个值
	'success|1':[true]               
})

Mock.mock('/api/smsLogin','post',{
	'operateMessage|1':['手机号不存在','验证码错误'],
	'success|1':[true,false]
})

Mock.mock('/api/user/verifiedPhoneNum','get',{
	'success|1':[false]
})

Mock.mock(/\/api\/code\/getSmsCode/,'get',{
	'operateMessage|1':['手机号不存在','发送成功','发送失败'],
	'success|1':[true,false]
})

Mock.mock('/api/loginout','get',{
	'operateMessage|1':['登出成功','登出失败'],
	'success|1':[true,false]
})

Mock.mock('/api/user/register','post',{
	'operateMessage|1':['验证码错误','注册成功','注册失败'],
	'success|1':[true,false]
})

Mock.mock('/api/user/perfectInfo','post',{
	'operateMessage|1':['保存成功','保存失败'],
	'success|1':[true,false]
})

Mock.mock(/\/api\/findRemoteDbinfos/,'get',{
	'packetInfo|3':{
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

Mock.mock('/api/user/getHomepageOverview','get',{
	'array|20':[{
		'count':'@integer(1,10)',
		'type':'@integer(0,2)',
		'info|1':['orderinfo','dbinfo','reptinfo','revwinfo','srinfo','docinfo','consinfo','remoinfo','continfo']
	}]
})