<template>
	<section>
		<div class="box">
			<div class="box_header">
				<div class="box_frame">
					<ul class="box_u">
						<li v-for="item in iconData">
							<span style="position: absolute;left: 10px;top: 4px;"><Icon size="20" :color="item.color" type="android-radio-button-on"></Icon></span>
							<span style="position: absolute;left: 33px;top: 3px;">{{item.name}}</span>
						</li>
					</ul>
				</div>
			</div>
			<div class="content">
				<jibenxinxi v-if="componentActive == 1"></jibenxinxi>
				<chengji v-if="componentActive == 2"></chengji>
				<jiangxian v-if="componentActive == 3"></jiangxian>
			</div>
		</div>
	</section>
</template>

<script>
	import chengji from './chengji.vue'
	import jibenxinxi from './jibenxinxi.vue'
	import jiangxian from './jiangxian.vue'
	export default{
		components: {
			chengji,jibenxinxi,jiangxian
		},
		data(){
			return{
				componentActive: 3,
                iconData: [{id: 1,name: '录入基本信息',color: '#2d8cf0'},{id: 2,name: '录入成绩',color: ''},{id: 3,name: '录入奖项',color: ''}],
			}
		},
		methods: {
			//子组件调用事件
			mergeOpen(response){
				this.componentActive = response;
				for(var i=0;i<this.iconData.length;i++){
					this.iconData[i].color = '';
				}
				var count = Number(response) - 1;
				this.iconData[count].color = '#2d8cf0';
			}
		}
	}
</script>

<style scoped>
	.box{
		width: 100%;
		height: 700px;
	}
	.box_header{
		width: 100%;
		height: 30px;
		margin-top: 20px;
		margin-bottom: 20px;
	}
	.box_frame{
		width: 520px;
		margin: 0px auto;
	}
	.box_u{
		height: 30px;
	}
	.box_u li{
		width: 150px;
		height: 30px;
		float: left;
		padding-left: 10px;
		box-sizing: border-box;
		margin-left: 20px;
		position: relative;
	}
	.content{
		width: 100%;
		height: 630px;
	}
</style>