<template>
  <div>
    <a-table
      :rowKey="record => record.recordId"
      :columns="columns"
      :dataSource="data"
      :loading="loading"
      :pagination="false"
      bordered
    >
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
            label="运输单号"
          >
            <a-input
              v-decorator="[
              'businessId'
            ]"
            ></a-input>
          </a-form-item>
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
            label="提交时间"
          >
            <a-range-picker
              :placeholder="placeholder"
              format="YYYY/MM/DD"
              v-decorator="[
              'entryTime'
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
  title: '提交时间',
  dataIndex: 'entryTime'
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
      },
      submitValues: {}
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
      this.$router.push({ path: `/transpotArrange/disabledAction?recordId=${key.recordId}` })
    },
    /**
     * 查询已完成运单
     */
    handleSubmit (e) {

      this.form.validateFields((err, values) => {
        if (!err) {
          values = {
            ...values,
            startTime: (values.entryTime && values.entryTime.length !== 0 )? values.entryTime[0].format('YYYY-MM-DD') + ' 00:00:00': null,
            endTime: (values.entryTime && values.entryTime.length !== 0 )? values.entryTime[1].format('YYYY-MM-DD') + ' 23:59:59': null
          }
          values['entryTime'] = undefined
          if(sessionStorage.getItem('role') === '验证码登录用户') {
            this.fetchCodeLogin()
          } else {
            this.submitValues = values
            this.fetch()
          }
        }
      })
    },
    /**
     * 请求后台数据方法
     * @param { Object } params 请求参数
     */
    fetch () {
      const params = {
        pageNum: this.pagination.current,
        pageSize: this.pagination.pageSize,
        ...this.submitValues
      }
      this.loading = true
      this.$api.arrange.getEntryByCriteria(params).then((res) => {
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
      }).catch( e => {
        this.loading = false
      })
    },
    showSizeChange (current, pageSize) {
      const pager = { ...this.pagination }
      pager.pageNum = current
      pager.current = current
      pager.pageSize = pageSize
      this.pagination = pager
      this.fetch()
    },
    handlePageChange (current) {
      const pager = { ...this.pagination }
      pager.pageNum = current
      pager.current = current
      this.pagination = pager
      this.fetch()
    },
    /**
     * 验证码登录用户请求后台数据方法
     * @param { Object } params 请求参数
     */
    fetchCodeLogin () {
      this.loading = true
      this.$api.arrange.getTempRecordByState({
        recordState: 1
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
      this.submitValues = {}
      this.fetch()
    },
  }
}

</script>
<style lang='scss' scoped>
</style>