<!--运行与结果界面-->
<template>
  <div class="publiclist">
    <el-card class="box-card">
      <div class="box-card-title">
        <div class="box-card-title1">
          <h2>运行与结果</h2>
        </div>
        <div class="box-card-title2">
          <router-link to="home"> <div class="back-list">返回</div></router-link>
        </div>
      </div>
      <hr>
      <div class="watitProgress" v-if="result===1">
        <div class="watitProgress-style">
          <p style="padding-left: 200px">正在处理中，请稍后.....</p>
          <!--<el-progress :text-inside="true" :stroke-width="26" :percentage="percentage"></el-progress>-->
          <img src="../../assets/images/进度条.jpg" @click="changeStatus" alt=""/>
        </div>
      </div>
      <div  v-if="result===2">
        <div class="pass-top" >
          <div class="pass-top-style">
            <img style="margin-left: 18px" src="../../assets/images/通过.png"  alt=""/>
            <h2>操作成功！</h2>
          </div>
        </div>
        <div class="pass-center" >
          <h3>结果数据：</h3>
          <el-table :data="tableData" height="300" border style="width: 100%">
            <el-table-column prop="date" label="抗拉强度σb" >
            </el-table-column>
            <el-table-column prop="name" label="屈服极限" >
            </el-table-column>
            <el-table-column prop="aaaa" label="伸长率δ">
            </el-table-column>
            <el-table-column prop="bbbb" label="断面收缩率">
            </el-table-column>
          </el-table>

        </div>
        <div class="pass-buttom" >
          <h3>导出数据：</h3>
          <div class="pass-buttom-style">
            <div class="buttom-style-left">
              <el-checkbox-group v-model="checkList">
                <el-checkbox label="项目信息"></el-checkbox>
                <el-checkbox label="输入数据"></el-checkbox>
                <el-checkbox label="输出数据"></el-checkbox>
              </el-checkbox-group>
            </div>
            <div class="buttom-style-right">
              <el-button type="primary"  @click="exportData" >导出数据</el-button>
            </div>
          </div>
        </div>
      </div>
      <div  v-if="result===3">
        <div class="pass-top" >
          <div class="pass-top-style">
            <img style="margin-left: 18px" src="../../assets/images/未通过.png"  alt=""/>
            <h2>操作失败！</h2>
          </div>
        </div>
        <div class="dispass" >
          <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="报错信息" >
              <el-input type="textarea"  v-model="form.desc" width="300px"></el-input>
            </el-form-item>
          </el-form>

        </div>
      </div>
    </el-card>
  </div>

</template>

<script>
    export default {
        name: "ResultData",
      data(){
        return{
          form:{
            desc:''
          },
          result:1,
          /*多选框绑定数据*/
          checkList:[],
        tableData: [{
          date: '0.012345',
          name: '0.012345',
          aaaa: '0.012345',
          bbbb: '0.012345'
        }, {
          date: '0.012345',
          name: '0.012345',
          aaaa: '0.012345',
          bbbb: '0.012345'
        },
          {
            date: '0.012345',
            name: '0.012345',
            aaaa: '0.012345',
            bbbb: '0.012345'
          },{
            date: '0.012345',
            name: '0.012345',
            aaaa: '0.012345',
            bbbb: '0.012345'
          },{
            date: '0.012345',
            name: '0.012345',
            aaaa: '0.012345',
            bbbb: '0.012345'
          }
          ,{
            date: '0.012345',
            name: '0.012345',
            aaaa: '0.012345',
            bbbb: '0.012345'
          },{
            date: '0.012345',
            name: '0.012345',
            aaaa: '0.012345',
            bbbb: '0.012345'
          },{
            date: '0.012345',
            name: '0.012345',
            aaaa: '0.012345',
            bbbb: '0.012345'
          }
        ]
        }

      },
      created() {

      },
      methods:{
        changeStatus(){
          console.log('dianjile ')
          this.result = 2;
          console.log(this.result)
        },
        exportData(){
          console.log('点击了导出数据')

        }

      }
    }
</script>

<style scoped>
  .box-card-title1{
    float: left;
  }
  .box-card-title2{
    margin-top: 20px;
    float: right;
  }
  .watitProgress{
    width: 100%;
    height: 600px;
  }
  .watitProgress-style{
    width: 60%;
    padding-top: 150px;
    padding-left: 250px;
  }
  .pass-top{
    width: 100%;
    height: 150px;
  }
  .pass-top-style{
    padding-top: 10px;
    width: 120px;
    margin: 0 auto;
  }
  .pass-center{
    margin-bottom: 30px;
  }
  /deep/ .el-table--border {
    border: 1px solid #EBEEF5;
  }
  .pass-buttom-style{
    overflow: hidden;
  }
  .buttom-style-left{
    margin-top: 10px;
    margin-left: 70px;
    float: left;
  }
  .buttom-style-right{
    margin-left: 30px;
    float: left;
    margin-bottom: 30px;
  }

</style>
