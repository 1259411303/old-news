<template>
  <section>
    <!-- 引入组件方式一 -->
    <c-title :datas="equipment[0].data"></c-title>
    <s-main :datas="equipment[1].data"></s-main>
    <!-- 引入组件方式二 -->
    <div v-for="item in equipment">
          <component :is="item.reply" :datas="item.data">
          </component>
    </div>
  </section>
</template>

<script>
import cTitle from "./components/title.vue";
import sMain from "./components/main.vue";
export default{
  components: {cTitle,sMain},
  data(){
    return{
        equipment: [
          {reply: 'cTitle',data: {count: 30}},
          {reply: 'sMain',data: [{id: 1,title: '荔枝',thumb: '',price: 1100,stock: 1000,virtual_sales: 200},{id: 2,title: '芒果',thumb: '',price: 1200,stock: 1000,virtual_sales: 500}]},
        ]
    }
  },
}
</script>

<style scoped>

</style>
