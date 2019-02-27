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
				<div class="head_right">
					<Button type="ghost" style="margin-left: 10px;margin-top: 5px;"	@click="temporaryStorage">暂存</Button>
					<Button type="primary" style="margin-left: 10px;margin-top: 5px;" @click="sendOut">发送</Button>
				</div>
			</div>
			<section class="send_frames">
			<div class="send_box">
				<div class="send_object">
					<div class="send_object_left">发送对象</div>
					<div class="send_object_right">
						<Input style="cursor:not-allowed;width: 650px;height: 32px;margin-left: 10px;" type="text" placeholder="选择发送对象" disabled="disabled" v-model='send_emails_data[0].send_object'></Input>
						<Button type="primary" style="margin-left: 20px;" @click="choice">选择</Button>
						<Button type="ghost" style="margin-left: 10px;"	@click="emptySend">清空</Button>
					</div>
				</div>
				<div class="mail_title">
					<div class="mail_title_left">邮箱标题</div>
					<div class="mail_title_right">
						<Input type="text" style="width: 650px;height: 32px;margin-left: 10px;margin-top: 9px;" placeholder="输入邮箱标题" v-model='send_emails_data[0].mail_title'></Input>
					</div>
				</div>
				<div class="mail_text">
					<div class="mail_text_left">邮箱正文</div>
					<div class="mail_text_right">
						<div id="editorContainer"></div>
					</div>
				</div>
				<div class="mail_enclosure">
					<div class="mail_enclosure_left">邮箱附件</div>
					<div class="mail_enclosure_right">
						<Upload style="float: left;" multiple action="//jsonplaceholder.typicode.com/posts/" :on-success="handleSuccess" :format=this.mail_enclosure_attribute[1] :show-upload-list="true" :max-size=this.mail_enclosure_attribute[0]>
							<Button type="ghost" style="width: 150px;height: 40px;font-size: 14px;">从电脑上传文件</Button>
						</Upload>
						<Button type="ghost" style="width: 150px;height: 40px;font-size: 14px;margin-left: 15px;">从文件库选择文件</Button>
					</div>
				</div>
				<div class="mail_important">
					<div class="mail_important_left">重要程度</div>
					<div class="mail_important_right">
						<span v-for="(item,index) in mail_important_data" @click="important(index)">{{item}}</span>
					</div>
				</div>
			</div>
			</section>
		</div>

		<subcomponent ref="subcomponent"></subcomponent>
	</section>
</template>

