<template>
	<section class="box">
		<div class="head_list">
			<ul>
				<li>
					<Icon type="ios-box" size='40'></Icon>
				</li>
				<li>王利民老师这是你的教育教学文档</li>
			</ul>
		</div>
		<div class="content">
			<div class="school_year">
				<ul>
					<li v-for="(item,index) in school_year" @click="year_event(index)" :class="{'ivu-btn-primary':item.active}">{{item.label}}</li>
				</ul>
			</div>
			<div class="investigation">
				<div class="investigation_tab">
					<ul>
						<li v-for="(item,index) in class_data" @click="class_event(index)" :class="{'ivu-btn-primary':item.active}">{{item.label}}</li>
					</ul>
					<Button style="float: right;" type="error" @click="investigation">查看本学年学情调查</Button>
				</div>
				<div class="investigation_frame" v-for="(item,index) in achievement_table">
					<div class="analysis_header">{{item.achievement_title}}</div>
					<div class="analysis_table">
						<table>
							<tr>
								<td><span>学科</span></td>
								<td>{{item.subject}}</td>
								<td>考试人数</td>
								<td><span style="color: #e82630;">{{item.people_number_actual}}</span>/{{item.people_number_total}}</td>
							</tr>
							<tr>
								<td><span>年级排名</span></td>
								<td><span style="color: #e82630;">{{item.grade_ranking_one}}</span>/{{item.grade_ranking_two}}(目标排名:{{item.grade_ranking_three}})<span class="diagram" @click="echarts(index,0)">发展曲线图</span><span class="bar_graph" @click="echarts(index,1)">横比柱状图</span></td>
								<td>平均分对比</td>
								<td><span style="color: #e82630;">{{item.average_one}}</span>/{{item.average_two}}<span class="diagram" @click="echarts(index,2)">横比柱状图</span></td>
							</tr>
							<tr>
								<td><span>年级前50</span></td>
								<td><span style="color: #e82630;">{{item.first_grade_fifteen}}</span>人<span class="diagram" @click="view_the_list(index,0)">查看名单</span></td>
								<td>年级前100</td>
								<td><span style="color: #e82630;">{{item.first_grade_hundred}}</span>人<span class="diagram" @click="view_the_list(index,1)">查看名单</span></td>
							</tr>
						</table>
					</div>
				</div>
			</div>
		</div>

		<!--图表弹窗-->
		<Modal v-model="modal1" width="750" title="大数据图表">
			<div class="popups_echarts_open">
				<div class="popups_echarts_content" ref='echarts01'></div>
			</div>

			<div slot="footer">
				<div class="popups_footer">
					<Button type="primary" @click="curve_determine()">确定</Button>
				</div>
			</div>
		</Modal>

		<!--查看名单弹窗-->
		<Modal v-model="modal2" width="500" :title="ranking_title">
			<div class="ranking_form_content">
				<table>
					<tr>
						<td>排名</td>
						<td>姓名</td>
						<td>数学成绩</td>
					</tr>
					<tr v-for="(item,index) in ranking_data">
						<td>{{item.ranking}}</td>
						<td>{{item.student_name}}</td>
						<td>{{item.score}}</td>
					</tr>
				</table>
			</div>

			<div slot="footer">
				<div class="popups_footer">
					<Button type="primary" @click="curve_determine()">确定</Button>
				</div>
			</div>
		</Modal>

	</section>
</template>

