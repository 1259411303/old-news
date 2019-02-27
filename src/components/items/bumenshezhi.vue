<template>
	<section class="box">
			<div class="head_list">
				<ul>
					<li>
						<Icon type="ios-box" size='40'></Icon>
					</li>
					<li>广州中学<span style="color: red;">{{campus[0]}}</span>场地设置</li>
				</ul>
			</div>
			<div class="content">
				<div class="content_left">
					<Alert show-icon style="width: 200px;margin-top: 10px;font-size: 14px;">请点击校区</Alert>
					<ul>
						<li v-for="(item,index) in campus_data" @click="campusEvent(index)" :class="{'ivu-btn-primary':item.active}">
							{{item.name}}(<span  :class="{'count_color':item.count_color}">{{campus_count[index]}}</span>个部门)
						</li>
					</ul>
				</div>
				
				<div class="content_right">
					<div class="content_right_header">
						<Button type="ghost" style="float: right;margin-right: 47px;margin-top: 10px;" @click="saveSort">保存排序</Button>
						<Button type="ghost" style="float: right;margin-right: 8px;margin-top: 10px;" @click="addDepartment()"><Icon type="plus"></Icon>添加部门</Button>
					</div>
					<div class="content_right_table">
						<table>
							<tr>
								<th v-for="item in department_header">{{item}}</th>
							</tr>
							<tr v-show="add_active">
								<!--<td v-for="item in department_add">{{item}}</td>-->
								<td><Button type="error" @click="addCancelDepartment">取消</Button></td>
								<td><Input type="text" style="width: 135px;height: 32px;" placeholder="请输入部门名称" v-model="table_input"></Input>
								<td>点击关联</td>
								<td>点击关联</td>
								<td>
								<Poptip placement="right-start" trigger="hover">
										<span @click="room(true)" style="width: 135px;height: 47px;display: inline-block;">点击设置属性</span>
										<div class="poptip_api" slot="content">
						                	<div>房间类型:<span style="margin-left: 10px;"><span v-for="item in room_attribute[0].room_type">{{item}}&nbsp;,</span></span></div>
						                	<div>容纳人数:<span style="margin-left: 10px;">{{room_attribute[1].room_people}}</span></div>
						                	<div>房间监控:<span style="margin-left: 10px;">{{room_attribute[2].monitor_ip}},{{room_attribute[2].monitor_number}}</span></div>
						                	<div>智能设备:
						                		<div style="margin-left: 40px;">灯光:<span style="margin-left: 10px;">{{room_attribute[3].lighting_ip}}</span></div>
						                		<div style="margin-left: 40px;">空调:<span style="margin-left: 10px;">{{room_attribute[3].air_conditioner_ip}}</span></div>
						                		<div style="margin-left: 40px;">电源:<span style="margin-left: 10px;">{{room_attribute[3].power_supply_ip}}</span></div>
						                		<div style="margin-left: 40px;">多媒体:<span style="margin-left: 10px;">{{room_attribute[3].multi_media_ip}}</span></div>
						                	</div>
						                </div>
								</Poptip>
								</td>
								<td><Button type="success" @click="addDataDetermine()">确定</Button></td>
							</tr>
							<tr v-for="(item,index) in department_data">
								<td>{{item.room_code}}</td>
								<td>
									<span v-show="item.name_active">{{item.department_name}}</span>
									<Input v-show="item.edit_active" size="small" style="width: 100px;" :placeholder="item.department_name" v-model="item.department_name"></Input>
								</td>
								<td>{{item.superior_department}}</td>
								<td>{{item.associated_room}}</td>
								<td>
									<Poptip placement="right-start" trigger="hover">
										<span  @click="room(index)" style="width: 155px;height: 47px;display: inline-block;">{{item.department_setting}}</span>
										<div class="poptip_api" slot="content">
						                	<div>房间类型:<span style="margin-left: 10px;" v-if="item.room_attribute!=''"><span v-for="val in item.room_attribute[0].room_type">{{val}}&nbsp;,</span></span></div>
						                	<div>容纳人数:<span style="margin-left: 10px;" v-if="item.room_attribute!=''">{{item.room_attribute[1].room_people}}</span></div>
						                	<div>房间监控:<span style="margin-left: 10px;" v-if="item.room_attribute!=''">{{item.room_attribute[2].monitor_ip}},{{item.room_attribute[2].monitor_number}}</span></div>
						                	<div>智能设备:
						                		<div style="margin-left: 40px;">灯光:<span style="margin-left: 10px;" v-if="item.room_attribute!=''">{{item.room_attribute[3].lighting_ip}}</span></div>
						                		<div style="margin-left: 40px;">空调:<span style="margin-left: 10px;" v-if="item.room_attribute!=''">{{item.room_attribute[3].air_conditioner_ip}}</span></div>
						                		<div style="margin-left: 40px;">电源:<span style="margin-left: 10px;" v-if="item.room_attribute!=''">{{item.room_attribute[3].power_supply_ip}}</span></div>
						                		<div style="margin-left: 40px;">多媒体:<span style="margin-left: 10px;" v-if="item.room_attribute!=''">{{item.room_attribute[3].multi_media_ip}}</span></div>
						                	</div>
						                </div>
									</Poptip>
								</td>
								<td>
									<Button type="primary" v-if="index!=0" @click="moveData(index)">上移</Button>
									<Button type="primary" v-if="index!=department_data.length-1" @click="downData(index)">下移</Button>
									<Button v-bind="{'type':item.type_active}" @click="room_edit(index)">{{item.edit_text}}</Button>
									<Button type="error" @click="deleteData(index)">删除</Button>
								</td>
							</tr>
						</table>
					</div>
				</div>
			</div>

		<roomProperties ref="roomProperties"></roomProperties>
	</section>
