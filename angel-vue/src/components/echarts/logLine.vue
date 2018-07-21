<template>
<div class="container">
    <div id="myLogLine" :style="{width:'100%',height:'300px'}"></div>
</div>
</template>
<script type="ecmascript-6">
import {getRedoLogApi} from '@/apis'
export default {
	data(){
		return {
			timeArray:[],
			series:[],
			legrendUnSelect:{},
			scrollDataIndex:0,
			_lastTime:null
		}
	},
	methods:{
		initData(){
			//X轴
			for(let n=0;n<24;n++){
				let _item = n <= 9 ? ('0' + n + ':00') : (n + ':00');
				this.timeArray.push(_item);
			}
			//初始化翻页图例与图形同步
			for(let n=0,len=this.series.length;n<len;n++){
				this.legrendUnSelect[this.series[n].name] = n>=5 ? false : true;
			}
		},
		drawLine(){
			let myLogLine = this.$echarts.init(document.getElementById('myLogLine'));
			let option = {
			    tooltip: {
			        trigger: 'axis'
			    },
			    legend: {
			        type:'scroll',
			        width:'420',
			        animation:false,
			        scrollDataIndex:this.scrollDataIndex,
			        selected: this.legrendUnSelect
			    },
			    grid: {
			        top: 70,
			        bottom: 30
			    },
			    xAxis: [
			        {
			            type: 'category',
			            axisTick: {
			                alignWithLabel: true
			            },
			            data: this.timeArray,
			            name: '时间'
			        }
			    ],
			    yAxis: [
			        {
			            type: 'value',
			            name: '切换次数'
			        }
			    ],
				series: this.series
			};
			myLogLine.setOption(option);
			window.addEventListener("resize", () => { myLogLine.resize();});
			myLogLine.on('legendScroll',(params) => {
				this.throttle(params,1000)();
			})
		},
		fetchData(){
			getRedoLogApi(this.$store.state.inspection.reportInfo.batch_id).then((res) => {
				if(res.status === 200){
					let dataArray = res.data,
						len = dataArray.length;
					for(let i=0;i<len;i++){
						let _obj = {
							name:dataArray[i].log_day,
							type:'line',
							data:dataArray[i].switch.split(',')
						}
						this.series.push(_obj);
					}
				}
				this.initData();
				this.drawLine();
			})
		},
		//函数节流
		throttle(params,gapTime) {
		    let that = this;
		    return function() {
		        let _nowTime = new Date();
		        if (_nowTime - that._lastTime > gapTime || !that._lastTime) {
		            that.scrollRedo(params);
		            that._lastTime = _nowTime;
		        };
		    };
		},
		//图例翻页
		scrollRedo(params){
			let index = params.scrollDataIndex;
			let	len = this.series.length;
			//后翻页
			if((index + 1)%5 ==0){
				this.scrollDataIndex = index + 1;
				for(let i=0;i<len;i++){
					this.legrendUnSelect[this.series[i].name] = (i > index && i - index <= 5) ? true : false;
				}
			}
			//前翻页
			if((index - 1)%5 ==0){
				this.scrollDataIndex = index - 1;
				for(let i=0;i<len;i++){
					this.legrendUnSelect[this.series[i].name] = (i+2 > index && i + 2 - index <= 5) ? true : false;
				}
			}
			//myLogLine.setOption(option);
			this.drawLine();
		}
	},
	mounted(){
		this.fetchData();
	}
}
</script>
<style scoped lang="stylus" rel="stylesheet">
</style>