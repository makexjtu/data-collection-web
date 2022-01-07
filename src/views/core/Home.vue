<!-- 开始实验页面 -->
<template>
  <el-card>
    <el-form  :model="dataForm" class="demo-form-inline">
    <div class="home-top">
       <h2>1导入模型</h2>
       <hr>
       <div class="top-form">
           <el-row>
             <el-col :span="10">
               <el-form-item label="模型类型" label-width="150px">
                 <el-select v-model="dataForm.model_type" placeholder="模型类型">
                   <el-option label="BP神经网络" value="1"></el-option>
                   <el-option label="ANN神经网络" value="2"></el-option>
                   <el-option label="其他（SVN、遗传算法）" value="3"></el-option>
                 </el-select>
               </el-form-item>
             </el-col>
             <el-col :span="10">
               <el-form-item label="神经网络" label-width="150px">
                 <el-input style="width: 355px;" v-model="dataForm.num_layer" placeholder="神经网络层数"></el-input>
               </el-form-item>
             </el-col>
             <el-col :span="10">
                 <el-form-item label="神经网络节点数" label-width="150px">
                   <el-input style="width: 358px;" v-model="dataForm.num_node" placeholder="神经网络节点数"></el-input>
                 </el-form-item>
             </el-col>
             <el-col :span="10" >
                 <el-form-item label="上传数学模型" label-width="150px">
                   <el-upload
                     class="upload-demo"
                     action="https://jsonplaceholder.typicode.com/posts/"
                     :on-preview="handlePreview"
                     :before-upload="beforeAvatarUpload"
                     multiple
                     :limit="1"
                     :on-exceed="handleExceed"
                     :on-success="handleSuccess"
                     :on-error="handleError"
                     :file-list="fileList">
                     <el-button size="small" type="primary" >点击上传</el-button>
                   </el-upload>
                 </el-form-item>
             </el-col>
           </el-row>

       </div>
    </div>
    <div class="home-center">
      <h2>2模拟设置</h2>
      <hr>
      <div class="home-center-type">
        <!--模拟类型-->
        <el-row class="rowStyle">
          <el-col :span="7">
            <el-form-item label="模拟类型：">
              <el-radio-group v-model="dataForm.analogType">
                <el-radio label="1">预测性能</el-radio>
                <el-radio label="2">预测工艺</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="3" v-if="dataForm.analogType==='2'">
            <el-form-item >
              <el-select v-model="dataForm.technique" placeholder="请选择" style="width: 150px">
                <el-option label="热处理实验" value="1"></el-option>
                <el-option label="有限元模拟" value="2"></el-option>
              </el-select>
            </el-form-item>
          </el-col >
          <el-col :span="3" v-if="dataForm.analogType==='2'">
            <el-form-item >
              <el-select v-model="dataForm.num_cycle" placeholder="请选择" style="width: 150px">
                <el-option label="退火" value="1"></el-option>
                <el-option label="退火+固溶" value="2"></el-option>
                <el-option label="退火+固溶+时效" value="3"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </div>
      <!--所有参数-->
      <div class="center-left">
        <div class="center-left-style">
          <div class="dndList-list">
            <h3 style="margin-left: 5px">所有参数:</h3>
            <draggable :list="allParams" :options="{group:{name: falgs,pull:'clone'},filter: '.undraggable', sort: false}"
                       @end="end"
                       class="dragArea">
             <!-- <div v-for="element in allParams" :key="element.id" :class="{undraggable : element.flag}" class="list-complete-item">
                <div> {{element.name}}</div>
              </div>-->
              <div v-for="element in allParams" :key="element.id" :class="{classname2:(element.color==='red'),classname3:(element.color==='blue'),classname4:(element.color==='orange')}" class="list-complete-item">
                <div :class="{undraggable : (element.flag)}"> {{element.name}}</div>
              </div>
            </draggable>
          </div>
        </div>
      </div>
      <!--输入、输出目标-->
      <div class="center-right">
        <div class="center-right-top" >
          <h3 style="margin-left: 5px">输入目标:</h3>
          <div class="radio-style">
           <div class="inputSytle">
              <el-row>
                <el-col :span="4">
                  <el-radio v-model="inputTarget" label="1">外部文件
                  </el-radio>
                </el-col>
                <el-col :span="5">
                  <el-upload
                    class="upload-demo"
                    action="https://jsonplaceholder.typicode.com/posts/"
                    :on-preview="handlePreview"
                    :before-upload="beforeAvatarUpload"
                     multiple
                    :limit="1"
                    :on-exceed="handleExceed"
                    :on-success="handleSuccess"
                    :on-error="handleError"
                    :file-list="fileList">
                    <el-button size="small" type="primary"  v-if="inputTarget==='1'">点击上传</el-button>
                  </el-upload>
                </el-col>
                <el-col :span="4">
                  <el-radio v-model="inputTarget" label="2">系统数据</el-radio>
                </el-col>
                <el-col :span="8" v-if="inputTarget==='2'">
                    <el-select  v-model="dataForm.dataList" placeholder="请选择" >
                      <el-option
                        v-for="item in dataList"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id">
                      </el-option>
                    </el-select>
                </el-col>
              </el-row>
           </div>
          </div>
          <div class="dndList-list">
            <draggable :list="input" :options="{group:'article', disabled: disabled}"
                       @start="start22"
                       @end="end22"
                       class="dragArea11"
                       style="height: 100px">
              <div v-for="(element, index) in input" :key="element.id" :class="{classname2:(element.color==='red'),classname3:(element.color==='green'),classname4:(element.color==='orange')}" class="list-complete-item">
                <div class="list-complete-item-handle">{{element.name}}</div>
                <div class="output-delete">
                  <i class="el-icon-delete" @click="handleDel(index, element.id)"></i>
                </div>
                <label >
                  <input  v-model="element.value" class="inputStyle" type="text">
                </label>
                <!-- <el-input class="inputStyle" v-model="dataForm.networkNodes" ></el-input>-->
              </div>
            </draggable>
          </div>
        </div>
        <div class="center-right-buttom">
          <div class="dndList-list">
            <h3 style="margin-left: 5px">输出目标</h3>
            <draggable :list="outputParams" :options="{group:'article', disabled: disabled}"
                       @start="start22"
                       @end="end22"
                       class="dragArea11"
                       style="height: 100px">
              <div v-for="(element, index) in outputParams" :key="element.id" :class="{classname2:(element.color==='red'),classname3:(element.color==='green'),classname4:(element.color==='orange')}" class="list-complete-item">
                <div class="list-complete-item-handle">{{element.name}}</div>
                <div class="output-delete">
                  <i class="el-icon-delete" @click="handleDel2(index, element.id)"></i>
                 <!-- <i class="el-icon-delete " @click="handleDel2(index, element.id)"></i>-->
                </div>
              </div>
            </draggable>
          </div>
        </div>
      </div>
    </div>
    </el-form>
    <div class="home-buttom">
      <el-button type="primary" class="buttonStyle" @click="goStart" >开始运行</el-button>
    </div>
  </el-card>
