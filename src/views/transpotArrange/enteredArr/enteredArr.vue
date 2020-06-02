<template>
  <div>
    <a-table
      :rowKey="record => record.recordId"
      :columns="columns"
      :dataSource="data"
      :loading="loading"
      :pagination="false"
      @change="handleTableChange"
      bordered>
      <template slot="name" slot-scope="text, record">
        <a href="javascript:;" @click="onClick(record)" :disabled="record.driverId === '' || record.driverId === null">{{text}}</a>
      </template>
      <template slot="title" v-if="isCodeLogin">
        <a-form
          layout="inline"
          :form="form"
          ref="form"
          @submit="handleSubmit"
        >
          <a-form-item
            label="驾驶员姓名"
          >
            <a-input
              v-decorator="[
              'driverName'
            ]"
            ></a-input>
          </a-form-item>
          <a-form-item
            label="车头车牌号"
          >
            <a-input
              v-decorator="[
              'headStockPlateNumber'
            ]"
            ></a-input>
          </a-form-item>
          <a-form-item
            label="运单所属公司"
          >
            <a-input
              v-decorator="[
              'ownedCompany'
            ]"
            ></a-input>
          </a-form-item>
          <a-form-item
            label="入厂时间"
          >
            <a-range-picker
              :placeholder="placeholder"
              format="YYYY/MM/DD"
              v-decorator="[
              'enterTime'
            ]"></a-range-picker>
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
      v-if="isCodeLogin"
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
</template>

<script>
const columns = [{
  title: '运输单号',
  dataIndex: 'businessId',
  scopedSlots: { customRender: 'name' }
}, {
  title: '驾驶员姓名',
  dataIndex: 'driverName',
}, {
  title: '驾驶员手机号码1',
  dataIndex: 'driverPhone1'
}, {
  title: '驾驶员手机号码2',
  dataIndex: 'driverPhone2'
}, {
  title: '车头车牌号',
  dataIndex: 'headStockPlateNumber'
}, {
  title: '运单所属公司',
  dataIndex: 'ownedCompany'
}, {
  title: '入厂时间',
  dataIndex: 'enterTime'
}]

export default {
  data () {
    return {
      data: [],
      columns,
      form: this.$form.createForm(this),
      placeholder: ['开始时间', '结束时间'],
      loading: false,
      pageSizeOptions: ['5', '10', '15', '20'],
      pagination: {
        current: 1,
        pageSize: 5,
        total: 0,
        pageSizeOptions: ['5', '10', '15', '20']
      }
    }
  },

  created () {
    if(sessionStorage.getItem('role') === '验证码登录用户') {
      this.isCodeLogin = false
    } else {
      this.isCodeLogin = true
    }
    this.handleSubmit()
  },

  methods: {
    onClick (key) {
      this.$router.push({ 
        path: '/transpotArrange/disabledAction', 
        query:{
          recordId: key.recordId
        }
      })
    },
    /**
     * 查询已入厂运单
     */
    handleSubmit (e) {
      this.form.validateFields((err, values) => {
        if (!err) {
          values = {
            ...values,
            startTime: (values.enterTime && values.enterTime.length !== 0 )? values.enterTime[0].format('YYYY-MM-DD') + ' 00:00:00': null,
            endTime: (values.enterTime && values.enterTime.length !== 0 )? values.enterTime[1].format('YYYY-MM-DD') + ' 23:59:59': null
          }
          values['enterTime'] = undefined
          if(sessionStorage.getItem('role') === '验证码登录用户') {
            this.fetchCodeLogin()
          } else {
            this.fetch(Object.assign(values, this.pagination))
          }
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
          this.fetch(Object.assign(values, this.pagination))
        }
      })
    },
    /**
     * 请求后台数据方法
     * @param { Object } params 请求参数
     */
    fetch (params = {}) {
      delete params.pageSizeOptions // 请求时移除参数中的数组对象，否则会抛出后台错误
      this.loading = true
      this.$api.arrange.getEnterByCriteria(params).then((res) => {
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
    /**
     * 验证码登录用户请求后台数据方法
     * @param { Object } params 请求参数
     */
    fetchCodeLogin () {
      this.loading = true
      this.$api.arrange.getTempRecordByState({
        recordState: 2
      }).then((res) => {
        if (res.code === 200) {
          const pagination = { ...this.pagination }
          pagination.total = 1
          this.pagination = pagination
          this.data =[res.data]
        } else {
          this.data = []
          const pagination = { ...this.pagination }
          pagination.total = 0
          this.pagination = pagination
        }
        this.loading = false
      }).catch(e => {
        this.loading = false
      })
    },
    resetForm () {
      this.form.resetFields()
      this.handleSubmit()
    },
  }
}

</script>
<style lang='scss' scoped>
</style>
