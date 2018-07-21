export default {
	state:{
		reportInfo:null
	},
	getters:{
		reportInfo(state){
			if(!state.reportInfo){
				state.reportInfo = JSON.parse(sessionStorage.getItem('reportInfo'))
			}
			return state.reportInfo
		}
	},
	mutations:{
		initReport:(state,data) => {
			state.reportInfo = data
			sessionStorage.setItem('reportInfo',JSON.stringify(data))
		},
		changeReportReview:(state,data) => {
			state.reportInfo.is_review = data;
			sessionStorage.setItem('reportInfo',JSON.stringify(state.reportInfo))
		}
	}
}