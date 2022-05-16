<template>
  <div>
    <el-dialog
      :title="dataType == 'edit' ? '修改展物' : '新增展物'"
      v-model="dialogVisible"
      width="36%"
      :before-close="dialogClose"
      class="exhibition_control"
    >
      <el-form ref="form" :model="form" label-width="80px" :rules="rules">
        <el-form-item label="展物名称" prop="name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="展物排序" prop="order">
          <el-input-number
            v-model="form.order"
            :min="1"
            :max="10000"
          ></el-input-number>
        </el-form-item>
        <el-form-item label="展示形式" prop="showType">
          <el-input v-model="form.showType"></el-input>
        </el-form-item>
        <el-form-item label="所属展厅" prop="showroomId">
          <el-select v-model="form.showroomId" placeholder="请选择展厅">
            <el-option
              :label="item.name"
              :value="item.id"
              v-for="item in tabArr"
              :key="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="展物详情" prop="info">
          <el-input type="textarea" v-model="form.info"></el-input>
        </el-form-item>
        <!-- <el-form-item label="内容">
          <el-tag
            :key="tag"
            v-for="tag in dynamicTags"
            closable
            :disable-transitions="false"
            @close="handleClose(tag)"
          >
            {{ tag }}
          </el-tag>
          <el-input
            class="input-new-tag"
            v-if="inputVisible"
            v-model="inputValue"
            ref="saveTagInput"
            size="small"
            @keyup.enter.native="handleInputConfirm"
            @blur="handleInputConfirm"
          >
          </el-input>
          <el-button
            v-else
            class="button-new-tag"
            size="small"
            @click="showInput"
            >新增内容</el-button
          >
        </el-form-item> -->
        <el-form-item label="展物照片">
          <el-upload
            class="upload-demo"
            action="#"
            ref="upload"
            :multiple="true"
            accept="image/jpeg,image/jpg,image/png"
            :auto-upload="false"
            :on-preview="handlePreview"
            :on-change="handleChange"
            :on-remove="handleRemove"
            :file-list="fileList"
            list-type="picture-card"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
        </el-form-item>
      </el-form>
      <p style="text-align: center">
        <el-button @click="confirm" class="green-confirm">确认</el-button>
        <el-button @click="close" class="green-close">取消</el-button>
      </p>
    </el-dialog>
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
import Viewer from "viewerjs";
import "viewerjs/dist/viewer.css";
import axios from 'axios';
export default {
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
      gallery: [],
      dynamicTags: [],
      tabArr: [],
      fileList: [],
      deleteArr: [],
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
        items: [],
        showroomId: '',
        showType: ''
      },
      rules: {
        name: [
          { required: true, message: ' ', trigger: 'blur' },
        ],
        info: [
          { required: false, message: '请输入展物详情', trigger: 'blur' }
        ],
        order: [
          { required: true, message: '请输入展物序号', trigger: 'change' }
        ],
        showroomId: [
          { required: true, message: ' ', trigger: 'change' }
        ],
        showType: [
          { required: true, message: ' ', trigger: 'blur' }
        ],
      }
    }
  },
  watch: {
    dataInfo(val) {
      this.deleteArr = [];
      this.form.name = val.name;
      this.form.info = val.info;
      this.form.order = val.order;
      this.form.showroomId = val.showroomId;
      this.form.showType = val.showType;
      this.dynamicTags = val.items;
      val.pics.filter(obj => {
        return obj.url = window.globalUrl.FTP_URL + obj.url;
      })
      this.fileList = val.pics;
    }
  },
  created() {
    this.dialogVisible = true;
    this.tabArr = this.$parent.tabArr;
  },
  methods: {
    close() {
      this.$parent.showEditAdd = false;
    },
    handleRemove(file, fileList) {
      this.fileList = fileList;
      this.deleteArr.push(file.id);
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
    handleDownload(file) {
    },
    dialogClose() {
      this.$parent.showEditAdd = false;
      this.imgVisible = false;
    },
    confirm() {
      let that = this;
      that.$refs['form'].validate((valid) => {
        if (valid) {
          let formData = new FormData();
          // let params = JSON.parse(JSON.stringify(that.form));
          // params.items = that.dynamicTags;
          if (that.fileList.length > 0) {
            params.file = that.fileList[0].raw;
            that.fileList.forEach((element) => {
              formData.append("file", element.raw);
            });
          }
          formData.append("showroomId", params.showroomId);
          formData.append("name", params.name);
          formData.append("order", params.order);
          formData.append("showType", params.showType);
          formData.append("info", params.info);
          // formData.append("items", that.dynamicTags);
          if (this.dataType == 'add') {
            axios({
              url: window.globalUrl.HOME_API + '/datamanager/show-room/addItem',
              method: 'POST', //请求方式
              headers: { 'content-type': 'application/x-www-form-urlencoded' },
              data: formData,
            }).then(res => {
              if (res.success == true) {
                this.$message({
                  showClose: true,
                  message: `新增展物成功`,
                  type: 'success'
                });
                that.filterRoom(this.form.showroomId);
                that.$parent.showEditAdd = false;
                that.imgVisible = false;
              }
            })
          } else {
            formData.append("ids", that.deleteArr);
            formData.append("id", this.dataInfo.id);
            axios({
              url: window.globalUrl.HOME_API + '/datamanager/show-room/upItem',
              method: 'POST', //请求方式
              headers: { 'content-type': 'application/x-www-form-urlencoded' },
              data: formData,
            }).then(res => {
              if (res.success == true) {
                that.$message({
                  showClose: true,
                  message: `展物编辑成功！`,
                  type: 'success'
                });
                that.filterRoom(this.form.showroomId);
                that.$parent.showEditAdd = false;
                that.imgVisible = false;
              }
            })
          }

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
          let params={
            id:id,
            page: 1,
            pageSize: 11
          }
           this.$parent.getCollections(params);
        }
      })
    },
    handleClose(tag) {
      this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
    },

    showInput() {
      this.inputVisible = true;
      this.$nextTick(() => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },

    handleInputConfirm() {
      let inputValue = this.inputValue;
      if (inputValue) {
        this.dynamicTags.push(inputValue);
      }
      this.inputVisible = false;
      this.inputValue = '';
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