<template>
    <section>
        es6语法
    </section>
</template>

<script>
export default {
    data(){
        return{
            goods: [{id: 1,name: '橘子'},{id: 2,name: '苹果'},{id: 3,name: '牛奶'}],
        }
    },
    activated(){
        this.ergodic();
        this.define();
    },
    methods: {
        //定义
        define(){
            // let只在代码块内有效：
            if(true){
                let name = '笑笑'
                var age = 19;
            }
            console.log('let定义',name,age);
            //const 定义之后就相当于无法改变
            const newArr = [];
            // newArr = ['88'];
            console.log('const',newArr);
        },
        //遍历
        ergodic(){
            //js forEach
            //第一个参数是遍历的数组内容，第二个参数是对应的数组索引，第三个参数是数组本身
            this.goods.forEach(function(item,index,array){
                // document.write(item.name,index);
                console.log(item.name,index,array);
            })
            //js map
            this.goods.map(function(item,index,array){
                // document.write(item.name,index);
                console.log(item.name,index,array);
            })
            //es6 forEach
            this.goods.forEach((item,index,array)=>{
                // document.write(item.name,index);
                console.log(item.name,index,array);
            })
            //es6 map 
            this.goods.map((item,index,array)=>{
                console.log(item.name,index,array);
            })
        },
        //请求
        https(){
            //es6请求
            this.$http.get('', {}).then((response) => {

            }),(response) =>{

            }
            //es6
            setInterval(() => {

            }, 1000)
        },
    }
}
</script>

<style>

</style>
