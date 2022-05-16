// 模块化处理
/**
 * 上传部分的逻辑功能实现
 */
import { ref, nextTick, unref, reactive, toRefs } from "vue";

export default function uploadModule(vm, currentFolder) {
  const data = reactive({
    uploadDialogVisible: false,
    errorDialogVisible: false, // 上传失败的dialog
    uploadType: '', // 上传的类型
    filelist: [],
    failedFiles: [], // 上传失败的文件
    newTableData: [],
    fileTotal: 0,
    isUpload: false, // 文件上传进度框
  })
  const uploadUrl = `${window.globalUrl.HOME_API}/datamanager/park-file/uploadFiles`
  let messageInstance = null; // 当前的elMessage实例，如果存在就关闭避免一次性弹出多个

  // 选择上传类型
  const handleCommand = (command) => {
    data.filelist = [];
    data.uploadType = command;
    data.uploadDialogVisible = true;
    if(command === 'folder') {
      nextTick(() => {
        document.getElementsByClassName("el-upload__input")[0].webkitdirectory = true;
      })
    }
  }
  // 选择文件事件
  const handleChange = (file, list) => {
    // filelist = [...list]
    const types = ["image/png", "image/jpg", "image/jpeg", "application/pdf", "application/vnd.ms-excel", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet","video/mp4","video/mpeg","video/x-msvideo","audio/mpeg"]
    const isFile = types.includes(file.raw.type)
    const size = file.raw.size;
    if(messageInstance) {
      messageInstance.close()
    }
    if(!isFile) {
      // 防止出现多次
      messageInstance = ElMessage({
        message: '文件格式为pdf、jpeg(jpg)、png、.doc(.docx)、.xls(.xlsx)、.mp4(.mpeg、.avi)或者.mp3',
        type: 'error'
      });
      vm.refs.upload.clearFiles();
      data.filelist = [];
      return false
    }
    if(!size) {
      messageInstance = ElMessage({
        message: '选择的文件大小不能为0',
        type: 'error'
      });
      vm.refs.upload.clearFiles();
      data.filelist = [];
      return false;
    }
    return isFile && size;
  }
  const beforeUpload = (file) => {
    data.filelist.push(file);
    // getUploadProgress();
  }
  const handleUpload = (file) => {
    // 自定义上传
    file.file.percentage = 0;
    file.file.pid = unref(currentFolder).id || 0;
    file.file.isPlay = false;
    data.filelist.push(file.file);
  }
  const uploadCancle = () => {
    vm.refs.upload.clearFiles();
    data.uploadDialogVisible = false;
  }
  // 提交文件数据，打开传输框
  const submitUpload = async () => {
    vm.refs.upload.submit();
    vm.refs.upload.clearFiles();
    if(!data.filelist.length) {
      ElMessage({
        message: '请选择文件！',
        type: 'warning'
      })
      return
    }
    data.newTableData = [...data.newTableData, ...data.filelist];
    data.fileTotal = data.fileTotal + data.filelist.length;
    data.uploadDialogVisible = false;
    data.isUpload = true;
    nextTick(() => {
      // if(!vm.refs.fileTransfer.uploadIntervel) {
      //   vm.refs.fileTransfer.getUploadProgress();
      // }
      vm.refs.fileTransfer.fileUpload();
      // vm.refs.fileTransfer.change();
    })
  }
  const failedSubmit = (val) => {
    data.errorDialogVisible = true;
    data.failedFiles = [...val]
  }

  // 文件上传进度框
  const fatherClose = (val) => {
    // 关闭进度框事件
    data.isUpload = val;
    data.fileTotal = 0;
  }

  return {
    ...toRefs(data),
    uploadUrl,
    handleCommand,
    handleChange,
    beforeUpload,
    handleUpload,
    uploadCancle,
    submitUpload,
    failedSubmit,
    fatherClose
  }
}