<template>
  <div id="infoForm">
    <a-spin size="large" :spinning="spinning">
      <a-form
        :form="form"
        validateFieldsAndScroll
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
              'driverName'
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
              'phone1'
            ]"
          />

        </a-form-item>
        <a-form-item
          label="驾驶员手机号码2"
          :label-col="labelCol"
          :wrapper-col="wrapperCol"
        >
          <a-input
            readOnly
            v-decorator="[
              'phone2'
            ]"
          />

        </a-form-item>
        <a-form-item
          label="驾驶证编号"
          :label-col="labelCol"
          :wrapper-col="wrapperCol"
        >
          <a-input
            readOnly
            v-decorator="[
              'driverLicenceNumber',
            ]"
          />
        </a-form-item>
        <a-form-item
          label="驾驶证有效期止"
          :label-col="labelCol"
          :wrapper-col="wrapperCol"
        >
          <a-input
            readOnly
            v-decorator="[
              'driverLicenceValidDate',
            ]"
          />
        </a-form-item>
        <a-form-item
          label="道路危险货物运输驾驶证编号"
          :label-col="labelCol"
          :wrapper-col="wrapperCol"
        >
          <a-input
            readOnly
            v-decorator="[
              'dangerLicenceNumber'
            ]"
          />
        </a-form-item>
        <a-form-item
          label="道路危险货物运输驾驶证编号有效期止"
          :label-col="labelCol"
          :wrapper-col="wrapperCol"
        >
          <a-input
            readOnly
            v-decorator="[
              'dangerLicenceValidDate',
            ]"
          />
        </a-form-item>
        <a-divider orientation="left" style="fontSize:18px;color:#1890ff">押运员基本信息</a-divider>
        <a-form-item
          label="押运员姓名"
          :label-col="labelCol"
          :wrapper-col="wrapperCol"
        >
          <a-input
            readOnly
            v-decorator="[
              'escortName'
            ]"
          />
        </a-form-item>
        <a-form-item
          label="押运员手机号码"
          :label-col="labelCol"
          :wrapper-col="wrapperCol"
        >
          <a-input
            readOnly
            v-decorator="[
              'escortPhone'
            ]"
          />
        </a-form-item>
        <a-form-item
          label="押运证编号"
          :label-col="labelCol"
          :wrapper-col="wrapperCol"
        >
          <a-input
            readOnly
            v-decorator="[
              'escortLicenceNumber'
            ]"
          />
        </a-form-item>
        <a-form-item
          label="押运证有效期止"
          :label-col="labelCol"
          :wrapper-col="wrapperCol"
        >
          <a-input
            readOnly
            v-decorator="[
              'escortLicenceValidDate'
            ]"
          />
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
              'plateNumber'
            ]"
          />
        </a-form-item>
        <a-form-item
          label="行驶证有效期止"
          :label-col="labelCol"
          :wrapper-col="wrapperCol"
        >
          <a-input
            readOnly
            v-decorator="[
              'drivingLicenceValidDate'
            ]"
          />
        </a-form-item>
        <a-form-item
          label="使用性质"
          :label-col="labelCol"
          :wrapper-col="wrapperCol"
        >
          <a-input
            :disabled="disabled"
            v-decorator="[
              'userNature'
            ]"
          />
        </a-form-item>
        <a-form-item
          label="危险化学品道路运输证号码"
          :label-col="labelCol"
          :wrapper-col="wrapperCol"
        >
          <a-input
            readOnly
            v-decorator="[
              'roadTransLicenceNumber'
            ]"
          />
        </a-form-item>
        <a-form-item
          label="危险化学品道路运输证有效期止"
          :label-col="labelCol"
          :wrapper-col="wrapperCol"
        >
          <a-input
            readOnly
            v-decorator="[
              'roadTransLicenceValidDate'
            ]"
          />
        </a-form-item>
        <a-form-item
          label="经营范围"
          :label-col="labelCol"
          :wrapper-col="wrapperCol"
        >
          <a-input
            readOnly
            v-decorator="[
              'headStockBusinessScope',
            ]"
          />
        </a-form-item>
        <a-divider orientation="left" style="fontSize:18px;color:#1890ff">挂车基本信息</a-divider>
        <a-form-item
          label="车牌号"
          :label-col="labelCol"
          :wrapper-col="wrapperCol"
        >
          <a-input
            readOnly
            v-decorator="[
              'trailerPlateNumber'
            ]"
          />
        </a-form-item>
        <a-form-item
          label="危险化学品道路运输证号码"
          :label-col="labelCol"
          :wrapper-col="wrapperCol"
        >
          <a-input
            readOnly
            v-decorator="[
              'dangerChemLicenceNumber'
            ]"
          />
        </a-form-item>
        <a-form-item
          label="危险化学品道路运输证有效期止"
          :label-col="labelCol"
          :wrapper-col="wrapperCol"
        >
          <a-input
            readOnly
            v-decorator="[
              'dangerChemLicenceValidDate'
            ]"
          />
        </a-form-item>
        <a-form-item
          label="经营范围"
          :label-col="labelCol"
          :wrapper-col="wrapperCol"
        >
          <a-input
            readOnly
            v-decorator="[
              'trailerBusinessScope'
            ]"
          />
        </a-form-item>
        <a-form-item
          label="罐体检查报告有效期止"
          :label-col="labelCol"
          :wrapper-col="wrapperCol"
        >
          <a-input
            readOnly
            v-decorator="[
              'tankInspectionValidDate'
            ]"
          />
        </a-form-item>
        <a-form-item
          label="罐体材质"
          :label-col="labelCol"
          :wrapper-col="wrapperCol"
        >
          <a-input
            readOnly
            v-decorator="[
              'tankMaterial'
            ]"
          />
        </a-form-item>
        <a-form-item
          label="充装材质"
          :label-col="labelCol"
          :wrapper-col="wrapperCol"
        >
          <a-input
            readOnly
            v-decorator="[
              'fillingMaterial'
            ]"
          />
        </a-form-item>
      </a-form>
    </a-spin>
  </div>
