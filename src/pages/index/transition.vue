<template>
<section>
	twenty-four
	<!--transition 的封装组件-->
	<!--https://cn.vuejs.org/v2/guide/transitions.html-->
	<div id="demo">
  <button v-on:click="show = !show">
    Toggle
  </button>
  <transition name="fade">
    <p v-if="show">hello</p>
  </transition>
</div>
</section>
</template>

<script>
	export default{
		data(){
			return{
				show: true,
			}
		},
		methods:{
			
		}
	}
</script>

<style>
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>