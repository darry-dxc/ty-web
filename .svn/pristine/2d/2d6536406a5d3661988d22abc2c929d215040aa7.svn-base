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
              'plateNumber'
            ]"
          />
        </a-form-item>
        <a-form-item
          label="行驶证有效期止"
          :label-col="labelCol"
          :wrapper-col="wrapperCol"
        >
          <a-date-picker
            disabled
            placeholder="选择日期"
            style="width:100%"
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
            readOnly
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
          <a-date-picker
            disabled
            placeholder="选择日期"
            style="width:100%"
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
              'businessScope'
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
      this.$api.qualification.getHeadstockById(id).then(res => {
        if(res.code === 200) {
          let {
            plateNumber,
            userNature,
            drivingLicenceValidDate,
            drivingLicenceAttachment,
            roadTransLicenceValidDate,
            roadTransLicenceNumber,
            roadTransLicenceAttachment,
            businessScope
          } = res.data
          drivingLicenceValidDate = this.$moment(drivingLicenceValidDate);
          roadTransLicenceValidDate = this.$moment(roadTransLicenceValidDate);
          // escortLicenceAttachment = (escortLicenceAttachment === null || escortLicenceAttachment === "")? '未上传': '已上传'
          this.$nextTick(() => {
            this.form.setFieldsValue({
              plateNumber,
              userNature,
              drivingLicenceValidDate,
              drivingLicenceAttachment,
              roadTransLicenceValidDate,
              roadTransLicenceNumber,
              roadTransLicenceAttachment,
              businessScope
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
