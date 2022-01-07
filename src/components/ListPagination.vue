<!-- 分页组件 -->
<template>
  <!--
    background: 背景颜色
    size-change：	pageSize 改变时会触发
    current-change：	currentPage 改变时会触发
    current-page：	当前页数，支持 .sync 修饰符
    page-sizes：	每页显示个数选择器的选项设置
    page-size：	每页显示条目个数，支持 .sync 修饰符
    layout： 组件布局，子组件名用逗号分隔
    total	总条目数
  -->
  <div class="list-pagination">
    <el-pagination
      background
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="sizes"
      :page-size="size"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
  </div>
</template>
<!-- 分页组件 
  <list-pagination 
    :total="pageData.total" 
    :size="pageData.pageSize" 
    :sizes="pageData.sizes" 
    :current="pageData.pageNum"
    @change="getPages">
  </list-pagination>
  //定义变量
  pageData: {
    total: 0, // 数据总条数
    sizes:[10,5]//条数显示切换数组
    pageNum:1,//当前页面
    pageSize:10,//每页显示条数
  } 
  //分页请求查询
  getPages(pageNo, pageSize){
    //console.log("当前页：" + pageNo + ",当前条数：" + pageSize);
    this.pageData.pageSize = pageSize;
    this.pageData.pageNum = pageNo;
  }   
-->            
<script>
  export default {
    name: "list-pagination",
    props: {
      total: {//总条数
        type: Number,
        default: 0
      },
      sizes: {//每页显示条数数组
        type:Array,
        default: []
      },
      size:{//初始每页显示条数
        type: Number,
        default:0
      },
      current:{//当前页
        type: Number,
        default:1
      }
    },
    data() {
      return {
        pageSize: '',//每页显示条数
        currentPage: ''//当前页
      };
    },
    created() {
      //将页面中初始页面条数赋值给pageSize
      //console.log("当前的size数：" + this.size + "当前页面current:" + this.current);
      this.pageSize = this.size;
      this.currentPage = this.current;
    },
    methods: {
      // 监听每页显示条数变化
      handleSizeChange(val) {
        this.pageSize = val;
        this.$emit("change", this.currentPage, this.pageSize);
      },
      // 监听页码变化
      handleCurrentChange(val) {
        this.currentPage = val;
        this.$emit("change", this.currentPage, this.pageSize);
      }
    }
  }
</script>

<style lang="less" scoped>
  .el-pagination{
    margin-top: 15px;
    margin-bottom:40px;
  }
  .el-pagination.is-background .el-pager li:not(.disabled).active {
    background-color: #FE6E66;
    color: #FFF;
  }
</style>
