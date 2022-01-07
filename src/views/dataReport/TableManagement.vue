<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span class="card-title">管理添加数据表格</span>
      <router-link to="addData"> <div class="back-list">返回</div></router-link>
    </div>
    <div class="box-content">
      <!--表格数据-->
      <div class="list-table">
        <el-button type="primary" class="addButton"  @click="addData" >添加</el-button>
        <el-table :data="tableData" ref="tb">
          <!--<el-table-column label="序号" align="center" prop="xh" width="50"></el-table-column>-->
          <template v-for="(item,index) in tableHead">
            <el-table-column :property="item.prop" :label="item.name" :key="index">
              <template slot-scope="scope">
                  <el-input  v-model="scope.row[item.prop]" ></el-input>
              </template>
            </el-table-column>
          </template>
          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <el-button type="danger" class="del-btn" @click="delmembers(scope.$index, scope.row)">删除</el-button>
            </template>
            </el-table-column>
        </el-table>
      </div>
      <div class=" addData-content-buttom">
        <el-button type="primary" class="buttonStyle" @click="saveTable" >保存</el-button>
      </div>
    </div>
  </el-card>
</template>

<script>
    export default {
        name: "TableManagment",
      data(){
          return{

            //选中的从表数据
            checkedDetail: [],
            tableHead:[], /*表头数据*/
            tableHead2:[
              {
                name:'退火保温温度',
                prop:'temp1'
              },{
                name:'退火保温时间',
                prop:'time1'
              },{
                name:'退火加热速率',
                prop:'irate1'
              }
            ],
            tableData:[]
          }

      },
      created() {
        var ary=localStorage.getItem('inputParams')
        this.tableHead= JSON.parse(ary)
        console.log('table表头', this.tableHead)
        /*
        *
        * */
        this.getTableData();
        this.getit()
      },
      methods:{
          /*添加一行*/
        addData() {
          let a=[]
          let b={}
          this.tableHead.forEach(item=>{
               a.push(item.prop)
               b[item.prop]=''
          })
          console.log('bbbb', b)
          var data = this.tableData;
          console.log(data);
          this.tableData.push(b)
        },
        /*删除一行*/
        delmembers(index, row) {
          console.log('row' , row)
          var that = this;
          this.$confirm('确认删除吗?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            //点击确定的操作(调用接口)
            var hasmembers = that.tableData;
            for (var i = 0; i < hasmembers.length; i++) {
              if (row.id === hasmembers[i].id) {
                that.tableData.splice(i, 1);
                this.$message({ message: '删除成功', type: 'success' });
              }
            }
          }).catch(() => {
            //点取消的提示
          });
        },
        rowClassName({ row, rowIndex }) {
          row.xh = rowIndex + 1;
        },
        //单选框选中数据
        handleDetailSelectionChange(selection) {
          if (selection.length > 1) {
            this.$refs.tb.clearSelection();
            this.$refs.tb.toggleRowSelection(selection.pop());
          } else {
            this.checkedDetail = selection;
          }
        },
        clickData(row, event, column) {
          console.log(row,  event,  column)
        },
        getit(it){
          console.log('itititi', it)
        },
        getTableData(){
        },
        saveTable(){
          console.log('tableData',this.tableData)
          if(this.tableData.length===0){
            this.$message.warning('请添加表格数据!')
            return
          }
         /* this.$router.push('/successPage')*/
          this.$message({
            type: 'success',
            message: '保存成功!'
          });
          this.$router.push('/dataReport')
        }
      }
    }
</script>

<style scoped>
  /deep/ .el-table--border {
    border: 1px solid #EBEEF5;
  }
</style>
