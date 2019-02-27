<template>
	<section class="box">
			<div class="head_list">
				<ul>
					<li>
						<Icon type="ios-box" size='40'></Icon>
					</li>
					<li>广州中学<span style="color: red;">{{campus[0]}}</span>教师管理</li>
				</ul>
				<Button type="error" style="float: right;margin-right: 20px;margin-top: 5px;">批量录入</Button>
			</div>
			<div class="content">
				<!--campus-->
				<div class="content_campus">
					<div class="content_campus_header">
						<Alert show-icon style="width: 200px;margin-top: 10px;font-size: 14px;">请点击校区</Alert>
					</div>
					<div class="content_campus_end">
						<ul>
							<li v-for="(item,index) in campus_data" @click='campusEvent(index)' :class="{'ivu-btn-primary':item.active}">
								{{item.name}}(<span :class="{'count_color':item.count_color}">{{campus_count[index]}}</span>个{{subjectDepartmentText}} )
							</li>
						</ul>
					</div>
				</div>
				<!--subject-->
				<div class="content_subject">
					<div class="content_subject_header">
						<!--<Alert show-icon style="width: 180px;margin-top: 10px;font-size: 14px;">请点击部门</Alert>-->
						<Button v-bind="{'type': subject_type}" style="width: 60px;margin-top: 10px;margin-left: 20px;" @click="subjectType">学科</Button>
						<Button v-bind="{'type': department_type}" style="width: 60px;margin-top: 10px;margin-left: 6px;" @click="departmentType">部门</Button>
					</div>
					<div class="content_subject_end">
						<ul>
							<li v-for="(item,index) in subject_data" @click='subjectEvent(index)' :class="{'ivu-btn-primary':item.active}">
								{{item.name}}
								(<span :class="{'count_color':item.count_color}">{{subject_count[index]}}</span>个教师)
							</li>
						</ul>
					</div>
				</div>
				<!--teacher-->
				<div class="content_teacher">
					<div class="content_teacher_header">
						<Button type="ghost" style="float: right;margin-right: 20px;margin-top: 10px;" @click="addTeacher()"><Icon type="plus"></Icon>添加教师</Button>
					</div>
					<div class="content_teacher_end">
						<table>
							<tr>
								<th v-for="item in teacher_header">{{item}}</th>
							</tr>
							<tr v-show="add_active">
								<td><Button type="error" @click="addCancelTeacher">取消</Button></td>
								<td><Input type="text" style="width: 75px;height: 32px;" placeholder="教师名称" v-model="teacher_name_input"></Input></td>
								<td><Input type="text" style="width: 100px;height: 32px;" placeholder="手机号码" v-model="phone_number_input"></Input></td>
								<td><Input type="text" style="width: 45px;height: 32px;" placeholder="性别" v-model="sex_input"></Input></td>
								<td>{{this.exchange_department}}</td>
								<td>点击关联</td>
								<td>详细设置</td>
								<td><Button type="success" @click="addTeacherDetermine()">确定</Button></td>
							</tr>
							<tr v-for="(item,index) in teacher_data">
								<td>{{item.serial_number}}</td>
								<td>
									<span v-show="item.name_active">{{item.teacher_name}}</span>
									<Input v-show="item.edit_active" size="small" style="width: 70px;" :placeholder="item.teacher_name" v-model="item.teacher_name"></Input>
								</td>
								<td>
									<span v-show="item.name_active">{{item.phone_number}}</span>
									<Input v-show="item.edit_active" size="small" style="width: 100px;" :placeholder="item.phone_number" v-model="item.phone_number"></Input>
								</td>
								<td>
									<span v-show="item.name_active">{{item.gender}}</span>
									<Input v-show="item.edit_active" size="small" style="width: 40px;" :placeholder="item.gender" v-model="item.gender"></Input>
								</td>
								<td>{{item.department}}</td>
								<td>{{item.role}}</td>
								<td>{{item.details}}</td>
								<td>
									<!--<Button type="primary" v-if="index!=0" @click="moveData(index)">上移</Button>-->
									<!--<Button type="primary" v-if="index!=teacher_data.length-1" @click="downData(index)">下移</Button>-->
									<Button v-bind="{'type':item.type_active}" @click="room_edit(index)">{{item.edit_text}}</Button>
									<Button type="error" @click="deleteData(index)">删除</Button>
								</td>
							</tr>
							
						</table>
					</div>
				</div>
			</div>
	</section>
