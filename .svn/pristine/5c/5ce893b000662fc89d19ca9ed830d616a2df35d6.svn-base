<template>
  <div>
    <a-modal
      title="驾驶员资质"
      :visible="visible"
      @ok="handleOk"
      :confirmLoading="confirmLoading"
      @cancel="visible = false"
      :width="680"
      :okText="okText"
      cancelText="取消"
    >
      <a-form
        :form="form"
        id="actionForm"
      >
        <a-form-item
          label="姓名"
          :label-col="labelCol"
          :wrapper-col="wrapperCol"
        >
          <a-input
            v-decorator="[
              'driverName',
              {rules: [{ required: true, message: '请输入驾驶员姓名!' }]}
            ]"
            :disabled="isComplete"
          />
        </a-form-item>
        <a-form-item
          label="手机号码1"
          :label-col="labelCol"
          :wrapper-col="wrapperCol"
        >
          <a-input
            v-decorator="[
              'phone1',
              {rules: [{ required: true, message: '请输入手机号码1!' }, { validator: validatePhone }]}
            ]"
            :disabled="isComplete"
          />
        </a-form-item>
        <a-form-item
          label="手机号码2"
          :label-col="labelCol"
          :wrapper-col="wrapperCol"
        >
          <a-input
            v-decorator="[
              'phone2',
              {rules: [{ validator: validatePhone }]}
            ]"
            :disabled="isComplete"
          />
        </a-form-item>
        <a-form-item
          label="驾驶证编号"
          :label-col="labelCol"
          :wrapper-col="wrapperCol"
        >
          <a-input
            v-decorator="[
              'driverLicenceNumber',
              {rules: [{ required: true, message: '请输入驾驶证编号!' }, { validator: validateDriverLicenceNumber }]}
            ]"
            :disabled="isComplete"
          />
        </a-form-item>
        <a-form-item
          label="驾驶证有效期止"
          :label-col="labelCol"
          :wrapper-col="wrapperCol"
        >
          <a-date-picker
            placeholder="选择日期"
            style="width:100%"
            v-decorator="[
              'driverLicenceValidDate',
              {rules: [{ required: true, message: '请选择驾驶证有效期止!' }]}
            ]"
            :disabled="isComplete"
          />
        </a-form-item>
        <a-form-item
          label="道路危险货物运输驾驶证编号"
          :label-col="labelCol"
          :wrapper-col="wrapperCol"
        >
          <a-input
            v-decorator="[
              'dangerLicenceNumber',
              {rules: [{ required: true, message: '请输入道路危险货物运输驾驶证编号!' }]}
            ]"
            :disabled="isComplete"
          />
        </a-form-item>
        <a-form-item
          label="道路危险货物运输驾驶证有效期止"
          :label-col="labelCol"
          :wrapper-col="wrapperCol"
        >
          <a-date-picker
            placeholder="选择日期"
            style="width:100%"
             v-decorator="[
              'dangerLicenceValidDate',
              {rules: [{ required: true, message: '请选择道路危险货物运输驾驶证有效期止!' }]}
            ]"
            :disabled="isComplete"
          />
        </a-form-item>
        <a-form-item
          label="驾驶证附件上传"
          :label-col="labelCol"
          :wrapper-col="wrapperCol"
        >
          <a-upload
            :remove="remove"
            accept="image/*"
            :action="action"
            :headers="headers"
            @change="driverLicenceAttachmentUpload"
            :fileList="driverLicenceFileList"
            :data="driverLicenceAttachmentUploadData"
            :beforeUpload="beforeDriverLicenceAttachmentUpload"
            v-decorator="[
              'driverLicenceAttachment',
              {rules: [{ required: true, message: '请上传道路危险货物运输驾驶证附件!' }]}
            ]"
          >
            <a-button>
              <a-icon type="upload" /> 点击上传
            </a-button>
          </a-upload>
        </a-form-item>
        <a-form-item
          label="道路危险货物运输驾驶证附件上传"
          :label-col="labelCol"
          :wrapper-col="wrapperCol"
        >
          <a-upload
            :remove="remove"
            accept="image/*"
            :action="action"
            :headers="headers"
            :fileList="dangerLicenceFileList"
            :data="dangerLicenceAttachmentUploadData"
            @change="dangerLicenceAttachmentUpload"
            :beforeUpload="beforeDangerLicenceAttachmentUpload"
            v-decorator="[
              'dangerLicenceAttachment',
              {rules: [{ required: true, message: '请上传道路危险货物运输驾驶证附件!' }]}
            ]"
          >
            <a-button>
              <a-icon type="upload" /> 点击上传
            </a-button>
          </a-upload>
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script>
import { resolve, reject } from 'q';
export default {
  data () {
    return {
      driverId: '', // 驾驶员id
      visible: false,
      isEdit: false,
      isComplete: false,
      confirmLoading: false,
      okText: '创建资质',
      form: this.$form.createForm(this),
      labelCol: {
        xs: { span: 24 },
        sm: { span: 10 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 }
      },
      headers: {},
      action: '',
      driverLicenceFileList: [],
      dangerLicenceFileList: [],
      driverLicenceAttachmentUrl: '',
      dangerLicenceAttachmentUrl: '',
      driverLicenceAttachmentUploadData: {},
      dangerLicenceAttachmentUploadData: {}
    }
  },

  created() {
    this.headers['access-token'] = sessionStorage.getItem('token')
    if(process.env.NODE_ENV === 'production') {
      this.action = this.$baseUrl + 'entrystaff/fileUpload'
    } else {
      this.action = '/api/entrystaff/fileUpload'
    }
  },

  methods: {
    handleOk (e) {
      this.form.validateFields((err, values) => {
        if (err) {
          console.log('err')
          return
        }
        this.confirmLoading = true
        const submitValues = {
          ...values,
          'driverLicenceValidDate': values['driverLicenceValidDate'].format('YYYY-MM-DD'),
          'dangerLicenceValidDate': values['dangerLicenceValidDate'].format('YYYY-MM-DD'),
          'driverLicenceAttachment': this.driverLicenceAttachmentUrl,
          'dangerLicenceAttachment': this.dangerLicenceAttachmentUrl
        }
        if (this.isEdit) {
          if (this.isComplete){
            this.$api.qualification.updateDriver(Object.assign({ driverId: this.driverId }, submitValues)).then((res) => {
            if (res.code === 200) {
              this.$message.success('成功完善驾驶员资质!')
              this.$emit('completeDriverSuccess')
              this.visible = false
            } else {
              this.$message.error(res.message)
            }
          })
            this.confirmLoading = false
          }else{
            this.$api.qualification.updateDriver(Object.assign({ driverId: this.driverId }, submitValues)).then((res) => {
            if (res.code === 200) {
              this.$message.success('成功更新驾驶员资质!')
              this.$emit('updateDriverSuccess')
              this.visible = false
            } else {
              this.$message.error(res.message)
            }
          })
          this.confirmLoading = false
          }
        } else {
          this.$api.qualification.newDriver(submitValues).then((res) => {
            if (res.code === 200) {
              this.$message.success('成功添加驾驶员资质!')
              this.$emit('newDriverSuccess')
              this.visible = false
            } else {
              this.$message.error(res.message)
            }
            this.confirmLoading = false
          })
        }
      })
    },
    //驾驶证附件上传动作
    driverLicenceAttachmentUpload(file) {
      let fileList = file.fileList;
      console.log(1111111111111)
      console.log(fileList)
      fileList = fileList.slice(-1);
      console.log(fileList)
      this.driverLicenceFileList = fileList
      if(file.fileList[0].response && file.fileList[0].response.code === 200) {
         this.driverLicenceAttachmentUrl = file.fileList[0].response.data.fileUrl
      }
    },
     //驾道路危险货物运输驾驶证附件上传动作
    dangerLicenceAttachmentUpload (file) {
      let fileList = file.fileList;
      fileList = fileList.slice(-1);
      this.dangerLicenceFileList = fileList;
      if(file.fileList[0].response && file.fileList[0].response.code === 200) {
        this.dangerLicenceAttachmentUrl = file.fileList[0].response.data.fileUrl
      }
    },
    //驾驶证附件上传携带参数
    beforeDriverLicenceAttachmentUpload(file) {
      return new Promise((resolve, reject) => {
        if(this.driverLicenceFileList.length !== 0 && this.driverLicenceFileList[0].name !== 'null') {
          this.driverLicenceAttachmentUploadData = {
            fileType: '1',
            fileName: this.driverLicenceFileList[0].name,
            flag: 1
          }
          resolve(file)
        } else {
          this.driverLicenceAttachmentUploadData = {
            fileType: '1',
            fileName: file.name,
            flag: 0
          }
          resolve(file)
        }
      })
    },
    //道路危险货物运输驾驶证附件上传携带参数
    beforeDangerLicenceAttachmentUpload(file) {
      return new Promise((resolve, reject) => {
        if(this.dangerLicenceFileList.length !== 0 && this.dangerLicenceFileList[0].name !== 'null') {
          this.dangerLicenceAttachmentUploadData = {
            fileType: '2',
            fileName: this.dangerLicenceFileList[0].name,
            flag: 1
          }
          resolve(file)
        } else {
          this.dangerLicenceAttachmentUploadData = {
            fileType: '2',
            fileName: file.name,
            flag: 0
          }
          resolve(file)
        }
      })
    },
    /**
     * 手机号校验规则
     */
    validatePhone (rule, value, callback) {
      const form = this.form
      const reg = /^1[34578]\d{9}$/
      if (value && !reg.test(value)) {
        callback('请输入正确格式的手机号码!')
      } else {
        callback()
      }
    },
    /**
     * 驾驶证校验规则
     */
    validateDriverLicenceNumber (rule, value, callback) {
      const form = this.form
      const reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/
      if (!reg.test(value)) {
        callback('请输入正确格式的驾驶证编号!')
      } else {
        callback()
      }
    },
    remove() {
      if (this.isEdit) {
        return false
      }
    }
  }
}

</script>
<style scoped>
  #actionForm .ant-form-item{
    margin-bottom: 4px;
  }
</style>
