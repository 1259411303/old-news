<template>
	<section class="frames">
		<!--表头-->
		<div class="head_box">
			<div class="head_left"><div></div>我的课表-{{iview_switch}}</div>
		</div>

		<!--周视图-->
		<section class="week_frames">
		<div class="box" v-show="active">
			<div class="head">
				<div class="header_course">
					<ul>
						<li>
							<Icon type="ios-box" size='40'></Icon>
						</li>
						<li>{{teacher.teacher_name}}老师的周课程表</li>
						<li>每周共<span style="color: red;">{{teacher.kecheng_count}}</span>堂课</li>
					</ul>
				</div>
				<div class="header_chart">
					<div class="head_right">
						<ul class="head_li">
							<li v-for="(product,index) in projectList" @click="viewList(index)" :class="{'ivu-btn-primary':product.active_color}">
								<span>{{ product.label }}</span>
							</li>
						</ul>
					</div>
				</div>
			</div>
			<div class="content">
				<table>
					<tr>
						<th></th>
						<th v-for='item in xingqi'>{{item.name}}</th>
					</tr>
					<tr v-for="(val,index) in jie" class="page">
						<td>
							{{val.name}} ({{val.start_time}}-{{val.end_time}})
						</td>
						<td v-for='(val,indexs) in kecheng_content' :id="val[index]" class="tableTd" @click='classroom(indexs,index)'>

						</td>
					</tr>
				</table>
			</div>

		</div>
		</section>
		<!--清单视图-->
		<section class="week_list">
		<div class="box_list" v-show="active_list">
			<div class="head_list">
				<div class="header_course">
				<ul>
					<li>
						<Icon type="ios-box" size='40'></Icon>
					</li>
					<li>{{teacher.teacher_name}}老师的周课程表</li>
					<li>每周共<span style="color: red;">{{teacher.kecheng_count}}</span>堂课</li>
				</ul>
				</div>
				<div class="header_chart">
					<div class="head_right">
						<ul class="head_li">
							<li v-for="(product,index) in projectList" @click="viewList(index)" :class="{'active_color':product.active_color}">
								<span>{{ product.label }}</span>
							</li>
						</ul>
					</div>
				</div>
			</div>
			<div class="content_list">
				<table>
					<tr>
						<th v-for="item in list_title">{{item}}</th>
					</tr>
					<tr v-for="item in pick_json" class="tr_class">
						<td>{{item.order}}</td>
						<td>{{item.week}}</td>
						<td>{{item.time}}</td>
						<td>{{item.course}}</td>
						<td>{{item.teacher}}</td>
						<td>{{item.state}}</td>
					</tr>
				</table>
			</div>
		</div>
		</section>
	</section>
</template>

