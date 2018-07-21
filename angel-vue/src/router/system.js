//系统模块
export default [
	{
	    path: '/login', 
	    name: 'login',
	    component:() => import('@/pages/system/Login'),
	    meta:{requireAuth:true,fullScreen:true}
	},
	{ 
    	path:"/register", 
    	name:'register',
    	component:() => import('@/pages/system/Register'),
    	meta:{requireAuth:true,fullScreen:true} 
   	 	// meta:{ title:'天使网注册'}
    },
    {
		path:'/resetPassword',
		name:'resetPassword',
		component:() => import('@/pages/system/resetPassword'),
		meta:{requireAuth:true,fullScreen:true}
	}
]