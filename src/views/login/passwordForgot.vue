<!-- 登录页面 -->
<template>
  <div id="login_page">
    <div>
      <div style="textAlign:center;marginBottom: 32px">
        <img :size="70" src="../../assets/logo.png"/>
      </div>
      <a-form
        id="login_page_form"
        :form="form"
        @submit="handleSubmit"
      >
        <a-form-item>
            <a-input
              size="large"
              placeholder="账户名"
              v-decorator="[
                'account',
                {rules: [{ required: true, message: '请输入账户名!' }]}
              ]"
            >
              <a-icon
              slot="prefix"
              type="mobile"
              style="color: rgba(0,0,0,.25)"
            />
            </a-input>
          </a-form-item>
          <a-form-item>
            <a-row>
              <a-col :span="12">
                <a-input
                  placeholder="请输入验证码"
                  size="large"
                  v-decorator="[
                    'phoneCode',
                    {rules: [{ required: true, message: '请输入验证码!' }]}
                  ]"
                >
                </a-input>
              </a-col>
              <a-col :span="12" style="padding-left: 14px">
                <a-button style="width:100%" type="primary" @click="sendCode" :disabled="!show" size="large">{{show?'发送验证码':count+'s'}}</a-button>
              </a-col>
            </a-row>
          </a-form-item>
          <a-form-item>
            <a-input
              placeholder="新密码"
              size="large"
              v-decorator="[
                'newPsw',
                {rules: [{ required: true, message: '请输入新密码!' }]}
              ]"
            >
            </a-input>
          </a-form-item>
          <a-form-item>
            <a-input
              size="large"
              placeholder="确认密码"
              v-decorator="[
                'confirmPwd',
                {rules: [{ required: true, message: '请再次输入密码!' }, { validator: confirmPwd }]}
              ]"
            />
          </a-form-item>
          <a-form-item>
          <a-row type="flex" justify="space-between" align="middle">
            <a-col :span="12">
              <a-button type="primary" style="width:100%" size="large" html-type="submit">更新密码</a-button>
            </a-col>
            <a-col :span="8" style="textAlign:right">
              <a @click="$router.push({path:'/login'})">使用已有账户登录</a>
            </a-col>
          </a-row>
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
  data() {
    return {
      count: '',
      timer: null,
      show: true,
      form: this.$form.createForm(this)
    }
  },
  methods: {
    handleSubmit (e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          this.$api.login.forgetPswUpdatePsw(values).then(res => {
            if(res.code === 200) {
              this.$message.success('密码修改成功！请重新登录')
              this.$router.push({ path : '/login'})
            } else {
              this.$message.error(res.message)
            }
          })
        }
      })
    },
    sendCode() {
      const account = this.form.getFieldValue('account')
      console.log(account)
      if(account) {
        this.$api.login.getForgetPswPhoneCode({
          account: account
        }).then(res => {
          if(res.code === 200) {
            this.getCode()
            this.$message.success('验证码已发送')
          } else {
            this.$message.error(res.message)
          }
        })
      } else {
        this.$message.error('请先输入账户名！')
      }
    },
    getCode(){
     const TIME_COUNT = 60;
     if(!this.timer) {
        this.count = TIME_COUNT;
        this.show = false;
        this.timer = setInterval(() => {
        if (this.count > 0 && this.count <= TIME_COUNT) {
          this.count--;
        } else {
          this.show = true;
          clearInterval(this.timer);
          this.timer = null;
        }
        }, 1000)
      }
    },
    confirmPwd(rule, value, callback) {
      const form = this.form;
      if (value && value !== form.getFieldValue('newPsw')) {
        callback('请再次输入相同的新密码');
      } else {
        callback();
      }
    },  
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
  width: 100%;
}
</style>
