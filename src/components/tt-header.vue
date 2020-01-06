<template>
  <el-row type="flex" class="row-bg" justify="space-between">
    <el-col :span="6" class="left">
      <i class="el-icon-s-fold"></i>
      <span></span>
    </el-col>
    <el-col :span="10" class="right">
      <!-- 输入栏 -->
      <el-tooltip class="item" effect="dark" content="搜索" placement="bottom">
        <el-button class="btn">
          <el-input placeholder="请输入搜索的文章内容" prefix-icon="el-icon-search" v-model="input"></el-input>
        </el-button>
      </el-tooltip>
      <!-- 消息 -->
      <el-tooltip class="item" effect="dark" content="消息" placement="bottom">
        <el-button class="btn" style="margin-right: 20px">消息</el-button>
      </el-tooltip>
      <!-- 头像 -->
      <!-- <img src="../assets/img/avatar.jpg" alt /> -->

      <!-- 用户名下拉菜单 -->
      <el-dropdown trigger="click" style="margin-left:10px">
        <span class="el-dropdown-link">
          刘铁柱儿
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>个人信息</el-dropdown-item>
          <el-dropdown-item>git地址</el-dropdown-item>
          <el-dropdown-item @click.native="logout">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </el-col>
  </el-row>
</template>

<script>
export default {
  data () {
    return {
      input: ''
    }
  },
  methods: {
    logout () {
      this.$confirm('确认退出吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 退出的话删除本地数据里的token
        window.localStorage.removeItem('user-token')
        this.$router.push('/login')
        this.$message({
          type: 'success',
          message: '退出成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消退出'
        })
      })
    }
  }
}
</script>

<style lang="less" scoped>
.left {
  display: flex;
  align-items: center;
  line-height: 60px;
  i {
    font-weight: normal;
    font-size: 24px;
  }
  span {
    margin-left: 10px;
  }
}
.right {
  display: flex;
  align-items: center;
  line-height: 60px;
  .btn {
    border: 0;
  }
  img {
    border-radius: 50%;
    vertical-align: middle;
  }
}
</style>
