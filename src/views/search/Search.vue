<template>
  <div>
    <!-- 商品分类三级列表 -->
    <TypeNav />

    <div class="main">
      <div class="py-container">
        <!--bread：面包屑-->
        <div class="bread">
          <ul class="fl sui-breadcrumb">
            <li>
              <a href="#">全部结果</a>
            </li>
          </ul>
          <ul class="fl sui-tag">
            <!-- 商品分类的面包屑 -->
            <li class="with-x" v-show="searchParams.categoryName">
              {{ searchParams.categoryName
              }}<i @click="removeCategoryName">x</i>
            </li>
            <!-- 关键字的面包屑 -->
            <li class="with-x" v-show="searchParams.keyword">
              {{ searchParams.keyword }}<i @click="removeKeyword">x</i>
            </li>
            <!-- 品牌的面包屑 -->
            <li class="with-x" v-if="searchParams.trademark">
              {{ searchParams.trademark.split(":")[1]
              }}<i @click="removeTradeMark">x</i>
            </li>
            <!-- 平台售卖商品的属性（参数）的面包屑 -->
            <li
              class="with-x"
              v-for="(attrValue, index) in searchParams.props"
              :key="index"
            >
              {{ attrValue.split(":")[1] }}<i @click="removeAttr(index)">x</i>
            </li>
          </ul>
        </div>

        <!--selector-->
        <SearchSelector @trademarkInfo="trademarkInfo" @attrInfo="attrInfo" />

        <!--details-->
        <div class="details clearfix">
          <div class="sui-navbar">
            <div class="navbar-inner filter">
              <ul class="sui-nav">
                <!-- 排序解构 -->
                <li :class="{ active: isOne }" @click="changeOrder('1')">
                  <a
                    >综合<span
                      class="iconfont"
                      :class="{
                        'icon-Upxiangshang1': isAsc,
                        'icon-Downxiangxia1': isDesc,
                      }"
                      v-show="isOne"
                    ></span
                  ></a>
                </li>
                <li :class="{ active: isTwo }" @click="changeOrder('2')">
                  <a
                    >价格<span
                      class="iconfont"
                      :class="{
                        'icon-Upxiangshang1': isAsc,
                        'icon-Downxiangxia1': isDesc,
                      }"
                      v-show="isTwo"
                    ></span
                  ></a>
                </li>
              </ul>
            </div>
          </div>
          <!-- 销售产品列表 -->
          <div class="goods-list">
            <ul class="yui3-g">
              <li class="yui3-u-1-5" v-for="good in goodsList" :key="good.id">
                <div class="list-wrap">
                  <div class="p-img">
                    <router-link :to="`/detail/${good.id}`">
                      <img :src="good.defaultImg" />
                    </router-link>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥ </em>
                      <i>{{ good.price }}.00</i>
                    </strong>
                  </div>
                  <div class="attr">
                    <a
                      title="促销信息,下单即赠送三个月CIBN视频会员卡!【小米电视新品4A 58 火爆预约中】"
                    >
                      {{ good.title }}
                    </a>
                  </div>
                  <div class="commit">
                    <i class="command">已有<span>2000</span>人评价</i>
                  </div>
                  <div class="operate">
                    <a class="sui-btn btn-bordered btn-danger">加入购物车</a>
                    <a class="sui-btn btn-bordered">收藏</a>
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <!-- 分页器 模拟页码数据-->
          <Pagination
            :pageNo="searchParams.pageNo"
            :pageSize="searchParams.pageSize"
            :total="total"
            :continues="5"
            @getPageNo="getPageNo"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import SearchSelector from "./search-selector/SearchSelector";
