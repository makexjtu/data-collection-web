<!-- 文件上传组件 -->
<template>
  <div class="picture-upload">
    <!-- header 上传请求头部 action 上传地址 on-preview	点击文件列表中已上传的文件时的钩子
      on-remove	文件列表移除文件时的钩子 multiple	是否支持多选文件 limit	最大允许上传个数
      before-upload	上传文件之前的钩子，参数为上传的文件，若返回 false 或者返回 Promise 且被 reject，则停止上传。
      on-exceed	文件超出个数限制时的钩子 on-success	文件上传成功时的钩子
      on-error	文件上传失败时的钩子 file-list	上传的文件列表, 例如: [{name: 'food.jpg', url: 'https://xxx.cdn.com/xxx.jpg'}]-->
    <!--http://192.168.0.129:8010/basic/uploadImage-->
    <el-upload
      list-type="picture-card"
      :headers="headers"
      :action="actionUrl"
      :multiple="multiple"
      :before-upload="beforeAvatarUpload"
      :on-preview="handlePictureCardPreview"
      :on-success="success"
      :on-error="handleError"
      :on-remove="handleRemove">
      <i class="el-icon-plus"></i>
    </el-upload>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
  </div>
</template>
<!-- 文件上传组件 
  <file-upload :headers="headers" :actionUrl="actionUrl" :limitNum="limitNum" :multiple="multiple" @change="getUploadFile"></file-upload>
-->
              
<script>
  export default {
    name: "picture-upload",
    props: {
      headers: {//请求头
        type: Object,
        default: null
      },
      actionUrl: {//上传请求地址
        type:String,
        default: ''
      },
      multiple: {//是否支持多文件选择
        type: Boolean,
        default: true
      }
    },
    data() {
      return {
        dialogImageUrl: '',
        dialogVisible: false,
      };
    },
    methods: {
      //文件列表移除文件时的钩子
      handleRemove(file,fileList) {
        console.log("组件内文件移除后列表：" + file);
      },
      //文件上传前的钩子
      beforeAvatarUpload(file) {
        console.log("文件类型：" + file.type);
        const isFILE = file.type === 'image/jpeg' || file.type === 'image/jpg' || file.type === 'image/png'
        const isLt2M = file.size / 1024  /1024< 21;
        if (!isFILE) {
          this.$message.error('上传头像图片只能是 JPG\PNG\JPEG格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传文件大小不能超过 2MB!');
        }
        return isFILE && isLt2M;
      },
      //文件上传成功时的钩子
      success(res, file,fileList) {
        console.log("组件内上传文件列表：" + JSON.stringify(fileList));
        this.$emit("change", fileList);
      },
      // 文件上传失败时的钩子
      handleError(err, file, fileList) {
        this.$message.error('文件上传失败');
      },
      handlePictureCardPreview(file) {
        console.log("基础地址：" + window.globalData.baseUrl);
        this.dialogImageUrl = window.globalData.baseUrl + file.response.data.url;
        this.dialogVisible = true;
      },
    }
  }
</script>

<style lang="less" scoped>
  
</style>
