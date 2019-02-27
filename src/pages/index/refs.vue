<template>
<section>
			<div>$refs绑定方便操作DOM</div>
			<input type="text" id="999" ref="yahoo" value="bingo" style="border: 1px solid gray;"/>
			<div ref='cat' class="senses">
				<ul class="sense">
					<li>11</li>
					<li>22</li>
				</ul>
			</div>
			<div class='frames' ref="stars">ref减少dom操作</div>
			<Button type="primary" @click="light">Primary</Button>
			<!-- 子组件refs -->
			<moon :datas="coin" ref="play"></moon>
			<Button type="warning" @click="gift">ref调用子组件数据和方法</Button>
</section>
</template>

<script>
import moon from "./components/title.vue";
	export default{
		components: {moon},
		data(){
			return{
				coin: {count: 999},
			}
		},
		methods:{
			light(){
				alert(this.$refs.yahoo.id);//获取属性值,标志位置
				//方法一:
				// var frames = document.getElementsByClassName('frames')[0];
				//相当于方法二:
				var frames = this.$refs.stars;
				console.log(frames);

				var far = this.$refs.cat.innerHTML;
				//相当于
				// var far = document.getElementsByClassName('senses')[0].innerHTML;
				
				frames.innerHTML += far;
			},
			gift(){
				this.$refs.play.idea = "ref改变子组件数据";
				//触动子组件方法
				this.$refs.play.secretRef();
			}
		},
	}
</script>

<style>
	.senses{height: 30px;}
	.sense li{width: 60px;height: 30px;background: deeppink;float: left;margin-left: 3px;
	text-align: center;line-height: 30px;color: white;}
	.frames{width: 200px;height: 80px;border: 1px solid red;padding-top: 3px;box-sizing: border-box;}
</style>