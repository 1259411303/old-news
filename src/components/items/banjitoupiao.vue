<template>
	<section class="frame_vote">
		<div class="header_vote">
			<div class="header_vote_left">
					<ul>
						<li>
							<Icon type="ios-box" size='40'></Icon>
						</li>
						<li><span style="color: red;">高一11班</span>的班级投票</li>
					</ul>
			</div>
			<div class="header_vote_right">
				<Button type="ghost" style="float: right;margin-right: 15px;margin-top: 8px;" @click="addVote"><Icon type="plus"></Icon>添加投票</Button>
			</div>
		</div>
		<div class="table_frames">
		<table class="vote_tabel">
			<tr>
				<th v-for="item in vote_header">{{item.label}}</th>
			</tr>
			<tr v-show = "vote_active">
				<td><Button type="error" @click="cancel">取消</Button></td>
				<td>班级投票</td>
				<td class="input_title"><Input type="text" v-model="input_title" placeholder="请输入投票标题"></Input></td>
				<td class="input_start"><Input type="text" v-model="input_start" placeholder="选择开始时间"></Input></td>
				<td class="input_end"><Input type="text" v-model="input_end" placeholder="选择结束时间"></Input></td>
				<td>创建中</td>
				<td><Button type="success" @click="determine">确定</Button></td>
			</tr>
			<tr v-for="(item,index) in vote_data">
				<td>{{item.voting_number}}</td>
				<td>{{item.attribute}}</td>
				<td>{{item.voting_title}}</td>
				<td>{{item.start_time}}</td>
				<td>{{item.end_time}}</td>
				<td>{{item.state}}</td>
				<td><Button type="primary" @click="viewTheResults(index)" :disabled="item.see_disable">查看结果</Button>   <Button type="error" @click="editorVote(index)" :disabled="item.edit_disable">编辑投票</Button></td>
			</tr>
		</table>
		</div>
	</section>
</template>

<script>
	var vote = [
	{id: 1,voting_number: '2018012975',attribute: '班级投票',voting_title: '关于秋游后聚餐的投票',start_time: '2018-10-20',end_time: '2018-10-23',state: '0',see_disable: false,edit_disable: false},
	{id: 2,voting_number: '2018012975',attribute: '班级投票',voting_title: '关于秋游后聚餐的投票',start_time: '2018-11-2',end_time: '2018-11-3',state: '1',see_disable: false,edit_disable: false},
	{id: 3,voting_number: '2018012975',attribute: '班级投票',voting_title: '关于秋游后聚餐的投票',start_time: '2018-11-4',end_time: '2018-11-5',state: '2',see_disable: false,edit_disable: false},
	{id: 4,voting_number: '2018012975',attribute: '班级投票',voting_title: '关于秋游后聚餐的投票',start_time: '2018-11-6',end_time: '2018-11-7',state: '0',see_disable: false,edit_disable: false},
	{id: 5,voting_number: '2018012975',attribute: '班级投票',voting_title: '关于秋游后聚餐的投票',start_time: '2018-11-8',end_time: '2018-11-9',state: '2',see_disable: false,edit_disable: false},
	]
	export default{
		//数据
		data(){
			return{
				vote_header: [{label: '投票编号'},{label: '属性'},{label: '投票标题'},{label: '开始时间'},{label: '结束时间'},{label: '状态'},{label: '操作'}],
				vote_data: '',
				vote_active: false,
				input_title: '',
				input_start: '',
				input_end: '',
			}
		},
		//挂在
		mounted: function(){
			this.getJson();
			this.voteState();
		},
		methods:{
			//获取数据
			getJson(){
				this.vote_data = vote;
			},
			//投票状态
			voteState(){
				for(var i=0;i<this.vote_data.length;i++){
					if(this.vote_data[i].state == 0){
						this.vote_data[i].state = '创建中';
						this.vote_data[i].see_disable = true;
					}else if(this.vote_data[i].state == 1){
						this.vote_data[i].state = '投票中';
						this.vote_data[i].edit_disable = true;
					}else if(this.vote_data[i].state == 2){
						this.vote_data[i].state = '投票结束';
						this.vote_data[i].edit_disable = true;
					}
				}
			},
			//添加投票
			addVote(){
				this.vote_active = !this.vote_active;
			},
			//添加确定
			determine(){
				if(this.input_title != ''&&this.input_start != ''&&this.input_end != ''){
					this.vote_data.push({
						id: this.vote_data.length + 1,
						voting_number: '437276356',
						attribute: '班级投票',
						voting_title: this.input_title,
						start_time: this.input_start,
						end_time: this.input_end,
						state: 0,
					})
					this.input_title = '';
					this.input_start = '';
					this.input_end = '';
					this.vote_active = false;
					this.voteState();
				}else{
					this.info();
				}
				
			},
			//添加取消
			cancel(){
				this.vote_active = false;
				this.input_title = '';
				this.input_start = '';
				this.input_end = '';
			},
			//全局提示
			info () {
                this.$Message.info('内容不能为空');
            },
            //查看结果
            viewTheResults(index){
            	alert(index);
            },
            //编辑投票
            editorVote(index){
            	alert(index+'yu')
            }
		}
	}
</script>

<style>
	@import url("./css/banjitoupiao.css");
</style>