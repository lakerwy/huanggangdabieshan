<template>
  <div>
    <el-dialog
      v-if="dataType !== 'view'"
      :title="dataType == 'edit' ? '修改推文' : '新增推文'"
      v-model="dialogVisible"
      :before-close="dialogClose"
      class="exhibition_control"
    >
      <el-form ref="form" :model="form" label-width="80px" :rules="rules">
        <el-form-item label="推文标题" prop="name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <!-- <el-form-item label="推文排序" prop="order">
          <el-input-number
            v-model="form.order"
            :min="1"
            :max="10000"
          ></el-input-number>
        </el-form-item> -->
        <!-- <el-form-item label="推文详情" prop="info">
          <el-input type="textarea" v-model="form.info"></el-input>
        </el-form-item> -->
        <el-form-item label="推文封面">
          <el-upload
            class="upload-demo"
            action="#"
            ref="upload"
            :multiple="false"
            :limit="1"
            accept="image/jpeg,image/jpg,image/png"
            :auto-upload="false"
            :on-preview="handlePreview"
            :on-change="handleChange"
            :on-remove="handleRemove"
            :on-exceed="handleExceed"
            :file-list="fileList"
            list-type="picture-card"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
        </el-form-item>
      </el-form>
      <EDITOR
        v-if="dialogVisible"
        :isClear="isClear"
        @editorString="editorString"
        ref="editor"
      ></EDITOR>
      <p style="text-align: center">
        <el-button @click="confirm" class="green-confirm">确认</el-button>
        <el-button @click="close" class="green-close">取消</el-button>
      </p>
    </el-dialog>
    <div class="tweet_detail" v-else>
      <el-dialog
        title="推文详情"
        v-model="dialogVisible"
        :before-close="dialogClose"
        :fullscreen="dialogFull"
        width="100%"
        custom-class="exhibition_detail"
      >
        <div v-html="dataInfo.info" class="details" v-if="dataInfo.info"></div>
        <!-- <i
          class="el-icon-full-screen"
          @click="dialogFull = !dialogFull"
          style="font-size: 20px"
          :title="!dialogFull ? '点击全屏' : '点击缩小'"
        ></i> -->
      </el-dialog>
    </div>
    <div class="img-container" v-if="imgVisible">
      <ul id="viewer">
        <li v-for="(item, index) in gallery" :key="index">
          <img class="user-avatar" :data-original="item" src="" />
        </li>
      </ul>
    </div>
  </div>
