<template>
	<section style="width: 100%;margin-top: 50px;">
 		<div class="content">
 			<div class="content_left">
 				<Button type="error" style="width: 190px;margin-bottom: 10px;" @click="addPrize"><Icon type="plus"></Icon>添加奖项</Button>
 				<ul class="prize" v-if="prizeItem.length != 0">
 					<li v-for="(item,index) in prizeItem" :class="{'ivu-btn-primary': item.active}" @click="prizeEvent(index)">
 						{{item.name}}
 						<Icon style="float: right;line-height: 40px;margin-right: 5px;" type="chevron-right"></Icon>
 					</li>
 				</ul>
 				<Alert v-show="alertActive" show-icon style="width: 190px;">添加中</Alert>
 			</div>
 			<div class="content_right" v-show="contentActive">
 				<Form :model="formItem" :label-width="80" style="width: 570px;margin: 0px auto;">
			   		<FormItem label="名称">
			        	<Input v-model="formItem.inputName" style="width: 300px;" placeholder="请输入姓名"></Input>
			    	</FormItem>
			    	
			    	<FormItem label="类型">
			        	<span v-for="(item,index) in prizeType">
							<Button style="width: 68px;margin-right: 10px;margin-bottom: 5px;" @click="prizeTypeEvent(index)" :class="{'ivu-btn-primary': item.active}">{{item.name}}</Button>
						</span>
			    	</FormItem>
			    	
			    	<FormItem label="级别">
			        	<span v-for="(item,index) in prizeLevel">
							<Button style="width: 68px;margin-right: 10px;margin-bottom: 5px;" @click="prizeLevelEvent(index)" :class="{'ivu-btn-primary': item.active}">{{item.name}}</Button>
						</span>
			    	</FormItem>
			    	
			    	<FormItem label="奖项">
			        	<span v-for="(item,index) in prize">
							<Button style="width: 68px;margin-right: 10px;margin-bottom: 5px;" @click="prizeEx(index)" :class="{'ivu-btn-primary': item.active}">{{item.name}}</Button>
						</span>
			    	</FormItem>
			    	
			    	<div style="width: 200px;height: 170px;margin-left: 80px;overflow: hidden;">
			    		<upimg type="huojiang" huojiangid="10" ref="bin" :uploadText="uploadData"></upimg>
			    	</div>
 				</Form>
 				<div style="width: 600px;height: 40px;">
 					<Button type="error" style="margin-right: 50px;float: right;" @click="prizeDelete">删除</Button>
					<Button type="primary" style="margin-right: 10px;float: right;" @click="save">保存</Button>
					<Button type="ghost" style="margin-right: 10px;float: right;" @click="cancel">取消</Button>
				</div>
 				
 				
 			</div>
 		</div>
 		
 			<div style="width: 800px;height: 40px;margin: auto;">
				<Button type="success" style="margin-right: 350px;float: right;" @click="preview">预览</Button>
				<Button type="ghost" style="margin-right: 15px;float: right;" @click="prev">上一步</Button>
			</div>
 		
    </section>
