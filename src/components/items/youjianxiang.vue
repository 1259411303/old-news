<template>
	<section>
		<!--邮件箱-->
		<div class="box">
			<div class="head">
				<ul>
					<li>
						<Icon type="ios-box" size='40'></Icon>
					</li>
					<li>今天是{{dateTime.year}}，现在的时间是{{dateTime.now}}</li>
				</ul>
				<div class="search">
					<Input type="text" style="width: 270px;height: 35px;" placeholder="请输入邮箱标题关键字"></Input>
					<Button style="width: 75px;height: 35px;margin-left: 10px;" @click="searchJson">搜索</Button>
				</div>
			</div>
			<div class="content">
				<div class="content_left">
					<ul>
						<li v-for="(item,index) in mail_type" @click="mailSort(index)" :class="{'ivu-btn-primary':item.active}">{{item.label}}</li>
					</ul>
				</div>
				<div class="content_right">
					<div class="ivew_tables">
						<Table border ref="selection" :columns="columns4" :data="page_data" @on-selection-change="sections"></Table>
					</div>
					<div class="iview_pages">
						<div class="page_left">
							<Button @click="handleSelectAll(true)">全选</Button>
							<Select v-model="select_value" style="width:80px;margin-left: 15px;">
						        <Option value="删除" key="删除">删除</Option>
						        <Option value="已读" key="已读">已读</Option>
						    </Select>
							<Button type="error" style="margin-left: 15px;" @click="determine">确定</Button>
						</div>
						<div class="page_right">
							<Page :total="page_total" show-elevator show-total :page-size="1" @on-change="changePage"></Page>
						</div>

					</div>
				</div>
			</div>

		</div>
	</section>
</template>

