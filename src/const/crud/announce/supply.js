// 供应信息的表格配置
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
  menuWidth: '300', // 操作菜单栏的宽度
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
      label: '标题',
      prop: 'bt',
      width: '240px',
    },
    {
      label: '供应编号',
      prop: 'gybh',
      width: '120px',
      showColumn: false,
      editDisplay:false
    },
    {
      label: '产权类型',
      type: 'select',
      prop: 'cqlx',
      width: '130px',
      dicUrl: baseUrl + 'admin/dict/type/property_type',
      rules: [{
        required: true,
        message: '请输入产权类型',
        trigger: 'blur'
      }]
    },
    {
      label: '详细地址',
      type: 'input',
      prop: 'xxdz',
      hide: true,
      rules: [{
        required: true,
        message: '请输入详细地址',
        trigger: 'blur'
      }]
    },
    {
      label: '面积（亩）',
      type: 'number',
      prop: 'mj',
      rules: [{
        required: true,
        message: '请输入面积（亩）',
        trigger: 'blur'
      }]
    },
    {
      label: '流转类型',
      type: 'select',
      prop: 'lzlx',
      dicUrl: baseUrl + 'admin/dict/type/flow_type',
      rules: [{
        required: true,
        message: '请输入流转方式',
        trigger: 'blur'
      }]
    },
    {
      label: '预期金额（元）',
      type: 'number',
      prop: 'je',
      rules: [{
        required: true,
        message: '请输入预期金额（元）',
        trigger: 'blur'
      }]
    },
    {
      label: '详细信息',
      type: 'input',
      prop: 'xxxx',
      hide: true,
      rules: [{
        required: true,
        message: '请输入详细信息',
        trigger: 'blur'
      }]
    },
    // {
    //   label: '承包人',
    //   prop: 'lxr',
    //   rules: [{
    //     required: true,
    //     message: '请输入承包人',
    //     trigger: 'blur'
    //   }]
    // },
    {
      label: '出让方',
      prop: 'lxr',
      editDisplay: false,
      rules: [{
        required: true,
        message: '请输入出让方',
        trigger: 'blur'
      }]
    },
    // {
    //   label: '东至',
    //   prop: 'east',
    //   rules: [{
    //     min: 0,
    //     max: 1000000,
    //     message: '大于0小于1000000',
    //     trigger: 'blur'
    //   }]
    // },
    // {
    //   label: '西至',
    //   prop: 'west',
    //   rules: [{
    //     min: 0,
    //     max: 1000000,
    //     message: '大于0小于1000000',
    //     trigger: 'blur'
    //   }]
    // },
    // {
    //   label: '南至',
    //   prop: 'south',
    //   rules: [{
    //     min: 0,
    //     max: 1000000,
    //     message: '大于0小于1000000',
    //     trigger: 'blur'
    //   }]
    // },
    // {
    //   label: '北至',
    //   prop: 'north',
    //   rules: [{
    //     min: 0,
    //     max: 1000000,
    //     message: '大于0小于1000000',
    //     trigger: 'blur'
    //   }]
    // },
    // {
    //   label: '相关附件',
    //   prop: 'files',
    //   type: 'upload',
    //   // accept: 'image/png, image/jpeg', // 接收的类型
    //   action: 'https://jsonplaceholder.typicode.com/posts/', // 上传的地址
    //   headers: {}, // 携带的头部附加参数
    //   data: {}, // 携带的附加参数
    //   rules: [{
    //     // required: true,
    //     message: '请上传相关附件',
    //     trigger: 'blur'
    //   }]
    // },
    {
      label: '发布人',
      prop: 'fbr',
      editDisplay: false,
      rules: [{
        required: true,
        message: '请输入登记人',
        trigger: 'blur'
      }]
    },
    {
      label: '发布状态',
      prop: 'fbzt',
      addDisplay: false,
      editDisplay: false,
      slot: true
    },
    {
      label: '发布时间',
      prop: 'fbsj',
      width: '140px',
      type: 'time',
      editDisplay: false,
      format: 'yyyy-MM-dd hh:mm:ss',
      valueFormat: 'yyyy-MM-dd hh:mm:ss',
    },
  ]
}
