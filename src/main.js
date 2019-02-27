import Vue from 'vue'
import App from './App'
//引入路由功能
import VueRouter from 'vue-router'
Vue.use(VueRouter);

//引入iview组件(不支持移动端)
import iView from 'iview'
import 'iview/dist/styles/iview.css'
Vue.use(iView);
//引入element-ui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);
//使用mint-ui
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
Vue.use(MintUI);
//引入ydui
import YDUI from 'vue-ydui';
import 'vue-ydui/dist/ydui.rem.css';
Vue.use(YDUI);

//引入vue-resource得不能用$http
//vue模拟本地数据接口
import VueResource from 'vue-resource'
Vue.use(VueResource)

//用vue axios
import axios from 'axios';
//vue发送post请求时如何携带cookie
//https://blog.csdn.net/liuxin_1991/article/details/81531321?utm_source=blogxgwz1
axios.defaults.withCredentials=true;//让ajax携带cookie,就这一行代码就ok了
Vue.prototype.$axios = axios;


//引入muse-ui组件
import MuseUI from 'muse-ui'
import 'muse-ui/dist/muse-ui.css'
Vue.use(MuseUI)


//vue的原型
//公用调用式：赋值原型给vue,就能用$toast.state.hobby的数据读取用法
import Toast from './vuex/store.js'
Vue.prototype.$store =Toast

Vue.prototype.$teacher = function(){
  return 'vue原型简单方法';
}
//公用方法
import fancy from './common/index.js';
Vue.prototype.$fancy = fancy;
import regular from './common/regular';
Vue.prototype.$regular = regular;

//  这里建路由，一般不这么做
//创建router实例
// let router = new VueRouter({
//   mode: 'history',
//   routes: [
//     ]
// });


// 使用vue-cookies
import VueCookies from 'vue-cookies'
Vue.use(VueCookies)



// vue-router中使用router.beforeEach来判断用户的是否登录再决定跳转到登录页面
//在vue项目中使用Nprogress.js进度条
//希望每次页面载入的时候，浏览器顶部有载入动画
//https://blog.csdn.net/qq_35844177/article/details/70171054
import router from './router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
router.beforeEach((to, from, next) => {
  if (to.path == '/login') {
      sessionStorage.removeItem('token');
    }
  let user = sessionStorage.getItem('token');
  if (!user && to.path != '/login') {
      next({path: '/login'})
    } else {
      NProgress.start();
      next()
    }
}); 
router.afterEach(transition => {
  NProgress.done();
});



//阻止启动生产消息
//https://blog.csdn.net/losedguest/article/details/86569293
//为true时控制台多一行See more tips
Vue.config.productionTip = false

//创建和挂载根实例。
//new一个vue实例,挂载在index文件的id
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<app/>'
})
