<template>
	<section>
					
					
					
					
					
	<Modal v-model="modal1" width="732" :closable="false">
		
		<div slot="header">
					
		</div>
		
			<div class="popups_content">
				<div class="activity_content_lun" @mouseover="lun_bo_over()" @mouseout="lun_bo_out()">
						<div class='lun_bo_frames'>
	    					<ul class="nav_imgs" :style="{left: lun_bo_left,width: lun_bo_width}">
	    						<li v-for="(item,index) in lun_bo_arr">
	    							<img :src="item"/>
	    						</li>
	    					</ul>
	    					<ul class="lun_bo_circle">
	    						<li v-for="(item,index) in lun_bo_circular" :class="{'circle_color':item.active}" @click="circle_event(index)">{{item.label}}</li>
	    					</ul>
						</div>
						<div class="prev" @click="prev"><Icon size='100' type="arrow-left-b"></Icon></div>
						<div class="next" @click="next"><Icon size='100' type="arrow-right-b"></Icon></div>
				</div>
			</div>
		<div slot="footer">
					
		</div>
		</Modal>
		
	
	
	
	
		
		 <Modal v-model="modal3">
        <p>Content of dialog</p>
        <div slot="footer">
        	
        </div>
    </Modal>
	</section>
</template>

<script>
	export default{
		data(){
			return{
				modal1: false,
				modal3: false,
               lun_bo_num: 0,
               lun_bo_left: '0px',
               lun_bo_width: '',
               timer: '',
               lun_bo_load: [],
               lun_bo_arr:["../../../static/1.png","../../../static/2.png","../../../static/3.png","../../../static/4.png","../../../static/5.png","../../../static/6.png"],
               lun_bo_circular: [{label:'1',active: false},{label:'2',active: false},{label:'3',active: false},{label:'4',active: false},{label:'5',active: false},{label:'6',active: false}],
			}
		},
		mounted: function(){
			//this.sowing_map_package();
		},
		methods:{
			//前
			prev(){
				this.lun_bo_num--;
				this.move();
				var response = Math.abs(this.lun_bo_num);
				this.circle_event(response);
			},
			//下
			next(){
				this.lun_bo_num++;
				this.move();
				var response = Math.abs(this.lun_bo_num);
				this.circle_event(response);
			},
			//移动事件
			move(){
				var reincarnation = this.lun_bo_arr.length;
				this.lun_bo_width = 635*reincarnation + 'px';
				if(this.lun_bo_num == reincarnation){
					this.lun_bo_num = 0;
				}
				if(this.lun_bo_num == -reincarnation){
					this.lun_bo_num = 0;
				}
				if(this.lun_bo_num < 0){
					this.lun_bo_left = this.lun_bo_num*635 + 'px';
				}else{
					this.lun_bo_left = -this.lun_bo_num*635 + 'px';
				}
			},
			//轮播图tad切换
			circle_event(index){
				for(var i=0;i<this.lun_bo_circular.length;i++){
					this.lun_bo_circular[i].active = false;
				}
				this.lun_bo_circular[index].active = true;
				this.lun_bo_num = index;
				this.move();
			},
			//定时器事件
			timer_circle(){
				this.lun_bo_num++;
				this.move();
				var response = Math.abs(this.lun_bo_num);
				this.circle_event(response);
			},
			//over事件
			lun_bo_over(){
				clearInterval(this.timer);  
			},
			//out事件
			lun_bo_out(){
				this.timer = setInterval(this.timer_circle,2000);
			},
			//轮播图切换封装
			sowing_map_package(response,index){
					if(true){
						this.modal1 = true;
						this.lun_bo_circular = [];
						this.lun_bo_arr = '';
						this.lun_bo_arr = response;
						var reincarnation = this.lun_bo_arr.length;
						this.lun_bo_width = 635*reincarnation + 'px';
						for(var i=0;i<reincarnation;i++){
							this.lun_bo_circular.push({
								label: i+1,
								active: false
							})
						}
						this.lun_bo_num = Number(index);
						this.lun_bo_circular[0].active = true;
						this.lun_bo_left = -635*index + 'px';
						clearInterval(this.timer);  
						this.timer = setInterval(this.timer_circle,2000);
					}else{
						this.modal1 = false;
						this.lun_bo_arr = [];
						this.lun_bo_circular = [];
						this.lun_bo_num = 0;
						this.lun_bo_left = '0px';
						clearInterval(this.timer);  
					}
			},
		},
	}
</script>

<style>
	@import './css/kanmeitu.css';
</style>