</template>

<script>
  import draggable from 'vuedraggable'
  export default {
    components: { draggable },
    data() {
      return {
        //输入目标上传绑定值
        radio:'',
        form:{
        },
        inputTarget:'1', // 判断输入目标是上传文件还是选择系统数据
        //用来绑定表单的数据的form
        dataForm:{
          model_type:'', // 模型类型
          num_layer:'', //神经网络层数
          num_node:'',//神经网络节点数
          analogType:'1', // 模型类型，1为预测性能，2为预测工艺
          technique:'',//热处理工艺，1代表热处理实验，2有限元模拟
          num_cycle:'',//循环次数1代表退火，2退火+固溶，3退火+固溶+时效
          dataList:[], // 下拉框中选中的系统数据
          inputParams:[], // 输入目标 往后台传的输入目标，全部参数，选中作为输入目标的需与未选中的区分开
          outputParams:[], //输出目标
        },
        dataList:[
          {
            id:1,
            name:"系统数据-用户自定义名称-xxxxxxxxxxx"
          },
          {
            id:2,
            name:"系统数据-用户自定义名称-xxxxxxxxxxx"
          }
        ]
        ,
        fileList: [],
        falgs: 'article',
        disabled: false,
        input: [],//输入目标
        inputArr:[], // 自定义一个数组放数据
        inputArr2:[], // 自定义一个数组放数据
        //所有参数
        allParams: [
          {id: 1, name: '退火保温温度',color:'red',prop:'temp1',value:null},
          {id: 2, name: '退火保温时间',color:'red',prop:'time1',value:null},
          {id: 3, name: '退火加热速率',color:'red',prop:'irate1',value:null},
          {id: 4, name: '退火冷却速率',color:'red',prop:'drate1',value:null},
          {id: 5, name: '退火抗拉强度σb',color:'red',prop:'sigma1',value:null},
          {id: 6, name: '退火屈服极限σ0.2',color:'red',prop:'sigma0p21',value:null},
          {id: 7, name: '退火伸长率',color:'red',prop:'delta1',value:null},
          {id: 8, name: '退火断面收缩率ψ',color:'red',prop:'psai1',value:null},
          {id: 9, name: '退火剪切强度τ',color:'red',prop:'tau1',value:null},
          {id: 10, name: '固溶保温温度' ,color:'blue',prop:'temp2',value:null},
          {id: 11, name: '固溶保温时间',color:'blue',prop:'time2',value:null},
          {id: 12, name: '固溶加热速率',color:'blue',prop:'irate2',value:null},
          {id: 13, name: '固溶冷却速率',color:'blue',prop:'drate2',value:null},
          {id: 14, name: '固溶抗拉强度σb',color:'blue',prop:'sigma2',value:null},
          {id: 15, name: '固溶屈服极限σ0.2',color:'blue',prop:'sigma0p22',value:null},
          {id: 16, name: '固溶伸长率',color:'blue',prop:'delta2',value:null},
          {id: 17, name: '固溶断面收缩率ψ',color:'blue',prop:'psai2',value:null},
          {id: 18, name: '固溶剪切强度τ',color:'blue',prop:'tau2',value:null},
          {id: 19, name: '时效保温温度',color:'green',prop:'temp3',value:null},
          {id: 20, name: '时效保温时间',color:'green',prop:'time3',value:null},
          {id: 21, name: '时效加热速率',color:'green',prop:'irate3',value:null},
          {id: 22, name: '时效冷却速率',color:'green',prop:'drate3',value:null},
          {id: 23, name: '时效抗拉强度σb',color:'green',prop:'sigma3',value:null},
          {id: 24, name: '时效屈服极限σ0.2',color:'green',prop:'sigma0p23',value:null},
          {id: 25, name: '时效伸长率',color:'green',prop:'delta3',value:null},
          {id: 26, name: '时效断面收缩率ψ',color:'green',prop:'psai3',value:null},
          {id: 27, name: '时效剪切强度τ',color:'green',prop:'tau3',value:null},
          {id: 28, name: '钛（Ti）',color:'orange',prop:'cti',value:null},
          {id: 29, name: '铝（Al）',color:'orange',prop:'cal',value:null},
          {id: 30, name: '钒（V）',color:'orange',prop:'cv',value:null},
          {id: 31, name: '铁（Fe）',color:'orange',prop:'cfe',value:null},
          {id: 32, name: '碳（）',color:'orange',prop:'cc',value:null},
          {id: 33, name: '氢(H)',color:'orange',prop:'ch',value:null},
          {id: 34, name: '氧（O）',color:'orange',prop:'co',value:null},
          {id: 35, name: '规格',color:'orange',prop:'guige',value:null},

        ],
        outputParams:[
        ],//输出目标
      }
    },
    created() {
      //初始化加载数据
      //this.initData();
    },
    computed: {

    },
    methods: {
      /*点击开始运行按钮*/
      goStart(){
        this.allParams.forEach((item,index)=>{
          this.input.forEach(item2,index=>{
            console.log("item.prop" ,item.prop)
            console.log("item2.prop" ,item2.prop)
          })
         /* if(item.prop === this.input[index].prop){
            item.value=this.input[index].value
          }*/
        });
        console.log('this.allParams', this.allParams)
       /* console.log('this.allParams', this.allParams)*/
       /* this.allParams.*/
       /* this.input.forEach(item=>{this.inputArr[item.prop]=item.value})
        console.log('this.inputArr', this.inputArr)
        this.allParams.forEach(item=>{this.inputArr2[item.prop]=item.value})
        console.log('this.inputArr2', this.inputArr2)*/
       /* if(this.inputParams.length===0){
          this.$message.warning('请填写输入参数')
        }*/
        let m2= this.inputParams;
         /* m2.forEach(it2 =>{
            this.dataForm.inputParams.push({
              id:it2.id,
              prop:it2.prop,
              value:it2.value
            })
          });*/
        console.log('this.outputParams', this.outputParams)
        let m1= this.outputParams;
        let mm1=this.allParams;
        m1.forEach((item,index) =>{
          this.dataForm.outputParams.push({
            id:item.id,
            prop:item.prop
          });
        })
        console.log('往后台传的所有参数this.dataForm' , this.dataForm)
        //this.$router.push('/resultData');
      },
      end (ev) {
        console.log("evev" ,ev)
        if (ev.to.className === 'dragArea11') {
          this.$set(this.allParams[ev.oldIndex], 'flag', true)
        }
      },
      start22 (event) {
        this.falgs = '222222'
      },
      end22 (ev) {
        this.falgs = 'article'

      },
      handleDel (index, id) {
        console.log('this.input',this.input)
        this.input.splice(index, 1)
        let q = this.allParams.find((value, index, arr) => {
          return value.id === id
        })
        this.$set(q, 'flag', false)
      },
      handleDel2 (index, id) {
        this.outputParams.splice(index, 1)
        let q = this.allParams.find((value, index, arr) => {
          return value.id === id
        })
        this.$set(q, 'flag', false)
      },
      handleRemove(file, fileList) {
        /* return this.$confirm(`确定移除 ${ file.name }？`);*/
        return this.$confirm('确定删除？','消息',{
          confirmButtonText:'确定',
          callback:action => {
            //自动刷新页面
            window.location.reload()
            // _this.$router.push('/pageOne')
          }
        });
        /* console.log(file, fileList);*/
      },
      // 文件上传成功时的钩子
      handleSuccess(res, file, fileList) {
        this.$message.success('文件上传成功');
        /* console.log(file.response.data);*/
        if(file.status!=='success')
          return  this.$message.error('文件上传失败');
        /*this.$router.push('/uploadSubmit')*/
      },
      // 文件上传失败时的钩子
      handleError(err, file, fileList) {
        this.$message.error('文件上传失败');
      },
      //点击文件列表中已上传的文件时的钩子
      handlePreview(file) {
        console.log(file);
      },
      handleExceed(file, fileList) {
        this.$message.warning(`当前限制选择 1个文件，本次选择了 ${file.length} 个文件，共选择了 ${file.length + fileList.length} 个文件`);
      },
      /* beforeRemove(file, fileList) {
         console.log(file);
        return this.$confirm(`确定移除 ${ file.name }？`);
       },*/
      beforeAvatarUpload(file){
        console.log('上传前');
        const Xls = file.name.split('.');
       /* const isLt2M = file.size / 1024 / 1024 < 10;*/
        console.log('1');
        if(Xls[1] === 'zip'||'xlsx'){
          return file;
        }else{
          this.$message.error('上传文件只能是zip格式');
          return false
        }
      /*  if(!isLt2M){
          this.$message.error('上传文件大小不能超过 10MB');
          return false;
        }*/
      }
    }
  }
