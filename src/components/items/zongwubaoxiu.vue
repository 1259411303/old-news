<template>
	<section class="box">
			<div class="head_list">
				<ul>
					<li>
						<Icon type="ios-box" size='40'></Icon>
					</li>
					<li>请填写你的信息化报修信息</li>
				</ul>
				<Button type="ghost" style="float: right;margin-right: 20px;margin-top: 6px;" @click="addRepairShow"><Icon type="plus"></Icon>添加报修</Button>
			</div>
			<div class="content">
				<table>
					<tr>
						<td v-for="item in table_header">{{item}}</td>
					</tr>
					<tr v-show="add_repair">
						<td><Button type="error" @click="cancel">取消</Button></td>
						<td @click="repairContent">
									<Poptip placement="right-start" trigger="hover">
										<span>点击选择报修内容</span>
										<div class="poptip_api" slot="content">
						                	{{custom_receive}}
						                </div>
									</Poptip>
						</td>
						<td @click="repairPosition">
									<Poptip placement="right-start" trigger="hover">
										<span>点击选择报修页面</span>
										<div class="poptip_api" slot="content">
						                	{{position_receive}}
						                </div>
									</Poptip>
						</td>
						<td>--</td>
						<td>--</td>
						<td><Button type="success" @click="send">发送报修</Button></td>
					</tr>
					<tr v-for="item in repair_data">
						<td>{{item.repair_order}}</td>
						<td>{{item.repair_content}}</td>
						<td>{{item.repair_position}}</td>
						<td>{{item.commit_time}}</td>
						<td>{{item.admissibility_time}}</td>
						<td>{{item.repair_state}}</td>
					</tr>
				</table>
			</div>

		<!--报修内容弹窗-->
		<Modal v-model="modal1" width="650" title="王利民老师的信息化报修情况">
				<div class="popups_open">
					<div class="popups_content">
						<div class="content_custom">
							<div class="content_custom_left">自定义情况</div>
							<div class="content_custom_input">
								<Input v-model="custom_input" placeholder="请输入你的信息化报修内容" style="width: 470px" @click="customClick"></Input>
							</div>
						</div>
						<div class="content_computer">
								计算机
						</div>
						<div class="content_computer_li">
							<ul>
								<li v-for="(item,index) in content_computer" @click="computer(index)" :class="{'select_information':item.active}">{{item.label}}</li>
							</ul>
						</div>
						<div class="content_network">
								网络
						</div>
						<div class="content_network_li">
							<ul>
								<li v-for="(item,index) in content_network" @click="network(index)" :class="{'select_information':item.active}">{{item.label}}</li>
							</ul>
						</div>
						<div class="content_other">
								其他
						</div>
						<div class="content_other_li">
							<ul>
								<li v-for="(item,index) in content_other" @click="other(index)" :class="{'select_information':item.active}">{{item.label}}</li>
							</ul>
						</div>
					</div>
					
				</div>
			
			
			<div slot="footer">
					<div class="popups_footer">
						<Button type="primary" @click="determine()">确定</Button>
					</div>
			</div>
		</Modal>
		
		<!--报修位置弹窗-->
		<Modal v-model="modal2" width="750" title="报修位置">
				<div class="popups_position_open">
					
					<div class="popups_position_content">
						<div class="popups_position_content_architecture">
							<ul>
								<li v-for="(item,index) in architecture_data" :class="{'ivu-btn-primary':item.active}" @click="architectureEvent(index)">{{item.architecture_name}}</li>
							</ul>
						</div>
						<div class="popups_position_content_floor" v-show="content_floor">
							<ul>
								<li v-for="(item,index) in floor_data" :class="{'ivu-btn-primary':item.active}" @click="floorEvent(index)">{{item.floor_name}}</li>
							</ul>
						</div>
						<div class="popups_position_content_room" v-show="content_room">
							<div class="room_frame">
								<div class="room_frame_top">
									<span style="color: red;">{{linkage_information}}</span>房间列表
								</div>
								<div class="room_frame_bottom">
									<span v-for="(item,index) in room_data">
									<Button style="width: 68px;margin-left: 5px;margin-bottom: 5px;" :class="{'ivu-btn-primary':item.active}" @click="roomEvent(index)">{{item.room_name}}</Button>
									</span>
								</div>
							</div>
						</div>
					</div>
					
				</div>
			
			<div slot="footer">
				<div class="popups_position_footer">
						<div class="popups_position_footer_left"><span>{{hint_information}}</span></div>
							<div class="popups_position_footer_right">
								<Button type="primary" @click="determinePosition()">确定</Button>
							</div>
					</div>
			</div>
		</Modal>
	</section>
