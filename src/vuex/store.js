import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);
//数据集合
const state = {
	hobby: 'hobby',
	pity: 'pick',
	count: 100,
	numbers: 200,
	id: '',
	city: '',
}
//能修改state里面的数据
const mutations={
	addCount(state,n){
		state.count+=n
	},
	submitMatations(state,params){
		state.id = params.id;
		state.city = params.city;
	}
}
//不能用箭头函数
//相当于computed里的方法
const getters = {
	ready:function(state){
		return state.numbers-=120
	}
}
//action调用mutation方法
const actions = {
	mutation(res){
		res.commit('submitMatations',{id: 6,city: '茂名'})
	}
}
//生成vuex的实例
export default new Vuex.Store({
	state,
	mutations,
	getters,
	actions,
})

