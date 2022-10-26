<template>
  <header class="header">
    <!-- 头部的第一行 -->
    <div class="top">
      <div class="container">
        <div class="loginList">
          <p>猫原汇欢迎您！</p>
          <!-- 没有用户名 未登录 -->
          <p v-if="!userName">
            <span>请</span>
            <router-link to="/login">登录</router-link>
            <router-link class="register" to="/register">免费注册</router-link>
          </p>
          <!-- 有用户名，已登录 -->
          <p v-if="userName">
            {{ userName }} |
            <span style="cursor: pointer" @click="userLogout">退出登录</span>
          </p>
        </div>
        <div class="typeList">
          <router-link to="/center/myorder">我的订单</router-link>
          <router-link to="/shopcart">我的购物车</router-link>
          <a href="###">我的猫原汇</a>
          <a href="###">猫原汇会员</a>
          <a href="###">企业采购</a>
          <a href="###">关注猫原汇</a>
          <a href="###">合作招商</a>
          <a href="###">商家后台</a>
        </div>
      </div>
    </div>
    <!--头部第二行 搜索区域-->
    <div class="bottom">
      <h1 class="logoArea">
        <router-link class="logo" to="/home">
          <img src="./images/logo.png" alt="" />
        </router-link>
      </h1>
      <div class="searchArea">
        <form action="###" class="searchForm">
          <input
            type="text"
            id="autocomplete"
            class="input-error input-xxlarge"
            v-model="keyword"
          />
          <button
            class="sui-btn btn-xlarge btn-danger"
            type="button"
            @click="goSearch"
          >
            搜索
          </button>
        </form>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: "Header",
  data() {
    return {
      keyword: "",
    };
  },
  mounted() {
    this.$bus.$on("clear", () => {
      this.keyword = undefined;
    });
  },
  methods: {
    // 点击按钮向search路由进行跳转
    goSearch() {
      // 路由传参的几种方式
      // 字符串形式
      // this.$router.push(
      //   "/search/" + this.keyword + "?k=" + this.keyword.toUpperCase()
      // );

      // 模板字符串形式
      // this.$router.push(
      //   `/search/${this.keyword}?k=${this.keyword.toUpperCase()}`
      // );

      // 对象形式 (要给路由起一个name 名字)
      if (this.$route.query) {
        let location = {
          name: "search",
          params: { keyword: this.keyword || undefined },
          // query: { k: this.keyword.toUpperCase() },
        };
        location.query = this.$route.query;
        this.$router.push(location);
      }
    },
    // 点击按钮，用户退出登录
    userLogout() {
      this.$store.dispatch("userLogout");
      this.$router.push("/home");
    },
  },
  computed: {
    userName() {
      return this.$store.state.user.userInfo.name;
    },
  },
};
</script>

<style scoped lang="less">
.header {
  & > .top {
    background-color: #eaeaea;
    height: 30px;
    line-height: 30px;

    .container {
      width: 1200px;
      margin: 0 auto;
      overflow: hidden;
      background-color: #eaeaea;

      .loginList {
        float: left;

        p {
          float: left;
          margin-right: 10px;

          .register {
            border-left: 1px solid #b3aeae;
            padding: 0 5px;
            margin-left: 5px;
          }
        }
      }

      .typeList {
        float: right;

        a {
          padding: 0 10px;

          & + a {
            border-left: 1px solid #b3aeae;
          }
        }
      }
    }
  }

  & > .bottom {
    width: 1200px;
    margin: 0 auto;
    overflow: hidden;

    .logoArea {
      float: left;

      .logo {
        img {
          width: 175px;
          margin: 25px 45px;
        }
      }
    }

    .searchArea {
      float: right;
      margin-top: 35px;

      .searchForm {
        overflow: hidden;

        input {
          box-sizing: border-box;
          width: 490px;
          height: 32px;
          padding: 0px 4px;
          border: 2px solid #ea4a36;
          float: left;

          &:focus {
            outline: none;
          }
        }

        button {
          height: 32px;
          width: 68px;
          background-color: #ea4a36;
          border: none;
          color: #fff;
          float: left;
          cursor: pointer;

          &:focus {
            outline: none;
          }
        }
      }
    }
  }
}
</style>