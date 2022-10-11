<template>
  <div id="app">
    <Header></Header>
    <!-- 路由出口占位符 -->
    <router-view></router-view>
    <Footer v-show="$route.meta.show"></Footer>
  </div>
</template>

<script>
import Header from "./components/Header/Header.vue";
import Footer from "./components/Footer/Footer.vue";

export default {
  name: "App",
  components: {
    Header,
    Footer,
  },
  mounted() {
    // 派发一个action，获取三级分类列表的数据
    this.$store.dispatch("getCategoryList");
  },
};
</script>

<style>
</style>
