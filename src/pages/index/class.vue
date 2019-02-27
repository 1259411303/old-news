<template>
<section>
	<!-- v-bind等于: -->
	<!-- 属性绑定class -->
	<div :class="{active:isActive}">vue class</div>
	<div v-bind:class="classObject">vue classObject</div>
	<div v-bind:class="[arrClass1,arrClass2]">vue arrClass</div>
	<!--数组与对象写法-->
	<div v-bind:class="[{ active: isActive }, arrClass1]">lljj</div>
	<!--属性绑定style-->
	<div v-bind:style="{ color: styleColor, fontSize: styleSize}">vue style</div>
	<div v-bind:style="styleObject">vue styleObject</div>
	<div v-bind:style="[styleWing,styleLose]">vue arrStyle</div>
	<!-- a链接 -->
	<a :href="link">百度链接</a>
	<a href="/images/myw3schoolimage.jpg" download="w3logo">vue下载</a>	
	<!-- 根据后台返回不同的类 -->
	<div>
		<ul v-for="item in payData">
			<li :class="[btnClass(item.value)]">{{item.name}}</li>
		</ul>
	</div>
	<div :style="{color: (styleNum == 20)?'blue':'red'}">Success</div>
</section>
</template>

<script>
	export default{
		data(){
			return{
				isActive: true,
				classObject: {
				    active: false,
				    danger: true
				},
				arrClass1:'like',
				arrClass2:'river',
				styleColor:'red',
				styleSize:'20px',
				styleObject:{
					color: 'blue',
					fontSize: '34px'
				},
				styleWing:{color:'orange'},
				styleLose:{fontSize:'26px'},
				link:'http://www.baidu.com',
				payData: [{id: 1,name: '类一按钮',value: 10},{id: 2,name: '类二按钮',value: 20},{id: 3,name: '类三按钮',value: 30}],
				styleNum: 20,

				
			}
		},
		methods: {
			btnClass(value){
				if(value == 10||value == 30){
					return 'returnClassA'
				}else if(value == 20){
					return 'returnClassB'
				}

			},
		}
		
		
	}
</script>

<style>
.returnClassA{
	width: 100px;
	height: 40px;
	background: rgb(206, 102, 120);
}
.returnClassB{
	width: 120px;
	height: 40px;
	background: blueviolet;
}
</style>