<script>
	var school_year = [
		{id: 1,label: '2018学年',active: true},
		{id: 2,label: '2017学年',active: false},
		{id: 3,label: '2016学年',active: false},
		{id: 4,label: '2015学年',active: false}
	]
	var class_data = [
		[
		{id: '1a',label: '高一1班',active: true},
		{id: '2a',label: '高一4班',active: false},
		{id: '3a',label: '高一12班',active: false}
		],
		[
		{id: '1b',label: '高一2班',active: true},
		{id: '2b',label: '高一6班',active: false},
		{id: '3b',label: '高一15班',active: false}
		],
		[
		{id: '1c',label: '高一3班',active: true},
		{id: '2c',label: '高一6班',active: false},
		{id: '3c',label: '高一17班',active: false}
		],
		[
		{id: '1d',label: '高一2班',active: true},
		{id: '2d',label: '高一7班',active: false},
		{id: '3d',label: '高一11班',active: false}
		]
	]
	var pageJson = {
		'1a':[{id: 1,achievement_title: '2018学年下学期期中成绩分析',subject: '数学(行政班)',people_number_actual: '49',people_number_total: '50',grade_ranking_one: '8',grade_ranking_two: '12',grade_ranking_three: '6',average_one: '98.5',average_two: '99.7',first_grade_fifteen: '2',first_grade_hundred: '7'},
			 {id: 2,achievement_title: '2018学年上学期期末成绩分析',subject: '数学(行政班)',people_number_actual: '49',people_number_total: '50',grade_ranking_one: '8',grade_ranking_two: '12',grade_ranking_three: '6',average_one: '98.5',average_two: '99.7',first_grade_fifteen: '3',first_grade_hundred: '8'},
			 {id: 3,achievement_title: '2018学年下学期期中成绩分析',subject: '数学(行政班)',people_number_actual: '49',people_number_total: '50',grade_ranking_one: '8',grade_ranking_two: '12',grade_ranking_three: '6',average_one: '98.5',average_two: '99.7',first_grade_fifteen: '2',first_grade_hundred: '8'},
			 {id: 4,achievement_title: '2018学年下学期期中成绩分析',subject: '数学(行政班)',people_number_actual: '49',people_number_total: '50',grade_ranking_one: '8',grade_ranking_two: '12',grade_ranking_three: '6',average_one: '98.5',average_two: '99.7',first_grade_fifteen: '3',first_grade_hundred: '10'}],
		'2a':[{id: 1,achievement_title: '2018学年下学期期中成绩分析2',subject: '英语(行政班)',people_number_actual: '48',people_number_total: '52',grade_ranking_one: '7',grade_ranking_two: '14',grade_ranking_three: '8',average_one: '97.3',average_two: '98.1',first_grade_fifteen: '4',first_grade_hundred: '3'},
			 {id: 2,achievement_title: '2018学年下学期期中成绩分析2',subject: '英语(行政班)',people_number_actual: '48',people_number_total: '52',grade_ranking_one: '7',grade_ranking_two: '14',grade_ranking_three: '8',average_one: '97.5',average_two: '98.1',first_grade_fifteen: '4',first_grade_hundred: '3'},
			 {id: 3,achievement_title: '2018学年下学期期中成绩分析2',subject: '英语(行政班)',people_number_actual: '48',people_number_total: '52',grade_ranking_one: '7',grade_ranking_two: '14',grade_ranking_three: '8',average_one: '97.5',average_two: '98.1',first_grade_fifteen: '4',first_grade_hundred: '3'},
			 {id: 4,achievement_title: '2018学年下学期期中成绩分析2',subject: '英语(行政班)',people_number_actual: '48',people_number_total: '52',grade_ranking_one: '7',grade_ranking_two: '14',grade_ranking_three: '8',average_one: '97.5',average_two: '98.1',first_grade_fifteen: '4',first_grade_hundred: '3'}],
		'3a':[{id: 1,achievement_title: '2018学年下学期期中成绩分析3',subject: '数学(行政班)',people_number_actual: '47',people_number_total: '50',grade_ranking_one: '8',grade_ranking_two: '12',grade_ranking_three: '6',average_one: '98.5',average_two: '99.7',first_grade_fifteen: '5',first_grade_hundred: '7'},
			 {id: 2,achievement_title: '2018学年下学期期中成绩分析3',subject: '数学(行政班)',people_number_actual: '47',people_number_total: '50',grade_ranking_one: '8',grade_ranking_two: '12',grade_ranking_three: '6',average_one: '98.5',average_two: '99.7',first_grade_fifteen: '2',first_grade_hundred: '7'},
			 {id: 3,achievement_title: '2018学年下学期期中成绩分析3',subject: '数学(行政班)',people_number_actual: '47',people_number_total: '50',grade_ranking_one: '8',grade_ranking_two: '12',grade_ranking_three: '6',average_one: '98.5',average_two: '99.7',first_grade_fifteen: '2',first_grade_hundred: '7'},
			 {id: 4,achievement_title: '2018学年下学期期中成绩分析3',subject: '数学(行政班)',people_number_actual: '47',people_number_total: '50',grade_ranking_one: '8',grade_ranking_two: '12',grade_ranking_three: '6',average_one: '98.5',average_two: '99.7',first_grade_fifteen: '2',first_grade_hundred: '7'}],
		'1b':[{id: 1,achievement_title: '2018学年下学期期中成绩分析4',subject: '数学(行政班)',people_number_actual: '46',people_number_total: '54',grade_ranking_one: '8',grade_ranking_two: '12',grade_ranking_three: '6',average_one: '98.5',average_two: '99.7',first_grade_fifteen: '2',first_grade_hundred: '7'},
			 {id: 2,achievement_title: '2018学年下学期期中成绩分析4',subject: '数学(行政班)',people_number_actual: '46',people_number_total: '54',grade_ranking_one: '8',grade_ranking_two: '12',grade_ranking_three: '6',average_one: '98.5',average_two: '99.7',first_grade_fifteen: '2',first_grade_hundred: '7'},
			 {id: 3,achievement_title: '2018学年下学期期中成绩分析4',subject: '数学(行政班)',people_number_actual: '46',people_number_total: '54',grade_ranking_one: '8',grade_ranking_two: '12',grade_ranking_three: '6',average_one: '98.5',average_two: '99.7',first_grade_fifteen: '2',first_grade_hundred: '7'},
			 {id: 4,achievement_title: '2018学年下学期期中成绩分析4',subject: '数学(行政班)',people_number_actual: '46',people_number_total: '54',grade_ranking_one: '8',grade_ranking_two: '12',grade_ranking_three: '6',average_one: '98.5',average_two: '99.7',first_grade_fifteen: '2',first_grade_hundred: '7'}],
		'2b':[{id: 1,achievement_title: '2018学年下学期期中成绩分析4',subject: '数学(行政班)',people_number_actual: '45',people_number_total: '50',grade_ranking_one: '8',grade_ranking_two: '12',grade_ranking_three: '6',average_one: '98.5',average_two: '99.7',first_grade_fifteen: '2',first_grade_hundred: '7'},
			 {id: 2,achievement_title: '2018学年下学期期中成绩分析5',subject: '数学(行政班)',people_number_actual: '45',people_number_total: '50',grade_ranking_one: '8',grade_ranking_two: '12',grade_ranking_three: '6',average_one: '98.5',average_two: '99.7',first_grade_fifteen: '2',first_grade_hundred: '7'},
			 {id: 3,achievement_title: '2018学年下学期期中成绩分析5',subject: '数学(行政班)',people_number_actual: '45',people_number_total: '50',grade_ranking_one: '8',grade_ranking_two: '12',grade_ranking_three: '6',average_one: '98.5',average_two: '99.7',first_grade_fifteen: '2',first_grade_hundred: '7'},
			 {id: 4,achievement_title: '2018学年下学期期中成绩分析5',subject: '数学(行政班)',people_number_actual: '45',people_number_total: '50',grade_ranking_one: '8',grade_ranking_two: '12',grade_ranking_three: '6',average_one: '98.5',average_two: '99.7',first_grade_fifteen: '2',first_grade_hundred: '7'}],
		'3b':[{id: 1,achievement_title: '2018学年下学期期中成绩分析6',subject: '数学(行政班)',people_number_actual: '44',people_number_total: '50',grade_ranking_one: '8',grade_ranking_two: '12',grade_ranking_three: '6',average_one: '98.5',average_two: '99.7',first_grade_fifteen: '2',first_grade_hundred: '7'},
			 {id: 2,achievement_title: '2018学年下学期期中成绩分析6',subject: '数学(行政班)',people_number_actual: '44',people_number_total: '50',grade_ranking_one: '8',grade_ranking_two: '12',grade_ranking_three: '6',average_one: '98.5',average_two: '99.7',first_grade_fifteen: '2',first_grade_hundred: '7'},
			 {id: 3,achievement_title: '2018学年下学期期中成绩分析6',subject: '数学(行政班)',people_number_actual: '44',people_number_total: '50',grade_ranking_one: '8',grade_ranking_two: '12',grade_ranking_three: '6',average_one: '98.5',average_two: '99.7',first_grade_fifteen: '2',first_grade_hundred: '7'},
			 {id: 4,achievement_title: '2018学年下学期期中成绩分析6',subject: '数学(行政班)',people_number_actual: '44',people_number_total: '50',grade_ranking_one: '8',grade_ranking_two: '12',grade_ranking_three: '6',average_one: '98.5',average_two: '99.7',first_grade_fifteen: '2',first_grade_hundred: '7'}],
		'1c':[{id: 1,achievement_title: '2018学年下学期期中成绩分析7',subject: '数学(行政班)',people_number_actual: '43',people_number_total: '55',grade_ranking_one: '8',grade_ranking_two: '12',grade_ranking_three: '6',average_one: '98.5',average_two: '99.7',first_grade_fifteen: '2',first_grade_hundred: '7'},
			 {id: 2,achievement_title: '2018学年下学期期中成绩分析7',subject: '数学(行政班)',people_number_actual: '43',people_number_total: '55',grade_ranking_one: '8',grade_ranking_two: '12',grade_ranking_three: '6',average_one: '98.5',average_two: '99.7',first_grade_fifteen: '2',first_grade_hundred: '7'},
			 {id: 3,achievement_title: '2018学年下学期期中成绩分析7',subject: '数学(行政班)',people_number_actual: '43',people_number_total: '55',grade_ranking_one: '8',grade_ranking_two: '12',grade_ranking_three: '6',average_one: '98.5',average_two: '99.7',first_grade_fifteen: '2',first_grade_hundred: '7'},
			 {id: 4,achievement_title: '2018学年下学期期中成绩分析7',subject: '数学(行政班)',people_number_actual: '43',people_number_total: '55',grade_ranking_one: '8',grade_ranking_two: '12',grade_ranking_three: '6',average_one: '98.5',average_two: '99.7',first_grade_fifteen: '2',first_grade_hundred: '7'}],
		'2c':[{id: 1,achievement_title: '2018学年下学期期中成绩分析8',subject: '数学(行政班)',people_number_actual: '42',people_number_total: '56',grade_ranking_one: '8',grade_ranking_two: '12',grade_ranking_three: '6',average_one: '98.5',average_two: '99.7',first_grade_fifteen: '2',first_grade_hundred: '7'},
			 {id: 2,achievement_title: '2018学年下学期期中成绩分析8',subject: '数学(行政班)',people_number_actual: '42',people_number_total: '56',grade_ranking_one: '8',grade_ranking_two: '12',grade_ranking_three: '6',average_one: '98.5',average_two: '99.7',first_grade_fifteen: '2',first_grade_hundred: '7'},
			 {id: 3,achievement_title: '2018学年下学期期中成绩分析8',subject: '数学(行政班)',people_number_actual: '42',people_number_total: '50',grade_ranking_one: '8',grade_ranking_two: '12',grade_ranking_three: '6',average_one: '98.5',average_two: '99.7',first_grade_fifteen: '2',first_grade_hundred: '7'},
			 {id: 4,achievement_title: '2018学年下学期期中成绩分析8',subject: '数学(行政班)',people_number_actual: '42',people_number_total: '50',grade_ranking_one: '8',grade_ranking_two: '12',grade_ranking_three: '6',average_one: '98.5',average_two: '99.7',first_grade_fifteen: '2',first_grade_hundred: '7'}],
		'3c':[{id: 1,achievement_title: '2018学年下学期期中成绩分析9',subject: '数学(行政班)',people_number_actual: '41',people_number_total: '50',grade_ranking_one: '8',grade_ranking_two: '12',grade_ranking_three: '6',average_one: '98.5',average_two: '99.7',first_grade_fifteen: '2',first_grade_hundred: '7'},
			 {id: 2,achievement_title: '2018学年下学期期中成绩分析9',subject: '数学(行政班)',people_number_actual: '41',people_number_total: '50',grade_ranking_one: '8',grade_ranking_two: '12',grade_ranking_three: '6',average_one: '98.5',average_two: '99.7',first_grade_fifteen: '2',first_grade_hundred: '7'},
			 {id: 3,achievement_title: '2018学年下学期期中成绩分析9',subject: '数学(行政班)',people_number_actual: '41',people_number_total: '50',grade_ranking_one: '8',grade_ranking_two: '12',grade_ranking_three: '6',average_one: '98.5',average_two: '99.7',first_grade_fifteen: '2',first_grade_hundred: '7'},
			 {id: 4,achievement_title: '2018学年下学期期中成绩分析9',subject: '数学(行政班)',people_number_actual: '41',people_number_total: '50',grade_ranking_one: '8',grade_ranking_two: '12',grade_ranking_three: '6',average_one: '98.5',average_two: '99.7',first_grade_fifteen: '2',first_grade_hundred: '7'}],
		'1d':[{id: 1,achievement_title: '2018学年下学期期中成绩分析10',subject: '数学(行政班)',people_number_actual: '40',people_number_total: '58',grade_ranking_one: '8',grade_ranking_two: '12',grade_ranking_three: '6',average_one: '98.5',average_two: '99.7',first_grade_fifteen: '2',first_grade_hundred: '7'},
			 {id: 2,achievement_title: '2018学年下学期期中成绩分析10',subject: '数学(行政班)',people_number_actual: '40',people_number_total: '58',grade_ranking_one: '8',grade_ranking_two: '12',grade_ranking_three: '6',average_one: '98.5',average_two: '99.7',first_grade_fifteen: '2',first_grade_hundred: '7'},
			 {id: 3,achievement_title: '2018学年下学期期中成绩分析10',subject: '数学(行政班)',people_number_actual: '40',people_number_total: '58',grade_ranking_one: '8',grade_ranking_two: '12',grade_ranking_three: '6',average_one: '98.5',average_two: '99.7',first_grade_fifteen: '2',first_grade_hundred: '7'},
			 {id: 4,achievement_title: '2018学年下学期期中成绩分析10',subject: '数学(行政班)',people_number_actual: '40',people_number_total: '58',grade_ranking_one: '8',grade_ranking_two: '12',grade_ranking_three: '6',average_one: '98.5',average_two: '99.7',first_grade_fifteen: '2',first_grade_hundred: '7'}],
		'2d':[{id: 1,achievement_title: '2018学年下学期期中成绩分析11',subject: '数学(行政班)',people_number_actual: '49',people_number_total: '50',grade_ranking_one: '8',grade_ranking_two: '12',grade_ranking_three: '6',average_one: '98.5',average_two: '99.7',first_grade_fifteen: '2',first_grade_hundred: '7'},
			 {id: 2,achievement_title: '2018学年下学期期中成绩分析11',subject: '数学(行政班)',people_number_actual: '49',people_number_total: '50',grade_ranking_one: '8',grade_ranking_two: '12',grade_ranking_three: '6',average_one: '98.5',average_two: '99.7',first_grade_fifteen: '2',first_grade_hundred: '7'},
			 {id: 3,achievement_title: '2018学年下学期期中成绩分析11',subject: '数学(行政班)',people_number_actual: '49',people_number_total: '50',grade_ranking_one: '8',grade_ranking_two: '12',grade_ranking_three: '6',average_one: '98.5',average_two: '99.7',first_grade_fifteen: '2',first_grade_hundred: '7'},
			 {id: 4,achievement_title: '2018学年下学期期中成绩分析11',subject: '数学(行政班)',people_number_actual: '49',people_number_total: '50',grade_ranking_one: '8',grade_ranking_two: '12',grade_ranking_three: '6',average_one: '98.5',average_two: '99.7',first_grade_fifteen: '2',first_grade_hundred: '7'}],
		'3d':[{id: 1,achievement_title: '2018学年下学期期中成绩分析12',subject: '数学(行政班)',people_number_actual: '49',people_number_total: '50',grade_ranking_one: '8',grade_ranking_two: '12',grade_ranking_three: '6',average_one: '98.5',average_two: '99.7',first_grade_fifteen: '2',first_grade_hundred: '7'},
			 {id: 2,achievement_title: '2018学年下学期期中成绩分析12',subject: '数学(行政班)',people_number_actual: '49',people_number_total: '50',grade_ranking_one: '8',grade_ranking_two: '12',grade_ranking_three: '6',average_one: '98.5',average_two: '99.7',first_grade_fifteen: '2',first_grade_hundred: '7'},
			 {id: 3,achievement_title: '2018学年下学期期中成绩分析12',subject: '数学(行政班)',people_number_actual: '49',people_number_total: '50',grade_ranking_one: '8',grade_ranking_two: '12',grade_ranking_three: '6',average_one: '98.5',average_two: '99.7',first_grade_fifteen: '2',first_grade_hundred: '7'},
			 {id: 4,achievement_title: '2018学年下学期期中成绩分析12',subject: '数学(行政班)',people_number_actual: '49',people_number_total: '50',grade_ranking_one: '8',grade_ranking_two: '12',grade_ranking_three: '6',average_one: '98.5',average_two: '99.7',first_grade_fifteen: '2',first_grade_hundred: '7'}],
	}
