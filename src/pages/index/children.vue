<template>
<section>
	<button @click='weep()'>child</button>
	<!--css的tab切换-->
	<div class="nav" >
				<ul>
					<li>
						<div class="navName">
							<span>用户管理</span>
						</div>
						<div class="navItem ">
							display one
						</div>
					</li>
					<li>
						<div class="navName">
							<span>课程管理</span>
						</div>
					   <div class="navItem ">
							display two
						</div>
					</li>
				</ul>
	</div>

		
</section>
</template>

<script>
	export default{
		data(){
			return{
				son:'$emit子组件数据'
			}
		},
		methods:{
			weep(){
				this.$emit('purple',this.son)
				alert(this.trys)
			}
		},
		props:['trys']
	}
</script>

<style>
  ul li {list-style: none;}
  ul {margin: 0;padding: 0;}
  .nav {width: 100%;height: 50px;background: #4444e0;position: relative;}
  .nav ul {overflow: hidden;margin: 0 auto;width: 100%;}

  .nav ul li .navName {font-size: 16px;float: left;padding: 0 30px;color: whitesmoke;text-align: center;
  line-height: 50px;cursor: pointer;position: relative;}
  .nav ul li .navName::before, .nav ul li .navName::after {content: "";width: 8px;height: 8px;
    position: absolute;transition: .3s ease;opacity: 0;}
  .nav ul li .navName::before {top: 20px;left: 66px;border-top: 2px solid #ffffff;border-left: 2px solid #ffffff;}
  .nav ul li .navName::after {bottom: 20px;right: 66px;border-bottom: 2px solid #ffffff;border-right: 2px solid #ffffff;}
  .nav ul li:hover > .navName::before {top: 2px;left: 2px;opacity: 1;}
  .nav ul li:hover > .navName::after {bottom: 2px;right: 2px;opacity: 1;}


  .nav .navItem {position: absolute;z-index: 200;top: 50px;width: 100%;height: 144px;
    background-color: white;border: 1px solid blueviolet;display: none;}
/*出现*/
  .nav ul li:hover > .navItem {display: block;}


</style>