</template>

<script>
var campus = [
	{id:'1a',name: '凤凰校区',active: false,count_color: true},
	{id:'2a',name: '五山校区',active: false,count_color: true},
	{id:'3a',name: '天河校区',active: false,count_color: true}
]
var department = {
	'1a':[
		{ id: '1', room_code: '0101', department_name: '教务处', superior_department: '无', associated_room: '行政楼-303室', department_setting: '点击设置属性', operation: '删除',room_attribute: [{room_type: []},{room_people: ''},{monitor_ip: '',monitor_number: ''},{lighting_ip: '',air_conditioner_ip: '',power_supply_ip: '',multi_media_ip: ''}],name_active: true,edit_active: false,edit_text: '编辑',type_active: 'warning'},
		{ id: '2', room_code: '0102', department_name: '德育处', superior_department: '无', associated_room: '行政楼-303室', department_setting: '点击设置属性', operation: '删除',room_attribute: [{room_type: []},{room_people: ''},{monitor_ip: '',monitor_number: ''},{lighting_ip: '',air_conditioner_ip: '',power_supply_ip: '',multi_media_ip: ''}],name_active: true,edit_active: false,edit_text: '编辑',type_active: 'warning'},
		{ id: '3', room_code: '0103', department_name: '总务处', superior_department: '无', associated_room: '行政楼-303室', department_setting: '点击设置属性', operation: '删除',room_attribute: [{room_type: []},{room_people: ''},{monitor_ip: '',monitor_number: ''},{lighting_ip: '',air_conditioner_ip: '',power_supply_ip: '',multi_media_ip: ''}],name_active: true,edit_active: false,edit_text: '编辑',type_active: 'warning'},
		{ id: '4', room_code: '0104', department_name: '办公室', superior_department: '无', associated_room: '行政楼-303室', department_setting: '点击设置属性', operation: '删除',room_attribute: [{room_type: []},{room_people: ''},{monitor_ip: '',monitor_number: ''},{lighting_ip: '',air_conditioner_ip: '',power_supply_ip: '',multi_media_ip: ''}],name_active: true,edit_active: false,edit_text: '编辑',type_active: 'warning'},
		{ id: '5', room_code: '0105', department_name: '校医院', superior_department: '无', associated_room: '行政楼-303室', department_setting: '点击设置属性', operation: '删除',room_attribute: [{room_type: []},{room_people: ''},{monitor_ip: '',monitor_number: ''},{lighting_ip: '',air_conditioner_ip: '',power_supply_ip: '',multi_media_ip: ''}],name_active: true,edit_active: false,edit_text: '编辑',type_active: 'warning'},
		{ id: '6', room_code: '0106', department_name: '心理室', superior_department: '无', associated_room: '行政楼-303室', department_setting: '点击设置属性', operation: '删除',room_attribute: [{room_type: []},{room_people: ''},{monitor_ip: '',monitor_number: ''},{lighting_ip: '',air_conditioner_ip: '',power_supply_ip: '',multi_media_ip: ''}],name_active: true,edit_active: false,edit_text: '编辑',type_active: 'warning'},
	],
	'2a':[
		{ id: '1', room_code: '0101', department_name: '人事室', superior_department: '无', associated_room: '行政楼-303室', department_setting: '点击设置属性', operation: '删除',room_attribute: [{room_type: []},{room_people: ''},{monitor_ip: '',monitor_number: ''},{lighting_ip: '',air_conditioner_ip: '',power_supply_ip: '',multi_media_ip: ''}],name_active: true,edit_active: false,edit_text: '编辑',type_active: 'warning'},
		{ id: '2', room_code: '0102', department_name: '图书馆', superior_department: '无', associated_room: '行政楼-303室', department_setting: '点击设置属性', operation: '删除',room_attribute: [{room_type: []},{room_people: ''},{monitor_ip: '',monitor_number: ''},{lighting_ip: '',air_conditioner_ip: '',power_supply_ip: '',multi_media_ip: ''}],name_active: true,edit_active: false,edit_text: '编辑',type_active: 'warning'},
		{ id: '3', room_code: '0103', department_name: '党委', superior_department: '无', associated_room: '行政楼-303室', department_setting: '点击设置属性', operation: '删除',room_attribute: [{room_type: []},{room_people: ''},{monitor_ip: '',monitor_number: ''},{lighting_ip: '',air_conditioner_ip: '',power_supply_ip: '',multi_media_ip: ''}],name_active: true,edit_active: false,edit_text: '编辑',type_active: 'warning'},
		{ id: '4', room_code: '0104', department_name: '教务处', superior_department: '无', associated_room: '行政楼-303室', department_setting: '点击设置属性', operation: '删除',room_attribute: [{room_type: []},{room_people: ''},{monitor_ip: '',monitor_number: ''},{lighting_ip: '',air_conditioner_ip: '',power_supply_ip: '',multi_media_ip: ''}],name_active: true,edit_active: false,edit_text: '编辑',type_active: 'warning'},
	],
	'3a':[
		{ id: '1', room_code: '0101', department_name: '教务处', superior_department: '无', associated_room: '行政楼-303室', department_setting: '点击设置属性', operation: '删除',room_attribute: [{room_type: []},{room_people: ''},{monitor_ip: '',monitor_number: ''},{lighting_ip: '',air_conditioner_ip: '',power_supply_ip: '',multi_media_ip: ''}],name_active: true,edit_active: false,edit_text: '编辑',type_active: 'warning'},
		{ id: '2', room_code: '0102', department_name: '总务处', superior_department: '无', associated_room: '行政楼-303室', department_setting: '点击设置属性', operation: '删除',room_attribute: [{room_type: []},{room_people: ''},{monitor_ip: '',monitor_number: ''},{lighting_ip: '',air_conditioner_ip: '',power_supply_ip: '',multi_media_ip: ''}],name_active: true,edit_active: false,edit_text: '编辑',type_active: 'warning'},
		{ id: '3', room_code: '0103', department_name: '德育处', superior_department: '无', associated_room: '行政楼-303室', department_setting: '点击设置属性', operation: '删除',room_attribute: [{room_type: []},{room_people: ''},{monitor_ip: '',monitor_number: ''},{lighting_ip: '',air_conditioner_ip: '',power_supply_ip: '',multi_media_ip: ''}],name_active: true,edit_active: false,edit_text: '编辑',type_active: 'warning'},
	],
}
import roomProperties from './fangjian.vue';
	export default {
		components: {
			roomProperties: roomProperties
		},
		name: "one",
		data() {
			return {
				campus: ['凤凰校区'],
				add_active: false,
				campus_active: false,
				campus_input: '',
				table_input: '',
				campus_data: '',
				department_data: '',
				campus_record: 0,
				campus_count: [],
				department_header: ['部门编码','部门名称','上级部门','关联房间','部门设置','操作'],
				department_add: ['取消','','点击关联','点击关联','点击设置属性','确定'],
				campus_id: '',
				room_index: '',
				room_attribute: [
				{room_type: []},
				{room_people: ''},
				{monitor_ip: '',monitor_number: ''},
				{lighting_ip: '',air_conditioner_ip: '',power_supply_ip: '',multi_media_ip: ''}
				],
			}
		},
		beforeMount: function() {
//			this.getJson();
		},
		mounted: function() {
//			this.getJson();
//			this.pageJson();
		},
		created:function(){
			this.getJson();
		},
		methods:{
			//获取数据
			getJson() {
				var that = this;
				var xueXiaoId = 14;
				var parameter = {xuexiao_id: xueXiaoId};
				this.$http.post('http://47.106.77.12/api/Guanli/getXiaoqu',parameter).then(function(response){
					console.log(response);
					campus = [];
					for(var i=0;i<response.data.data.length;i++){
						campus.push({
							id: response.data.data[i].id,
							name: response.data.data[i].mingcheng,
							active: false,
							count_color: true,
							bianhao: response.data.data[i].bianhao,
						})
					}
					that.campus_data = campus;
					that.campusEvent(0);
//					that.pageJson();
				}).catch(function(err){
					alert(err);
				})	
			},
			//数据加载
			pageJson(){
				this.campus_data = campus;
				this.campus_id = campus[0].id;
				this.department_data = department[campus[0].id];
				this.campus_data[0].active = true;
				this.campus_data[0].count_color = false;
			},
			//添加部门
			addDepartment(){
				this.add_active = !this.add_active;
				this.room_attribute = '';
				this.room_attribute = [
				{room_type: []},
				{room_people: ''},
				{monitor_ip: '',monitor_number: ''},
				{lighting_ip: '',air_conditioner_ip: '',power_supply_ip: '',multi_media_ip: ''}
				]
			},
			//上移
			moveData(index){
				var newArr = [];
				for(var i=0;i<this.department_data.length;i++){
					if(i<index-1){
						newArr.push(this.department_data[i]);
					}else if(i == index-1){
						var department_temp = this.department_data[i+1].room_code;
						this.department_data[i+1].room_code = this.department_data[i].room_code;
						newArr.push(this.department_data[i+1]);
					}else if(i == index){
						this.department_data[i-1].room_code = department_temp;
						newArr.push(this.department_data[i-1]);
					}else if(i>=index+1){
						newArr.push(this.department_data[i]);
					}
				}
				this.department_data = newArr;
			},
			//下移
			downData(index){
				var newArr = [];
				for(var i=0;i<this.department_data.length;i++){
					if(i<=index-1){
						newArr.push(this.department_data[i]);
					}else if(i == index){
						var department_temp = this.department_data[i+1].room_code;
						this.department_data[i+1].room_code = this.department_data[i].room_code;
						newArr.push(this.department_data[i+1]);
					}else if(i == index+1){
						this.department_data[i-1].room_code = department_temp;
						newArr.push(this.department_data[i-1]);
					}else if(i>index+1){
						newArr.push(this.department_data[i]);
					}
				}
				this.department_data = newArr;
			},
			//表格删除
			deleteData(index){
				department[campus[this.campus_record].id] = this.department_data;
//				department[campus[this.campus_record].id].splice(index,1);
				this.department_data = department[campus[this.campus_record].id];
//				this.department_data.splice(index,1);
				
				var bumen_id = this.department_data[index].id;
				var that = this;
				var parameter = {bumen_id: bumen_id};
				this.$http.post('http://47.106.77.12/api/Guanli/delBumen',parameter).then(function(response){
					console.log(response);
					that.department_data.splice(index,1);
				}).catch(function(err){
					alert(err);
				})	
				
			},
			//添加校区确定
			addCampusDetermine(){
				this.campus_data.push({
					id: this.campus_data.length+1,
					name: this.campus_input,
				})
				department.push([]);
//				this.pageJson();
			},
			//设置部门取消
			addCancelDepartment(){
				this.table_input = '';
				this.add_active = false;
			},
			//添加部门确定
			addDataDetermine(){
				var table_input_val = this.table_input;
				if(table_input_val != ''){
					var haoArr = [];
					var hao = this.campus_data[this.campus_record].bianhao + '04';
					if(this.department_data.length < 10){
						var num = '0' + this.department_data.length;
					}else{
						var num = this.department_data.length + 1;
					}
					var haoStr = hao + num;
					
				var xuexiao_id = 14;
				var xiaoqu_id = this.campus_data[this.campus_record].id;
				var bianhao = haoStr;
				var up_bumen_id = this.department_data[0].up_bumen_id;
				var up_bumen_mingcheng = this.department_data[0].up_bumen_mingcheng;
				var mingcheng = table_input_val;
				var fangjian_id_str = this.department_data[0].fangjian_id_str;
				var fangjian_mingcheng_str = this.department_data[0].fangjian_mingcheng_str;
				var lingdao_id_str = this.department_data[0].lingdao_id_str;
				var lingdao_name_str = this.department_data[0].lingdao_name_str;
				var parameter = {xuexiao_id:xuexiao_id,xiaoqu_id: xiaoqu_id,bianhao: bianhao,up_bumen_id: up_bumen_id,up_bumen_mingcheng: up_bumen_mingcheng,mingcheng: mingcheng,fangjian_id_str: fangjian_id_str,fangjian_mingcheng_str: fangjian_mingcheng_str,lingdao_id_str: lingdao_id_str,lingdao_name_str: lingdao_name_str};
				var that = this;
				this.$http.post('http://47.106.77.12/api/Guanli/addBumen',parameter).then(function(response){
					console.log(response);
					var setId = response.data.has_add;
					that.department_data.push({
						id: setId,
						room_code: haoStr,
						department_name: table_input_val,
						superior_department: '点击关联',
						associated_room: '点击关联',
						department_setting: '点击设计属性',
						operation: '',
						room_attribute: [{room_type: []},{room_people: ''},{monitor_ip: '',monitor_number: ''},{lighting_ip: '',air_conditioner_ip: '',power_supply_ip: '',multi_media_ip: ''}],
						name_active: true,
						edit_active: false,
						edit_text: '编辑',
						type_active: 'warning',
					})
					
					that.table_input = '';
					that.add_active = !that.add_active;
//					console.log(response.data.has_add);
				}).catch(function(err){
					alert(err);
				})
				
				}
				
			},
			//校园事件
			campusEvent(index){
				this.campus_record = index;
				this.campus_id = this.campus_data[index].id;
				var that = this;
				var xiaoqu_id = that.campus_id;
				var parameter = {xiaoqu_id: xiaoqu_id};
				this.$http.post('http://47.106.77.12/api/Guanli/getBumen',parameter).then(function(response){
					console.log(response);
					var departmentArr = [];
//					console.log(response.data.data);
					for(var k=0;k<response.data.data.length;k++){
						departmentArr.push({
							id: response.data.data[k].id,
							room_code: response.data.data[k].bianhao,
							department_name: response.data.data[k].mingcheng,
							superior_department: '无',
							associated_room: '行政楼-303室',
							department_setting: '点击设置属性',
							operation: '删除',
							room_attribute: [{room_type: []},{room_people: ''},{monitor_ip: '',monitor_number: ''},{lighting_ip: '',air_conditioner_ip: '',power_supply_ip: '',multi_media_ip: ''}],
							name_active: true,
							edit_active: false,
							edit_text: '编辑',
							type_active: 'warning',
							xuexiao_id: response.data.data[k].xuexiao_id,
							xiaoqu_id: response.data.data[k].xiaoqu_id,
							up_bumen_id: response.data.data[k].up_bumen_id,
							up_bumen_mingcheng: response.data.data[k].up_bumen_mingcheng,
							fangjian_id_str: response.data.data[k].fangjian_id_str,
							fangjian_mingcheng_str: response.data.data[k].fangjian_mingcheng_str,
							lingdao_id_str: response.data.data[k].lingdao_id_str,
							lingdao_name_str: response.data.data[k].lingdao_name_str,
						})
					}
					department[that.campus_id] = departmentArr;
					that.department_data = department[that.campus_id];
					
					for(var i=0;i<that.campus_data.length;i++){
						that.campus_data[i].active = false;
						that.campus_data[i].count_color = true;
					}
					that.campus_data[index].active = true;
					that.campus_data[index].count_color = false;
					that.campusCountPackage();
				}).catch(function(err){
					alert(err);
				})			
			},
			//房间属性
			room(index){
				if(index != true){
					this.room_index = index;
					var response = department[this.campus_id][this.room_index].room_attribute;
					var value = false;
					this.$refs.roomProperties.room(response,value);
				}else{
					var response = this.room_attribute;
					var value = true;
					this.$refs.roomProperties.room(response,value);
				}
			},
			//房间属性接收方法
			room_accept(response,value){
				if(value != true){
					department[this.campus_id][this.room_index].room_attribute[0].room_type = response[0].room_type;
					department[this.campus_id][this.room_index].room_attribute[1].room_people = response[1].room_people;
					department[this.campus_id][this.room_index].room_attribute[2].monitor_ip = response[2].monitor_ip;
					department[this.campus_id][this.room_index].room_attribute[2].monitor_number = response[2].monitor_number;
					department[this.campus_id][this.room_index].room_attribute[3].lighting_ip = response[3].lighting_ip;
					department[this.campus_id][this.room_index].room_attribute[3].air_conditioner_ip = response[3].air_conditioner_ip;
					department[this.campus_id][this.room_index].room_attribute[3].power_supply_ip = response[3].power_supply_ip;
					department[this.campus_id][this.room_index].room_attribute[3].multi_media_ip = response[3].multi_media_ip;
				}else{
					this.room_attribute[0].room_type = response[0].room_type;
					this.room_attribute[1].room_people = response[1].room_people;
					this.room_attribute[2].monitor_ip = response[2].monitor_ip;
					this.room_attribute[2].monitor_number = response[2].monitor_number;
					this.room_attribute[3].lighting_ip = response[3].lighting_ip;
					this.room_attribute[3].air_conditioner_ip = response[3].air_conditioner_ip;
					this.room_attribute[3].power_supply_ip = response[3].power_supply_ip;
					this.room_attribute[3].multi_media_ip = response[3].multi_media_ip;
				}
			},
			//房间编辑
			room_edit(index){
				if(this.department_data[index].name_active == true){
					this.department_data[index].name_active = false;
					this.department_data[index].edit_active = true;
					this.department_data[index].edit_text = '确定';
					this.department_data[index].type_active = 'success';
				}else{
					this.department_data[index].name_active = true;
					this.department_data[index].edit_active = false;
					this.department_data[index].edit_text = '编辑';
					this.department_data[index].type_active = 'warning';
					//后台交接
					var bumen_id = this.department_data[index].id;
					var bianhao = this.department_data[index].room_code;
					var up_bumen_id = this.department_data[index].up_bumen_id;
					var up_bumen_mingcheng = this.department_data[index].up_bumen_mingcheng;
					var mingcheng = this.department_data[index].department_name;
					var fangjian_id_str = this.department_data[index].fangjian_id_str;
					var fangjian_mingcheng_str = this.department_data[index].fangjian_mingcheng_str;
					var lingdao_id_str = this.department_data[index].lingdao_id_str;
					var lingdao_name_str = this.department_data[index].lingdao_name_str;
					var that = this;
					var parameter = {bumen_id: bumen_id,bianhao: bianhao,up_bumen_id: up_bumen_id,up_bumen_mingcheng: up_bumen_mingcheng,mingcheng: mingcheng,fangjian_id_str: fangjian_id_str,fangjian_mingcheng_str: fangjian_mingcheng_str,lingdao_id_str: lingdao_id_str,lingdao_name_str: lingdao_name_str};
					this.$http.post('http://47.106.77.12/api/Guanli/saveBumen',parameter).then(function(response){
						console.log(response);
					}).catch(function(err){
						alert(err);
					})	
				}
			},
			//保存排序
			saveSort(){
				var newId = [];
				var haoArr = [];
				for(var i=0;i<this.department_data.length;i++){
					if(i != this.department_data.length-1){
						newId.push(this.department_data[i].id + ',');
						haoArr.push(this.department_data[i].room_code + ',');
					}else{
						newId.push(this.department_data[i].id);
						haoArr.push(this.department_data[i].room_code);
					}
					
				}
				var idStr = newId.join('');
				var haoStr = haoArr.join('');
//				console.log(idStr);
//				console.log(haoStr);
				var that = this;
				var bumen_id_str = idStr;
				var bianhao_str = haoStr;
				var parameter = {bumen_id_str: bumen_id_str,bianhao_str: bianhao_str};
				this.$http.post('http://47.106.77.12/api/Guanli/saveBumenBianhao',parameter).then(function(response){
					console.log(response);
				}).catch(function(err){
					alert(err);
				})	
			},
			//计数
			campusCountPackage(){
				this.campus_count[this.campus_record] = department[this.campus_id].length;
			},
		}

	}	
</script>

<style>
@import './css/bumenshezhi.css';
</style>