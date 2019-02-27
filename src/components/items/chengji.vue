<template>
	<section style="width: 100%;height: 610px;margin-top: 50px;">
    <Form :model="formItem" :label-width="80" style="width: 610px;margin: 0px auto;">
    	<div style="height: 60px;">
        <FormItem label="语文" style="float: left;">
            <InputNumber v-model="watchItem.inputChinese" style="width: 300px;" placeholder="请输入语文分数"></InputNumber>
        </FormItem>
        <FormItem label="等级" style="float: left;">
            <Select v-model="formItem.selectChinese" style="width: 80px;">
                <Option value="A">A</Option>
                <Option value="B">B</Option>
                <Option value="C">C</Option>
            </Select>
        </FormItem>
       </div>
        
        <div style="height: 60px;">
        <FormItem label="数学" style="float: left;">
            <InputNumber v-model="watchItem.inputMath" style="width: 300px;" placeholder="请输入数学分数"></InputNumber>
        </FormItem>
        <FormItem label="等级" style="float: left;">
            <Select v-model="formItem.selectMath" style="width: 80px;">
                <Option value="A">A</Option>
                <Option value="B">B</Option>
                <Option value="C">C</Option>
            </Select>
        </FormItem>
        </div>
        
        <div style="height: 60px;">
        <FormItem label="英语" style="float: left;">
            <InputNumber v-model="watchItem.inputEnglish" style="width: 300px;" placeholder="请输入英语分数"></InputNumber>
        </FormItem>
        <FormItem label="等级" style="float: left;">
            <Select v-model="formItem.selectEnglish" style="width: 80px;">
                <Option value="A">A</Option>
                <Option value="B">B</Option>
                <Option value="C">C</Option>
            </Select>
        </FormItem>
        </div>
        
        <div style="height: 60px;">
        <FormItem label="总分" style="float: left;">
            <Button type="warning" style="width: 300px;">{{watchItem.inputTotal}}</Button>
        </FormItem>
        <!--<FormItem label="等级" style="float: left;">
            <Select v-model="formItem.selectTotal" style="width: 80px;">
                <Option value="A">A</Option>
                <Option value="B">B</Option>
                <Option value="C">C</Option>
            </Select>
        </FormItem>-->
        
        <FormItem label="操行" style="float: left;">
            <Select v-model="formItem.selectConduct" style="width: 80px;">
                <Option value="一般">一般</Option>
                <Option value="良好">良好</Option>
                <Option value="优秀">优秀</Option>
            </Select>
        </FormItem>
        
        </div>
        
        <!--<div style="height: 60px;">
        <FormItem label="操行" style="float: left;">
            <Select v-model="formItem.selectConduct" style="width: 80px;">
                <Option value="一般">一般</Option>
                <Option value="良好">良好</Option>
                <Option value="优秀">优秀</Option>
            </Select>
        </FormItem>
        <FormItem label="等级" style="float: left;">
            <Select v-model="formItem.selectGrade" style="width: 80px;">
                <Option value="A">A</Option>
                <Option value="B">B</Option>
                <Option value="C">C</Option>
            </Select>
        </FormItem>
        </div>-->
        
        
        <div style="width: 200px;height: 200px;margin-left: 80px;">
			<upimg type="huojiang" huojiangid="10" ref="bin" :uploadText="uploadData"></upimg>
		</div>
        
        
        
        <FormItem>
        	<Button type="ghost" @click="prev">上一步</Button>
            <Button type="primary" style="margin-left: 8px;" @click="submission">保存</Button>
            <Button type="ghost" style="margin-left: 8px" @click="next">下一步</Button>
        </FormItem>
    </Form>
    <a href="/images/myw3schoolimage.jpg" download="w3logo">vue下载</a>
    </section>
