<template>
<section>
    <Card style="width:350px;margin: 100px auto;">
        <Tabs value="name1">
            <TabPane label="登录" name="name1" icon="logo-apple">

                <Form ref="formInline" :model="formInline" :rules="ruleInline" inline>
                    <div style="padding-left: 35px;margin-top: 10px;">
                        <FormItem prop="user">
                        <Input type="text" v-model="formInline.user" placeholder="Username" style="width: 240px;">
                            <span slot="prepend">
                                <Icon :size="14" type="person"></Icon>
                            </span>
                        </Input>
                        </FormItem>
                    </div>
                    <div style="padding-left: 35px;">
                        <FormItem prop="password">
                        <Input type="text" v-model="formInline.password" placeholder="Password" style="width: 240px;">
                            <span slot="prepend">
                                <Icon :size="14" type="locked"></Icon>
                            </span>
                        </Input>
                        </FormItem>
                    </div>
                    <div style="padding-left: 35px;">
                        <FormItem>
                        <Button type="primary" @click="handleSubmit('formInline')" style="width: 240px;">登录</Button>
                        </FormItem>
                    </div>
                    
                </Form>

            </TabPane>
            <TabPane label="注册" name="name2" icon="logo-windows">Welcome</TabPane>
        </Tabs>
    </Card>
</section>
</template>

<script>

    export default {
        data () {
            return {
                formInline: {
                    user: '',
                    password: ''
                },
                ruleInline: {
                    user: [
                        { required: true, message: '请输入用户名', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '请输入密码', trigger: 'blur' },
                        { type: 'string', min: 6, message: '密码长度不能小于6位', trigger: 'blur' }
                    ]
                }
            }
        },
        activated(){
            this.formInline.user = '';
            this.formInline.password = '';
        },
        methods: {
            b64Decode(input){
                var _keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
                var output = "";
                var chr1, chr2, chr3;
                var enc1, enc2, enc3, enc4;
                var i = 0;
                input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
                while (i < input.length) {
                    enc1 = _keyStr.indexOf(input.charAt(i++));
                    enc2 = _keyStr.indexOf(input.charAt(i++));
                    enc3 = _keyStr.indexOf(input.charAt(i++));
                    enc4 = _keyStr.indexOf(input.charAt(i++));
                    chr1 = (enc1 << 2) | (enc2 >> 4);
                    chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
                    chr3 = ((enc3 & 3) << 6) | enc4;
                    output = output + String.fromCharCode(chr1);
                    if (enc3 != 64) {
                        output = output + String.fromCharCode(chr2);
                    }
                    if (enc4 != 64) {
                        output = output + String.fromCharCode(chr3);
                    }
                }
                output = this.utf8_decode(output);
                return output;
    
            },
            utf8_decode (utftext) { 
                var string = "";
                var i = 0;
                //var c = c1 = c2 = 0;
                var c,c1,c2,c3;

                while ( i < utftext.length ) {
                    c = utftext.charCodeAt(i);
                    if (c < 128) {
                        string += String.fromCharCode(c);
                        i++;
                    } else if((c > 191) && (c < 224)) {
                        c2 = utftext.charCodeAt(i+1);
                        string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
                        i += 2;
                    } else {
                        c2 = utftext.charCodeAt(i+1);
                        c3 = utftext.charCodeAt(i+2);
                        string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
                        i += 3;
                    }
                }
                return string;
            },
            handleSubmit(name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        let game = window.localStorage.getItem('game');
                        let stimulate = window.localStorage.getItem('stimulate');
                        game = this.b64Decode(game);
                        stimulate = this.b64Decode(stimulate);
                        if(this.formInline.user == game&&this.formInline.password == stimulate){
                            this.formInline.user = '';
                            this.formInline.password = '';
                            this.$router.push({name: 'Mock',params:{id: 20}});
                            sessionStorage.setItem("token",'用户HK-869');
                            this.$Message.success('Success!');
                        }else{
                            this.$Message.error('信息错误!');
                        }
                    } else {
                        this.$Message.error('Fail!');
                    }
                })
            },
        }
    }
</script>

<style>
  .ivu-tabs-nav-scroll{
    padding-left:50px !important;
  }
</style>
