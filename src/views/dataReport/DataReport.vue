<!--数据管理页面-->
<template>
  <div class="dataReport">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span class="card-title">数据管理</span>
      </div>
      <div class="box-content">
        <!--搜索-->
        <div class="search-form">
          <el-form label-position="right" :model="dataForm" ref="searchForm">
            <el-row>
              <el-col :span="8">
                <el-form-item label="数据组名称">
                  <el-input v-model.trim="dataForm.name" clearable placeholder="请输入数据组名称"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="14" class="btn-groups">
                <el-button class="search-btn" @click="searchData">搜索</el-button>
                <el-button class="line-btn" @click="addInfo">添加数据</el-button>
              </el-col>
            </el-row>
          </el-form>
        </div>
        <!--表格数据-->
        <div class="list-table">
          <el-table
            ref="multipleTable"
            border
            @selection-change="handleSelectionChange"
            :data="tableData.content">
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column prop="name" label="数据组名称"></el-table-column>
            <el-table-column prop="time" label="编辑时间"></el-table-column>
            <el-table-column prop="userName" label="操作人"></el-table-column>
            <el-table-column prop="operation" label="操作" class="operation">
              <template slot-scope="scope"><!--@click="deleteInfo(scope.row.id)"-->
                  <el-button type="text" class="red-color" @click="deleteAll()" >删除</el-button>
                  <span class="verticalbar">|</span>
                  <el-button type="text" class="blue-color" @click="downloadData">下载</el-button>
              </template>
            </el-table-column>
          </el-table>
          <div class="delStyle">
            <el-button class="line-btn" @click="deleteAll()">批量删除</el-button>

          </div>
        </div>
        <div class="con-pagination">
          <list-pagination :total="tableData.count" :size="searchForm.size"
                           :current="searchForm.num" :sizes="sizes" @change="getPages"
                           ref="pagination"></list-pagination>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
  export default {
    name: "data-report",
    watch: {
    },
    data () {
      return {
        //多选
        multipleSelection: [],
        //检索表单
        searchForm:{
          name:'',
          num:'',
          size:''
        },
        dataForm:{
        },
        //表格数据
        tableData:{
          content: [
            {
              name:'退火试验',
              time:'2020-08-20',
              userName:'张三'
            },
            {
              name:'退火+固溶',
              time:'2020-11-20',
              userName:'李四'
            },
            {
              name:'退火+固溶+时效试验',
              time:'2020-12-20',
              userName:'张三'
            }
          ],
          count:20,
          pageMax:5,
        }

        ,
        sizes:[10,20,30,40],//每页显示几条数据

      }
    },
    created() {
      this.getTableList()


    },
    computed: {
    },
    methods:{
      getTableList(num,size){
      //给检索表单重新赋值分页信息
        this.searchForm.num = num;
        this.searchForm.size = size;
        this.tableData = {
          content: [
            {
              name:'退火试验',
              time:'2020-08-20',
              userName:'张三'
            },
            {
              name:'退火+固溶',
              time:'2020-11-20',
              userName:'李四'
            },
            {
              name:'退火+固溶+时效试验',
              time:'2020-12-20',
              userName:'张三'
            }
          ],
          count:20,
          pageMax:5,
        }
      },
      //多选
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      searchData() {
      },
      //新增
      addInfo(){
        this.$router.push({path:'/addData'});
      },
  //分页获取当前点击的页码
    getPages(){
    //调用获取数据的方法
      this.getTableList(pageNum,pageSize);
     },
      //删除
      deleteAll(){
        let selected = this.multipleSelection;
        if (!selected || selected.length === 0) {
          this.$message.warning('请选择要删除的数据');
          return;
        }
        //创建提交数组
      /*  let idStr = new Array();
        idStr.push(id);*/
        this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {//确定操作，请求后台删除数据
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
            this.getTableList(1,10)
            this.$refs.pagination.currentPage = 1;
            this.$refs.pagination.pageSize = 10;
         /* this.$post('applicationForm/delete',idStr).then(res=>{
            if(res.code == 200){
              this.$message({
                type: 'success',
                message: '删除成功!'
              });
             /!* this.getTableList(1,10)
              this.$refs.pagination.currentPage = 1;
              this.$refs.pagination.pageSize = 10;*!/
            }
          }
          )*/
        }
        ).catch(() => {//取消操作
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      downloadData(){
        this.$message({
          type: 'success',
          message: '下载成功!'
        });
      }



    }
  }
</script>

<style lang="less" scoped>
  .dataReport{
    white-space:nowrap;
  }
  .delStyle{
    margin-top: 20px;
  }
  /deep/ .el-table--border {
    border: 1px solid #EBEEF5;
  }
</style>
