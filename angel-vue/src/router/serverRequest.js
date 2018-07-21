//server request模块路由
export default [
	{
		path:'/serverRequest',
		name:'serverRequest',
		component:() => import('@/pages/shopping/serverRequest')
	},{
		path:'/serverRequest/submitSR',
		name:'submitSR',
		component:() => import('@/pages/shopping/submitSR')
	},{
		path:'/serverInfo',
		name:'serverInfo',
		component:() => import('@/pages/shopping/SRInfo')
	}
]
