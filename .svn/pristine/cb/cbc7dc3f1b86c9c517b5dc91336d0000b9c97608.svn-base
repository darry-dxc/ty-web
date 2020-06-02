<!--  -->
<template>
  <div>
    <a-form
      :form="form"
      :style="{ width:'678px' }"
      >
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
          <a-date-picker
            disabled
            placeholder="选择日期"
            style="width:100%"
            v-decorator="[
              'escortLicenceValidDate'
            ]"
          />
        </a-form-item>
        <!-- <a-form-item
          label="押运证附件"
          :label-col="labelCol"
          :wrapper-col="wrapperCol"
        >
          <span>
            {{form.getFieldValue('escortLicenceAttachment')}}
          </span>
        </a-form-item> -->
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
      this.$api.qualification.getEscortById(id).then(res => {
        if(res.code === 200) {
          let {
            escortName,
            escortPhone,
            escortLicenceNumber,
            escortLicenceValidDate,
            escortLicenceAttachment
          } = res.data
          escortLicenceValidDate = this.$moment(escortLicenceValidDate);
          // escortLicenceAttachment = (escortLicenceAttachment === null || escortLicenceAttachment === "")? '未上传': '已上传'
          this.$nextTick(() => {
            this.form.setFieldsValue({
              escortName,
              escortPhone,
              escortLicenceNumber,
              escortLicenceValidDate,
              escortLicenceAttachment
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
