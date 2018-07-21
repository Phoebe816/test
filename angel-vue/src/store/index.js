import Vue from 'vue'
import 'babel-polyfill'
import Vuex from 'vuex'
Vue.use(Vuex)

import inspection_store from './modules/inspection'
import common_store from './modules/common'

const store = new Vuex.Store({
  	modules:{
    	inspection:inspection_store,
    	common:common_store
  	},
  	state:{
		userInfo:null,
		token:sessionStorage.getItem('token')
	},
	getters:{
		userInfo(state){
			if(!state.userInfo){
				state.userInfo = JSON.parse(sessionStorage.getItem('userInfo'))
			}
			return state.userInfo
		}
	},
	mutations:{
		LOGIN:(state,data) => {
			state.userInfo = data;
			sessionStorage.setItem('userInfo',JSON.stringify(data));
		},
		LOGOUT:(state) => {
			state.userInfo = null;
			sessionStorage.removeItem('userInfo');
		}
	},
	actions:{
		UserLogin({commit},data){
			commit('LOGIN',data)
		},
		UserLoginOut({commit},data){
			commit('LOGOUT',data)
		}
	}
})

export default store