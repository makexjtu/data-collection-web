<!-- ueditor组件 -->
<template>
  <script :id="randomId" name="content" type="text/plain"></script>
</template>
<!-- 
  <con-editor :defaultMsg="defaultMsg" @ready="getUeditor"></con-editor> 
  //定义ueditor对象
  ue: null,
  //获取ueditor中的数据
  this.ue.getContent();
  //获取ueditor实例
  getUeditor(ue) {
    this.ue = ue; //获取ue实例
  },
-->
<script>
export default {
  name: "con-editor",
  props: {
    ueditorPath: {
      // UEditor 代码的路径
      type: String,
      default: ""
    },
    defaultMsg: {//ueditor内显示的内容
      type: String,
      default: ""
    },
    ueditorConfig: {
      // UEditor 配置项
      type: Object,
      default: function() {
        return { 
          initialFrameHeight: 400,
          initialFrameWidth: 700,
          autoHeightEnabled: false,
          toolbars: [
            [
              "source",
              "|",
              "undo",
              "redo",
              "|",
              "bold",
              "italic",
              "underline",
              "fontborder",
              "strikethrough",
              "superscript",
              "subscript",
              "removeformat",
              "formatmatch",
              "autotypeset",
              "blockquote",
              "pasteplain",
              "|",
              "forecolor",
              "backcolor",
              "insertorderedlist",
              "insertunorderedlist",
              "selectall",
              "cleardoc",
              "|",
              "rowspacingtop",
              "rowspacingbottom",
              "lineheight",
              "|",
              "customstyle",
              "paragraph",
              "fontfamily",
              "fontsize",
              "|",
              "directionalityltr",
              "directionalityrtl",
              "indent",
              "|",
              "justifyleft",
              "justifycenter",
              "justifyright",
              "justifyjustify",
              "|",
              "touppercase",
              "tolowercase",
              "|",
              "link",
              "unlink",
              "|",
              "imagenone",
              "imageleft",
              "imageright",
              "imagecenter",
              "|",
              "insertimage",
              "emotion",
              "insertvideo",
              "attachment",
              "map",
              "pagebreak",
              "|",
              "horizontal",
              "date",
              "time",
              "spechars",
              "|",
              "inserttable",
              "deletetable",
              "insertparagraphbeforetable",
              "insertrow",
              "deleterow",
              "insertcol",
              "deletecol",
              "mergecells",
              "mergeright",
              "mergedown",
              "splittocells",
              "splittorows",
              "splittocols",
              "charts",
              "|",
              "print",
              "searchreplace",
            ]
          ]
        };
      }
    },
    index: {
      default: 0
    }
  },
  data() {
    return {
      // 为了避免麻烦，每个编辑器实例都用不同的 id
      randomId: "editor_" + Math.random() * 10000,
      instance: null,
      // scriptTagStatus -> 0:代码未加载，1:两个代码依赖加载了一个，2:两个代码依赖都已经加载完成
      scriptTagStatus: 0,
      //appId: this.$store.state.sys.appId
    };
  },
  created() {
    this.initEditor();
  },
  mounted: function() {},
  beforeDestroy() {
    // 组件销毁的时候，要销毁 UEditor 实例
    //  this.instance.ready(function() {
    //    this.instance.destroy();
    //  })
  },
  watch: {
    defaultMsg(val, oldVal) {
      this.instance = window.UE.getEditor(this.randomId, this.ueditorConfig); // 初始化UE
      if (val !== null) {
        this.instance.ready(function() {
          this.setContent(val); // 确保UE加载完成后，放入内容。
        });
      }
    }
  },
  methods: {
    getUEContent() {
      return this.instance.getContent();
    },
    initEditor() {
      let self = this;
      // Vue 异步执行 DOM 更新，这样一来代码执行到这里的时候可能 template 里面的 script 标签还没真正创建
      // 所以，我们只能在 nextTick 里面初始化 UEditor
      this.$nextTick(() => {
        this.instance = window.UE.getEditor(this.randomId, this.ueditorConfig);
        // 绑定事件，当 UEditor 初始化完成后，将编辑器实例通过自定义的 ready 事件交出去
        this.instance.addListener("ready", () => {
          window.UE.Editor.prototype._bkGetActionUrl =
            window.UE.Editor.prototype.getActionUrl;
          window.UE.Editor.prototype.getActionUrl = function(action) {
            if (action == "uploadimage") {
              return (window.globalData.baseUrl + "/basic/ueditorUploadImage" + "?authorization=" + sessionStorage.getItem('token'));
            } else if (action == "uploadvideo") {
              return (window.globalData.baseUrl + "/basic/ueditorUploadImage" + "?authorization=" + sessionStorage.getItem('token'));
            } else if (action == "uploadfile") {
              return (window.globalData.baseUrl + "/basic/ueditorUploadImage" + "?authorization=" + sessionStorage.getItem('token'));
            } else if (action == "config") {
              return "./static/ueditor/config.json";
              // return this._bkGetActionUrl.call(this, action);
            }
          };
          this.$emit("ready", this.instance, this.index);
          this.instance.setContent(this.defaultMsg); // 确保UE加载完成后，放入内容。
        });
      });
    }
  }
};
</script>
