<template>
 <div class="content">
    <ul>
      <li v-for="(item, key, index) in items" class="animate" v-bind:key="item.id">{{item.id}}</li>
      <!-- 当前绑定值为item.id  -->
    </ul>
    <hr />
    
        <ul>
      <li v-for="(item, key, index) in items" class="animate" v-bind:key="index">{{item.id}}</li>
      <!-- 当前绑定值为index  -->
    </ul>
    
    <hr />
    
       <ul>
      <li v-for="(item, key, index) in items" class="animate" v-bind:key="key">{{item.id}}</li>
      <!-- 当前绑定值为key  -->
    </ul>
    
    <hr />
    <ul>
    	<li v-for="(item,key,index) in objects">{{item}}:{{key}}:{{index}}</li>
    </ul>
  </div>
</template>

<script>
	export default{
		data(){
			return{
						items: [
						    {
						        id: 2,
						    },
						    {
						        id: 3,
						    },
						    {
						        id: 1,
						    },
						],
						objects:{
							name:'bingo',
							age:22
						}
			}
		},
	}
</script>

<style>
</style>