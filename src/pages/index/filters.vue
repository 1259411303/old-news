<template>
<section>
	<div v-for="i in message">{{i|pain}}</div>
	<hr />
	<div>{{game|stars}}</div>
	<hr />
	<div>{{bingo|datas}}</div>
	<hr />
	<div>{{honey|add}}</div>
	<div>{{honey|add|concat}}</div>
	<hr />
	<Button type="warning" @click="deleteFilters">删除与过滤</Button>
	<Button type="success" @click="replaceModify">替换与修改</Button>
</section>
</template>

<script>
	export default{
		data(){
			return{
				message:[{id: 1,value: '棒棒糖'},{id: 2,value: '棉花糖'}],
				game: '游戏',
				bingo: Date.now(),
				honey: 12,
			}
		},
		filters:{
			pain:function(val){
				return val.id!=2?val.value:'';
			},
			stars:function(val){
				return val+"使我快乐";
			},
			datas:function(value){
				var means = new Date(value);
				return means.getFullYear();
			},
			add:function(res){
				return res+'/add';
			},
			concat:function(res){
				return res+'/concat';
			}
		},
		methods: {
			deleteFilters(){
				let arr = [];
				arr = this.message.filter(function(res,index){
					return res.id != 2;
				})
				console.log('filter数组',arr);
			},
			replaceModify(){
				let obj = {id: 3,value: '汤圆娃娃'};
				let newArr = [];
				newArr = this.message.map((res,index)=>{
					return Number(res.id) === Number(2)?obj:res;
				});
				console.log('modify',newArr);
			}
		}

	}
</script>

<style>
</style>