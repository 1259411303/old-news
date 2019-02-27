<template>
	<div class='box'>
		<button @click='frees'>parent//{{msg2}}</button>
		<div style="font-size: 30px;height: 60px;">引入vue子组件，以及数据的双向流动</div>
		<nice v-bind:trys='msg' @purple='get'></nice>
	</div>
</template>

<script>
	import nice from './children';
	export default{
		components:{nice},
		data(){
			return{
				msg:'props父组件数据',
				msg2:'原配父组件数据',
			}
		},
		
		methods:{
			get(message){
				alert('执行了父组件的事件');
				this.msg2=message;
			},
			frees(){
				alert(this.msg2);
			}
		},
		
	}
</script>

<style>

</style>