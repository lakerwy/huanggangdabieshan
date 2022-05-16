<template>
  <div>
    <div class="uploadListBox">
      <el-card class="box-card">
        <template #header>
          <div class="clearfix">
            <div class="title">传输列表</div>
            <el-button
              type="text"
              icon="el-icon-close"
              style="float: right; "
              @click="closeUploadList"
            ></el-button>
            <el-button
              type="text"
              icon="el-icon-minus"
              style="float: right; margin-right:10px"
              @click="closeUploadList"
            ></el-button>
          </div>
        </template>
        <div class="scrollbar bodyUploadList">
          <el-table :data="newTableData" style="width: 100%" highlight-current-row>
            <el-table-column width="50">
              <img
                style="vertical-align:middle;width: 22px;"
                src="imgs/icon_folder.png"
                alt=""
              />
            </el-table-column>
            <el-table-column width="300">
              <template #default="scope">
                <div class="progressList">
                  <div class="progressList-name">{{ scope.row.name }}</div>
                  <el-progress
                    :percentage="scope.row.percentage"
                    :format="format"
                  ></el-progress>
                  <div class="progressList-name path">{{scope.row.webkitRelativePath}}</div>
                </div>
              </template>
            </el-table-column>
            <el-table-column>
              <template #default="scope">
                <el-button
                  type="text"
                  icon="el-icon-circle-close"
                  style="float: right;margin-left:10px; padding: 3px 0;font-size:18px"
                  @click.native.prevent="deleteRow(scope.$index, tableData)"
                ></el-button>
                <el-button
                  v-show="isPlay"
                  type="text"
                  icon="el-icon-video-play"
                  style="float: right; padding: 3px 0;font-size:18px"
                  @click="handlePlay(scope.row)"
                ></el-button>
                <el-button
                  v-show="!isPlay"
                  type="text"
                  icon="el-icon-video-pause"
                  style="float: right; padding: 3px 0;font-size:18px"
                  @click="handlePause(scope.row)"
                ></el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div style="display:flex;justify-content:space-between;align-items: center;border-top: 1px solid #dedede;">
          <span style="font-size:12px;">
            <span>当前总文件 {{total}} 个，已上传 {{finished}} 个, 失败 {{failed}} 个。</span>
          </span>
          <el-button
            type="primary"
            size="mini"
            style="margin-bottom:20px;margin-top:20px"
            @click="cancle">全部取消</el-button
          >
          <el-button
            type="primary"
            size="mini"
            style="margin-right:10px;
            margin-bottom:20px;margin-top:20px"
            >全部暂停</el-button
          >
        </div>
      </el-card>
    </div>
  </div>

</template>

<script>
import { defineComponent, toRefs, ref, watch, unref } from 'vue'
import { uploadFiles, getProgress } from '@/api/files.js'
import { ElMessage, ElMessageBox } from 'element-plus'
import { getCookie } from '@/utils/util.js'
import { getStore } from '@/utils/store.js'