export default {
  name: "Search",
  components: { SearchSelector },
  data() {
    return {
      // 带给服务器的数据
      searchParams: {
        // 一级分类id
        category1Id: "",
        // 二级分类id
        category2Id: "",
        // 三级分类id
        category3Id: "",
        // 分类的名称
        categoryName: "",
        // 搜索框输入的关键字
        keyword: "",
        // 排序  默认为：综合|降序
        order: "1:desc",
        // 当前所在的页数
        pageNo: 1,
        // 每页显示的数据条数
        pageSize: 3,
        // 平台售卖属性操作所带的参数
        props: [],
        // 品牌
        trademark: "",
      },
    };
  },
  beforeMount() {
    // Object.assign: ES6 新增的语法，合并对象
    Object.assign(this.searchParams, this.$route.query, this.$route.params);
  },
  mounted() {
    this.getSearchData();
  },
  methods: {
    getSearchData() {
      return this.$store.dispatch("getSearchList", this.searchParams);
    },
    // 点击按钮移除分类名称
    removeCategoryName() {
      // 将searchParma的分类名称置空
      // 如果是属性值为空的字符串，还是会把相应的字段带给服务器
      // 但是我们把相应的字段改为undefined，当前这个字段就不会带给服务器
      this.searchParams.categoryName = undefined;
      this.searchParams.category1Id = undefined;
      this.searchParams.category2Id = undefined;
      this.searchParams.category3Id = undefined;
      this.getSearchData();
      // 地址栏也需要改变，进行路由跳转（现在的路由跳转只是跳转到自己这里）
      // 严谨：呢么已是删除query，如果路径当中出现params则不应该删除，路由跳转的时候应该带着
      if (this.$route.params) {
        this.$router.push({ name: "search", params: this.$route.params });
      }
    },
    // 点击按钮移除关键字
    removeKeyword() {
      this.searchParams.keyword = undefined;
      this.getSearchData();
      // 全局事件总线
      this.$bus.$emit("clear");

      if (this.$route.query) {
        this.$router.push({ name: "search", query: this.$route.query });
      }
    },
    // 点击按钮移除品牌名称
    removeTradeMark() {
      this.searchParams.trademark = undefined;
      this.getSearchData();
    },
    // 点击按钮移除平台商品的属性（分类）值
    removeAttr(index) {
      // 点击按钮，可以移除相应位置(索引)的商品参数  splice：(规定添加/删除项目的位置，要删除的项目数量)
      this.searchParams.props.splice(index, 1);
      // 参数改变，再次发起请求
      this.getSearchData();
    },
    // 自定义事件的回调
    trademarkInfo(trademark) {
      // 整理品牌字段的参数："ID:品牌名称"
      this.searchParams.trademark = `${trademark.tmId}:${trademark.tmName}`;
      // 再次发请求获取search模块列表数据进行刷新展示
      this.getSearchData();
    },
    // 品牌数据的回调（自定义事件）
    attrInfo(attr, attrValue) {
      // ["属性ID:属性值:属性名"]
      let props = `${attr.attrId}:${attrValue}:${attr.attrName}`;
      // 我们在将元素push到数组之前需要进行数组去重
      // 数组的 indexOf方法：查找所在项在数组中首次出现的位置，在没找到的情况下返回-1
      // 我们可以利用 indexOf是否 = -1 来判断一个数组中是否存在一个值
      // 如果没有值，我们再进行push，进而刷新页面获取全新的数据
      if (this.searchParams.props.indexOf(props) == -1) {
        this.searchParams.props.push(props);
        this.getSearchData();
      }
    },
    // 点击按钮实现排序
    changeOrder(flag) {
      // 获取order当前状态的值 "1:desc"
      let originFlag = this.searchParams.order.split(":")[0];
      let originSort = this.searchParams.order.split(":")[1];
      let newOrder = "";
      // flag 用于判断当前点击的是综合（1）还是价格（2）,是用户传进来的值
      // 如果flag == originFlag，说明取到的值是data里面我们默认设置的order，就是处于综合
      // 所以目前点击的是综合
      // 判断多次点击的是不是同一个li
      if (flag == originFlag) {
        newOrder = `${originFlag}:${originSort == "desc" ? "asc" : "desc"}`;
        console.log(this.searchParams.order);
      } else {
        // 进入else判断，则点击的不是与上一个相同的li
        // 点击的是价格，默认是降序
        // 当flag = 2，从上面的判断中跳出进入下面这里的语句，
        // data中的searchParams的order的值就从综合变成了价格，又会重新执行这个if判断，
        // 从这里开始，searchParams中的order的值就变成了"2:desc"了
        newOrder = `${flag}:${"desc"}`;
      }
      // 将新的order赋值给searchParams.order
      this.searchParams.order = newOrder;
      // 重新发起请求
      this.getSearchData();
    },
    // 获取当前点击的页码的index，进行点击和切换的操作
    getPageNo(pageNo) {
      // 将子组件Pagination传过来的页码值赋值给data中的searchParams中的  pageNo, 实现动态页码
      this.searchParams.pageNo = pageNo;
      // 获取动态页码，重新刷新页面获取新的数据
      this.getSearchData();
    },
  },
  computed: {
    // mapGetters的写法，里面的数据传递的是数组
    ...mapGetters(["goodsList"]),
    // 获取总的页码数|| 真实的页码数需要到仓库store中拿取
    ...mapState({
      total: (state) => state.search.searchList.total,
    }),
    // 计算商品排序是否等于1
    isOne() {
      // return this.searchParams.order.slice(0, 1) == "1";
      // return this.searchParams.order.indexOf("1") != -1;
      return this.searchParams.order.includes("1");
    },
    isTwo() {
      // return this.searchParams.order.slice(0, 1) == "2";
      // return this.searchParams.order.indexOf("2") != -1;
      return this.searchParams.order.includes("2");
    },
    // 判断是升序还是降序
    isAsc() {
      return this.searchParams.order.indexOf("asc") != -1;
    },
    isDesc() {
      return this.searchParams.order.indexOf("desc") != -1;
    },
  },
  watch: {
    // 数据监听：监听组件实例身上的属性的属性值变化

    // 监听路由的信息是否发生变化，如果发生变化，则再次发起请求
    $route(newValue, oldVlaue) {
      // 再次发请求之前整理带给服务器的参数
      Object.assign(this.searchParams, this.$route.query, this.$route.params);
      // 再次发起ajax请求
      this.getSearchData();
      // 分类名字与关键字不用清理，因为每一次路由发生变化的时候，都会给它们赋予新的值
      this.searchParams.category1Id = undefined;
      this.searchParams.category2Id = undefined;
      this.searchParams.category3Id = undefined;
    },
  },
};
</script>

