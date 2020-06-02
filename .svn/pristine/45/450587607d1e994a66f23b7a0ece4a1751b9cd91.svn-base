<!--  -->
<template>
  <a-layout id="basic-layouts">
    <a-layout-sider
      :trigger="null"
      collapsible
      v-model="collapsed"
      :theme="theme"
      class="sider"
      width="230"
    >
      <div class="logo">
        <a href="javascript:;">
          <img src="../assets/tylogo.png" class="logo-img"/>
          <img src="../assets/logoText.png" class="logo-title"/>
        </a>
      </div>
      <a-menu
        :theme="theme"
        mode="inline"
        :defaultSelectedKeys="defaultSelectedKeys"
        :selectedKeys="selectedKeys"
        class="menu"
        :defaultOpenKeys="['adminReport']"
      >
        <template v-for="item in menuOptions">
          <a-menu-item v-if="!item.children" :key="item.key">
            <router-link :to="'/'+item.key">
              <a-icon :type="item.icon" />
              <span>{{item.name}}</span>
            </router-link>
          </a-menu-item>
          <a-sub-menu v-else :key="item.key">
            <span slot="title"><a-icon type="dashboard" /><span>{{item.name}}</span></span>
            <a-menu-item  v-for="it in item.children" :key="it.key">
            <router-link :to="'/'+it.key">
              <a-icon :type="it.icon" />
              <span>{{it.name}}</span>
            </router-link>
          </a-menu-item>
          </a-sub-menu>
        </template>
      </a-menu>
      <div class="themeSwitch">
        <span class="themeSwitch_span"><a-icon type="bulb" />  选择主题</span>
        <a-switch
          @change="changeTheme"
          :defaultChecked="true"
          checkedChildren="暗"
          unCheckedChildren="亮"
        ></a-switch>
      </div>
    </a-layout-sider>
    <a-layout>
      <a-layout-header style="background: #fff; padding: 0; display: flex; justify-content: space-between;box-shadow: 0 2px 4px #e8e8e8">
        <a-icon
          class="trigger"
          :type="collapsed ? 'menu-unfold' : 'menu-fold'"
          @click="()=> collapsed = !collapsed"
        />
        <div id="index_header_right">
          <!-- <a-tooltip placement="bottom" >
            <template slot="title">
              <span>搜索</span>
            </template>
            <span class="index_header_right_action">
              <a-icon type="search" style="fontSize:16px"/>
            </span>
          </a-tooltip>
          <a-tooltip placement="bottom" >
            <template slot="title">
              <span>帮助</span>
            </template>
            <span class="index_header_right_action">
              <a-icon type="question-circle" style="fontSize:16px"/>
            </span>
          </a-tooltip>
          <a-tooltip placement="bottom" >
            <template slot="title">
              <span>通知</span>
            </template>
            <span class="index_header_right_action">
              <a-badge>
                <a-icon type="bell" style="fontSize:16px"/>
              </a-badge>
            </span>
          </a-tooltip> -->
          <a-dropdown placement="bottomRight">
            <!-- <span class="index_header_right_action">
              <span class="user-avatar">
                <a-icon type="user" style="fontSize:16px"/>
              </span>
              <span style="margin-left: 6px;fontSize:16px">
                {{nickName}}
              </span>
            </span> -->
            <span style="padding-right:12px" class="index_header_right_action"><a-avatar icon="user" style="backgroundColor:#87d068;margin-right:12px"/>{{nickName}}</span>
            <a-menu slot="overlay">
              <!-- <a-menu-item>
                <a @click="nvatoUser"><a-icon type="user" /><span style="marginLeft:10px">个人中心</span></a>
              </a-menu-item> -->
              <a-menu-item>
                <a @click="visible = true"><a-icon type="logout" /><span style="marginLeft:10px">退出登录</span></a>
                <a-modal
                  title="退出登录"
                  v-model="visible"
                  @ok="logout"
                  okText="是"
                  cancelText="否"
                >
                  <p>即将退出天原危化品车辆管理系统,是否继续?</p>
                </a-modal>
              </a-menu-item>
            </a-menu>
          </a-dropdown>
        </div>
      </a-layout-header>
      <a-layout-content >
        <a-breadcrumb style="margin: 16px" :routes="routes">
          <template slot="itemRender" slot-scope="{route, params, routes}">
            <span v-if="routes.indexOf(route) === routes.length - 1">
              {{route.name}}
            </span>
            <router-link v-else :to="route.path">
              {{route.name}}
            </router-link>
          </template>
        </a-breadcrumb>
        <div :style="{ padding: '24px', background: '#fff', minHeight: 'calc(100vh - 117px)' }">
          <router-view />
        </div>
      </a-layout-content>
      <!-- <a-layout-footer :style="{ textAlign: 'center' }">
        天原集团危化品车辆管理系统 ©2019 Created by caitao914@foxmail.com
      </a-layout-footer> -->
    </a-layout>
  </a-layout>
</template>

