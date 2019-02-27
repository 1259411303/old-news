<template>
	<section style="width: 100%;margin-top: 50px;">
    <Form :model="watchItem" :label-width="80" style="width: 570px;margin: 0px auto;">
    	<div style="height: 60px;">
        <FormItem label="姓名" style="float: left;">
            <Input v-model="watchItem.inputName" style="width: 100px;" placeholder="请输入姓名"></Input>
        </FormItem>
        
        <FormItem label="性别" style="float: left;">
            <Select v-model="watchItem.selectSex" style="width: 50px;">
                <Option value="男">男</Option>
                <Option value="女">女</Option>
            </Select>
        </FormItem>
        
        <FormItem label="民族" style="float: left;">
            <Input v-model="watchItem.inputNation" style="width: 100px;" placeholder="请输入民族"></Input>
        </FormItem>
       </div>
       
       <div style="height: 60px;">
        <FormItem label="出生年月" style="width: 500px;">
            <Row>
                <Col span="11">
                    <FormItem prop="date" style="width: 350px;">
                        <DatePicker style="width: 350px;" type="date" placeholder="请输入出生年月" v-model="watchItem.date"></DatePicker>
                    </FormItem>
                </Col>
            </Row>
        </FormItem>
        </div>
        
		<FormItem label="学校">
            <Input v-model="watchItem.inputSchool" style="width: 350px;" placeholder="请输入学校"></Input>
        </FormItem>
        
        <FormItem label="户口地址">
            <Input v-model="watchItem.inputAddress" style="width: 350px;" placeholder="请输入户口地址"></Input>
        </FormItem>
        
        <FormItem label="现住地址">
            <Input v-model="watchItem.inputPresentAddress" style="width: 350px;" placeholder="请输入现住地址"></Input>
        </FormItem>
        
        <div style="height: 60px;">
        <FormItem label="父亲信息" style="float: left;">
            <Input v-model="watchItem.fatherName" style="width: 100px;" placeholder="姓名"></Input>
            <InputNumber style="width: 50px;" placeholder="年龄" v-model="watchItem.fatherAge"></InputNumber>
            <Input v-model="watchItem.fatherCompany" style="width: 140px;" placeholder="工作单位"></Input>
            <Input v-model="watchItem.fatherPhone" style="width: 120px;" placeholder="联系电话"></Input>
        </FormItem>
       </div>
       
        <div style="height: 60px;">
        <FormItem label="母亲信息" style="float: left;">
            <Input v-model="watchItem.motherName" style="width: 100px;" placeholder="姓名"></Input>
            <InputNumber v-model="watchItem.motherAge" style="width: 50px;" placeholder="年龄"></InputNumber>
            <Input v-model="watchItem.motherCompany" style="width: 140px;" placeholder="工作电话"></Input>
            <Input v-model="watchItem.motherPhone" style="width: 120px;" placeholder="联系电话"></Input>
        </FormItem>
       </div>
        
        <FormItem>
            <Button type="primary" @click="submission">保存</Button>
            <Button type="ghost" style="margin-left: 8px" @click="next">下一步</Button>
        </FormItem>
    </Form>
    </section>
</template>
<script>
    export default {
        data () {
            return {
            	watchItem: {
            		inputName: '',
            		selectSex: '男',
            		inputNation: '',
            		date: '',
            		inputSchool: '',
            		inputAddress: '',
            		inputPresentAddress: '',
            		fatherName: '',
            		fatherAge: 0,
            		fatherCompany: '',
            		fatherPhone: '',
            		motherName: '',
            		motherAge: 0,
            		motherCompany: '',
            		motherPhone: '',
            	},
            }
        },
        methods: {
        	//提交
        	submission(){
        		console.log('fun');
        	},
        	//下一步
        	next(){
//      		this.$parent.mergeOpen(2);
        	},
        }
    }
</script>

<style scoped>
</style>