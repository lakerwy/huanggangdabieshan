// 合同档案的表格配置
const baseUrl = window.globalUrl.HOME_API;

export const tableOption = {
  border: false,
  index: true,
  indexLabel: '序号',
  stripe: true,
  menuAlign: 'center',
  searchMenuSpan: 6,
  align: 'center',
  // addBtn:false, // 不显示新增按钮
  delBtn:false, // 删除按钮
  editBtn:false, // 编辑按钮
  searchLabelWidth: '100', // 表单搜索框的label宽度
  labelWidth: '150', // 弹出表单的label宽度
  column: [
    {
      label: '项目名称',
      prop: 'name',
      width: '240px',
      search: true,
    },
    {
      label: '合同编号',
      prop: 'concode',
      width: '120px',
      rules: [
        { required: true, message: '请输入合同编号', trigger: 'blur'},
        { min: 3, max: 32, message: '长度在 3 到 32 个字符', trigger: 'blur'}
      ]
    },
    {
      label: '地块类型',
      type: 'select',
      prop: 'type',
      width: '120px',
      search: true,
      dicUrl: baseUrl + 'admin/dict/type/land_type',
      rules: [{
        required: true,
        message: '请选择地块类型',
        trigger: 'blur'
      }]
    },
    {
      label: '所在区域',
      type: 'select',
      prop: 'address',
      search: true,
      rules: [{
        required: true,
        message: '请输入所在区域',
        trigger: 'blur'
      }]
    },
    {
      label: '面积（亩）',
      type: 'number',
      prop: 'area',
      search: true,
      rules: [{
        required: true,
        message: '请输入面积（亩）',
        trigger: 'blur'
      }]
    },
    {
      label: '东至',
      prop: 'east',
      rules: [{
        min: 0,
        max: 1000000,
        message: '大于0小于1000000',
        trigger: 'blur'
      }]
    },
    {
      label: '西至',
      prop: 'west',
      rules: [{
        min: 0,
        max: 1000000,
        message: '大于0小于1000000',
        trigger: 'blur'
      }]
    },
    {
      label: '南至',
      prop: 'south',
      rules: [{
        min: 0,
        max: 1000000,
        message: '大于0小于1000000',
        trigger: 'blur'
      }]
    },
    {
      label: '北至',
      prop: 'north',
      rules: [{
        min: 0,
        max: 1000000,
        message: '大于0小于1000000',
        trigger: 'blur'
      }]
    },
    {
      label: '承包人',
      prop: 'buyer',
      rules: [{
        required: true,
        message: '请输入承包人',
        trigger: 'blur'
      }]
    },
    {
      label: '出让方',
      prop: 'seller',
      rules: [{
        required: true,
        message: '请输入出让方',
        trigger: 'blur'
      }]
    },
    {
      label: '受让方',
      prop: 'assignee',
      rules: [{
        required: true,
        message: '请输入受让方',
        trigger: 'blur'
      }]
    },
    {
      label: '合同附件',
      prop: 'files',
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
      label: '备案时间',
      prop: 'time',
      width: '140px',
      type: 'datetime',
      // editDisabled: true,
      format: 'yyyy-MM-dd hh:mm:ss',
      valueFormat: 'yyyy-MM-dd hh:mm:ss',
    },
  ]
}