</template>
<script>
	import upimg from './upImg'
    export default {
    	components:{
        	upimg
        },
        data () {
            return {
            	watchItem: {
            		inputChinese: 0,
            		inputMath: 0,
            		inputEnglish: 0,
            		inputTotal: 0,
            	},
                formItem: {
                	selectChinese: '',
                    selectMath: '',
                    selectEnglish: '',
//                  selectTotal: '',
                    selectConduct: '',
//                  selectGrade: '',
                },
                uploadData: '重新上传',
                addState: '',
            }
        },
        watch:{
            watchItem:{
            	handler(curVal,oldVal){
				this.watchItem.inputTotal = Number(this.watchItem.inputChinese) + Number(this.watchItem.inputMath) + Number(this.watchItem.inputEnglish);					
　　　　　　　　　　},
　　　　　　　　　　deep:true
            }
        },
        created:function(){
        	this.getJson();
        },
        methods: {
        	getJson(){
        		var that = this;
        		var user_id = 5;
        		var session_id = 'iu5tp93qk424jighd9ncqk4917';
        		var dangan_id = 1;
				var parameter = {user_id: user_id,session_id: session_id,dangan_id: dangan_id};
				this.$http.post('http://47.106.77.12/hs2f/baoming/getChengji',parameter).then(function(response){
					that.watchItem.inputChinese = response.data.data[0].yuwen_fenshu;
		        	that.formItem.selectChinese = response.data.data[0].yuwen_dengji;
		        	that.watchItem.inputMath = response.data.data[0].shuxue_fenshu;
		        	that.formItem.selectMath = response.data.data[0].shuxue_dengji;
		        	that.watchItem.inputEnglish = response.data.data[0].yingyu_fenshu;
		        	that.formItem.selectEnglish = response.data.data[0].yingyu_dengji;
		        	that.formItem.selectConduct = response.data.data[0].caoxing;
				}).catch(function(err){
					alert(err);
				})	
        	},
        	//提交
        	submission(){
        		if(this.$refs.bin.success != 0){
        			var loadArr = [];
        			for(var item in this.formItem){
        				loadArr.push(item);
        			}
        			var count = 0;
        			for(var i=0;i<loadArr.length;i++){
        				if(this.formItem[loadArr[i]] != ''){
        					count++;
        				}
        			}
        			if(count == loadArr.length){
		        		var user_id = 5;
		        		var session_id = 'ddrd0v20c0d7ri8nhr88pkiav2';
		        		var dangan_id = 1;
		        		var that = this;
						var parameter = {user_id: user_id,session_id: session_id,dangan_id: dangan_id};
						this.$http.post('http://47.106.77.12/hs2f/baoming/addChengji',parameter).then(function(response){
							console.log(response);
						}).catch(function(err){
							alert(err);
						})	
						var user_id = 5;
		        		var session_id = 'ddrd0v20c0d7ri8nhr88pkiav2';
		        		var chengji_id = 1;
		        		var yuwen_fenshu = this.watchItem.inputChinese;
		        		var yuwen_dengji = this.formItem.selectChinese;
		        		var shuxue_fenshu = this.watchItem.inputMath;
		        		var shuxue_dengji = this.formItem.selectMath;
		        		var yingyu_fenshu = this.watchItem.inputEnglish;
		        		var yingyu_dengji =this.formItem.selectEnglish;
		        		var caoxing = this.formItem.selectConduct;
		        		var that = this;
						var parameter = {user_id: user_id,session_id: session_id,chengji_id: chengji_id,yuwen_fenshu: yuwen_fenshu,yuwen_dengji: yuwen_dengji,shuxue_fenshu: shuxue_fenshu,
						shuxue_dengji: shuxue_dengji,yingyu_fenshu: yingyu_fenshu,yingyu_dengji: yingyu_dengji,caoxing: caoxing};
						this.$http.post('http://47.106.77.12/hs2f/baoming/saveChengji',parameter).then(function(response){
							console.log(response);
							that.addState = response.data.has_save;
						}).catch(function(err){
							alert(err);
						})	
					}else{
						this.info(2);
					}
        		}else{
        			this.info(1);
        		}
        	},
        	//上一步
        	prev(){
        			this.submission();
        			this.$refs.bin.imgSrc = '';
        	},
        	//下一步
        	next(){
        		if(this.addState == 1){
        			this.submission();
					this.$refs.bin.imgSrc = '';
        		}
//      		console.log(sessionStorage.getItem('userId'));
        	},
        	//全局提示
			info (response) {
				if(response == 1){
					this.$Message.info('还没上传');
				}else if(response == 2){
					this.$Message.info('信息不完整');
				}
                
           	},
        }
    }
</script>

<style scoped>
.ivu-btn {
	text-align: left;
}
</style>