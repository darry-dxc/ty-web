<!--  -->
<template>
  <div>
    <a-list
      itemLayout="horizontal"
      :dataSource="data"
    >
      <a-list-item slot="renderItem" slot-scope="item">
        <a slot="actions" @click="safeAction(item)">修改</a>
        <a-list-item-meta>
          <span slot="description">{{item.description}}<span :style="item.title === '账户密码' && item.level === 2? 'color: #ff4d4f' : ''">{{item.detail}}</span></span>
          <a slot="title" href="https://vue.ant.design/">{{item.title}}</a>
        </a-list-item-meta>
      </a-list-item>
    </a-list>
    <passwordUpdate ref="passwordUpdate"/>
    <bindPhone ref="bindPhone" @change="change"/>
    <!-- <bindEmail ref="bindEmail" /> -->
  </div>
</template>

<script>
import passwordUpdate from './passwordUpdate/passwordUpdate'
import bindPhone from './bindPhone/bindPhone'
import bindEmail from './bindEmail/bindEmail'
export default {
  data () {
    return {
      userInfo: {},
      data: [
        {
          title: '账户密码',
          description: '',
          detail: '安全性高的密码可以使帐号更安全。建议您定期更换密码，设置一个包含字母，符号或数字中至少两项且长度超过6位的密码',
          level: 2
        },
        {
          title: '密保手机',
          description: '已绑定手机：',
          detail: '135********'
        },
        // {
        //   title: '备用邮箱',
        //   description: '已绑定邮箱：',
        //   detail: 'cai***@foxmail.com'
        // }
      ]
    }
  },

  components: {
    passwordUpdate,
    bindPhone,
    bindEmail
  },

  created() {
    this.userInfo = {
      userPhone: sessionStorage.getItem('userPhone'),
      userEmail: sessionStorage.getItem('userEmail')
    }
    this.data[1].detail = this.userInfo.userPhone
  },

  methods: {
    safeAction (item) {
      console.log(item.title)
      if (item.title == '账户密码') {
        this.passwordUpdate()
      } else if (item.title == '密保手机') {
        this.bindPhone()
      } else {
        this.bindEmail()
      }
    },
    change(e) {
      sessionStorage.setItem('userPhone',e)
     this.data[1].detail = e
    },
    // 修改账户密码
    passwordUpdate () {
      this.$refs.passwordUpdate.visible = true
    },
    // 绑定手机
    bindPhone () {
      this.$refs.bindPhone.visible = true
    },
    // 绑定邮箱
    bindEmail () {
      this.$refs.bindEmail.visible = true
    }
  }
}

</script>
<style scoped>
</style>
