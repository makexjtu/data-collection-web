<template>
  <div class="index">
    <el-container>
      <el-aside :width="isCollapse ? '70px' : '280px'">
        <!-- 左侧导航 -->
        <left-nav :isCollapse="isCollapse"></left-nav>
      </el-aside>
      <el-container>
        <el-header>
          <!-- 头部导航 -->
          <header-nav @toggleCollapse="isCollapseBtn"></header-nav>
        </el-header>
        <!-- 内容区域 -->
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import LeftNav from '../layout/LeftNav';
import HeaderNav from '../layout/HeaderNav';
export default {
  components: { LeftNav,HeaderNav },
  data() {
    return {
      // 导航菜单是否被折叠
      isCollapse: false
    }
  },
  created() {

  },
  methods: {
    // 导航菜单是否被折叠
    isCollapseBtn(){
      this.isCollapse = !this.isCollapse;
    }
  }
}
</script>

<style lang="less" scoped>
  .index {
    width:100%;
    height:100%;
    overflow: hidden;
  }
  .el-container{
    height:100%;   
  }
 .el-header {
    position:relative;
    z-index:2;  
    height: 65px !important;
    box-shadow: 0px 7px 6px 0px rgba(217, 203, 205, 0.35);
  }
  .el-aside {
    position: relative;
    z-index: 1;
    overflow: hidden;
    background: #00152A;
  }
  .el-main {
    background-color: #F6F7FC;
    height:100%;
    overflow:auto;
    padding:24px 23px 35px 23px;
  }
</style>
