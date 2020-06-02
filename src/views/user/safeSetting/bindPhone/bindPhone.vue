<template>
  <div>
    <a-modal
      title="手机号码"
      :visible="visible"
      @ok="handleOk"
      :confirmLoading="confirmLoading"
      @cancel="handleCancel"
      :width="480"
      okText="确认"
      cancelText="取消"
    >
      <a-form :form="form">
          <a-form-item
            label="手机号码"
            :label-col="labelCol"
            :wrapper-col="wrapperCol"
          >
            <a-input
              placeholder="请输入手机号码"
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
        </a-form>
    </a-modal>
  </div>
</template>

<script>
export default {
  data () {
    return {
      form: this.$form.createForm(this),
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
      count: '',
      timer: null,
      show: true
    }
  },

  methods: {
    showModal () {
      this.visible = true
    },
    handleOk (e) {
      this.form.validateFields((err, values) => {
        if(!err) {
          const phone =  values.mobilePhone.substr(0,3) + "****" + values.mobilePhone.substr(7)
          this.$api.user.changeMobile(values).then(res => {
            if(res.code === 200) {
              this.$message.success('手机号码修改成功！')
              this.$emit('change', phone)
              this.visible = false
            } else {
              this.$message.error(res.message)
            }
          }).catch(e => {
            this.$message.error(e.data)
          })
        }
      })
    },
    handleCancel (e) {
      console.log('Clicked cancel button')
      this.visible = false
    },
    callback () {},
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
    sendCode() {
      const mobilePhone = this.form.getFieldValue('mobilePhone')
      if(mobilePhone && mobilePhone !== undefined) {
        this.$api.user.sendIdentifyCodeChangePhone({
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