export default {
  props: {
    tableData: {
      type: Array
    },
    currentFolder: {
      type: Object
    },
    total: {
      type: Number
    }
  },
  setup(props, context) {
    const { tableData, currentFolder, total } = toRefs(props)
    const newTableData = ref([])
    const finished = ref(0);
    const failed = ref(0);
    const failedFiles = ref([]);
    const errorDialogVisible = ref(false)
    let messageInstance = null;
    watch(
      () => tableData,
      (newV) => {
        newTableData.value = [...tableData.value];
      },
      {deep: true, immediate: true}
    )

    const isPlay = ref(false)
    const progress = ref(60)
    const isFinish = ref(true)

    // 删除行
    const deleteRow = (index, rows) => {
      rows.splice(index, 1);
    }
    //点击暂停按钮
    const handlePause = () => {

    }
    //点击play(继续)按钮
    const handlePlay = () => {

    }
    // 当上传值到达100的时候，显示的内容
    const format = (percentage) => {
      return percentage === 100 ? "上传成功" : `${percentage}%`;
    }

    let uploadIntervel = ref(null); // 定时器
    let currentUploadFile = {};
    const getUploadProgress = async () => {
      currentUploadFile = unref(newTableData)[0];
      finished.value = 0;
      failed.value = 0;
      // unref(filelist).map(item => {
      //   params.append('fileNameList', item.name)
      // })
      let handler = async function() {
        let params = new FormData();
        // params.append('fileNameList', currentUploadFile.name);
        params.append('sessionId', getStore({name: 'access_token'}));
        let res = await getProgress(params);
        let { success, body } = res;
        if(success) {
          if(Object.keys(body).length) {
            Object.keys(body).map(key => {
              for(let i = 0; i < unref(newTableData).length; i ++) {
                if(unref(newTableData)[i].name == key || unref(newTableData)[i].webkitRelativePath == key) {
                  (newTableData.value)[i].percentage = parseFloat((body[key] * 100).toFixed(2));
                  context.emit("update:tableData", newTableData.value)
                }
                if((newTableData.value)[i].percentage == 100) {
                  finished.value ++;
                  setTimeout(() => {
                    unref(newTableData).splice(i, 1)
                    context.emit("update:tableData", newTableData.value)
                    context.emit('refreshTableData');
                    handleFinished();                                                                                
                  }, 500)
                }

                // if(body[key] < 1) {
                //   if(unref(newTableData)[i].name == key || unref(newTableData)[i].webkitRelativePath == key) {
                //     (newTableData.value)[i].percentage = parseFloat((body[key] * 100).toFixed(2));
                //     context.emit("update:tableData", newTableData.value)
                //   }
                // } else if(body[key] == 1) {
                //   // 上传进度为1上传完成
                //   if(unref(newTableData)[i].name == key || unref(newTableData)[i].webkitRelativePath == key) {
                //     (newTableData.value)[i].percentage = parseFloat((body[key] * 100).toFixed(2));
                //     context.emit("update:tableData", newTableData.value)
                //   }
                //   unref(newTableData).splice(i, 1)
                //   context.emit("update:tableData", newTableData.value)
                //   context.emit('refreshTableData');
                //   if(!unref(newTableData).length) {
                //     // 已经没有文件需要上传
                //     clearInterval(uploadIntervel);
                //     closeUploadList();
                //   } else {
                //     fileUpload();
                //   }
                // }
              }
            })
          }
        }
      }
      handler(); 
      fileUpload();
      uploadIntervel.value = setInterval(handler, 2000);
    }

    // const change = () => {
    //   for(let i = 0; i < unref(newTableData).length; i ++) {
    //     (newTableData.value)[i].percentage = parseFloat((0.232 * 100).toFixed(2));
    //     context.emit("update:tableData", newTableData.value)
    //   }
    // }

    const fileUpload = async () => {
      debugger;
return;
      currentUploadFile = unref(newTableData)[0];
      let formData = new FormData();
      // formData.append('pid', unref(currentFolder).id);
      formData.append('pid', currentUploadFile.pid);
      formData.append('sessionId', getStore({name: 'access_token'}));
      formData.append('files', currentUploadFile)
      // 获取上传进度
      let res = await uploadFiles(formData);
      debugger;
      let { success, message } = res;
      if(messageInstance) {
        messageInstance.close()
      }
      if(success) {
        // ElMessage({
        //   message: '上传成功！',
        //   type: 'success'
        // });
        // context.emit('refreshTableData');
        // unref(newTableData).shift();
        // context.emit("update:tableData", newTableData.value)
        // context.emit('refreshTableData');
        // if(!unref(newTableData).length) {
        //   // 已经没有文件需要上传
        //   closeUploadList();
        // } else {
        //   fileUpload();
        // }
        // finished.value ++;
      } else {
        messageInstance = ElMessage({
          message: message,
          type: 'error'
        });
        failed.value ++;
        failedFiles.value.push(Object.assign(currentUploadFile, {errorMsg: message}));
        let index = unref(newTableData).indexOf(currentUploadFile);
        unref(newTableData).splice(index > -1 ? index : 0, 1)
        context.emit("update:tableData", newTableData.value)
        handleFinished();
      }
    }

    // 上传结束操作
    const handleFinished = () => {
      if(!unref(newTableData).length) {
        // 已经没有文件需要上传
        clearInterval(uploadIntervel.value);
        closeUploadList();
        if(failed.value) {
          handleFaild();
        }
      } else {
        fileUpload();
      }
    }

    // 处理失败的文件
    const handleFaild = () => {
      // ElMessageBox.confirm(`当前有${failed.value}个文件上传失败，是否重新上传？`, '提示', {
      //   confirmButtonText: '确定',
      //   cancelButtonText: '取消',
      //   type: 'warning'
      // }).then(async () => {
      //   context.emit("update:tableData", failedFiles.value)
      //   context.emit('failedSubmit', 'failed');
      // })
      // .catch(() => {
      //   ElMessage({
      //     message: '已取消',
      //     type: 'info'
      //   });
      // })
      setTimeout(() => {
        context.emit('failedSubmit', failedFiles.value);
      }, 500)
    }

    // 点击传输列表的关闭按钮
    const closeUploadList = () => {
      context.emit("fatherClose");
    }

    // 全部取消
    const cancle = () => {
      debugger;
      clearInterval(uploadIntervel.value);
      closeUploadList();
    }

    return {
      newTableData,
      isPlay,
      progress,
      isFinish,
      uploadIntervel,
      deleteRow,
      handlePause,
      handlePlay,
      format,
      closeUploadList,
      getUploadProgress,
      fileUpload,
      cancle,
      total,
      finished,
      failed,
      errorDialogVisible
    }
  },
}
</script>

<style lang="less" scoped>
@vh:10.8vh;
.bodyUploadList {
  height: 445 / @vh;
  overflow-y: auto;
}

.uploadListBox /deep/ .el-card__body {
  padding-top: 0;
}

.uploadListBox /deep/ .el-table__header-wrapper {
  display: none;
}

.uploadListBox /deep/ .el-button + .el-button {
  margin-left: 0;
}

.uploadListBox /deep/ .el-card__header {
  padding: 0px 20px;
}

.progressList /deep/ .el-progress-bar {
  padding-right: 0;
}

.progressList /deep/ .el-progress__text {
  font-size: 12px;
  position: absolute;
  top: -15px;
  // margin-left: -10px;
  right: -10px;
}

.progressList-name {
  width: 200px;
  overflow: hidden;
  font-size: 14px;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.path {
  font-family: MicrosoftYaHei;
	font-size: 12px;
	color: #888888;
}

.uploadListBox {
  z-index: 9999;
  position: fixed;
  bottom: 0;
  right: 60px;
}

.text {
  font-size: 14px;
}

.title{
  float: left;
  margin-top: 10px;
}

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}

.box-card {
  width: 480px;
}
</style>
