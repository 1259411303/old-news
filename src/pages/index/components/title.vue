<template>
 	<section id="goods-manage">
		<section id="release-goods">
			<div class="release-a">
				<yd-icon class="iconfont icon-block" custom color="#f15353" size="1.5rem"></yd-icon>
			</div>
			<span>商品数量：{{datas.count}}     <span style="margin-left: 50px;">{{idea}}</span></span>
			<div class="release-b">
				<span>发布商品</span>
			</div>
		</section>   
 	</section>
</template>

<script>
export default {
    props: ['datas'],
    data(){
        return{
			idea: 'ref-改变'
        }
    },
    methods: {
		secretRef(){
			this.$Message.info('ref触动了子组件方法');
		}
    }
}
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
#goods-manage{
	#release-goods{
		background-color: #fff;
		display: flex;
		font-size:16px;
		position: relative;
		height:3rem;
		line-height: 3rem;
		border-bottom:solid 0.0625rem #ebebeb;
		.release-a{
			width:3rem;
			height:3rem;
		}
		.release-b{
			position: absolute;
			right:0.875rem;
			top:0.6875rem;
			font-size:14px;
			background-color: #f15353;
			height:1.625rem;
			line-height: 1.625rem;
			padding:0 0.625rem;
			display: block;
			border-radius: 0.8125rem;
			color:#fff;
		}
	}
}
</style>

