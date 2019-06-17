<template>
  <div>
    <a-layout>
      <a-layout-header>
        <div class="layout-logo">
          <img height="50px" width="50px" src="../../assets/logo.png"/>
        </div>
        <a-menu
          theme="dark"
          mode="horizontal"
          :style="{ lineHeight: '64px' }"
        >
          <a-menu-item key="1">
            欢迎使用xxx系统
          </a-menu-item>
        </a-menu>
      </a-layout-header>
      <a-layout-content>
        <div :style="{ background: '#fff', minHeight: '488px' }">
          <div style="float: right;margin: 100px 100px 0">
            <a-card title="欢迎登录XX系统">
              <a-form
                :form="loginForm"
                @submit="handleSubmit"
              >
                <a-form-item>
                  <a-input
                    v-decorator="[
                        'loginAccount',
                        {
                         rules: [
                           { required: true, message: '请输入账号!', whitespace: true}
                         ]
                        }
                    ]"
                    placeholder="请输入账号"
                  >
                    <a-icon
                      slot="prefix"
                      type="user"
                      style="color: rgba(0,0,0,.25)"
                    />
                  </a-input>
                </a-form-item>
                <a-form-item>
                  <a-input
                    v-decorator="[
                       'loginPassword',
                         { rules: [{ required: true, message: '请输入密码！' }] }
                    ]"
                    type="password"
                    placeholder="请输入密码"
                  >
                    <a-icon
                      slot="prefix"
                      type="lock"
                      style="color: rgba(0,0,0,.25)"
                    />
                  </a-input>
                </a-form-item>
                <a-form-item>
                  <a-button
                    type="primary"
                    html-type="submit"
                    class="login-form-button"
                  >
                    登 录
                  </a-button>
                </a-form-item>
              </a-form>
            </a-card>
          </div>
        </div>
      </a-layout-content>
      <a-layout-footer style="text-align: center">
        Ant Design ©2018 Created by Ant UED
      </a-layout-footer>
    </a-layout>
  </div>
</template>
<script>
  import {mapActions} from 'vuex';

  export default {
    name: 'login',
    beforeCreate() {
      this.loginForm = this.$form.createForm(this);
    },
    methods: {
      ...mapActions([
        'handleLogin',
        'getUserInfo'
      ]),
      check(rule, value, callback) {
        console.log(rule + '----' + value)
        callback()
        // callback('Two passwords that you enter is inconsistent!')
      },
      handleSubmit(e) {
        e.preventDefault()
        this.loginForm.validateFields((err, values) => {
          if (!err) {
            this.handleLogin({
              loginAccount: this.loginForm.getFieldValue('loginAccount'),
              loginPassword: this.$encruption(this.loginForm.getFieldValue('loginPassword'))
            }).then(res => {
              if (this.token != '' && res.code == 200) {
                this.getUserInfo().then(res => {
                  if (res.code = 200) {
                    this.$router.push({
                      name: 'adminCenter'
                    })
                  }
                })
              } else {
                this.$message.error('账号密码错误！');
              }
            })
          }
        })
      }
    },
    computed: {
      msg() {
        return this.$store.getters.msg;
      },
      token() {
        return this.$store.getters.token;
      }
    }
  }
</script>
<style scoped>
  .layout-logo {
    width: 100px;
    height: 30px;
    border-radius: 10px;
    float: left;
    position: relative;
    left: 20px;
  }
</style>
