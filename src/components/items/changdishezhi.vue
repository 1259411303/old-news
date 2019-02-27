<template>
	<section class="box">
			<div class="head_list">
				<ul>
					<li>
						<Icon type="ios-box" size='40'></Icon>
					</li>
					<li>广州中学<span style="color: red;">{{campus[0]}}</span>场地设置</li>
					<li @click="bingo">bingo</li>
				</ul>
			</div>
			<div class="content">
				<!--campus-->
				<div class="content_campus" @click="contentCampusEvent">
					<Alert show-icon style="width: 200px;margin-top: 10px;font-size: 14px;">请点击校区</Alert>
					<ul>
						<div v-show="campus_active" class="add_campus_class">
							<input type="text" placeholder="输入校区名称" class="add_campus" v-model="campus_input"/>
							<div class="campus_determine" @click="addCampusDetermine">确定</div>
						</div>
						<li v-for="(item,index) in campus_data" @click="campusEvent(index)" :class="{'ivu-btn-primary':item.active}">{{item.name}}(<span :class="{'count_color':item.count_color}">{{item.quyu_num}}</span>个建筑)</li>
					</ul>
				</div>
				<!--architecture-->
				<div class="content_architecture" v-show="content_architecture_active" @click="contentArchitectureEvent">
					<div class="content_architecture_header">
						<Button type="ghost" style="margin-top: 10px;margin-left: 6px;" @click="add_architecture()"><Icon type="plus"></Icon>{{add_architecture_text}}</Button>
						<Button type="ghost" style="margin-top: 10px;margin-left: 5px;" @click="delete_architecture()"><Icon type="trash-a"></Icon></Icon>{{delete_building}}</Button>
					</div>
					<div class="content_architecture_bottom">
						<div class="set_architecture" v-show="add_architecture_active">
							<Input type="text" style="width: 110px;height: 32px;" placeholder="输入建筑名称" v-model="architecture_input"></Input>
							<Button size="small" style="height: 32px;" type="success" @click="addArchitectureDetermine()">确定</Button>
						</div>
						<ul>
							<li v-for="(item,index) in architecture_data" @click="architectureEvent(index)" :class="{'ivu-btn-primary':item.active}">
								<span v-show="item.name_active">{{item.name}}</span>
								<Input v-show="item.edit_active" size="small" style="width: 70px;" :placeholder="item.name" v-model="item.name"></Input>
								(<span :class="{'count_color':item.count_color}">{{item.louceng_num}}</span>个楼层)
								<!--<Checkbox size="large" style="float: right;margin-top: -2px;margin-right: 10px;" v-model="item.check_active" v-show="delete_architecture_checkbox_active"></Checkbox>-->
								<span v-show="delete_architecture_checkbox_active" style="float: right;margin-top: 7px;margin-right: 10px;" @click="delArchitecture(index,0)">
									<Icon size="20" type="close-circled"></Icon>
								</span>
								<Button size="small" style="float: right;margin-top: 7px;margin-right: 5px;" v-bind="{'type':item.type_active}" v-show="edit_architecture_active" @click="editEvent(index)">{{item.edit_text}}</Button>
							</li>
						</ul>
					</div>
				</div>
				<!--floor-->
				<div class="content_floor" v-show="content_floor_active" @click="contentFloorEvent">
					<div class="content_floor_header">
						<Button type="ghost" style="margin-top: 10px;margin-left: 6px;" @click="add_floor()"><Icon type="plus"></Icon>{{add_floor_text}}</Button>
						<Button type="ghost" style="margin-top: 10px;margin-left: 5px;" @click="delete_floor()"><Icon type="trash-a"></Icon></Icon>{{delete_select_floor}}</Button>
					</div>
					<div class="content_floor_bottom">
						<div class="set_floor" v-show="delete_floor_active">
							<Input type="text" style="width: 110px;height: 32px;" placeholder="输入楼层名" v-model="floor_input"></Input>
							<Button size="small" style="height: 32px;" type="success" @click="addFloorDetermine()">确定</Button>
						</div>
						<ul>
							<li v-for="(item,index) in floor_data" @click="floor_event(index)" :class="{'ivu-btn-primary':item.active}">
								<span v-show="item.name_active">{{item.name}}</span>
								<Input v-show="item.edit_active" size="small" style="width: 70px;" :placeholder="item.name" v-model="item.name"></Input>
								<span>(<span :class="{'count_color':item.count_color}">{{item.fangjian_num}}</span>个房间)</span>
								<!--<Checkbox size="large" style="float: right;margin-top: -2px;margin-right: 10px;" v-model="item.check_active" v-show="delete_floor_checkbox_active"></Checkbox>-->
								<span v-show="delete_floor_checkbox_active" style="float: right;margin-top: 7px;margin-right: 10px;" @click="delFloor(index,1)">
									<Icon size="20" type="close-circled"></Icon>
								</span>
								<Button size="small" style="float: right;margin-top: 7px;margin-right: 5px;" v-bind="{'type':item.type_active}" v-show="edit_floor_active" @click="editFloorEvent(index)">{{item.edit_text}}</Button>
							</li>	
						</ul>
					</div>
				</div>
				<!--房间-->
				<div class="content_room" v-show="content_room_active" @click="contentRoomEvent">
					<div class="content_room_header">
						<Button type="ghost" style="float: right;margin-right: 20px;margin-top: 10px;" @click="saveSort">保存排序</Button>
						<Button type="ghost" style="float: right;margin-right: 8px;margin-top: 10px;" @click="addDepartment()"><Icon type="plus"></Icon>添加部门</Button>
					</div>
					<div class="content_room_table">
						<table>
							<tr>
								<th v-for="item in department_header">{{item}}</th>
							</tr>
							<tr v-show="add_active">
								<td><Button type="error" @click="addCancelDepartment">取消</Button></td>
								<td><Input type="text" style="width: 100px;height: 32px;" placeholder="输入部门名" v-model="table_input"></Input></td>
						
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
									<span v-show="item.name_active">{{item.room_number}}</span>
									<Input v-show="item.edit_active" size="small" style="width: 100px;" :placeholder="item.room_number" v-model="item.room_number"></Input>
								</td>
								<td>
									<Poptip placement="right-start" trigger="hover">
										<span @click="room(index)" style="width: 135px;height: 47px;display: inline-block;">{{item.room_setting}}</span>
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
		
	<Modal v-model="modal2" width="360">
        <p slot="header" style="color:#f60;text-align:center">
            <Icon type="information-circled"></Icon>
            <span>删除确认</span>
        </p>
        <div style="text-align:center">
            <p>{{del_hint_information}}</p>
        </div>
        <div slot="footer">
            <Button type="error" size="large" long :loading="modal_loading" @click="del">确认删除</Button>
        </div>
   </Modal>
	</section>
</template>

