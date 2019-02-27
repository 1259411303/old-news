<template>
	<div>
		<div>watch观察数据为字符串或组，每键都在监听，可以用来搜索框里显示后台提示数据
			<br/>watch的三种写法
		</div>
<!--　　//观察数据为字符串或数组-->
　　 <input v-model="example0"/>
　　 <input v-model="example1"/>
<!--　　/当单观察数据examples2为对象时，如果键值发生变化，为了监听到数据变化，需要添加deep:true参数-->
　　 <input v-model="example2.inner0"/>
	</div>
</template>

<script>
　　 export default {
　　　　　　data(){
　　　　　　　　return {
　　　　　　　　　　example0:"",
　　　　　　　　　　example1:"",
　　　　　　　　　　example2:{
　　　　　　　　　　　　inner0:1,
　　　　　　　　　　　　innner1:99
　　　　　　　　　　}
　　　　　　　　}
　　　　　　},
　　　　　　watch:{
　　　　　　　　example0(curVal,oldVal){
　　　　　　　　　　console.log(curVal,oldVal);
				   console.log(typeof curVal);
　　　　　　　　},
　　　　　　　　example1:'a',//值可以为methods的方法名
　　　　　　　　example2:{
　　　　　　　　　//注意：当观察的数据为对象或数组时，curVal和oldVal是相等的，因为这两个形参指向的是同一个数据对象
　　　　　　　　　　handler(curVal,oldVal){
　　　　　　　　　　　　console.log(curVal,oldVal)
　　　　　　　　　　},
　　　　　　　　　　deep:true
　　　　　　　　}
　　　　　　},
　　　　　　methods:{
　　　　　　　　a(curVal,oldVal){
　　　　　　　　　　console.log(curVal,oldVal)
　　　　　　　　}
　　　　　　}
    }
</script>

<style>
	input{border: 1px solid blue;}
</style>