</template>

<script>
	var campus = [
		{id:'1',name: '凤凰校区',active: true,count_color: true},
		{id:'2',name: '五山校区',active: false,count_color: true},
		{id:'3',name: '天河校区',active: false,count_color: true}
	]
	var subject = {
		'1':[
		{id:'1a',name: '校长室',active: true,count_color: true},
		{id:'2a',name: '教务处',active: false,count_color: true},
		{id:'3a',name: '德育处',active: false,count_color: true}
		],
		'2':[
		{id:'1b',name: '语文',active: false,count_color: true},
		{id:'2b',name: '数学',active: false,count_color: true},
		{id:'3b',name: '英语',active: false,count_color: true},
		],
		'3':[
		{id:'1c',name: '地理',active: false,count_color: true},
		{id:'2c',name: '历史',active: false,count_color: true},
		{id:'3c',name: '物理',active: false,count_color: true},
		]
	}
	var teacher = {
		'1a':[
		{id:'11a',serial_number: '1',teacher_name: '娜娜',phone_number: '17817836852',gender: '女',department: '校长室',role: '校长',details: '详细设置',operation: '删除',name_active: true,edit_active: false,edit_text: '编辑',type_active: 'warning'},
		{id:'22a',serial_number: '2',teacher_name: '露露',phone_number: '17817836852',gender: '男',department: '校长室',role: '副校长',details: '详细设置',operation: '删除',name_active: true,edit_active: false,edit_text: '编辑',type_active: 'warning'},
		{id:'33a',serial_number: '3',teacher_name: '安琪拉',phone_number: '17817836852',gender: '女',department: '校长室',role: '办公室主任',details: '详细设置',operation: '删除',name_active: true,edit_active: false,edit_text: '编辑',type_active: 'warning'}
		],
		'2a':[
		{id:'11b',serial_number: '1',teacher_name: '李白',phone_number: '17817836852',gender: '男',department: '教务处',role: '教育处主任',details: '详细设置',operation: '删除',name_active: true,edit_active: false,edit_text: '编辑',type_active: 'warning'},
		{id:'22b',serial_number: '2',teacher_name: '露娜',phone_number: '17817836852',gender: '女',department: '教务处',role: '教育处副主任',details: '详细设置',operation: '删除',name_active: true,edit_active: false,edit_text: '编辑',type_active: 'warning'},
		{id:'33b',serial_number: '3',teacher_name: '娜娜',phone_number: '17817836852',gender: '女',department: '教务处',role: '教育处职员',details: '详细设置',operation: '删除',name_active: true,edit_active: false,edit_text: '编辑',type_active: 'warning'},
		],
		'3a':[
		{id:'11c',serial_number: '1',teacher_name: '貂蝉',phone_number: '17817836852',gender: '男',department: '德育处',role: '德育处主任',details: '详细设置',operation: '删除',name_active: true,edit_active: false,edit_text: '编辑',type_active: 'warning'},
		{id:'22c',serial_number: '2',teacher_name: '娜娜',phone_number: '17817836852',gender: '男',department: '德育处',role: '德育处副主任',details: '详细设置',operation: '删除',name_active: true,edit_active: false,edit_text: '编辑',type_active: 'warning'},
		{id:'33c',serial_number: '3',teacher_name: '后羿',phone_number: '17817836852',gender: '女',department: '德育处',role: '德育处职员',details: '详细设置',operation: '删除',name_active: true,edit_active: false,edit_text: '编辑',type_active: 'warning'},
		],
		'1b':[
		{id:'11d',serial_number: '1',teacher_name: '诸葛亮',phone_number: '17817836852',gender: '女',department: '语文',role: '语文老师',details: '详细设置',operation: '删除',name_active: true,edit_active: false,edit_text: '编辑',type_active: 'warning'},
		{id:'22d',serial_number: '2',teacher_name: '小妹',phone_number: '17817836852',gender: '女',department: '语文',role: '语文老师',details: '详细设置',operation: '删除',name_active: true,edit_active: false,edit_text: '编辑',type_active: 'warning'},
		{id:'33d',serial_number: '3',teacher_name: '娜娜',phone_number: '17817836852',gender: '女',department: '语文',role: '语文老师',details: '详细设置',operation: '删除',name_active: true,edit_active: false,edit_text: '编辑',type_active: 'warning'}
		],
		'2b':[
		{id:'11e',serial_number: '1',teacher_name: '冰洁',phone_number: '17817836852',gender: '女',department: '数学',role: '数学老师',details: '详细设置',operation: '删除',name_active: true,edit_active: false,edit_text: '编辑',type_active: 'warning'},
		{id:'22e',serial_number: '2',teacher_name: '小江',phone_number: '17817836852',gender: '男',department: '数学',role: '数学老师',details: '详细设置',operation: '删除',name_active: true,edit_active: false,edit_text: '编辑',type_active: 'warning'},
		{id:'33e',serial_number: '3',teacher_name: '红娘',phone_number: '17817836852',gender: '女',department: '数学',role: '数学老师',details: '详细设置',operation: '删除',name_active: true,edit_active: false,edit_text: '编辑',type_active: 'warning'},
		],
		'3b':[
		{id:'11f',serial_number: '1',teacher_name: '粑粑',phone_number: '17817836852',gender: '女',department: '英语',role: '英语老师',details: '详细设置',operation: '删除',name_active: true,edit_active: false,edit_text: '编辑',type_active: 'warning'},
		{id:'22f',serial_number: '2',teacher_name: '红娘',phone_number: '17817836852',gender: '女',department: '英语',role: '英语老师',details: '详细设置',operation: '删除',name_active: true,edit_active: false,edit_text: '编辑',type_active: 'warning'},
		{id:'33f',serial_number: '3',teacher_name: '娜娜',phone_number: '17817836852',gender: '男',department: '英语',role: '英语老师',details: '详细设置',operation: '删除',name_active: true,edit_active: false,edit_text: '编辑',type_active: 'warning'},
		],
		'1c':[
		{id:'11g',serial_number: '1',teacher_name: '安琪拉',phone_number: '17817836852',gender: '男',department: '地理',role: '地理老师',details: '详细设置',operation: '删除',name_active: true,edit_active: false,edit_text: '编辑',type_active: 'warning'},
		{id:'22g',serial_number: '2',teacher_name: '鲜红',phone_number: '17817836852',gender: '男',department: '地理',role: '地理老师',details: '详细设置',operation: '删除',name_active: true,edit_active: false,edit_text: '编辑',type_active: 'warning'},
		{id:'33g',serial_number: '3',teacher_name: '娜娜',phone_number: '17817836852',gender: '女',department: '地理',role: '地理老师',details: '详细设置',operation: '删除',name_active: true,edit_active: false,edit_text: '编辑',type_active: 'warning'}
		],
		'2c':[
		{id:'11h',serial_number: '1',teacher_name: '冰洁',phone_number: '17817836852',gender: '女',department: '历史',role: '历史老师',details: '详细设置',operation: '删除',name_active: true,edit_active: false,edit_text: '编辑',type_active: 'warning'},
		{id:'22h',serial_number: '2',teacher_name: '貂蝉',phone_number: '17817836852',gender: '女',department: '历史',role: '历史老师',details: '详细设置',operation: '删除',name_active: true,edit_active: false,edit_text: '编辑',type_active: 'warning'},
		{id:'33h',serial_number: '3',teacher_name: '娜娜',phone_number: '17817836852',gender: '女',department: '历史',role: '历史老师',details: '详细设置',operation: '删除',name_active: true,edit_active: false,edit_text: '编辑',type_active: 'warning'},
		],
		'3c':[
		{id:'11i',serial_number: '1',teacher_name: '兔子',phone_number: '17817836852',gender: '男',department: '物理',role: '物理老师',details: '详细设置',operation: '删除',name_active: true,edit_active: false,edit_text: '编辑',type_active: 'warning'},
		{id:'22i',serial_number: '2',teacher_name: '娜娜',phone_number: '17817836852',gender: '女',department: '物理',role: '物理老师',details: '详细设置',operation: '删除',name_active: true,edit_active: false,edit_text: '编辑',type_active: 'warning'},
		{id:'33i',serial_number: '3',teacher_name: '貂蝉',phone_number: '17817836852',gender: '女',department: '物理',role: '物理老师',details: '详细设置',operation: '删除',name_active: true,edit_active: false,edit_text: '编辑',type_active: 'warning'},
		],
	}
	export default{
		data(){
			return{
				campus: ['凤凰校区'],
				campus_data: '',
				subject_data: [],
				teacher_data: [],
				campus_record: 0,
				subject_record: 0,
				campus_id: '',
				subject_id: '',
				teacher_header: ['序号','教师名称','手机号码','性别','部门/学科','角色/职位','详情','操作'],
				add_active: false,
				teacher_name_input: '',
				phone_number_input: '',
				sex_input: '',
				exchange_department: '',
				department_subject: 0,
				department_type: 'ghost',
				subject_type: 'ghost',
				subjectDepartmentText: '学科',
				campus_count: [],
				subject_count: [],
			}
		},
		beforeMount:function(){
		},
		mounted:function(){
		},
		created:function(){
			this.getJson();
		},
		watch:{
            phone_number_input(curVal,oldVal){
            	if(isNaN(curVal)){
            		this.infoPhone();
            	}
            }
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
							count_color: true
						})
					}
					that.campus_data = campus;
					that.campusEvent(0);
				}).catch(function(err){
					alert(err);
				})
			},
			//校园事件
			campusEvent(index){
				this.campus_record = index;
				this.subject_record = 0;
				this.campus_id = campus[this.campus_record].id;
				var that = this;
				var xiaoqu_id = that.campus_id;
				var parameter = {xiaoqu_id: xiaoqu_id};
				this.$http.post('http://47.106.77.12/api/Guanli/getBumenXueke',parameter).then(function(response){
					console.log(response);
					var subjectArr = [];
//					var subject = {};
					if(that.department_subject == 0){
						var totalArr = ['xiaoqu_xueke'];
						that.department_type = 'ghost';
						that.subject_type = 'primary';
					}else{
						var totalArr = ['bumen'];
						that.department_type = 'primary';
						that.subject_type = 'ghost';
					}
					for(var i=0;i<totalArr.length;i++){
						for(var k=0;k<response.data[totalArr[i]].data.length;k++){
							subjectArr.push({
								id: response.data[totalArr[i]].data[k].id,
								name: response.data[totalArr[i]].data[k].mingcheng,
								active: false,
								count_color: true,
								jiaoshi_id_str: response.data[totalArr[i]].data[k].jiaoshi_id_str,
							})
						}
					}
					subject[that.campus_id] = subjectArr;
					that.subject_data = subject[that.campus_id];
					that.colorSubjectPackage();
					that.campus_data[that.campus_record].active = true;
					that.exchange_department = subject[that.campus_id][that.subject_record].name;
					that.department_subject = 0;
					that.subjectEvent(0);
					that.subject_count = [];
					that.campusCount();
					for(var i=0;i<that.campus_data.length;i++){
						that.campus_data[i].count_color = true;
					}
					that.campus_data[that.campus_record].count_color = false;
				}).catch(function(err){
					alert(err);
				})	
				
			},
			//科目事件
			subjectEvent(index){
//				var xuexiao_id = 
//				var xiaoqu_id =
//				var tel =88
//				var mingcheng = 
//				var sex = 88
//				var bumen_id =6
//				var bumen_mingcheng =6
//				var juese_id_str = 6
//				var juese_mingcheng_str = null
				this.subject_record = index;				
				this.subject_id = subject[this.campus_id][this.subject_record].id;
				var that = this;
				var jiaoshi_id_str = that.subject_data[index].jiaoshi_id_str;
				var parameter = {jiaoshi_id_str: jiaoshi_id_str};
				this.$http.post('http://47.106.77.12/api/Guanli/getBumenJiaoshi',parameter).then(function(response){
					console.log(response.data.data);
					var teacherArr = [];
					for(var i=0;i<response.data.data.length;i++){
						if(response.data.data[i].sex == 0){
							var sexStr = '女';
						}else{
							var sexStr = '男';
						}
						teacherArr.push({
							id: response.data.data[i].id,
							serial_number: i+1,
							teacher_name: response.data.data[i].mingcheng,
							phone_number: response.data.data[i].tel,
							gender: sexStr,
							department: '校长室',
							role: '校长',
							details: '详细设置',
							operation: '删除',
							name_active: true,
							edit_active: false,
							edit_text: '编辑',
							type_active: 'warning',
//							xuexiao_id: response.data.data[i].xuexiao_id,
//							xiaoqu_id: response.data.data[i].xiaoqu_id,
							bumen_id: response.data.data[i].bumen_id,
							bumen_mingcheng: response.data.data[i].bumen_mingcheng,
							juese_id_str: response.data.data[i].juese_id_str,
							juese_mingcheng_str: response.data.data[i].juese_mingcheng_str,
						})
					}
					teacher[that.subject_id] = teacherArr;
					that.teacher_data = teacher[that.subject_id];
					that.colorTeacherPackage();
					that.subject_data[that.subject_record].active = true;
					that.exchange_department = subject[that.campus_id][that.subject_record].name;
					that.subjectCount();
					for(var i=0;i<that.subject_data.length;i++){
						that.subject_data[i].count_color = true;
					}
					that.subject_data[that.subject_record].count_color = false;
				}).catch(function(err){
					alert(err);
				})	
			},
			//添加教师
			addTeacher(){
				this.add_active = !this.add_active;
			},
			//取消添加教师
			addCancelTeacher(){
				this.teacher_name_input = '';
				this.phone_number_input = '';
				this.sex_input = '';
				this.add_active = false;
			},
			//添加教师确定
			addTeacherDetermine(){
				if(this.teacher_name_input != '' && this.phone_number_input != '' && this.sex_input != ''){
					if(this.sex_input == '男'){
						this.sex_input = 1;
					}else if(this.sex_input == '女'){
						this.sex_input = 0;
					}
				var xuexiao_id = 14;
				var xiaoqu_id = this.campus_data[this.campus_record].id;
				var tel = this.phone_number_input;
				var mingcheng = this.teacher_name_input;
				var sex = this.sex_input;
				var bumen_id = this.teacher_data[this.subject_record].bumen_id;
				var bumen_mingcheng = this.teacher_data[this.subject_record].bumen_mingcheng;
				var juese_id_str = 0;
				var juese_mingcheng_str = '档案室';

				var that = this;
				var parameter = {xuexiao_id: xuexiao_id,xiaoqu_id: xiaoqu_id,tel: tel,mingcheng: mingcheng,sex: sex,bumen_id: bumen_id,bumen_mingcheng: bumen_mingcheng,juese_id_str: juese_id_str,juese_mingcheng_str: juese_mingcheng_str};
				console.log(parameter)
				this.$http.post('http://47.106.77.12/api/Guanli/addJiaoshi',parameter).then(function(response){
					console.log(response);
					if(that.sex_input == 0){
						that.sex_input = '女';
					}else{
						that.sex_input = '男';
					}
					var setId = response.data.has_add;
					that.teacher_data.push({
						id: setId,
						serial_number: that.teacher_data.length + 1,
						teacher_name: that.teacher_name_input,
						phone_number: that.phone_number_input,
						gender: that.sex_input,
						department: subject[that.campus_id][that.subject_record].name,
						role: '教师',
						details: '详细设置',
						operation: '删除',
						name_active: true,
						edit_active: false,
						edit_text: '编辑',
						type_active: 'warning'
					})
//					console.log('yahooooooo');
//					console.log(that.teacher_name_input);
//					that.teacher_name_input = '';
//					that.phone_number_input = '';
//					that.sex_input = '';
					that.add_active = !that.add_active;
				}).catch(function(err){
					alert(err);
				})
					




					
				}else{
					that.info();
				}
			},
			//上移
			moveData(index){
				var newArr = [];
				for(var i=0;i<this.teacher_data.length;i++){
					if(i<index-1){
						newArr.push(this.teacher_data[i]);
					}else if(i == index-1){
						var department_temp = this.teacher_data[i+1].serial_number;
						this.teacher_data[i+1].serial_number = this.teacher_data[i].serial_number;
						newArr.push(this.teacher_data[i+1]);
					}else if(i == index){
						this.teacher_data[i-1].serial_number = department_temp;
						newArr.push(this.teacher_data[i-1]);
					}else if(i>=index+1){
						newArr.push(this.teacher_data[i]);
					}
				}
				this.teacher_data = newArr;
			},
			//下移
			downData(index){
				var newArr = [];
				for(var i=0;i<this.teacher_data.length;i++){
					if(i<=index-1){
						newArr.push(this.teacher_data[i]);
					}else if(i == index){
						var department_temp = this.teacher_data[i+1].serial_number;
						this.teacher_data[i+1].serial_number = this.teacher_data[i].serial_number;
						newArr.push(this.teacher_data[i+1]);
					}else if(i == index+1){
						this.teacher_data[i-1].serial_number = department_temp;
						newArr.push(this.teacher_data[i-1]);
					}else if(i>index+1){
						newArr.push(this.teacher_data[i]);
					}
				}
				this.teacher_data = newArr;
			},
			//删除教师数据
			deleteData(index){
				teacher[this.subject_id] = this.teacher_data;
				this.teacher_data = teacher[this.subject_id];
//				//后台交接
				var jiaoshi_id = teacher[this.subject_id][index].id;
				var that = this;
				var parameter = {jiaoshi_id: jiaoshi_id}
				this.$http.post('http://47.106.77.12/api/Guanli/delJiaoshi',parameter).then(function(response){
					console.log(response);
					teacher[that.subject_id].splice(index,1);
				}).catch(function(err){
					alert(err);
				})	
				
			},
			//全局提示
			info () {
                this.$Message.info('内容不能为空');
            },
            //全局提示
            infoPhone () {
                this.$Message.info('请输入数字');
            },
            //上颜色
            colorSubjectPackage(){
				for(var i=0;i<this.campus_data.length;i++){
					this.campus_data[i].active = false;
				}
            },
            colorTeacherPackage(){
				for(var i=0;i<this.subject_data.length;i++){
					this.subject_data[i].active = false;
				}
            },
            //教师编辑
            room_edit(index){
            	if(this.teacher_data[index].name_active == true){
					this.teacher_data[index].name_active = false;
					this.teacher_data[index].edit_active = true;
					this.teacher_data[index].edit_text = '确定';
					this.teacher_data[index].type_active = 'success';
				}else{
					this.teacher_data[index].name_active = true;
					this.teacher_data[index].edit_active = false;
					this.teacher_data[index].edit_text = '编辑';
					this.teacher_data[index].type_active = 'warning';
					
					//后台交接
					var jiaoshi_id = this.teacher_data[index].id;
					var tel = this.teacher_data[index].phone_number; 
					var mingcheng = this.teacher_data[index].teacher_name;
					var juese_id_str = this.teacher_data[index].juese_id_str;
					var juese_mingcheng_str =this.teacher_data[index].juese_mingcheng_str;
					var that = this;
					var parameter = {jiaoshi_id: jiaoshi_id,tel: tel,mingcheng: mingcheng,juese_id_str: juese_id_str,juese_mingcheng_str: juese_mingcheng_str};
					this.$http.post('http://47.106.77.12/api/Guanli/saveFieldJiaoshi',parameter).then(function(response){
						console.log(response);
					}).catch(function(err){
						alert(err);
					})	
					
					
					
				}
            },
            //部门
            departmentType(){
            	this.department_subject = 1;
            	this.campusEvent(this.campus_record);
            },
            //学科
            subjectType(){
            	this.department_subject = 0;
            	this.campusEvent(this.campus_record);
            },
            //校园计数
           	campusCount(){
           		this.campus_count[this.campus_record] = subject[this.campus_id].length;
           	},
           	//学科或部门计数
           	subjectCount(){
           		this.subject_count[this.subject_record] = teacher[this.subject_id].length;
           	}
		}
	}
</script>

<style>
	@import url("./css/jiaoshiguanli");
</style>