<script>
var campus = [
	{id:'1',name: '凤凰校区',active: false,count_color: true,check_active: false,name_active: true,edit_active: false,edit_text: '编辑',type_active: 'warning'},
	{id:'2',name: '五山校区',active: false,count_color: true,check_active: false,name_active: true,edit_active: false,edit_text: '编辑',type_active: 'warning'},
	{id:'3',name: '天河校区',active: false,count_color: true,check_active: false,name_active: true,edit_active: false,edit_text: '编辑',type_active: 'warning'}
]
var architecture = {
	'1':[
	{id:'1a',name: '教学楼',check_true: '0',active: false,count_color: true,check_active: false,name_active: true,edit_active: false,edit_text: '编辑',type_active: 'warning'},
	{id:'2a',name: '实验楼',check_true: '0',active: false,count_color: true,check_active: false,name_active: true,edit_active: false,edit_text: '编辑',type_active: 'warning'},
	{id:'3a',name: '行政楼',check_true: '0',active: false,count_color: true,check_active: false,name_active: true,edit_active: false,edit_text: '编辑',type_active: 'warning'}
	],
	'2':[
	{id:'1b',name: '大礼堂',check_true: '0',active: false,count_color: true,check_active: false,name_active: true,edit_active: false,edit_text: '编辑',type_active: 'warning'},
	{id:'2b',name: '实验楼',check_true: '0',active: false,count_color: true,check_active: false,name_active: true,edit_active: false,edit_text: '编辑',type_active: 'warning'},
	{id:'3b',name: '行政楼',check_true: '0',active: false,count_color: true,check_active: false,name_active: true,edit_active: false,edit_text: '编辑',type_active: 'warning'},
	],
	'3':[
	{id:'1c',name: '食堂',check_true: '0',active: false,count_color: true,check_active: false,name_active: true,edit_active: false,edit_text: '编辑',type_active: 'warning'},
	{id:'2c',name: '实验楼',check_true: '0',active: false,count_color: true,check_active: false,name_active: true,edit_active: false,edit_text: '编辑',type_active: 'warning'},
	{id:'3c',name: '行政楼',check_true: '0',active: false,count_color: true,check_active: false,name_active: true,edit_active: false,edit_text: '编辑',type_active: 'warning'},
	]
}
var floor = {
	'1a':[
	{id:'11a',name: '七楼',check_true: '0',active: false,count_color: true,check_active: false,name_active: true,edit_active: false,edit_text: '编辑',type_active: 'warning'},
	{id:'22a',name: '六楼',check_true: '0',active: false,count_color: true,check_active: false,name_active: true,edit_active: false,edit_text: '编辑',type_active: 'warning'},
	{id:'33a',name: '五楼',check_true: '0',active: false,count_color: true,check_active: false,name_active: true,edit_active: false,edit_text: '编辑',type_active: 'warning'}
	],
	'2a':[
	{id:'11b',name: '一楼',check_true: '0',active: false,count_color: true,check_active: false,name_active: true,edit_active: false,edit_text: '编辑',type_active: 'warning'},
	{id:'22b',name: '二楼',check_true: '0',active: false,count_color: true,check_active: false,name_active: true,edit_active: false,edit_text: '编辑',type_active: 'warning'},
	{id:'33b',name: '八楼',check_true: '0',active: false,count_color: true,check_active: false,name_active: true,edit_active: false,edit_text: '编辑',type_active: 'warning'},
	],
	'3a':[
	{id:'11c',name: '十楼',check_true: '0',active: false,count_color: true,check_active: false,name_active: true,edit_active: false,edit_text: '编辑',type_active: 'warning'},
	{id:'22c',name: '十八楼',check_true: '0',active: false,count_color: true,check_active: false,name_active: true,edit_active: false,edit_text: '编辑',type_active: 'warning'},
	{id:'33c',name: '八楼',check_true: '0',active: false,count_color: true,check_active: false,name_active: true,edit_active: false,edit_text: '编辑',type_active: 'warning'},
	],
	'1b':[
	{id:'11d',name: '四楼',check_true: '0',active: false,count_color: true,check_active: false,name_active: true,edit_active: false,edit_text: '编辑',type_active: 'warning'},
	{id:'22d',name: '六楼',check_true: '0',active: false,count_color: true,check_active: false,name_active: true,edit_active: false,edit_text: '编辑',type_active: 'warning'},
	{id:'33d',name: '五楼',check_true: '0',active: false,count_color: true,check_active: false,name_active: true,edit_active: false,edit_text: '编辑',type_active: 'warning'}
	],
	'2b':[
	{id:'11e',name: '九楼',check_true: '0',active: false,count_color: true,check_active: false,name_active: true,edit_active: false,edit_text: '编辑',type_active: 'warning'},
	{id:'22e',name: '二楼',check_true: '0',active: false,count_color: true,check_active: false,name_active: true,edit_active: false,edit_text: '编辑',type_active: 'warning'},
	{id:'33e',name: '八楼',check_true: '0',active: false,count_color: true,check_active: false,name_active: true,edit_active: false,edit_text: '编辑',type_active: 'warning'},
	],
	'3b':[
	{id:'11f',name: '十二楼',check_true: '0',active: false,count_color: true,check_active: false,name_active: true,edit_active: false,edit_text: '编辑',type_active: 'warning'},
	{id:'22f',name: '十八楼',check_true: '0',active: false,count_color: true,check_active: false,name_active: true,edit_active: false,edit_text: '编辑',type_active: 'warning'},
	{id:'33f',name: '八楼',check_true: '0',active: false,count_color: true,check_active: false,name_active: true,edit_active: false,edit_text: '编辑',type_active: 'warning'},
	],
	'1c':[
	{id:'11g',name: '八楼',check_true: '0',active: false,count_color: true,check_active: false,name_active: true,edit_active: false,edit_text: '编辑',type_active: 'warning'},
	{id:'22g',name: '六楼',check_true: '0',active: false,count_color: true,check_active: false,name_active: true,edit_active: false,edit_text: '编辑',type_active: 'warning'},
	{id:'33g',name: '五楼',check_true: '0',active: false,count_color: true,check_active: false,name_active: true,edit_active: false,edit_text: '编辑',type_active: 'warning'}
	],
	'2c':[
	{id:'11h',name: '三楼',check_true: '0',active: false,count_color: true,check_active: false,name_active: true,edit_active: false,edit_text: '编辑',type_active: 'warning'},
	{id:'22h',name: '二楼',check_true: '0',active: false,count_color: true,check_active: false,name_active: true,edit_active: false,edit_text: '编辑',type_active: 'warning'},
	{id:'33h',name: '八楼',check_true: '0',active: false,count_color: true,check_active: false,name_active: true,edit_active: false,edit_text: '编辑',type_active: 'warning'},
	],
	'3c':[
	{id:'11i',name: '五楼',check_true: '0',active: false,count_color: true,check_active: false,name_active: true,edit_active: false,edit_text: '编辑',type_active: 'warning'},
	{id:'22i',name: '十八楼',check_true: '0',active: false,count_color: true,check_active: false,name_active: true,edit_active: false,edit_text: '编辑',type_active: 'warning'},
	{id:'33i',name: '八楼',check_true: '0',active: false,count_color: true,check_active: false,name_active: true,edit_active: false,edit_text: '编辑',type_active: 'warning'},
	],
}
var department = {
	'11a':[
		{ id: '1', room_code: '0101', room_number: '101室',room_setting: '点击设置属性', operation: '删除',
		room_attribute: [{room_type: [],record: ''},{room_people: '',record: ''},{monitor_ip: '',monitor_number: ''},{lighting_ip: '',air_conditioner_ip: '',power_supply_ip: '',multi_media_ip: ''}]},
		{ id: '2', room_code: '0102', room_number: '102室',room_setting: '点击设置属性', operation: '删除',
		room_attribute: [{room_type: [],record: ''},{room_people: '',record: ''},{monitor_ip: '',monitor_number: ''},{lighting_ip: '',air_conditioner_ip: '',power_supply_ip: '',multi_media_ip: ''}]},
		{ id: '3', room_code: '0103', room_number: '103室',room_setting: '点击设置属性', operation: '删除',
		room_attribute: [{room_type: [],record: ''},{room_people: '',record: ''},{monitor_ip: '',monitor_number: ''},{lighting_ip: '',air_conditioner_ip: '',power_supply_ip: '',multi_media_ip: ''}]},
		{ id: '4', room_code: '0104', room_number: '104室',room_setting: '点击设置属性', operation: '删除',
		room_attribute: [{room_type: [],record: ''},{room_people: '',record: ''},{monitor_ip: '',monitor_number: ''},{lighting_ip: '',air_conditioner_ip: '',power_supply_ip: '',multi_media_ip: ''}]},
		{ id: '5', room_code: '0105', room_number: '105室',room_setting: '点击设置属性', operation: '删除',
		room_attribute: [{room_type: [],record: ''},{room_people: '',record: ''},{monitor_ip: '',monitor_number: ''},{lighting_ip: '',air_conditioner_ip: '',power_supply_ip: '',multi_media_ip: ''}]},
		{ id: '6', room_code: '0106', room_number: '106室',room_setting: '点击设置属性', operation: '删除',
		room_attribute: [{room_type: [],record: ''},{room_people: '',record: ''},{monitor_ip: '',monitor_number: ''},{lighting_ip: '',air_conditioner_ip: '',power_supply_ip: '',multi_media_ip: ''}]},
	],
	'22a':[
		{ id: '1', room_code: '0101', room_number: '101a',room_setting: '点击设置属性', operation: '删除',
		room_attribute: [{room_type: [],record: ''},{room_people: '',record: ''},{monitor_ip: '',monitor_number: ''},{lighting_ip: '',air_conditioner_ip: '',power_supply_ip: '',multi_media_ip: ''}]},
		{ id: '2', room_code: '0102', room_number: '102a',room_setting: '点击设置属性', operation: '删除',
		room_attribute: [{room_type: [],record: ''},{room_people: '',record: ''},{monitor_ip: '',monitor_number: ''},{lighting_ip: '',air_conditioner_ip: '',power_supply_ip: '',multi_media_ip: ''}]},
		{ id: '3', room_code: '0103', room_number: '103a',room_setting: '点击设置属性', operation: '删除',
		room_attribute: [{room_type: [],record: ''},{room_people: '',record: ''},{monitor_ip: '',monitor_number: ''},{lighting_ip: '',air_conditioner_ip: '',power_supply_ip: '',multi_media_ip: ''}]},
		{ id: '4', room_code: '0104', room_number: '104a',room_setting: '点击设置属性', operation: '删除',
		room_attribute: [{room_type: [],record: ''},{room_people: '',record: ''},{monitor_ip: '',monitor_number: ''},{lighting_ip: '',air_conditioner_ip: '',power_supply_ip: '',multi_media_ip: ''}]},
	],
	'33a':[
		{ id: '1', room_code: '0101', room_number: '101b',room_setting: '点击设置属性', operation: '删除',
		room_attribute: [{room_type: [],record: ''},{room_people: '',record: ''},{monitor_ip: '',monitor_number: ''},{lighting_ip: '',air_conditioner_ip: '',power_supply_ip: '',multi_media_ip: ''}]},
		{ id: '2', room_code: '0102', room_number: '102b',room_setting: '点击设置属性', operation: '删除',
		room_attribute: [{room_type: [],record: ''},{room_people: '',record: ''},{monitor_ip: '',monitor_number: ''},{lighting_ip: '',air_conditioner_ip: '',power_supply_ip: '',multi_media_ip: ''}]},
		{ id: '3', room_code: '0103', room_number: '103b',room_setting: '点击设置属性', operation: '删除',
		room_attribute: [{room_type: [],record: ''},{room_people: '',record: ''},{monitor_ip: '',monitor_number: ''},{lighting_ip: '',air_conditioner_ip: '',power_supply_ip: '',multi_media_ip: ''}]},
	],
	'11b':[
		{ id: '1', room_code: '0101', room_number: '101c',room_setting: '点击设置属性', operation: '删除',
		room_attribute: [{room_type: [],record: ''},{room_people: '',record: ''},{monitor_ip: '',monitor_number: ''},{lighting_ip: '',air_conditioner_ip: '',power_supply_ip: '',multi_media_ip: ''}]},
		{ id: '2', room_code: '0102', room_number: '102c',room_setting: '点击设置属性', operation: '删除',
		room_attribute: [{room_type: [],record: ''},{room_people: '',record: ''},{monitor_ip: '',monitor_number: ''},{lighting_ip: '',air_conditioner_ip: '',power_supply_ip: '',multi_media_ip: ''}]},
		{ id: '3', room_code: '0103', room_number: '103c',room_setting: '点击设置属性', operation: '删除',
		room_attribute: [{room_type: [],record: ''},{room_people: '',record: ''},{monitor_ip: '',monitor_number: ''},{lighting_ip: '',air_conditioner_ip: '',power_supply_ip: '',multi_media_ip: ''}]},
	],
	'22b':[
		{ id: '1', room_code: '0101', room_number: '101d',room_setting: '点击设置属性', operation: '删除',
		room_attribute: [{room_type: [],record: ''},{room_people: '',record: ''},{monitor_ip: '',monitor_number: ''},{lighting_ip: '',air_conditioner_ip: '',power_supply_ip: '',multi_media_ip: ''}]},
		{ id: '2', room_code: '0102', room_number: '102d',room_setting: '点击设置属性', operation: '删除',
		room_attribute: [{room_type: [],record: ''},{room_people: '',record: ''},{monitor_ip: '',monitor_number: ''},{lighting_ip: '',air_conditioner_ip: '',power_supply_ip: '',multi_media_ip: ''}]},
		{ id: '3', room_code: '0103', room_number: '103d',room_setting: '点击设置属性', operation: '删除',
		room_attribute: [{room_type: [],record: ''},{room_people: '',record: ''},{monitor_ip: '',monitor_number: ''},{lighting_ip: '',air_conditioner_ip: '',power_supply_ip: '',multi_media_ip: ''}]},
	],
	'33b':[
		{ id: '1', room_code: '0101', room_number: '101e',room_setting: '点击设置属性', operation: '删除',
		room_attribute: [{room_type: [],record: ''},{room_people: '',record: ''},{monitor_ip: '',monitor_number: ''},{lighting_ip: '',air_conditioner_ip: '',power_supply_ip: '',multi_media_ip: ''}]},
		{ id: '2', room_code: '0102', room_number: '102e',room_setting: '点击设置属性', operation: '删除',
		room_attribute: [{room_type: [],record: ''},{room_people: '',record: ''},{monitor_ip: '',monitor_number: ''},{lighting_ip: '',air_conditioner_ip: '',power_supply_ip: '',multi_media_ip: ''}]},
		{ id: '3', room_code: '0103', room_number: '103e',room_setting: '点击设置属性', operation: '删除',
		room_attribute: [{room_type: [],record: ''},{room_people: '',record: ''},{monitor_ip: '',monitor_number: ''},{lighting_ip: '',air_conditioner_ip: '',power_supply_ip: '',multi_media_ip: ''}]},
	],
	'11c':[
		{ id: '1', room_code: '0101', room_number: '101f',room_setting: '点击设置属性', operation: '删除',
		room_attribute: [{room_type: [],record: ''},{room_people: '',record: ''},{monitor_ip: '',monitor_number: ''},{lighting_ip: '',air_conditioner_ip: '',power_supply_ip: '',multi_media_ip: ''}]},
		{ id: '2', room_code: '0102', room_number: '102f',room_setting: '点击设置属性', operation: '删除',
		room_attribute: [{room_type: [],record: ''},{room_people: '',record: ''},{monitor_ip: '',monitor_number: ''},{lighting_ip: '',air_conditioner_ip: '',power_supply_ip: '',multi_media_ip: ''}]},
		{ id: '3', room_code: '0103', room_number: '103f',room_setting: '点击设置属性', operation: '删除',
		room_attribute: [{room_type: [],record: ''},{room_people: '',record: ''},{monitor_ip: '',monitor_number: ''},{lighting_ip: '',air_conditioner_ip: '',power_supply_ip: '',multi_media_ip: ''}]},
	],
	'22c':[
		{ id: '1', room_code: '0101', room_number: '101g',room_setting: '点击设置属性', operation: '删除',
		room_attribute: [{room_type: [],record: ''},{room_people: '',record: ''},{monitor_ip: '',monitor_number: ''},{lighting_ip: '',air_conditioner_ip: '',power_supply_ip: '',multi_media_ip: ''}]},
		{ id: '2', room_code: '0102', room_number: '102g',room_setting: '点击设置属性', operation: '删除',
		room_attribute: [{room_type: [],record: ''},{room_people: '',record: ''},{monitor_ip: '',monitor_number: ''},{lighting_ip: '',air_conditioner_ip: '',power_supply_ip: '',multi_media_ip: ''}]},
		{ id: '3', room_code: '0103', room_number: '103g',room_setting: '点击设置属性', operation: '删除',
		room_attribute: [{room_type: [],record: ''},{room_people: '',record: ''},{monitor_ip: '',monitor_number: ''},{lighting_ip: '',air_conditioner_ip: '',power_supply_ip: '',multi_media_ip: ''}]},
	],
	'33c':[
		{ id: '1', room_code: '0101', room_number: '101h',room_setting: '点击设置属性', operation: '删除',
		room_attribute: [{room_type: [],record: ''},{room_people: '',record: ''},{monitor_ip: '',monitor_number: ''},{lighting_ip: '',air_conditioner_ip: '',power_supply_ip: '',multi_media_ip: ''}]},
		{ id: '2', room_code: '0102', room_number: '102h',room_setting: '点击设置属性', operation: '删除',
		room_attribute: [{room_type: [],record: ''},{room_people: '',record: ''},{monitor_ip: '',monitor_number: ''},{lighting_ip: '',air_conditioner_ip: '',power_supply_ip: '',multi_media_ip: ''}]},
		{ id: '3', room_code: '0103', room_number: '103h',room_setting: '点击设置属性', operation: '删除',
		room_attribute: [{room_type: [],record: ''},{room_people: '',record: ''},{monitor_ip: '',monitor_number: ''},{lighting_ip: '',air_conditioner_ip: '',power_supply_ip: '',multi_media_ip: ''}]},
	],
	'11d':[
		{ id: '1', room_code: '0101', room_number: '101i',room_setting: '点击设置属性', operation: '删除',
		room_attribute: [{room_type: [],record: ''},{room_people: '',record: ''},{monitor_ip: '',monitor_number: ''},{lighting_ip: '',air_conditioner_ip: '',power_supply_ip: '',multi_media_ip: ''}]},
		{ id: '2', room_code: '0102', room_number: '102i',room_setting: '点击设置属性', operation: '删除',
		room_attribute: [{room_type: [],record: ''},{room_people: '',record: ''},{monitor_ip: '',monitor_number: ''},{lighting_ip: '',air_conditioner_ip: '',power_supply_ip: '',multi_media_ip: ''}]},
	],
	'22d':[
		{ id: '1', room_code: '0101', room_number: '101j',room_setting: '点击设置属性', operation: '删除',
		room_attribute: [{room_type: [],record: ''},{room_people: '',record: ''},{monitor_ip: '',monitor_number: ''},{lighting_ip: '',air_conditioner_ip: '',power_supply_ip: '',multi_media_ip: ''}]},
		{ id: '2', room_code: '0102', room_number: '102j',room_setting: '点击设置属性', operation: '删除',
		room_attribute: [{room_type: [],record: ''},{room_people: '',record: ''},{monitor_ip: '',monitor_number: ''},{lighting_ip: '',air_conditioner_ip: '',power_supply_ip: '',multi_media_ip: ''}]},
		{ id: '3', room_code: '0103', room_number: '103j',room_setting: '点击设置属性', operation: '删除',
		room_attribute: [{room_type: [],record: ''},{room_people: '',record: ''},{monitor_ip: '',monitor_number: ''},{lighting_ip: '',air_conditioner_ip: '',power_supply_ip: '',multi_media_ip: ''}]},
	],
	'33d':[
		{ id: '1', room_code: '0101', room_number: '101k',room_setting: '点击设置属性', operation: '删除',
		room_attribute: [{room_type: [],record: ''},{room_people: '',record: ''},{monitor_ip: '',monitor_number: ''},{lighting_ip: '',air_conditioner_ip: '',power_supply_ip: '',multi_media_ip: ''}]},
		{ id: '2', room_code: '0102', room_number: '102k',room_setting: '点击设置属性', operation: '删除',
		room_attribute: [{room_type: [],record: ''},{room_people: '',record: ''},{monitor_ip: '',monitor_number: ''},{lighting_ip: '',air_conditioner_ip: '',power_supply_ip: '',multi_media_ip: ''}]},
		{ id: '3', room_code: '0103', room_number: '103k',room_setting: '点击设置属性', operation: '删除',
		room_attribute: [{room_type: [],record: ''},{room_people: '',record: ''},{monitor_ip: '',monitor_number: ''},{lighting_ip: '',air_conditioner_ip: '',power_supply_ip: '',multi_media_ip: ''}]},
	],
	'11e':[
		{ id: '1', room_code: '0101', room_number: '101l',room_setting: '点击设置属性', operation: '删除',
		room_attribute: [{room_type: [],record: ''},{room_people: '',record: ''},{monitor_ip: '',monitor_number: ''},{lighting_ip: '',air_conditioner_ip: '',power_supply_ip: '',multi_media_ip: ''}]},
		{ id: '2', room_code: '0102', room_number: '102l',room_setting: '点击设置属性', operation: '删除',
		room_attribute: [{room_type: [],record: ''},{room_people: '',record: ''},{monitor_ip: '',monitor_number: ''},{lighting_ip: '',air_conditioner_ip: '',power_supply_ip: '',multi_media_ip: ''}]},
		{ id: '3', room_code: '0103', room_number: '103l',room_setting: '点击设置属性', operation: '删除',
		room_attribute: [{room_type: [],record: ''},{room_people: '',record: ''},{monitor_ip: '',monitor_number: ''},{lighting_ip: '',air_conditioner_ip: '',power_supply_ip: '',multi_media_ip: ''}]},
	],
	'22e':[
		{ id: '1', room_code: '0101', room_number: '101r',room_setting: '点击设置属性', operation: '删除',
		room_attribute: [{room_type: [],record: ''},{room_people: '',record: ''},{monitor_ip: '',monitor_number: ''},{lighting_ip: '',air_conditioner_ip: '',power_supply_ip: '',multi_media_ip: ''}]},
		{ id: '2', room_code: '0102', room_number: '102r',room_setting: '点击设置属性', operation: '删除',
		room_attribute: [{room_type: [],record: ''},{room_people: '',record: ''},{monitor_ip: '',monitor_number: ''},{lighting_ip: '',air_conditioner_ip: '',power_supply_ip: '',multi_media_ip: ''}]},
		{ id: '3', room_code: '0103', room_number: '103r',room_setting: '点击设置属性', operation: '删除',
		room_attribute: [{room_type: [],record: ''},{room_people: '',record: ''},{monitor_ip: '',monitor_number: ''},{lighting_ip: '',air_conditioner_ip: '',power_supply_ip: '',multi_media_ip: ''}]},
	],
	'33e':[
		{ id: '1', room_code: '0101', room_number: '101q',room_setting: '点击设置属性', operation: '删除',
		room_attribute: [{room_type: [],record: ''},{room_people: '',record: ''},{monitor_ip: '',monitor_number: ''},{lighting_ip: '',air_conditioner_ip: '',power_supply_ip: '',multi_media_ip: ''}]},
		{ id: '2', room_code: '0102', room_number: '102q',room_setting: '点击设置属性', operation: '删除',
		room_attribute: [{room_type: [],record: ''},{room_people: '',record: ''},{monitor_ip: '',monitor_number: ''},{lighting_ip: '',air_conditioner_ip: '',power_supply_ip: '',multi_media_ip: ''}]},
		{ id: '3', room_code: '0103', room_number: '103q',room_setting: '点击设置属性', operation: '删除',
		room_attribute: [{room_type: [],record: ''},{room_people: '',record: ''},{monitor_ip: '',monitor_number: ''},{lighting_ip: '',air_conditioner_ip: '',power_supply_ip: '',multi_media_ip: ''}]},
	],
	'11f':[
		{ id: '1', room_code: '0101', room_number: '101x',room_setting: '点击设置属性', operation: '删除',
		room_attribute: [{room_type: [],record: ''},{room_people: '',record: ''},{monitor_ip: '',monitor_number: ''},{lighting_ip: '',air_conditioner_ip: '',power_supply_ip: '',multi_media_ip: ''}]},
		{ id: '2', room_code: '0102', room_number: '102x',room_setting: '点击设置属性', operation: '删除',
		room_attribute: [{room_type: [],record: ''},{room_people: '',record: ''},{monitor_ip: '',monitor_number: ''},{lighting_ip: '',air_conditioner_ip: '',power_supply_ip: '',multi_media_ip: ''}]},
		{ id: '3', room_code: '0103', room_number: '103x',room_setting: '点击设置属性', operation: '删除',
		room_attribute: [{room_type: [],record: ''},{room_people: '',record: ''},{monitor_ip: '',monitor_number: ''},{lighting_ip: '',air_conditioner_ip: '',power_supply_ip: '',multi_media_ip: ''}]},
	],
	'22f':[
		{ id: '1', room_code: '0101', room_number: '101n',room_setting: '点击设置属性', operation: '删除',
		room_attribute: [{room_type: [],record: ''},{room_people: '',record: ''},{monitor_ip: '',monitor_number: ''},{lighting_ip: '',air_conditioner_ip: '',power_supply_ip: '',multi_media_ip: ''}]},
		{ id: '2', room_code: '0102', room_number: '102n',room_setting: '点击设置属性', operation: '删除',
		room_attribute: [{room_type: [],record: ''},{room_people: '',record: ''},{monitor_ip: '',monitor_number: ''},{lighting_ip: '',air_conditioner_ip: '',power_supply_ip: '',multi_media_ip: ''}]},
		{ id: '3', room_code: '0103', room_number: '103n',room_setting: '点击设置属性', operation: '删除',
		room_attribute: [{room_type: [],record: ''},{room_people: '',record: ''},{monitor_ip: '',monitor_number: ''},{lighting_ip: '',air_conditioner_ip: '',power_supply_ip: '',multi_media_ip: ''}]},
	],
	'33f':[
		{ id: '1', room_code: '0101', room_number: '101p',room_setting: '点击设置属性', operation: '删除',
		room_attribute: [{room_type: [],record: ''},{room_people: '',record: ''},{monitor_ip: '',monitor_number: ''},{lighting_ip: '',air_conditioner_ip: '',power_supply_ip: '',multi_media_ip: ''}]},
		{ id: '2', room_code: '0102', room_number: '102p',room_setting: '点击设置属性', operation: '删除',
		room_attribute: [{room_type: [],record: ''},{room_people: '',record: ''},{monitor_ip: '',monitor_number: ''},{lighting_ip: '',air_conditioner_ip: '',power_supply_ip: '',multi_media_ip: ''}]},
		{ id: '3', room_code: '0103', room_number: '103p',room_setting: '点击设置属性', operation: '删除',
		room_attribute: [{room_type: [],record: ''},{room_people: '',record: ''},{monitor_ip: '',monitor_number: ''},{lighting_ip: '',air_conditioner_ip: '',power_supply_ip: '',multi_media_ip: ''}]},
	],
	'11g':[
		{ id: '1', room_code: '0101', room_number: '101s',room_setting: '点击设置属性', operation: '删除',
		room_attribute: [{room_type: [],record: ''},{room_people: '',record: ''},{monitor_ip: '',monitor_number: ''},{lighting_ip: '',air_conditioner_ip: '',power_supply_ip: '',multi_media_ip: ''}]},
		{ id: '2', room_code: '0102', room_number: '102s',room_setting: '点击设置属性', operation: '删除',
		room_attribute: [{room_type: [],record: ''},{room_people: '',record: ''},{monitor_ip: '',monitor_number: ''},{lighting_ip: '',air_conditioner_ip: '',power_supply_ip: '',multi_media_ip: ''}]},
		{ id: '3', room_code: '0103', room_number: '103s',room_setting: '点击设置属性', operation: '删除',
		room_attribute: [{room_type: [],record: ''},{room_people: '',record: ''},{monitor_ip: '',monitor_number: ''},{lighting_ip: '',air_conditioner_ip: '',power_supply_ip: '',multi_media_ip: ''}]},
	],
	'22g':[
		{ id: '1', room_code: '0101', room_number: '101g',room_setting: '点击设置属性', operation: '删除',
		room_attribute: [{room_type: [],record: ''},{room_people: '',record: ''},{monitor_ip: '',monitor_number: ''},{lighting_ip: '',air_conditioner_ip: '',power_supply_ip: '',multi_media_ip: ''}]},
		{ id: '2', room_code: '0102', room_number: '102g',room_setting: '点击设置属性', operation: '删除',
		room_attribute: [{room_type: [],record: ''},{room_people: '',record: ''},{monitor_ip: '',monitor_number: ''},{lighting_ip: '',air_conditioner_ip: '',power_supply_ip: '',multi_media_ip: ''}]},
		{ id: '3', room_code: '0103', room_number: '103g',room_setting: '点击设置属性', operation: '删除',
		room_attribute: [{room_type: [],record: ''},{room_people: '',record: ''},{monitor_ip: '',monitor_number: ''},{lighting_ip: '',air_conditioner_ip: '',power_supply_ip: '',multi_media_ip: ''}]},
	],
	'33g':[
		{ id: '1', room_code: '0101', room_number: '101t',room_setting: '点击设置属性', operation: '删除',
		room_attribute: [{room_type: [],record: ''},{room_people: '',record: ''},{monitor_ip: '',monitor_number: ''},{lighting_ip: '',air_conditioner_ip: '',power_supply_ip: '',multi_media_ip: ''}]},
		{ id: '2', room_code: '0102', room_number: '102t',room_setting: '点击设置属性', operation: '删除',
		room_attribute: [{room_type: [],record: ''},{room_people: '',record: ''},{monitor_ip: '',monitor_number: ''},{lighting_ip: '',air_conditioner_ip: '',power_supply_ip: '',multi_media_ip: ''}]},
		{ id: '3', room_code: '0103', room_number: '103t',room_setting: '点击设置属性', operation: '删除',
		room_attribute: [{room_type: [],record: ''},{room_people: '',record: ''},{monitor_ip: '',monitor_number: ''},{lighting_ip: '',air_conditioner_ip: '',power_supply_ip: '',multi_media_ip: ''}]},
	],
	'11h':[
		{ id: '1', room_code: '0101', room_number: '101y',room_setting: '点击设置属性', operation: '删除',
		room_attribute: [{room_type: [],record: ''},{room_people: '',record: ''},{monitor_ip: '',monitor_number: ''},{lighting_ip: '',air_conditioner_ip: '',power_supply_ip: '',multi_media_ip: ''}]},
		{ id: '2', room_code: '0102', room_number: '102y',room_setting: '点击设置属性', operation: '删除',
		room_attribute: [{room_type: [],record: ''},{room_people: '',record: ''},{monitor_ip: '',monitor_number: ''},{lighting_ip: '',air_conditioner_ip: '',power_supply_ip: '',multi_media_ip: ''}]},
		{ id: '3', room_code: '0103', room_number: '103y',room_setting: '点击设置属性', operation: '删除',
		room_attribute: [{room_type: [],record: ''},{room_people: '',record: ''},{monitor_ip: '',monitor_number: ''},{lighting_ip: '',air_conditioner_ip: '',power_supply_ip: '',multi_media_ip: ''}]},
	],
	'22h':[
		{ id: '1', room_code: '0101', room_number: '101j',room_setting: '点击设置属性', operation: '删除',
		room_attribute: [{room_type: [],record: ''},{room_people: '',record: ''},{monitor_ip: '',monitor_number: ''},{lighting_ip: '',air_conditioner_ip: '',power_supply_ip: '',multi_media_ip: ''}]},
		{ id: '2', room_code: '0102', room_number: '102j',room_setting: '点击设置属性', operation: '删除',
		room_attribute: [{room_type: [],record: ''},{room_people: '',record: ''},{monitor_ip: '',monitor_number: ''},{lighting_ip: '',air_conditioner_ip: '',power_supply_ip: '',multi_media_ip: ''}]},
		{ id: '3', room_code: '0103', room_number: '103j',room_setting: '点击设置属性', operation: '删除',
		room_attribute: [{room_type: [],record: ''},{room_people: '',record: ''},{monitor_ip: '',monitor_number: ''},{lighting_ip: '',air_conditioner_ip: '',power_supply_ip: '',multi_media_ip: ''}]},
	],
	'33h':[
		{ id: '1', room_code: '0101', room_number: '101d',room_setting: '点击设置属性', operation: '删除',
		room_attribute: [{room_type: [],record: ''},{room_people: '',record: ''},{monitor_ip: '',monitor_number: ''},{lighting_ip: '',air_conditioner_ip: '',power_supply_ip: '',multi_media_ip: ''}]},
		{ id: '2', room_code: '0102', room_number: '102d',room_setting: '点击设置属性', operation: '删除',
		room_attribute: [{room_type: [],record: ''},{room_people: '',record: ''},{monitor_ip: '',monitor_number: ''},{lighting_ip: '',air_conditioner_ip: '',power_supply_ip: '',multi_media_ip: ''}]},
		{ id: '3', room_code: '0103', room_number: '103d',room_setting: '点击设置属性', operation: '删除',
		room_attribute: [{room_type: [],record: ''},{room_people: '',record: ''},{monitor_ip: '',monitor_number: ''},{lighting_ip: '',air_conditioner_ip: '',power_supply_ip: '',multi_media_ip: ''}]},
	],
	'11i':[
		{ id: '1', room_code: '0101', room_number: '101v',room_setting: '点击设置属性', operation: '删除',
		room_attribute: [{room_type: [],record: ''},{room_people: '',record: ''},{monitor_ip: '',monitor_number: ''},{lighting_ip: '',air_conditioner_ip: '',power_supply_ip: '',multi_media_ip: ''}]},
		{ id: '2', room_code: '0102', room_number: '102v',room_setting: '点击设置属性', operation: '删除',
		room_attribute: [{room_type: [],record: ''},{room_people: '',record: ''},{monitor_ip: '',monitor_number: ''},{lighting_ip: '',air_conditioner_ip: '',power_supply_ip: '',multi_media_ip: ''}]},
		{ id: '3', room_code: '0103', room_number: '103v',room_setting: '点击设置属性', operation: '删除',
		room_attribute: [{room_type: [],record: ''},{room_people: '',record: ''},{monitor_ip: '',monitor_number: ''},{lighting_ip: '',air_conditioner_ip: '',power_supply_ip: '',multi_media_ip: ''}]},
	],
	'22i':[
		{ id: '1', room_code: '0101', room_number: '101u',room_setting: '点击设置属性', operation: '删除',
		room_attribute: [{room_type: [],record: ''},{room_people: '',record: ''},{monitor_ip: '',monitor_number: ''},{lighting_ip: '',air_conditioner_ip: '',power_supply_ip: '',multi_media_ip: ''}]},
		{ id: '2', room_code: '0102', room_number: '102u',room_setting: '点击设置属性', operation: '删除',
		room_attribute: [{room_type: [],record: ''},{room_people: '',record: ''},{monitor_ip: '',monitor_number: ''},{lighting_ip: '',air_conditioner_ip: '',power_supply_ip: '',multi_media_ip: ''}]},
		{ id: '3', room_code: '0103', room_number: '103u',room_setting: '点击设置属性', operation: '删除',
		room_attribute: [{room_type: [],record: ''},{room_people: '',record: ''},{monitor_ip: '',monitor_number: ''},{lighting_ip: '',air_conditioner_ip: '',power_supply_ip: '',multi_media_ip: ''}]},
	],
	'33i':[
		{ id: '1', room_code: '0101', room_number: '101f',room_setting: '点击设置属性', operation: '删除',
		room_attribute: [{room_type: [],record: ''},{room_people: '',record: ''},{monitor_ip: '',monitor_number: ''},{lighting_ip: '',air_conditioner_ip: '',power_supply_ip: '',multi_media_ip: ''}]},
		{ id: '2', room_code: '0102', room_number: '102f',room_setting: '点击设置属性', operation: '删除',
		room_attribute: [{room_type: [],record: ''},{room_people: '',record: ''},{monitor_ip: '',monitor_number: ''},{lighting_ip: '',air_conditioner_ip: '',power_supply_ip: '',multi_media_ip: ''}]},
		{ id: '3', room_code: '0103', room_number: '103f',room_setting: '点击设置属性', operation: '删除',
		room_attribute: [{room_type: [],record: ''},{room_people: '',record: ''},{monitor_ip: '',monitor_number: ''},{lighting_ip: '',air_conditioner_ip: '',power_supply_ip: '',multi_media_ip: ''}]},
	]
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
				add_architecture_active: false,
				delete_floor_active: false,
				delete_architecture_checkbox_active: false,
				delete_floor_checkbox_active: false,
				campus_input: '',
				table_input: '',
				architecture_input: '',
				floor_input: '',
				campus_data: '',
				architecture_data: '',
				floor_data: '',
				department_data: '',
				campus_record: 0,
				architecture_record: 0,
				floor_record: 0,
				department_header: ['房间编码','房间号码','房间设置','操作'],
				department_add: ['取消','','点击关联','点击关联','点击设置属性','确定'],
				campus_id: '',
				architecture_id: '',
				floor_id: '',
				content_architecture_active: false,
				content_floor_active: false,
				content_room_active: false,
				room_index: '',
				delete_building: '删除建筑',
				delete_select_floor: '删除楼层',
				room_attribute: [
				{room_type: []},
				{room_people: ''},
				{monitor_ip: '',monitor_number: ''},
				{lighting_ip: '',air_conditioner_ip: '',power_supply_ip: '',multi_media_ip: ''}
				],
				campus_index: 0,
				architecture_index: 0,
				edit_text: '编辑',
				edit_floor_text: '编辑',
				edit_architecture_active: true,
				edit_floor_active: true,
				add_architecture_text: '添加建筑',
				add_floor_text: '添加楼层',
				modal2: false,
				modal_loading: false,
				delA : '',
				delB : '',
				delActive: '',
				del_hint_information: '确定删除该建筑吗？',
				loucengbianhao: '',
				fangjianbianhao: '',
				timer: 1,
			}
		},
		beforeMount: function() {
//			this.getJson();
		},
		mounted: function() {
//			this.getJson();
		},
		created:function(){
			this.getJson();
//			this.pageJson();
		},
		methods:{
			//获取数据
			getJson() {
				if(this.timer == 1){
				this.loading();
				var that = this;
				var xueXiaoId = 14;
				var parameter = {xuexiao_id: xueXiaoId};
				this.$http.post('http://47.106.77.12/api/Guanli/getXiaoqu',parameter).then(function(response){
					that.destroyOver();
					console.log(response);
					campus = [];
					for(var i=0;i<response.data.data.length;i++){
						campus.push({
							id: response.data.data[i].id,
							name: response.data.data[i].mingcheng,
							active: false,
							count_color: true,
							quyu_num: response.data.data[i].quyu_num,
							bianhao: response.data.data[i].bianhao,
						})
					}
					that.campus_data = campus;
				}).catch(function(err){
					console.log(err);
				})	
				
				
				}
//				var that = this;
//				this.$http({
//					url: 'http://192.168.1.117:806/sitecon/school_build/',
//					method: 'get',
//				}).then(function(response) {
//					that.trueData(response);
//					that.pageJson();
//					//							if(response.data.success){
//					//								
//					//							}else{
//					//								
//					//							}
//				}).catch(function(err) {
//					console.log(err);
//					that.pageJson();
//				})
				
			},
			pageJson(){
				this.campus_data = campus;
			},
			//上移
			moveData(index){
				var newArr = [];
				for(var i=0;i<this.department_data.length;i++){
					if(i<index-1){
						newArr.push(this.department_data[i]);
					}else if(i == index-1){
//						var department_temp = this.department_data[i+1].room_code;
//						this.department_data[i+1].room_code = this.department_data[i].room_code;
						newArr.push(this.department_data[i+1]);
					}else if(i == index){
//						this.department_data[i-1].room_code = department_temp;
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
			//设置校区
			add_campus(){
				this.campus_active = !this.campus_active;
			},
			//添加建筑
			add_architecture(){
				if(this.add_architecture_active == false){
					this.add_architecture_active = true;
					this.delete_architecture_checkbox_active = false;
					this.edit_architecture_active = true;
					this.add_architecture_text = '添加取消';
				}else{
					this.add_architecture_active = false;
					this.add_architecture_text = '添加建筑';
				}
			},
			//添加楼层
			add_floor(){
				if(this.delete_floor_active == false){
					this.delete_floor_active = true;
					this.delete_floor_checkbox_active = false; 
					this.edit_floor_active = true;
					this.add_floor_text = '添加取消';
				}else{
					this.delete_floor_active = false;
					this.add_floor_text = '添加楼层';
				}
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
			//设置部门取消
			addCancelDepartment(){
				this.table_input = '';
				this.add_active = false;
			},
			//设置校区确定
			addCampusDetermine(){
				if(this.campus_input != ''){
					var setId = this.generateIdPackage();
					this.campus_data.push({
						id: setId,
						name: this.campus_input,
					})
					architecture[setId] = [];
					
					this.campus_input = '';
					this.campus_active = !this.campus_active;
				}else{
					this.info ();
				}
			},
			//添加建筑确定
			addArchitectureDetermine(){
				var input_content = this.architecture_input;
				if(input_content != ''){
					var hao = this.campus_data[this.campus_index].bianhao;
					console.log(hao)
					if(this.architecture_data.length < 10){
						var num = '0' + this.architecture_data.length;
					}else{
						var num = this.architecture_data.length+1;
					}
					var haoStr = hao + num;
					console.log('yahooooo');
					console.log(haoStr);
				//后台交接
				var xuexiao_id = 14;
				var xiaoqu_id = this.campus_data[this.campus_index].id;
				var bianhao = haoStr;
				var louceng_num = 0;
				var parameter = {xuexiao_id: xuexiao_id,xiaoqu_id: xiaoqu_id,bianhao: bianhao,louceng_num: louceng_num,mingcheng: this.architecture_input};
				var that = this;
				this.$http.post('http://47.106.77.12/api/Guanli/addQuyu',parameter).then(function(response){
					console.log(response.data.has_add);
					var setId = response.data.has_add;
					that.architecture_data.push({
						id: setId,
						name: input_content,
						louceng_num: 0,
						check_true: '0',
						active: false,
						count_color: true,
						check_active: false,
						name_active: true,
						edit_active: false,
						edit_text: '编辑',
						type_active: 'warning',
						bianhao: haoStr,
					})
					that.architectureCountColor();
					floor[setId] = [];
//					console.log(setId)
					that.architecture_input = '';
					that.add_architecture_active = !that.add_architecture_active;
					that.add_architecture_text = '添加建筑';
				}).catch(function(err){
					console.log(err);
				})
					
				}else{
					that.info ();
				}			 
			},
			//添加楼层确定
			addFloorDetermine(){
				var floor_input_content = this.floor_input;
				if(floor_input_content != ''){
					
					var hao = this.architecture_data[this.architecture_index].bianhao;
					if(this.floor_data.length < 10){
						var num = '0' + this.floor_data.length;
					}else{
						var num = this.floor_data.length + 1;
					}
					var haoStr = hao + num;
					console.log('yahoossoo')
					console.log(haoStr);					
				//后台交接
				var xuexiao_id = 14;
				var xiaoqu_id = this.campus_data[this.campus_index].id;
				var quyu_id = this.architecture_id;
				var bianhao = haoStr;
				var parameter = {xuexiao_id: xuexiao_id,xiaoqu_id: xiaoqu_id,quyu_id: quyu_id,bianhao: bianhao,mingcheng: this.floor_input};
				var that = this;
				this.$http.post('http://47.106.77.12/api/Guanli/addLouceng',parameter).then(function(response){
					console.log(response);
					var setId = response.data.has_add;
					that.floor_data.push({
						id: setId,
						name: floor_input_content,
						fangjian_num: 0,
						check_true: '0',
						active: false,
						count_color: true,
						check_active: false,
						name_active: true,
						edit_active: false,
						edit_text: '编辑',
						type_active: 'warning',
						bianhao: haoStr,
					})
					that.floorCountColor();
					department[setId] = [];
					that.floor_input = '';
					that.delete_floor_active = !that.delete_floor_active;
					that.add_floor_text = '添加楼层';
				}).catch(function(err){
					console.log(err);
				})
				}else{
					that.info ();
				}
			},
			//添加房间确定
			addDataDetermine(){
				var table_input_content = this.table_input;
				if(table_input_content != ''){
					var haoArr = [];
					var hao = this.floor_data[this.floor_record].bianhao;
					if(this.department_data.length < 10){
						var num = '0' + this.department_data.length;
					}else{
						var num = this.department_data.length + 1;
					}
					var haoStr = hao + num;
					console.log('kiss66')
					console.log(haoStr)
				//后台交接
				var xuexiao_id = 14;
				var xiaoqu_id = this.campus_data[this.campus_index].id;
				var quyu_id = this.architecture_data[this.architecture_index].id;
				var quyu_mingcheng = this.architecture_data[this.architecture_index].name;
				var louceng_id = this.floor_id;
				var louceng_mingcheng = this.floor_data[this.floor_record].name;
				var bianhao = haoStr;
				var mingcheng = table_input_content;
				
				var show_mingcheng = this.department_data[0].show_mingcheng;
				var leixing = 1;
				var renshu_min = 10;
				var renshu_max = 20;
				var fuzeren_id_str = 'ya';
				var fuzeren_mingcheng_str = 'bin';
				var jiankong_ip = 'hi';
				var jiankong_pingdao = 'lo';
				var dengguang_ip = 'pi';
				var kongtiao_ip = 'ui';
				var dianyuan_ip = 'er';
				var duomeiti_ip = 'rt';
					
					
				var that = this;
				var parameter = {xuexiao_id:xuexiao_id,xiaoqu_id:xiaoqu_id,quyu_id:quyu_id,quyu_mingcheng:quyu_mingcheng,louceng_id: louceng_id,louceng_mingcheng: louceng_mingcheng,bianhao: bianhao,mingcheng: mingcheng,
				show_mingcheng: show_mingcheng,leixing: leixing,renshu_min: renshu_min,renshu_max: renshu_max,fuzeren_id_str: fuzeren_id_str,
				fuzeren_mingcheng_str:  fuzeren_mingcheng_str,jiankong_ip: jiankong_ip,jiankong_pingdao: jiankong_pingdao,dengguang_ip: dengguang_ip,kongtiao_ip: kongtiao_ip,dianyuan_ip: dianyuan_ip,duomeiti_ip: duomeiti_ip};
				console.log(parameter);
				this.$http.post('http://47.106.77.12/api/Guanli/addFangjian',parameter).then(function(response){
					console.log(response);
//					var length = this.department_data.length+1;
					var setId = response.data.has_add;
					that.department_data.push({
						id: setId,
						room_code: bianhao,
						room_number: table_input_content,
						room_setting: '点击设计属性',
						operation: '',
						room_attribute: [{room_type: [],record: ''},{room_people: '',record: ''},{monitor_ip: '',monitor_number: ''},{lighting_ip: '',air_conditioner_ip: '',power_supply_ip: '',multi_media_ip: ''}],
						name_active: true,
						edit_active: false,
						type_active: 'warning',
						edit_text : '编辑'
					})
					
					that.table_input = '';
					that.add_active = !that.add_active;
				}).catch(function(err){
					console.log(err);
				})		
				}else{
					that.info ();
				}
			},
			//校区事件
			campusEvent(index){
				if(this.timer == 1){
				this.delete_building = '删除建筑';
				this.delete_select_floor = '删除楼层';
				this.loading();
				var that = this;
				that.campus_index = index;
				that.campus_id = that.campus_data[index].id;
				var parameter = {xiaoqu_id: that.campus_id};
				this.$http.post('http://47.106.77.12/api/Guanli/getQuyu',parameter).then(function(response){
					that.destroyOver();
					console.log(response);
					architecture = {};
					var architectureArr = [];
					for(var j=0;j<response.data.data.length;j++){
						architectureArr.push({
							id: response.data.data[j].id,
							name: response.data.data[j].mingcheng,
							xuexiao_id: response.data.data[j].xuexiao_id,
							xiaoqu_id: response.data.data[j].xiaoqu_id,
							bianhao: response.data.data[j].bianhao,
							louceng_num: response.data.data[j].louceng_num,
							check_true: '0',
							active: false,
							count_color: true,
							check_active: false,
							name_active: true,
							edit_active: false,
							edit_text: '编辑',
							type_active: 'warning'
						})
					}
					architecture[that.campus_id] = architectureArr;
					that.campusCountColor();
					that.campus_data[index].active = true;
					that.campus_data[index].count_color = false;
					that.architecture_data = architecture[that.campus_id];
					that.content_architecture_active = true;
					that.content_floor_active = false;
					that.content_room_active = false;
				}).catch(function(err){
					console.log(err);
				})					
				
				}
			},
			//建筑事件
			architectureEvent(index){
				if(this.timer == 1){
				this.loading();
				this.delete_select_floor = '删除楼层';
				var that = this;
				that.add_architecture_active = false;
				that.architecture_index = index;
				that.architecture_id = architecture[this.campus_id][index].id;
				var parameter = {quyu_id: that.architecture_id};
				this.$http.post('http://47.106.77.12/api/Guanli/getLouceng',parameter).then(function(response){
					that.destroyOver();
					console.log(response);
					if(response.data.count == 0){
						var newArr = [];
					}else{
						var newArr = response.data.data;
					}
					floor = {};
					var floorArr = [];
					for(var j=0;j<newArr.length;j++){
						floorArr.push({
							id: response.data.data[j].id,
							name: response.data.data[j].mingcheng,
							xuexiao_id: response.data.data[j].xuexiao_id,
							xiaoqu_id: response.data.data[j].xiaoqu_id,
							quyu_id: response.data.data[j].quyu_id,
							bianhao: response.data.data[j].bianhao,
							fangjian_num: response.data.data[j].fangjian_num,
							check_true: '0',
							active: false,
							count_color: true,
							check_active: false,
							name_active: true,
							edit_active: false,
							edit_text: '编辑',
							type_active: 'warning',
						})
					}
					floor[that.architecture_id] = floorArr;
					that.architectureCountColor();
					that.architecture_data[index].active = true;
					that.architecture_data[index].count_color = false;
					that.floor_data = floor[that.architecture_id];
					that.content_architecture_active = true;
					that.content_floor_active = true;
					that.content_room_active = false;
					console.log('ya66688qq')
					console.log(floor[that.architecture_id]);
				}).catch(function(err){
					console.log(err);
				})	
				
				}
			},
			//楼层事件
			floor_event(index){
//					var fangjian_id =
//					var mingcheng = 
//					var show_mingcheng =
//					var leixing = 6
//					var renshu_min =
//					var renshu_max =
//					var fuzeren_id_str =
//					var fuzeren_mingcheng_str =
//					var jiankong_ip =
//					var jiankong_pingdao =
//					var dengguang_ip =
//					var kongtiao_ip = 
//					var dianyuan_ip =
//					var duomeiti_ip = 
				
				
				
				if(this.timer == 1){
				this.loading();
				this.delete_building = '删除建筑';
				var that = this;
				that.delete_floor_active = false;
				that.floor_record = index;
				that.floor_id = floor[that.architecture_id][index].id;
				var parameter = {louceng_id: that.floor_id};
				this.$http.post('http://47.106.77.12/api/Guanli/getFangjian',parameter).then(function(response){
					that.destroyOver();
					console.log('louceng');
					console.log(response);
					if(response.data.count == 0){
						var newArr = [];
					}else{
						var newArr = response.data.data;
					}
					department = {};
					var departmentArr = [];
					for(var j=0;j<newArr.length;j++){
						departmentArr.push({
							id: response.data.data[j].id,
							room_code: response.data.data[j].bianhao,
							room_number: response.data.data[j].mingcheng,
							room_setting: '点击设置属性',
							operation: '删除',
							xuexiao_id: response.data.data[j].xuexiao_id,
							xiaoqu_id: response.data.data[j].xiaoqu_id,
							quyu_id: response.data.data[j].quyu_id,
							louceng_id: response.data.data[j].louceng_id,
							loucheng_mingcheng: response.data.data[j].loucheng_mingcheng,
							quyu_mingcheng: response.data.data[j].quyu_mingcheng,
							
							show_mingcheng: response.data.data[j].show_mingcheng,
							leixing: response.data.data[j].leixing,
							renshu_min: response.data.data[j].renshu_min,
							renshu_max: response.data.data[j].renshu_max,
							fuzeren_id_str: response.data.data[j].fuzeren_id_str,
							fuzeren_mingcheng_str: response.data.data[j].fuzeren_mingcheng_str,
							jiankong_ip: response.data.data[j].jiankong_ip,
							jiankong_pingdao: response.data.data[j].jiankong_pingdao,
							dengguang_ip: response.data.data[j].dengguang_ip,
							kongtiao_ip: response.data.data[j].kongtiao_ip,
							dianyuan_ip: response.data.data[j].dianyuan_ip,
							duomeiti_ip: response.data.data[j].duomeiti_ip,
							
//							show_mingcheng: response.data.data[j].show_mingcheng,
//							leixing: response.data.data[j].leixing,
//							renshu_min: response.data.data[j].renshu_min,
//							renshu_max: response.data.data[j].renshu_max,
//							fuzeren_id_str: response.data.data[j].fuzeren_id_str,
//							fuzeren_mingcheng_str: response.data.data[j].fuzeren_mingcheng_str,
//							jiankong_ip : response.data.data[j].jiankong_ip ,
//							jiankong_pingdao : response.data.data[j].jiankong_pingdao,
							
							room_attribute: [{room_type: [],record: ''},{room_people: '',record: ''},{monitor_ip: '',monitor_number: ''},{lighting_ip: '',air_conditioner_ip: '',power_supply_ip: '',multi_media_ip: ''}],
							name_active: true,
							edit_active: false,
							type_active: 'warning',
							edit_text : '编辑'
						})
					}
					department[that.floor_id] = departmentArr;
					that.floorCountColor();
					that.floor_data[index].active = true;
					that.floor_data[index].count_color = false;
					that.department_data = department[that.floor_id];
					that.content_architecture_active = true;
					that.content_floor_active = true;
					that.content_room_active = true;
				}).catch(function(err){
					console.log(err);
				})	
				
				}
			},
			//房间属性
			room(index){
				if(index != true){
					this.room_index = index;
					var response = department[this.floor_id][this.room_index].room_attribute;
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
					department[this.floor_id][this.room_index].room_attribute[0].room_type = response[0].room_type;
					department[this.floor_id][this.room_index].room_attribute[1].room_people = response[1].room_people;
					department[this.floor_id][this.room_index].room_attribute[2].monitor_ip = response[2].monitor_ip;
					department[this.floor_id][this.room_index].room_attribute[2].monitor_number = response[2].monitor_number;
					department[this.floor_id][this.room_index].room_attribute[3].lighting_ip = response[3].lighting_ip;
					department[this.floor_id][this.room_index].room_attribute[3].air_conditioner_ip = response[3].air_conditioner_ip;
					department[this.floor_id][this.room_index].room_attribute[3].power_supply_ip = response[3].power_supply_ip;
					department[this.floor_id][this.room_index].room_attribute[3].multi_media_ip = response[3].multi_media_ip;
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
			//删除建筑
			delete_architecture(){
				this.add_architecture_active = false;
				if(this.delete_architecture_checkbox_active == false){
					this.delete_building = '删除取消';
					this.delete_architecture_checkbox_active = true;
					this.edit_architecture_active = false;
				}else{
					this.delete_architecture_checkbox_active = false;
					this.delete_building = '删除建筑';
					this.edit_architecture_active = true;
				}

				if(this.architecture_data == ''){
					this.content_floor_active = false;
					this.content_room_active = false;
				}
				this.content_floor_active = false;
				this.content_room_active = false;
			},
			//删除楼层
			delete_floor(){
				console.log('yahooooorrg')
				this.delete_floor_active = false;
				if(this.delete_floor_checkbox_active == false){
					this.delete_select_floor = '删除取消';
					this.delete_floor_checkbox_active = true;
					this.edit_floor_active = false;
				}else{
					this.delete_select_floor = '删除楼层';
					this.delete_floor_checkbox_active = false;
					this.edit_floor_active = true;
				}
				
				var floorDataVal = this.floor_data;
				if(floorDataVal == ''){
					this.content_room_active = false;
				}
				this.content_room_active = false;
			},
			//房间删除
			deleteData(index){
				department[floor[this.architecture_id][this.floor_record].id] = this.department_data;
				//后台交接
				var fangjian_id = department[floor[this.architecture_id][this.floor_record].id][index].id; 
				var that = this;
				var parameter = {fangjian_id: fangjian_id}
				this.$http.post('http://47.106.77.12/api/Guanli/delFangjian',parameter).then(function(response){
					console.log(response);
				}).catch(function(err){
					console.log(err);
				})	
				department[floor[that.architecture_id][that.floor_record].id].splice(index,1);
				that.department_data = department[floor[that.architecture_id][that.floor_record].id];
			},
			//校园计数颜色
			campusCountColor(){
				for(var i=0;i<this.campus_data.length;i++){
					this.campus_data[i].active = false;
					this.campus_data[i].count_color = true;
				}
			},
			//建筑计数颜色
			architectureCountColor(){
				for(var i=0;i<this.architecture_data.length;i++){
					this.architecture_data[i].active = false;
					this.architecture_data[i].count_color = true;
				}
			},
			//楼层计数颜色
			floorCountColor(){
				for(var i=0;i<this.floor_data.length;i++){
					this.floor_data[i].active = false;
					this.floor_data[i].count_color = true;
				}
			},
			//生成id
			generateIdPackage(){
				var loadArr = ['a','b','c','d','e'];
				var joinArr = [];
				for(var i=0;i<loadArr.length;i++){
					var random = Math.floor(Math.random()*5);
					joinArr.push(loadArr[random]);
				}
				var setId = joinArr.join('');
				return setId
			},
			//保存排序
			saveSort(){
				var newId = [];
				var haoArr = [];
				for(var i=0;i<this.department_data.length;i++){
					if(i != this.department_data.length-1){
						newId.push(this.department_data[i].id + ',');
						haoArr.push(this.department_data[i].room_number + ',');
					}else{
						newId.push(this.department_data[i].id);
						haoArr.push(this.department_data[i].room_number);
					}
					
				}
				var idStr = newId.join('');
				var haoStr = haoArr.join('');
//				console.log(idStr);
//				console.log(haoStr);
				var that = this;
//				var fangjian_id_str = '18603,18604,18605';
//				var fangjian_bianhao_str = '01090706,01090707,01090708';
				var fangjian_id_str = idStr;
				var fangjian_bianhao_str = haoStr;

				var parameter = {fangjian_id_str: fangjian_id_str,fangjian_bianhao_str: fangjian_bianhao_str};
				this.$http.post('http://47.106.77.12/api/Guanli/fangjianBianhao',parameter).then(function(response){
					console.log(response);
				}).catch(function(err){
					console.log(err);
				})	
			},
			//建筑编辑
			editEvent(index){
				if(this.architecture_data[index].name_active == true){
					this.architecture_data[index].name_active = false;
					this.architecture_data[index].edit_active = true;
					this.architecture_data[index].edit_text = '确定';
					this.architecture_data[index].type_active = 'success';
				}else{
					this.architecture_data[index].name_active = true;
					this.architecture_data[index].edit_active = false;
					this.architecture_data[index].edit_text = '编辑';
					this.architecture_data[index].type_active = 'warning';
					//后台交接
					var that = this;
					var quyu_id = that.architecture_data[index].id;
					var xuexiao_id = that.architecture_data[index].xuexiao_id;
					var xiaoqu_id = that.architecture_data[index].xiaoqu_id;
					var bianhao = that.architecture_data[index].bianhao;
					var mingcheng = that.architecture_data[index].name;
					var louceng_num = that.architecture_data[index].louceng_num;
					var parameter = {quyu_id: quyu_id,xuexiao_id: xuexiao_id,xiaoqu_id: xiaoqu_id,bianhao: bianhao,mingcheng: mingcheng,louceng_num: louceng_num};
					this.$http.post('http://47.106.77.12/api/Guanli/saveQuyuById',parameter).then(function(response){
//						console.log(response);
					}).catch(function(err){
						console.log(err);
					})	
				}
			},
			//楼层编辑
			editFloorEvent(index){
				if(this.floor_data[index].name_active == true){
					this.floor_data[index].name_active = false;
					this.floor_data[index].edit_active = true;
					this.floor_data[index].edit_text = '确定';
					this.floor_data[index].type_active = 'success';
				}else{
					this.floor_data[index].name_active = true;
					this.floor_data[index].edit_active = false;
					this.floor_data[index].edit_text = '编辑';
					this.floor_data[index].type_active = 'warning';
					//后台交接
					var that = this;
					var louceng_id = that.floor_data[index].id;
					var xuexiao_id = that.floor_data[index].xuexiao_id;
					var xiaoqu_id = that.floor_data[index].xiaoqu_id;
					var quyu_id = that.floor_data[index].quyu_id;
					var bianhao = that.floor_data[index].bianhao;
					var mingcheng = that.floor_data[index].name;
					var parameter = {louceng_id: louceng_id,xuexiao_id: xuexiao_id,xiaoqu_id: xiaoqu_id,quyu_id: quyu_id,bianhao: bianhao,mingcheng: mingcheng};
					console.log(parameter);
					this.$http.post('http://47.106.77.12/api/Guanli/saveLoucengById',parameter).then(function(response){
						console.log('kiss');
						console.log(response);
					}).catch(function(err){
						console.log(err);
					})
				}
			},
			//添加房间事件
			contentRoomEvent(){
				this.delete_floor_checkbox_active = false;
				this.edit_floor_active = true;
				for(var i=0;i<this.floor_data.length;i++){
					this.floor_data[i].name_active = true;
					this.floor_data[i].edit_active = false;
					this.floor_data[i].edit_text = '编辑';
					this.floor_data[i].type_active = 'warning';
				}
			},
			//添加楼层事件
			contentFloorEvent(){
				this.delete_architecture_checkbox_active = false;
				this.edit_architecture_active = true;
				for(var i=0;i<this.architecture_data.length;i++){
					this.architecture_data[i].name_active = true;
					this.architecture_data[i].edit_active = false;
					this.architecture_data[i].edit_text = '编辑';
					this.architecture_data[i].type_active = 'warning';
				}
			},
			//添加校园事件
			contentCampusEvent(){
				this.delete_floor_checkbox_active = false;
				this.edit_floor_active = true;
				this.delete_architecture_checkbox_active = false;
				this.edit_architecture_active = true;
				for(var i=0;i<this.architecture_data.length;i++){
					this.architecture_data[i].name_active = true;
					this.architecture_data[i].edit_active = false;
					this.architecture_data[i].edit_text = '编辑';
					this.architecture_data[i].type_active = 'warning';
				}
				for(var i=0;i<this.floor_data.length;i++){
					this.floor_data[i].name_active = true;
					this.floor_data[i].edit_active = false;
					this.floor_data[i].edit_text = '编辑';
					this.floor_data[i].type_active = 'warning';
				}
			},
			//添加建筑事件
			contentArchitectureEvent(){
				this.delete_floor_checkbox_active = false;
				this.edit_floor_active = true;
				for(var i=0;i<this.floor_data.length;i++){
					this.floor_data[i].name_active = true;
					this.floor_data[i].edit_active = false;
					this.floor_data[i].edit_text = '编辑';
					this.floor_data[i].type_active = 'warning';
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
					var that = this;
//					var fangjian_id = that.department_data[index].id;
//					var xuexiao_id = that.department_data[index].xuexiao_id;
//					var xiaoqu_id = that.department_data[index].xiaoqu_id;
//					var quyu_id = that.department_data[index].quyu_id;
//					var quyu_mingcheng = '5566';
//					var louceng_id = that.department_data[index].louceng_id;
//					var louceng_mingcheng = '雅虎';
//					var bianhao = that.department_data[index].room_code;
//					var mingcheng = that.department_data[index].room_number;
//					var show_mingcheng = 'show-text';
//					var leixing = 0;
//					var renshu_min = 50;
//					var renshu_max = 100;
//					var fuzeren_id_str = '1,2';
//					var fuzeren_mingcheng_str = 'text1,text2';
//					var jiankong_ip = '1.1.1.1';
//					var jiankong_pingdao = 34;
//					var parameter = {fangjian_id: fangjian_id,xuexiao_id: xuexiao_id,xiaoqu_id: xiaoqu_id,quyu_id,quyu_id,quyu_mingcheng:quyu_mingcheng,
//					louceng_id: louceng_id,louceng_mingcheng: louceng_mingcheng,bianhao: bianhao,mingcheng: mingcheng,show_mingcheng: show_mingcheng,leixing: leixing,
//					renshu_min: renshu_min,renshu_max: renshu_max,fuzeren_id_str: fuzeren_id_str,fuzeren_mingcheng_str: fuzeren_mingcheng_str,jiankong_ip: jiankong_ip,
//					jiankong_pingdao: jiankong_pingdao};

					var fangjian_id = that.department_data[index].id;
					var mingcheng = that.department_data[index].room_number;
					var show_mingcheng = that.department_data[index].show_mingcheng;
					var leixing = 1;
					var renshu_min = 10;
					var renshu_max = 20;
					var fuzeren_id_str = 'ya';
					var fuzeren_mingcheng_str = 'bin';
					var jiankong_ip = 'hi';
					var jiankong_pingdao = 'lo';
					var dengguang_ip = 'pi';
					var kongtiao_ip = 'ui';
					var dianyuan_ip = 'er';
					var duomeiti_ip = 'rt';
					var parameter = {fangjian_id: fangjian_id,mingcheng: mingcheng,show_mingcheng: show_mingcheng,leixing: leixing,renshu_min: renshu_min,renshu_max: renshu_max,
					fuzeren_id_str: fuzeren_id_str,fuzeren_mingcheng_str: fuzeren_mingcheng_str,jiankong_ip: jiankong_ip,jiankong_pingdao: jiankong_pingdao,dengguang_ip: dengguang_ip,
					kongtiao_ip: kongtiao_ip,dianyuan_ip: dianyuan_ip,duomeiti_ip: duomeiti_ip}
					console.log(parameter);
					this.$http.post('http://47.106.77.12/api/Guanli/saveFangjianById',parameter).then(function(response){
						console.log(response);
					}).catch(function(err){
						console.log(err);
					})
				}
	
			},
			delArchitecture(index,value){
				this.modal2 = true;
				this.delA = index;
				this.delActive = value;
				this.del_hint_information = '确定删除该建筑吗？';
			},
			delFloor(index,value){
				this.modal2 = true;
				this.delB = index;
				this.delActive = value;
				this.del_hint_information = '确定删除该楼层吗？';
			},
			del() {
                this.modal_loading = true;
                setTimeout(() => {
                    this.modal_loading = false;
                    this.modal2 = false;
                    if(this.delActive == 0){
                    	if(floor[this.architecture_id].length == 0){
                    		var campus_into_id = architecture[this.campus_id][this.delA].id;
							//后台交接
							var that = this;
							var parameter = {quyu_id: campus_into_id}
							this.$http.post('http://47.106.77.12/api/Guanli/delQuyu',parameter).then(function(response){
								console.log(response);
							}).catch(function(err){
								console.log(err);
							})	
							architecture[this.campus_id].splice(this.delA,1);
							that.$Message.success('删除成功');
                    	}else{
                    		this.$Message.success('删除失败');
                    	}
                    	
                   }else if(this.delActive == 1){
                    	if(department[this.floor_id].length == 0){
                    		var architecture_id_val = floor[this.architecture_id][this.delB].id;
							//后台交接
							var that = this;
							var parameter = {louceng_id: architecture_id_val}
							this.$http.post('http://47.106.77.12/api/Guanli/delLouceng',parameter).then(function(response){
								console.log(response);
							}).catch(function(err){
								console.log(err);
							})	
							floor[this.architecture_id].splice(this.delB,1);
                    		that.$Message.success('删除成功');
                    	}else{
                    		this.$Message.success('删除失败');
                    	}
                    	
                   }
                }, 2000);
            },
            //加载中
            loading () {
                const msg = this.$Message.loading({
                    content: '加载中...',
                    duration: 0
                });
                setTimeout(msg, 8000);
                this.timer = 0;
            },
            //销毁加载
            destroyOver(){
            	this.$Message.destroy();
            	this.timer = 1;
            },
            bingo(){
            	var ya = this.$refs.roomProperties.room_attribute[1].room_people;
            }
		}

	}	
</script>

<style scoped>
@import './css/changdishezhi.css';
</style>