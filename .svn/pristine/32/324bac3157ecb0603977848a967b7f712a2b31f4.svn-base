<!-- 单点登录页面 -->
<template>
  <div>即将跳转到登录后页面~~~</div>
</template>

<script>
export default {
  data() {
    return {};
  },

  created() {
    const query = this.$route.query;
    if (query.code === '200') {
      sessionStorage.setItem("token", query.token);
      this.$api.login.oaLogin().then(res => {
        if (res.code === 200) {
          this.$message.success("登录成功！");
          sessionStorage.setItem('role', res.data.type)
          switch (res.data.type) {
            case "信息录入员":
              this.$router.push({ path: "/transpotArrange" });
              this.$store.commit("setAccount", res.data.entryStaffName);
              this.$store.commit("getUserInfo", res.data);
              sessionStorage.setItem("account", res.data.entryStaffName);
              sessionStorage.setItem("userPhone", res.data.entryStaffPhone);
              sessionStorage.setItem("userEmail", res.data.entryStaffEmail);
              sessionStorage.setItem(
                "entryStaffAccount",
                res.data.entryStaffAccount
              );
              sessionStorage.setItem("currentPath", "/transpotArrange");
              break;
            case "公司门卫":
              this.$router.push({ path: "/guard" });
              this.$store.commit("setAccount", res.data.companyName);
              sessionStorage.setItem("account", res.data.doorKeeperAccount);
              sessionStorage.setItem("companyName", res.data.companyName);
              sessionStorage.setItem("currentPath", "/guard");
              break;
            case "管理层人员":
              this.$router.push({ path: "/adminList" });
              this.$store.commit("setAccount", res.data.companyName);
              sessionStorage.setItem("account", res.data.managerAccount);
              sessionStorage.setItem("companyName", res.data.companyName);
              sessionStorage.setItem("currentPath", "/adminList");
              break;
            case "系统管理员":
              this.$router.push({ path: "/seniorAdmin" });
              this.$store.commit("setAccount", res.data.type);
              sessionStorage.setItem("account", res.data.type);
              sessionStorage.setItem("currentPath", "/seniorAdmin");
              break;
            default:
              break;
          }
        }
      });
    }
  }
};
</script>
<style scoped>
div {
  text-align: center;
  height: 120px;
  line-height: 120px;
}
</style>