<template>
  <!-- 登录页 -->
  <div class="user-login">
    <div class="title">
      <img src="imgs/login-logo.png" alt="" class="logo" />
      <span>黄冈大别山世界地质公园综合管理信息平台</span>
    </div>
    <div class="content"> 
      <div class="photo">
        <img src="imgs/user.png" alt="" />
      </div>
      <img style="margin-bottom: -4px" src="imgs/矩形5.png" alt="" />
      <div class="login-form">
        <div class="tabs title">用户登录</div>
        <el-form
          class="form my-height"
          :model="form"
          label-position="left"
          :rules="rules"
          ref="form"
        >
          <el-form-item prop="username">
            <el-input v-model="form.username" placeholder="请输入用户名">
              <template #prefix>
                <img
                  style="vertical-align: middle; margin: 0 13px"
                  src="imgs/username.png"
                  alt=""
                />
              </template>
            </el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              type="password"
              v-model="form.password"
              placeholder="请输入密码"
              @keyup.enter="login"
            >
              <template #prefix>
                <img
                  style="vertical-align: middle; margin: 0 13px"
                  src="imgs/password.png"
                  alt=""
                />
              </template>
            </el-input>
          </el-form-item>
          <el-form-item>
            <Verify
              @success="verifySuccess"
              :mode="'pop'"
              :captchaType="'blockPuzzle'"
              :imgSize="{ width: '330px', height: '155px' }"
              ref="verify"
            />
          </el-form-item>
          <el-form-item>
            <el-button
              style="width: 100%; background: #00a38b; border-color: #00a38b"
              type="primary"
              @click="login"
              >登录</el-button
            >
          </el-form-item>
        </el-form>
        <!-- <div class="register">
          <span @click="register">立即注册</span> | <span @click="resetPwd">忘记密码？</span>
        </div> -->
      </div>
    </div>

    <Footer style="background: transparent; color: #fff" />
  </div>
</template>

<script>
import Verify from "../../components/verifition/Verify";
import { getLoginSmsCode, getUserInfo } from '../../api/loginAndRegister'
import { getStore } from '../../utils/store'
import Footer from '_com/footer/index.vue'
export default {
  components: {
    Verify,
    Footer
  },
  data() {
    return {
      tabs: [
        { label: '用户登录', name: '0' }, { label: '验证码登录', name: '1' },
      ],
      form: { randomStr: "blockPuzzle", },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
        ],
      },
      currentIndex: 0,
      flag: false,
      max: 60,
      current: 60,
      decreseInterval: null
    }
  },
  created() {
  },
  methods: {
    handleClick(item, index) {
      // 选择登录类型
      this.currentIndex = index;
      this.form = { randomStr: "blockPuzzle" };
      this.$refs.form.resetFields();
    },
    async getSmsCode() {
      // 获取短信验证码
      if (this.form.mobile) {
        let res = await getLoginSmsCode(this.form.mobile);
        let { code, data, msg } = res;
        if (code == 0) {
          this.$message.success(msg)
          this.current = this.max;
          this.decreseInterval = setInterval(() => {
            if (this.current <= this.max && this.current > 0) {
              this.current--;
              this.flag = true;
            } else if (this.current <= 0) {
              this.current = 0
              this.flag = false;
              clearInterval(this.decreseInterval);
            }
          }, 1000)
        } else {
          this.$message.error(msg)
        }
      } else {
        this.$message.error('请先输入手机号！')
      }
    },
    login() {
      // 用户名登录
      this.$refs.form.validate(valid => {
        if (valid) {
          this.$refs.verify.show();
        }
      })
    },
    verifySuccess(params) {
      this.form.code = params.captchaVerification;
      this.$store.dispatch("LoginByUsername", this.form).then((res) => {
        this.$store.dispatch("GetMenu", { type: true, id: '' }).then(data2 => {
          if (data2.length !== 0) {
            this.$router.$avueRouter.formatRoutes(data2, true);
            this.$router.push(data2[0].path)
          }
        });
      });
    },
  }
}
</script>

<style lang="less" scoped>
@vw: 19.2vw;
@vh: 10.8vh;
.user-login {
  width: 100%;
  height: calc(100% - 7vh);
  position: relative;
  z-index: 3;
  background-image: url("../../assets/images/login-bg.png");
  background-position: 0 0;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  // padding-top: 10%;
  padding-top: 7vh;
  .title {
    font-family: MicrosoftYaHei-Bold;
    font-size: 36px;
    color: #ffffff;
    font-weight: 600;
    line-height: 55px;
    padding-left: 72 / @vw;
    .logo {
      vertical-align: bottom;
      margin-right: 10px;
    }
  }
  .content {
    width: 436px;
    // width: 23vw;
    margin: 0px auto;
    margin-top: 105 / @vh;
    text-align: center;
    .photo {
      width: 100%;
      text-align: center;
      margin-bottom: 10px;
    }
  }
  .login-form {
    // width: 400px;
    // height: 434px;
    // width: 100%;
    height: 408 / @vh;
    // padding: 40px 53px 0 53px;
    padding: 40px 25px 0 25px;
    background-color: rgba(255, 255, 255, 0.8);
    box-shadow: 0vh 0vh 0vh 0vh rgba(0, 0, 0, 0.2);
    border-radius: 10px;
    overflow-y: auto;
    .title {
      font-family: MicrosoftYaHei;
      font-size: 30px;
      line-height: 32px;
      color: #00a38b;
    }
    .tabs {
      width: calc(100% - 100px);
      padding: 0 50px;
      height: 64 / @vh;
      display: flex;
      justify-content: space-around;
      align-items: center;
      border-bottom: solid 1px #cccccc;
    }
    .form {
      margin-top: 32px;
      .el-form-item {
        margin-bottom: 23px;
      }
      .btn {
        width: 132px;
        height: 46px;
        margin-left: 15px;
      }
      /deep/ .el-input__inner {
        border: solid 1px #bfbfbf;
        border-radius: 0;
        padding-left: 50px;
      }
    }
    .register {
      color: #00a0e9;
      text-align: right;
      span {
        cursor: pointer;
      }
    }
    .form2 {
      .el-form-item {
        margin-bottom: 15px;
      }
    }
  }
}
</style>

<style lang="less">
.my-height {
  .el-input__inner {
    height: 48px;
  }
}
</style>
