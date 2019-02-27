<template>
	<div style="width: 100%;">
		<div v-if="flower">mounted:实例挂载后</div>
		<div ref='echarts01' style="width: 600px;height: 500px;background-color:white;margin: 0 auto;"></div>
	</div>
</template>

<script>
	import echarts from 'echarts'
	export default{
		data(){
		return{}
		},
		props: ['flower'],
		mounted:function(){ // 组件挂载  ==》 上来就显示 使用 表格插件
			this.echartEx();
		},
		methods: {
			echartEx(){
				//  echarts  ==>  1. echarts.init 初始化一个表格 2.表格的配置项
				// this.$refs.名字 ==》 标记的标签
						echarts.dispose(this.$refs.echarts01);
						var mychart01=echarts.init(this.$refs.echarts01);
						mychart01.setOption({
						tooltip : {
							formatter: "{a} <br/>{b} : {c}%"
						},
						toolbox: {
							feature: {
								restore: {},
								saveAsImage: {}
							}
						},
						series: [
							{
								name: '颜值',
								type: 'gauge',
								detail: {formatter:'{value}%'},
								data: [{value: 50, name: '完成率'}]
							}
						]
						})
			},
		}
	
	
	}
</script>

<style>
</style>