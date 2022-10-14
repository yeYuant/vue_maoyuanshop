<template>
  <div class="swiper-container" ref="cur">
    <div class="swiper-wrapper">
      <!-- slide 幻灯片（轮播图） -->
      <div
        class="swiper-slide"
        v-for="(slide, index) in skuImageList"
        :key="slide.id"
      >
        <img
          :src="slide.imgUrl"
          :class="{ active: index == currentIndex }"
          @click="changeCurrentIndex(index)"
        />
      </div>
    </div>
    <div class="swiper-button-next"></div>
    <div class="swiper-button-prev"></div>
  </div>
</template>


<script>
import Swiper from "swiper";
export default {
  name: "ImageList",
  props: ["skuImageList"],
  data() {
    return {
      currentIndex: 0,
    };
  },
  watch: {
    skuImageList: {
      // immediate: 不管数据有没有发生变化，都历立即调用一次
      immediate: true,
      handler() {
        // 我们这里使用 : this.$nextTick 在下次 DOM 更新循环结束之后执行延迟回调。在修改数据之后立即使用这个方法，获取更新后的 DOM
        // this.$nextTick 在下次 DOM 更新循环结束之后执行延迟回调。在修改数据之后立即使用这个方法，获取更新后的 DOM
        // 这里为什么不需要在watch中监听？ 因为list是从父组件传过来的，已经在这之前数据就已经存在了，建构已经存在，不需要监听
        this.$nextTick(() => {
          new Swiper(this.$refs.cur, {
            // 如果需要前进后退按钮
            navigation: {
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            },
            // 每页显示的图片个数
            slidesPerView: 5,

            // 切换轮播图时，每次切走的图片个数(默认就是1)
            slidesPerGroup: 1,
          });
        });
      },
    },
  },
  methods: {
    // 点击按钮，切换小轮播图的高亮效果
    changeCurrentIndex(index) {
      this.currentIndex = index;
      // 全局事件总线，将当前图片的索引值传递给兄弟组件
      this.$bus.$emit("getIndex", this.currentIndex);
    },
  },
};
</script>

<style lang="less" scoped>
.swiper-container {
  height: 56px;
  width: 412px;
  box-sizing: border-box;
  padding: 0 12px;

  .swiper-slide {
    width: 56px;
    height: 56px;

    img {
      width: 100%;
      height: 100%;
      border: 1px solid #ccc;
      padding: 2px;
      width: 50px;
      height: 50px;
      display: block;
      cursor: pointer;

      &.active {
        border: 2px solid #f60;
        padding: 1px;
      }
    }
  }

  .swiper-button-next {
    left: auto;
    right: 0;
  }

  .swiper-button-prev {
    left: 0;
    right: auto;
  }

  .swiper-button-next,
  .swiper-button-prev {
    box-sizing: border-box;
    width: 12px;
    height: 56px;
    background: rgb(235, 235, 235);
    border: 1px solid rgb(204, 204, 204);
    top: 0;
    margin-top: 0;
    &::after {
      font-size: 12px;
    }
  }
}
</style>