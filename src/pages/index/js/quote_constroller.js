import goodsList from '../echarts.vue';
export default{
    components: {goodsList},
    data(){
        return{
            loading: ['主页','事项','活动'],
            flower: false,
        }
    },
    //路由挂在
    activated() {
        this.init();
    },
    methods: {
        init(){
            console.log('引入');
        }
    }
}