//	查看名单
	var ranking_form = [
		[
			[
			{id: 1,ranking: 9,student_name: '娜娜',score: 148},
			{id: 2,ranking: 25,student_name: '露露',score: 145},
			],
			[
			{id: 1,ranking: 9,student_name: '娜娜',score: 148},
			{id: 2,ranking: 10,student_name: '露露',score: 145},
			{id: 3,ranking: 12,student_name: '莉莉',score: 143},
			{id: 4,ranking: 15,student_name: '玉玉',score: 142},
			{id: 5,ranking: 19,student_name: '露露',score: 140},
			{id: 6,ranking: 21,student_name: '莉莉',score: 137},
			{id: 7,ranking: 25,student_name: '玉玉',score: 135}
			]
		],
		[
			[
			{id: 1,ranking: 9,student_name: '娜娜',score: 148},
			{id: 2,ranking: 25,student_name: '露露',score: 145},
			{id: 3,ranking: 12,student_name: '莉莉',score: 143},
			],
			[
			{id: 1,ranking: 9,student_name: '娜娜',score: 148},
			{id: 2,ranking: 10,student_name: '露露',score: 145},
			{id: 3,ranking: 12,student_name: '莉莉',score: 143},
			{id: 4,ranking: 15,student_name: '玉玉',score: 142},
			{id: 5,ranking: 19,student_name: '露露',score: 140},
			{id: 6,ranking: 21,student_name: '莉莉',score: 137},
			{id: 7,ranking: 25,student_name: '玉玉',score: 135},
			{id: 8,ranking: 30,student_name: '玉玉',score: 130}
			]
		],
		[
			[
			{id: 1,ranking: 9,student_name: '娜娜',score: 148},
			{id: 2,ranking: 25,student_name: '露露',score: 145},
			],
			[
			{id: 1,ranking: 9,student_name: '娜娜',score: 148},
			{id: 2,ranking: 10,student_name: '露露',score: 145},
			{id: 3,ranking: 12,student_name: '莉莉',score: 143},
			{id: 4,ranking: 15,student_name: '玉玉',score: 142},
			{id: 5,ranking: 19,student_name: '露露',score: 140},
			{id: 6,ranking: 21,student_name: '莉莉',score: 137},
			{id: 7,ranking: 25,student_name: '玉玉',score: 135},
			{id: 8,ranking: 30,student_name: '玉玉',score: 130}
			]
		],
		[
			[
			{id: 1,ranking: 9,student_name: '娜娜',score: 148},
			{id: 2,ranking: 25,student_name: '露露',score: 145},
			{id: 3,ranking: 12,student_name: '莉莉',score: 143},
			],
			[
			{id: 1,ranking: 9,student_name: '娜娜',score: 148},
			{id: 2,ranking: 10,student_name: '露露',score: 145},
			{id: 3,ranking: 12,student_name: '莉莉',score: 143},
			{id: 4,ranking: 15,student_name: '玉玉',score: 142},
			{id: 5,ranking: 19,student_name: '露露',score: 140},
			{id: 6,ranking: 21,student_name: '莉莉',score: 137},
			{id: 7,ranking: 25,student_name: '玉玉',score: 135},
			{id: 8,ranking: 30,student_name: '玉玉',score: 130},
			{id: 9,ranking: 19,student_name: '露露',score: 128},
			{id: 10,ranking: 21,student_name: '莉莉',score: 127},
			]
		],
	]
	import echarts from 'echarts'
	export default {
		data() {
			return {
				school_year: '',
				class_data: '',
				achievement_table: '',
				year_index_record: 0,
				class_index_record: 0,
				ranking_data: '',
				ranking_title: '667',
				modal1: false,
				modal2: false,
			}
		},
		beforeMount: function() {

		},
		mounted: function() {
			this.getJson();
		},
		methods: {
			getJson() {
				this.achievement_table = pageJson[class_data[0][0].id];
				this.school_year = school_year;
				this.class_data = class_data[0];
				this.ranking_data = ranking_form[0][0];
			},
			//学年事件
			year_event(index) {
				this.year_index_record = index;
				for(var i = 0; i < this.school_year.length; i++) {
					this.school_year[i].active = false;
				}
				this.school_year[index].active = true;
				for(var i = 0; i < this.class_data.length; i++) {
					this.class_data[i].active = false;
				}
				this.class_data[0].active = true;
				this.class_data = class_data[index];
				this.achievement_table = pageJson[class_data[this.year_index_record][0].id];
			},
			//年级事件
			class_event(index) {
				for(var i = 0; i < this.class_data.length; i++) {
					this.class_data[i].active = false;
				}
				this.class_data[index].active = true;
				this.achievement_table = pageJson[class_data[this.year_index_record][index].id];
			},
			//查看本学年学情调查
			investigation() {
				location.href = 'https://www.baidu.com';
			},
			//曲线图表
			echarts(index, value) {
				this.modal1 = true;
				if(value == 0) {
					this.curve();
				} else if(value == 1) {
					this.bar();
				} else {
					this.average_bar();
				}

			},
			//查看排名弹窗
			view_the_list(index, val) {
				if(val == 0) {
					this.ranking_title = '年级前50';
				} else {
					this.ranking_title = '年级前100';
				}
				this.ranking_data = ranking_form[index][val];
				this.modal2 = true;
			},
			//图表确定
			curve_determine() {
				this.modal1 = false;
				this.modal2 = false;
			},
			//曲线图表
			curve() {
				echarts.dispose(this.$refs.echarts01);
				var mychart01 = echarts.init(this.$refs.echarts01);
				mychart01.setOption({
					xAxis: {
						type: 'category',
						data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
					},
					yAxis: {
						type: 'value'
					},
					series: [{
						data: [820, 932, 901, 934, 1290, 1330, 1320],
						type: 'line'
					}]
				})
			},
			//排名柱状图表
			bar() {
				echarts.dispose(this.$refs.echarts01);
				var mychart02 = echarts.init(this.$refs.echarts01);
				mychart02.setOption({
					xAxis: {
						type: 'category',
						data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
					},
					yAxis: {
						type: 'value'
					},
					series: [{
						data: [120, 200, 150, 80, 70, 110, 130],
						type: 'bar'
					}]
				})
			},
			//平均分柱状图
			average_bar() {
				echarts.dispose(this.$refs.echarts01);
				var mychart03 = echarts.init(this.$refs.echarts01);
				mychart03.setOption({
					tooltip: {
						trigger: 'axis',
						axisPointer: { // 坐标轴指示器，坐标轴触发有效
							type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
						}
					},
					legend: {
						data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎', '百度', '谷歌', '必应', '其他']
					},
					grid: {
						left: '3%',
						right: '4%',
						bottom: '3%',
						containLabel: true
					},
					xAxis: [{
						type: 'category',
						data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
					}],
					yAxis: [{
						type: 'value'
					}],
					series: [{
							name: '直接访问',
							type: 'bar',
							data: [320, 332, 301, 334, 390, 330, 320]
						},
						{
							name: '邮件营销',
							type: 'bar',
							stack: '广告',
							data: [120, 132, 101, 134, 90, 230, 210]
						},
						{
							name: '联盟广告',
							type: 'bar',
							stack: '广告',
							data: [220, 182, 191, 234, 290, 330, 310]
						},
						{
							name: '视频广告',
							type: 'bar',
							stack: '广告',
							data: [150, 232, 201, 154, 190, 330, 410]
						},
						{
							name: '搜索引擎',
							type: 'bar',
							data: [862, 1018, 964, 1026, 1679, 1600, 1570],
							markLine: {
								lineStyle: {
									normal: {
										type: 'dashed'
									}
								},
								data: [
									[{
										type: 'min'
									}, {
										type: 'max'
									}]
								]
							}
						},
						{
							name: '百度',
							type: 'bar',
							barWidth: 5,
							stack: '搜索引擎',
							data: [620, 732, 701, 734, 1090, 1130, 1120]
						},
						{
							name: '谷歌',
							type: 'bar',
							stack: '搜索引擎',
							data: [120, 132, 101, 134, 290, 230, 220]
						},
						{
							name: '必应',
							type: 'bar',
							stack: '搜索引擎',
							data: [60, 72, 71, 74, 190, 130, 110]
						},
						{
							name: '其他',
							type: 'bar',
							stack: '搜索引擎',
							data: [62, 82, 91, 84, 109, 110, 120]
						}
					]
				})
			},
		}
	}
</script>

<style>
	@import './css/jiaoyujiaoxue.css';
</style>