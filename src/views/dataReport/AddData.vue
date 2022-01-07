<template>
  <div class="addData">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span class="card-title">数据管理</span>
          <router-link to="dataReport"> <div class="back-list">返回</div></router-link>
      </div>
      <div class="addData-content">
       <div class="addData-content-top">
          <div class="addData-content-left">
            <div class="dndList-list">
              <h3 style="margin-left: 5px">所有参数:</h3>
              <draggable :list="allParams" :options="{group:{name: falgs,pull:'clone'},filter: '.undraggable', sort: false}"
                         @end="end"
                         class="dragArea">
                <div v-for="element in allParams" :key="element.id" :class="{classname2:(element.color==='red'),classname3:(element.color==='green')}" class="list-complete-item">
                  <div :class="{undraggable : (element.flag)}"> {{element.name}}</div>
                </div>
               <!-- <div v-for="element in allParams" :key="element.id" :class="{undraggable : element.flag}" class="list-complete-item">
                  <div> {{element.name}}</div>
                </div>-->
              </draggable>
            </div>
          </div>
          <div class="addData-content-right">
            <h3 style="margin-left: 10px">输入参数：</h3>
            <draggable :list="inputParams" :options="{group:'article', disabled: disabled}"
                       @start="start22"
                       @end="end22"
                       @onAdd="newList"
                       class="dragArea11"
                       style="height: 100px">
              <div v-for="(element, index) in inputParams" :key="element.id" :class="{classname2:(element.color==='red'),classname3:(element.color==='green')}" class="list-complete-item">
                <div class="list-complete-item-handle">{{element.name}}</div>
                <div class="addParams-delete">
                  <i class="el-icon-delete" @click="handleDel(index, element)"></i>
                </div>
              </div>
            </draggable>

          </div>
        </div>
        <div class=" addData-content-buttom">
            <el-button type="primary" class="buttonStyle" @click="nextStep(inputParams)" >下一步</el-button>
        </div>

      </div>
    </el-card>
  </div>
</template>

<script>
  import draggable from 'vuedraggable'
    export default {
      components: { draggable },
      name: "AddData",
      data(){
          return{
            disabled: false,
            falgs: 'article',
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
            inputParams:[]

          }

      },
      created() {
      },
      methods:{
          nextStep(inputParams){
            console.log('inputParams' ,inputParams)
            if(inputParams.length ===0){
               this.$message.warning('请先选择输入参数');
            }else{
              localStorage.setItem('inputParams',JSON.stringify(inputParams) )
              this.$router.push('/tableManagement')
            }
          /*  var m = [];
              inputParams.forEach(v=>{
                m.push(v.id);
              })*/
          },
        end (ev) {
          console.log("所有参数中的其中一个参数拖拽结束" ,ev)
          if (ev.to.className === 'dragArea11') {
            this.$set(this.allParams[ev.oldIndex], 'flag', true)
          }
        },
        start22 (event) {
          console.log('输入数据开始',event)
          this.falgs = '222222'
        },
        end22 (ev) {
            console.log('输入数据结束',ev)
          this.falgs = 'article'
        },
        newList(event){
            console.log('event', event)
        },
        handleDel (index, element) {
          console.log('索引',index)
          console.log('元素',element)
          this.inputParams.splice(index, 1)
          let q = this.allParams.find((value, index, arr) => {
            return value.id === element.id
          })
          this.$set(q, 'flag', false)
        }

      }
    }
</script>

<style scoped>
  /*拖拽的样式*/
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
  .list-complete-item.sortable-chosen {
    background: #4AB7BD;
  }
  .list-complete-item.sortable-ghost {
    background: #30B08F;
  }
  .undraggable {
    background-color: #d9d6d4;
  }

  .list-complete-enter,
  .list-complete-leave-active {
    opacity: 0;
  }
  /*拖拽样式结束*/
  .back-list  {
    float: right;
    color:#1890FF;
    text-decoration: none;
    margin-right:20px;
  }
.addData-content-top{
  height: 450px;
}
.addData-content-left{
  float: left;
  border:1px solid #d9d6d4;
  border-radius:5px;
  height: 400px;
  width: 50%;
  overflow:auto;
}
.addData-content-right{
  margin-left: 50px;
  float: left;
  width: 35%;
  border:1px solid #d9d6d4;
  border-radius:5px;
  height: 320px;
  overflow:auto;
}
.addData-content-buttom{
  width: 100%;
}
  .addParams-delete{
    float: right;
    width: 30px;
    height: 20px;
    margin-top: -20px;
    margin-right: -24px;
  }
  /*可拖拽样式*/
  .undraggable {
    background-color: #d9d6d4;
    width: 126px;
    height: 52px;
    margin-top: -5px;
    padding-top: -5px;
    margin-left: -13px;
  }
  .classname2{
    background-color: #f28058;
  }
  .classname3{
    background-color: #c0f3ff;
  }


</style>
