<template>
	<section>
		<Modal v-model="modal1" width="750" title="选择联系人">
			<!--弹出窗-->
			<div class="popups_open">
				<div class="popups_content">
					<div class="popups_content_top">
						<ul>
							<li v-for="(item,index) in content_item" :class="{'ivu-btn-primary':item.active}" @click="classify(index)">{{item.name}}</li>
						</ul>
					</div>
					<div class="popups_content_middle">
						<div class="popups_content_middle_left">
							<ul>
								<li v-for="(item,index) in second_level_data" :class="{'ivu-btn-primary':item.active}" @click="officeContacts(index)">
									{{item.name}}
									<Icon style="float: right;line-height: 40px;margin-right: 5px;" type="chevron-right"></Icon>
								</li>
							</ul>
						</div>
						<div class="popups_content_middle_right">
							<div class="popups_content_middle_right_top">
								<Button type="error" style="margin-right: 5px;" @click="totalSelection">全选</Button>
								<Button type="ghost" @click="resetPeople">重置</Button>
							</div>
							<div class="popups_content_middle_right_bottom">
									<span v-for="(item,index) in contacts_people">
									<Button style="width: 68px;margin-right: 5px;margin-bottom: 5px;" :class="{'ivu-btn-primary':item.active}" v-bind="{'disabled':item.disable_btn}" @click="selectContacts(index)">{{item.name}}</Button>
									</span>
							</div>
						</div>
					</div>
				</div>
			</div>
			
			<div slot="footer">
				<div class="popups_footer">
					<div class="popups_footer_left"><div>已选中<span style="color: red;">{{contacts_amount}}</span>位联系人</div></div>
					<div class="popups_footer_right">
						<Button type="primary" @click='determine'>确定</Button>
						<Button v-on:click='cancel'>取消</Button>
					</div>
				</div>
			</div>
		</Modal>

	</section>
</template>

