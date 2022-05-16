<template>
  <div>
    <div class="uploadListBox2">
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
                src="imgs/icon_file.png"
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
                  <div class="progressList-name path">{{scope.row.webkitRelativePath || scope.row.name}}</div>
                </div>
              </template>
            </el-table-column>
            <el-table-column>
              <template #default="scope">
                <el-button
                  type="text"
                  icon="el-icon-circle-close"
                  style="float: right;margin-left:10px; padding: 3px 0;font-size:18px"
                  @click="deleteRow(scope.$index, newTableData)"
                ></el-button>
                <el-button
                  v-show="scope.row.isPlay"
                  type="text"
                  icon="el-icon-video-play"
                  style="float: right; padding: 3px 0;font-size:18px"
                  @click="handlePlay(scope.row)"
                ></el-button>
                <el-button
                  v-show="!scope.row.isPlay"
                  type="text"
                  icon="el-icon-video-pause"
                  style="float: right; padding: 3px 0;font-size:18px"
                  @click="handlePause(scope.$index, scope.row)"
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
            @click="cancel">全部取消</el-button
          >
          <el-button
            v-if="isShowTotalPause"
            type="primary"
            size="mini"
            style="margin-right:10px;
            margin-bottom:20px;margin-top:20px"
            @click="stopTotal">全部暂停</el-button
          >
          <el-button
            v-else
            type="primary"
            size="mini"
            style="margin-right:10px;
            margin-bottom:20px;margin-top:20px"
            @click="startTotal">全部开始</el-button
          >
        </div>
      </el-card>
    </div>
  </div>

</template>

<script>
import { defineComponent, toRefs, ref, watch, unref, getCurrentInstance, reactive } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { getStore } from '@/utils/store.js'
import service from '@/request/index.js'

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
    const vm = getCurrentInstance();
    const data = reactive({
      failedFiles: [],
      newTableData: [],
      finished: 0,
      failed: 0,
      isShowTotalPause: true
    })
    let messageInstance = null;
    const uploadUrl = `${window.globalUrl.HOME_API}/datamanager/park-file/uploadFiles`
    let source = null; // 取消上传

    watch(
      () => tableData,
      (newV) => {
        data.newTableData = [...tableData.value];
        // return newV
      },
      {deep: true, immediate: true}
    )

    // 删除行
    const deleteRow = (index, rows) => {
      rows.splice(index, 1);
      context.emit("update:tableData", data.newTableData);
      if(index === 0 && source) {
        // 直接取消并且进行下一次上传
        source.cancel('结束上传');
        fileUpload();
      }
    }
    //点击暂停按钮
    const handlePause = (index, row) => {
      if(source) {
        source.cancel('取消上传了');
        source = null;
        data.newTableData.splice(index, 1);
        data.newTableData.push(row);
        row.isPlay = true;
        context.emit("update:tableData", data.newTableData)
        fileUpload();
      }
    }
    //点击play(继续)按钮
    const handlePlay = (row) => {
      source = null;
      row.isPlay = false;
      context.emit("update:tableData", data.newTableData)
      fileUpload(row);
    }
    // 当上传值到达100的时候，显示的内容
    const format = (percentage) => {
      return percentage === 100 ? "上传完成" : `${percentage}%`;
    }

    let currentUploadFile = {};
    // 返回处理
    const handleResponse = (res) => {
      let { success, message } = res;
      if(messageInstance) {
        messageInstance.close()
      }
      if(success) {
        data.finished ++;
      } else {
        // messageInstance = ElMessage({
        //   message: message || '上传失败',
        //   type: 'error'
        // });
        data.failed ++;
        data.failedFiles.push(Object.assign(currentUploadFile, {errorMsg: message}));
        // let index = unref(newTableData).indexOf(currentUploadFile);
        // unref(newTableData).splice(index > -1 ? index : 0, 1)
        // context.emit("update:tableData", data.newTableData)
        // handleFinished();
      }
    }

    const fileUpload = async (file) => {
      // 每次提交请求第一个
      currentUploadFile = unref(file) || data.newTableData[0];
      if(currentUploadFile.isPlay) {
        // 如果当前被暂停了，直接返回
        return
      }
      let formData = new FormData();
      formData.append('pid', currentUploadFile.pid);
      formData.append('sessionId', getStore({name: 'access_token'}));
      formData.append('files', currentUploadFile)
      let cancelToken = service.CancelToken;//Axios使我修改axios原型链了。
      source = cancelToken.source();
      service.post(uploadUrl, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        cancelToken: source.token, //取消事件
        transformRequest: [function (data) {
          return data
        }],
        onUploadProgress: (progressEvent) => {
          // 获取进度,这里代表的是获取接口的进度并不能表示是否成功上传
          let complete = (progressEvent.loaded / progressEvent.total * 100 | 0)
          if(currentUploadFile.percentage > parseFloat(complete.toFixed(2))) {
            // 模拟继续上传
            return
          }
          currentUploadFile.percentage = parseFloat(complete.toFixed(2));
          context.emit("update:tableData", data.newTableData);
          if(currentUploadFile.percentage == 100) {
            // 这里判断的是进度，而不是是否成功
            setTimeout(() => {
              let index = data.newTableData.indexOf(currentUploadFile);
              data.newTableData.splice(index > -1 ? index : 0, 1)
              context.emit("update:tableData", data.newTableData)
              context.emit('refreshTableData');
              handleFinished();                                                                                
            }, 1000)
          }
        }
      })
      .then((response) => {
        handleResponse(response)
      })
      .catch(error => {
        if(service.isCancel(error)){//主要是这里
          console.log(error.message);
        } else { // 处理错误

        }
      })
    }

    // 上传结束操作
    const handleFinished = () => {
      if(!data.newTableData.length) {
        // 已经没有文件需要上传
        closeUploadList();
        if(data.failed) {
          handleFaild();
        }
      } else {
        fileUpload();
      }
    }

    // 处理失败的文件
    const handleFaild = () => {
      setTimeout(() => {
        context.emit('failedSubmit', data.failedFiles);
      }, 500)
    }

    // 点击传输列表的关闭按钮
    const closeUploadList = () => {
      context.emit("fatherClose");
    }

    // 全部取消
    const cancel = () => {
      stopTotal();
      if(source) {
        source.cancel('取消上传了')
      }
      context.emit("update:tableData", [])
      closeUploadList();
    }
    // 全部暂停
    const stopTotal = () => {
      if(source) {
        source.cancel('全部暂停');
        source = null;
      }
      data.isShowTotalPause = false;
      data.newTableData.map(item => {
        item.isPlay = true;
      })
      context.emit("update:tableData", data.newTableData);
    }
    // 全部开始
    const startTotal = () => {
      data.newTableData.map(item => {
        item.isPlay = false;
      })
      data.isShowTotalPause = true;
      context.emit("update:tableData", data.newTableData);
      fileUpload();
    }

    return {
      ...toRefs(data),
      deleteRow,
      handlePause,
      handlePlay,
      format,
      closeUploadList,
      fileUpload,
      cancel,
      stopTotal,
      startTotal,
      total,
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

.uploadListBox2 /deep/ .el-card__body {
  padding-top: 0;
}

.uploadListBox2 /deep/ .el-table__header-wrapper {
  display: none;
}

.uploadListBox2 /deep/ .el-button + .el-button {
  margin-left: 0;
}

.uploadListBox2 /deep/ .el-card__header {
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

.uploadListBox2 {
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
