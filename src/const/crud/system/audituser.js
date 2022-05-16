// 审核用户信息管理的表格配置
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
      label: '用户名',
      prop: 'userPhone',
      // width: '120px',
    },
    {
      label: '企业法人姓名',
      prop: 'legalPerson',
      // width: '120px',
    },
    // {
    //   label: '性别',
    //   prop: 'sex',
    // },
    {
      label: '企业名称',
      prop: 'companyName',
    },
    // {
    //   label: '登录次数',
    //   prop: 'num',
    //   editDisabled: true,
    // },
    // {
    //   label: '所属地区',
    //   type: 'select',
    //   prop: 'address',
    //   rules: [{
    //     required: true,
    //     message: '请输入所属地区',
    //     trigger: 'blur'
    //   }]
    // },
    {
      label: '税号',
      prop: 'taxId',
      width: '180px',
    },
    // {
    //   label: '银行卡号码',
    //   prop: 'userBankId',
    //   width: '180px',
    //   rules: [
    //     { required: true, message: '请输入银行卡卡号', trigger: 'blur'},
    //     { min: 3, max: 32, message: '长度在 3 到 32 个字符', trigger: 'blur'}
    //   ]
    // },
    // {
    //   label: '银行预留手机号',
    //   prop: 'userBankPhone',
    //   width: '120px',
    // },
    {
      label: '外部认证',
      type: 'select',
      prop: 'authApiSta',
      slot: true,
      dicData: [
        {value: '0', label: "通过"},
        {value: '1', label: "未通过"},
      ],
      rules: [{
        required: true,
        message: '请输入状态',
        trigger: 'blur'
      }]
    },
    {
      label: '申请时间',
      prop: 'createTime',
      width: '140px',
      type: 'datetime',
      // editDisabled: true,
      format: 'yyyy-MM-dd hh:mm:ss',
      valueFormat: 'yyyy-MM-dd hh:mm:ss',
    },
  ]
}
