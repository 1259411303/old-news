<template>
	<section>
		<!--房间属性弹出窗-->
		<Modal v-model="modal1" width="750" title="房间属性">
							<div class="popups_open">
								<div class="popups_content">
										<div class="popups_content_type">
											<div class="popups_content_type_left">
												<span>房间类型:</span>
											</div>
											<div class="popups_content_type_right">
												<span v-for="(item,index) in popups_type">
												<Button style="width: 80px;margin-right: 25px;" :class="{'ivu-btn-primary':item.active}" @click="room_type_li(index)">{{item.label}}</Button>
												</span>
											</div>
										</div>
										<div class="popups_content_people">
											<div class="popups_content_people_left">
												<span>容纳人数:</span>
											</div>
											<div class="popups_content_people_right">
												<span v-for="(item,index) in popups_people">
												<Button style="width: 80px;margin-right: 25px;" :class="{'ivu-btn-primary':item.active}" @click="popups_people_select(index)">{{item.label}}</Button>
												</span>
											</div>
										</div>
										<div class="popups_content_room">
											<div class="popups_content_room_left">
												<span>房间监控:</span>
											</div>
											<div class="popups_content_room_right">
													<Input v-model="room_attribute[2].monitor_ip" placeholder="硬盘录像机ip地址" style="width: 165px"></Input>
													<Input v-model="room_attribute[2].monitor_number" placeholder="摄像头频道号码" style="width: 120px;margin-left: 22px;"></Input>
											</div>
										</div>
										<div class="popups_content_equipment">
											<div class="popups_content_equipment_left">
												<span>智能设备:</span>
											</div>
											<div class="popups_content_equipment_right">
													<Button type="ghost" style="width: 80px;">灯光</Button>
													<Input v-model="room_attribute[3].lighting_ip" placeholder="控制器IP" style="width: 165px;margin-left: 5px;"></Input>
													<Button type="ghost" style="width: 80px;margin-left: 10px;">空调</Button>
													<Input v-model="room_attribute[3].air_conditioner_ip" placeholder="控制器IP" style="width: 165px;margin-left: 5px;"></Input>
													<br />
													<Button type="ghost" style="width: 80px;margin-top: 10px;">电源</Button>
													<Input v-model="room_attribute[3].power_supply_ip" placeholder="控制器IP" style="width: 165px;margin-left: 5px;margin-top: 10px;"></Input>
													<Button type="ghost" style="width: 80px;margin-left: 10px;margin-top: 10px;">多媒体</Button>
													<Input v-model="room_attribute[3].multi_media_ip" placeholder="控制器IP" style="width: 165px;margin-left: 5px;margin-top: 10px;"></Input>
											</div>
										</div>
								</div>
							</div>
			<div slot="footer">
					<div class="popups_footer">
						<div class="popups_footer_left"><span>请根据实际情况，配置房间信息</span></div>
						<div class="popups_footer_right">
							<Button type="primary" @click="determine()">确定</Button>
						</div>
					</div>
			</div>
		</Modal>
	</section>
</template>

