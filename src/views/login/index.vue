<template>
      <div class="login">
    <!-- 白色卡片 -->
    <el-card class="login-card">
      <!-- 图片 -->
      <!-- <div class="logo-img">
        <img src="../../assets/img/logo_index.png" alt />
      </div> -->

      <!-- 表单 -->
      <el-form style="margin-top:30px" :model="ruleForm" ref="ruleForm" :rules="rules">
        <!-- 手机号 -->
        <el-form-item prop="mobile">
          <el-input placeholder="请输入手机号" v-model="ruleForm.mobile"></el-input>
        </el-form-item>

        <!-- 验证码 -->
        <el-form-item prop="code">
          <el-input hide-required-asterisk="true"  style="width:250px" placeholder="请输入验证码" v-model="ruleForm.code"></el-input>

          <!-- 发送验证码 -->
          <el-button plain style="float: right;">发送验证码</el-button>
        </el-form-item>

        <!-- 我已阅读 -->
        <el-form-item prop="checked">
          <el-checkbox style="color:#999;" v-model="ruleForm.checked">我已阅读并同意用户协议和隐私条款</el-checkbox>
        </el-form-item>

        <!-- 登录按钮 -->
        <el-form-item>
          <el-button style="width:100%" type="primary" @click="$router.push('/Layout')" >登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'Login',
  components: {

  },
  props: {

  },
  data () {
    return {
      ruleForm: {
        mobile: '',
        code: '',
        checked: false
      },
      rules: {
        mobile: [
          { required: true, message: '请输入手机号' },
          { pattern: /^1[3456789]\d{9}$/, message: '请输入正确手机号' }
        ],
        code: [
          { required: true, message: '请输入验证码' },
          { pattern: /^\d{6}$/, message: '请输入六位数字' }
        ],
        checked: [{
          // 自定义校检函数，第一个参数当前规则  第二个参数当前值  第三个参数回调函数
          validator: function (rule, value, callback) {
            if (value) {
              // 如果当前值为true的话直接执行这个函数
              callback()
            } else {
              // new一个错误的提示
              callback(new Error('您需要勾选协议'))
            }
          }
        }]
      }
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
.login {
//   background-image: url("../../assets/img/login_bg.jpg");
  height: 100vh;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
  .login-card {
    width: 440px;
    height: 360px;
    .logo-img {
      text-align: center;
      img {
        height: 45px;
      }
    }
  }
}
</style>