</template>

<script>
export default {
  beforeCreate () {
    this.form = this.$form.createForm(this);
  },
  data () {
    return {
      driverId: '', // 驾驶员id
      headStockId: '', // 车头资历id
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
      disabled: false,
      driverInfo: {},
      headstockInfo: {},
      recordId: '',
      spinning: false
    }
  },

  created () {
    this.recordId = this.$route.query.recordId
    this.fetch(this.recordId)
  },

  methods: {
    fetch(id) {
      this.spinning = true
      this.$api.arrange.recordDetail({
         recordId: id
      }).then(res => {
        if(res.code === 200) {
          const data = res.data
          this.form.setFieldsValue({
            'driverName': data.driverName,
            'phone1': data.phone1,
            'phone2': data.phone2,
            'driverLicenceNumber': data.driverLicenceNumber,
            'driverLicenceValidDate': data.driverLicenceValidDate,
            'dangerLicenceNumber': data.dangerLicenceNumber,
            'dangerLicenceValidDate': data.dangerLicenceValidDate,
            'plateNumber': data.plateNumber,
            'userNature': data.userNature,
            'drivingLicenceValidDate': data.drivingLicenceValidDate,
            'roadTransLicenceValidDate': data.roadTransLicenceValidDate,
            'roadTransLicenceNumber': data.roadTransLicenceNumber,
            'headStockBusinessScope': data.headStockBusinessScope,
            'escortName': data.escortName,
            'escortPhone': data.escortPhone,
            'escortLicenceNumber': data.escortLicenceNumber,
            'escortLicenceValidDate': data.escortLicenceValidDate,
            // 'escortLicenceAttachment': data.escortLicenceAttachment,
            'trailerPlateNumber': data.trailerPlateNumber,
            'dangerChemLicenceNumber': data.dangerChemLicenceNumber,
            'dangerChemLicenceValidDate': data.dangerChemLicenceValidDate,
            // 'dangerChemLicenceAttachment': data.dangerChemLicenceAttachment,
            'trailerBusinessScope': data.trailerBusinessScope,
            'tankInspectionValidDate': data.tankInspectionValidDate,
            // 'tankInspectionAttachment': data.tankInspectionAttachment,
            'tankMaterial': data.tankMaterial,
            'fillingMaterial': data.fillingMaterial
          })
        } else {
          this.$message.error(res.message)
        }
        this.spinning = false
      }).catch(e => {
        this.spinning = false
      })
    },
    /**
     * 验证码登录查询驾驶员信息
     */
    getTempDriverInfo() {
      this.$api.arrange.getTempDriverInfo().then(res => {
        if(res.code === 200) {
          const data = res.data
          data.driverLicenceValidDate = this.$moment(data.driverLicenceValidDate)
          data.dangerLicenceValidDate = this.$moment(data.dangerLicenceValidDate)
          this.form.setFieldsValue(data)
        }
      })
    },
    /**
     * 验证码登录查询车头信息
     */
    getTempHeadStock() {
      this.$api.arrange.getTempHeadStock().then(res => {
        if(res.code === 200) {
          const data = res.data
          data.drivingLicenceValidDate = this.$moment(data.drivingLicenceValidDate)
          data.roadTransLicenceValidDate = this.$moment(data.roadTransLicenceValidDate)
          this.form.setFieldsValue(data)
        }
      })
    }
  }
}

</script>
<style scoped>
   #infoForm .ant-form-item{
    margin-bottom: 4px;
  }
</style>
