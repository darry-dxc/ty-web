<!--  -->
<template>
  <div>
    <div id="list_content">
      <a-tabs defaultActiveKey="1" tabPosition='left'>
        <a-tab-pane tab="录入员" key="1">
          <reporter />
        </a-tab-pane>
        <a-tab-pane tab="管理层" key="2">
          <admin />
        </a-tab-pane>
        <a-tab-pane tab="门卫" key="3">
          <guard />
        </a-tab-pane>
        <a-tab-pane tab="系统管理员" key="4">
          <sysAdmin />
        </a-tab-pane>
      </a-tabs>
    </div>
  </div>
</template>

<script>
import reporter from './reporter/reporter'
import admin from './admin/admin'
import guard from './guard/guard'
import sysAdmin from './sysAdmin/sysAdmin'
export default {
  data () {
    return {
    }
  },

  components: {
    reporter, guard, admin, sysAdmin
  },

  computed: {},

  methods: {}
}

</script>
<style scoped>
  #list_content {
    background: #fff;
  }
</style>
