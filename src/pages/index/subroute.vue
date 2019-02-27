<template>
    <section style="margin-left: 20px;margin-top: 20px;">
        <div class='router_frame'>
          <ul v-for='val in listData'>
            <router-link :to='{path:val.path}' tag='li'>
                  <span>{{val.label}}</span>
            </router-link>
          </ul>
       </div>
        <div style="width: 300px;height: 200px;border: 1px solid green;">
          <router-view></router-view>
        </div> 
    </section>
</template>

<script>
    export default {
        name: "one",
      data(){
          return{
              listData:[
                {
                  label: '首页',
                  path: '/subroute/nail',
                },
                {
                  label: '会员中心',
                  path: '/subroute/other',
                }
              ],
          }
      },
      methods:{

      }

    }
</script>

<style scoped>
.router_frame{height: 50px;}
.router_frame li{
  width: 100px;
  height: 40px;
  float: left;
  background: yellow;
  font-size: 20px;
  margin-left: 10px;
  text-align: center;
  line-height: 40px;
}
</style>
