// 产权登记的表格配置
const baseUrl = window.globalUrl.HOME_API;

export const tableOption = {
  border: false,
  index: true,
  indexLabel: '序号',
  stripe: true,
  menuAlign: 'center',
  searchMenuSpan: 6,
  align: 'center',
  addBtn:false, // 不显示新增按钮
  delBtn:false, // 删除按钮
  editBtn:false, // 编辑按钮
  searchLabelWidth: '100', // 表单搜索框的label宽度
  labelWidth: '150', // 弹出表单的label宽度
  column: [
    {
      label: '关键字',
      prop: 'keyword',
      hide: true, // 隐藏
      addDisplay: false,
      editDisplay: false,
      // search: true,
      showColumn: false, // 是否加入动态现隐列
      // prepend: '请输入关键字', // 前面的辅助文字
    },
    {
      label: '合同编号',
      prop: 'htbh',
      width: '120px',
      rules: [
        { required: true, message: '请输入合同编号', trigger: 'blur'},
        { min: 3, max: 32, message: '长度在 3 到 32 个字符', trigger: 'blur'}
      ]
    },
    {
      label: '项目名称',
      prop: 'xmmc',
      width: '240px',
    },
    {
      label: '项目编号',
      prop: 'xmbh',
      width: '240px',
      // search: true,
      rules: [
        { required: true, message: '请输入项目编号', trigger: 'blur'},
        { min: 3, max: 32, message: '长度在 3 到 32 个字符', trigger: 'blur'}
      ]
    },
    {
      label: '产权类型',
      type: 'select',
      prop: 'cqlxbh',
      width: '130px',
      // search: true,
      dicUrl: baseUrl + 'admin/dict/type/property_type',
      rules: [{
        required: true,
        message: '请输入产权类型',
        trigger: 'blur'
      }]
    },
    {
      label: '所在区域',
      type: 'select',
      prop: 'xzqbh',
      // search: true,
      dicUrl: baseUrl + 'trade-website/cqjyService/getXzqhInfo',
      dicMethod: 'post',
      props: {
        label: 'xzqmc',
        value: 'xzqbh',
        children: 'list'
      },
      rules: [{
        required: true,
        message: '请输入所在区域',
        trigger: 'blur'
      }]
    },
    {
      label: '流转类型',
      type: 'select',
      prop: 'lzlx',
      // search: true,
      dicUrl: baseUrl + 'admin/dict/type/flow_type',
      rules: [{
        required: true,
        message: '请输入流转类型',
        trigger: 'blur'
      }]
    },
    {
      label: '成交金额（元）',
      type: 'number',
      prop: 'dqbj',
      rules: [{
        required: true,
        message: '请输入成交金额（元）',
        trigger: 'blur'
      }]
    },
    {
      label: '面积（亩）',
      type: 'number',
      prop: 'zcmj',
      rules: [{
        required: true,
        message: '请输入面积（亩）',
        trigger: 'blur'
      }]
    },
    {
      label: '承包人',
      prop: 'xm',
      width: '120px',
      rules: [{
        required: true,
        message: '请输入承包人',
        trigger: 'blur'
      }]
    },
    {
      label: '出让方',
      prop: 'zcf',
      rules: [{
        required: true,
        message: '请输入出让方',
        trigger: 'blur'
      }]
    },
    {
      label: '受让方',
      prop: 'srf',
      rules: [{
        required: true,
        message: '请输入受让方',
        trigger: 'blur'
      }]
    },
    {
      label: '合同附件',
      prop: 'htfj',
      type: 'upload',
      // accept: 'image/png, image/jpeg', // 接收的类型
      action: 'https://jsonplaceholder.typicode.com/posts/', // 上传的地址
      headers: {}, // 携带的头部附加参数
      data: {}, // 携带的附加参数
      rules: [{
        // required: true,
        message: '请上传合同附件',
        trigger: 'blur'
      }]
    },
    {
      label: '上传时间',
      prop: 'cjsj',
      width: '140px',
      type: 'datetime',
      editDisabled: true,
      // format: 'yyyy-MM-dd hh:mm:ss',
      // valueFormat: 'yyyy-MM-dd hh:mm:ss',
    },
  ]
}
