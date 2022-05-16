// 土地信息的表格配置
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
  dialogTop: '15%',
  column: [
    {
      label: '银行卡号',
      prop: 'account',
    },
    {
      label: '开户名称',
      prop: 'khm',
    },
    {
      label: '开户行',
      prop: 'khh',
      // type: 'select',
      // width: '120px',
      // // search: true,
      // dicUrl: baseUrl + 'admin/dict/type/land_type',
      // rules: [{
      //   required: true,
      //   message: '请选择地块类型',
      //   trigger: 'blur'
      // }]
    },
  ]
}
