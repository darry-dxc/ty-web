<template>
  <div>
    <a-modal
      title=""
      :visible="visible"
      @ok="handleOk"
      :confirmLoading="confirmLoading"
      @cancel="handleCancel"
      :width="480"
    >
    <a-tabs defaultActiveKey="1" style="textAlign:center" @change="tabChange">
      <a-tab-pane tab="原密码修改" key="1">
        <a-form :form="form">
          <a-form-item
            label="原密码"
            :label-col="labelCol"
            :wrapper-col="wrapperCol"
          >
            <a-input
              v-decorator="[
                'oldPwd',
                {rules: [{ required: true, message: '请输入原密码!' }]}
              ]"
            />
          </a-form-item>
          <a-form-item
            label="新密码"
            :label-col="labelCol"
            :wrapper-col="wrapperCol"
          >
            <a-input
              type="password"
              v-decorator="[
                'newPwd',
                {rules: [{ required: true, message: '请输入新密码!' }]}
              ]"
            />
          </a-form-item>
          <a-form-item
            label="确认密码"
            :label-col="labelCol"
            :wrapper-col="wrapperCol"
          >
            <a-input
              type="password"
              v-decorator="[
                'confirmPwd',
                {rules: [{ required: true, message: '请再次输入密码!' }, { validator: confirmPwd }]}
              ]"
            />
          </a-form-item>
        </a-form>
      </a-tab-pane>
      <a-tab-pane tab="手机号码修改" key="2" forceRender>
        <a-form :form="phoneForm">
          <a-form-item
            label="手机号码"
            :label-col="labelCol"
            :wrapper-col="wrapperCol"
          >
            <a-input
              v-decorator="[
                'mobilePhone',
                {rules: [{ required: true, message: '请输入手机号码!' }, { validator: validatePhone }]}
              ]"
            />
          </a-form-item>
          <a-form-item
            label="验证码"
            :label-col="labelCol"
            :wrapper-col="wrapperCol"
          >
            <a-row>
              <a-col :span="12">
                <a-input
                  placeholder="请输入验证码"
                  v-decorator="[
                    'identifyCode',
                    {rules: [{ required: true, message: '请输入验证码!' }]}
                  ]"
                />
              </a-col>
              <a-col :span="12" style="padding-left: 14px">
                <a-button style="width:100%" type="primary" @click="sendCode" :disabled="!show">{{show?'发送验证码':count+'s'}}</a-button>
              </a-col>
            </a-row>
          </a-form-item>
          <a-form-item
            label="新密码"
            :label-col="labelCol"
            :wrapper-col="wrapperCol"
          >
            <a-input
              type="password"
              v-decorator="[
                'newPwd',
                {rules: [{ required: true, message: '请输入新密码!' }]}
              ]"
            />
          </a-form-item>
          <a-form-item
            label="确认密码"
            :label-col="labelCol"
            :wrapper-col="wrapperCol"
          >
            <a-input
              type="password"
              v-decorator="[
                'confirmPwd',
                {rules: [{ required: true, message: '请再次输入密码!' }, { validator: confirmPwd }]}
              ]"
            />
          </a-form-item>
        </a-form>
      </a-tab-pane>
    </a-tabs>
    </a-modal>
  </div>
</template>

<script>
export default {
  data () {
    return {
      form: this.$form.createForm(this),
      phoneForm: this.$form.createForm(this),
      visible: false,
      confirmLoading: false,
      labelCol: {
        xs: { span: 24 },
        sm: { span: 6 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 14 }
      },
      activeKey: '1',
      count: '',
      timer: null,
      show: true
    }
  },

  components: {},

  computed: {},

  methods: {
    showModal () {
      this.visible = true
    },
    tabChange(e) {
      this.activeKey = e
    },
    handleOk (e) {
      if(this.activeKey === '1') {
        this.form.validateFields((err, values) => {
          if(!err) {
            this.$api.user.changePwdByOldPwd(values).then(res => {
              console.log(res)
              if(res.code === 200) {
                this.$message.success('密码修改成功！请重新登录')
                this.clearInfo()
              } else {
                this.$message.error(res.message)
              }
            }).catch(e => {
              this.$message.error(e.data)
            })
          }
        })
      } else {
        this.phoneForm.validateFields((err, values) => {
          if(!err) {
            this.$api.user.changePwdByPhone(values).then(res => {
              if(res.code === 200) {
                this.$message.success('密码修改成功！请重新登录')
                this.clearInfo()
              } else {
                this.$message.error(res.message)
              }
            }).catch(e => {
              this.$message.error(e.data)
            })
          }
        })
      }
    },
    sendCode() {
      const mobilePhone = this.phoneForm.getFieldValue('mobilePhone')
      if(mobilePhone && mobilePhone !== undefined) {
        this.$api.user.sendIdentifyCodeChangePwd({
          mobilePhone: mobilePhone
        }).then(res => {
          if(res.code === 200) {
            this.getCode()
            this.$message.success('验证码已发送')
          } else {
            this.$message.error(res.message)
          }
        })
      } else {
        this.$message.error('请输入手机号码')
      }
    },
    handleCancel (e) {
      console.log('Clicked cancel button')
      this.visible = false
    },
    callback () {},
    confirmPwd(rule, value, callback) {
      if(this.activeKey === '1') {
        const form = this.form;
        if (value && value !== form.getFieldValue('newPwd')) {
          callback('请再次输入相同的新密码');
        } else {
          callback();
        }
      } else {
        const form = this.phoneForm;
        if (value && value !== form.getFieldValue('newPwd')) {
          callback('请再次输入相同的新密码');
        } else {
          callback();
        }
      }
    },
    /**
     * 手机号校验规则
     */
    validatePhone (rule, value, callback) {
      const reg = /^1[34578]\d{9}$/
      if (value && !reg.test(value)) {
        callback('请输入正确格式的手机号码!')
      } else {
        callback()
      }
    },
    clearInfo() {
      this.$router.push({ path: '/login' })
      this.$store.commit('setToken', '')
      sessionStorage.setItem('role', '')
      sessionStorage.setItem('token', '')
      this.$store.commit('getUserInfo', null)
      sessionStorage.setItem('userInfo', null)
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
    }  
  }
}

</script>
<style scoped>
</style>
