<!--  -->
<template>
  <div>
    <a-form
      :form="form"
      :style="{ width:'678px' }"
      >
        <a-form-item
          label="姓名"
          :label-col="labelCol"
          :wrapper-col="wrapperCol"
        >
          <a-input
            readOnly
            v-decorator="[
              'driverName',
            ]"
          />
        </a-form-item>
        <a-form-item
          label="手机号码1"
          :label-col="labelCol"
          :wrapper-col="wrapperCol"
        >
          <a-input
            readOnly
            v-decorator="[
              'phone1',
            ]"
          />
        </a-form-item>
        <a-form-item
          label="手机号码2"
          :label-col="labelCol"
          :wrapper-col="wrapperCol"
        >
          <a-input
            readOnly
            v-decorator="[
              'phone2',
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
              'dangerLicenceNumber',
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
      </a-form>
  </div>
</template>

<script>
export default {
  beforeCreate () {
    this.form = this.$form.createForm(this)
  },
  data () {
    return {
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
      this.$api.qualification.getDriverById(id).then(res => {
        if(res.code === 200) {
          let {
            driverName,
            phone1,
            phone2,
            driverLicenceNumber,
            driverLicenceValidDate,
            driverLicenceAttachment,
            dangerLicenceNumber,
            dangerLicenceAttachment,
            dangerLicenceValidDate
          } = res.data
          this.$nextTick(() => {
            this.form.setFieldsValue(res.data)
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
