<template>
	<section style="margin-left: 20px;">
		<ul>
			<li v-for ='item in sing'>{{item.name}}</li>
		</ul>
		<hr />
		<ul>
			<li v-for ='item in list'>{{item.name}}</li>
		</ul>
		<button @click='fancy'>想象</button>
		<button @click='note'>笔记</button>

		<div>
			<Input v-model="phone" placeholder="请输入手机" style="width: 300px" />
			<Button type="warning" @click="mainStream">登录</Button>
		</div>
		<Button type="error" @click="browser">环境判断</Button>
		
	</section>
</template>

<script>
	// 引入数据或方法
	import {sing,list,flame,trys,summer,park} from '@/common/sea'
	export default{
		data(){
			return{
				sing,
				list,
				phone: '',
			}
		},
		methods:{
			fancy(){
				alert(flame())
				alert(trys())
				alert(summer())
			},
			note(){
				alert(park.render)
				alert(park.skill())
			},
			//封装公用方法
			mainStream(){
				if(this.$fancy.isEmpty(this.phone)){
					this.$Message.error('请输入手机');
					return;
				}
				if(this.$fancy.isMoblie(this.phone)){
					this.$Message.error('请输入正确的手机');
					return;
				}
			},
			//环境判断
			browser(){
				if(this.$fancy.isEnvironment()){
					this.$Message.info('是谷歌浏览器');
				}else{
					this.$Message.info('不是谷歌浏览器');
				}
			}
		}
	}
</script>

<style  scoped>

</style>