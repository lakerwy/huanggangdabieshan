<template>
  <div class="list-content">
    <div class="scrollbar fileTableList">
      <el-table
        highlight-current-row
        :row-style="{ height: 42 + 'px' }"
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange"
        @cell-mouse-enter="handleMouseHover"
        @cell-mouse-leave="handleMouseLeave"
      >
        <el-table-column type="selection" width="25"></el-table-column>
        <el-table-column label="文件名称" :show-overflow-tooltip="false">
          <template #default="scope">
            <img
              v-if="scope.row.isFolder == '1'"
              style="
                vertical-align: middle;
                margin-right: 6px;
                position: absolute;
                top: 9px;
              "
              src="imgs/icon_folder.png"
              alt
              srcset
            />
            <img
              v-if="
                scope.row.isFolder != '1' &&
                (scope.row.fileKzm == 'docx' || scope.row.fileKzm == 'doc')
              "
              class="typeImg"
              src="imgs/Word.png"
              alt
              srcset
            />
            <img
              v-if="
                scope.row.isFolder != '1' &&
                (scope.row.fileKzm == 'txt' || scope.row.fileKzm == 'log')
              "
              class="typeImg"
              src="imgs/icon_txt.png"
              alt
              srcset
            />
            <img
              v-if="scope.row.isFolder != '1' && scope.row.fileKzm == 'pdf'"
              class="typeImg"
              src="imgs/icon_pdf.png"
              alt
              srcset
            />
            <img
              v-if="
                scope.row.isFolder != '1' &&
                (scope.row.fileKzm == 'xls' || scope.row.fileKzm == 'xlsx')
              "
              class="typeImg"
              src="imgs/icon_xls.png"
              alt
              srcset
            />
            <img
              v-if="
                scope.row.isFolder != '1' &&
                (scope.row.fileKzm == 'jpg' ||
                  scope.row.fileKzm == 'png' ||
                  scope.row.fileKzm == 'jpeg')
              "
              class="typeImg"
              src="imgs/icon_jpg.png"
              alt
              srcset
            />
            <img
              v-if="scope.row.isFolder != '1' && scope.row.fileKzm == 'mp4'"
              class="typeImg"
              src="imgs/icon_video.png"
              alt
              srcset
            />
            <span
              class="FolderName"
              style="margin-left: 32px"
              v-if="!scope.row.showEdit"
              @click="handleRowDbClick(scope.row)"
            >
              {{ scope.row.znName }}
            </span>
            <el-input
              v-if="scope.row.showEdit"
              v-model="scope.row.znName"
              :autofocus="scope.row.showEdit"
              class="znNameInput"
              @keydown.enter.native="handleEnter($event, scope.row)"
              @blur="handleBlur($event, scope.row)"
            />
            <i
              v-if="scope.row.showEdit"
              class="el-icon-check"
              @mousedown.native="handleEnter($event, scope.row)"
              title="保存"
              style="
                color: #119b53;
                font-weight: bold;
                margin-left: 6px;
                cursor: pointer;
              "
            ></i>
          </template>
        </el-table-column>
        <el-table-column width="270" align="right">
          <template #default="scope">
            <div
              class="herfButton"
              v-show="isShowOpt && currentRow.id === scope.row.id"
            >
              <el-button
                v-show="scope.row.fileKzm && files_management_see"
                type="text"
                title="查看"
                @click.stop="handleDetail(scope.row)"
              >
                <img src="imgs/icon-show.png" alt="" />
              </el-button>
              <el-button
                v-if="files_management_download"
                type="text"
                title="下载"
                @click.stop="handleDownload(scope.row)"
              >
                <img src="imgs/icon_download2.png" alt="" />
              </el-button>
              <el-button
                v-if="files_management_move"
                type="text"
                title="移动"
                @click.stop="moveFile(scope.row)"
                ><img src="imgs/icon-move.png" alt=""
              /></el-button>
              <el-button
                v-if="files_management_edit"
                type="text"
                title="重命名"
                @click.stop="reseatName(scope.row)"
                ><img src="imgs/icon-pencil.png" alt=""
              /></el-button>
              <el-button
                v-if="files_management_del"
                type="text"
                title="删除"
                @click.stop="handleDelete(scope.row)"
                ><img src="imgs/icon_trash.png" alt=""
              /></el-button>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          sortable
          prop="fileSize"
          label="大小"
          align="center"
          width="200"
          :formatter="sizeFormatter"
        ></el-table-column>
        <el-table-column
          sortable
          align="center"
          label="创建时间"
          prop="createTime"
          width="200"
        >
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { getCurrentInstance, onMounted, reactive, ref, toRaw, toRefs, unref, watch, } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { deleteFolder, deleteFiles, changeFileName } from '@/api/files.js'
import { download } from '@/utils/util.js'
var Base64 = require("js-base64").Base64;
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      newName: "",
      isEnter: false,
      files_management_move: false,
      files_management_download: false,
      files_management_del: false,
      files_management_edit:false,
      files_management_see:false,
    }
  },
  components: {
  },
  props: {
    tableData: {
      type: Array
    },
    currentFolder: {
      type: Object
    }
  },
   computed: {
    ...mapGetters([
      'permissions'
    ])
  },
  created() {
    this.files_management_edit = this.permissions['files_management_edit']
    this.files_management_move = this.permissions['files_management_move']
    this.files_management_download = this.permissions['files_management_download']
    this.files_management_del = this.permissions['files_management_del']
    this.files_management_see = this.permissions['files_management_see']
  },
  setup(props, context) {
    const vm = getCurrentInstance();
    const ftpUrl = window.globalUrl.FTP_URL;
    const kkfileUrl = window.globalUrl.kkfileUrl;
    // 表格相关
    const { tableData } = toRefs(props);
    const data = reactive({
      selectedData: [], // 选择的数据
      pdfSrc: '',
      dialogVisible: false,
      srcList: [],
      isShowOpt: false,
      moveDialog:false,
      currentRow: {},      
    })
    watch(
      () => tableData,
      (newV) => {
        data.srcList = [];
        unref(newV).map(item => {
          if (item.isFolder != 1) {
            if (item.fileKzm == 'jpg' || item.fileKzm == 'png' || item.fileKzm == 'jpeg') {
              // data.srcList.push({
              //   src: `${ftpUrl}${item.filePath}`,
              //   title: item.znName
              // })
              data.srcList.push(`${ftpUrl}${item.filePath}`)
            }
          }
        })
      },
      { immediate: true, deep: true }
    )
    const initImages = () => {
    }
    const handleSelectionChange = (selection) => {
      data.selectedData = selection;
      context.emit('getSelectData', toRaw(data.selectedData))
    }
    const handleRowDbClick = (row, column) => {
      // 双击打开文件夹
      if (row.isFolder == 1) {
        context.emit('openFolder', row)
      }
    }
    const handleMouseHover = (row) => {
      data.currentRow = row;
      data.isShowOpt = true;
    }
    const handleMouseLeave = (row) => {
      data.currentRow = row;
      data.isShowOpt = false;
    }
    //移动文件
    const moveFile = (obj) => {
      context.emit('moveFiles',obj.id);
    }
    // 查看文件
    const handleDetail = (row) => {
      if (row.filePath) {
        window.open(`${kkfileUrl}` + encodeURIComponent(Base64.encode(`${ftpUrl}${row.filePath}`)));
      }
    }
    // 文件下载
    const handleDownload = (row) => {
      // if(row.isFolder == 1) {
      //   ElMessage({
      //     message: '不能下载文件夹',
      //     type: 'warning'
      //   });
      //   return;
      // }
      let url = `${window.globalUrl.HOME_API}/datamanager/park-file/download/${row.id}`;
      download(url);
    }
    // 删除事件
    const handleDelete = (row) => {
      ElMessageBox.confirm('此操作将永久删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        if (row.isFolder == 1) {
          // 只删除文件夹
          let params = new FormData();
          params.append('ids', row.id);
          let res = await deleteFolder(params);
          let { success, message } = res;
          if (success) {
            ElMessage({
              message: '删除文件夹成功！',
              type: 'success'
            });
            context.emit('refreshTableData')
          } else {
            ElMessage({
              message: message,
              type: 'error'
            });
          }
        } else {
          // 删除文件
          let params = new FormData();
          params.append('ids', row.id);
          let res = await deleteFiles(params);
          let { success, message } = res;
          if (success) {
            ElMessage({
              message: '删除文件成功！',
              type: 'success'
            });
            context.emit('refreshTableData')
          } else {
            ElMessage({
              message: message,
              type: 'error'
            });
          }
        }
      }).catch(() => {
        ElMessage({
          message: '已取消',
          type: 'info'
        });
      });
    }
    // 文件大小格式化
    const sizeFormatter = (row) => {
      let size = row.fileSize;
      let str = '';
      if (size) {
        if (size < 1024) {
          str = size + ' B'
        } else if (size >= 1024 && size < Math.pow(1024, 2)) {
          str = (size / 1024).toFixed(2) + ' KB'
        } else if (size >= Math.pow(1024, 2) && size < Math.pow(1024, 3)) {
          str = (size / Math.pow(1024, 2)).toFixed(2) + ' MB'
        } else if (size >= Math.pow(1024, 3) && size < Math.pow(1024, 4)) {
          str = (size / Math.pow(1024, 3)).toFixed(2) + ' GB'
        } else if (size >= Math.pow(1024, 4)) {
          str = (size / Math.pow(1024, 4)).toFixed(2) + ' T'
        } else {
          str = ''
        }
      }
      return str
    }

    onMounted(() => {
      initImages()
    })

    return {
      tableData,
      handleSelectionChange,
      handleDetail,
      handleDownload,
      handleDelete,
      sizeFormatter,
      ...toRefs(data),
      initImages,
      handleRowDbClick,
      handleMouseHover,
      handleMouseLeave,
      moveFile
    }
  },
  methods: {
    handleBlur(event, obj) {
      if (this.isEnter) {
        let params = {
          id: obj.id,
          name: obj.znName
        }
        changeFileName(params).then(Res => {
          if (Res.success) {
            this.$message.success("修改成功！");
            this.$emit('refreshTableData')
            obj.showEdit = false;
          }
        })
        this.isEnter = false;
      } else {
        this.$emit('refreshTableData')
      }
      obj.showEdit = false;
    },
    handleEnter(event, obj) {
      this.isEnter = true;
      this.handleBlur(event, obj);
    },
    reseatName(obj) {
      obj.showEdit = true;
      // this.newName = JSON.parse(JSON.stringify(obj.znName));
    }
  },
}
</script>



