// 用户信息管理的表格配置
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
      prop: 'username',
      // search: true,
      width: '240px',
    },
    {
      label: '真实姓名',
      prop: 'realName',
      width: '120px',
    },
    // {
    //   label: '性别',
    //   prop: 'sex',
    // },
    // {
    //   label: '企业名称',
    //   prop: 'company',
    // },
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
      label: '状态',
      type: 'select',
      prop: 'lockFlag', // 0激活 1锁定
      // slot: true,
      dicData:[
        {label: '激活', value: '0'},
        {label: '锁定', value: '1'},
      ],
      rules: [{
        required: true,
        message: '请输入状态',
        trigger: 'blur'
      }]
    },
    {
      label: '角色名',
      prop: 'roleId',
      type: 'select',
      // search: true, // 是否加入动态现隐列
      // prepend: '请输入关键字', // 前面的辅助文字
      dicUrl: baseUrl + 'admin/role/list',
      props: {
        label: 'roleName',
        value: 'roleId'
      }
    },
    {
      label: '注册时间',
      prop: 'createTime',
      width: '140px',
      type: 'datetime',
      // editDisabled: true,
      format: 'yyyy-MM-dd hh:mm:ss',
      valueFormat: 'yyyy-MM-dd hh:mm:ss',
    },
  ]
}
