<template>
    <section>
        <Button type="success">要避免刷新问题</Button>
    </section>    
</template>

<script>
export default {
    data(){
        return{

        }
    },
    activated(){
        console.log('route++params',this.$route.params);
        //使用
        console.log(this.$route.params.id);
    },
    methods: {

    }
}
</script>

<style>

</style>
