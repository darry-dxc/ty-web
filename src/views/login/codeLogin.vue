<!-- 登录页面 -->
<template>
  <div id="login_page">
    <div>
      <div style="textAlign:center; marginBottom: 48px">
        <img :size="70" src="../../assets/logo.png"/>
      </div>
      <a-form
        id="login_page_form"
        :form="form"
        @submit="handleSubmit"
      >
        <a-form-item>
          <a-input
            v-decorator="[
              'businessId',
              { rules: [{ required: true, message: '请输入单据号!' }] }
            ]"
            placeholder="单据号"
            size="large"
          >
            <a-icon
              slot="prefix"
              type="file"
              style="color: rgba(0,0,0,.25)"
            />
          </a-input>
        </a-form-item>
        <a-form-item>
          <a-input
            v-decorator="[
              'transportId',
              { rules: [{ required: true, message: '请输入明细号!' }] }
            ]"
            placeholder="明细号"
            size="large"
          >
            <a-icon
              slot="prefix"
              type="barcode"
              style="color: rgba(0,0,0,.25)"
            />
          </a-input>
        </a-form-item>
        <a-form-item>
          <a-input
            v-decorator="[
              'code',
              { rules: [{ required: true, message: '请输入验证码!' }] }
            ]"
            placeholder="验证码"
            size="large"
          >
            <a-icon
              slot="prefix"
              type="code"
              style="color: rgba(0,0,0,.25)"
            />
          </a-input>
        </a-form-item>
        <a-form-item>
          <a-button
            type="primary"
            html-type="submit"
            class="login-form-button"
            size="large"
          >
            登录
          </a-button>
          <a @click="$router.push({path:'/login'})" class="login-form-forgot">
            账号登录
          </a>
        </a-form-item>
      </a-form>
    </div>
    <div :style="{textAlign: 'center',margin: '48px 0 24px'}">
      天原集团危化品车辆管理系统 ©2019 Created by CAE504
    </div>
  </div>
</template>

<script>

export default {
  beforeCreate () {
    this.form = this.$form.createForm(this)
  },
  methods: {
    handleSubmit (e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          this.$api.login.codeLogin(values).then((res) => {
            if (res.code === 200) {
              this.$message.success('登录成功!')
              this.$store.commit('setToken', res.message)
              sessionStorage.setItem('role', res.data.type)
              sessionStorage.setItem('token', this.$store.state.token)
              this.$router.push({ path: '/transpotArrange' })
              this.$store.commit('setAccount', res.data.ownedCompany)
              this.$store.commit('getUserInfo', res.data)
              sessionStorage.setItem('account', res.data.ownedCompany)
            } else {
              this.$message.error(res.data)
            }
          })
        }
      })
    },
    forgetPassword () {

    }
  }
}
</script>
<style scope>
#login_page{
  height: 100vh;
  width: 100%;
  background: #f0f2f5;
  padding: 32px 0 24px;
  background-image: url(https://gw.alipayobjects.com/zos/rmsportal/TVYTbAXWheQpRcWDaDMu.svg);
  background-repeat: no-repeat;
  background-position: center 110px;
  background-size: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between
}
#login_page_form{
  width: 388px;
  margin: 0 auto;
}
#login_page_form .login-form-forgot {
  float: right;
}
#login_page_form .login-form-button {
  margin-top: 16px;
   margin-bottom: 24px;
  width: 100%;
}
</style>
