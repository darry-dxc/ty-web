<template>
  <div>
    <a-table
      :rowKey="record => record.managerLogId"
      :columns="columns"
      :dataSource="data"
      :loading="loading"
      :pagination="false"
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
            label="用户名"
          >
            <a-input
              v-decorator="[
                'managerAccount'
              ]"
            />
          </a-form-item>
          <a-form-item
            label="所属公司"
          >
            <a-input
              v-decorator="[
                'companyName'
              ]"
            />
          </a-form-item>
          <a-form-item
            label="操作类型"
          >
            <a-input
              v-decorator="[
                'operateType'
              ]"
            />
          </a-form-item>
          <a-form-item
            label="操作时间"
          >
            <a-range-picker
              :placeholder="placeholder"
              format="YYYY/MM/DD"
              v-decorator="[
                'operateTime'
              ]"
            />
          </a-form-item>
          <a-form-item>
            <a-button type="primary" icon="search" html-type="submit">查询</a-button>
          </a-form-item>
          <a-form-item>
            <a-button @click="resetForm">重置</a-button>
          </a-form-item>
          <a-form-item>
           <a-button icon="download" @click="exportExcel" :loading="exportLoading">列表导出</a-button>
          </a-form-item>
        </a-form>
      </template>
    </a-table>
    <a-pagination
      :current="pagination.pageNum"
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
  title: '用户名',
  dataIndex: 'managerName',
  scopedSlots: { customRender: 'name' }
}, {
  title: '所属公司',
  dataIndex: 'companyName'
}, {
  title: '操作类型',
  dataIndex: 'operateType'
}, {
  title: '操作描述',
  dataIndex: 'operateContent'
}, {
  title: '操作时间',
  dataIndex: 'operateTime'
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
        pageNum: 1,
        pageSize: 5,
        total: 0,
        pageSizeOptions: ['5', '10', '15', '20']
      },
      exportLoading: false,
    }
  },

  components: {},

  created(){
    this.fetch()
  },

  methods: {
    onClick (key) {},
    handleSubmit () {
      this.form.validateFields((err, values) => {
        if (!err) {
          const submitValues = {
            ...values,
            beginTime: (values.operateTime && values.operateTime.length !== 0 )? values.operateTime[0].format('YYYY-MM-DD') + ' 00:00:00': null,
            endTime: (values.operateTime && values.operateTime.length !== 0 )? values.operateTime[1].format('YYYY-MM-DD') + ' 23:59:59': null
          }
          delete submitValues.operateTime
          this.fetch(Object.assign(submitValues, this.pagination))
        }
      })
    },
    fetch (params = {}) {
      this.loading = true
      delete params.pageSizeOptions && delete params.operateTime
      this.$api.logs.adminLogs(params).then(
        res => {
          console.log(res)
          if (res.code === 200) {
            const pagination = { ...this.pagination }
            pagination.total = res.data.total
            this.pagination = pagination
            this.data = res.data.list
          } else {
            this.data = []
          }
          this.loading = false
        }
      ).catch(e => {
        this.loading = false
        this.$message.error(e.data)
      })
    },
    resetForm () {
      this.form.resetFields()
      this.handleSubmit()
    },
    showSizeChange (current, pageSize) {
      const pager = { ...this.pagination }
      pager.pageNum = current
      pager.pageSize = pageSize
      this.pagination = pager
      this.form.validateFields((err, values) => {
        if (!err) {
          this.fetch(Object.assign(values, this.pagination))
        }
      })
    },
    handlePageChange (current) {
      const pager = { ...this.pagination }
      pager.pageNum = current
      this.pagination = pager
      this.form.validateFields((err, values) => {
        if (!err) {
          this.fetch(Object.assign(values, this.pagination))
        }
      })
    },
    exportExcel() {
      this.exportLoading = true
      const values = this.form.getFieldsValue()
      const submitValues = {
        ...values,
        beginTime: (values.operateTime && values.operateTime.length !== 0 )? values.operateTime[0].format('YYYY-MM-DD HH:mm:ss'): null,
        endTime: (values.operateTime && values.operateTime.length !== 0 )? values.operateTime[1].format('YYYY-MM-DD HH:mm:ss'): null
      }
      delete submitValues.operateTime
      this.$api.logs.adminLogsExport(submitValues).then(res => {
        if(res.code === 200) {
          const fields = this.$XLSX.utils.json_to_sheet(res.data)
          const wb = this.$XLSX.utils.book_new()
          this.$XLSX.utils.book_append_sheet(wb, fields, 'sheet1')
          let name = '管理层用户日志' + this.$moment(new Date()).format('YYYY-MM-DD') +'.xlsx'
          this.$XLSX.writeFile(wb, name)
        } else {
          this.$message.error(res.message)
        }
        this.exportLoading = false
      })
    }
  }
}

</script>
<style scoped>
</style>
