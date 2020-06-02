<!--  -->
<template>
  <div id="index_user_content" v-if="isDetailHide">
    <a-table 
      :rowKey="record => record.recordId"
      :columns="columns"
      :dataSource="data"
      :loading="loading"
      :pagination="false"
      @change="handleTableChange"
      bordered
      :scroll="{ x: 2520 }" 
    >
      <template slot="carNo" slot-scope="text">
        <a href="javascript:;">{{text}}</a>
      </template>
      <template slot="abnormalVehicle" slot-scope="text">
        {{ text === 0? '否': '是'}}
      </template>
      <template slot="recordState" slot-scope="text">
        {{ getState(text) }}
      </template>
      <template slot="receiveOrDispatch" slot-scope="text">
        {{ getRdState(text)}}
      </template>

      <template slot="driverLicenseState" slot-scope="text,record">
        <a-badge :status="setState(text)" :text="setValue(text)" v-if="record.driverId === '' || record.driverId == null "/>
        <a @click="$router.push({ path: `/history/driver?id=${record.driverId}`})" v-else>
          <a-badge :status="setState(text)" :text="setValue(text)" />
        </a>
      </template>
      <template slot="driverDangerLicenceState" slot-scope="text,record">
        <a-badge :status="setState(text)" :text="setValue(text)" v-if="record.driverId === '' || record.driverId == null "/>
        <a @click="$router.push({ path: `/history/driver?id=${record.driverId}`})" v-else>
          <a-badge :status="setState(text)" :text="setValue(text)" />
        </a>
      </template>
      <template slot="escortLicenseState" slot-scope="text,record">
        <a-badge :status="setState(text)" :text="setValue(text)" v-if="record.escortId === '' || record.escortId == null "/>
        <a @click="$router.push({ path: `/history/escort?id=${record.escortId}`})" v-else>
          <a-badge :status="setState(text)" :text="setValue(text)" />
        </a>
      </template>
      <template slot="headStockDrivingLicenseState" slot-scope="text,record">
        <a-badge :status="setState(text)" :text="setValue(text)" v-if="record.headStockId === '' || record.headStockId == null "/>
        <a @click="$router.push({ path: `/history/headstock?id=${record.headStockId}`})" v-else>
          <a-badge :status="setState(text)" :text="setValue(text)" />
        </a>
      </template>
      <template slot="headStockDangerLicenceState" slot-scope="text,record">
        <a-badge :status="setState(text)" :text="setValue(text)" v-if="record.headStockId === '' || record.headStockId == null "/>
        <a @click="$router.push({ path: `/history/headstock?id=${record.headStockId}`})" v-else>
          <a-badge :status="setState(text)" :text="setValue(text)" />
        </a>
      </template>
      <template slot="trailerDangerLicenceState" slot-scope="text,record">
        <a-badge :status="setState(text)" :text="setValue(text)" v-if="record.trailerId === '' || record.trailerId == null "/>
        <a @click="$router.push({ path: `/history/trailer?id=${record.trailerId}`})" v-else>
          <a-badge :status="setState(text)" :text="setValue(text)" />
        </a>
      </template>
      <template slot="trailertankInspectionState" slot-scope="text">
        <a-badge :status="setState(text)" :text="setValue(text)" />
      </template>
      <template slot="title" >
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
            label="车牌号"
          >
            <a-input
              v-decorator="[
                'headStockPlateNumber'
              ]"
            />
          </a-form-item>
          <a-form-item
            label="所属公司"
          >
            <a-input
              v-decorator="[
                'ownedCompany'
              ]"
            />
          </a-form-item>
          <a-form-item>
            <a-button type="primary" icon="search" html-type="submit">查询</a-button>
          </a-form-item>
          <a-form-item>
            <a-button @click="resetForm">重置</a-button>
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
}, {
  title: '是否为异常车次',
  width: 110,
  dataIndex: 'abnormalVehicle',
  scopedSlots: { customRender: 'abnormalVehicle' },
}, {
  title: '车辆状态',
  width: 110,
  dataIndex: 'recordState ',
  scopedSlots: { customRender: 'recordState ' },
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
    dataIndex: 'driverLicenseState',
    scopedSlots: { customRender: 'driverLicenseState' }
  }, {
    title: '危险化学品运输资质',
    width: 120,
    dataIndex: 'driverDangerLicenceState',
    scopedSlots: { customRender: 'driverDangerLicenceState' }
  }, {
    title: '押运证',
    width: 120,
    dataIndex: 'escortLicenseState',
    scopedSlots: { customRender: 'escortLicenseState' }
  }]
}, {
  title: '车辆车头资质',
  children: [{
    title: '车牌号',
    width: 120,
    dataIndex: 'headStockPlateNumber'
  }, {
    title: '行驶证',
    width: 120,
    dataIndex: 'headStockDrivingLicenseState',
    scopedSlots: { customRender: 'headStockDrivingLicenseState' }
  }, {
    title: '使用性质',
    width: 120,
    dataIndex: 'headStockUserNature'
  }, {
    title: '危险化学品道路运输证',
    width: 120,
    dataIndex: 'headStockDangerLicenceState',
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
    dataIndex: 'trailerDangerLicenceState',
    scopedSlots: { customRender: 'trailerDangerLicenceState' }
  }, {
    title: '经营范围',
    width: 120,
    dataIndex: 'trailerBusinessScope'
  }, {
    title: '罐体检测报告',
    width: 120,
    dataIndex: 'trailertankInspectionState',
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
}, {
  title: '入厂时间',
  width: 220,
  dataIndex: 'enterTime',
}]

export default {
  data () {
    return {
      columns,
      data: [],
      form: this.$form.createForm(this),
      loading: false,
      pageSizeOptions: ['5', '10', '15', '20'],
      pagination: {
        current: 1,
        pageSize: 5,
        total: 0,
        pageSizeOptions: ['5', '10', '15', '20']
      },
      isDetailHide: true
    }
  },

  created() {
    this.handleSubmit()
  },

  methods: {
    /**
     * 查询驾驶员资质
     */
    handleSubmit (e) {
      this.form.validateFields((err, values) => {
        if (!err) {
          this.fetch(Object.assign(values, this.pagination))
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
          const submitVal = {
            startTime: values.opreaTime && values.opreaTime[0].format('YYYY-MM-DD hh:mm:ss'),
            endTime: values.opreaTime && values.opreaTime[1].format('YYYY-MM-DD hh:mm:ss'),
            modifyStaffName: values.modifyStaffName
          }
          this.fetch(Object.assign(submitVal, this.pagination))
        }
      })
    },
    /**
     * 请求后台数据方法
     * @param { Object } params 请求参数
     */
    fetch (params = {}) {
      delete params.pageSizeOptions && delete params.opreaTime
      this.loading = true
      this.$api.qualification.getAbnormal(params).then((res) => {
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
      }).catch(e => {
        this.$message.error(res.message)
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
    onClick (key) {
      this.$router.push({ path: `/transpotArrange/action?key=${key}&isSolved=true` })
    },
    getState(state) {
      if(state === 0){
        return '新运单'
      }
      if(state === 1){
        return '已提交资质'
      }
      if(state === 2){
        return '已入厂'
      }
      return null
    },
    setValue(val) {
      if(val === 0){
        return '未提供'
      }
      if(val === 1){
        return '有效'
      }
      if(val === 2){
        return '无效'
      }
      return null
    },
    getRdState(val) {
      if(val === 0){
        return '装货'
      }
      if(val === 1){
        return '送货'
      }
      return null
    },
    setState(val) {
      if(val === 0){
        return 'default'
      }
      if(val === 1){
        return 'success'
      }
      if(val === 2){
        return 'error'
      }
    },
    resetForm () {
      this.form.resetFields()
      this.handleSubmit()
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
   #index_user_content {
    background: #fff;
  }
</style>