<style lang="less" scoped>
@vw: 19.2vw;
@vh: 10.8vh;
.list-content {
  margin: 19 / @vh 48 / @vw 0 34 / @vw;
  width: calc(100% - 82px);

  .fileTableList {
    margin-top: 30 / @vh;
    max-height: 680 / @vh;
    overflow-y: auto;
    /deep/ .el-table td,
    .el-table th {
      padding: 0;
    }
    /deep/ .el-table td,
    /deep/ .el-table th.is-leaf {
      border-bottom: 0;
    }

    .typeImg {
      position: absolute;
      top: 8px;
      width: 22px;
      height: 25px;
    }
  }
  .herfButton {
    .el-button {
      padding: 8px 0;
    }
  }
}
.FolderName {
  color: #606266;
  width: 300px;
  cursor: pointer;
}
.FolderName:hover {
  color: #1a5da6;
}
.znNameInput {
  width: 300px;
  padding: 0;
  margin-left: 32px;
  /deep/.el-input__inner {
    border-radius: 4px !important;
    background-color: transparent !important;
    height: 32px !important;
    line-height: 32px !important;
  }
}
/deep/.el-table-column--selection .cell{
  padding-left: 10px;
  padding-right: 0;
}
/deep/.el-table .cell{
  padding-left: 0;
  padding-right: 0;
}
</style>