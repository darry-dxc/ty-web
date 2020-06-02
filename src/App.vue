<template>
  <a-locale-provider :locale="locale">
    <div id="app">
      <router-view v-if="toLayout.indexOf($route.path) >= 0"></router-view>
      <Layout v-if=" toLayout.indexOf($route.path) === -1"/>
    </div>
  </a-locale-provider>
</template>
<script>
import Layout from './components/Layout'
import zhCN from 'ant-design-vue/lib/locale-provider/zh_CN'
import moment from 'moment'
import 'moment/locale/zh-cn'

moment.locale('zh-cn')
export default {
  data () {
    return {
      locale: zhCN,
      toLayout: ['/login', '/register', '/passwordForgot', '/codelogin', '/relogin']
    }
  },
  created () {
    this.$store.commit('getRole', sessionStorage.getItem('role'))
    let loading = document.getElementById('loading')
    if (loading != null) {
      document.body.removeChild(loading)
    }
  },
  components: { Layout }
}
</script>

<style lang="less">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  // text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 0;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
