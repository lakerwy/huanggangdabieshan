// 需求信息的表格配置
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
  menuAlign: 'left', // 菜单栏对齐方式
  menuWidth: '250',
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
      label: '文件标题',
      prop: 'title',
      width: '500px',
    },
    {
      label: '一级分类',
      type: 'select',
      prop: 'articleFid',
      dicUrl: `${baseUrl}admin/dict/type/ftype`,
      rules: [{
        required: true,
        message: '分类',
        trigger: 'blur'
      }]
    },
    {
      label: '二级分类',
      type: 'select',
      prop: 'articleSid',
      dicUrl: `${baseUrl}admin/dict/type/stype`,
      rules: [{
        required: true,
        message: '分类',
        trigger: 'blur'
      }]
    },
    // {
    //   label: '相关附件',
    //   prop: 'fileUrl',
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
    // {
    //   label: '图片',
    //   prop: 'pic',
    //   slot: true,
    //   rules: [{
    //     required: true,
    //     message: '请输入图片',
    //     trigger: 'blur'
    //   }]
    // },
    // {
    //   label: '登记人',
    //   prop: 'writer',
    //   rules: [{
    //     required: true,
    //     message: '请输入登记人',
    //     trigger: 'blur'
    //   }]
    // },
    {
      label: '登记时间',
      prop: 'createdtime',
      type: 'datetime',
      // editDisabled: true,
      // format: 'yyyy-MM-dd hh:mm:ss',
      // valueFormat: 'yyyy-MM-dd hh:mm:ss',
    },
  ]
}
