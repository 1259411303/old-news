<template>
<section>hello
    

<!-- <div class="leftnav" @click.stop='numberLeftRent(index)'>-</div>
<input type="number" class="shownum" v-model.lazy='item.total' @blur="changeCountRent(item.id,item.total,index)">
<div class="rightnav" @click.stop='numberRightRent(index)'>+</div> -->

</section>   

</template>

<script>
export default {
    data(){
        return{

        }
    },
    methods: {
        //改变数量 2
		changeCountRent(rentGoods,_num,index){
			console.log(rentGoods);

			if(_num<0){
				Toast("商品数量不能为负数");
				// rentGoods.total=1;
				this.rentGoods[index].total = 1;
				return;
			}

			let that = this;
			let json = { id: rentGoods, num: _num, "i": this.fun.getKeyByI(), "type": this.fun.getTyep() };



			$http.get('member.member-cart.updateNumV2', json, "").then(function (response) {
				console.log(response)
				
				if (response.result == 1) {
					// if (_num > 0) {
					// 	that.addNumberView(rentGoods);
					// } else {
					// 	that.deleteNumberView(rentGoods);
					// }
					that.changeNumberViewRent(rentGoods,_num);

				} else {
					Toast(response.msg);
					// rentGoods.total=1;
					that.rentGoods[index].total = 1;
				}

			}, function (response) {
				console.log(response)
			});
		},
		numberLeftRent(index){
			// console.log(this.rentGoods[index].total);
			this.rentGoods[index].total = Number(this.rentGoods[index].total) - 1;
			if(this.rentGoods[index].total<=0){
				Toast("商品数量不能为负数或零");
				this.rentGoods[index].total = 1;
				return;
			}
			this.changeCountRent(this.rentGoods[index].id,this.rentGoods[index].total);
		},
		numberRightRent(index){
			// console.log(this.rentGoods[index].total);
			this.rentGoods[index].total = Number(this.rentGoods[index].total) + 1;
			if(this.rentGoods[index].total>=51){
				Toast("该商品每周最多可购买50件");
				this.rentGoods[index].total = 1;
				return;
			}
			this.changeCountRent(this.rentGoods[index].id,this.rentGoods[index].total);
		},

		changeNumberViewRent(rentGoods){
			for (var i = 0; i < this.rentCheckList.length; i++) {
				if (rentGoods == this.rentCheckList[i].id) {
					if (this.rentCheckList[i].total > 0) {
						this.rentCountTotalPrice();//计算总价格
						return;
					}
				}
			}
		},


    },
}
</script>

<style>

</style>
