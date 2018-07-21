export default {
	state:{
		shopCartNum:0
	},
	getters:{
		shopCartNum(state){
			return state.shopCartNum
		}
	},
	mutations:{
		setShopCart(state,data){
			state.shopCartNum = data
		}
	},
	actions:{
		ChangeShopCart({commit},data){
			commit('setShopCart',data)
		}
	}
}