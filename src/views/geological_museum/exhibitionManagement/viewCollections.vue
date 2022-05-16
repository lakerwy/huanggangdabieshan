<template>
  <div>
    <el-dialog
      title="展物详情"
      v-model="dialogVisible"
      width="40%"
      :before-close="dialogClose"
      custom-class="zwxq"
    >
      <el-form :model="form" label-width="100px">
        <el-form-item label="展物名称：">
          <span>{{ form.name }}</span>
        </el-form-item>
        <el-form-item label="展物排序：">
          <span>{{ form.order }}</span>
        </el-form-item>
        <el-form-item label="展示形式：">
          <span>{{ form.showType }}</span>
        </el-form-item>
        <el-form-item label="所属展厅：">
          <span>{{ roomName }}</span>
        </el-form-item>
        <el-form-item label="展物详情：">
          <span>{{ form.info }}</span>
        </el-form-item>
        <el-form-item label="内容：">
          <el-tag :key="tag" v-for="tag in form.items">
            {{ tag }}
          </el-tag>
        </el-form-item>
        <el-form-item label="展物照片：">
          <div
            class="form-normal"
            style="
              height: 250px;
              width: 376px;
              margin: 10px 0;
              overflow: hidden;
            "
          >
            <el-image :src="largeImg" :preview-src-list="allImgs"> </el-image>
          </div>
          <div class="uploaded" v-if="allImgs.length > 0">
            <div class="img-list">
              <div class="con">
                <div class="list" v-for="(item, index) in imgs" :key="index">
                  <img :src="item" alt="" @click="largeImg = item" />
                </div>
              </div>
              <img
                class="prev"
                :class="{ disabled: uploadedPage <= 1 }"
                src="imgs/prev.png"
                alt=""
                @click="prevPage"
              />
              <img
                class="next"
                :class="{ disabled: imgs.length < uploadedSize * uploadedPage }"
                src="imgs/next.png"
                alt=""
                @click="nextPage"
              />
            </div>
          </div>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script> 
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
      dynamicTags: [],
      allImgs: [],
      tabArr: [],
      imgs: [],
      form: {},
      dialogVisible: false,
      imgVisible: false,
      disabled: false,
      dialogImageUrl: '',
      roomName: '',
      largeImg: '',
      uploadedPage: 1,
      uploadedSize: 3
    }
  },
  watch: {
    dataInfo(val) {
      this.form = val;
      this.filterRoomName(val.showroomId);
      let arr = [];
      if (val.pics.length > 0) {
        val.pics.forEach(obj => {
          arr.push(window.globalUrl.FTP_URL + obj.url);
        })
        this.largeImg = arr[0];
        this.allImgs = arr;
        this.changeUpload();
      } else {
        this.allImgs = [];
      }

    }
  },
  created() {
    this.dialogVisible = true;
    this.tabArr = this.$parent.tabArr;
  },
  methods: {
    changeUpload() {
      this.imgs = this.allImgs.slice((this.uploadedPage - 1) * this.uploadedSize, this.uploadedSize * this.uploadedPage)
    },
    prevPage() {
      if (this.uploadedPage > 1) {
        this.uploadedPage--;
        this.changeUpload();
      } else {
        return;
      }
    },
    nextPage() {
      if (this.allImgs.length > this.uploadedPage * this.uploadedSize) {
        this.uploadedPage++;
        this.changeUpload();
      } else {
        return;
      }
    },
    filterRoomName(id) {
      this.tabArr.forEach(item => {
        if (item.id == id) {
          this.roomName = item.name;
        }
      })
    },
    dialogClose() {
      this.$parent.abouttype = '';
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
  margin-bottom: 0;
}
</style>
<style lang="less" scoped>
/deep/.zwxq .el-dialog__body {
  padding: 8px 30px 10px 70px;
}
/deep/.el-image {
  width: 100%;
  .el-image__error {
    display: none;
  }
}
.img-container {
  position: absolute;
  width: 100%;
  height: 100%;
  > ul {
    list-style: none;
    margin: 0;
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
  min-height: 410px;
}
.el-carousel__container {
  height: 276px;
  border: 1px solid #f1ebeb;
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
.uploaded {
  margin-left: -12px;
  .next-btn {
    margin-top: 44px;
  }
  .img-list {
    width: 468px;
    height: 110px;
    overflow: hidden;
    margin: 0 auto;
    padding: 0 32px;
    margin-bottom: 20px;
    position: relative;
    .con {
      width: 100%;
      height: 100%;
      overflow: hidden;
      display: flex;
      justify-content: flex-start;
    }
    .list {
      height: 100%;
      position: relative;
      img {
        width: 148px;
        margin-right: 8px;
      }
      .img_del {
        position: absolute;
        width: 100%;
        bottom: 0;
        height: 24px;
        background: rgba(0, 0, 0, 0.4);
        img {
          position: absolute;
          right: 10px;
          width: 20px;
          cursor: pointer;
        }
      }
    }
    .list:last-child {
      margin-right: 0;
    }
    .prev {
      position: absolute;
      top: 34%;
      left: 0;
      cursor: pointer;
    }
    .next {
      position: absolute;
      top: 34%;
      right: 0;
      cursor: pointer;
    }
    .disabled {
      opacity: 0.5;
      cursor: default;
    }
  }
}
</style>