<!-- 左侧菜单 -->
<template>
  <div class="">
    <div class="title">
     <h2 v-if="!isCollapse">实验室数据采集系统</h2>
      <img v-if="isCollapse" class="small-logo" src="../../assets/images/layout/menu-logo.png"/>
    </div>
    <el-menu
      class="el-menu-vertical"
      router
      :default-active="activePath"
      :collapse="isCollapse"
      :collapse-transition="false"
      unique-opened>
      <!-- 获取菜单列表(包含有子级菜单和没有子级菜单) -->
      <template v-for="item in menulist">
        <!--没有子导航-->
        <el-menu-item class="homefontzie" v-if="!item.children" :index="item.path" :key="item.id" @click="saveNavState(item.path)">
          <i :class="iconsObj[item.id]"></i>
          <span slot="title">{{item.authName}}</span>
        </el-menu-item>
        <!--有子导航-->
        <el-submenu v-if="item.children" :index="item.id + ''" :key="item.id">
          <!-- 一级菜单的模板区域 -->
          <template slot="title">
            <!-- 图标  文本 -->
            <i :class="iconsObj[item.id]"></i>
            <span>{{item.authName}}</span>
          </template>
          <!-- 二级子菜单 -->
          <el-menu-item class="twosize" :index="'/' + subItem.path" v-for="subItem in item.children" :key="subItem.id"  @click="saveNavState('/' + subItem.path)">
            <!-- 二级菜单模板-->
            <template slot="title">
              <span>{{subItem.authName}}</span>
            </template>
          </el-menu-item>
        </el-submenu>
      </template>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: "left-nav",
  data() {
    return {
      //导航菜单
      menulist: [
        {
          id: 100,
          authName: "开始实验",
          path: "home",
        },
       /* {
          id: 101,
          authName: "机构管理",
          path: "basicInfo",
          children:[
            {
              id: 1,
              authName: "银行管理",
              path: "bankManagement"
            },
            {
              id: 2,
              authName: "保险公司管理",
              path: "insurance"
            },
            {
              id: 3,
              authName: "企业信息管理",
              path: "enterprise"
            },
            {
              id: 4,
              authName: "担保公司管理",
              path: "guarantee"
            },
          ]
        },
        {
          id: 103,
          authName: "单据管理",
          path: "",
          children:[
            {
              id: 9,
              authName: "贷款申请清单",
              path: "loanDocument"
            },
          ]
        },*/
        {
          id: 145,
          authName: "数据管理",
          path: "dataReport",
        },
        {
          id: 125,
          authName: "系统管理",
          path: "systemMaintenance",
          children:[
            {
              id: 6,
              authName: "用户管理",
              path: "userManagement"
            },
            /*{
              id: 7,
              authName: "授权管理",
              path: "authorization"
            },
            {
              id: 8,
              authName: "角色管理",
              path: "roleManagement"
            }*/
          ]
        }
      ],
      // 被激活的链接地址
      activePath: '',
      //菜单图标
      iconsObj: {
        '125': 'el-icon-user',
        '103': 'el-icon-set-up',
        '101': 'el-icon-shopping-bag-1',
        '100': 'el-icon-s-home',
        '102': 'el-icon-document-copy',
        '145': 'el-icon-data-line'
      },
      // isCollapse:false
    };
  },
  props:['isCollapse'],
  created() {
    // 在页面初始化时执行 获取相关数据
    this.getMenuList();
    // this.activePath = window.sessionStorage.getItem('activePath');
    // 根据地址设置导航项高亮
    this.activePath = location.hash.slice(1);
    // 菜单权限设置
   // this.setPermission()
  },
  methods: {
      // 菜单权限设置
   /* setPermission(){
      let permissions = window.localStorage.getItem('permissionArray');
      let permissions1 = JSON.parse(permissions)
      this.menulist.forEach((item)=>{
        permissions1.forEach(element => {
          if(item.authName == element.name){
            item.code = element.code
          }
          if(item.children){
            item.children.forEach(itemChild=>{
              if(itemChild.authName == element.name){
                itemChild.code = element.code
              }
            })
          }
        });
      })
    },*/
    // 获取全部菜单信息
    async getMenuList() {
      //const { data: res } = await this.$http.get('/menus');
      // console.log(res);
      //if (res.meta.status !== 200) return this.$message.error(res.meta.msg);
      //this.menulist = res.data;
    },
    //设置选中菜单项
    saveNavState(path) {
      // window.sessionStorage.setItem('activePath', path);
      //this.activePath = sessionStorage.getItem('activePath');
      this.activePath = path;
    },
  }
};
</script>
<style lang="less" scoped>
  .title {
    margin-left: 20px;
    color: #ffffff;


  }
  .title img.title-logo {
    width:220px;
    margin-top:18px;
  }
  .title img.small-logo {
    width:30px;
    height:30px;
    margin-top:15px;
  }
  /deep/ .el-menu {
    height:100%;
    border-right: none;
    background-color:transparent;
  }
  /deep/ .el-menu-vertical {
    margin-top:22px;
  }
  /deep/ .el-menu-vertical .homefontzie{
    padding-left: 28px !important;
  }
  /deep/ .el-menu-item span {
    margin-left: 0px !important;
  }
  /deep/ .el-submenu__title {
    font-size: 16px;
    padding-left:40px;
    font-family: Adobe Heiti Std;
    font-weight: normal;
    color: #FFFFFF;
  }
  /deep/ .el-submenu .el-menu--inline .twosize{
    font-size: 15px;
    font-family: Adobe Heiti Std;
    font-weight: normal;
    color: #FFFFFF;
    line-height: 45px;
  }
  /deep/ .el-submenu .el-menu--inline  .el-menu-item.is-active {
    height: 50px;
    background-color: #3196FA !important;
   }
  /deep/ .el-menu--inline .twosize span{
    padding-left: 30px !important;
  }
  /deep/ .el-submenu__title i {
    color: #fff;
  }
  /deep/ .el-menu-item i {
    color: #fff;
  }
  /deep/ .el-submenu__title:hover {
    background-color: rgba(255, 255, 255, 0.27);
  }
  /deep/ .el-submenu__title:focus, /deep/ .el-submenu__title:hover {
    outline: 0;
    background-color:  rgba(255, 255, 255, 0.27);
  }
  /deep/ .el-submenu [class^=el-icon-] {
    margin-left: 8px;
  }
  /deep/ .el-submenu__icon-arrow {
    right: 30px;
  }
  /deep/ .el-menu-item {
    font-size: 16px;
    color: #fff;
  }
  /deep/ .el-menu-item:hover{
    outline: 0 !important;
    color: #fff !important;
    background-color:  rgba(255, 255, 255, 0.27) !important;
  }
  /deep/ .el-menu-item.is-active {
    color: #fff !important;
    background-color: #3196FA !important;
  }
  /deep/ .el-menu-item span {
    margin-left:28px;
  }
  /deep/ .el-menu--collapse {
    width: 70px;
  }
</style>
