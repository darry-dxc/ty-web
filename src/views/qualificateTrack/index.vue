<!--  -->
<template>
  <div id="index_user_content">
    <a-table 
      :rowKey="record => record.modifyRecordId"
      :columns="columns"
      :dataSource="data"
      :loading="loading"
      :pagination="false"
      @change="handleTableChange"
      bordered
    >
      <template slot="name" slot-scope="text">
        <span>{{text}}</span>
      </template>
      <template slot="title">
        <a-form
          layout="inline"
          :form="form"
          @submit="handleSubmit"
        >
          <a-form-item
            label="操作人姓名"
          >
             <a-input
              v-decorator="[
                'modifyStaffName'
              ]"
            />
          </a-form-item>
          <a-form-item
            label="操作时间"
          >
            <a-range-picker
              format="YYYY/MM/DD"
              v-decorator="[
                'opreaTime'
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
</template>

<script>
const columns = [{
  title: '操作人姓名',
  dataIndex: 'modifyStaffName',
  scopedSlots: { customRender: 'name' }
}, {
  title: '操作描述',
  dataIndex: 'modifyContent'
}, {
  title: '操作时间',
  dataIndex: 'modifyTime'
}]

const data = []
export default {
  data () {
    return {
      columns,
      data,
      form: this.$form.createForm(this),
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
          const submitVal = {
            startTime: (values.opreaTime && values.opreaTime.length !== 0 )? values.opreaTime[0].format('YYYY-MM-DD') + ' 00:00:00': null,
            endTime: (values.opreaTime && values.opreaTime.length !== 0 )? values.opreaTime[1].format('YYYY-MM-DD') + ' 23:59:59': null,
            modifyStaffName: values.modifyStaffName
          }
          this.fetch(Object.assign(submitVal, this.pagination))
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
            startTime: (values.createTime && values.createTime.length !== 0 )? values.createTime[0].format('YYYY-MM-DD') + ' 00:00:00': null,
            endTime: (values.createTime && values.createTime.length !== 0 )? values.createTime[1].format('YYYY-MM-DD') + ' 23:59:59': null,
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
      this.$api.qualification.getHistory(params).then((res) => {
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
    resetForm () {
      this.form.resetFields()
      this.handleSubmit()
    },
  }
}

</script>
<style scoped>
  #index_user_content {
    background: #fff;
  }
</style>
