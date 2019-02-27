<template>
<div>
	<!--用了methods与computed-->
	<Button type="warning">state:{{hobby}}</Button>
	<Button type="primary">computed:{{only}}</Button>
	<Button type="warning">state:{{countState}}</Button>
	<Button type="success" @click='addCount(30)'>matation1:{{$store.state.count}}</Button>
	<Button type="error" @click="submit">matation2:</Button>
	<Button type="info">{{ready}}:getter:{{$store.getters.ready}}</Button>
	<Button type="warning" @click="mutation">action:{{$store.state.city}}</Button>
</div>
</template>

<script>
	// import store from '@/vuex/store';//@代表'/src',看build/webpack.base.conf.js
	import {mapState,mapMutations,mapGetters,mapActions} from 'vuex'
	export default{
		data(){
			return{
			}
		},
		//路由挂在
		activated(){
			this.getJson();
		},
		methods:{
			...mapMutations(['addCount']),//mutation引入方法
			...mapActions(['mutation']),//actions引入方法
			submit(){
				this.$store.commit('submitMatations',{id: 5,city: '广州'});//调用mutation方法，并传递数据
				console.log(this.$store.state.id,this.$store.state.city);
			},
			getJson(){
				//打印computed方法
				console.log(this.hobby,this.ready,this.only);
			}
		},
		computed:{
			...mapState(['hobby']),
			...mapGetters(['ready']),
			countState(){
            	return this.$store.state.count;
			},
			only(){
				return '唯有computed的body才能用方法'
			}
		},
		// store,
	}
</script>

<style>
</style>