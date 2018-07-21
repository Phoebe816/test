<template>
    <div id="myBar" :style="{width:'100%',height:'300px'}"></div>
</template>
<script type="ecmascript-6">
import {getDBTimeApi} from '@/apis'
export default {
	data(){
		return {
			xData:[],
			series:[]
		}
	},
	methods:{
		drawBar(){
			let myBar = this.$echarts.init(document.getElementById('myBar'));
			let option = {
				color:['#2EC7C9','#B6A2DE'],
			    tooltip : {
			        trigger: 'axis'
			    },
			    legend: {},
			    grid: {
			        left: '3%',
			        right: '7%',
			        bottom: '3%',
			        containLabel: true
			    },
			    xAxis : [
			        {
			            type : 'category',
			            name : '快照时间',
			            data : this.xData
			        }
			    ],
			    yAxis : [
			        {
			            type : 'value',
			            name : 'DB Time(单位：秒)'
			        }
			    ],
			    series : this.series
			};
			myBar.setOption(option);
			window.addEventListener("resize", () => { myBar.resize();});
		},
		fetchData(){
			getDBTimeApi(this.$store.state.inspection.reportInfo.batch_id).then((res) => {
				if(res.status === 200){
					let dataArray = res.data,
						len=dataArray.length;
					for(let i=0;i<len;i++){
						let _obj = {
							name:dataArray[i].instance_name,
							type:'bar',
							stack:'total',
							data:dataArray[i].time_sec.split(',')
						}
						this.series.push(_obj);
					}
					this.xData = dataArray[0].snap_time.split(',');
					this.drawBar();
				}
			})
		}
	},
	mounted(){
		this.fetchData();
	}
}
</script>
<style scoped lang="stylus" rel="stylesheet">
</style>