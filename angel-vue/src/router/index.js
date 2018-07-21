import Vue from 'vue'
import store from '@/store'
import Router from 'vue-router'
import Topnav from '@/components/Topnav'

import pages from './pages'
import system from './system'
import server from './serverRequest'

Vue.use(Router)
// 配置路由
const routes = [
	{
	    path: '/',
	    name: 'home',
	    component:() => import('@/pages/homepage/Home'),
		meta:{homePages:true}
	},	
	...system,	
	...pages,
	...serverRequest		
]

const router = new Router({
	mode:'history',       //去掉地址里面的#/
	routes,
	scrollBehavior (to, from, savedPosition) {    //设置滚动行为
	  if (savedPosition) {
	    return savedPosition
	  } else {
	    return { x: 0, y: 0 }
	  }
	}
})

router.beforeEach((to, from ,next) => {
	const token = store.getters.userInfo
	if(to.matched.some(record => record.meta.requireAuth || record.meta.homePages)){
		//路由元信息requireAuth:true，或者homePages:true，则不做登录校验		
		if(Object.keys(from.query).length === 0){
			next()
		}else{
			let redirect = from.query.redirect
			if(to.path === redirect){
				next()
			}else{
				if(Object.keys(to.query).length > 0){
					next()
				}else{
					next({
			          	path:to.path,
			          	query: {redirect: redirect}
			        })
				}
			}
		}
	}else{
		if(token){    //判断用户是否登录
			if(Object.keys(from.query).length === 0){
				next()
			}else{
				let redirect = from.query.redirect
				if(to.path === redirect){
					next()
				}else{
					next({path:redirect})
				}
			}
		}else{
			if(to.path==="/login"){
			    next()
			}else{
				next({
		          	path:"/login",
		          	query: {redirect: to.fullPath}
		        })
			}
		}
	}
	return
})

export default router