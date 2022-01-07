<!-- 文件上传组件(文件上传，不限制格式) -->
<template>
  <div class="file-upload">
    <!-- header 上传请求头部 action 上传地址 on-preview	点击文件列表中已上传的文件时的钩子
      on-remove	文件列表移除文件时的钩子 multiple	是否支持多选文件 limit	最大允许上传个数
      before-upload	上传文件之前的钩子，参数为上传的文件，若返回 false 或者返回 Promise 且被 reject，则停止上传。
      on-exceed	文件超出个数限制时的钩子 on-success	文件上传成功时的钩子
      on-error	文件上传失败时的钩子 file-list	上传的文件列表, 例如: [{name: 'food.jpg', url: 'https://xxx.cdn.com/xxx.jpg'}]-->
    <!--http://192.168.0.129:8010/basic/uploadImage-->
    <!-- :headers="headers" -->
    <el-upload
      class="com-upload"
      :action="actionUrl"
      :limit="limitNum"
      :multiple="multiple"
      :on-preview="handlePreview"
      :on-remove="handleRemove"
      :before-upload="beforeAvatarUpload"
      :on-exceed="handleExceed"
      :on-success="success"
      :on-error="handleError"
      :file-list="fileList"
      >
      <el-button style="width:180px;margin-left:10px;" type="primary" >文件上传</el-button>
      <div slot="tip" class="el-upload__tip">上传文件单个大小不超过2MB</div>
    </el-upload>
  </div>
</template>
<!-- 文件上传组件 
  <file-upload :headers="headers" :actionUrl="actionUrl" :limitNum="limitNum" :multiple="multiple" @change="getUploadFile"></file-upload>
  getUploadFile(fileList){
    //console.log("父组件中接收到的值：" + JSON.stringify(fileList));
    //判断fileList是否为空
    if(fileList.length > 0){
      //获取文件列表中，每一个文件的URL
      fileList.forEach(element => {
        console.log("获取的URL地址：" + element.response.data.url);
      });
    }else{
      //如果返回的文件列表为空，则将页面内的存储位置清空
    }
  }
  //局部引用组件使用
  import FileUpload from '@/components/FileUpload'
  components:{
    'FileUpload':FileUpload
  }
-->
              
<script>
  export default {
    name: "file-upload",
    props: {
      // headers: {//请求头
      //   type: Object,
      //   default: null
      // },
      actionUrl: {//上传请求地址
        type:String,
        default: ''
      },
      limitNum:{//最多上传文件数
        type: Number,
        default:1
      },
      multiple: {//是否支持多文件选择
        type: Boolean,
        default: true
      }
    },
    data() {
      return {
        //上传文件列表
        fileList: [],
      };
    },
    methods: {
      //点击文件列表中已上传的文件时的钩子
      handlePreview(file) {
        //console.log("点击文件已经上传的钩子：" + file);
      },
      //文件列表移除文件时的钩子
      handleRemove(file, fileList) {
        //console.log("组件内文件移除后列表：" + JSON.stringify(fileList));
        this.$emit("change", fileList);
      },
      //文件上传前的钩子
      beforeAvatarUpload(file) {
        console.log("文件上传地址：",this.actionUrl);
        //console.log("文件类型：" + file.type);
        //const isFILE = file.type === 'image/jpeg' || file.type === 'image/jpg' || file.type === 'image/png'
        const isLt2M = file.size / 1024  /1024< 21;
        // if (!isFILE) {
        //   this.$message.error('上传头像图片只能是 JPG\PNG\JPEG格式!');
        // }
        if (!isLt2M) {
          this.$message.error('上传文件大小不能超过 2MB!');
        }
        //return isFILE && isLt2M;
        return isLt2M;
      },
      //文件超出个数限制时的钩子
      handleExceed(file, fileList) {
        this.$message.warning(`当前限制选择 ${this.limitNum} 个文件，本次选择了 ${file.length} 个文件，共选择了 ${file.length + fileList.length} 个文件`);
      },
      //文件上传成功时的钩子
      success(res, file,fileList) {
        //console.log("组件内上传文件列表：" + JSON.stringify(fileList));
        this.$emit("change", fileList);
      },
      // 文件上传失败时的钩子
      handleError(err, file, fileList) {
        this.$message.error('文件上传失败');
      }
    }
  }
</script>

<style lang="less" scoped>
  
</style>
