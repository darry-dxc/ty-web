<template>
  <div id="infoForm">
    <a-form
      :form="form"
      @submit="handleSubmit"
    >
      <a-divider orientation="left" style="fontSize:18px;color:#1890ff">驾驶员基本信息</a-divider>
      <a-form-item
        label="驾驶员姓名"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
      >
        <a-input
          readOnly
          v-decorator="[
            'driverName',
            {rules: [{ required: true, message: '请输入驾驶员姓名!' }]}
          ]"
        />
      </a-form-item>
      <a-form-item
        label="驾驶员手机号码1"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
      >
        <a-input
          readOnly
          v-decorator="[
            'phone1',
            {rules: [{ required: true, message: '请输入手机号码!' },{ validator: validatePhone }]}
          ]"
        />

      </a-form-item>
      <a-form-item
        label="驾驶员手机号码2"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
      >
        <a-input
          :readOnly="isDriverDisabled"
          v-decorator="[
            'phone2',
            {rules: [{ validator: validatePhone }]}
          ]"
        />
      </a-form-item>
      <a-form-item
        label="驾驶证编号"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
      >
        <a-input
          :readOnly="isDriverDisabled"
          v-decorator="[
            'driverLicenceNumber',
            {rules: [{ required: true, message: '请输入驾驶证编号!' },{ validator: validateDriverLicenceNumber }]}
          ]"
        />
      </a-form-item>
      <a-form-item
        label="驾驶证有效期止"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
      >
        <a-date-picker
          :disabled="isDriverDisabled"
          placeholder="选择日期"
          style="width:100%"
          v-decorator="[
            'driverLicenceValidDate',
            {rules: [{ required: true, message: '请选择驾驶证有效期止!' }]}
          ]">
        </a-date-picker>
      </a-form-item>
      <a-form-item
        label="道路危险货物运输驾驶证编号"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
      >
        <a-input
          :readOnly="isDriverDisabled"
          v-decorator="[
            'dangerLicenceNumber',
            {rules: [{ required: true, message: '请输入道路危险货物运输驾驶证编号!' }]}
          ]"
        />
      </a-form-item>
      <a-form-item
        label="道路危险货物运输驾驶证编号有效期止"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
      >
        <a-date-picker
          :disabled="isDriverDisabled"
          placeholder="选择日期"
          style="width:100%"
          v-decorator="[
            'dangerLicenceValidDate',
            {rules: [{ required: true, message: '请选择道路危险货物运输驾驶证编号有效期止!' }]}
          ]"
        />
      </a-form-item>
      <a-form-item
        label="驾驶证附件上传"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
      >
        <a-upload
          :remove="isRemove"
          accept="image/*"
          :action="action"
          :headers="headers"
          @change="driverLicenceAttachmentUpload"
          :fileList="driverLicenceFileList"
          :beforeUpload="beforeDriverLicenceAttachmentUpload"
          :data="driverLicenceAttachmentUploadData"
          v-decorator="[
            'driverLicenceAttachment',
            {rules: [{ required: true, message: '请上传驾驶证附件!' }]}
          ]"
        >
          <a-button :disabled="isDriverDisabled">
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
          :remove="isRemove"
          accept="image/*"
          :action="action"
          :headers="headers"
          @change="dangerLicenceAttachmentUpload"
          :fileList="dangerLicenceFileList"
          :beforeUpload="beforeDangerLicenceAttachmentUpload"
          :data="dangerLicenceAttachmentUploadData"
          v-decorator="[
            'dangerLicenceAttachment',
            {rules: [{ required: true, message: '请上传道路危险货物运输驾驶证附件!' }]}
          ]"
        >
          <a-button :disabled="isDriverDisabled">
            <a-icon type="upload" /> 点击上传
          </a-button>
        </a-upload>
      </a-form-item>
      <a-divider orientation="left" style="fontSize:18px;color:#1890ff">押运员基本信息</a-divider>
      <a-form-item
        label="押运员姓名"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
      >
        <a-input
          :readOnly="isEscortDisabled"
          v-decorator="[
            'escortName',
            {rules: [{ required: true, message: '请输入押运员姓名!' }]}
          ]"
        />
      </a-form-item>
      <a-form-item
        label="押运员手机号码"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
      >
        <a-input
          :readOnly="isEscortDisabled"
          v-decorator="[
            'escortPhone',
            {rules: [{ required: false, message: '请输入押运员手机号码!' }, { validator: validatePhone }]}
          ]"
        />
      </a-form-item>
      <a-form-item
        label="押运证编号"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
      >
        <a-input
          :readOnly="isEscortDisabled"
          v-decorator="[
            'escortLicenceNumber',
            {rules: [{ required: true, message: '请输入押运证编号!' }]}
          ]"
        >
          <a-icon slot="addonAfter" type="search" v-if=" !isEscortDisabled" @click="getByLicenceNumber" class="slot-btn"/>
          <a-icon slot="addonAfter" type="close" v-if="isEscortDisabled" @click="clearLicenceNumber" class="slot-btn"/>
        </a-input>
      </a-form-item>
      <a-form-item
        label="押运证有效期止"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
      >
        <a-date-picker
          :disabled="isEscortDisabled"
          placeholder="选择日期"
          style="width:100%"
          v-decorator="[
            'escortLicenceValidDate',
            {rules: [{ required: true, message: '请选择押运证有效期止!' }]}
          ]"
        />
      </a-form-item>
      <a-form-item
        label="押运证附件上传"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
      >
        <a-upload
          :remove="isRemove2"
          accept="image/*"
          :action="action"
          :headers="headers"
          @change="escortLicenceAttachmentUpload"
          :fileList="escortLicenceFileList"
          :beforeUpload="beforeEscortLicenceAttachmentUpload"
          :data="escortLicenceAttachmentUploadData"
          v-decorator="[
            'escortLicenceAttachment',
            {rules: [{ required: true, message: '请上传押运证附件!' }]}
          ]"
        >
          <a-button :disabled="isEscortDisabled">
            <a-icon type="upload"/> 点击上传
          </a-button>
        </a-upload>
      </a-form-item>
      <a-divider orientation="left" style="fontSize:18px;color:#1890ff">车头基本信息</a-divider>
      <a-form-item
        label="车牌号"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
      >
        <a-input
          readOnly
          v-decorator="[
            'plateNumber',
            {rules: [{ required: true, message: '请输入车牌号!' },{ validator: validatePlateNumber }]}
          ]"
        />
      </a-form-item>
      <a-form-item
        label="行驶证有效期止"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
      >
        <a-date-picker
          :disabled="isHeadstockDisabled"
          placeholder="选择日期"
          style="width:100%"
          v-decorator="[
            'drivingLicenceValidDate',
            {rules: [{ required: true, message: '请选择行驶证有效期止!' }]}
          ]"
        />
      </a-form-item>
      <a-form-item
        label="使用性质"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
      >
        <a-input
          :readOnly="isHeadstockDisabled"
          v-decorator="[
            'userNature',
            {rules: [{ required: true, message: '请输入使用性质!' }]}
          ]"
        />
      </a-form-item>
      <a-form-item
        label="危险化学品道路运输证号码"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
      >
        <a-input
          :readOnly="isHeadstockDisabled"
          v-decorator="[
            'roadTransLicenceNumber',
            {rules: [{ required: true, message: '请输入车头危险化学品道路运输证号码!' }]}
          ]"
        />
      </a-form-item>
      <a-form-item
        label="危险化学品道路运输证有效期止"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
      >
        <a-date-picker
          :disabled="isHeadstockDisabled"
          placeholder="选择日期"
          style="width:100%"
          v-decorator="[
              'roadTransLicenceValidDate',
              {rules: [{ required: true, message: '请选择车头危险化学品道路运输证有效期止!' }]}
            ]"
        />
      </a-form-item>
      <a-form-item
        label="经营范围"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
      >
        <a-input
          :readOnly="isHeadstockDisabled"
          v-decorator="[
            'headStockBusinessScope',
            {rules: [{ required: true, message: '请输入车头的经营范围！' }]}
          ]"
        />
      </a-form-item>
      <a-form-item
        label="行驶证附件上传"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
      >
        <a-upload
          :remove="isRemove1"
          accept="image/*"
          :action="action"
          :headers="headers"
          @change="drivingLicenceAttachmentUpload"
          :fileList="drivingLicenceFileList"
          :beforeUpload="beforeDrivingLicenceAttachmentUpload"
          :data="drivingLicenceAttachmentUploadData"
          v-decorator="[
            'drivingLicenceAttachment',
            {rules: [{ required: true, message: '请上传行驶证附件!' }]}
          ]"
        >
          <a-button :disabled="isHeadstockDisabled">
            <a-icon type="upload" /> 点击上传
          </a-button>
        </a-upload>
      </a-form-item>
      <a-form-item
        label="危险化学品道路运输证附件上传"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
      >
        <a-upload
          :remove="isRemove1"
          accept="image/*"
          :action="action"
          :headers="headers"
          @change="roadTransLicenceAttachmentUpload"
          :fileList="roadTransLicenceFileList"
          :beforeUpload="beforeRoadTransLicenceAttachmentUpload"
          :data="roadTransLicenceAttachmentUploadData"
          v-decorator="[
            'roadTransLicenceAttachment',
            {rules: [{ required: true, message: '请上传车头危险化学品道路运输证附件!' }]}
          ]"
        >
          <a-button :disabled="isHeadstockDisabled">
            <a-icon type="upload" /> 点击上传
          </a-button>
        </a-upload>
      </a-form-item>
      <a-divider orientation="left" style="fontSize:18px;color:#1890ff">挂车基本信息</a-divider>
      <a-form-item
        label="车牌号"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
      >
        <a-input
          :readOnly="isTrailerDisabled"
          @change="handleChangeTrailer"
          v-decorator="[
            'trailerPlateNumber',
            {rules: [{ required: existTrailer, message: '请输入车牌号!' },{ validator: validatePlateNumber }]}
          ]"
        >
          <a-icon slot="addonAfter" type="search" v-if=" !isTrailerDisabled" @click="getByPlateNumber" class="slot-btn"/>
          <a-icon slot="addonAfter" type="close" v-if="isTrailerDisabled" @click="clearPlateNumber" class="slot-btn"/>
        </a-input>
      </a-form-item>
      <a-form-item
        label="危险化学品道路运输证号码"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
      >
        <a-input
          :readOnly="isTrailerDisabled"
          @change="handleChangeTrailer"
          v-decorator="[
            'dangerChemLicenceNumber',
            {rules: [{ required: existTrailer, message: '请输入挂车危险化学品道路运输证号码!' }]}
          ]"
        />
      </a-form-item>
      <a-form-item
        label="危险化学品道路运输证有效期止"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
      >
        <a-date-picker
          :disabled="isTrailerDisabled"
          @change="handleChangeTrailer"
          placeholder="选择日期"
          style="width:100%"
          v-decorator="[
            'dangerChemLicenceValidDate',
            {rules: [{ required: existTrailer, message: '请选择挂车危险化学品道路运输证有效期止!' }]}
          ]"
        />
      </a-form-item>
      <a-form-item
        label="经营范围"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
      >
        <a-input
          :readOnly="isTrailerDisabled"
          @change="handleChangeTrailer"
          v-decorator="[
            'trailerBusinessScope',
            {rules: [{ required: existTrailer, message: '请输入挂车的经营范围！' }]}
          ]"
        />
      </a-form-item>
      <a-form-item
        label="罐体检查报告有效期止"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
      >
        <a-date-picker
          :disabled="isTrailerDisabled"
          @change="handleChangeTrailer"
          placeholder="选择日期"
          style="width:100%"
          v-decorator="[
            'tankInspectionValidDate',
            {rules: [{ required: existTrailer, message: '请选择罐体检查报告有效期止！' }]}
          ]"
        />
      </a-form-item>
      <a-form-item
        label="罐体材质"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
      >
        <a-input
          :readOnly="isTrailerDisabled"
          @change="handleChangeTrailer"
          v-decorator="[
            'tankMaterial',
            {rules: [{ required: existTrailer, message: '请输入罐体材质！' }]}
          ]"
        />
      </a-form-item>
      <a-form-item
        label="充装材质"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
      >
        <a-input
          :readOnly="isTrailerDisabled"
          @change="handleChangeTrailer"
          v-decorator="[
          'fillingMaterial',
            {rules: [{ required: existTrailer, message: '请输入充装材质！' }]}
          ]"
        />
      </a-form-item>
      <a-form-item
        label="危险化学品道路运输证附件上传"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
      >
        <a-upload
          :remove="isRemove3"
          accept="image/*"
          :action="action"
          :headers="headers"
          @change="dangerChemLicenceAttachmentUpload"
          :fileList="dangerChemLicenceFileList"
          :beforeUpload="beforeDangerChemLicenceAttachmentUpload"
          :data="dangerChemLicenceAttachmentUploadData"
          v-decorator="[
            'dangerChemLicenceAttachment',
            {rules: [{ required: existTrailer, message: '请上传挂车危险化学品道路运输证附件!' }]}
          ]"
        >
          <a-button :disabled="isTrailerDisabled">
            <a-icon type="upload" /> 点击上传
          </a-button>
        </a-upload>
      </a-form-item>
      <a-form-item
        label="罐体检查报告附件上传"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
        style="marginBottom:16px"
      >
        <a-upload
          :remove="isRemove3"
          accept="image/*"
          :action="action"
          :headers="headers"
          @change="tankInspectionAttachmentUpload"
          :fileList="tankInspectionFileList"
          :beforeUpload="beforeTankInspectionAttachmentUpload"
          :data="tankInspectionAttachmentUploadData"
          v-decorator="[
            'tankInspectionAttachment',
            {rules: [{ required: existTrailer, message: '请上传罐体检查报告附件!' }]}
          ]"
        >
          <a-button :disabled="isTrailerDisabled">
            <a-icon type="upload" /> 点击上传
          </a-button>
        </a-upload>
      </a-form-item>
      <a-form-item
        :wrapper-col="btnWrapperCol"
      >
        <a-button
          type="primary"
          html-type="submit"
          style="width:100%"
          size="large"
          :loading="submitLoading"
        >
          录入信息
        </a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
