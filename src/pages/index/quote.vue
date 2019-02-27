<template>
    <section id="import_ex">
        <div class="frame">
            <ul>
                <li v-for="item in loading">{{item}}</li>
            </ul>
        </div>

        <div class="echart">
            <goods-list :flower='flower'></goods-list>
        </div>

<button class="light">
    primary
</button>

    </section>
</template>

<script>
import constroller from './js/quote_constroller.js';
export default constroller;
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
//安装scss依赖  无需配置
// npm install node-sass sass-loader -D
@import './css/quote_constroller.scss';
</style>


<style lang="less" rel="stylesheet/less" scoped>
//安装less依赖  要配置
// cnpm install less less-loader --save
// 使用:https://www.cnblogs.com/lin-dong/p/6711224.html  至  https://www.cnblogs.com/mafeng/p/7692279.html
@background: pink;
.circle{
    color: white;
}
// 运算
@div-width: 100px;
.light{
    width: @div-width;
    width: @div-width*3;    
    background: blue;
    background: @background; 
    .circle
    
}
//嵌套功能和scss一样
//函数
</style>