</script>

<style lang="less" scoped>
  /*拖拽样式*/
  .list-complete-item {
    cursor: pointer;
    position: relative;
    font-size: 12px;
    padding: 5px 12px;
    margin: 5px 15px;
    display: inline-block;
    background-color: #eaffea;
    width: 100px;
    height: 40px;
    border: 1px solid #bfcbd9;
    transition: all 1s;
  }
  .list-complete-item2 {
    cursor: pointer;
    position: relative;
    font-size: 12px;
    padding: 5px 12px;
    margin: 5px 15px;
    display: inline-block;
    background-color: #c0f3ff;
    width: 100px;
    height: 40px;
    border: 1px solid #bfcbd9;
    transition: all 1s;
  }
  .list-complete-item3 {
    cursor: pointer;
    position: relative;
    font-size: 12px;
    padding: 5px 12px;
    margin: 5px 15px;
    display: inline-block;
    background-color: #c6fff8;
    width: 100px;
    height: 40px;
    border: 1px solid #bfcbd9;
    transition: all 1s;
  }
  .list-complete-item4 {
    cursor: pointer;
    position: relative;
    font-size: 12px;
    padding: 5px 12px;
    margin: 5px 15px;
    display: inline-block;
    background-color: #ff8b8b;
    width: 100px;
    height: 40px;
    border: 1px solid #bfcbd9;
    transition: all 1s;
  }
  .list-complete-item.sortable-chosen {
    background: #4AB7BD;
  }

  .list-complete-item.sortable-ghost {
    background: #30B08F;
  }
  .undraggable {
    background-color: #d9d6d4;
    width: 126px;
    height: 52px;
    margin-top: -5px;
    padding-top: -5px;
    margin-left: -13px;
  }
  .classname2{
    background-color: #bfb8ed;
  }
  .classname3{
    background-color: #c0f3ff;
  }
  .classname4{
    background-color: #f28058;
  }
  .list-complete-enter,
  .list-complete-leave-active {
    opacity: 0;
  }
  /*拖拽样式结束*/
