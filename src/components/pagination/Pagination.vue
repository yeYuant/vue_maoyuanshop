<template>
  <div class="pagination">
    <button @click="$emit('getPageNo', pageNo - 1)" :disabled="pageNo == 1">
      上一页
    </button>
    <button
      v-if="startNumAndendNum.start > 1"
      @click="$emit('getPageNo', 1)"
      :class="{ active: pageNo == 1 }"
    >
      1
    </button>
    <button v-if="startNumAndendNum.start > 2">...</button>
    <button
      v-for="page in startNumAndendNum.end"
      :key="page"
      v-show="page >= startNumAndendNum.start"
      @click="$emit('getPageNo', page)"
      :class="{ active: pageNo == page }"
    >
      {{ page }}
    </button>

    <button v-if="startNumAndendNum.end < totalPage - 1">···</button>
    <button v-if="startNumAndendNum.end < totalPage">{{ totalPage }}</button>
    <button
      @click="$emit('getPageNo', pageNo + 1)"
      :disabled="pageNo == totalPage"
    >
      下一页
    </button>
    <button style="margin-left: 30px">共{{ total }}条数据</button>
  </div>
</template>

<script>
export default {
  name: "Pagination",
  props: ["pageNo", "pageSize", "total", "continues"],
  computed: {
    // 计算出总共有多少页
    totalPage() {
      // 页码数要向上取整
      return Math.ceil(this.total / this.pageSize);
    },
    // 计算出连续页码的起始数字和末尾数字【连续页码的数字：至少是五条】
    startNumAndendNum() {
      // 一种不常用的解构赋值方法，这样做就不用每个值都用const xxx = this.xxx 来获取了
      const { pageNo, totalPage, continues } = this;
      let start = 0,
        end = 0;
      // 注意：页码数至少是五条，则说明一页中最少要有五页：continues（最后一页除外），
      // 如果我们的的总页数total，少于continues（连续页码数），就会出现不正常的现象（连续页码多于总页数），所以我们需要进行判断
      if (continues > totalPage) {
        start = 1;
        end = totalPage;
      } else {
        // 进入这里就说了没有出现连续页码多于总页数的情况
        // 求出连续页码开始的值和最后的值
        start = pageNo - parseInt(continues / 2);
        end = pageNo + parseInt(continues / 2);
        // 到这里还没有解决完bug，
        // 当我们点击了第一页，前面还会出现第0页，-1页的情况,所以需要再次if判断，解决这个bug
        if (start < 1) {
          start = 1;
          end = continues;
        }
        // 当我们点击了第最后一页，后面还会出现页数因为连续五页的限制从而页数超出总页数的情况,所以需要再次if判断，解决这个bug
        if (end > totalPage) {
          end = totalPage;
          start = totalPage - (continues - 1);
        }
      }
      return { start, end };
    },
  },
  methods: {},
};
</script>

<style lang="less" scoped>
.pagination {
  text-align: center;
  button {
    margin: 0 5px;
    background-color: #f4f4f5;
    color: #606266;
    outline: none;
    border-radius: 2px;
    padding: 0 4px;
    vertical-align: top;
    display: inline-block;
    font-size: 13px;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    border: 0;

    &[disabled] {
      color: #c0c4cc;
      cursor: not-allowed;
    }

    &.active {
      cursor: not-allowed;
      background-color: #409eff;
      color: #fff;
    }
  }
  .active {
    background-color: skyblue;
  }
}
</style>