<script>
	var tempValue = '';
	var oldValue = '';
	export default{
		data(){
			return{
				modal1: false,
				popups_type: [{label:'课室',active:false},{label:'实验室',active:false},{label:'办公室',active:false},{label:'仓库',active:false},{label:'其他',active:false}],
				popups_people: [{label:'小于10人',active:false},{label:'10-20人',active:false},{label:'20-50人',active:false},{label:'50-100人',active: false},{label:'大于100人',active:false}],
				room_attribute: [
				{room_type: [],record: ''},
				{room_people: '',record: ''},
				{monitor_ip: '',monitor_number: ''},
				{lighting_ip: '',air_conditioner_ip: '',power_supply_ip: '',multi_media_ip: ''}
				],
				transmit: '',
			}
		},
		mounted: function() {
			this.event();
		},
		watch:{
            room_attribute:{
            	handler(curVal,oldVal){
            		var ipArr = ['monitor_ip','monitor_number','lighting_ip','air_conditioner_ip','power_supply_ip','multi_media_ip'];
            		for(var i=0;i<ipArr.length;i++){
						var k = 2;
						if(i>=2){
							k = 3;
						}else{
							k = 2;
						}
	            			if(curVal[k][ipArr[i]] != oldValue[k][ipArr[i]]){
		            			var monitorArr = curVal[k][ipArr[i]].split('');
			            		if(monitorArr[monitorArr.length-1] != '.'){
			            			var oneArr = curVal[k][ipArr[i]].split('.');
			            			var monitorJoin = oneArr.join('');
			            			if(isNaN(monitorJoin)){
										this.info_ip();
									}
			            		}
	            				
	            				for(var j=0;j<ipArr.length;j++){
	            					oldValue[k][ipArr[j]] = curVal[k][ipArr[j]];
	            				}
	            			}
            	}

　　　　　　　　　　},
　　　　　　　　　　deep:true
            }
        },
		methods:{
			event(){
				oldValue = [
				{room_type: []},
				{room_people: ''},
				{monitor_ip: '',monitor_number: ''},
				{lighting_ip: '',air_conditioner_ip: '',power_supply_ip: '',multi_media_ip: ''}
				]
			},
			//房间属性
			room(response,value){
				this.transmit = value;
				this.modal1 = true;
					//清空
					this.room_attribute[0].room_type = [];
					this.room_attribute[1].room_people = '';
					this.room_attribute[2].monitor_ip = '';
					this.room_attribute[2].monitor_number = '';
					this.room_attribute[3].lighting_ip = '';
					this.room_attribute[3].air_conditioner_ip = '';
					this.room_attribute[3].power_supply_ip = '';
					this.room_attribute[3].multi_media_ip = '';
					for(var i=0;i<this.popups_type.length;i++){
						this.popups_type[i].active = false;
					}
					for(var i=0;i<this.popups_people.length;i++){
						this.popups_people[i].active = false
					}
					//取窗口数据
					if(this.transmit != true){
						this.room_true(response);
					}else{
						this.room_true(response);
					}
					var contentArr = [];
					for(var i=0;i<this.popups_type.length;i++){
						contentArr.push(this.popups_type[i].label)
					}
					for(var i=0;i<contentArr.length;i++){
						for(var j=0;j<this.room_attribute[0].room_type.length;j++){
							if(this.room_attribute[0].room_type[j] == contentArr[i]){
								this.popups_type[i].active = true;
							}
						}
					}
					var peopleArr = [];
					for(var i=0;i<this.popups_people.length;i++){
						peopleArr.push(this.popups_people[i].label);
					}
					for(var i=0;i<peopleArr.length;i++){
							if(this.room_attribute[1].room_people == peopleArr[i]){
								this.popups_people[i].active = true;
							}
					}
			},
			//传值数据处理
			room_true(response){
					this.room_attribute[0].room_type = response[0].room_type;
					this.room_attribute[1].room_people = response[1].room_people;
					this.room_attribute[2].monitor_ip = response[2].monitor_ip;
					this.room_attribute[2].monitor_number = response[2].monitor_number;
					this.room_attribute[3].lighting_ip = response[3].lighting_ip;
					this.room_attribute[3].air_conditioner_ip = response[3].air_conditioner_ip;
					this.room_attribute[3].power_supply_ip = response[3].power_supply_ip;
					this.room_attribute[3].multi_media_ip = response[3].multi_media_ip;
			},
			//弹出窗确定
			determine() {
				this.modal1 = false;
				var room_index_val = this.room_index;
				if(this.transmit != true){
					this.$parent.room_accept(this.room_attribute,false);	
				}else{
					this.$parent.room_accept(this.room_attribute,this.transmit);	
				}
				this.transmit = '';
			},
			//房间类型
			room_type_li(index){
				for(var i=0;i<this.popups_type.length;i++){
					this.popups_type[index].active = !this.popups_type[index].active;
				}
				this.room_attribute[0].room_type = [];
				for(var i=0;i<this.popups_type.length;i++){
					if(this.popups_type[i].active == true){
						this.room_attribute[0].room_type.push(this.popups_type[i].label);
						this.room_attribute[0].record = i;
					}
				}
			},
			//房间人数
			popups_people_select(index){
				for(var i=0;i<this.popups_people.length;i++){
					if(i != index){
						this.popups_people[i].active = false;
					}else{
						this.popups_people[index].active = !this.popups_people[index].active
					}
				}
				this.room_attribute[1].room_people = '';
				if(this.popups_people[index].active == true){
					this.room_attribute[1].room_people = this.popups_people[index].label;
					this.room_attribute[1].record = index;
				}
			},
			info () {
                this.$Message.info('内容不能为空');
           },
           info_ip () {
                this.$Message.info('格式不对');
           },
		}
	}
</script>

<style>
	@import url("./css/fangjian.css");
</style>