/*.home-top{
  width: 100%;
}
.top-form{
  width: 100%;
  margin-top: 15px;
}*/
.home-center{
  width: 100%;
  overflow: hidden;
}
.home-center-type{
  margin-left: 20px;
}
 .center-left{
  float: left;
  width: 45%;
  margin-left:15px;
}
.center-left-style{
  border:1px solid #d9d6d4;
  border-radius:5px;
  height:420px;
  overflow:auto;
}
.center-right{
  float: left;
  border-radius:5px;
  width: 45%;
  margin-left: 10px;

}
.center-right-top{
  border:1px solid #d9d6d4;
  border-radius:5px;
  height: 250px;
  margin-bottom: 15px;
  overflow:auto;
}
.radio-style{
  margin-bottom: 15px;
  margin-left: 20px;
}
  .inputSytle{
   padding-top: 10px;
    margin-bottom: 15px;
 }

  .outputStyle{

  }

.center-right-buttom{
  border:1px solid #d9d6d4;
  border-radius:5px;
  height: 150px;
  overflow:auto;
}
.home-buttom{
  width: 100%;
  margin-top: 10px;
}
  .buttonStyle{
    display: block;
    margin: 0 auto;
    width: 200px;
  }
  /deep/ .el-col-8 {
    width: 33.33333%;
    margin-top: -8px;
  }
/*  /deep/ i.el-icon-delete{
    float: right;
    margin-top: -57px;
    margin-right: -10px;
  }*/
  .output-delete{
    float: right;
    width: 30px;
    height: 20px;
    margin-top: -20px;
    margin-right: -28px;
  }
  .inputStyle{
    margin-top: 3px;
    width: 80px;
    height: 18px;
  }
</style>

