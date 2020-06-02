<!--  -->
<template>
  <div>
    <list />
  </div>
</template>

<script>
import list from '../admin/list/unEnter/unEnter'
export default {
  data () {
    return {
      nickName: '',
      welcomeTime: '早上好',
      nickAccount: ''
    }
  },

  created () {
    this.getTime()
    let role = sessionStorage.getItem('companyName')
    this.nickName = role
    this.nickAccount = sessionStorage.getItem('account')
  },

  components: {
    list
  },

  computed: {},

  methods: {
    getTime () {
      let now = new Date()
      let hour = now.getHours()
      if (hour < 9) {
        this.welcomeTime = '早上好'
      } else if (hour < 12) {
        this.welcomeTime = '上午好'
      } else if (hour < 14) {
        this.welcomeTime = '中午好'
      } else if (hour < 17) {
        this.welcomeTime = '下午好'
      } else {
        this.welcomeTime = '晚上好'
      }
    }
  }
}

</script>
<style scoped>
  #index_user_header {
    height: 80px;
    background: #fff
  }
  #index_user_header_left {
    display: flex;
    flex-direction: row;
    align-content: center;
  }
  #index_user_header_left_wel{
    margin-bottom: 12px;
    color: rgba(0,0,0,.85);
    font-weight: 500;
    font-size: 20px;
    line-height: 28px;
  }
  #index_user_header_left_ps{
    color: rgba(0,0,0,.45);
    line-height: 22px;
  }
</style>
