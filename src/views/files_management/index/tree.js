// 模块化
/**
 * 文件树相关内容
 * 面包屑联动
 */
import { ref, unref, reactive, toRefs } from 'vue'
import { toTreeData } from '@/utils/util.js'
import { getFilesTree, getFilesById, searchFile } from '@/api/files.js'
import { ElMessage, ElMessageBox  } from 'element-plus'

export default function treeModule(vm) {
  // 文件树内容
  const data = reactive({
    queryValue: '',
    treeData: [],
    isShowDel: false,
    defaultProps: {label: 'znName', value: 'id', children: "children"},
    defaultExpandKeys: [],
    currentFolder: {}, // 保存当前的节点数据
    currentNode: {}, // 保存当前的节点
    filesData: [], // 文件表格数据
    isShowList: true, // 视图模式，true为列表模式
    crumbListData: [], // 面包屑数据
    result: [],
  })

  // 搜索
  const handleSearch = async () => {
    if(!data.queryValue) {
      // ElMessage({
      //   message: '请输入搜索内容！',
      //   type: 'warning'
      // })
      return
    }
    let params = {
      fileName: data.queryValue
    }
    let res = await searchFile(params);
    let {success, body, message} = res;
    if(success) {
      data.filesData = body;
    } else {
      ElMessage({
        message: message,
        type: 'error'
      })
    }
  }

  const getTreeData = async (current = {}) => {
    let res = await getFilesTree();
    let { success, body } = res;
    if(success) {
      data.treeData = toTreeData(body, 'id', 'pid')
      data.defaultExpandKeys.push(current.id || data.treeData[0].id)
      let obj = current.id ? current : data.treeData[0];
      handleNodeClick(obj, data.currentNode);
    }
  }

  const handleNodeClick = async (obj, node, flag) => {
    // 切换父级清空当前面包屑
    if(obj.pid == 0) {
      data.crumbListData = [];
      data.crumbListData.push(obj);
    } else {
      data.currentNode = node;
      // 根据层级获取面包屑
      data.result = [];
      handleCrumbData(node || {});
      data.crumbListData = data.result;
    }
    data.currentFolder = obj;
    let params = {
      pid: obj.id
    }
    let res = await getFilesById(params);
    let { success, body } =res;
    if(success) {
      data.filesData = [];
      body.map(item => {
        item.fileKzm = item.fileKzm ? item.fileKzm.toLowerCase() : '';
        data.filesData.push(item)
      });
    }
  }

  // 右边文件操作内容
  const handleCrumbData = (datas) => {
    if(datas.parent && datas.level !== 0) {
      data.result.unshift(datas.data)
      handleCrumbData(datas.parent)
    }
  }
  // 面包屑返回上一级
  const handlePre = () => {
    // 截掉最后一级 splice改变原数组
    if(data.crumbListData.length <= 1) {
      ElMessage({
        message: '已为根目录无法后退！',
        type: 'error'
      });
      return;
    }
    data.crumbListData.splice(-1, 1);
    let cObj = data.crumbListData[data.crumbListData.length - 1];
    let node = vm.refs.tree.getNode(cObj);
    handleNodeClick(cObj, node);
  }

  return {
    ...toRefs(data),
    handleSearch,
    getTreeData,
    handleNodeClick,
    handlePre
  }
}