<script>
	import subcomponent from './lianxiren.vue'

	import { createEditor } from 'vueditor'
	import 'vueditor/dist/style/vueditor.min.css'
	import lang from "vueditor/dist/language/lang.cn.js"
	export default {
		//name: "parent",
		components: {
			subcomponent: subcomponent
		},
		data() {
			return {
				dateTime: {
					year: '',
					now: ''
				},
				mail_important_data: ['特别重要', '一般重要'],
				mail_enclosure_attribute: [2048, ['vue', 'jpg', 'png']],
				send_emails_data: [{
					send_object: '',
					mail_title: '',
					mail_text: '',
					mail_enclosure: {
						mail_have: '0',
						mail_arr: [],
					},
					mail_important: ''
				}],
				inst: {},
			}
		},
		beforeMount: function() {
			//			this.getJson();
			//			this.handle();
		},
		mounted: function() {
			this.handle();
			this.editor();
		},

		methods: {
			//挂载的方法
			handle() {
				//时间日期
				var myDate = new Date();
				var months = myDate.getMonth() + 1;
				var timer = myDate.getFullYear() + '年' + months + '月' + myDate.getDate() + '日';
				var mytime = myDate.toLocaleTimeString();
				this.dateTime.year = timer;
				this.dateTime.now = mytime;

			},
			//选择
			choice(){
				var response = [["4355", "吴孩福", 1, 0],["4342", "苗神小", 1, 1]];
				var value = [["4338", "吴料", 1, 2],["4330", "吴术", 1, 3]];
				this.$refs.subcomponent.contactsOpen(response,value);
			},
			//清空
			emptySend(){
				var mail_important_right = document.getElementsByClassName('mail_important_right')[0];
				var span_first = mail_important_right.getElementsByTagName('span');
				for(var i = 0; i < span_first.length; i++) {
					span_first[i].style.color = '';
				}
				this.inst.setContent('');
				this.send_emails_data[0].send_object = '';
				this.send_emails_data[0].mail_title = '';
				this.send_emails_data[0].mail_enclosure.mail_have = '0';
				this.send_emails_data[0].mail_enclosure.mail_arr = [];
				this.send_emails_data[0].mail_important = '0';
			},
			//接收子组件方法
			contacts_accept(response) {
				var newJsonArr = [];
				for(var i=0;i<response.length;i++){
					newJsonArr.push(response[i][1]+';');
				}
				var bin = newJsonArr.join('');
				this.send_emails_data[0].send_object = bin;
			},
			//暂存
			temporaryStorage(){
//					this.inst.setContent(this.send_emails_data[0].mail_text);
					this.send_emails_data[0].mail_text = this.inst.getContent();
					console.log(this.send_emails_data);
			},
			//发送
			sendOut(){
				this.send_emails_data[0].mail_text = this.inst.getContent();
				console.log(this.send_emails_data);
			},
			//文本编辑器
			editor() {
				this.inst = createEditor('#editorContainer', {
					toolbar: [
						'removeFormat', 'undo', 'redo', '|', 'element', 'fontName', 'fontSize', 'foreColor', 'backColor', 'divider', 'bold', 'italic', 'underline', 'strikeThrough',
						'link', 'unLink', 'divider', 'subscript', 'superscript', 'divider', 'justifyLeft', 'justifyCenter', 'justifyRight', 'justifyFull',
						'|', 'indent', 'outdent', 'insertOrderedList', 'insertUnorderedList', '|', 'emoji', 'picture', 'table', '|', 'fullscreen', 'sourceCode', 'markdown'
					],
					fontName: [{
							val: 'arial black'
						},
						{
							val: 'times new roman'
						},
						{
							val: 'Courier New'
						},
						{
							val: '微软雅黑'
						}
					],
					fontSize: ['12px', '14px', '16px', '18px', '0.8rem', '1.0rem', '1.2rem', '1.5rem', '2.0rem'],
					uploadUrl: '',
					id: '',
					classList: ["editor-eara"],
				});
			},
			handleSuccess(response, file, fileList) {
				alert('上传成功');
				this.send_emails_data[0].mail_enclosure.mail_have = '1';
				console.log(fileList);
				for(var i = 0; i < fileList.length; i++) {
					this.send_emails_data[0].mail_enclosure.mail_arr.push({
						mail_name: fileList[i].name.split('.')[0],
						mail_size: fileList[i].size,
						mail_format: fileList[i].name.split('.')[1],
					})
				}
				this.send_emails_data[0].mail_enclosure.mail_arr.splice(fileList.length);
				console.log(this.send_emails_data);
				console.log(fileList)
			},
			//重要程度
			important(index) {
				var mail_important_right = document.getElementsByClassName('mail_important_right')[0];
				var span_first = mail_important_right.getElementsByTagName('span');
				if(index == '0') {
					span_first[0].style.color = 'red';
					span_first[1].style.color = '';
					this.send_emails_data[0].mail_important = '1';
				} else if(index == '1') {
					span_first[0].style.color = '';
					span_first[1].style.color = '#1abc9c';
					this.send_emails_data[0].mail_important = '0';
				}
			},
			int(response){
					var params = [[0,0,1],[0,0,0]];
					var value = [[0,0,2],[0,0,1],[0,0,3]];
					this.$refs.subcomponent.popups_empty(response,params,value);
			},

		}
	}
</script>

<style scoped>
	@import './css/fayoujian.css';
</style>

<style>
	.editor-eara {
		height: 270px;
		width: 860px;
		margin: 4px auto;
		overflow: auto;
		-word-break: break-all;
	}
</style>