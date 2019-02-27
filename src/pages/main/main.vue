<template>
    <section>
        main
    </section>
</template>

<script>
export default {
    data(){
        return{

        }
    },
    //创建前，跳回登陆界面
    mounted(){
        this.$router.push({name:'Login',params:{id: 'grame'}});
    },
}
</script>

<style>

</style>
