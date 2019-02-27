<template>
    <div>
        <div class="img-wrap">
            <Icon type="image" v-show="imgSrc.length==0"></Icon>
            <img :src="imgSrc" v-show="imgSrc.length>0">
        </div>
        <Progress :percent="progress"  hide-info></Progress>
        <Button type="primary" long class="inputwrap"><input type="file" class="inputfile" @change="fileChange" ref="file"><span>{{theuploadText}}</span></Button> 
    </div>
</template>

<style scoped>
.inputwrap {
  position: relative;
  cursor: pointer;
}
.inputwrap * {
  cursor: pointer;
}
.inputfile {
  opacity: 0;
  cursor: pointer;
  /* z-index: -1; */
  top: 0;
  left: 0;
  height: 100%;
  background: #000;
  width: 100%;
  position: absolute;
}
.img-wrap {
  width: 100%;
  height: 100px;
  background: #eee;
  border-radius: 5px;
  justify-content: center;
  display: flex;
  font-size: 40px;
  align-items: center;
}
.img-wrap img {
  max-height: 100px;
  width: auto;
}
</style>

<script>
import axios from "axios";
let user_id = "200078",
  user_name = "Shuaifang";
let appurl = "http://47.106.77.12/";
export default {
  data() {
    return {
      url: "",
      AccessKeyID: "",
      AccessKeySecret: "",
      olpolicy: "",
      signature: "",
      progress: 0,
      value: "",
      entername: "hs2f/" + this.type + "/",
      imgSrc: "",
      allowType: ["jpg", "jpeg", "png", "gif", "bmp"], //可选类型
      success: 0
    };
  },
  props: ["type", "huojiangid", "mingcheng","uploadText"],
  computed: {
    theuploadText(){
      if(this.uploadText==undefined||this.uploadText==''){
        return '上传文件'
      }
      else{
        return this.uploadText
      }
    }
  },
  mounted() {
    this.getJiami();
  },
  methods: {
    getJiami() {
      axios
        .post(appurl + "hs2f/index/Jiami")
        .then(res => {
          this.AccessKeyID = res.data.access_id;
          this.url = res.data.url;
          this.signature = res.data.signature;
          this.olpolicy = res.data.policy;
        })
        .catch(err => {});
    },
    fileChange(e) {
      this.success = 0;
      this.value = this.entername + e.target.value; //本地文件路径

      let lastx = this.value.lastIndexOf("\\");
      let lastdot = this.value.lastIndexOf(".");
      let name = this.value.substring(lastx + 1, lastdot); //本地文件名
      let fileType = this.value.substring(lastdot + 1); //本地文件类型
      let jiangxiang = "";
      let filePass = false;
      let timestamp = (new Date()).valueOf();
      this.allowType.forEach((item, i) => {
        if (item == fileType) {
          filePass = true;
        }
      });

      //判断类型
      if (filePass) {
        const config = {
          onUploadProgress: progressEvent => {
            var complete =
              (progressEvent.loaded / progressEvent.total * 100) | 0;
            this.progress = complete;
          }
        };

        if (this.type == "huojiang") {
          jiangxiang = this.huojiangid;
        }
        var request = new FormData();
        request.append("OSSAccessKeyId", this.AccessKeyID); //Bucket 拥有者的Access Key Id。
        request.append("policy", this.olpolicy); //policy规定了请求的表单域的合法性
        request.append("Signature", this.signature); //根据Access Key Secret和policy计算的签名信息，OSS验证该签名信息从而验证该Post请求的合法性
        request.append(
          "key",
          this.entername +
            user_id +
            "_" +
            user_name +
            "_" +
            this.type +
            "_" +
            jiangxiang +
            timestamp +
            "." +
            fileType
        ); //文件名字，可设置路径
        request.append("success_action_status", "200"); // 让服务端返回200,不然，默认会返回204
        request.append("file", this.$refs.file.files[0]); //需要上传的文件 file
        axios
          .post(this.url, request, config)
          .then(res => {
            this.imgSrc =
              this.url +
              "/" +
              this.entername +
              user_id +
              "_" +
              user_name +
              "_" +
              this.type +
              "_" +
              jiangxiang +
              timestamp +
              "." +
              fileType;
            this.progress = 0;
            let imgtosev = {
              user_id: 5,
              dangan_id:1,
              session_id: "ddrd0v20c0d7ri8nhr88pkiav2",
              leixing: 0,
              xianshi_mingcheng: this.mingcheng,
              wenjian_mingcheng:
                user_id +
                "_" +
                user_name +
                "_" +
                this.type +
                "_" +
                jiangxiang +
                timestamp +
                "." +
                fileType,
              houzhui: fileType,
              url: this.imgSrc
            };
            console.log(imgtosev)
            axios
              .post(appurl + "hs2f/baoming/addWenjian",imgtosev)
              .then(resss => {
                this.success = resss.data.has_add;
                console.log(this.success)
              })
              .catch(errrr => {
                  console.log(errrr)
              });
          })
          .catch(err => {
            console.log(err);
          });
      } else {
        this.$Message.error({
          content: "上传文件类型错误，请选择正确的文件上传",
          duration: 3
        });
      }
    }
  }
};
</script>