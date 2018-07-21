export default {
	state:{
		loginInfo:null,
		token:sessionStorage.getItem('token')
	},
	getters:{
		loginInfo(state){
			if(!state.loginInfo){
				state.loginInfo = JSON.parse(sessionStorage.getItem('loginInfo'))
			}
			return state.loginInfo
		}
	},
	mutations:{
		LOGIN:(state,data) => {
			state.loginInfo = data;
			sessionStorage.setItem('loginInfo',JSON.stringify(data));
		},
		LOGOUT:(state) => {
			state.loginInfo = null;
			sessionStorage.removeItem('loginInfo');
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
}