<script>
					var jiaoShiKeBiao = {
					xingqi: [
						{ id: '1', name: '星期一' },
						{ id: '2', name: '星期二' },
						{ id: '3', name: '星期三' },
						{ id: '4', name: '星期四' },
						{ id: '5', name: '星期五' },
					],
					jie: [
						{ id: '1', name: '早读', start_time: '07:30', end_time: '08:00' },
						{ id: '2', name: '第1节', start_time: '08:00', end_time: '08:40' },
						{ id: '3', name: '第2节', start_time: '08:50', end_time: '09:30' },
						{ id: '4', name: '第3节', start_time: '09:45', end_time: '10:25' },
						{ id: '5', name: '第4节', start_time: '10:40', end_time: '11:20' },
						{ id: '6', name: '第5节', start_time: '11:30', end_time: '12:10' },
						{ id: '7', name: '午休', start_time: '13:00', end_time: '14:00' },
						{ id: '8', name: '第6节', start_time: '14:30', end_time: '15:10' },
						{ id: '9', name: '第7节', start_time: '15:20', end_time: '16:00' },
						{ id: '10', name: '第8节', start_time: '16:20', end_time: '17:00' },
						{ id: '11', name: '第9节', start_time: '17:10', end_time: '17:50' },
					],
					kechengJson: [
						{ id: '1', kecheng_name: '数学', banji_name: '高一7班', jie_id: '1', xingqi_id: '1', banji_id: '1', kecheng_state: '1' },
						{ id: '2', kecheng_name: '英语', banji_name: '高一2班', jie_id: '10', xingqi_id: '2', banji_id: '2', kecheng_state: '1' },
						{ id: '3', kecheng_name: '语文', banji_name: '高一5班', jie_id: '4', xingqi_id: '5', banji_id: '3', kecheng_state: '0' },
						{ id: '4', kecheng_name: '物理', banji_name: '高一2班', jie_id: '8', xingqi_id: '2', banji_id: '4', kecheng_state: '0' },
						{ id: '5', kecheng_name: '历史', banji_name: '高一8班', jie_id: '9', xingqi_id: '2', banji_id: '5', kecheng_state: '0' },
						{ id: '6', kecheng_name: '地理', banji_name: '高一15班', jie_id: '5', xingqi_id: '5', banji_id: '6', kecheng_state: '0' },
					],
					teacher: { teacher_name: '左巍波', kecheng_count: '10' },
				}
	
	export default {
		name: "one",
		data() {
			return {
				iview_switch: '周视图',
				projectList: [{ label: '周视图',active_color: true}, { label: '清单视图',active_color: false}, { label: '刷新',active_color: false}],
				kecheng_content: '',
				teacher: '',
				xingqi: '',
				jie: '',
				kechengJson: '',
				pick_json: '',
				active: true,
				active_list: false,
				transmit_data: '',
				list_title: ['序号','星期','时间','班级','教师','状态' ],
			}
		},
		
		mounted: function() {
			this.getJson();
			this.events();
			this.eventList();
			
		},
		beforeMount: function() {
			this.getJson();
			this.events();
		},
		methods: {
			//获取数据
			getJson() {
				
				this.xingqi = jiaoShiKeBiao.xingqi;
				this.jie = jiaoShiKeBiao.jie;
				this.kechengJson = jiaoShiKeBiao.kechengJson;
				this.teacher = jiaoShiKeBiao.teacher;
				this.transmit_data = this.kechengJson.length;
				this.$emit('purple',this.transmit_data);
			},
			//弹窗
			confirm () {
                this.$Modal.confirm({
                    title: '',
                    content: '<p style="font-size: 18px;">是否进入虚拟课堂</p>',
                    onOk: () => {
                        location.href = 'https://baidu.com'
                    },
                    onCancel: () => {
                        this.$Message.info('Clicked cancel');
                    }
                });
            },
			//定义key值
			spare() {
				var arr = [];
				var keChengCounts = [];
				for(var i = 0; i < this.xingqi.length; i++) {
					keChengCounts.push([]);
					arr.push(i + 1);
					for(var j = 1; j <= this.jie.length; j++) {
						keChengCounts[i].push(j + '-' + arr[i]);
					}
				}
				return keChengCounts
			},
			//生成表格及内容渲染
			events() {
				var tableTd = document.getElementsByClassName('tableTd');
				var spare_key = this.spare();
				this.kecheng_content = spare_key;
				for(var j = 0; j < this.kechengJson.length; j++) {
					var jieIdJson = this.kechengJson[j].jie_id;
					var xingqiid_json = this.kechengJson[j].xingqi_id;
					var jsonKey = jieIdJson + '-' + xingqiid_json;
					for(var i = 0; i < tableTd.length; i++) {
						var tableIdid = tableTd[i];
						var tableKey = tableIdid.getAttribute('id');
						if(tableKey == jsonKey) {
							var banjiname = this.kechengJson[j].banji_name;
							tableIdid.innerHTML = this.kechengJson[j].kecheng_name;
							tableIdid.innerHTML += '(' + banjiname + ")";
							var banjiid = this.kechengJson[j].banji_id;
							tableIdid.setAttribute('key', banjiid);
							var json_state = this.kechengJson[j].kecheng_state;
							if(json_state == '1') {
								tableIdid.style.color = '#e53e3e';
							}
						}
					}

				}
			},
			//弹出窗
			classroom(value, response) {
				var tableTd = document.getElementsByClassName('tableTd');
				for(var j = 0; j < this.kechengJson.length; j++) {
					var jsonKeys = this.kechengJson[j].jie_id + '-' + this.kechengJson[j].xingqi_id;
					var tableKeyId = tableTd[value + response * this.xingqi.length].getAttribute('id');
					var jsonStates = this.kechengJson[j].kecheng_state;
					if(tableKeyId == jsonKeys && jsonStates == '0') {
						this.confirm();
					}
				}

			},
			//清单视图数据整合
			eventList() {
				var arrs = [];
				for(var i = 0; i < this.kechengJson.length; i++) {
					for(var j = 0; j < this.jie.length; j++) {
						var jieIdJson = this.jie[j].id;
						var keJieId = this.kechengJson[i].jie_id;
						if(jieIdJson == keJieId) {
							var jieNameJson = this.jie[j].name;
							var startTimeJson = this.jie[j].start_time;
							var endTimeJson = this.jie[j].end_time;
							var timeName = jieNameJson + '(' + startTimeJson + '-' + endTimeJson + ')';
							var kechengStateJson = this.kechengJson[i].kecheng_state;
							if(kechengStateJson == '1') {
								var counts = '已完成';
							} else {
								var counts = '未完成';
							}
							var xingqiIdJson = this.kechengJson[i].xingqi_id;
							if(xingqiIdJson == '1') {
								var weekDate = '星期一';
							} else if(xingqiIdJson == '2') {
								var weekDate = '星期二';
							} else if(xingqiIdJson == '3') {
								var weekDate = '星期三';
							} else if(xingqiIdJson == '4') {
								var weekDate = '星期四';
							} else if(xingqiIdJson == '5') {
								var weekDate = '星期五';
							} else if(xingqiIdJson == '6') {
								var weekDate = '星期六';
							} else if(xingqiIdJson == '7') {
								var weekDate = '星期日';
							}
							var kechengname = this.kechengJson[i].kecheng_name;
							var banjiname = this.kechengJson[i].banji_name;
							var teachername = this.teacher.teacher_name;
							var xingQiJson = this.kechengJson[i].xingqi_id;
							var jieIdJson = this.kechengJson[i].jie_id;

							var jsons = {
								id: i + 1,
								order: i + 1,
								week: weekDate,
								time: timeName,
								course: kechengname + '(' + banjiname + ')',
								teacher: teachername,
								state: counts,
								flag: xingQiJson,
								cool: jieIdJson,
							};
							arrs.push(jsons);
						}
					}

				}
				//排序
				var sortArr = [];
				for(var i = 0; i < this.xingqi.length; i++) {
					sortArr.push([]);
				}
				for(var j = 0; j < this.xingqi.length; j++) {
					for(var i = 0; i < arrs.length; i++) {
						if(arrs[i].flag == j + 1) {
							sortArr[j].push(arrs[i]);
						}
					}
				}
				var temp = 0;
				for(var k = 0; k < sortArr.length; k++) {
					for(var i = 0; i < sortArr[k].length; i++) {
						for(var j = 0; j < sortArr[k].length - 1 - i; j++) {
							var coolNum = Number(sortArr[k][j].cool);
							var coolNumder = Number(sortArr[k][j + 1].cool);
							if(coolNum > coolNumder) {
								temp = sortArr[k][j];
								sortArr[k][j] = sortArr[k][j + 1];
								sortArr[k][j + 1] = temp;
							}
						}
					}

				}
				var sortFinal = [];
				for(var i = 0; i < sortArr.length; i++) {
					for(var j = 0; j < sortArr[i].length; j++) {
						sortFinal.push(sortArr[i][j]);
					}
				}
				for(var i = 0; i < sortFinal.length; i++) {
					sortFinal[i].order = i + 1;
				}
				this.pick_json = sortFinal;
			},
			//周视图与清单视图的切换
			viewList(index) {
				if(index == '0') {
					this.active = true;
					this.active_list = false;
					this.projectList[index].active_color = true;
					this.projectList[index + 1].active_color = false;
					this.iview_switch = '周视图';
				} else if(index == '1') {
					this.active = false;
					this.active_list = true;
					this.projectList[index - 1].active_color = false;
					this.projectList[index].active_color = true;
					this.iview_switch = "清单视图";
				}else if(index == '2'){
					this.getJson();
				}
			}
		}

	}
</script>

<style scoped>
@import './css/jiaoshikebiao.css';
</style>