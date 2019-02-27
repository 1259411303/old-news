<template>
    <section>
        <!-- 注意-注意:谷歌浏览器最小字体为12像素，但手机上没限制
        因此，想用10字体像素，得谷歌设置-自定义字体为10以下 -->
        <!-- rem设置看本项目index.html -->
        <div class="adapt">移动端px转rem</div>
    </section>
</template>

<script>
export default {
    
}
</script>

<style>
/* 375的设计图量像素除以16 */
/* 345/10=34.5
    40/10=4
    15/10=1.5 
    margin得转rem,除了百分比，横屏的都要自适应
*/
    .adapt{
        width: 34.5rem;
        height: 4rem;
        margin-left: 1.5rem;
        background: plum;
        text-align: center;
        line-height: 4rem;
        color: white;
        font-size: 1.6rem;
        border-radius: 4px;
        border: 1px solid red;
    }
    /* 移动端像素都要转rem */
</style>


