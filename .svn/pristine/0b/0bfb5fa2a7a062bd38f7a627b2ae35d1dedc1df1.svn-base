<template>
  <div id="user_content">
    <a-form :form="form" layout='vertical' :style="{ width:'378px' }" >
      <a-form-item
        label="姓名"
      >
        <a-input
          readOnly
          v-decorator="[
            'username',
            { initialValue: nickName}
          ]"
        />
      </a-form-item>
      <a-form-item
        label="登录名"
      >
        <a-input
          readOnly
          v-decorator="[
            'nickname',
            { initialValue: nickAccount}
          ]"
          placeholder="请输入你的登录名"
          disabaled
        />
      </a-form-item>

      <!-- <a-form-item
      >
        <a-button
          type="primary"
          @click="check"
        >
          更新信息
        </a-button>
      </a-form-item> -->
    </a-form>
    <div :style="{ paddingLeft: '104px'}">
      <a-avatar icon="user" :size='144' style="backgroundColor:#1890ff"/>
    </div>
  </div>
</template>

<script>
const formItemLayout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 }
}
const formTailLayout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16, offset: 8 }
}
export default {
  data () {
    return {
      checkNick: false,
      form: this.$form.createForm(this)
    }
  },

  components: {},

  created() {
    this.nickName = sessionStorage.getItem('account')
    this.nickAccount = sessionStorage.getItem('entryStaffAccount')
  },

  methods: {
    check  () {
      this.form.validateFields(
        (err) => {
          if (!err) {
            console.info('success')
          }
        }
      )
    },
    handleChange  (e) {
      this.checkNick = e.target.checked
      this.$nextTick(() => {
        this.form.validateFields(['nickname'], { force: true })
      })
    }
  }
}

</script>
<style scoped>
  #user_content {
    display: flex
  }
</style>
