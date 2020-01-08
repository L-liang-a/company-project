<template>
     <!-- 布局 -->
  <el-container>
    <!-- 导航 -->
    <el-aside class="left" width="200px">
      <!-- <div class="logo-left">
        <img src="../../assets/img/logo_admin.png" alt="">
      </div> -->
      <!-- 左侧导航 -->
        <el-menu style="width:300px" background-color='#353b4e' text-color='#adafb5' active-text-color='#ffd04b' router>
          <!-- 首页 -->
          <el-menu-item  index="/layout">
            <span slot="title">首页</span>
          </el-menu-item>

          <!-- 模块管理 -->
          <el-submenu index="2">
            <!-- 具名插槽 -->
            <template slot="title">模块管理</template>
            <el-menu-item index="/boss">新建模块</el-menu-item>
            <el-menu-item index="/project">模块项目</el-menu-item>
          </el-submenu>

          <!-- 项目流程-->
          <el-submenu index="3">
            <!-- 具名插槽 -->
            <template slot="title">项目流程</template>
          </el-submenu>

          <!-- 人员管理-->
          <el-submenu index="3">
            <!-- 具名插槽 -->
            <template slot="title">人员管理</template>
          </el-submenu>

          <!-- 账户信息 -->
          <el-menu-item index="3">
            <span slot="title">账户信息</span>
          </el-menu-item>
        </el-menu>
    </el-aside>

    <!-- 这个容器用来包头部和中部的 -->
    <el-container class="right">
      <!-- 头部 -->
      <el-header>
        <ttheader></ttheader>
      </el-header>
      <!-- 中部 -->
      <el-main>
      <!-- 为了解决点击修改文章之后，再次点击发布文章，不跳转 -->
        <router-view :key="$route.path"></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import ttheader from '../../components/tt-header'
export default {
  name: 'Layout',
  components: {
    'ttheader': ttheader
  },
  props: {

  },
  data () {
    return {

    }
  },
  computed: {

  },
  watch: {

  },
  created () {

  },
  methods: {

  },
  mounted () {

  }
}
</script>

<style scoped lang="less">
  .left {
    position: fixed;
    left: 0;
    top: 0;
    overflow: hidden;
    width: 220px;
    height: 100vh;
    background-color: #323245;
    // .logo-left{
    //   background-color: #2e2f32;
    //   padding: 15px 0;
    //   text-align: center;
    //   img {
    //     height: 30px;
    //   }
    // }
  }
  .right {
    margin-left: 200px;
  }
</style>
