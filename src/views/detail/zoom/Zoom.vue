<template>
  <div class="spec-preview">
    <img :src="skuImageObj.imgUrl" />
    <div class="event" @mousemove="handler"></div>
    <div class="big">
      <img :src="skuImageObj.imgUrl" ref="big" />
    </div>
    <div class="mask" ref="mask"></div>
  </div>
</template>

<script>
export default {
  name: "Zoom",
  // props: {
  //   skuImageList: {
  //     type: Array,
  //     default: () => [],
  //   },
  // },
  props: ["skuImageList"],
  data() {
    return {
      // 定义一个轮播图图片的 索引值
      currentIndex: 0,
    };
  },
  mounted() {
    // 全局事件总线，接收兄弟组件传递过来的索引值
    this.$bus.$on("getIndex", (index) => {
      this.currentIndex = index;
    });
  },
  computed: {
    skuImageObj() {
      return this.skuImageList[this.currentIndex] || {};
    },
  },
  methods: {
    handler(event) {
      let big = this.$refs.big;
      let mask = this.$refs.mask;
      let left = event.offsetX - mask.offsetWidth / 2;
      let top = event.offsetY - mask.offsetHeight / 2;

      // 限定遮罩层的边界值范围
      if (left <= 0) left = 0;
      if (left >= mask.offsetWidth) left = mask.offsetWidth;
      if (top <= 0) top = 0;
      if (top >= mask.offsetHeight) top = mask.offsetHeight;

      mask.style.left = left + "px";
      mask.style.top = top + "px";
      // 给大图设置位移值 （注意：大图的比例应设为小图的两倍）
      big.style.left = -2 * left + "px";
      big.style.top = -2 * top + "px";
    },
  },
};
</script>

<style lang="less">
.spec-preview {
  position: relative;
  width: 400px;
  height: 400px;
  border: 1px solid #ccc;

  img {
    width: 100%;
    height: 100%;
  }

  .event {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 998;
  }

  .mask {
    width: 50%;
    height: 50%;
    background-color: rgba(0, 255, 0, 0.3);
    position: absolute;
    left: 0;
    top: 0;
    display: none;
  }

  .big {
    width: 130%;
    height: 130%;
    position: absolute;
    top: -1px;
    left: 100%;
    margin-left: 7px;
    border: 1px solid #aaa;
    overflow: hidden;
    z-index: 998;
    display: none;
    background: white;

    img {
      width: 200%;
      max-width: 200%;
      height: 180%;
      position: absolute;
      left: 0;
      top: 0;
    }
  }

  .event:hover ~ .mask,
  .event:hover ~ .big {
    display: block;
  }
}
</style>