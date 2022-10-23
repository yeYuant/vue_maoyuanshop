<template>
  <div>
    <!-- 三级联动组件已经注册为全局组件，因此不用再次引入 -->
    <Type-Nav />
    <ListContainer />
    <TodayRecommend />
    <Rank />
    <Like />
    <Floor v-for="floor in floorList" :key="floor.id" :list="floor" />
    <Brand />
  </div>
</template>

<script>
import { mapState } from "vuex";
import ListContainer from "@/views/home/list-container/ListContainer.vue";
import TodayRecommend from "@/views/home/today-recommend/TodayRecommend.vue";
import Rank from "@/views/home/rank/Rank.vue";
import Floor from "@/views/home/floor/Floor.vue";
import Like from "@/views/home/like/Like.vue";
import Brand from "@/views/home/brand/Brand.vue";
export default {
  name: "Home",
  components: { ListContainer, TodayRecommend, Rank, Floor, Like, Brand },
  mounted() {
    // 派发action 获取floor组件数据
    this.$store.dispatch("getFloorList");
    this.$store.dispatch("getUserInfo");
  },
  computed: {
    ...mapState({
      floorList: (state) => state.home.floorList,
    }),
  },
};
</script>

<style>
</style>