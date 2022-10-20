<template>
  <div class="type-nav">
    <div class="container">
      <!-- 事件委托 -->
      <div @mouseleave="clearBgColor" @mouseenter="enterShow">
        <h2 class="all">全部商品分类</h2>
        <transition name="sort">
          <div class="sort" v-show="show">
            <!-- 三级联动菜单 -->
            <!-- 利用事件委托，跳转路由到search 组件 -->
            <div class="all-sort-list2" @click="goSearch">
              <div
                class="item"
                v-for="(c1, index) in categoryList"
                :key="c1.categoryId"
              >
                <h3
                  :class="{ cur: currentIndex == index }"
                  @mouseenter="changeBgColor(index)"
                >
                  <a
                    :data-categoryName="c1.categoryName"
                    :data-category1Id="c1.categoryId"
                    >{{ c1.categoryName }}</a
                  >
                </h3>
                <!-- 二级、三级菜单 -->
                <!-- 使用js控制二级、三级菜单的显示与隐藏 -->
                <div
                  class="item-list clearfix"
                  :style="{ display: currentIndex == index ? 'block' : 'none' }"
                >
                  <div
                    class="subitem"
                    v-for="c2 in c1.categoryChild"
                    :key="c2.categoryId"
                  >
                    <dl class="fore">
                      <dt>
                        <a
                          :data-categoryName="c2.categoryName"
                          :data-category2Id="c2.categoryId"
                          >{{ c2.categoryName }}</a
                        >
                      </dt>
                      <dd>
                        <em v-for="c3 in c2.categoryChild" :key="c3.categoryId">
                          <a
                            :data-categoryName="c3.categoryName"
                            :data-category3Id="c3.categoryId"
                            >{{ c3.categoryName }}</a
                          >
                        </em>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </transition>
      </div>
      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">猫原汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import throttle from "lodash/throttle.js";
export default {
  name: "TypeNav",
  // 组件挂载完毕，可以想服务器发送请求
  mounted() {
    if (this.$route.path != "/home") {
      this.show = false;
    }
  },
  data() {
    return {
      // 控制鼠标移入时，确定哪一个一级分类菜单处于被选中状态
      currentIndex: -1,
      // 控制TypeNav组件的显示与隐藏
      show: true,
    };
  },
  methods: {
    // 鼠标移入一级分类菜单，将index 赋值给 currentIndex，实现添加class
    // changeBgColor(index) {
    // index：鼠标移上某一个一级分类的元素的索引值
    // 正常情况下（用户缓慢操作）：鼠标进入每一个一级分类，都会触发鼠标进入事件
    // 非正常情况（用户操作很快）:本身全部的一级分类都应该触发鼠标进入事件，但是经过测试，只有部分一级分类触发了
    // 就是由于用户行为过快，导致浏览器反应不过来，如果当前回调函数中有一些大量业务，有可能会出现卡顿现象
    // return (this.currentIndex = index);
    // }

    // throttle 是lodash 里配置好的 节流函数
    // throttle节流函数，尽量别使用箭头函数，可能会出现上下文this指向问题  因此我们使用传统函数
    changeBgColor: throttle(function (index) {
      this.currentIndex = index;
    }, 70),
    // 鼠标移出事件
    clearBgColor() {
      // 鼠标移出，将三级联动菜单的移入背景色效果取消
      this.currentIndex = -1;
      // 鼠标移出，隐藏三级联动菜单
      if (this.$route.path != "/home") {
        this.show = false;
      }
    },
    // 鼠标移入显示三级联动菜单
    enterShow() {
      this.show = true;
    },
    // 进行路由跳转的方法
    goSearch(event) {
      // 最好的解决方案：编程式导航+时间委派
      // 存在一些问题事件委派，是把全部的子节点【h3，a，dl，dt】都传递给父节点
      // 点击a标签的时候，才会进行路由的跳转（我们怎么才能确定点击的一定是a标签呢？）
      // 存在另一个问题，即使你能确定点击的是a标签，但你怎么区分是一级分类、二级分类、三级分类的标签呢？

      // 第一个问题：把子节点当中的a标签，添加上自定义属性：data-crtagoryName，原来区分a标签和其它的标签
      let element = event.target;
      // 获取到当前发出这个事件的结点【h3，a，dl，dt】，带有data-creagoryName的一定是a标签
      // 节点有一个dataset属性，可以获取自定义属性名和属性值
      const { categoryname, category1id, category2id, category3id } =
        element.dataset;
      // 如果标签身上拥有categoryname，一定是a标签
      if (categoryname) {
        let location = { name: "search" };
        let query = { categoryName: categoryname };
        // 一级分类、二级分类、三级分类
        if (category1id) {
          query.category1Id = category1id;
          // 一定是二级分类
        } else if (category2id) {
          query.category2Id = category2id;
          // 一定是三级分类
        } else if (category3id) {
          query.category3Id = category3id;
        }
        if (this.$route.params) {
          // 整理完整
          location.query = query;
          location.params = this.$route.params;
          this.$router.push(location);
        }
      }
    },
  },
  computed: {
    ...mapState({
      // 右侧需要的是一个函数（c下方的ategoryList），当使用这个计算属性的时候，右侧的函数（categoryList）会立即执行一次（自动调用）
      // 自动往此组件TypeNav中注入一个参数state，其值为大仓库中的数据
      categoryList: (state) => state.home.categoryList.slice(0, 16),
    }),
    // ...mapState("home", ["categoryList"]),
  },
};
</script>

<style scoped lang="less">
.type-nav {
  border-bottom: 2px solid #e1251b;
  a {
    cursor: pointer;
  }
  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      position: absolute;
      background: #fafafa;
      z-index: 999;

      .all-sort-list2 {
        .item {
          h3 {
            line-height: 29px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              color: #333;
            }
          }
          .cur {
            background: skyblue;
          }

          .item-list {
            display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }
        }
      }
    }
    .sort-enter {
      height: 0;
    }
    .sort-enter-to {
      height: 461px;
    }
    .sort-enter-active {
      transition: all 0.2s linear;
    }
  }
}
</style>