<script>
	var newArr = [];
	var officeJson = {
		'1':[
		{id:'1a',name: '教学楼',active:false},
		{id:'2a',name: '实验楼',active:false},
		{id:'3a',name: '行政楼',active:false}
		],
		'2':[
		{id:'1b',name: '大礼堂',active:false},
		{id:'2b',name: '实验楼',active:false},
		{id:'3b',name: '行政楼',active:false},
		],
		'3':[
		{id:'1c',name: '食堂',active:false},
		{id:'2c',name: '实验楼',active:false},
		{id:'3c',name: '行政楼',active:false},
		],
		'4':[
		{id:'1d',name: '大礼堂',active:false},
		{id:'2d',name: '教学楼',active:false},
		{id:'3d',name: '行政楼',active:false},
		]
	}
	var peopleJson = {
		'1a':[
		{id:'1',name: '教学楼',active:false,disable_btn: false},
		{id:'2',name: '实验楼',active:false,disable_btn: false},
		{id:'3',name: '行政楼',active:false,disable_btn: false},
		{id:'4',name: '教学楼',active:false,disable_btn: false},
		{id:'5',name: '实验楼',active:false,disable_btn: false},
		{id:'6',name: '行政楼',active:false,disable_btn: false},
		{id:'7',name: '教学楼',active:false,disable_btn: false},
		{id:'8',name: '实验楼',active:false,disable_btn: false},
		{id:'9',name: '行政楼',active:false,disable_btn: false}
		],
		'2a':[
		{id:'10',name: '大礼堂',active:false,disable_btn: false},
		{id:'11',name: '实验楼',active:false,disable_btn: false},
		{id:'12',name: '行政楼',active:false,disable_btn: false},
		],
		'3a':[
		{id:'13',name: '食堂',active:false,disable_btn: false},
		{id:'14',name: '实验楼',active:false,disable_btn: false},
		{id:'15',name: '行政楼',active:false,disable_btn: false},
		],
		'1b':[
		{id:'16',name: '教学楼1b',active:false,disable_btn: false},
		{id:'17',name: '实验楼1b',active:false,disable_btn: false},
		{id:'18',name: '行政楼1b',active:false,disable_btn: false}
		],
		'2b':[
		{id:'19',name: '大礼堂2b',active:false,disable_btn: false},
		{id:'20',name: '实验楼2b',active:false,disable_btn: false},
		{id:'21',name: '行政楼2b',active:false,disable_btn: false},
		],
		'3b':[
		{id:'22',name: '食堂3b',active:false,disable_btn: false},
		{id:'23',name: '实验楼3b',active:false,disable_btn: false},
		{id:'24',name: '行政楼3b',active:false,disable_btn: false},
		],
		'1c':[
		{id:'25',name: '教学楼1c',active:false,disable_btn: false},
		{id:'26',name: '实验楼1c',active:false,disable_btn: false},
		{id:'27',name: '行政楼1c',active:false,disable_btn: false}
		],
		'2c':[
		{id:'28',name: '大礼堂2c',active:false,disable_btn: false},
		{id:'29',name: '实验楼2c',active:false,disable_btn: false},
		{id:'30',name: '行政楼2c',active:false,disable_btn: false},
		],
		'3c':[
		{id:'31',name: '食堂3c',active:false,disable_btn: false},
		{id:'32',name: '实验楼3c',active:false,disable_btn: false},
		{id:'33',name: '行政楼3c',active:false,disable_btn: false},
		],
		'1d':[
		{id:'34',name: '教学楼1d',active:false,disable_btn: false},
		{id:'35',name: '实验楼1d',active:false,disable_btn: false},
		{id:'36',name: '行政楼1d',active:false,disable_btn: false}
		],
		'2d':[
		{id:'37',name: '大礼堂2d',active:false,disable_btn: false},
		{id:'38',name: '实验楼2d',active:false,disable_btn: false},
		{id:'39',name: '行政楼2d',active:false,disable_btn: false},
		],
		'3d':[
		{id:'40',name: '食堂3d',active:false,disable_btn: false},
		{id:'41',name: '实验楼3d',active:false,disable_btn: false},
		{id:'42',name: '行政楼3d',active:false,disable_btn: false},
		]
	}
	export default{
		data(){
			return{
				modal1: false,
				content_item: [{id: 1,name:'按级组分类',active:false}, {id: 2, name: '按科组分类',active:false},{id: 3,name: '部门分类',active:false}, {id: 4,name:'按角色分类',active:false}],
				second_level_data: [{id: 1,name: '高一年级'},{id: 2,name: '高二年级'},{id: 3,name: '高三年级'}],
				contacts_people: [{id: 1,name: '安琪拉'},{id: 2,name: '露娜'},{id: 3,name: '露露'}],
				item_id: '',
				office_id: '',
				people_id: '',
				people_name: '',
				contacts_amount: 0
			}
		},
		mounted:function(){
//			this.contactsOpen();
//			this.aboveAll();
		},
		created: function(){
			this.getJson();
		},
		methods:{
			getJson(){
				var that = this;
				var xiaoQuId = 20;
				var parameter = {xiaoqu_id: xiaoQuId};
				this.$http.post('http://47.106.77.12/Api/Hexin/getJiaoshiByLeibie',parameter).then(function(response){
						console.log(response)
						that.processingData(response);
				}).catch(function(err){
					alert(err);
				})		
			},
			processingData(response){
				console.log(response);
				var sortArr = ['nianji_data','xiaoqu_xueke_data','bumen_data','juese'];
				for(var k = 0; k < sortArr.length; k++) {
					var officeArr = [];
					var peopleArr = [];
					for(var i = 0; i < response.data[sortArr[k]].length; i++) {
						//办公
							officeArr.push({
								id: response.data[sortArr[k]][i].id,
								name: response.data[sortArr[k]][i].mingcheng,
								active:false,
							})
							officeJson[k+1] = officeArr;
						if(response.data[sortArr[k]][i].jiaoshi_id_str != null){
							var renId = '';
							var renWu = '';
							renId = response.data[sortArr[k]][i].jiaoshi_id_str.split(',');
							renWu = response.data[sortArr[k]][i].jiaoshi_mingcheng_str.split(',');
							for(var j=0;j<renId.length;j++){
								peopleArr.push({
									id: renId[j],
									name: renWu[j],
									active:false,
									disable_btn: false
								})
							}
							peopleJson[response.data[sortArr[k]][i].id] = peopleArr;
							peopleArr = [];
						}
					}
					
				}
				this.aboveAll();
//				console.log(officeJson)
//				console.log(peopleJson)
			},
			//挂在事件
			aboveAll(){
				this.content_item[0].active = true;
				this.item_id = this.content_item[0].id;
				this.linkage();
			},
			//联系人调用方法
			contactsOpen(choose,disable){
				this.modal1 = true;
				this.resetPeople();
//				var choose = [["4355", "吴孩福", 1, 0],["4342", "苗神小", 1, 1]];
//				var disable = [["4338", "吴料", 1, 2],["4330", "吴术", 1, 3]];
				if(choose == ''){
					choose = [];
				}
				if(disable == ''){
					disable = [];
				}
				newArr = '';
				newArr = choose;
				for(var i=0;i<newArr.length;i++){
					peopleJson[newArr[i][2]][newArr[i][3]].active = true;
				}
				this.contacts_amount = choose.length;
				for(var i=0;i<disable.length;i++){
					peopleJson[disable[i][2]][disable[i][3]].disable_btn = true;
				}
				
			},
			//分类事件
			classify(index){
				this.item_id = this.content_item[index].id;
				this.second_level_data = officeJson[this.item_id];
				for(var i=0;i<this.content_item.length;i++){
					this.content_item[i].active = false;
				}
				this.content_item[index].active = true;
				this.linkage();
			},
			//办公室事件
			officeContacts(index){
				this.office_id = this.second_level_data[index].id;
				this.contacts_people = peopleJson[this.office_id];
				for(var i=0;i<this.second_level_data.length;i++){
					this.second_level_data[i].active = false;
				}
				this.second_level_data[index].active = true;
				
			},
			//选择联系人
			selectContacts(index){
				if(this.contacts_people[index].active == false){
					this.contacts_people[index].active = true;
					this.people_id = this.contacts_people[index].id;
					this.people_name = this.contacts_people[index].name;
					newArr.push([this.people_id,this.people_name,this.office_id,index]);
				}else{
					this.contacts_people[index].active = false;
					this.people_id = this.contacts_people[index].id;
					for(var i=0;i<newArr.length;i++){
						if(this.people_id == newArr[i][0]){
							newArr.splice(i,1);
						}
					}
				}
				this.contacts_amount = newArr.length;
				console.log(newArr);
			},
			//联动数据变化
			linkage(){
				for(var i=0;i<this.second_level_data.length;i++){
					this.second_level_data[i].active = false;
				}
				this.second_level_data = officeJson[this.item_id];
				this.second_level_data[0].active = true;
				this.office_id = this.second_level_data[0].id;
				this.contacts_people = peopleJson[this.office_id];
			},
			//重置
			resetPeople(){
				var loadArr = []
				for(var item in peopleJson){
					loadArr.push(item);
				}
				for(var i=0;i<loadArr.length;i++){
					for(var k=0;k<peopleJson[loadArr[i]].length;k++){
						peopleJson[loadArr[i]][k].active = false;
						peopleJson[loadArr[i]][k].disable_btn = false;
					}
				}
				newArr = [];
				this.contacts_amount = newArr.length;
			},
			//全选
			totalSelection(){
				var count = 0;
				var disableCount = 0;
				for(var i=0;i<this.contacts_people.length;i++){
					if(this.contacts_people[i].disable_btn != true){
						if(this.contacts_people[i].active == true){
							count++;
						}
					}else{
						disableCount++;
					}
				}
				var numberLength = Number(this.contacts_people.length) - Number(disableCount);
				if(count == numberLength){
					for(var i=0;i<this.contacts_people.length;i++){
						if(this.contacts_people[i].disable_btn != true){
							this.contacts_people[i].active = false;
							this.people_id = this.contacts_people[i].id;
							for(var k=0;k<newArr.length;k++){
								if(this.people_id == newArr[k][0]){
									newArr.splice(k,1);
								}
							}
						}
					}
				}else{
					for(var i=0;i<this.contacts_people.length;i++){
						if(this.contacts_people[i].disable_btn != true){
							this.contacts_people[i].active = true;
							this.people_id = this.contacts_people[i].id;
							this.people_name = this.contacts_people[i].name;
							for(var k=0;k<newArr.length;k++){
								if(this.people_id == newArr[k][0]){
									newArr.splice(k,1);
								}
							}
							newArr.push([this.people_id,this.people_name,this.office_id,i]);
						}
					}
				}
				this.contacts_amount = newArr.length;
				console.log(newArr)
			},
			//确定
			determine(){
				this.modal1 = false;
				this.$parent.contacts_accept(newArr);
			},
			//取消
			cancel(){
				this.modal1 = false;
			}
		}
	}
</script>

<style>
	@import './css/lianxiren.css';
</style>