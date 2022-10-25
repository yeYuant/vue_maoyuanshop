<template>
  <div class="cart">
    <h4>全部商品</h4>
    <div class="cart-main">
      <div class="cart-th">
        <div class="cart-th1">全部</div>
        <div class="cart-th2">商品</div>
        <div class="cart-th3">单价(元)</div>
        <div class="cart-th4">数量</div>
        <div class="cart-th5">小计(元)</div>
        <div class="cart-th6">操作</div>
      </div>
      <div class="cart-body">
        <ul class="cart-list" v-for="cart in cartList" :key="cart.id">
          <li class="cart-list-con1">
            <input
              type="checkbox"
              name="chk_list"
              :checked="cart.isChecked == 1"
              @change="updateChecked(cart, $event)"
            />
          </li>
          <li class="cart-list-con2">
            <img :src="cart.imgUrl" />
            <div class="item-msg">
              {{ cart.skuName }}
            </div>
          </li>
          <li class="cart-list-con4">
            <span class="price">{{ cart.skuPrice }}.00</span>
          </li>
          <li class="cart-list-con5">
            <a
              href="javascript:void(0)"
              class="mins"
              @click="handler('minus', -1, cart)"
              >-</a
            >
            <input
              autocomplete="off"
              type="text"
              minnum="1"
              class="itxt"
              :value="cart.skuNum"
              @change="handler('change', $event.target.value * 1, cart)"
            />
            <a
              href="javascript:void(0)"
              class="plus"
              @click="handler('add', 1, cart)"
              >+</a
            >
          </li>
          <li class="cart-list-con6">
            <span class="sum">{{ cart.skuPrice * cart.skuNum }}</span>
          </li>
          <li class="cart-list-con7">
            <a href="#none" class="sindelet" @click="deleteCartById(cart)"
              >删除</a
            >
            <br />
            <a href="#none">移到收藏</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="cart-tool">
      <div class="select-all">
        <input
          class="chooseAll"
          type="checkbox"
          :checked="isAllChecked && cartList.length > 0"
          @change="changeAllChecked"
        />
        <span> 全选</span>
      </div>
      <div class="option">
        <a href="#none" @click="deleteCheckCart">删除选中的商品</a>
        <a href="#none">移到我的关注</a>
        <a href="#none">清除下柜商品</a>
      </div>
      <div class="money-box">
        <div class="chosed">已选择 <span>0</span>件商品</div>
        <div class="sumprice">
          <em>总价(不含运费) : </em>
          <i class="summoney">{{ totalPrice }}</i>
        </div>
        <div class="sumbtn">
          <router-link class="sum-btn" to="/trade">结算</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import throttle from "lodash/throttle.js";
import { mapGetters } from "vuex";
export default {
  name: "ShopCart",
  data() {
    return {
      skuNum: 1,
    };
  },
  mounted() {
    this.getCartDate();
  },
  methods: {
    // 得到个人的购物车数据
    getCartDate() {
      this.$store.dispatch("getShopCartList");
    },
    // 修改某一个产品的个数[节流]
    // throttle 是lodash 里配置好的 节流函数
    // throttle节流函数，尽量别使用箭头函数，可能会出现上下文this指向问题  因此我们使用传统函数
    handler: throttle(async function (type, disNum, cart) {
      // 判断点击的是哪一个按钮 （减少商品还是增加）
      switch (type) {
        case "add":
          disNum = 1;
          break;
        case "minus":
          //判断产品的个数大于1，才可以传递给服务器-1
          //如果出现产品的个数小于等于1，传递给服务器个数0（商品数量原封不动）
          disNum = cart.skuNum > 1 ? -1 : 0;
          break;
        case "change":
          // 如果输入的商品数量是非法值（汉子或者负数、小数） 则不将改变后的值给商品，依旧是原数据
          if (isNaN(disNum) || disNum < 1) {
            disNum = 0;
          } else {
            // 如果输入的商品数量是正常范围内的值，则将其与原来商品的数量进行相加减
            // 带给服务器变化的量 用户输入进来的 - 产品的起始个数
            disNum = parseInt(disNum) - cart.skuNum;
          }
          break;
      }
      try {
        await this.$store.dispatch("AddOrUpDateShopcart", {
          skuId: cart.skuId,
          skuNum: disNum,
        });
        this.getCartDate();
      } catch (error) {}
    }, 700),
    // 点击按钮，删除当前选中的商品
    async deleteCartById(cart) {
      try {
        await this.$store.dispatch("deleteShopCartById", cart.skuId);
        this.getCartDate();
      } catch (error) {
        alert(error.message);
      }
    },
    // 点击按钮，更新商品的选中状态
    async updateChecked(cart, event) {
      //如果修改数据成功，再次获取服务器数据（购物车）
      let isChecked = parseInt(event.target.checked ? "1" : "0");
      try {
        await this.$store.dispatch("updateChecked", {
          skuId: cart.skuId,
          isChecked,
        });
        this.getCartDate();
      } catch (error) {
        alert(error.message);
      }
    },
    // 点击按钮，删除选中的商品
    deleteCheckCart() {
      this.$store.dispatch("deleteAllCheckedCart");
      // 再次刷新数据
      this.getCartDate();
    },
    // 更改全选按钮状态
    async changeAllChecked(event) {
      try {
        let isChecked = event.target.checked ? 1 : 0;
        await this.$store.dispatch("updateAllChecked", isChecked);
        // 再次发起请求
        this.getCartDate();
      } catch (error) {
        alert(error.message);
      }
    },
  },
  computed: {
    ...mapGetters(["shopCartList"]),
    // 购物车数据
    cartList() {
      return this.shopCartList.cartInfoList || [];
    },
    // 计算出购物车的商品总价
    totalPrice() {
      let sum = 0;
      this.cartList.forEach((item) => {
        sum += item.skuNum * item.skuPrice;
      });
      return sum;
    },

    // 全选按钮是否全选
    isAllChecked() {
      //遍历数组里面原理，只要全部元素isChecked属性都为1===>真 true
      //只要有一个不是1======>假false
      return this.cartList.every((item) => item.isChecked == 1);
    },
  },
};
</script>

