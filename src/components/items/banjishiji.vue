<template>
	<section class="things_frames">
		<div class="header_things">
			<div class="header_things_left">
					<ul>
						<li>
							<Icon type="ios-box" size='40'></Icon>
						</li>
						<li><span style="color: red;">高一11班</span>的班级事记</li>
					</ul>
			</div>
			<div class="header_things_right">
				<Button type="ghost" style="float: right;margin-right: 20px;margin-top: 8px;" @click="addActivityThings"><Icon type="plus"></Icon>{{add_btn_content}}</Button>
			</div>
		</div>
		<div class="class_things">
			<div class="sports_meeting">
				<!--添加事记-->
				<div class="sports_meeting_things" v-show="add_activity">
					<div class="sports_meeting_date">
						<div class="sports_meeting_date_top"><span>{{month_day}}</span></div>
						<div class="sports_meeting_date_bottom"><span>{{year}}</span></div>
					</div>
					<div class="sports_meeting_icon">
						<div></div>
						<div><Icon size="40" type="ios-analytics" color="#2d8cf0"></Icon></div>
						<div></div>
					</div>
					<div class="sports_meeting_text">
						<div class="sports_meeting_text_top">
							<Input placeholder="请输入主标题" size="small" style="width: 170px;" v-model="formItem.main_title"></Input>
						</div>
						<div class="sports_meeting_text_bottom">
							<Input placeholder="请输入副标题" size="small" style="width: 170px" v-model="formItem.subtitle"></Input>
						</div>
					</div>
					
				</div>
				<!--事记-->
				<div class="sports_meeting_things" v-for="(item,index) in things_data">
					<div class="sports_meeting_date">
						<div class="sports_meeting_date_top"><span>{{item.date_day}}</span></div>
						<div class="sports_meeting_date_bottom"><span>{{item.date_year}}</span></div>
					</div>
					<div class="sports_meeting_icon">
						<div><span v-if="index != 0"></span></div>
						<div @click="iconThings(index)"><Icon size="40" type="ios-analytics" :color="item.icon_color"></Icon></div>
						<div><span v-if="index != things_data.length-1"></span></div>
					</div>
					<div class="sports_meeting_text">
						<div class="sports_meeting_text_top"><span>{{item.main_title}}</span></div>
						<div class="sports_meeting_text_bottom"><span>{{item.subtitle}}</span></div>
					</div>
				</div>
				
			</div>
			<div class="active_photo">
				<div class="active_photo_header">
					<div class="active_photo_header_left">
						<dl class="active_photo_dl">
							<dt><img class="head_portrait" src="../../../static/a1.jpg"/></dt>
							<dd>蒋老师</dd>
							<dd>{{record_time}}</dd>
						</dl>
					</div>
					<div class="active_photo_header_right">
						<Icon type="chevron-down"></Icon>
					</div>
					
				</div>
				<section v-show="activity_content_active">
					<div class="activity_content_text">
						{{activity_content}}
					</div>
					<div class="activity_content_lun" @mouseover="lunBoOver()" @mouseout="lunBoOut()" v-show="lun_bo_active">
						<div class='lun_bo_frames'>
	    					<ul class="nav_imgs" :style="{left: lun_bo_left,width: lun_bo_width}">
	    						<li v-for="(item,index) in lun_bo_arr" @click="pictureEvent(index)">
	    							<img :src="item"/>
	    						</li>
	    					</ul>
	    					<ul class="lun_bo_circle">
	    						<li v-for="(item,index) in lun_bo_circular" :class="{'circle_color':item.active}" @click="circleEvent(index)">{{item.label}}</li>
	    					</ul>
						</div>
						<div class="prev" @click="prev"><Icon type="arrow-left-b"></Icon></div>
						<div class="next" @click="next"><Icon type="arrow-right-b"></Icon></div>
					</div>
					
					<div class="storage_file">
						<ul>
							<li v-for="item in uploading_file_data">
								<Button type="primary">{{item}}</Button>
							</li>
						</ul>
					</div>
				</section>
				<!--添加事记-->
				<section v-show="add_activity">
					<div class="active_photo_text">
						<Form :model="formItem" :label-width="0">
					        <FormItem>
					            <Input v-model="formItem.textarea" type="textarea" :autosize="{minRows: 8,maxRows: 8}" placeholder="请输入活动内容">yahoo</Input>
					        </FormItem>
					    </Form>
					</div>
					<div class="active_photo_lun">
	    				<Upload
					        multiple
					        type="drag"
					        :format="['jpg','jpeg','png']"
					        :max-size="2048"
					        action="//jsonplaceholder.typicode.com/posts/"
					        :on-success="handleSuccess">
					        <div style="padding: 20px 0">
					            <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
					            <p>Click or drag files here to upload</p>
					        </div>
					    </Upload>
					</div>
				</section>
			</div>
		
		</div>
		
		
		
		
		
		
		<photo ref="photo"></photo>
		
		
	</section>
