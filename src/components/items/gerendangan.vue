<template>
	<section class="box">
		<div class="head_list">
			<ul>
				<li>
					<Icon type="ios-box" size='40'></Icon>
				</li>
				<li>王利民老师，这是你的个人信息</li>
			</ul>
		</div>
		<div class="content">
			<div class="content_tab">
				<ul>
					<li v-for="(item,index) in content_tab" :class="{'ivu-btn-primary':item.active}" @click="tabSwitch(index)">{{item.label}}</li>
				</ul>
			</div>
			<div class="content_information">
				<div class="information_frame" v-for="item in personal_information">
					<div class="information_type">
						<div class="information_type_left"><span>真实姓名</span></div>
						<div class="information_type_right">{{item.real_name}}</div>
					</div>
					<div class="information_type">
						<div class="information_type_left"><span>性别</span></div>
						<div class="information_type_right">{{item.sex}}</div>
					</div>
					<div class="information_type">
						<div class="information_type_left"><span>身份证号码</span></div>
						<div class="information_type_right">{{item.id_card}}</div>
					</div>
					<div class="information_type">
						<div class="information_type_left"><span>手机号码</span></div>
						<div class="information_type_right">{{item.phone_number}}<Button type="success" style="margin-left: 45px;margin-bottom: 3px;" @click="applyForModification">申请修改</Button></div>
					</div>
					<div class="information_type">
						<div class="information_type_left"><span>任教科目</span></div>
						<div class="information_type_right"><span>{{item.teaching_subjects}}</span><span class="timetable" @click="timeTable">查看课表</span></div>
					</div>
					<div class="information_type">
						<div class="information_type_left"><span>任教年级/班级</span></div>
						<div class="information_type_right">{{item.teaching_class}}<span class="schedule">周课时:{{subcomponent_data}}节</span></div>
					</div>
					<div class="information_type">
						<div class="information_type_left"><span>行政职务</span></div>
						<div class="information_type_right">{{item.administrative_duties}}</div>
					</div>
					<div class="information_type">
						<div class="information_type_left"><span>业务职务</span></div>
						<div class="information_type_right">
							<span :class="{'icon_color':icon_color[0].active}"><Icon type="ios-circle-filled"></Icon></span>下级行政
							<span :class="{'icon_color':icon_color[1].active}" style="margin-left: 20px;"><Icon type="ios-circle-filled"></Icon></span>级长
							<span :class="{'icon_color':icon_color[2].active}" style="margin-left: 20px;"><Icon type="ios-circle-filled"></Icon></span>班主任
						</div>
					</div>

				</div>
			</div>
		</div>

		<Modal v-model="modal1" width="370">
			<div slot="header">
				<div class="popups_apply_header">
					绑定手机
				</div>
			</div>

			<!--手机修改弹窗-->
			<div class="popups_apply_open">
				<div class="popups_apply_content">
					<Input type="text" style="width: 280px;height: 32px;margin-left: 20px;margin-top: 5px;" placeholder="请输入手机号码" class="phone_text" v-model="phoneNum"></Input>
					<Input type="text" style="width: 170px;height: 32px;margin-left: 20px;margin-top: 15px;" placeholder="请输入验证码" class="code_text" v-model="verifyNum"></Input>
					<Button type="warning" style="margin-left: 15px;margin-bottom: 2px;margin-top: 15px;" v-on:click="sendSmsCode" v-bind="{'disabled':disabled}">{{btnContent}}</Button>
				</div>
			</div>

			<div slot="footer">
				<div class="popups_apply_footer">
					<div class="popups_apply_footer_left">取消</div>
					<div class="popups_apply_footer_right" @click="applyClose">确定</div>
				</div>
			</div>
		</Modal>

		<Modal v-model="modal2" width="920" :styles="{top: '20px'}" title="查看课表">
			<div style="height: 580px;position: relative;overflow: hidden;">
				<course class="child_css" @purple='get'></course>
			</div>
			<div slot="footer">
			</div>
		</Modal>
	</section>
</template>

<script>
	var pageJson = [{
		id: 1,
		real_name: '王老师',
		sex: '男',
		id_card: '4409277882662672',
		phone_number: '1685634778',
		teaching_subjects: '数学',
		teaching_class: '高一年级(高一1班，高一12班)',
		administrative_duties: '教务处副主任',
		business_position: 1
	}]
	import course from './jiaoshikebiao.vue'
	export default {
		components: {
			course
		},
		data() {
			return {
				content_tab: [{
					label: '基本信息',
					active: true
				}, {
					label: '密码修改',
					active: false
				}, {
					label: '设备管理',
					active: false
				}, {
					label: '使用记录',
					active: false
				}],
				icon_color: [{
					active: false
				}, {
					active: false
				}, {
					active: false
				}],
				modal1: false,
				popups_apply_active: false,
				modal2: false,
				personal_information: '',
				subcomponent_data: '',
				phoneNum: '',
				verifyNum: '',
				time: 0,
				btnContent: "获取验证码",
				disabled: false,

			}
		},
		beforeMount: function() {

		},
		mounted: function() {
			this.getJson();
			//			this.miss();
		},
		methods: {
			getJson() {
				this.personal_information = pageJson;
				this.icon_color[this.personal_information[0].business_position].active = true;
			},
			tabSwitch(index) {
				for(var i = 0; i < this.content_tab.length; i++) {
					this.content_tab[i].active = false;
				}
				this.content_tab[index].active = true;
			},
			get(message) {
				this.subcomponent_data = message;
			},
			miss() {
				var ya = document.getElementsByTagName('icon')[0]
				alert(ya)
			},
			//查看课表
			timeTable() {
				this.modal2 = true;
			},
			//手机绑定弹窗
			applyForModification() {
				this.modal1 = true;
			},
			//弹窗关闭
			applyClose() {
				this.popups_apply_active = false;
			},
			//发送验证码
			sendSmsCode() {
				var reg = 11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/;
				if(!reg.test(this.phoneNum)) {
					this.infoPhone();
				} else {
					this.time = 5;
					this.timer();
				}
				// 获取验证码请求
			},
			//验证码定时器
			timer() {
				if(this.time > 0) {
					this.time--;
					this.btnContent = this.time + "s后重新获取";
					this.disabled = true;
					var timer = setTimeout(this.timer, 1000);
				} else if(this.time == 0) {
					this.btnContent = "获取验证码";
					clearTimeout(timer);
					this.disabled = false;
				}
			},
			//全局提示
			infoPhone() {
				this.$Message.info('您输入的手机号码不合法，请重新输入');
			},
		},
	}
</script>

<style scoped>
	@import './css/gerendangan.css';
</style>