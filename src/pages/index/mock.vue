<template>
<section>
<!--该环境只能读取static文件图片-->
	<img :src="imgUrl" />

<!--mock本地模拟数据-->
  <div class="mock">
        <div>
          <Input v-model="obj.id" placeholder="请输入id" style="width: 200px" />
          <Input v-model="obj.name" placeholder="请输入name" style="width: 200px" />
          <Input v-model="obj.content" placeholder="请输入content" style="width: 200px" />
        </div>
        <Button type="primary" @click="addList">添加</Button>
        <Button type="warning" @click="updateList">修改</Button>
  </div>
     <ul>
       <li v-for="item in list">
         id={{item.id}}_____name=:{{item.name}}_____content={{item.content}}--------<Button type="text" @click="deleteList(item.id)">删除</Button>
        </li>
     </ul>

</section>
</template>

<script>
import mock from '../../../mock/mock.js';
	export default{
		data(){
			return{
				imgUrl: '../../../static/a1.jpg',

				list: [],
				obj: {  //将添加的数据存到obj对象中
				id: 0,
				name: '',
				content: ''
				}
			}
		},
		created(){
      //查询列表数据
			this.getData();
		},
		 mounted(){
			 console.log('params++1',this.$route.params);
		 },
		 activated(){
			 console.log('params++2',this.$route.params);
       //开发环境模拟本地数据
        this.$http.get('http://localhost:8080/api/seller').then((response) => {
              console.log(response);
        })
        this.$http.get('http://localhost:8080/api/goods').then((response) => {
              console.log(response);
        })
        //mock模拟本地数据
        this.$axios.post('http://text.com').then(function(res){
            console.log('moon',res);
        });
		 },
		 methods:{
			// 查询列表数据
      getData(){
        this.$http.get('/list').then(res => {
          this.list = res.data.data;
          console.log('查询数据',this.list);
        });
      },

      // 删除列表数据
      deleteList(id){
        this.$http.post('/list',{
          params: {
           id: id
          }
        }).then(res => {
            this.list = res.data.data;
        });
      },

      // 增加列表数据
      addList(){
        this.$http.post('/listAdd',{
          params: {
            obj: this.obj
          }
        }).then(res => {
             console.log("请求成功"+res.data.data);
            this.list = res.data.data;
        });
      },

      // 修改列表数据
      updateList(){
        console.log('修改',this.obj);
        var that = this;
        this.$http.post('/listUpdate',{
          params: {
            obj: this.obj
          }
        }).then(function(res){
          that.list = res.data.data;
          console.log("请求的数据",that.list);
        });
      }

		 }
	}
</script>

<style>
	img{width: 300px;height: 300px;}
</style>