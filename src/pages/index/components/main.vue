<template>
 	<section id="goods-manage">
		<section id="goods-list">
			<div class="goods-list" v-for="(item,index) in datas">
				<div class="goods-a">
					<img style="width: 100%;height: 100%" :src="item.thumb">     
				</div>
				<ul class="goods-b">
					<li class="name">{{item.title}}</li>
					<li class="price"><span>￥</span>{{item.price}}</li>
					<li class="info">
						<font>库存：{{item.stock}}</font>
						<font>销量：{{item.virtual_sales}}</font>
						<span>
						<yd-icon class="iconfont icon-more" custom color="#666" size="1.5rem"></yd-icon>
						</span>
						<div class="more" v-show="item.edit_active">
							<ul>
								<li>
									<yd-icon class="iconfont icon-edit" custom color="#fff" size="1.125rem"></yd-icon>
									<span>编辑</span>
								</li>
								<li>
									<yd-icon class="iconfont icon-delete" custom color="#fff" size="1.125rem"></yd-icon>
									<span>删除</span>
								</li>
							</ul>
							<div class="icon"><yd-icon class="iconfont icon-down" custom size="1.5rem"></yd-icon></div>
						</div>
					</li>
					
				</ul>
			</div>
		</section>
	</section>   
</template>

<script>
export default {
    props: ['datas'],
    data(){
        return{
        }
    },
}
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
#goods-manage{
	#goods-list{
		.goods-list{
			background-color: #fff;
			padding:0.625rem 0;
			display: flex;
			border-bottom:solid 0.0625rem #ebebeb;
			.goods-a{
				width:5rem;
				height:5rem;
				background-color: #ccc;
				margin-left:0.625rem;
			}
			.goods-b{
				margin:0 0.875rem;
				width:16.0625rem;
				text-align: left;
				line-height: 1.25rem;
				.name{
					height:2.5rem;
					font-size:14px;
				}
				.price{
					color:#f15353;
					font-size:16px;
					span{
						font-size:12px;
					}
				}
				.info{
					position: relative;
					color:#8c8c8c;
					font-size:12px;
					font{
						margin-right:1.25rem;
					}
					.icon-more{
						position: absolute;
						right:0;
						z-index: 2;
					}
					.more{
						background: rgba(51,51,51,0.9);
						border-radius: 0.25rem;
						color:#f0f0f0;
						width:5.5rem;
						position: absolute;
						right:0;
						top:-2.75rem;
						ul{
							display: flex;
							justify-content: center;
							li{
								flex:1;
								text-align: center;
								i{
									display: block;
									margin-top:0.125rem;
								}
							}
						}
						.icon{
							position: absolute;
							right:0;
							top:2.25rem;
							i{
								color:rgba(51,51,51,0.9); 
							}
						}
					}
				}
			}
		}
		.goods-list:last-child{
			border:none;
		}
	}
	
}
</style>


