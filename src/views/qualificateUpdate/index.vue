<!--  -->
<template>
  <div id="index_user_content">
    <a-tabs defaultActiveKey="1" @change="callback">
      <a-tab-pane tab="驾驶员" key="1">
        <driver />
      </a-tab-pane>
      <a-tab-pane tab="押运员" key="2" v-if="isCodeLogin">
        <escort />
      </a-tab-pane>
      <a-tab-pane tab="车头" key="3">
        <front />
      </a-tab-pane>
      <a-tab-pane tab="挂车" key="4" v-if="isCodeLogin">
        <trailer />
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script>
import driver from './driver/driver'
import escort from './escort/escort'
import front from './front/front'
import trailer from './trailer/trailer'
export default {
  data () {
    return {
      isCodeLogin: false
    }
  },

  components: {
    driver,
    escort,
    front,
    trailer
  },

  created() {
    if(sessionStorage.getItem('role') === '验证码登录用户') {
      this.isCodeLogin = false
    } else {
      this.isCodeLogin = true
    }
  },

  methods: {
    callback (key) {

    }
  }
}

</script>
<style scoped>
  #index_user_content {
    /* padding-top: 24px; */
    background: #fff;
    /* margin-top: 14px; */
    /* border-top: 1px solid #e8e8e8 */
  }
</style>