</template>

<script>
	var things = [
		{id: 1,date_day: '10.21',date_year: '2018',main_title: '大家的校运会',subtitle: '齐心协作,勇攀高峰',icon_color: '',activity_content: '同学们军训展示',
		sowing_map: ["../../../static/1.png","../../../static/2.png","../../../static/3.png","../../../static/4.png","../../../static/5.png","../../../static/6.png"],
		uploading_file: ['app.vue','yes.vue']},
		{id: 2,date_day: '10.21',date_year: '2018',main_title: '大家的校运会',subtitle: '齐心协作,勇攀高峰',icon_color: '',activity_content: '同学们校运会展示',
		sowing_map: [],
		uploading_file: ['app.vue','yes.vue','yahoo.vue']},
		{id: 3,date_day: '10.21',date_year: '2018',main_title: '大家的校运会',subtitle: '齐心协作,勇攀高峰',icon_color: '',activity_content: '同学们春游展示',
		sowing_map: ["../../../static/1.png","../../../static/2.png","../../../static/3.png","../../../static/4.png","../../../static/5.png","../../../static/2.png","../../../static/4.png","../../../static/2.png","../../../static/3.png","../../../static/4.png","../../../static/6.png"],
		uploading_file: ['app.vue','yes.vue','yahoo.vue','bin.vue']},
	]
	import photo from './kanmeitu.vue';
	export default{
		components:{
			photo: photo
		},
		data(){
			return{
				formItem: {
                    main_title: '',
                    subtitle: '',
                    textarea: ''
               },
               things_data: '',
               add_activity: false,
               record_time: '',
               month_day: '',
               year: '',
               activity_content_active: true,
               activity_content: '',
               add_btn_content: '添加事记',
               uploading_file_data: [],
               lun_bo_active: false,
               lun_bo_num: 0,
               lun_bo_left: '0px',
               lun_bo_width: '',
               timer: '',
               lun_bo_load: [],
               lun_bo_arr:[],
               lun_bo_circular: [{label:'1',active: false},{label:'2',active: false},{label:'3',active: false},{label:'4',active: false}],
               
               
			}
		},
		mounted: function(){
			this.getJson();
			this.setDate();
			//轮播图
			this.sowing_map_package(0);
		},
		methods:{
			getJson(){
				this.things_data = things;
				//开始赋值
				this.things_data[0].icon_color = '#2d8cf0';
				this.activity_content = this.things_data[0].activity_content;
			},
			//添加事记
			addActivityThings(){
				//清空图标颜色
				this.icon_color();
				if(this.add_activity == false){
					this.add_activity = true;
					this.activity_content_active = false;
					this.add_btn_content = '确定';
					this.lun_bo_load = [];
				}else{
					this.add_activity = false;
					this.activity_content_active = true;
					this.add_btn_content = '添加事记';
					
					if(this.formItem.main_title != ''&&this.formItem.subtitle != ''){
						this.things_data.unshift({
							id: '1',
							date_day: this.month_day ,
							date_year: this.year,
							main_title: this.formItem.main_title,
							subtitle: this.formItem.subtitle,
							icon_color: '',
							activity_content: this.formItem.textarea,
							sowing_map: this.lun_bo_load,
						})
					}
					//活动内容
					this.activity_content = this.things_data[0].activity_content;
					//清空
					this.formItem.main_title = '';
					this.formItem.subtitle = '';
					this.formItem.textarea = '';
					this.setDate();
						//赋值内容
						this.things_data[0].icon_color = '#2d8cf0';
						this.activity_content = this.things_data[0].activity_content;
						//轮播图
						this.sowing_map_package(0);		
				}
				
			},
			//事记日期
			setDate(){
				var myDate = new Date();
				var months = myDate.getMonth() + 1;
				var timer = myDate.getFullYear() + '-' + months + '-' + myDate.getDate();
				var month_day = months + '.' + myDate.getDate();
				var year = myDate.getFullYear();
				var mytime = myDate.toTimeString().split('G')[0];
				var timeDeal = mytime.split(':');
				var timeValue = timeDeal[0] + ":" + timeDeal[1];
				this.month_day = month_day;
				this.year = year;
				this.record_time = timer + mytime;
			},
			//切换事记
			iconThings(index){
				if(this.add_activity != true){
					this.icon_color();
					this.things_data[index].icon_color = '#2d8cf0';
					this.activity_content = this.things_data[index].activity_content;
					//轮播图
					this.sowing_map_package(index);
					//上传文件
					this.uploading_file_data = [];
					this.uploading_file_data = this.things_data[index].uploading_file;
				}
			},
			//清空图标颜色
			icon_color(){
				for(var i=0;i<this.things_data.length;i++){
					this.things_data[i].icon_color = '';
				}
			},
			//前
			prev(){
				this.lun_bo_num--;
				this.move();
				var response = Math.abs(this.lun_bo_num);
				this.circleEvent(response);
			},
			//下
			next(){
				this.lun_bo_num++;
				this.move();
				var response = Math.abs(this.lun_bo_num);
				this.circleEvent(response);
			},
			//移动事件
			move(){
				var reincarnation = Math.ceil(this.lun_bo_arr.length/5);
				this.lun_bo_width = 535*reincarnation + 'px';
				if(this.lun_bo_num == reincarnation){
					this.lun_bo_num = 0;
				}
				if(this.lun_bo_num == -reincarnation){
					this.lun_bo_num = 0;
				}
				if(this.lun_bo_num < 0){
					this.lun_bo_left = this.lun_bo_num*535 + 'px';
				}else{
					this.lun_bo_left = -this.lun_bo_num*535 + 'px';
				}
			},
			//轮播图tad切换
			circleEvent(index){
				for(var i=0;i<this.lun_bo_circular.length;i++){
					this.lun_bo_circular[i].active = false;
				}
				this.lun_bo_circular[index].active = true;
				this.lun_bo_num = index;
				this.move();
			},
			//定时器事件
			timerCircle(){
				this.lun_bo_num++;
				this.move();
				var response = Math.abs(this.lun_bo_num);
				this.circleEvent(response);
			},
			//over事件
			lunBoOver(){
				clearInterval(this.timer);  
			},
			//out事件
			lunBoOut(){
				this.timer = setInterval(this.timerCircle,2000);
			},
			//轮播图切换封装
			sowing_map_package(index){
					if(this.things_data[index].sowing_map.length != 0){
						this.lun_bo_active = true;
						this.lun_bo_arr = '';
						this.lun_bo_circular = [];
						this.lun_bo_arr = this.things_data[index].sowing_map;
						var reincarnation = Math.ceil(this.lun_bo_arr.length/5);
						this.lun_bo_width = 535*reincarnation + 'px';
						for(var i=0;i<reincarnation;i++){
							this.lun_bo_circular.push({
								label: i+1,
								active: false
							})
						}
						this.lun_bo_num = 0;
						this.lun_bo_circular[0].active = true;
						this.lun_bo_left = '0px';
						clearInterval(this.timer);  
						this.timer = setInterval(this.timerCircle,2000);
					}else{
						this.lun_bo_active = false;
						this.lun_bo_arr = [];
						this.lun_bo_circular = [];
						this.lun_bo_num = 0;
						this.lun_bo_left = '0px';
						clearInterval(this.timer);  
					}
			},
			//图片事件
			pictureEvent(index){
//				alert(index);
				var response = this.lun_bo_arr;
				this.$refs.photo.sowing_map_package(response,index);
			},
			//上传成功事件
			handleSuccess(response, file, fileList) {
				var suffix_name = file.name.split('.')[1];
				if(suffix_name != 'jpg' && suffix_name != 'png'){
					this.uploading_file_data.push(file.name);
				}else{
					this.lun_bo_load.push('../../../static/'+file.name);
				}
			},
		}
	}
</script>

<style scoped>
	@import "./css/banjishiji.css";
</style>