<style lang="less" scoped>
.cart {
  width: 1200px;
  margin: 0 auto;

  h4 {
    margin: 9px 0;
    font-size: 14px;
    line-height: 21px;
  }

  .cart-main {
    .cart-th {
      background: #f5f5f5;
      border: 1px solid #ddd;
      padding: 10px;
      overflow: hidden;

      & > div {
        float: left;
      }

      .cart-th1 {
        width: 25%;

        input {
          vertical-align: middle;
        }

        span {
          vertical-align: middle;
        }
      }

      .cart-th2 {
        width: 25%;
      }

      .cart-th3,
      .cart-th4,
      .cart-th5,
      .cart-th6 {
        width: 12.5%;
      }
    }

    .cart-body {
      margin: 15px 0;
      border: 1px solid #ddd;

      .cart-list {
        padding: 10px;
        border-bottom: 1px solid #ddd;
        overflow: hidden;

        & > li {
          float: left;
        }

        .cart-list-con1 {
          width: 15%;
        }

        .cart-list-con2 {
          width: 35%;

          img {
            width: 82px;
            height: 82px;
            float: left;
          }

          .item-msg {
            float: left;
            width: 150px;
            margin: 0 10px;
            line-height: 18px;
          }
        }

        .cart-list-con4 {
          width: 10%;
        }

        .cart-list-con5 {
          width: 15%;

          .mins {
            border: 1px solid #ddd;
            border-right: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }

          input {
            border: 1px solid #ddd;
            width: 40px;
            height: 33px;
            float: left;
            text-align: center;
            font-size: 14px;
          }

          .plus {
            border: 1px solid #ddd;
            border-left: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }
        }

        .cart-list-con6 {
          width: 12.5%;

          .sum {
            font-size: 16px;
          }
        }

        .cart-list-con7 {
          width: 12.5%;

          a {
            color: #666;
          }
        }
      }
    }
  }

  .cart-tool {
    overflow: hidden;
    border: 1px solid #ddd;

    .select-all {
      padding: 10px;
      overflow: hidden;
      float: left;

      span {
        vertical-align: middle;
      }

      input {
        vertical-align: middle;
      }
    }

    .option {
      padding: 10px;
      overflow: hidden;
      float: left;

      a {
        float: left;
        padding: 0 10px;
        color: #666;
      }
    }

    .money-box {
      float: right;

      .chosed {
        line-height: 26px;
        float: left;
        padding: 0 10px;
      }

      .sumprice {
        width: 200px;
        line-height: 22px;
        float: left;
        padding: 0 10px;

        .summoney {
          color: #c81623;
          font-size: 16px;
        }
      }

      .sumbtn {
        float: right;

        a {
          display: block;
          position: relative;
          width: 96px;
          height: 52px;
          line-height: 52px;
          color: #fff;
          text-align: center;
          font-size: 18px;
          font-family: "Microsoft YaHei";
          background: #e1251b;
          overflow: hidden;
        }
      }
    }
  }
}
</style>