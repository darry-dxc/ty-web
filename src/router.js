import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '*',
      redirect: '/login'
    },
    {
      path: '/relogin',
      name: '单点登录',
      component: () => import(/* webpackChunkName: "login" */'./views/login/relogin.vue'),
      meta: {
        requireAuth: false
      }
    },
    {
      path: '/login',
      name: '登录',
      component: () => import(/* webpackChunkName: "login" */'./views/login/login.vue'),
      meta: {
        requireAuth: false
      }
    },
    {
      path: '/codelogin',
      name: '验证码登录',
      component: () => import(/* webpackChunkName: "codelogin" */'./views/login/codeLogin.vue'),
      meta: {
        requireAuth: false
      }
    },
    {
      path: '/register',
      name: '注册',
      component: () => import(/* webpackChunkName: "login" */'./views/login/register.vue'),
      meta: {
        requireAuth: false
      }
    },
    {
      path: '/passwordForgot',
      name: '忘记密码',
      component: () => import(/* webpackChunkName: "login" */'./views/login/passwordForgot.vue'),
      meta: {
        requireAuth: false
      }
    },
    {
      path: '/seniorAdmin',
      name: '用户权限管理',
      component: () => import(/* webpackChunkName: "seniorAdmin" */'./views/seniorAdmin/index.vue'),
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/dataBackup',
      name: '数据备份',
      component: () => import(/* webpackChunkName: "dataBackup" */'./views/seniorAdmin/dataBackup/dataBackup.vue'),
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/sysSetting',
      name: '系统设置',
      component: () => import(/* webpackChunkName: "sysSetting" */'./views/seniorAdmin/sysSetting/sysSetting.vue'),
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/adminReport',
      name: '查看报表',
      component: () => import(/* webpackChunkName: "admin" */'./views/admin/index.vue'),
      meta: {
        requireAuth: true
      },
      children: [{
        path: 'pieChart',
        name: '运输类型',
        component: () => import(/* webpackChunkName: "history" */'./views/admin/dashboard/PieChart.vue')
      }, {
        path: 'lineChart',
        name: '车辆信息',
        component: () => import(/* webpackChunkName: "history" */'./views/admin/dashboard/lineChart.vue')
      }]
    },
    {
      path: '/adminList',
      name: '首页列表',
      component: () => import(/* webpackChunkName: "list" */'./views/admin/list/list.vue'),
      meta: {
        requireAuth: true
      },
      children: [{
        path: 'driver',
        name: '驾驶员资质',
        component: () => import(/* webpackChunkName: "history" */'./views/history/components/driver.vue')
      }, {
        path: 'escort',
        name: '押运员资质',
        component: () => import(/* webpackChunkName: "history" */'./views/history/components/escort.vue')
      }, {
        path: 'headstock',
        name: '车头资质',
        component: () => import(/* webpackChunkName: "history" */'./views/history/components/front.vue')
      }, {
        path: 'trailer',
        name: '挂车资质',
        component: () => import(/* webpackChunkName: "history" */'./views/history/components/trailer.vue')
      }]
    },
    {
      path: '/logs',
      name: '用户日志',
      component: () => import(/* webpackChunkName: "logs" */'./views/seniorAdmin/logs/logs.vue'),
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/guard',
      name: '首页列表',
      component: () => import(/* webpackChunkName: "guard" */'./views/guard/index.vue'),
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/transpotArrange',
      name: '运输安排',
      component: () => import(/* webpackChunkName: "transpotArrange" */'./views/transpotArrange/index.vue'),
      meta: {
        requireAuth: true
      },
      children: [
        {
          path: 'action',
          name: '详情页',
          component: () => import(/* webpackChunkName: "transpotArrange" */'./views/transpotArrange/components/action.vue'),
          meta: {
            requireAuth: true
          }
        },
        {
          path: 'disabledAction',
          name: '详情页',
          component: () => import(/* webpackChunkName: "transpotArrange" */'./views/transpotArrange/components/disabledAction.vue'),
          meta: {
            requireAuth: true
          }
        }
      ]
    },
    {
      path: '/qualificateUpdate',
      name: '资质修改',
      component: () => import(/* webpackChunkName: "qualificateUpdate" */'./views/qualificateUpdate/index.vue'),
      meta: {
        requireAuth: true
      },
      children: [
        {
          path: 'edit',
          component: () => import(/* webpackChunkName: "qualificateUpdate" */'./views/qualificateUpdate/driver/action/action.vue'),
          meta: {
            requireAuth: true
          }
        }
      ]
    },
    {
      path: '/qualificateTrack',
      name: '资质回溯',
      component: () => import(/* webpackChunkName: "qualificateTrack" */'./views/qualificateTrack/index.vue'),
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/history',
      name: '异常查询',
      component: () => import(/* webpackChunkName: "history" */'./views/history/index.vue'),
      meta: {
        requireAuth: true
      },
      children: [{
        path: 'driver',
        name: '驾驶员资质',
        component: () => import(/* webpackChunkName: "history" */'./views/history/components/driver.vue')
      }, {
        path: 'escort',
        name: '押运员资质',
        component: () => import(/* webpackChunkName: "history" */'./views/history/components/escort.vue')
      }, {
        path: 'headstock',
        name: '车头资质',
        component: () => import(/* webpackChunkName: "history" */'./views/history/components/front.vue')
      }, {
        path: 'trailer',
        name: '挂车资质',
        component: () => import(/* webpackChunkName: "history" */'./views/history/components/trailer.vue')
      }]
    },
    {
      path: '/user',
      name: '个人中心',
      component: () => import(/* webpackChunkName: "user" */'./views/user/index.vue'),
      meta: {
        requireAuth: true
      }
    }
  ]
})
