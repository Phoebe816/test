<template>
    <div id="myRadar" :style="{width:'100%',height:'200px'}"></div>
</template>
<script type="ecmascript-6">
import {getRadarDataApi} from '@/apis'
export default {
	data(){
		return {
			radarData:{},
			radarMax:10
		}
	},
	methods:{
		drawRadar(){
			let myRadar = this.$echarts.init(document.getElementById("myRadar")),
				maxNum = this.radarMax;
			let option = {
			    tooltip: {
			        trigger: 'axis'
			    },
			    radar: [
			        {
			            indicator: [
			                {text: '规范',max:maxNum},
			                {text: '性能',max:maxNum},
			                {text: '高可用',max:maxNum},
			                {text: '安全',max:maxNum},
			                {text:'稳定',max:maxNum}
			            ],
			            nameGap:5,
			            center: ['50%','56%'],
			            radius:'85%'
			        }
			    ],
			   	dataset:{
			   		dimensions:['normative','performance','recovery','safety','stability'],
				    source:[this.radarData]
			    },
			    series:[ 
			        {
			            type: 'radar',
			            tooltip: {
			                trigger: 'item'
			            },
			            itemStyle: {normal: {areaStyle: {type: 'default'}}},
			            name:'指标值'
			        }
			    ]
			};
			myRadar.setOption(option);
			window.addEventListener("resize", () => { myRadar.resize();});
		},
		fetchData(){
			getRadarDataApi(this.$store.state.inspection.reportInfo.report_id).then((res) => {
				if(res.status === 200){
					this.radarData = res.data;
					this.radarMax = Math.max.apply(null,Object.values(res.data))
					this.drawRadar();
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