<style scoped lang="less">
.main {
  margin: 10px 0;

  .py-container {
    width: 1200px;
    margin: 0 auto;

    .bread {
      margin-bottom: 5px;
      overflow: hidden;

      .sui-breadcrumb {
        padding: 3px 15px;
        margin: 0;
        font-weight: 400;
        border-radius: 3px;
        float: left;

        li {
          display: inline-block;
          line-height: 18px;

          a {
            color: #666;
            text-decoration: none;

            &:hover {
              color: #4cb9fc;
            }
          }
        }
      }

      .sui-tag {
        margin-top: -5px;
        list-style: none;
        font-size: 0;
        line-height: 0;
        padding: 5px 0 0;
        margin-bottom: 18px;
        float: left;

        .with-x {
          font-size: 12px;
          margin: 0 5px 5px 0;
          display: inline-block;
          overflow: hidden;
          color: #000;
          background: #f7f7f7;
          padding: 0 7px;
          height: 20px;
          line-height: 20px;
          border: 1px solid #dedede;
          white-space: nowrap;
          transition: color 400ms;
          cursor: pointer;

          i {
            margin-left: 10px;
            cursor: pointer;
            font: 400 14px tahoma;
            display: inline-block;
            height: 100%;
            vertical-align: middle;
          }

          &:hover {
            color: #28a3ef;
          }
        }
      }
    }

    .details {
      margin-bottom: 5px;

      .sui-navbar {
        overflow: visible;
        margin-bottom: 0;

        .filter {
          min-height: 40px;
          padding-right: 20px;
          background: #fbfbfb;
          border: 1px solid #e2e2e2;
          padding-left: 0;
          border-radius: 0;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);

          .sui-nav {
            position: relative;
            left: 0;
            display: block;
            float: left;
            margin: 0 10px 0 0;

            li {
              float: left;
              line-height: 18px;

              a {
                display: block;
                cursor: pointer;
                padding: 11px 15px;
                color: #777;
                text-decoration: none;
              }

              &.active {
                a {
                  background: #e1251b;
                  color: #fff;
                }
              }
            }
          }
        }
      }

      .goods-list {
        margin: 20px 0;

        ul {
          display: flex;
          flex-wrap: wrap;

          li {
            height: 100%;
            width: 20%;
            margin-top: 10px;
            line-height: 28px;

            .list-wrap {
              .p-img {
                padding-left: 15px;
                width: 215px;
                height: 255px;

                a {
                  color: #666;

                  img {
                    max-width: 100%;
                    height: auto;
                    vertical-align: middle;
                  }
                }
              }

              .price {
                padding-left: 15px;
                font-size: 18px;
                color: #c81623;

                strong {
                  font-weight: 700;

                  i {
                    margin-left: -5px;
                  }
                }
              }

              .attr {
                padding-left: 15px;
                width: 85%;
                overflow: hidden;
                margin-bottom: 8px;
                min-height: 38px;
                cursor: pointer;
                line-height: 1.8;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;

                a {
                  color: #333;
                  text-decoration: none;
                }
              }

              .commit {
                padding-left: 15px;
                height: 22px;
                font-size: 13px;
                color: #a7a7a7;

                span {
                  font-weight: 700;
                  color: #646fb0;
                }
              }

              .operate {
                padding: 12px 15px;

                .sui-btn {
                  display: inline-block;
                  padding: 2px 14px;
                  box-sizing: border-box;
                  margin-bottom: 0;
                  font-size: 12px;
                  line-height: 18px;
                  text-align: center;
                  vertical-align: middle;
                  cursor: pointer;
                  border-radius: 0;
                  background-color: transparent;
                  margin-right: 15px;
                }

                .btn-bordered {
                  min-width: 85px;
                  background-color: transparent;
                  border: 1px solid #8c8c8c;
                  color: #8c8c8c;

                  &:hover {
                    border: 1px solid #666;
                    color: #fff !important;
                    background-color: #666;
                    text-decoration: none;
                  }
                }

                .btn-danger {
                  border: 1px solid #e1251b;
                  color: #e1251b;

                  &:hover {
                    border: 1px solid #e1251b;
                    background-color: #e1251b;
                    color: white !important;
                    text-decoration: none;
                  }
                }
              }
            }
          }
        }
      }
      .select_pageno {
        background: #000;
      }
    }
  }
}
</style>