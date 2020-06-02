<template>
  <div>
    <a-table
      :rowKey="record => record.managerId"
      :columns="columns"
      :dataSource="data"
      :loading="loading"
      :pagination="false"
      bordered
    >
      <template slot="name" slot-scope="text">
        {{text}}
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
            label="注册时间"
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
        </a-form>
      </template>
      <span slot="action" slot-scope="text, record">
        <a-popconfirm title="确定更改用户状态?" @confirm="confirm(record)" okText="是" cancelText="否">
          <a :style="record.enabled === '1'? 'color:#f5222d': ''">{{record.enabled === '1'? '停用': '启用'}}</a>
        </a-popconfirm>
        <a style="marginLeft:18px" @click="edit(record)">编辑</a>
      </span>
      <template slot="footer">
        <a-button type="primary" @click="handleAdd" style="margin-right: 16px" disabled>添加成员</a-button>
        <a-tooltip placement="bottom" >
          <template slot="title">
              <span>管理层用户导入模板下载</span>
          </template>
            <a-button type="primary" style="margin-right: 8px" @click="downloadExcel"><a-icon type="copy" /></a-button>
        </a-tooltip>
        <a-upload
          name="file"
          :multiple="false"
          :action="action"
          :headers="headers"
          :fileList="fileList"
          accept=".xls, .xlsx"
          @change="handleChange"
        >
          <a-button type="primary">
            <a-icon type="file-excel" /> 批量导入
          </a-button>
          <span class="tip">请先下载模板，只能上传excel文件，且不超过10M</span>
        </a-upload>
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
    <a-modal
      title="权限修改"
      v-model="visible"
      @ok="handleOk"
      centered
      okText="确认"
      cancelText="取消"
    >
      <a-tree
        checkable
        @check="onCheck"
        v-model="checkedKeys"
        :selectedKeys="selectedKeys"
        :treeData="treeData"
      />
    </a-modal>
    <addModal ref="addModal" @newUser="newAdmin"/>
  </div>
</template>

<script>
import addModal from '../components/addModal'
import { baseUrl} from '../../../../utils/config.js'
const columns = [{
  title: '用户名',
  dataIndex: 'managerAccount',
  scopedSlots: { customRender: 'name' }
}, {
  title: '所属公司',
  dataIndex: 'companyName'
}, {
  title: '注册时间',
  dataIndex: 'registerTime'
}, {
  title: '操作',
  key: 'action',
  scopedSlots: { customRender: 'action' }
}]