</template>
<script> 
import editor from './editor'
import Viewer from "viewerjs";
import "viewerjs/dist/viewer.css";
import axios from 'axios';
export default {
  components: {
    EDITOR: editor
  },
  props: {
    dataType: {
      type: String
    },
    dataInfo: {
      type: Object
    }
  },
  data() {
    return {
      isClear: false,//清除富文本编辑器内容
      dialogFull: false,//默认不全屏
      gallery: [],
      editorVal: '',
      fileList: [],
      inputVisible: false,
      dialogVisible: false,
      imgVisible: false,
      disabled: false,
      inputValue: '',
      dialogImageUrl: '',
      form: {
        order: 1,
        name: '',
        info: '',
      },
      rules: {
        name: [
          { required: true, message: ' ', trigger: 'blur' },
        ]
      }
    }
  },
  watch: {
    dataInfo(val) {
      if (this.dataType !== 'view') {
        this.form.name = val.title;
        this.fileList = [{ url: window.globalUrl.FTP_URL + val.cover }];
        if (this.$refs.editor.editor) {
          this.$refs.editor.editor.txt.html(val.info);
        }
      }
    },
  },
  created() {
    this.dialogVisible = true;
  },
  beforeUnmount() {
    this.editorVal = '';
    if (this.$refs.editor) {
      this.$refs.editor.editor.destroy();
    }
  },
  methods: {
    editorString(val) {
      this.editorVal = val;
    },
    close() {
      this.$parent.showTweetAdd = false;
    },
    handleRemove(file, fileList) {
      this.fileList = fileList;
    },
    handleExceed() {
      this.$message.warning(`只允许上传一张封面`);
    },
    handlePreview(file) {
      var that = this;
      that.imgVisible = true;
      that.gallery = [file.url];
      // 必须使用this.$nextTick！否则第一次点击没有图片展示！
      that.$nextTick(function () {
        var viewer = new Viewer(document.getElementById('viewer'), {
          url: 'data-original',
          navbar: false,
          fullscreen: false,
          hide: function () { //在图片消失的时候销毁viewer
            viewer.destroy()
          }
        });
        viewer.show()
      })
    },
    handleChange(file, fileList) {
      this.fileList = fileList;
    },
    dialogClose() {
      if (this.$refs.editor) {
        this.$refs.editor.editor.destroy();
      }
      this.$parent.showTweetAdd = false;
      this.imgVisible = false;
    },
    confirm() {
      let that = this;
      that.$refs['form'].validate((valid) => {
        if (valid) {
          let formData = new FormData();
          let params = JSON.parse(JSON.stringify(that.form));
          if (that.fileList.length > 0) {
            formData.append("file", that.fileList[0].raw);
          }
          formData.append("title", params.name);
          formData.append("info", that.editorVal);
          if (that.dataType == 'add') {
            axios({
              url: window.globalUrl.HOME_API + '/datamanager/article/addArt',
              method: 'POST', //请求方式
              headers: { 'content-type': 'application/x-www-form-urlencoded' },
              data: formData,
            }).then(res => {
              if (res.success == true) {
                that.$message({
                  showClose: true,
                  message: `新增成功！`,
                  type: 'success'
                });
                that.$parent.showTweetAdd = false;
                that.imgVisible = false;
                let params = {
                  page: 1,
                  pageSize: 10
                }
                that.$parent.getList(params);
              } else {
                that.$message({
                  showClose: true,
                  message: res.message,
                  type: 'error'
                });
              }
            })
          } else {
            formData.append("id", that.dataInfo.id);
            axios({
              url: window.globalUrl.HOME_API + '/datamanager/article/upArt',
              method: 'POST', //请求方式
              headers: { 'content-type': 'application/x-www-form-urlencoded' },
              data: formData,
            }).then(res => {
              if (res.success == true) {
                that.$message({
                  showClose: true,
                  message: `推文更新成功！`,
                  type: 'success'
                });
                that.$parent.showTweetAdd = false;
                that.imgVisible = false;
                let params = {
                  page: 1,
                  pageSize: 10
                }
                that.$parent.getList(params);
              } else {
                that.$message({
                  showClose: true,
                  message: res.message,
                  type: 'error'
                });
              }
            })
          }
        } else {
          return false;
        }
      });
    }
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
  margin-bottom: 18px;
}
</style>
<style lang="less" scoped>
:deep(.el-dialog__body) {
  min-height: 360px;
}
.tweet_detail {
  position: relative;
  .details {
    min-height: 360px;
  }
  // /deep/.el-dialog__body {
  //   height: 560px;
  //   overflow: auto;
  //   min-height: 560px;
  // }
  .el-icon-full-screen {
    position: absolute;
    right: 50px;
    top: 18px;
  }
}
.exhibition-management .el-dialog__body {
  padding: 30px 30px 10px 70px !important;
}
.tweet_detail {
  .el-overlay {
    // overflow: hidden !important;
  }
  .el-dialog__body {
    padding: 0 20px 10px 20px !important;
    // overflow-y: auto !important;
  }
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

.el-form {
  max-height: 560px;
  overflow: hidden;
}
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
/deep/ .exhibition_detail {
  width: 100%;
  height: 100% !important;
  margin-top: 0 !important;
  margin: 0 !important;
}
</style>