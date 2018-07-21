<template>
    <div id="myStackedBar" :style="{width:'100%',height:'300px'}"></div>
</template>
<script type="ecmascript-6">
import {getTabelSpaceApi} from '@/apis'
export default {
	data(){
		return {
			source:[],
			barWidth:'80%'
		}
	},
	methods:{
		drawStackedBar(){
			let myStackedBar = this.$echarts.init(document.getElementById('myStackedBar'));
			let option = {
				color:['#EC5C5E','#58B4E0','#F0CD58','#54D7B6','#C5C5C5','#D9D9D9'],
			    tooltip : {
			        trigger: 'axis',
			        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
			            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
			        },
			        formatter:function(params){
			        	let htmlTips = `<div style="width: 200px;text-align: right;font-size: 0px;padding-right:10px;">
										<div style="font-size: 14px;text-align: center;">${params[0].value.name}</div>
										<div style="margin: 5px 0px;font-size: 14px;">
											<div style="display:inline-block;width:25%;">类别</div>
											<div style="display:inline-block;width:50%;">大小</div>
											<div style="display:inline-block;width:25%;">比例</div>
										</div>
										<div style="margin: 5px 0px;font-size: 14px;">
											<div style="display:inline-block;width:25%;">表</div>
											<div style="display:inline-block;width:50%;">${params[0].value.tableMB}</div>
											<div style="display:inline-block;width:25%;">${params[0].value.table.toFixed(2) + '%'}</div>
										</div>
										<div style="margin: 5px 0px;font-size: 14px;">
											<div style="display:inline-block;width:25%;">索引</div>
											<div style="display:inline-block;width:50%;">${params[0].value.indexMB}</div>
											<div style="display:inline-block;width:25%;">${params[0].value.index.toFixed(2) + '%'}</div>
										</div>
										<div style="margin: 5px 0px;font-size: 14px;">
											<div style="display:inline-block;width:25%;">LOB</div>
											<div style="display:inline-block;width:50%;">${params[0].value.lobMB}</div>
											<div style="display:inline-block;width:25%;">${params[0].value.lob.toFixed(2) + '%'}</div>
										</div>
										<div style="margin: 5px 0px;font-size: 14px;">
											<div style="display:inline-block;width:25%;">其他</div>
											<div style="display:inline-block;width:50%;">${params[0].value.otherMB}</div>
											<div style="display:inline-block;width:25%;">${params[0].value.other.toFixed(2) + '%'}</div>
										</div>
										<div style="margin: 5px 0px;font-size: 14px;">
											<div style="display:inline-block;width:25%;">剩余</div>
											<div style="display:inline-block;width:50%;">${params[0].value.freeMB}</div>
											<div style="display:inline-block;width:25%;">${params[0].value.free.toFixed(2) + '%'}</div>
										</div>
										<div style="margin: 5px 0px;font-size: 14px;">
											<div style="display:inline-block;width:25%;">可扩展</div>
											<div style="display:inline-block;width:50%;">${params[0].value.extMB}</div>
											<div style="display:inline-block;width:25%;">${params[0].value.ext.toFixed(2) + '%'}</div>
										</div>`;
			        	return htmlTips;
			        }
			    },
			    legend: {},
			    grid: {
			        left: '3%',
			        right: '11%',
			        bottom: '3%',
			        containLabel: true
			    },
			    yAxis:  {
			        type: 'value',
			        name: '占比/%',
			        max:100
			    },
			    xAxis: {
			        type: 'category',
			        name: '表空间',
			        show:false
			    },
			    dataset:{
			    	dimensions:['name','table','index','lob','other','free','ext'],
			    	source:this.source
			    },
			    series: [
			    	{name: '表',barWidth:this.barWidth,type: 'bar',stack: '总量'},
			        {name: '索引',barWidth:this.barWidth,type: 'bar',stack: '总量'},
			        {name: 'LOB',barWidth:this.barWidth,type: 'bar',stack: '总量'},
			        {name: '其他',barWidth:this.barWidth,type: 'bar',stack: '总量'},
			        {name: '剩余',barWidth:this.barWidth,type: 'bar',stack: '总量'},
			        {name: '可扩展',barWidth:this.barWidth,type: 'bar',stack: '总量'}
			    ]
			};
			myStackedBar.setOption(option);
			window.addEventListener("resize", () => { myStackedBar.resize();});
		},
		fetchData(){
			getTabelSpaceApi(this.$store.state.inspection.reportInfo.batch_id).then((res) => {
				if(res.status === 200){
					let dataArray = res.data,
						len = dataArray.length;
					if(len <= 10){
						this.barWidth = '30%'
					}else if(len > 10 && len <= 20){
						this.barWidth = '50%'
					}
					for(let i=0;i<len;i++){
						let _obj = {
							name:dataArray[i].tablespace_name,
							table:(dataArray[i].table_bytes * 100 / dataArray[i].max_bytes),
							index:(dataArray[i].index_bytes * 100 / dataArray[i].max_bytes),
							lob:(dataArray[i].lob_bytes * 100 / dataArray[i].max_bytes),
							other:(dataArray[i].other_bytes * 100 / dataArray[i].max_bytes),
							free:(dataArray[i].free_bytes * 100 / dataArray[i].max_bytes),
							ext:(dataArray[i].ext_bytes * 100 / dataArray[i].max_bytes),
							tableMB:this.bytesTransform(dataArray[i].table_bytes),
							indexMB:this.bytesTransform(dataArray[i].index_bytes),
							lobMB:this.bytesTransform(dataArray[i].lob_bytes),
							otherMB:this.bytesTransform(dataArray[i].other_bytes),
							freeMB:this.bytesTransform(dataArray[i].free_bytes),
							extMB:this.bytesTransform(dataArray[i].ext_bytes)
						}
						this.source.push(_obj);
					}
					this.drawStackedBar();
				}
			})
		},
		//bytes to MB/GB
		bytesTransform(bytes){
			let bytesTranformed = bytes / (1024*1024);
			bytesTranformed = (bytesTranformed >= 1024) 
							? (bytesTranformed / 1024).toFixed(2) + "GB" 
							: (bytesTranformed).toFixed(2) + "MB";
			return bytesTranformed;
		}
	},
	mounted(){
		this.fetchData();
	}
}
</script>
<style scoped lang="stylus" rel="stylesheet">
</style>