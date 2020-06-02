<!--  -->
<template>
  <div>
    <a-form
        :form="form"
        :style="{ width:'678px' }"
      >
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
          <a-date-picker
            disabled
            placeholder="选择日期"
            style="width:100%"
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
              'businessScope'
            ]"
          />
        </a-form-item>
        <a-form-item
          label="罐体检查报告有效期止"
          :label-col="labelCol"
          :wrapper-col="wrapperCol"
        >
          <a-date-picker
            disabled
            placeholder="选择日期"
            style="width:100%"
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
  </div>
</template>

<script>
export default {
  data () {
    return {
      form: this.$form.createForm(this),
      labelCol: {
        xs: { span: 24 },
        sm: { span: 10 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 }
      },
    };
  },

  created() {
    this.fetch(this.$route.query.id)
  },

  methods: {
    fetch(id) {
      this.$api.qualification.getTrailerById(id).then(res => {
        if(res.code === 200) {
          let {
            trailerPlateNumber,
            dangerChemLicenceNumber,
            dangerChemLicenceValidDate,
            dangerChemLicenceAttachment,
            businessScope,
            tankInspectionValidDate,
            tankInspectionAttachment,
            tankMaterial,
            fillingMaterial
          } = res.data
          dangerChemLicenceValidDate = this.$moment(dangerChemLicenceValidDate)
          tankInspectionValidDate = this.$moment(tankInspectionValidDate)
          this.$nextTick(() => {
            this.form.setFieldsValue({
              trailerPlateNumber,
              dangerChemLicenceNumber,
              dangerChemLicenceValidDate,
              dangerChemLicenceAttachment,
              businessScope,
              tankInspectionValidDate,
              tankInspectionAttachment,
              tankMaterial,
              fillingMaterial
            })
          })
        }
      })
    }
  }
}

</script>
<style scoped>
  .actionForm {
    width: 60%
  }
</style>