export default {
  data () {
    return {
      data: [],
      columns,
      form: this.$form.createForm(this),
      canUse: true,
      visible: false,
      count: 0,
      headers: {},
      fileList: [],
      action: '',
      loading: false,
      pageSizeOptions: ['5', '10', '15', '20'],
      pagination: {
        pageNum: 1,
        pageSize: 5,
        total: 0,
        pageSizeOptions: ['5', '10', '15', '20']
      },
      checkedKeys: [],
      selectedKeys: [],
      treeData: [],
      managerAccount: '',
      userName: ''
    }
  },

  components: {
    addModal
  },

  created () {
    this.headers['access-token'] = sessionStorage.getItem('token')
     if(process.env.NODE_ENV === 'production') {
      this.action = baseUrl + 'loginRegister/import/managers'
    } else {
      this.action = '/api/loginRegister/import/managers'
    }
    this.handleSubmit()
    this.getCompany()
  },

  methods: {
    handleAdd () {
      this.$refs.addModal.visible = true
    },
    newAdmin () {},
    handleSubmit () {
      this.form.validateFields((err, values) => {
        if (!err) {
          const submitValues = {
            ...values,
            beginTime: (values.registerTime && values.registerTime.length !== 0 )? values.registerTime[0].format('YYYY-MM-DD') + ' 00:00:00': null,
            endTime: (values.registerTime && values.registerTime.length !== 0 )? values.registerTime[1].format('YYYY-MM-DD') + ' 23:59:59': null
          }
          delete submitValues.registerTime
          this.fetch(Object.assign(submitValues, this.pagination))
        }
      })
    },
    fetch (params = {}) {
      this.loading = true
      delete params.pageSizeOptions
      this.$api.auth.adminAuthInfo(params).then(
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
    handleChange (e) {
      this.fileList = e.fileList
      console.log(e)
      if (e.file.response) {
        if (e.file.error) {
          this.$message.error('服务器异常')
          return
        }
        if (e.file.response.code === 200) {
          let data = e.file.response.data
          if (data.length === 0) {
            const modal = this.$modal.success({
              title: '账号添加成功！'
            })
          } else {
            const modal = this.$modal.error({
              title: '以下账号未能添加成功：',
              content: (
                <div style="max-height: 360px; overflow: auto; padding: 16px 16px 16px 0">
                  {data.map((item) => {
                    if (item.account !== null) {
                      return <div class="alert">账号：<span style="color: red">{item.account}</span>，错误原因：{item.state}</div>
                    } else {

                    }
                  })}
                </div>
              ),
              width: '480px'
            })
          }
          this.handleSubmit()
          this.fileList = []
        } else {
          // 错误处理
        }
      }
    },
    confirm(record) {
      let flag = ''
      if(record.enabled === '1'){
        flag = '0'
      } else {
        flag = '1'
      }
      this.$api.auth.isAdminUse({
        managerAccount: record.managerAccount,
        enabled: flag
      }).then(res => {
        console.log(res)
        if(res.code === 200) {
          this.$message.success('操作成功！')
        }
        this.handleSubmit()
      })
    },
    resetForm () {
      this.form.resetFields()
      this.handleSubmit()
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
    onCheck (checkedKeys) {
      this.checkedKeys = checkedKeys
    },
    edit(value) {
      this.managerAccount = value.managerAccount
      this.userName = value.managerAccount
      if(value.enableSeeCompanys === '') {
        this.checkedKeys = []
      } else {
        this.checkedKeys = value.enableSeeCompanys.split(',')
      }
      this.visible = true
    },
    getCompany() {
      this.$api.pushingSetting.getCompany().then(res => {
        if(res.code === 200) {
          const treeData = []
          this.treeData = res.data.map(item => {
            return item = {
              title: item,
              key: item
            }
          })
        }
      })
    },
    handleOk() {
      this.$api.auth.permissionManager({
        managerAccount: this.managerAccount,
        companys: this.checkedKeys,
        userName: [this.userName]
      }).then(res => {
        if(res.code === 200) {
          this.$message.success('操作成功!')
          this.handleSubmit()
          this.visible = false
        } else {
          this.$message.error(res.message)
          this.visible = false
        }
      }).catch(e => {
        this.visible = false
      })
    },
    downloadExcel() {
      const data = [{
        '账户': '首字符英文、由英文字符以及数字组成',
        '手机号': '',
        '邮箱': '',
        '密码': '',
        '所属公司': '',
        '可以查看的公司': ''
      }]
      const fields = this.$XLSX.utils.json_to_sheet(data)
      const wb = this.$XLSX.utils.book_new()
      this.$XLSX.utils.book_append_sheet(wb, fields, 'sheet1')
      let name = '管理层用户导入模板.xlsx'
      this.$XLSX.writeFile(wb, name)
    }
  }
}

</script>
<style scoped>
  .tip {
    font-size: 8px;
    color: red;
    margin-left: 8px
  }
  .alert {
    background-color: #fff1f0;
    font-size: 14px;
    font-variant: tabular-nums;
    line-height: 1.5;
    color: rgba(0, 0, 0, 0.65);
    box-sizing: border-box;
    margin: 0;
    margin-bottom: 0px;
    padding: 0;
    list-style: none;
    position: relative;
    padding: 8px 15px 8px 37px;
    border-radius: 4px;
    margin-bottom: 16px;
  }
</style>
