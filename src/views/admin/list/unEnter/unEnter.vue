<template>
  <div v-if="isDetailHide" >
    <div id="index_user_header">
        <div id="index_user_header_left">
          <a-avatar :size="72" icon="user" />
          <span :style="{ display: 'flex', flexDirection: 'column', justifyContent: 'center', marginLeft: '24px' }">
            <span id="index_user_header_left_wel">{{welcomeTime}}，{{nickName}}，欢迎登录天原集团危化品车辆管理系统</span>
            <span id="index_user_header_left_ps">{{accountRole}} | {{nickAccount}}</span>
          </span>
        </div>
      </div>
    <a-table
      :rowKey="record => JSON.stringify(record)"
      :columns="columns"
      :dataSource="data"
      :loading="loading"
      :pagination="false"
      bordered
      :scroll="{ x: 2230 }"
      style="width: 100%"
    >
      <template slot="carNo" slot-scope="text">
        <a href="javascript:;">{{text}}</a>
      </template>
       <template slot="receiveOrDispatch" slot-scope="text">
        {{getRdState(text)}}
      </template>
      <template slot="recordState" slot-scope="text">
        {{getState(text)}}
      </template>

      <template slot="driverLicenseState" slot-scope="text,record">
        <a-badge :status="setState(text)" :text="text" v-if="record.driverId === '' || record.driverId === null "/>
        <a @click="$router.push({ path: `/adminList/driver?id=${record.driverId}`})" v-else>
          <a-badge :status="setState(text)" :text="text" />
        </a>
      </template>
      <template slot="driverDangerLicenceState" slot-scope="text,record">
        <a-badge :status="setState(text)" :text="text" v-if="record.driverId === '' || record.driverId === null "/>
        <a @click="$router.push({ path: `/adminList/driver?id=${record.driverId}`})" v-else>
          <a-badge :status="setState(text)" :text="text" />
        </a>
      </template>
      <template slot="escortLicenseState" slot-scope="text,record">
        <a-badge :status="setState(text)" :text="text" v-if="record.escortId === '' || record.escortId === null "/>
        <a @click="$router.push({ path: `/adminList/escort?id=${record.escortId}`})" v-else>
          <a-badge :status="setState(text)" :text="text" />
        </a>
      </template>
      <template slot="drivingLicence" slot-scope="text,record">
        <a-badge :status="setState(text)" :text="text" v-if="record.headStockId === '' || record.headStockId === null "/>
        <a @click="$router.push({ path: `/adminList/headstock?id=${record.headStockId}`})" v-else>
          <a-badge :status="setState(text)" :text="text" />
        </a>
      </template>
      <template slot="headStockDangerLicenceState" slot-scope="text,record">
        <a-badge :status="setState(text)" :text="text" v-if="record.headStockId === '' || record.headStockId === null "/>
        <a @click="$router.push({ path: `/adminList/headstock?id=${record.headStockId}`})" v-else>
          <a-badge :status="setState(text)" :text="text" />
        </a>
      </template>
      <template slot="trailerDangerLicenceState" slot-scope="text,record">
        <a-badge :status="setState(text)" :text="text" v-if="record.trailerId === '' || record.trailerId === null "/>
        <a @click="$router.push({ path: `/adminList/trailer?id=${record.trailerId}`})" v-else>
          <a-badge :status="setState(text)" :text="text" />
        </a>
      </template>
      <template slot="trailertankInspectionState" slot-scope="text">
        <a-badge :status="setState(text)" :text="text" />
      </template>
      <template slot="title">
        <a-form
          layout="inline"
          :form="form"
          @submit="handleSubmit"
        >
          <a-form-item
            label="驾驶员姓名"
          >
            <a-input
              v-decorator="[
                'driverName'
              ]"
            />
          </a-form-item>
          <a-form-item
            label="押运员姓名"
          >
            <a-input
              v-decorator="[
                'escortName'
              ]"
            />
          </a-form-item>
          <a-form-item
            label="驾驶员手机号"
          >
            <a-input
              v-decorator="[
                'driverPhone'
              ]"
            />
          </a-form-item>
          <a-form-item
            label="车头车牌号"
          >
            <a-input
              v-decorator="[
                'headStockPlateNumber'
              ]"
            />
          </a-form-item>
          <a-form-item
            label="创建时间"
          >
            <a-range-picker
              :placeholder="placeholder"
              format="YYYY/MM/DD"
              v-decorator="[
                'createTime'
              ]"
            />
          </a-form-item>
          <a-form-item
            label="提交时间"
          >
            <a-range-picker
              :placeholder="placeholder"
              format="YYYY/MM/DD"
              v-decorator="[
                'entryTime'
              ]"
            />
          </a-form-item>
          <a-form-item>
            <a-button type="primary" icon="search" html-type="submit">查询</a-button>
          </a-form-item>
          <a-form-item>
            <a-button @click="resetForm">重置</a-button>
          </a-form-item>
          <a-form-item v-show="isDownload">
            <download-excel
              :data = data
              :json_fields = "excelTitle"
              :name="`天原集团车辆情况查看(未入厂)${new Date().toLocaleDateString()}.xls`"
            >
              <a-button type="dashed" icon="download">列表导出</a-button>
            </download-excel>
          </a-form-item>
        </a-form>
      </template>
    </a-table>
    <a-pagination
      :current="pagination.current"
      :pageSize="pagination.pageSize"
      :total="pagination.total"
      :pageSizeOptions="pagination.pageSizeOptions"
      :showTotal="total => `共 ${total} 条数据`"
      showSizeChanger
      showQuickJumper
      @change="handlePageChange"
      @showSizeChange="showSizeChange"
      style="margin: 16px 0; float: right"
    />
  </div>
  <router-view v-else/>