</template>

<script>
	var pageJson = [
	{id: 1,repair_order: '1',repair_content: '上不了外网',repair_position: '教务处302室',commit_time: '2018-3-29',admissibility_time: '2018-4-1',repair_state: '0'},
	{id: 2,repair_order: '2',repair_content: '打印机卡纸',repair_position: '教务处302室',commit_time: '2018-3-29',admissibility_time: '2018-4-1',repair_state: '0'},
	{id: 3,repair_order: '3',repair_content: '投影机开不了',repair_position: '教务处302室',commit_time: '2018-3-29',admissibility_time: '2018-4-1',repair_state: '0'},
	{id: 4,repair_order: '4',repair_content: '上不了外网',repair_position: '教务处302室',commit_time: '2018-3-29',admissibility_time: '2018-4-1',repair_state: '0'},
	{id: 5,repair_order: '5',repair_content: '上不了外网',repair_position: '教务处302室',commit_time: '2018-3-29',admissibility_time: '2018-4-1',repair_state: '0'},
	]
	var repair_position = {
		architecture: [
			{id:'1',architecture_name: '教学楼',active: true,count_color: true},
			{id:'2',architecture_name: '实验楼',active: false,count_color: true},
			{id:'3',architecture_name: '行政楼',active: false,count_color: true},
			{id:'4',architecture_name: '饭堂',active: false,count_color: true},
		],
		floor: {
				'1':[
				{id:'1a',floor_name: '一楼',active: false,count_color: true},
				{id:'2a',floor_name: '二楼',active: false,count_color: true},
				{id:'3a',floor_name: '三楼',active: false,count_color: true}
				],
				'2':[
				{id:'1b',floor_name: '四楼',active: false,count_color: true},
				{id:'2b',floor_name: '五楼',active: false,count_color: true},
				{id:'3b',floor_name: '六楼',active: false,count_color: true},
				],
				'3':[
				{id:'1c',floor_name: '七楼',active: false,count_color: true},
				{id:'2c',floor_name: '八楼',active: false,count_color: true},
				{id:'3c',floor_name: '九楼',active: false,count_color: true},
				]
		},
		room: {
				'1a':[
				{id:'11a',room_name: '101室',active: false,count_color: true},
				{id:'22a',room_name: '102室',active: false,count_color: true},
				{id:'33a',room_name: '103室',active: false,count_color: true}
				],
				'2a':[
				{id:'11b',room_name: '201室',active: false,count_color: true},
				{id:'22b',room_name: '202室',active: false,count_color: true},
				{id:'33b',room_name: '203室',active: false,count_color: true},
				],
				'3a':[
				{id:'11c',room_name: '301室',active: false,count_color: true},
				{id:'22c',room_name: '302室',active: false,count_color: true},
				{id:'33c',room_name: '303室',active: false,count_color: true},
				],
				'1b':[
				{id:'11d',room_name: '401室',active: false,count_color: true},
				{id:'22d',room_name: '402室',active: false,count_color: true},
				{id:'33d',room_name: '403室',active: false,count_color: true}
				],
				'2b':[
				{id:'11e',room_name: '501室',active: false,count_color: true},
				{id:'22e',room_name: '502室',active: false,count_color: true},
				{id:'33e',room_name: '503室',active: false,count_color: true},
				],
				'3b':[
				{id:'11f',room_name: '601室',active: false,count_color: true},
				{id:'22f',room_name: '602室',active: false,count_color: true},
				{id:'33f',room_name: '603室',active: false,count_color: true},
				],
				'1c':[
				{id:'11g',room_name: '701室',active: false,count_color: true},
				{id:'22g',room_name: '702室',active: false,count_color: true},
				{id:'33g',room_name: '703室',active: false,count_color: true}
				],
				'2c':[
				{id:'11h',room_name: '801室',active: false,count_color: true},
				{id:'22h',room_name: '802室',active: false,count_color: true},
				{id:'33h',room_name: '803室',active: false,count_color: true},
				],
				'3c':[
				{id:'11i',room_name: '901室',active: false,count_color: true},
				{id:'22i',room_name: '902室',active: false,count_color: true},
				{id:'33i',room_name: '903室',active: false,count_color: true},
				],
		},
	}
	export default{
		data(){
			return{
				table_header: ['报修订单','报修内容','报修位置','提交时间','受理时间','状态'],
				add_repair: false,
				repair_data: '',
				modal1: false,
				modal2: false,
				architecture_data: '',
				floor_data: '',
				room_data: '',
				architecture_id: '',
				floor_id: '',
				content_floor: false,
				content_room: false,
				hint_information: '请选择建筑',
				linkage_information: '',
				architecture_index_record: '',
				dateTime: '',
				content_computer: [{label:'发出异响',active: false},{label:'文件打不开',active: false},{label:'系统很卡',active: false},{label:'开不了机',active: false},{label:'中毒了',active: false},{label: '其他',active: false}],
				content_network: [{label: '上不了外网',active: false},{label: '共享不了',active: false},{label: '下载速度慢',active: false}],
				content_other: [{label: '其他情况',active: false},{label:'其他情况',active: false},{label:'其他情况',active: false}],
				custom_input: '',
				custom_receive: '空',
				position_receive: '空',
			}
		},
		beforeMount:function(){
			
		},
		mounted:function(){
			this.getJson();
			this.setDate();
		},
		methods:{
			getJson(){
				this.repair_data = pageJson;
				this.architecture_data = repair_position.architecture;
				console.log(this.architecture_data);
			},
			//添加报修信息
			addRepairShow(){
				this.add_repair = !this.add_repair;
				this.custom_receive = '空';
				this.position_receive = '空';
				this.content_floor = false;
				this.content_room = false;
				this.activePackage();
				for(var i=0;i<this.architecture_data.length;i++){
					this.architecture_data[i].active = false;
				}
				this.hint_information = '请选择建筑';
			},
			//取消报修信息
			cancel(){
				this.custom_receive = '空';
				this.position_receive = '空';
				this.content_floor = false;
				this.content_room = false;
				this.activePackage();
				for(var i=0;i<this.architecture_data.length;i++){
					this.architecture_data[i].active = false;
				}
				this.hint_information = '请选择建筑';
			},
			//发送报修信息
			send(){
				if(this.custom_receive != '空'&&this.position_receive != '空'){
					this.repair_data.push({
					repair_order: this.repair_data.length+1,
					commit_time: this.dateTime,
					repair_content: this.custom_receive,
					repair_position: this.position_receive,
					})
					this.add_repair = !this.add_repair;
				}else{
					this.info();
				}
				
			},
			//报修情况弹窗
			repairContent(){
				this.modal1 = true;
			},
			//计算机
			computer(index){
				this.activePackage();
				this.content_computer[index].active = true;
			},
			//网络
			network(index){
				this.activePackage();
				this.content_network[index].active = true;
			},
			//其他
			other(index){
				this.activePackage();
				this.content_other[index].active = true;
			},
			//自定义事件
			customClick(){
				this.activePackage();
			},
			//active封装
			activePackage(){
				for(var i=0;i<this.content_computer.length;i++){
					this.content_computer[i].active = false;
				}
				for(var i=0;i<this.content_network.length;i++){
					this.content_network[i].active = false;
				}
				for(var i=0;i<this.content_other.length;i++){
					this.content_other[i].active = false;
				}
			},
			//报修情况确定
			determine(){
				this.modal1 = false;
				if(this.custom_input == ''){
					for(var i=0;i<this.content_computer.length;i++){
						if(this.content_computer[i].active == true){
							this.custom_receive = this.content_computer[i].label;
							console.log(this.custom_receive);
						}
					}
					for(var i=0;i<this.content_network.length;i++){
						if(this.content_network[i].active == true){
							this.custom_receive = this.content_network[i].label;
							console.log(this.custom_receive);
						}
					}
					for(var i=0;i<this.content_other.length;i++){
						if(this.content_other[i].active == true){
							this.custom_receive = this.content_other[i].label;
							console.log(this.custom_receive);
						}
					}
					
				}else{
					this.custom_receive = this.custom_input;
					console.log(this.custom_receive);
				}
			},
			//建筑事件
			architectureEvent(index){
				this.architecture_index_record = index;
				this.architecture_id = this.architecture_data[index].id;
				this.floor_data = repair_position.floor[this.architecture_id];
				for(var i=0;i<this.architecture_data.length;i++){
					this.architecture_data[i].active = false;
				}
				this.architecture_data[index].active = true;
				if(this.floor_data != undefined){
					for(var i=0;i<this.floor_data.length;i++){
						this.floor_data[i].active = false;
					}
				}
				this.content_floor = true;
				this.content_room = false;
				this.countEvent();
				this.position_receive = '';
			},
			//楼层事件
			floorEvent(index){
				this.floor_id = this.floor_data[index].id;
				this.room_data = repair_position.room[this.floor_id];
				for(var i=0;i<this.floor_data.length;i++){
					this.floor_data[i].active = false;
				}
				this.floor_data[index].active = true;
				this.content_room = true;
				if(this.room_data != undefined){
					for(var i=0;i<this.room_data.length;i++){
						this.room_data[i].active = false;
					}
				}
				this.countEvent();
				this.position_receive = '';
				this.linkage_information = this.architecture_data[this.architecture_index_record].architecture_name+'>'+this.floor_data[index].floor_name;
			},
			//房间事件
			roomEvent(index){
				for(var i=0;i<this.room_data.length;i++){
					this.room_data[i].active = false;
				}
				this.room_data[index].active = true;
				this.countEvent();
			},
			//提示信息
			countEvent(){
				if(this.content_floor == false&&this.content_room == false){
					this.hint_information = '请选择建筑';
				}else if(this.content_floor == true&&this.content_room == false){
					this.hint_information = '请选择楼层';
				}else if(this.content_floor == true&&this.content_room == true){
					this.hint_information = '请选择房间';
				}
				for(var i=0;i<this.room_data.length;i++){
					if(this.room_data[i].active == true){
						this.hint_information = this.architecture_data[this.architecture_index_record].architecture_name + this.room_data[i].room_name;
						this.position_receive = this.hint_information;
					}
				}
			},
			//保修位置弹窗
			repairPosition(){
				this.modal2 = true;
			},
			//报修位置确定
			determinePosition(){
				this.modal2 = false;
			},
			//报修日期
			setDate(){
				var myDate = new Date();
				var months = myDate.getMonth() + 1;
				var timer = myDate.getFullYear() + '-' + months + '-' + myDate.getDate()+"/";
				var mytime = myDate.toTimeString().split('G')[0];
				var timeDeal = mytime.split(':');
				var timeValue = timeDeal[0] + ":" + timeDeal[1];
				this.dateTime = timer + timeValue;
				console.log(this.dateTime);
			},
			//全局提示
			info () {
                this.$Message.info('请填好报修信息');
           	},
			
			
		}
	}
</script>

<style>
@import './css/zongwubaoxiu.css';
</style>