<!--  -->
<template>
  <div id="content">
    <a-form layout="inline" @submit="confirm" :form="form" style="margin-bottom:16px">
      <a-form-item label="推送频率" >
        <a-select
          style="width: 200px"
          @change="periodChange"
          v-decorator="[
            'period',
            {
              rules: [{ required: true, message: '请选择推送频率' }],
              initialValue: '1'
            }
          ]"
        >
          <a-select-option value="1">1周/1次</a-select-option>
          <a-select-option value="2">2周/1次</a-select-option>
          <a-select-option value="3">3周/1次</a-select-option>
          <a-select-option value="0">不推送</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item >
        <a-button type="primary" html-type="submit" :disabled="!hasSelected" :loading="confirmLoading" icon="thunderbolt">确认</a-button>
      </a-form-item>
      <!-- <a-form-item >
        <a-button @click="resetForm">重置</a-button>
      </a-form-item> -->
    </a-form>
    <a-table
      :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
      :rowKey="record => record.managerAccount"
      :columns="columns"
      :dataSource="data"
      :loading="loading"
      :pagination="false"
      bordered
    >
      <template slot="pushingFrequency" slot-scope="text">
        <span v-if="text === '0'">不推送</span>
        <span v-else><span style="color:#f5222d">{{text}}</span>周/1次</span>
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
  title: '公司',
  dataIndex: 'companyName'
}, {
  title: '用户',
  dataIndex: 'managerAccount'
}, {
  title: '推送频率',
  dataIndex: 'pushingFrequency',
  scopedSlots: { customRender: 'pushingFrequency' }
}]
export default {
  data () {
    return {
      form: this.$form.createForm(this),
      data: [],
      compangeName: [],
      managers: [],
      fetching: false,
      managerName:[],
      period: '',
      data: [],
      columns,
      pageSizeOptions: ['5', '10', '15', '20'],
      pagination: {
        pageNum: 1,
        pageSize: 10,
        total: 0,
        pageSizeOptions: ['5', '10', '15', '20']
      },
      loading: false,
      selectedRowKeys: [], // Check here to configure the default column
      loading: false,
      confirmLoading: false
    }
  },

  created() {
    this.fetch()
  },

  computed: {
    hasSelected() {
      return this.selectedRowKeys.length > 0
    }
  },

  methods: {
    fetch() {
      this.loading = true
      const val = {
        pageSize: this.pagination.pageSize,
        pageNum: this.pagination.pageNum
      }
      this.$api.auth.adminAuthInfo(val).then(res => {
        if(res.code === 200) {
          const pagination = { ...this.pagination }
          pagination.total = res.data.total
          this.pagination = pagination
          this.data = res.data.list
        } else {
          this.data = []
        }
        this.loading = false
      }).catch(e => {
        this.loading = false
      })
    },
    fetchCompany(value) {
      this.data = []
      this.fetching = true
      this.$api.pushingSetting.getCompany({
        companyName: value
      }).then(res => {
        this.data = res.data
        this.fetching = false
      }).catch(e => {
        console.log(e)
      })
    },
    fetchManager(params) {
      this.managers = []
      this.$api.pushingSetting.getManager({
        companyName: params
      }).then(res => {
        this.managers = res.data
      }).catch(e => {
        console.log(e)
      })
    },
    handleChange (value) {
      if(value.length < this.compangeName.length) {
        this.resetForm()
      }
      this.compangeName = []
      for(let i in value) {
        this.compangeName[i] = value[i].label
      }
      this.fetchManager(this.compangeName)
    },
    selectManager(value) {
      this.managerName = []
      for(let i in value) {
        this.managerName[i] = value[i].label
      }
    },
    periodChange(val) {
      this.period = val
    },
    confirm(e) {
      e.preventDefault();
      this.form.validateFieldsAndScroll((err, values) => {
        if (!err) {
          console.log(values)
          this.$api.pushingSetting.pushingSetting({
            manager: this.managerName,
            pushingFrequency: values.period
          }).then(res => {
            if(res.code === 200) {
              this.$message.success('设置成功！')
              this.fetch()
            } else {
              this.$message.error('设置失败！请重试')
            }
          })
        }
      })
    },
    validateManager(rule, value, callback) {
      const form = this.form;
      if (form.getFieldValue('companyName').length === 0) {
        callback('请先选择所属公司');
      }
      callback();
    },
    resetForm(){
      this.form.resetFields()
    },
    showSizeChange (current, pageSize) {
      const pager = { ...this.pagination }
      pager.pageNum = current
      pager.pageSize = pageSize
      this.pagination = pager
      this.fetch()
    },
    handlePageChange (current) {
      const pager = { ...this.pagination }
      pager.pageNum = current
      this.pagination = pager
      this.fetch()
    },
    onSelectChange(selectedRowKeys) {
      this.selectedRowKeys = selectedRowKeys
       this.managerName = selectedRowKeys
    }
  }
}

</script>
<style scoped>
  #content {
    background: #fff;
  }
  #content .title {
    color: #1890ff;
  }
</style>