</template>

<script>
const columns = [{
  title: '运单号',
  dataIndex: 'businessId',
  width: 120,
  scopedSlots: { customRender: 'name' },
  fixed: 'left'
}, {
  title: '手机号码',
  width: 110,
  dataIndex: 'driverPhone1',
},{
  title: '车辆状态',
  width: 110,
  dataIndex: 'recordState',
  scopedSlots: { customRender: 'recordState' },
},{
  title: '装货/送货',
  width: 120,
  dataIndex: 'receiveOrDispatch',
  scopedSlots: { customRender: 'receiveOrDispatch' },
},{
  title: '运输物料',
  width: 110,
  dataIndex: 'materiel'
}, {
  title: '人员资质',
  children: [{
    title: '驾驶证',
    width: 110,
    dataIndex: 'driverLicence',
    scopedSlots: { customRender: 'driverLicenseState' }
  }, {
    title: '危险化学品运输资质',
    width: 120,
    dataIndex: 'dangerLicence',
    scopedSlots: { customRender: 'driverDangerLicenceState' }
  }, {
    title: '押运证',
    width: 120,
    dataIndex: 'escortLicence',
    scopedSlots: { customRender: 'escortLicenseState' }
  }]
}, {
  title: '车辆车头资质',
  children: [{
    title: '车牌号',
    width: 120,
    dataIndex: 'headStockPlateNumber',
  }, {
    title: '行驶证',
    width: 120,
    dataIndex: 'drivingLicence',
    scopedSlots: { customRender: 'drivingLicence' }
  }, {
    title: '使用性质',
    width: 120,
    dataIndex: 'userNature'
  }, {
    title: '危险化学品道路运输证',
    width: 120,
    dataIndex: 'roadTransLicence',
    scopedSlots: { customRender: 'headStockDangerLicenceState' }
  }, {
    title: '经营范围',
    width: 120,
    dataIndex: 'headStockBusinessScope'
  }]
}, {
  title: '车辆挂车资质',
  children: [{
    title: '车牌号',
    width: 120,
    dataIndex: 'trailerPlateNumber'
  }, {
    title: '危险化学品道路运输证',
    width: 120,
    dataIndex: 'dangerChemLicence',
    scopedSlots: { customRender: 'trailerDangerLicenceState' }
  }, {
    title: '经营范围',
    width: 120,
    dataIndex: 'trailerBusinessScope'
  }, {
    title: '罐体检测报告',
    width: 140,
    dataIndex: 'tankInspection',
    scopedSlots: { customRender: 'trailertankInspectionState' }
  }]
}, {
  title: '创建时间',
  width: 220,
  dataIndex: 'createTime'
}, {
  title: '提交时间',
  width: 220,
  dataIndex: 'entryTime',
}]