<script>
	var pageJson = [
		//全部邮件
		[
			[
				{ id: '1', mail_title: '1关于校运会的安排，详见附件', enclosures: '下载该附件', recipient: '李晓红', send_time: '2016-10-03', mail_state: '0', enclosures_url: 'https://www.baidu.com/', enclosures_type: '', enclosures_two: '演讲.ppt', enclosures_three: '', mail_read: '0' },
				{ id: '2', mail_title: '2关于校运会的安排，详见附件', enclosures: '家长会安排.xls,', recipient: '李晓红', send_time: '2016-10-01', mail_state: '1', enclosures_url: '', enclosures_type: '', enclosures_two: '', enclosures_three: '', mail_read: '0' },
				{ id: '3', mail_title: '3关于校运会的安排，详见附件', enclosures: '安排.wps', recipient: '李晓红', send_time: '2016-10-02', mail_state: '1', enclosures_url: '', enclosures_type: '', enclosures_two: '', enclosures_three: '', mail_read: '1' },
				{ id: '4', mail_title: '4关于校运会的安排，详见附件', enclosures: '无', recipient: '李晓红', send_time: '2016-10-04', mail_state: '1', enclosures_url: '', enclosures_type: '', enclosures_two: '', enclosures_three: '', mail_read: '1' },
				{ id: '2', mail_title: '2关于校运会的安排，详见附件', enclosures: '家长会安排.xls,', recipient: '李晓红', send_time: '2016-10-01', mail_state: '1', enclosures_url: '', enclosures_type: '', enclosures_two: '', enclosures_three: '', mail_read: '1' },
				{ id: '3', mail_title: '3关于校运会的安排，详见附件', enclosures: '安排.wps', recipient: '李晓红', send_time: '2016-10-02', mail_state: '1', enclosures_url: '', enclosures_type: '', enclosures_two: '', enclosures_three: '', mail_read: '1' },
				{ id: '4', mail_title: '4关于校运会的安排，详见附件', enclosures: '无', recipient: '李晓红', send_time: '2016-10-04', mail_state: '1', enclosures_url: '', enclosures_type: '', enclosures_two: '', enclosures_three: '', mail_read: '1' },
				{ id: '2', mail_title: '2关于校运会的安排，详见附件', enclosures: '家长会安排.xls,', recipient: '李晓红', send_time: '2016-10-01', mail_state: '1', enclosures_url: '', enclosures_type: '', enclosures_two: '', enclosures_three: '', mail_read: '1' },
				{ id: '3', mail_title: '3关于校运会的安排，详见附件', enclosures: '安排.wps', recipient: '李晓红', send_time: '2016-10-02', mail_state: '1', enclosures_url: '', enclosures_type: '', enclosures_two: '', enclosures_three: '', mail_read: '1' },
				{ id: '4', mail_title: '4关于校运会的安排，详见附件', enclosures: '无', recipient: '李晓红', send_time: '2016-10-04', mail_state: '1', enclosures_url: '', enclosures_type: '', enclosures_two: '', enclosures_three: '', mail_read: '1' },
			],
			[
				{ id: '1', mail_title: '11关于校运会的安排，详见附件', enclosures: '下载该附件', recipient: '谢娜娜', send_time: '2016-10-03', mail_state: '0', enclosures_url: 'https://www.baidu.com/', enclosures_type: '', enclosures_two: '', enclosures_three: '', mail_read: '0' },
				{ id: '2', mail_title: '22关于校运会的安排，详见附件', enclosures: '演讲.ppt,', recipient: '谢娜娜', send_time: '2016-10-01', mail_state: '0', enclosures_url: '', enclosures_type: '', enclosures_two: '', enclosures_three: '', mail_read: '1' },
				{ id: '3', mail_title: '33关于校运会的安排，详见附件', enclosures: '安排.wps', recipient: '谢娜娜', send_time: '2016-10-02', mail_state: '1', enclosures_url: '', enclosures_type: '', enclosures_two: '', enclosures_three: '', mail_read: '1' },
				{ id: '4', mail_title: '44关于校运会的安排，详见附件', enclosures: '无', recipient: '谢娜娜', send_time: '2016-10-04', mail_state: '1', enclosures_url: '', enclosures_type: '', enclosures_two: '', enclosures_three: '', mail_read: '1' },
			],
			[
				{ id: '1', mail_title: '111关于校运会的安排，详见附件', enclosures: '下载该附件', recipient: '刘小妹', send_time: '2016-10-03', mail_state: '0', enclosures_url: 'https://www.baidu.com/', enclosures_type: '', enclosures_two: '', enclosures_three: '', mail_read: '0' },
				{ id: '2', mail_title: '222关于校运会的安排，详见附件', enclosures: '备课.ppt,', recipient: '刘小妹', send_time: '2016-10-01', mail_state: '1', enclosures_url: '', enclosures_type: '', enclosures_two: '', enclosures_three: '', mail_read: '0' },
				{ id: '3', mail_title: '333关于校运会的安排，详见附件', enclosures: '安排.wps', recipient: '刘小妹', send_time: '2016-10-02', mail_state: '0', enclosures_url: '', enclosures_type: '', enclosures_two: '', enclosures_three: '', mail_read: '0' },
				{ id: '4', mail_title: '444关于校运会的安排，详见附件', enclosures: '无', recipient: '刘小妹', send_time: '2016-10-04', mail_state: '1', enclosures_url: '', enclosures_type: '', enclosures_two: '', enclosures_three: '', mail_read: '1' },
			],
		],
		//未读邮件
		[
			[
				{ id: '1', mail_title: '1关于家长会的安排，详见附件', enclosures: '下载该附件', recipient: '李晓红', send_time: '2016-10-03', mail_state: '0', enclosures_url: 'https://www.baidu.com/', enclosures_type: '', enclosures_two: '演讲.ppt', enclosures_three: '备课.ppt', mail_read: '0' },
				{ id: '2', mail_title: '2关于家长会的安排，详见附件', enclosures: '家长会安排.xls,', recipient: '李晓红', send_time: '2016-10-01', mail_state: '0', enclosures_url: '', enclosures_type: '', enclosures_two: '', enclosures_three: '', mail_read: '0' },
				{ id: '3', mail_title: '3关于家长会的安排，详见附件', enclosures: '安排.wps', recipient: '李晓红', send_time: '2016-10-02', mail_state: '1', enclosures_url: '', enclosures_type: '', enclosures_two: '', enclosures_three: '', mail_read: '1' },
				{ id: '4', mail_title: '4关于家长会的安排，详见附件', enclosures: '无', recipient: '李晓红', send_time: '2016-10-04', mail_state: '1', enclosures_url: '', enclosures_type: '', enclosures_two: '', enclosures_three: '', mail_read: '1' },
			],
		],
		//发送的邮件
		[
			[
				{ id: '1', mail_title: '1关于校运会的安排，详见附件', enclosures: '下载该附件', recipient: '李晓红', send_time: '2016-10-03', mail_state: '0', enclosures_url: 'https://www.baidu.com/', enclosures_type: '', enclosures_two: '演讲.ppt', enclosures_three: '备课.ppt', mail_read: '0' },
				{ id: '2', mail_title: '2关于家长会的安排，详见附件', enclosures: '家长会安排.xls,', recipient: '李晓红', send_time: '2016-10-01', mail_state: '1', enclosures_url: '', enclosures_type: '', enclosures_two: '', enclosures_three: '', mail_read: '0' },
				{ id: '3', mail_title: '3关于校运会的安排，详见附件', enclosures: '安排.wps', recipient: '李晓红', send_time: '2016-10-02', mail_state: '1', enclosures_url: '', enclosures_type: '', enclosures_two: '', enclosures_three: '', mail_read: '1' },
				{ id: '4', mail_title: '4关于校运会的安排，详见附件', enclosures: '无', recipient: '李晓红', send_time: '2016-10-04', mail_state: '1', enclosures_url: '', enclosures_type: '', enclosures_two: '', enclosures_three: '', mail_read: '1' },
			],
			[
				{ id: '1', mail_title: '11关于校运会的安排，详见附件', enclosures: '下载该附件', recipient: '谢娜娜', send_time: '2016-10-03', mail_state: '0', enclosures_url: 'https://www.baidu.com/', enclosures_type: '', enclosures_two: '', enclosures_three: '', mail_read: '0' },
				{ id: '2', mail_title: '22关于校运会的安排，详见附件', enclosures: '演讲.ppt,', recipient: '谢娜娜', send_time: '2016-10-01', mail_state: '0', enclosures_url: '', enclosures_type: '', enclosures_two: '', enclosures_three: '', mail_read: '1' },
				{ id: '3', mail_title: '33关于校运会的安排，详见附件', enclosures: '安排.wps', recipient: '谢娜娜', send_time: '2016-10-02', mail_state: '1', enclosures_url: '', enclosures_type: '', enclosures_two: '', enclosures_three: '', mail_read: '1' },
				{ id: '4', mail_title: '44关于校运会的安排，详见附件', enclosures: '无', recipient: '谢娜娜', send_time: '2016-10-04', mail_state: '1', enclosures_url: '', enclosures_type: '', enclosures_two: '', enclosures_three: '', mail_read: '1' },
			],
		],
		//草稿箱
		[
			[
				{ id: '1', mail_title: '1关于家长会的安排，详见附件', enclosures: '下载该附件', recipient: '李晓红', send_time: '2016-10-03', mail_state: '1', enclosures_url: 'https://www.baidu.com/', enclosures_type: '', enclosures_two: '演讲.ppt', enclosures_three: '备课.ppt', mail_read: '0' },
				{ id: '2', mail_title: '2关于家长会的安排，详见附件', enclosures: '家长会安排.xls,', recipient: '李晓红', send_time: '2016-10-01', mail_state: '1', enclosures_url: '', enclosures_type: '', enclosures_two: '', enclosures_three: '', mail_read: '0' },
				{ id: '3', mail_title: '3关于校运会的安排，详见附件', enclosures: '安排.wps', recipient: '李晓红', send_time: '2016-10-02', mail_state: '1', enclosures_url: '', enclosures_type: '', enclosures_two: '', enclosures_three: '', mail_read: '1' },
				{ id: '4', mail_title: '4关于校运会的安排，详见附件', enclosures: '无', recipient: '李晓红', send_time: '2016-10-04', mail_state: '1', enclosures_url: '', enclosures_type: '', enclosures_two: '', enclosures_three: '', mail_read: '1' },
			],
			[
				{ id: '1', mail_title: '11关于校运会的安排，详见附件', enclosures: '下载该附件', recipient: '谢娜娜', send_time: '2016-10-03', mail_state: '0', enclosures_url: 'https://www.baidu.com/', enclosures_type: '', enclosures_two: '', enclosures_three: '', mail_read: '0' },
				{ id: '2', mail_title: '22关于校运会的安排，详见附件', enclosures: '演讲.ppt,', recipient: '谢娜娜', send_time: '2016-10-01', mail_state: '0', enclosures_url: '', enclosures_type: '', enclosures_two: '', enclosures_three: '', mail_read: '1' },
				{ id: '3', mail_title: '33关于校运会的安排，详见附件', enclosures: '安排.wps', recipient: '谢娜娜', send_time: '2016-10-02', mail_state: '1', enclosures_url: '', enclosures_type: '', enclosures_two: '', enclosures_three: '', mail_read: '1' },
				{ id: '4', mail_title: '44关于校运会的安排，详见附件', enclosures: '无', recipient: '谢娜娜', send_time: '2016-10-04', mail_state: '1', enclosures_url: '', enclosures_type: '', enclosures_two: '', enclosures_three: '', mail_read: '1' },
			],
			[
				{ id: '1', mail_title: '111关于校运会的安排，详见附件', enclosures: '下载该附件', recipient: '刘小妹', send_time: '2016-10-03', mail_state: '0', enclosures_url: 'https://www.baidu.com/', enclosures_type: '', enclosures_two: '', enclosures_three: '', mail_read: '0' },
				{ id: '2', mail_title: '222关于校运会的安排，详见附件', enclosures: '备课.ppt,', recipient: '刘小妹', send_time: '2016-10-01', mail_state: '1', enclosures_url: '', enclosures_type: '', enclosures_two: '', enclosures_three: '', mail_read: '0' },
				{ id: '3', mail_title: '333关于校运会的安排，详见附件', enclosures: '安排.wps', recipient: '刘小妹', send_time: '2016-10-02', mail_state: '0', enclosures_url: '', enclosures_type: '', enclosures_two: '', enclosures_three: '', mail_read: '0' },
				{ id: '4', mail_title: '444关于校运会的安排，详见附件', enclosures: '无', recipient: '刘小妹', send_time: '2016-10-04', mail_state: '1', enclosures_url: '', enclosures_type: '', enclosures_two: '', enclosures_three: '', mail_read: '1' },
			],
		],
		//搜索
		[
			[
				{ id: '1', mail_title: '1关于家长会的安排，详见附件', enclosures: '下载该附件', recipient: '李晓红', send_time: '2016-10-03', mail_state: '0', enclosures_url: 'https://www.baidu.com/', enclosures_type: '', mail_read: '0' },
				{ id: '2', mail_title: '2关于校运会的安排，详见附件', enclosures: '家长会安排.xls,', recipient: '李晓红', send_time: '2016-10-01', mail_state: '0', enclosures_url: '', enclosures_type: '', enclosures_two: '', enclosures_three: '', mail_read: '0' },
				{ id: '3', mail_title: '3关于校运会的安排，详见附件', enclosures: '安排.wps', recipient: '李晓红', send_time: '2016-10-02', mail_state: '0', enclosures_url: '', enclosures_type: '', enclosures_two: '', enclosures_three: '', mail_read: '1' },
			],
		],
	]
	
	export default {
		data() {
			return {
				select_value: '',
				mail_type_index: '0',
				dateTime: { year: '', now: '' },
				mail_type: [{ label: '全部邮箱',active: true},{ label: '未读邮箱',active: false},{ label: '发送的邮件',active: false},{ label: '草稿箱',active: false}],
				page_total: '',
				page_data: '',
				agency: '',
				page_agency: '0',	
				columns4: [
					{ type: 'selection',align: 'center',width: 60},
					{
						title: '邮件标题',
						key: 'mail_title',
						align: 'center',
						render: (h, params) => {
							return h('header', {
								props: {
									type: 'primary',
									size: 'small',
								},
								style: {
									marginRight: '5px',
									color: params.row.mail_read,
								},
								on: {
									click: () => {
										this.mailEvent(params.index)
									}
								}
							}, params.row.mail_title);
						}
					},
					{
						title: '附件',
						key: 'enclosures',
						align: 'center',
						render: (h, params) => {
							return h('div', [
								h('Article', {
									props: {
										type: 'primary',
										size: 'small',
									},
									style: {
										marginRight: '5px',
									},
									on: {
										click: () => {
											this.enclosureEventOne(params.index)
										}
									}
								}, params.row.enclosures),
								h('Main', {
									props: {
										type: 'error',
										size: 'small'
									},
									style: {
										marginRight: '5px',
										overflow: 'auto',
									},
									on: {
										click: () => {
											this.enclosureEventTwo(params.index)
										}
									}
								}, params.row.enclosures_two),
								h('Nav', {
									props: {
										type: 'error',
										size: 'small'
									},
									style: {
										marginRight: '5px',
										overflow: 'auto',
									},
									on: {
										click: () => {
											this.enclosureEventThree(params.index)
										}
									}
								}, params.row.enclosures_three)
							]);
						}
					},
					{ title: '接受者', key: 'recipient', align: 'center'},
					{ title: '发送时间', key: 'send_time', align: 'center' },
					{ title: '邮件状态', key: 'mail_state', align: 'center', 
					render: (h, params) => {
							return h('div', {
								props: {
									type: 'primary',
									size: 'small',
								},
								style: {
									color: params.row.state_color,
								},

							}, params.row.mail_state);
						}
					},
				],
				table_json: '',
				table_json_index: '0',
			}
		},
		beforeMount: function() {
			this.getJson();
			this.handle();
		},
		mounted: function() {
			this.getJson();
			this.handle();
		},
		methods: {
			//获取数据
			getJson() {
				this.table_json = pageJson[this.table_json_index];

			},
			//挂载的方法
			handle() {
				//时间日期
				var myDate = new Date();
				var months = myDate.getMonth() + 1;
				var timer = myDate.getFullYear() + '年' + months + '月' + myDate.getDate() + '日';
				var myTime = myDate.toLocaleTimeString();
				this.dateTime.year = timer;
				this.dateTime.now = myTime;
				//page分页
				this.page_total = this.table_json.length;
				this.page_data = this.table_json[this.page_agency];
				for(var i = 0; i < this.table_json[this.page_agency].length; i++) {
//					var mail_read_json = this.table_json[this.page_agency][i].mail_read;
//					if(mail_read_json == '0') {
//						mail_read_json = 'red';
//					} else if(mail_read_json == '1') {
//						mail_read_json = 'black';
//					}
					if(this.table_json[this.page_agency][i].mail_read == '0') {
						this.table_json[this.page_agency][i].mail_read = '#ed3f14';
					} else if(this.table_json[this.page_agency][i].mail_read == '1') {
						this.table_json[this.page_agency][i].mail_read = 'black';
					}

					if(this.table_json[this.page_agency][i].mail_state == '0') {
						this.table_json[this.page_agency][i].mail_state = '等待审核';
						this.table_json[this.page_agency][i].state_color = '#ff9900';
					} else if(this.table_json[this.page_agency][i].mail_state == '1') {
						this.table_json[this.page_agency][i].mail_state = '已经发送';
						this.table_json[this.page_agency][i].state_color = '#19be6b';
					}
				}
			},
			//全选
			handleSelectAll(status) {
				this.$refs.selection.selectAll(status);
			},
			//附件1事件
			enclosureEventOne(index) {
				if(index == '0') {
					location.href = this.table_json[this.page_agency][0].enclosures_url;
				}
			},
			//附件2事件
			enclosureEventTwo(index) {
				alert(index)
			},
			//附件3事件
			enclosureEventThree(index) {
				alert(index)
			},
			//邮箱标题
			mailEvent(index) {
				if(index == '0') {
					location.href = 'https://www.baidu.com/';
				}
			},
			//分页器事件
			changePage(index) {
				var deposit = index - 1;
				this.page_data = this.table_json[deposit]
				this.page_agency = deposit;
				this.handle();
			},
			//选项变化监听事件
			sections(selection) {
				var sectionArr = [];
				for(var i = 0; i < selection.length; i++) {
					sectionArr.push(Number(selection[i].id))
				}
				console.log(sectionArr);
				this.agency = sectionArr;
			},
			//删除数据
			determine() {
				if(this.select_value == '删除') {
					var loadArr = this.agency;
					var loadArrIndex = [];
					for(var j = 0; j < this.table_json[this.page_agency].length; j++) {
						for(var i = 0; i < loadArr.length; i++) {
							var table_json_id = this.table_json[this.page_agency][j].id;
							if(table_json_id == loadArr[i]) {
								this.table_json[this.page_agency].splice(j, 1);
							}
						}
					}
					console.log(loadArrIndex);
					this.agency = '';
				} else if(this.select_value == '已读') {
					var loadArr = this.agency;
					var loadArrIndex = [];
					for(var j = 0; j < this.table_json[this.page_agency].length; j++) {
						for(var i = 0; i < loadArr.length; i++) {
							var table_json_id = this.table_json[this.page_agency][j].id;
							if(table_json_id == loadArr[i]) {
								this.table_json[this.page_agency][j].mail_read = '1';
								this.handle();
							}
						}
					}
					console.log(loadArrIndex);
					this.agency = '';
				}
			},
			//邮箱的类型
			mailSort(index) {
				if(index == '0') {
					this.mail_type_index = index;
					this.mailTad();
					this.table_json_index = '0';
					this.page_agency = '0';
					this.getJson();
					this.handle();
				} else if(index == '1') {
					this.mail_type_index = index;
					this.mailTad();
					this.table_json_index = '1';
					this.page_agency = '0';
					this.getJson();
					this.handle();
				} else if(index == '2') {
					this.mail_type_index = index;
					this.mailTad();
					this.table_json_index = '2';
					this.page_agency = '0';
					this.getJson();
					this.handle();
				} else if(index == '3') {
					this.mail_type_index = index;
					this.mailTad();
					this.table_json_index = '3';
					this.page_agency = '0';
					this.getJson();
					this.handle();
				}
			},
			//邮箱的类型的tad封装
			mailTad() {
				for(var i=0;i<this.mail_type.length;i++){
					this.mail_type[i].active = false;
				}
				this.mail_type[this.mail_type_index].active = true;
			},
			//搜索事件
			searchJson() {
				this.table_json_index = '4';
				this.page_agency = '0';
				this.getJson();
				this.handle();
			}
		}
	}
</script>

<style scoped>
@import './css/youjianxiang.css';
</style>