import request from '../../../utils/request.js'
export default {
  beforeCreate () {
    this.form = this.$form.createForm(this);
  },
  data () {
    return {
      driverId: null, // 驾驶员id
      headStockId: null, // 车头资历id
      trailerId: null,
      escortId: null,
      values: [],
      labelCol: {
        xs: { span: 24 },
        sm: { span: 6 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 6 }
      },
      btnWrapperCol: {
        xs: { span: 24 },
        sm: { span: 6, offset: 6 }
      },
      existTrailer: false,
      trailerPlateNumber: '',
      dangerChemLicenceNumber: '',
      dangerChemLicenceValidDate: '',
      trailerBusinessScope: '',
      tankInspectionValidDate: '',
      tankMaterial: '',
      fillingMaterial: '',
      isButtonView: true,
      disabled: false,
      headers: {},
      action: '',
      driverLicenceFileList: [],
      dangerLicenceFileList: [],
      escortLicenceFileList: [],
      drivingLicenceFileList: [],
      roadTransLicenceFileList: [],
      dangerChemLicenceFileList: [],
      tankInspectionFileList: [],
      driverLicenceAttachmentUrl: '',
      dangerLicenceAttachmentUrl: '',
      escortLicenceAttachmentUrl: '',
      drivingLicenceAttachmentUrl: '',
      roadTransLicenceAttachmentUrl: '',
      dangerChemLicenceAttachmentUrl: '',
      tankInspectionAttachmentUrl: '',
      driverLicenceAttachmentUploadData: {},
      dangerLicenceAttachmentUploadData: {},
      escortLicenceAttachmentUploadData: {},
      drivingLicenceAttachmentUploadData: {},
      roadTransLicenceAttachmentUploadData: {},
      dangerChemLicenceAttachmentUploadData: {},
      tankInspectionAttachmentUploadData: {},
      driverInfo: {},
      headstockInfo: {},
      recordId: '',
      defaultVal: null,
      isDriverDisabled: false,
      isHeadstockDisabled: false,
      isEscortDisabled: false,
      isTrailerDisabled: false,
      submitLoading: false
    }
  },

  computed: {
    isTrailerValid() {
      this.form.validateFields([
        'trailerPlateNumber', 
        'dangerChemLicenceNumber', 
        'dangerChemLicenceValidDate', 
        'dangerChemLicenceAttachment',
        'trailerBusinessScope',
        'tankInspectionValidDate',
        'tankInspectionAttachment',
        'tankMaterial',
        'fillingMaterial'
      ],(err,values) => {

      })
      // return false
    }
  },

  created () {
    this.recordId = this.$route.query.recordId
    this.defaultVal = this.$route.query
    this.headers['access-token'] = sessionStorage.getItem('token')
    if(process.env.NODE_ENV === 'production') {
      this.action = this.$baseUrl + 'entrystaff/fileUpload'
    } else {
      this.action = '/api/entrystaff/fileUpload'
    }
    if(sessionStorage.getItem('role') === '验证码登录用户') {
      this.getTempDriverAndDriver()
    }
    if(sessionStorage.getItem('role') === '信息录入员') {
      this.getHeadstockAndDriver()
    }
  },

  methods: {
    handleSubmit (e) {
      e.preventDefault();
      this.submitLoading = true
      this.form.validateFieldsAndScroll((err, values) => {
        if (err) {
          this.submitLoading = false
          console.log('err')
        } else {
          const submitValues = {
            recordId: this.recordId,
            driverId: this.driverId,
            headStockId: this.headStockId,
            escortId: this.escortId,
            trailerId: this.trailerId,
            ...values,
            'driverLicenceValidDate': values['driverLicenceValidDate'].format('YYYY-MM-DD'),
            'dangerLicenceValidDate': values['dangerLicenceValidDate'].format('YYYY-MM-DD'),
            'escortLicenceValidDate': values['escortLicenceValidDate'].format('YYYY-MM-DD'),
            'drivingLicenceValidDate': values['drivingLicenceValidDate'].format('YYYY-MM-DD'),
            'roadTransLicenceValidDate': values['roadTransLicenceValidDate'].format('YYYY-MM-DD'),
            'driverLicenceAttachment': this.driverLicenceAttachmentUrl,
            'dangerLicenceAttachment': this.dangerLicenceAttachmentUrl,
            'escortLicenceAttachment': this.escortLicenceAttachmentUrl,
            'drivingLicenceAttachment': this.drivingLicenceAttachmentUrl,
            'roadTransLicenceAttachment': this.roadTransLicenceAttachmentUrl,
            'tankInspectionValidDate': values['tankInspectionValidDate'] !== undefined ? values['tankInspectionValidDate'].format('YYYY-MM-DD'): null,
            'dangerChemLicenceValidDate': values['dangerChemLicenceValidDate'] !== undefined ? values['dangerChemLicenceValidDate'].format('YYYY-MM-DD'): null,
            'tankInspectionAttachment': this.tankInspectionAttachmentUrl,
            'dangerChemLicenceAttachment': this.dangerChemLicenceAttachmentUrl
          }
          this.$api.arrange.newEntry(submitValues).then((res) => {
            if (res.code === 200) {
              this.$message.success('成功提交资历信息!')
              this.$router.push({ path: `/transpotArrange` })
            } else {
              this.$message.error(res.message)
            }
            this.submitLoading = false
          }).catch(e => {
            this.submitLoading = false
          })
        }
      }).catch(e => {
        this.submitLoading = false
      })
    },
    //根据手机号和车头车牌号获取已存在数据
    getHeadstockAndDriver() {
      const phone = this.$route.query.driverPhone1 !== null? this.$route.query.driverPhone1: this.$route.query.driverPhone2
      const plateNumber = this.$route.query.plateNumber
      this.$axios.all([this.$api.arrange.getDriverByPhone(phone), this.$api.arrange.getHeadstockByPlateNumber(plateNumber)]).then(
        this.$axios.spread((res1, res2) => {
          if(res1.code === 200 ) {
            const data = res1.data
            data.driverLicenceValidDate = this.$moment(data.driverLicenceValidDate)
            data.dangerLicenceValidDate = this.$moment(data.dangerLicenceValidDate)
            this.driverLicenceAttachmentUrl = data.driverLicenceAttachment
            this.dangerLicenceAttachmentUrl = data.dangerLicenceAttachment
            if(data.driverLicenceAttachment === '' || data.driverLicenceAttachment === null) {
              this.driverLicenceFileList = []
            } else {
              this.driverLicenceFileList = [{
                uid: '-1',
                name: data.driverLicenceAttachment,
                status: 'done'
              }]
            }
            if(data.dangerLicenceAttachment === '' || data.dangerLicenceAttachment === null) {
              this.dangerLicenceFileList = []
            } else {
              this.dangerLicenceFileList = [{
                uid: '-2',
                name: data.dangerLicenceAttachment,
                status: 'done'
              }]
            }
            this.form.setFieldsValue({
              'driverName': data.driverName,
              'phone1': data.phone1,
              'phone2': data.phone2,
              'driverLicenceNumber': data.driverLicenceNumber,
              'driverLicenceValidDate': data.driverLicenceValidDate,
              'dangerLicenceNumber': data.dangerLicenceNumber,
              'dangerLicenceValidDate': data.dangerLicenceValidDate,
              'driverLicenceAttachment': data.driverLicenceAttachment,
              'dangerLicenceAttachment': data.dangerLicenceAttachment
            })
            this.isDriverDisabled = true
            this.driverId = data.driverId
          } else {
            this.isDriverDisabled = false
            this.driverId = null
            this.form.setFieldsValue({
              'driverName': this.defaultVal.driverName,
              'phone1': this.defaultVal.driverPhone1
            })
          }
          if(res2.code === 200) {
            const data = res2.data
            data.drivingLicenceValidDate = this.$moment(data.drivingLicenceValidDate)
            data.roadTransLicenceValidDate = this.$moment(data.roadTransLicenceValidDate)
            this.drivingLicenceAttachmentUrl = data.drivingLicenceAttachment
            this.roadTransLicenceAttachmentUrl = data.roadTransLicenceAttachment
            if(data.drivingLicenceAttachment === "" || data.drivingLicenceAttachment === null) {
              this.drivingLicenceFileList = []
            } else {
              this.drivingLicenceFileList = [{
                uid: '-1',
                name: this.drivingLicenceAttachmentUrl,
                status: 'done'
              }]
            }
            if(data.roadTransLicenceAttachment === "" || data.roadTransLicenceAttachment === null) {
              this.roadTransLicenceFileList = []
            } else {
              this.roadTransLicenceFileList = [{
                uid: '-1',
                name: this.roadTransLicenceAttachmentUrl,
                status: 'done'
              }]
            }
            this.form.setFieldsValue({
              'plateNumber': data.plateNumber,
              'userNature': data.userNature,
              'drivingLicenceValidDate': data.drivingLicenceValidDate,
              'roadTransLicenceValidDate': data.roadTransLicenceValidDate,
              'roadTransLicenceNumber': data.roadTransLicenceNumber,
              'headStockBusinessScope': data.headStockBusinessScope,
              'drivingLicenceAttachment': data.drivingLicenceAttachment,
              'roadTransLicenceAttachment': data.roadTransLicenceAttachment
            })
            this.isHeadstockDisabled = true
            this.headStockId = data.headStockId
          } else {
            this.isHeadstockDisabled = false
            this.headStockId = null
            this.form.setFieldsValue({
              'plateNumber': this.defaultVal.plateNumber
            })
          }
        })
      )
    },
    //根据手机号和车头车牌号获取已存在数据(验证码登录用户)
    getTempDriverAndDriver() {
      this.$axios.all([this.$api.arrange.getTempDriverInfo(), this.$api.arrange.getTempHeadStock()]).then(
        this.$axios.spread((res1, res2) => {
          if(res1.code === 200 ) {
            const data = res1.data
            data.driverLicenceValidDate = this.$moment(data.driverLicenceValidDate)
            data.dangerLicenceValidDate = this.$moment(data.dangerLicenceValidDate)
            this.driverLicenceAttachmentUrl = data.driverLicenceAttachment
            this.dangerLicenceAttachmentUrl = data.dangerLicenceAttachment
            if(data.driverLicenceAttachment === '' || data.driverLicenceAttachment === null) {
              this.driverLicenceFileList = []
            } else {
              this.driverLicenceFileList = [{
                uid: '-1',
                name: data.driverLicenceAttachment,
                status: 'done'
              }]
            }
            if(data.dangerLicenceAttachment === '' || data.dangerLicenceAttachment === null) {
              this.dangerLicenceFileList = []
            } else {
              this.dangerLicenceFileList = [{
                uid: '-2',
                name: data.dangerLicenceAttachment,
                status: 'done'
              }]
            }
            this.form.setFieldsValue({
              'driverName': data.driverName,
              'phone1': data.phone1,
              'phone2': data.phone2,
              'driverLicenceNumber': data.driverLicenceNumber,
              'driverLicenceValidDate': data.driverLicenceValidDate,
              'dangerLicenceNumber': data.dangerLicenceNumber,
              'dangerLicenceValidDate': data.dangerLicenceValidDate,
              'driverLicenceAttachment': data.driverLicenceAttachment,
              'dangerLicenceAttachment': data.dangerLicenceAttachment
            })
            this.isDriverDisabled = true
            this.driverId = data.driverId
          } else {
            this.isDriverDisabled = false
            this.driverId = null
            this.form.setFieldsValue({
              'driverName': this.defaultVal.driverName,
              'phone1': this.defaultVal.driverPhone1
            })
          }
          if(res2.code === 200) {
            const data = res2.data
            data.drivingLicenceValidDate = this.$moment(data.drivingLicenceValidDate)
            data.roadTransLicenceValidDate = this.$moment(data.roadTransLicenceValidDate)
            this.drivingLicenceAttachmentUrl = data.drivingLicenceAttachment
            this.roadTransLicenceAttachmentUrl = data.roadTransLicenceAttachment
            if(data.drivingLicenceAttachment === "" || data.drivingLicenceAttachment === null) {
              this.drivingLicenceFileList = []
            } else {
              this.drivingLicenceFileList = [{
                uid: '-1',
                name: this.drivingLicenceAttachmentUrl,
                status: 'done'
              }]
            }
            if(data.roadTransLicenceAttachment === "" || data.roadTransLicenceAttachment === null) {
              this.roadTransLicenceFileList = []
            } else {
              this.roadTransLicenceFileList = [{
                uid: '-1',
                name: this.roadTransLicenceAttachmentUrl,
                status: 'done'
              }]
            }
            this.form.setFieldsValue({
              'plateNumber': data.plateNumber,
              'userNature': data.userNature,
              'drivingLicenceValidDate': data.drivingLicenceValidDate,
              'roadTransLicenceValidDate': data.roadTransLicenceValidDate,
              'roadTransLicenceNumber': data.roadTransLicenceNumber,
              'headStockBusinessScope': data.headStockBusinessScope,
              'drivingLicenceAttachment': data.drivingLicenceAttachment,
              'roadTransLicenceAttachment': data.roadTransLicenceAttachment
            })
            this.isHeadstockDisabled = true
            this.headStockId = data.headStockId
          } else {
            this.isHeadstockDisabled = false
            this.headStockId = null
            this.form.setFieldsValue({
              'plateNumber': this.defaultVal.plateNumber
            })
          }
        })
      )
    },
    //根据押运证编号获取押运员资质信息
    getByLicenceNumber() {
      const value = this.form.getFieldsValue(['escortLicenceNumber'])
      this.$api.arrange.getByLicenceNumber({
        escortLicenceNumber: value.escortLicenceNumber
      }).then(res => {
        if(res.code === 200) {
          this.escortId = res.data.escortId
          this.isEscortDisabled = true
          const data = res.data
          data.escortLicenceValidDate = this.$moment(data.escortLicenceValidDate)
          this.escortLicenceAttachmentUrl = data.escortLicenceAttachment
          if(data.escortLicenceAttachment === "" || data.escortLicenceAttachment === null) {
            this.escortLicenceFileList = []
          } else {
             this.escortLicenceFileList = [{
              uid: '-1',
              name: data.escortLicenceAttachment,
              status: 'done'
            }]
          }
          this.form.setFieldsValue({
            'escortName': data.escortName,
            'escortPhone': data.escortPhone,
            'escortLicenceAttachment': data.escortLicenceAttachment,
            'escortLicenceNumber': data.escortLicenceNumber,
            'escortLicenceValidDate': data.escortLicenceValidDate,
          })
        } else {
          this.isEscortDisabled = false
          this.escortId = null
          this.$message.error('无相关资质信息')
        }
      })
    },
    clearLicenceNumber() {
      this.escortId = null
      this.isEscortDisabled = false,
      this.form.setFieldsValue({
        'escortName': '',
        'escortPhone': '',
        'escortLicenceAttachment': '',
        'escortLicenceNumber': '',
        'escortLicenceValidDate': null,
      })
      this.escortLicenceFileList = []
    },
    //根据挂车车牌号获取挂车信息
    getByPlateNumber() {
      const value = this.form.getFieldsValue(['trailerPlateNumber']) 
      this.$api.arrange.getByPlateNumber({
        trailerPlateNumber: value.trailerPlateNumber
      }).then(res => {
        if(res.code === 200) {
          this.trailerId = res.data.trailerId
          this.isTrailerDisabled = true
          const data = res.data
          data.dangerChemLicenceValidDate = this.$moment(data.dangerChemLicenceValidDate)
          data.tankInspectionValidDate = this.$moment(data.tankInspectionValidDate)
          this.dangerChemLicenceAttachmentUrl = data.dangerChemLicenceAttachment
          this.tankInspectionAttachmentUrl = data.tankInspectionAttachment
          if(data.dangerChemLicenceAttachment === "" || data.dangerChemLicenceAttachment === null) {
            this.dangerChemLicenceFileList = []
          } else {
             this.dangerChemLicenceFileList = [{
              uid: '-1',
              name: data.dangerChemLicenceAttachment,
              status: 'done'
            }]
          }
          if(data.tankInspectionAttachment === "" || data.tankInspectionAttachment === null) {
            this.tankInspectionFileList = []
          } else {
             this.tankInspectionFileList = [{
              uid: '-1',
              name: data.tankInspectionAttachment,
              status: 'done'
            }]
          }
          this.form.setFieldsValue({
            'trailerPlateNumber': data.trailerPlateNumber,
            'dangerChemLicenceNumber': data.dangerChemLicenceNumber,
            'dangerChemLicenceValidDate': data.dangerChemLicenceValidDate,
            'dangerChemLicenceAttachment': data.dangerChemLicenceAttachment,
            'trailerBusinessScope': data.businessScope,
            'tankInspectionValidDate': data.tankInspectionValidDate,
            'tankInspectionAttachment': data.tankInspectionAttachment,
            'tankMaterial': data.tankMaterial,
            'fillingMaterial': data.fillingMaterial,
          })
        } else {
          this.isTrailerDisabled = false
          this.trailerId = null
          this.$message.error('无相关资质信息')
        }
      })
    },
    clearPlateNumber() {
      this.trailerId = null
      this.isTrailerDisabled = false,
      this.form.setFieldsValue({
        'trailerPlateNumber': '',
        'dangerChemLicenceNumber': '',
        'dangerChemLicenceValidDate': null,
        'dangerChemLicenceAttachment': '',
        'businessScope': '',
        'tankInspectionValidDate': null,
        'tankInspectionAttachment': '',
        'tankMaterial': '',
        'fillingMaterial': '',
      })
      this.dangerChemLicenceFileList = []
      this.tankInspectionFileList = []
    },
    // 驾驶证附件上传动作
    driverLicenceAttachmentUpload (file) {
      let fileList = file.fileList
      fileList = fileList.slice(-1)
      this.driverLicenceFileList = fileList
      if (file.fileList.length !== 0) {
        if (file.fileList[0].response && file.fileList[0].response.code === 200) {
          this.driverLicenceAttachmentUrl = file.fileList[0].response.data.fileUrl
        }
      }
    },
    // 道路危险货物运输驾驶员证附件上传动作
    dangerLicenceAttachmentUpload (file) {
      let fileList = file.fileList
      fileList = fileList.slice(-1)
      this.dangerLicenceFileList = fileList
      if (file.fileList.length !== 0) {
        if (file.fileList[0].response && file.fileList[0].response.code === 200) {
          this.dangerLicenceAttachmentUrl = file.fileList[0].response.data.fileUrl
        }
      }
    },
    // 押运证附件上传动作
    escortLicenceAttachmentUpload (file) {
      let fileList = file.fileList
      fileList = fileList.slice(-1)
      this.escortLicenceFileList = fileList
      if (file.fileList.length !== 0) {
        if (file.fileList[0].response && file.fileList[0].response.code === 200) {
          this.escortLicenceAttachmentUrl = file.fileList[0].response.data.fileUrl
        }
      }
    },
    // 行驶证附件上传动作
    drivingLicenceAttachmentUpload (file) {
      let fileList = file.fileList
      fileList = fileList.slice(-1)
      this.drivingLicenceFileList = fileList
      if (file.fileList.length !== 0) {
        if (file.fileList[0].response && file.fileList[0].response.code === 200) {
          this.drivingLicenceAttachmentUrl = file.fileList[0].response.data.fileUrl
        }
      }
    },
    // 车头危险化学品道路运输证附件上传动作
    roadTransLicenceAttachmentUpload (file) {
      let fileList = file.fileList
      fileList = fileList.slice(-1)
      this.roadTransLicenceFileList = fileList
      if (file.fileList.length !== 0) {
        if (file.fileList[0].response && file.fileList[0].response.code === 200) {
          this.roadTransLicenceAttachmentUrl = file.fileList[0].response.data.fileUrl
        }
      }
    },
    // 挂车危险化学品道路运输证附件上传动作
    dangerChemLicenceAttachmentUpload (file) {
      let fileList = file.fileList
      fileList = fileList.slice(-1)
      this.dangerChemLicenceFileList = fileList
      if (file.fileList.length !== 0) {
        if (file.fileList[0].response && file.fileList[0].response.code === 200) {
          this.dangerChemLicenceAttachmentUrl = file.fileList[0].response.data.fileUrl
        }
      }
      this.handleChangeTrailer()
    },
    // 罐体检查报告附件上传动作
    tankInspectionAttachmentUpload (file) {
      let fileList = file.fileList
      fileList = fileList.slice(-1)
      this.tankInspectionFileList = fileList
      if (file.fileList.length !== 0) {
        if (file.fileList[0].response && file.fileList[0].response.code === 200) {
          this.tankInspectionAttachmentUrl = file.fileList[0].response.data.fileUrl
        }
      }
      this.handleChangeTrailer()
    },
    // 驾驶证附件上传携带参数
    beforeDriverLicenceAttachmentUpload (file) {
      return new Promise((resolve, reject) => {
        if (this.driverLicenceFileList.length !== 0) {
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
    // 道路危险货物运输驾驶员证附件上传携带参数
    beforeDangerLicenceAttachmentUpload (file) {
      return new Promise((resolve, reject) => {
        if (this.dangerLicenceFileList.length !== 0) {
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
    // 押运证附件上传携带参数
    beforeEscortLicenceAttachmentUpload (file) {
      return new Promise((resolve, reject) => {
        if (this.escortLicenceFileList.length !== 0) {
          this.escortLicenceAttachmentUploadData = {
            fileType: '3',
            fileName: this.escortLicenceFileList[0].name,
            flag: 1
          }
          resolve(file)
        } else {
          this.escortLicenceAttachmentUploadData = {
            fileType: '3',
            fileName: file.name,
            flag: 0
          }
          resolve(file)
        }
      })
    },
    // 行驶证附件上传携带参数
    beforeDrivingLicenceAttachmentUpload (file) {
      return new Promise((resolve, reject) => {
        if (this.drivingLicenceFileList.length !== 0) {
          this.drivingLicenceAttachmentUploadData = {
            fileType: '4',
            fileName: this.drivingLicenceFileList[0].name,
            flag: 1
          }
          resolve(file)
        } else {
          this.drivingLicenceAttachmentUploadData = {
            fileType: '4',
            fileName: file.name,
            flag: 0
          }
          resolve(file)
        }
      })
    },
    // 车头危险化学品道路运输证附件上传携带参数
    beforeRoadTransLicenceAttachmentUpload (file) {
      return new Promise((resolve, reject) => {
        if (this.roadTransLicenceFileList.length !== 0) {
          this.roadTransLicenceAttachmentUploadData = {
            fileType: '5',
            fileName: this.roadTransLicenceFileList[0].name,
            flag: 1
          }
          resolve(file)
        } else {
          this.roadTransLicenceAttachmentUploadData = {
            fileType: '5',
            fileName: file.name,
            flag: 0
          }
          resolve(file)
        }
      })
    },
    // 挂车危险化学品道路运输证附件上传携带参数
    beforeDangerChemLicenceAttachmentUpload (file) {
      return new Promise((resolve, reject) => {
        if (this.dangerChemLicenceFileList.length !== 0) {
          this.dangerChemLicenceAttachmentUploadData = {
            fileType: '6',
            fileName: this.dangerChemLicenceFileList[0].name,
            flag: 1
          }
          resolve(file)
        } else {
          this.dangerChemLicenceAttachmentUploadData = {
            fileType: '6',
            fileName: file.name,
            flag: 0
          }
          resolve(file)
        }
      })
    },
    // 罐体检查报告附件上传携带参数
    beforeTankInspectionAttachmentUpload (file) {
      return new Promise((resolve, reject) => {
        if (this.tankInspectionFileList.length !== 0) {
          this.tankInspectionAttachmentUploadData = {
            fileType: '7',
            fileName: this.tankInspectionFileList[0].name,
            flag: 1
          }
          resolve(file)
        } else {
          this.tankInspectionAttachmentUploadData = {
            fileType: '7',
            fileName: file.name,
            flag: 0
          }
          resolve(file)
        }
      })
    },
    // 判断挂车的信息有无填写
    handleChangeTrailer (e) {
      const form = this.form.getFieldsValue([
        'trailerPlateNumber', 
        'dangerChemLicenceNumber', 
        'dangerChemLicenceValidDate', 
        'dangerChemLicenceAttachment',
        'trailerBusinessScope',
        'tankInspectionValidDate',
        'tankInspectionAttachment',
        'tankMaterial',
        'fillingMaterial'
      ])
      console.log(form.trailerPlateNumber)
      // if(
      //   (form.trailerPlateNumber !== '' && form.trailerPlateNumber) ||
      //   (form.dangerChemLicenceNumber !== '' && form.dangerChemLicenceNumber) ||
      //   (form.dangerChemLicenceValidDate !== '' && form.dangerChemLicenceValidDate) ||
      //   (form.dangerChemLicenceAttachment !== '' && form.dangerChemLicenceAttachment) ||
      //   (form.trailerBusinessScope !== '' && form.trailerBusinessScope) ||
      //   (form.tankInspectionValidDate !== '' && form.tankInspectionValidDate) ||
      //   (form.tankInspectionAttachment !== '' && form.tankInspectionAttachment) ||
      //   (form.tankMaterial !== '' && form.tankMaterial) ||
      //   (form.fillingMaterial !== '' && form.fillingMaterial)
      // ) {
      //   this.existTrailer = true
      // } else {
      //   this.existTrailer = false
      // }
    },
    /**
     * 手机号校验规则
     */
    validatePhone (rule, value, callback) {
      const form = this.form
      const reg = /^1[345789]\d{9}$/
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
      if (value && !reg.test(value)) {
        callback('请输入正确格式的驾驶证编号!')
      } else {
        callback()
      }
    },
    /**
     * 车牌号校验规则
     */
    validatePlateNumber (rule, value, callback) {
      const form = this.form
      const reg = /^(([京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领][A-Z](([0-9]{5}[DF])|([DF]([A-HJ-NP-Z0-9])[0-9]{4})))|([京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领][A-Z][A-HJ-NP-Z0-9]{4}[A-HJ-NP-Z0-9挂学警港澳使领]))$/
      if (value && !reg.test(value)) {
        callback('请输入正确格式的车牌号!')
      } else {
        callback()
      }
    },
    isRemove(e) {
      if(this.isDriverDisabled) {
        return false
      }
    },
    isRemove1(e) {
      if(this.isHeadstockDisabled) {
        return false
      }
    },
    isRemove2(e) {
      if(this.isEscortDisabled) {
        return false
      }
    },
    isRemove3(e) {
      if(this.isTrailerDisabled) {
        return false
      }
    }
  }
}

</script>
<style scoped>
   #infoForm .ant-form-item{
    margin-bottom: 4px;
  }
  .slot-btn:hover{
    cursor: pointer;
    opacity: 0.6;
  }
</style>
