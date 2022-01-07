<template>
  <div class="">
        <div class="header-info">
          <div class="info-left">
              <img class="toggle-button" @click="ctoggleCollapse" src="../../assets/images/layout/collapse.png"/>
          </div>
          <!--<div class="info-right user-out">
              <img src="../../assets/images/layout/switch.png"/>
              <p @click="logout">退出</p>
          </div>
          <div class="info-right user-info">
              <img src="../../assets/images/layout/user-logo.png"/>
              <p>用户名：{{loginName}}</p>
          </div>-->
        </div>
  </div>
</template>

<script>
export default {
  name:'header-nav',
  data() {
    return {
      //当前登录用户姓名
      loginName:'admin',//window.sessionStorage.getItem('loginName')
      // 退出登录对话框
      logoutDialogVisible: false,
      // isCollapse
    }
  },
  created() {
  },
  methods: {
      // 点击按钮，切换菜单的折叠与展开
    ctoggleCollapse() {
      // this.isCollapse = !this.isCollapse;
      this.$emit('toggleCollapse')
    },
    // 退出登录
    logout() {
      this.$confirm('是否确定要退出登录?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 清空token
        window.localStorage.clear();
        // 跳转至登录页
        this.$router.push('/login');
        this.$message.warning('已退出登录！');
      });
    },
  }
}
</script>

<style lang="less" scoped>

  .header-info {
    overflow:hidden;
  }
  .info-left {
    float:left;
    margin-top:19px;
  }
  .info-left img {
    width:26px;
    height:26px;
    cursor: pointer;
  }
  .info-right {
    float:right;
  }
  .user-info {
    margin:16px 40px 0 0;
    overflow: hidden;
  }
  .user-info img {
    float: left;
    width:33px;
    height:33px;
  }
  .user-info p {
    float:left;
    font-size: 14px;
    font-family: Microsoft YaHei;
    color: #999999;
    line-height: 33px;
    margin:0 0 0 10px;
  }
  .user-out {
    margin:22px 50px 0 0;
    overflow: hidden;
  }
  .user-out img {
    float: left;
    width:20px;
    height:20px;
  }
  .user-out p {
    float: left;
    font-size: 14px;
    font-family: Microsoft YaHei;
    color: #999999;
    margin:0;
    line-height:20px;
    cursor: pointer;
  }
  .user-out p:hover {
    color:#FE6E66;
  }
</style>