export default {
  data () {
    return {
      data: [],
      columns,
      form: this.$form.createForm(this),
      placeholder: ['开始时间', '结束时间'],
      isDownload: false,
      excelTitle: {
        '驾驶员': 'driver',
        '押运员': 'escort',
        '手机号码1': 'phone1',
        '手机号码2': 'phone2',
        '车头车牌号': 'carNo',
        '创建时间': 'createTime',
        '提交时间': 'submitTime'
      },
      pagination: {
        current: 1,
        pageSize: 5,
        total: 0,
        pageSizeOptions: ['5', '10', '15', '20']
      },
      loading: false,
      isDetailHide: true,
      nickName: '',
      welcomeTime: '早上好',
      nickAccount: '',
      accountRole: ''
    }
  },

  created () {
    let accountRole = sessionStorage.getItem('role')
    this.accountRole = accountRole
    this.getTime()
    let role = sessionStorage.getItem('companyName')
    this.nickName = role
    this.nickAccount = sessionStorage.getItem('account')
    if (sessionStorage.getItem('role') === 'admin') {
      this.isDownload = true
    }
    this.handleSubmit()
    if(this.$route.matched.length > 1) {
      this.isDetailHide = false
    } else {
      this.isDetailHide = true
    }
  },

  methods: {
    /**
     * 查询驾驶员资质
     */
    handleSubmit () {
      this.form.validateFields((err, values) => {
        if (!err) {
          this.fetch(Object.assign(values))
        }
      })
    },
    /**
     * 表格分页变化
     */
    handleTableChange (pagination) {
      const pager = { ...this.pagination }
      pager.pageNum = pagination.current
      this.pagination = pager
      this.form.validateFields((err, values) => {
        if (!err) {
          this.fetch(Object.assign(values))
        }
      })
    },
    /**
     * 请求后台数据方法
     * @param { Object } params 请求参数
     */
    fetch (values) {
      this.loading = true
      const submitValues = {
        ...values,
        'createTimeStart': (values.createTime && values.createTime.length !== 0 )? values.createTime[0].format('YYYY-MM-DD') + ' 00:00:00': null,
        'createTimeEnd': (values.createTime && values.createTime.length !== 0 )? values.createTime[1].format('YYYY-MM-DD') + ' 23:59:59': null,
        'entryTimeStart': (values.entryTime && values.entryTime.length !== 0 )? values.entryTime[0].format('YYYY-MM-DD') + ' 00:00:00': null,
        'entryTimeEnd': (values.entryTime && values.entryTime.length !== 0 )? values.entryTime[1].format('YYYY-MM-DD') + ' 23:59:59': null
      }
      delete submitValues.createTime
      delete submitValues.entryTime
      const pageParams = {
        pageNum: this.pagination.current,
        pageSize: this.pagination.pageSize
      }
      this.$api.list.getList(Object.assign(submitValues, pageParams)).then((res) => {
        if (res.code === 200) {
          const pagination = { ...this.pagination }
          pagination.total = res.data.total
          this.pagination = pagination
          this.data = res.data.list
        } else {
          this.data = []
          const pagination = { ...this.pagination }
          pagination.total = 0
          this.pagination = pagination
        }
        this.loading = false
      }).catch((e) => {
        this.loading = false
      })
    },
    showSizeChange (current, pageSize) {
      const pager = { ...this.pagination }
      pager.pageNum = current
      pager.current = current
      pager.pageSize = pageSize
      this.pagination = pager
      this.handleSubmit()
    },
    handlePageChange (current) {
      const pager = { ...this.pagination }
      pager.pageNum = current
      pager.current = current
      this.pagination = pager
      this.handleSubmit()
    },
    resetForm () {
      this.form.resetFields()
      this.handleSubmit()
    },
    getState(state) {
      if(state === '0'){
        return '新运单'
      }
      if(state === '1'){
        return '已提交资质'
      }
      if(state === '2'){
        return '已入厂'
      }
      return null
    },
    setValue(val) {
      if(val === '0'){
        return '未提供'
      }
      if(val === '1'){
        return '有效'
      }
      if(val === '2'){
        return '无效'
      }
      return null
    },
    getRdState(val) {
      if(val === '0'){
        return '装货'
      }
      if(val === '1'){
        return '送货'
      }
      return null
    },
    setState(val) {
      if(val === '未提供'){
        return 'default'
      }
      if(val === '有效'){
        return 'success'
      }
      if(val === '无效'){
        return 'error'
      }
    },
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
    },
  },
  watch: {
    $route (to, from) {
      if (to.matched.length > 1) {
        this.isDetailHide = false
      } else {
        this.isDetailHide = true
      }
    }
  }
}

</script>
<style scoped>
  #index_user_header {
    height: 80px;
    background: #fff;
    margin-bottom: 18px;
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