<script>
let gusetMenus = [
  { key: 'transpotArrange', name: '运输安排', icon: 'home' },
  { key: 'qualificateUpdate', name: '资质修改', icon: 'edit' },
  { key: 'qualificateTrack', name: '资质回溯', icon: 'reload' },
  { key: 'history', name: '异常查询', icon: 'exclamation-circle' },
  { key: 'user', name: '个人中心', icon: 'user' }
]
let codeGusetMenus = [
  { key: 'transpotArrange', name: '运输安排', icon: 'home' },
  { key: 'qualificateUpdate', name: '资质修改', icon: 'edit' }
]
let sadminMenus = [
  { key: 'seniorAdmin', name: '用户权限管理', icon: 'usergroup-add' },
  { key: 'dataBackup', name: '数据备份', icon: 'database' },
  { key: 'logs', name: '用户日志', icon: 'file-text' },
  { key: 'sysSetting', name: '系统设置', icon: 'setting' }
]
let adminMenus = [
  { key: 'adminList', name: '首页列表', icon: 'bars' },
  { 
    key: 'adminReport', 
    name: '查看报表', 
    children: [{
      key: 'adminReport/pieChart', 
      name: '运输类型', 
      icon: 'pie-chart', 
    }, {
      key: 'adminReport/lineChart', 
      name: '车辆信息', 
      icon: 'line-chart', 
    }] 
  }
]
let guardMenus = [
  { key: 'guard', name: '首页列表', icon: 'bars' }
]
export default {
  data () {
    const { lang } = ''
    return {
      theme: 'dark',
      layoutTheme: '',
      collapsed: false,
      nickName: '',
      defaultSelectedKeys: [],
      selectedKeys: [],
      menuOptions: [],
      basePath: '',
      routes: [],
      visible: false,
      isSearch: false
    }
  },

  created () {
    this.routes = this.$route.matched
    let role = sessionStorage.getItem('role')
    this.$store.commit('getRole', role)
    this.nickName = sessionStorage.getItem('account')
    switch (role) {
      case '信息录入员':
        this.menuOptions = gusetMenus
        break
      case '验证码登录用户':
        this.menuOptions = codeGusetMenus
        break
      case '系统管理员':
        this.menuOptions = sadminMenus
        break
      case '管理层人员':
        this.menuOptions = adminMenus
        break
      case '公司门卫':
        this.menuOptions = guardMenus
        break
    }
  },

  mounted () {
    if (sessionStorage.getItem('currentPath')) { this.selectedKeys = [sessionStorage.getItem('currentPath').slice(1)] }
  },

  methods: {
    changeTheme (checked) {
      this.theme = !checked ? 'light' : 'dark'
    },
    logout () {
      this.$api.login.logout().then((res) => {
        if (res.code === 200) {
          this.$message.success('已退出当前账号!请重新登录')
          this.$router.push({ path: '/login' })
          this.$store.commit('setToken', '')
          sessionStorage.clear();
          this.$store.commit('getUserInfo', null)
        } else {
          this.$message.error('服务器异常!请重试')
        }
      })
    }
  },
  watch: {
    $route (to, from) {
      this.routes = this.$route.matched
      sessionStorage.setItem('currentPath', to.path)
      this.selectedKeys = [sessionStorage.getItem('currentPath').slice(1)]
    }
  }
}

</script>
<style>
  #basic-layouts {
    min-height: 100vh;
  }
  #basic-layouts .sider {
    box-shadow: 0 1px 10px #595959;
  }
  #basic-layouts .trigger {
    font-size: 18px;
    line-height: 64px;
    padding: 0 24px;
    cursor: pointer;
    transition: color .3s;
  }
  .index_header_right_action {
    display: inline-block;
    height: 100%;
    padding: 0 12px;
    cursor: pointer;
    transition: all .3s;
  }
  .user-avatar {
    width: 24px;
    height: 24px;
    border-radius: 50%;
    padding: 4px;
    background: #ccc;
    color:#fff;
    text-align: center;
  }
  .index_header_right_action:hover {
    background: rgba(0, 0, 0, 0.025)
  }
  #basic-layouts .trigger:hover {
    color: #1890ff;
  }
  .menu {
    height: calc(100% - 112px);
  }
  #basic-layouts .logo {
    position: relative;
    height: 64px;
    padding-left: 24px;
    overflow: hidden;
    line-height: 64px;
    background: #002140;
    transition: all .3s;
  }
  #basic-layouts .logo-img {
    display: inline-block;
    height: 32px;
    vertical-align: middle;
  }
  #basic-layouts .logo-title {
    display: inline-block;
    height: 28px;
    width: 158px
  }
  .themeSwitch{
    width: 100%;
    height: 48px;
    display: flex;
    justify-content: space-between;
    -ms-flex-align: center;
    align-items: center;
    padding: 0 16px;
    overflow: hidden;
    transition: all .3s;
    color: #666;
  }
  .themeSwitch_span {
    white-space: nowrap;
    overflow: hidden;
    font-size: 12px;
  }
</style>
