<template>
  <div>
    <el-dialog
      :title="dataType == 'edit' ? '修改摄像头' : '新增摄像头'"
      v-model="dialogVisible"
      width="36%"
      :before-close="dialogClose"
      class="exhibition_control"
    >
      <el-form ref="form" :model="form" label-width="80px" :rules="rules">
        <el-form-item label="纬度" prop="lat">
          <el-input v-model="form.lat"></el-input>
        </el-form-item>

        <el-form-item label="经度" prop="lon">
          <el-input v-model="form.lon"></el-input>
        </el-form-item>
        <el-form-item label="名称" prop="name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="地理位置" prop="position">
          <el-input type="textarea" v-model="form.position"></el-input>
        </el-form-item>
        <el-form-item label="设备号" prop="stream">
          <el-input v-model="form.stream"></el-input>
        </el-form-item>
        <el-form-item label="拉流地址" prop="url">
          <el-input v-model="form.url"></el-input>
        </el-form-item>
        <el-form-item label="摄像头类型" prop="videoType">
          <el-select v-model="form.videoType" placeholder="请选择摄像头类型">
            <el-option
              v-for="item in options"
              :key="item.videoType"
              :label="item.label"
              :value="item.videoType"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <p style="text-align: center">
        <el-button @click="confirm" class="green-confirm">确认</el-button>
        <el-button @click="close" class="green-close">取消</el-button>
      </p>
    </el-dialog>
  </div>
</template>
<script>
import { addVideo, editVideo } from "_api/tree";
import "viewerjs/dist/viewer.css";
import axios from "axios";
export default {
  props: {
    dataType: {
      type: String,
    },
    dataInfo: {
      type: Object,
    },
  },
  data() {
    return {
      dialogVisible: false,
      form: {
        lat: "",
        lon: "",
        name: "",
        position: "",
        stream: "",
        url: "",
        videoType: 0,
      },
      options: [
        {
          videoType: "0",
          label: "视频流",
        },
        {
          videoType: "3",
          label: "播放地址",
        },
      ],
      rules: {
        lat: [{ required: true, message: " 请输入纬度", trigger: "blur" }],
        lon: [{ required: true, message: "请输入经度", trigger: "blur" }],
        name: [{ required: true, message: "请输入摄像头名称", trigger: "blur" }],
        position: [
          { required: true, message: "请输入地理位置", trigger: "blur" },
        ],
        stream: [{ required: true, message: "请输入设备号", trigger: "blur" }],
        url: [{ required: true, message: "请输入拉流地址", trigger: "blur" }],
        videoType: [
          { required: true, message: "请选择摄像头类型", trigger: "change" },
        ],
      },
    };
  },
  watch: {
    dataInfo(val) {
      this.form = val;
      //   this.form.lat = val.lat;
      //   this.form.lon = val.lon;
      //   this.form.name = val.name;
      //   this.form.position = val.position;
      //   this.form.stream = val.stream;
      //   this.form.videoType = val.videoType;
      //   val.pics.filter((obj) => {
      //     return (obj.url = window.globalUrl.FTP_URL + obj.url);
      //   });
      //   this.fileList = val.pics;
    },
  },
  created() {
    this.dialogVisible = true;
    this.form = this.dataInfo;
  },
  methods: {
    close() {
      this.$parent.showEditAdd = false;
    },
    dialogClose() {
      this.$parent.showEditAdd = false;
    },
    confirm() {
      let that = this;
      that.$refs["form"].validate((valid) => {
        // 表单验证
        if (valid) {
          if (that.dataType == "add") {
            addVideo(that.form).then((res) => {
              if (res.code == 200) {
                that.$message({
                  showClose: true,
                  message: `新增摄像头成功`,
                  type: "success",
                });
                // that.filterRoom(that.form.showroomId);
                that.$parent.handleCurrentChange(1);
                //页面初始化刷新为1
              } else {
                that.$message({
                  showClose: true,
                  message: res.msg,
                  //返回错误信息
                  type: "info",
                });
              }
              that.$parent.showEditAdd = false;
            });
          } else {
            editVideo(that.form).then((res) => {
              if (res.code == 200) {
                that.$message({
                  showClose: true,
                  message: `修改摄像头成功`,
                  type: "success",
                });
                that.$parent.showEditAdd = false;
                that.$parent.init();
              } else {
                that.$message({
                  showClose: true,
                  message: res.message,
                  type: "info",
                });
              }
            });
          }
          // } else {
          //   formData.append("ids", that.deleteArr);
          //   formData.append("id", this.dataInfo.id);
          //   axios({
          //     url: window.globalUrl.HOME_API + "/datamanager/show-room/upItem",
          //     method: "POST", //请求方式
          //     headers: { "content-type": "application/x-www-form-urlencoded" },
          //     data: formData,
          //   }).then((res) => {
          //     if (res.success == true) {
          //       that.$message({
          //         showClose: true,
          //         message: `展物编辑成功！`,
          //         type: "success",
          //       });
          //       that.filterRoom(this.form.showroomId);
          //       that.$parent.showEditAdd = false;
          //       // that.imgVisible = false;
          //     }
          //   });
          // }
        } else {
          return false;
        }
      });
    },
    filterRoom(id) {
      this.tabArr.forEach((item, index) => {
        if (item.id == id) {
          this.$parent.activeTab = index;
          this.$parent.params.id = id;
          let params = {
            id: id,
            page: 1,
            pageSize: 11,
          };
          this.$parent.getCollections(params);
        }
      });
    },
  },
};
</script>

<style lang="less" scoped>
.dialog-footer {
  display: none;
}
.el-tag + .el-tag {
  margin-left: 10px;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
/deep/.el-upload-list--picture-card .el-upload-list__item {
  width: 82px;
  height: 82px;
}
/deep/.el-upload--picture-card {
  width: 82px;
  height: 82px;
  line-height: 82px;
}
/deep/.el-form-item {
  width: 92%;
}
</style>
<style lang="less" scoped>
.exhibition-management .el-dialog__body {
  padding: 30px 30px 10px 70px !important;
}
.img-container {
  position: absolute;
  width: 100%;
  height: 100%;
  > ul {
    list-style: none;
    margin: 0;
    max-width: 30rem;
    padding: 0;
    width: 100%;
    height: 100%;
    display: flex;
    > li {
      flex: 1;
      .img {
        width: 100%;
        height: 100%;
      }
    }
  }
}
.green-confirm {
  background-color: #13a36e;
  border-color: transparent;
  color: #fff;
}
.green-confirm:hover,
.green-confirm:focus {
  color: #ffffff;
  border-color: transparent;
  background-color: #13a36e;
}
// .el-form {
//   max-height: 560px;
//   overflow: auto;
// }
.el-form::-webkit-scrollbar {
  /*滚动条整体样式*/
  width: 4px; /*高宽分别对应横竖滚动条的尺寸*/
  height: 4px;
}
.el-form::-webkit-scrollbar-thumb {
  /*滚动条里面小方块*/
  border-radius: 5px;
  -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  background: rgba(0, 0, 0, 0.2);
}
.el-form::-webkit-scrollbar-track {
  /*滚动条里面轨道*/
  -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  border-radius: 0;
  background: rgba(0, 0, 0, 0.1);
}
</style>