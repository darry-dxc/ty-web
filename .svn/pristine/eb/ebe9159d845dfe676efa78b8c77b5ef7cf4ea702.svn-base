<!--  -->
<template>
  <div id="content">
    <a-table
      :rowKey="record => record.backupId"
      :columns="columns"
      :dataSource="data"
      bordered
      :pagination="false"
      :loading="loading"
    >
      <template slot="no" slot-scope="recordNo">
        <a href="javascript:;">{{recordNo}}</a>
      </template>
      <template slot="title">
        <a-form
          layout="inline"
          :form="form"
          @submit="handleSubmit"
        >
          <a-form-item
            label="备份类型"
          >
            <a-select
              style="width: 200px"
              v-decorator="[
                'backupType',
                { initialValue: '全部'}
              ]"
            >
              <a-select-option value="全部">全部</a-select-option>
              <a-select-option value="数据库">数据库</a-select-option>
              <a-select-option value="图片">图片</a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item
            label="文件名"
          >
            <a-input
              v-decorator="[
                'backupName'
              ]"
            />
          </a-form-item>
          <a-form-item
            label="备份时间"
          >
            <a-range-picker
              format="YYYY/MM/DD"
               v-decorator="[
                'registerTime'
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
            <a-button @click="backup" :loading="backupLoading">备份</a-button>
          </a-form-item>
        </a-form>
      </template>
      <span slot="action" slot-scope="text,record,index">
        <a size="small" @click="download(record,index)" :disabled="record.isDownloading">下载</a>
        <a-popconfirm title="此操作将会删除该备份文件，是否继续?" @confirm="confirm(record)" @cancel="cancel">
          <a size="small" type="danger" style="marginLeft:14px; color: #f5222d">删除</a>
        </a-popconfirm>
      </span>
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
  title: '序号',
  dataIndex: 'recordNo',
  scopedSlots: { customRender: 'no' }
}, {
  title: '备份类型',
  dataIndex: 'backupType'
}, {
  title: '文件名',
  dataIndex: 'backupName'
}, {
  title: '备份时间',
  dataIndex: 'backupTime'
}, {
  title: '操作',
  key: 'action',
  scopedSlots: { customRender: 'action' }
}]

const data = []
export default {
  data () {
    return {
      data,
      columns,
      form: this.$form.createForm(this),
      loading: false,
      backupLoading: false,
      pagination: {
        pageNum: 1,
        pageSize: 5,
        total: 0,
        pageSizeOptions: ['5', '10', '15', '20']
      },
      spinning: false
    }
  },

  mounted() {
    this.handleSubmit()
  },

  methods: {
    //下载备份文件
    download(record,index) {
      this.$api.backup.backupDownload({
        remote: 'backup/' + record.backupName
      }).then(res => {
        console.log(res)
        const link = document.createElement("a")
        link.href = URL.createObjectURL(res)
        link.download = record.backupName // 这里填保存成的文件名
        document.body.append(link) //兼容火狐浏览器的写法
        link.click()
      　window.URL.revokeObjectURL(link)
      }).catch(e => {
      })
    },
    //备份文件
    backup(){
      this.form.validateFields((err, values) => {
        if (!err) {
          this.backupLoading = true
          this.$api.backup.backup({
            backupType: values.backupType
          }).then(res => {
            console.log(res)
            if(res.code === 200) {
              this.$message.success('成功备份文件！')
              this.handleSubmit()
            } else {
              this.$message.error('备份文件失败！请重试')
            }
            this.backupLoading = false
          }).catch(e => {
            this.backupLoading = false
          })
        }
      })
    },
    //查询存在的备份文件
    handleSubmit() {
      this.form.validateFields((err, values) => {
        if (!err) {
          const submitValues = {
            ...values,
            beginTime: (values.registerTime && values.registerTime.length !== 0 )? values.registerTime[0].format('YYYY-MM-DD') + ' 00:00:00': null,
            endTime: (values.registerTime && values.registerTime.length !== 0 )? values.registerTime[1].format('YYYY-MM-DD') + ' 23:59:59': null
          }
          this.fetch(Object.assign(submitValues, this.pagination))
        }
      })
    },
    //请求后台数据
    fetch (params = {}) {
      this.loading = true
      delete params.pageSizeOptions && delete params.registerTime
      this.$api.backup.backupQuery(params).then(
        res => {
          if (res.code === 200) {
            const pagination = { ...this.pagination }
            pagination.total = res.data.total
            this.pagination = pagination
            this.data = res.data.list
            for(let i = 0; i < this.data.length; i++) {
              this.data[i].recordNo = i + 1
              this.data[i].isDownloading = false
            }
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
    //重置查询
    resetForm () {
      this.form.resetFields()
      this.handleSubmit()
    },
    //分页条数控制
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
    //切换分页
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
    //删除备份文件
    confirm (record) {
      let params = {
        backupId: record.backupId
      }
      this.$api.backup.backupDelete(params).then(res => {
        if(res.code ===  200) {
          this.$message.success('成功删除备份文件!')
          this.handleSubmit()
        } else {
          this.$message.error('删除备份文件失败!请重试')
        }
      })
    },
    cancel (e) {
      // console.log(e)
    }
  }
}

</script>
<style scoped>
  #content {
    background: #fff;
  }
</style>
