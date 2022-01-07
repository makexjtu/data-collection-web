const globalData = {
  state: {
    //用户类型
    userType:[
      {
        label:'普通用户',
        value:'1'
      },
      {
        label:'系统管理员',
        value:'2'
      },
    ],
    //用户状态
    userStatus:[
      {
        label:'正常',
        value:'1'
      },
      {
        label:'停用',
        value:'2'
      }
    ],
    //表单类型
    formType:[
      {
        label:'文本框',
        value:'input'
      },
      {
        label:'多行文本',
        value:'textarea'
      },
      {
        label:'复选框',
        value:'checkbox'
      },
      {
        label:'单选框',
        value:'radio'
      },
      {
        label:'单选列表',
        value:'select'
      },
      {
        label:'多选列表',
        value:'multiple'
      },
      {
        label:'文件上传',
        value:'upload'
      },
      {
        label:'日期选择框',
        value:'date'
      },
      {
        label:'日期时间选择框',
        value:'time'
      },
    ],


  },
  mutations: {
    // CHANGE_SET: (state, value) => {
    //   state.contentId = value;
    // },
  },
  actions: {
    // setCollapse({ commit },value) {
    //   commit('CHANGE_SET',value);
    // },
  },
  getters: {

	}
};

export default globalData