</template>
<script>
	import upimg from './upImg'
    export default {
        data () {
            return {
            	formItem: {
            		inputName: '',	
            	},
            	setI: '',
            	setJ: '',
            	setK: '',
            	uploadData: '重新上传',
            	prizeRecordIndex: 0,
            	addText: '添加奖项',
            	contentActive: false,
            	alertActive: false,
            	prizeItem: [],
            	prizeType: [{id: 1,name: '科技',active: false},{id: 2,name: '艺术',active: false},{id: 3,name: '体育',active: false}],
            	prizeLevel: [{id: 1,name: '区级',active: false},{id: 2,name: '市级',active: false},{id: 3,name: '省级',active: false},{id: 4,name: '国家级',active: false}],
            	prize: [{id: 1,name: '一等奖',active: false},{id: 2,name: '二等奖',active: false},{id: 3,name: '三等奖',active: false},{id: 4,name: '优秀奖',active: false},{id: 4,name: '其他',active: false}],
            }
        },
        components:{
        	upimg
        },
        mounted(){
        },
        created:function(){
        	this.getJson();
        },
        methods: {
        	getJson(){
        		var user_id = 5;
        		var session_id = 'iu5tp93qk424jighd9ncqk4917';
        		var dangan_id = 1;
        		var that = this;
				var parameter = {user_id: user_id,session_id: session_id,dangan_id: dangan_id};
				this.$http.post('http://47.106.77.12/hs2f/baoming/getHuojiang',parameter).then(function(response){
					console.log(response.data.data);
					for(var i=0;i<response.data.data.length;i++){
						that.prizeItem.push({
							id: response.data.data[i].id,
							name: response.data.data[i].mingcheng,
							imgSrc: response.data.data[i].zhengming_url,
							active: false,
							record: [response.data.data[i].leixing,response.data.data[i].jibie,response.data.data[i].mingci],
							imgId: response.data.data[i].zhengming_id,
						})
					}
				}).catch(function(err){
					alert(err);
				})	
        	},
        	//奖项事件
			prizeEvent(index){
				if(this.alertActive == false){
					this.prizeRecordIndex = index;
					this.contentActive = true;
					this.emptyTypeColor(1);
					this.emptyLevelColor(1);
					this.emptyPrizeColor(1);
					this.emptyItemColor();
					this.prizeItem[index].active = true;
					this.prizeType[this.prizeItem[index].record[0]].active = true;
					this.prizeLevel[this.prizeItem[index].record[1]].active = true;
					this.prize[this.prizeItem[index].record[2]].active = true;
					this.formItem.inputName = this.prizeItem[index].name;
					this.$refs.bin.imgSrc = this.prizeItem[index].imgSrc;
				}
			},
			//奖项类型
			prizeTypeEvent(index){
				this.emptyTypeColor(1);
				this.prizeType[index].active = true;
			},
			//奖项级别
			prizeLevelEvent(index){
				this.emptyLevelColor(1);
				this.prizeLevel[index].active = true;
			},
			//奖项
			prizeEx(index){
				this.emptyPrizeColor(1);
				this.prize[index].active = true;
			},
			//添加奖项
			addPrize(){
				this.formItem.inputName = '';
				this.emptyTypeColor(1);
				this.emptyLevelColor(1);
				this.emptyPrizeColor(1);
				this.$refs.bin.success = 0;
				this.$refs.bin.imgSrc = '';
				if(this.alertActive == false){
					this.contentActive = true;
					this.alertActive = true;
					this.addText = '取消添加';
				}else{
					this.info(3);
				}
			},
			//保存
			save(){
				if(this.formItem.inputName == ''||this.emptyTypeColor(2) == 3||this.emptyLevelColor(2) == 4||this.emptyPrizeColor(2) == 5||this.$refs.bin.success == 0){
					this.info(4);
				}
				if(this.addText == '取消添加'){
					if(this.formItem.inputName != ''&&this.$refs.bin.success != 0){
						for(var i=0;i<this.prizeType.length;i++){
						  if(this.prizeType[i].active == true){
							  	for(var j=0;j<this.prizeLevel.length;j++){
								  if(this.prizeLevel[j].active == true){
									  	for(var k=0;k<this.prize.length;k++){
										  if(this.prize[k].active == true){
										  	
											this.setI = i;
											this.setJ = j;
											this.setK = k;
											var user_id = 5;
											var session_id = 'ddrd0v20c0d7ri8nhr88pkiav2';
											var dangan_id = 1;
											var leixing = this.prizeType[i].name;
											var mingcheng = this.formItem.inputName;
											var jibie = this.prizeLevel[j].name;
											var mingci = this.setK;
											var zhengming_id = this.$refs.bin.success;
											var zhengming_url = this.$refs.bin.imgSrc;
											var that = this;
											var parameter = {user_id: user_id,session_id: session_id,dangan_id: dangan_id,leixing: leixing,mingcheng: mingcheng,jibie: jibie,mingci: mingci,zhengming_id: zhengming_id,zhengming_url: zhengming_url};
											this.$http.post('http://47.106.77.12/hs2f/baoming/addHuojiang',parameter).then(function(response){
												console.log(response);
												var setId = response.data.has_add;
												that.prizeItem.push({
										  		id: setId,
										  		name: that.formItem.inputName,
										  		active: false,
										  		record: [that.setI,that.setJ,that.setK],
										  		imgSrc: that.$refs.bin.imgSrc,
										  		imgId: that.$refs.bin.success,
											  	})
											  	that.addText = '添加奖项';
											  	that.alertActive = false;
											  	that.contentActive = false;
											  	that.emptyItemColor();
											  	that.info(2);
											  	that.$refs.bin.imgSrc = '';
											}).catch(function(err){
												alert(err);
											})	
									
											
										  	
										  }
										}
								  }
								}
						  }
						}
					}
				}else{
					if(this.formItem.inputName != ''){
						for(var i=0;i<this.prizeType.length;i++){
						  if(this.prizeType[i].active == true){
							  	for(var j=0;j<this.prizeLevel.length;j++){
								  if(this.prizeLevel[j].active == true){
									  	for(var k=0;k<this.prize.length;k++){
										  if(this.prize[k].active == true){
										  	this.setI = i;
										  	this.setJ = j;
										  	this.setK = k;
										  	this.$refs.bin.success = 0;
										  	this.$refs.bin.imgSrc = '';
										  	
										  	var user_id = 5;
										  	var session_id = 'ddrd0v20c0d7ri8nhr88pkiav2';
										  	var huojiang_id = this.prizeItem[this.prizeRecordIndex].id;
										  	var leixing = this.prizeType[i].name;
										  	var mingcheng = this.formItem.inputName;
										  	var jibie = this.prizeLevel[j].name;
										  	var mingci = this.prize[k].name;
										  	var zhengming_id = this.$refs.bin.success;
										  	var zhengming_url = this.$refs.bin.imgSrc;
										  	var that = this;
											var parameter = {user_id: user_id,session_id: session_id,huojiang_id: huojiang_id,leixing: leixing,mingcheng: mingcheng,jibie: jibie,mingci: mingci,zhengming_id: zhengming_id,zhengming_url: zhengming_url};
											this.$http.post('http://47.106.77.12/hs2f/baoming/saveHuojiang',parameter).then(function(response){
												console.log(response);
												that.prizeItem[that.prizeRecordIndex].name = that.formItem.inputName;
										  		that.prizeItem[that.prizeRecordIndex].record = [that.setI,that.setJ,that.setK];
										  		that.prizeItem[that.prizeRecordIndex].imgSrc = that.$refs.bin.imgSrc;
										  		that.$refs.bin.imgSrc = '';
										  		that.info(1);
											}).catch(function(err){
												alert(err);
											})	
										  	
										  }
										}
								  }
								}
						  }
						}
					}
					
					
				}
			},
			//清空类型颜色
			emptyTypeColor(response){
				var count = 0;
				for(var i=0;i<this.prizeType.length;i++){
					if(response == 1){
						this.prizeType[i].active = false;
					}
						if(this.prizeType[i].active == false){
							count++;
						}
				}
				if(response == 2){
					return count
				}
			},
			//清空级别颜色
			emptyLevelColor(response){
				var count = 0;
				for(var i=0;i<this.prizeLevel.length;i++){
					if(response == 1){
						this.prizeLevel[i].active = false;
					}
					if(this.prizeLevel[i].active == false){
						count++;
					}
				}
				if(response == 2){
					return count
				}
			},
			//清空奖项颜色
			emptyPrizeColor(response){
				var count = 0;
				for(var i=0;i<this.prize.length;i++){
					if(response == 1){
						this.prize[i].active = false;
					}
					if(this.prize[i].active == false){
						count++;
					}
				}
				if(response == 2){
					return count
				}
			},
			//清空奖项事件颜色
			emptyItemColor(){
				for(var i=0;i<this.prizeItem.length;i++){
					this.prizeItem[i].active = false;
				}
			},
			//全局提示
			info (response) {
				if(response == 1){
					this.$Message.info('修改成功');	
				}else if(response == 2){
					this.$Message.info('添加成功');
				}else if(response == 3){
					this.$Message.info('请先完成添加奖项');
				}else if(response == 4){
					this.$Message.info('信息不完整');
				}
           },
           	//预览
           	preview(){
           	},
           	//上一步
           	prev(){
           	},
           	//取消
           	cancel(){
           		this.contentActive = false;
				this.alertActive = false;
				this.addText = '添加奖项';
           	},
           	//删除
           	prizeDelete(){
           		var huojiang_id = this.prizeItem[this.prizeRecordIndex].id;
           		var user_id = 5;
           		var session_id = 'iu5tp93qk424jighd9ncqk4917';
           		var that = this;
				var parameter = {huojiang_id: huojiang_id,user_id: user_id,session_id,session_id};
				this.$http.post('http://47.106.77.12/hs2f/baoming/delHuojiang',parameter).then(function(response){
					console.log(response)
					that.prizeItem.splice(this.prizeRecordIndex,1);
				}).catch(function(err){
					console.log(err);
				})	
           }
			
       }
    }
</script>

<style scoped>
	.content{
		width: 800px;
		height: 480px;
		margin: 0px auto;
	}
	.content_left{
		width: 200px;
		height: 450px;
		float: left;
	}
	.content_right{
		width: 600px;
		height: 470px;
		float: right;
		padding-top: 15px;
		overflow: hidden;
		box-sizing: border-box;
		border: 1px solid #dddee1;
	}
	.prize{
		width: 190px;
		border-top: 1px solid #dddee1;
	}
	.prize li{
		width: 190px;
		height: 40px;
		overflow: hidden;
		text-align: center;
		line-height: 40px;
		border-left: 1px solid #dddee1;
		border-right: 1px solid #dddee1;
		border-bottom: 1px solid #dddee1;
	}
</style>