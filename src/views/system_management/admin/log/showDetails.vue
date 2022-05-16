<template>
  <div>
    <el-dialog
      title="查看日志"
      v-model="dialogVisible"
      :before-close="dialogClose"
    >
      <el-form ref="form" :model="form" label-width="120px" :label-position="labelPosition" > 
        <el-form-item label="类型：">{{form.type == 0 ? '正常' : '异常'}}</el-form-item>
        <el-form-item label="标题：">{{form.title}} </el-form-item>
        <el-form-item label="IP地址：">{{form.remoteAddr}}</el-form-item>
        <el-form-item label="请求方式：">{{form.method}} </el-form-item>
        <el-form-item label="客户端：">{{form.serviceId}}</el-form-item>
        <el-form-item label="请求时间：">{{form.time?form.time+'秒':null}} </el-form-item>
        <el-form-item label="创建时间：">{{form.createTime}}</el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script> 
export default {
  props: {
    dataInfo: {
      type: Object,
    },
  },
  data() {
    return {
      labelPosition: 'left',
      dialogVisible: false,
      form: {
        type: "",
        title: "",
        remoteAddr: "",
        method: "",
        serviceId: "",
        time: "",
        createTime: "",
      },
    };
  },
  created() {
    this.dialogVisible = true;
    this.form = this.dataInfo;
  },
  methods: {
    close() {
      this.$parent.detailShowif = false;
    },
    dialogClose() {
      this.$parent.detailShowif = false;
    },
  },
};
</script>
<style lang="less" scoped>
/deep/.el-dialog{
  width: 36% !important;
}
/deep/.el-form{
  margin-left:100px;
  .el-form-item{
    margin-bottom:12px;
  }
}
</style>
