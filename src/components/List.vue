<template>
  <div class="row">
    <!-- 展示用户列表 -->
    <div
      v-show="info.users.length"
      class="card"
      v-for="user in info.users"
      :key="user.login"
    >
      <a :href="user.html_url" target="_blank">
        <img :src="user.avatar_url" style="width: 100px" />
      </a>
      <p class="card-text">{{ user.login }}</p>
    </div>
    <!-- 展示欢迎词 -->
    <h1 v-show="info.isFirst">欢迎使用！</h1>
    <!-- 展示加载中 -->
    <h1 v-show="info.isLoading">加载中....</h1>
    <!-- 展示错误信息 -->
    <h1 v-show="info.errMsg">{{ info.errMsg }}</h1>
  </div>
</template>
<script>
export default {
  name: "List",
  data() {
    return {
      info: {
        isFirst: true,
        // 是否初次展示
        isLoading: false,
        // 是否在加载中
        errMsg: "",
        // 错误信息
        users: [],
        // 用户
      },
    };
  },
  methods: {
    updateListData(dataObj) {
      // 之所以要在各数据外面包上info是因为不能直接操作_data
      this.info = { ...this.info, ...dataObj };
      //   ...this.info列出info的所有属性，有四个，...dataObj列出dataObj的所有属性，有三个
      // 合并字面量属性，后面的的属性替换掉前面的同名属性

      /*可以使用这一条，但传入数据时isFirst: false,不能省略，否则会丢失数据
    this.info = dataObj;
    */
    },
  },
  mounted() {
    this.$bus.$on("updateListData", this.updateListData);
  },
  //  销毁
  beforeDestroy() {
    this.$bus.$off("updateListData");
    // 最好在beforeDestroy钩子中，用$off去解绑当前组件所用到的事件,一定要写解绑的事件名，否则就全部解绑了
  },
};
</script>

<style scoped>
.album {
  min-height: 50rem; /* Can be removed; just added for demo purposes */
  padding-top: 3rem;
  padding-bottom: 3rem;
  background-color: #b3aeae;
}

.card {
  float: left;
  width: 33.333%;
  padding: 0.75rem;
  margin-bottom: 2rem;
  border: 1px solid #efefef;
  text-align: center;
}

.card > img {
  margin-bottom: 0.75rem;
  border-radius: 100px;
}

.card-text {
  font-size: 85%;
}
</style>