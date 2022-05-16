// 交易审核的表格配置
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
  searchLabelWidth: '140', // 表单搜索框的label宽度
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
      label: '项目名称',
      prop: 'xmmc',
      width: '150px',
      // showColumn: false,
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
      label: '报名人数',
      type: 'number',
      prop: 'bmrs',
      rules: [{
        required: true,
        message: '请输入所在区域',
        trigger: 'blur'
      }]
    },
    {
      label: '起始价（元/年/亩）',
      type: 'number',
      prop: 'gpjg',
      rules: [{
        required: true,
        message: '请输入起始价（元/年/亩）',
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
      label: '起始总价（元）',
      type: 'number',
      prop: 'qszj',
      // search: true,
      rules: [{
        required: true,
        message: '请输入起始总价（元）',
        trigger: 'blur'
      }]
    },
    {
      label: '竞价开始时间',
      prop: 'jjkssj',
      width: '140px',
      type: 'time',
      editDisabled: true,
      // format: 'yyyy-MM-dd hh:mm:ss',
      // valueFormat: 'yyyy-MM-dd hh:mm:ss',
    },
    {
      label: '竞价结束时间',
      prop: 'jjjzsj',
      width: '140px',
      type: 'time',
      editDisabled: true,
      // format: 'yyyy-MM-dd hh:mm:ss',
      // valueFormat: 'yyyy-MM-dd hh:mm:ss',
    },
    {
      label: '加价幅度（元）',
      type: 'number',
      prop: 'jjfd',
      rules: [{
        required: true,
        message: '请输入加价幅度（元）',
        trigger: 'blur'
      }]
    },
  ]
}
