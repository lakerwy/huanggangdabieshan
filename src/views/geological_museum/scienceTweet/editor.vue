<template>
  <div class="editor">
    <div id="e"></div>
  </div>
</template>

<script>
import E from "wangeditor";
import axios from 'axios';
export default {
  name: 'editor',
  data() {
    return {
      content: "",
      editor: {
        customConfig: null
      },
      info_: null
    }
  },
  watch: {
    isClear(val) {
      if (val) {
        this.editor.txt.clear()
        // this.info_=null
      }
    },
  },
  props: {
    desc: {
      type: String,
      default: ""
    },
    //业务中我们经常会有添加操作和编辑操作，添加操作时，我们需清除上一操作留下的缓存
    isClear: {
      type: Boolean,
      default: false
    }
  },

  methods: {
    initE() {
      this.editor = new E('#e');
      this.editor.customConfig = this.editor.customConfig ? this.editor.customConfig : this.editor.config;
      this.editor.customConfig.onchangeTimeout = 3*60*1000 // 超时时间
      this.editor.customConfig.uploadFileName = 'file'
      this.editor.customConfig.uploadImgServer = window.globalUrl.HOME_API + '/datamanager/article/uploadFiles'  // 你的服务器地址
      this.editor.customConfig.uploadImgHooks = {
        before: function (xhr, editor, files) {
        },
        success: function (xhr, editor, result) {
        },
        fail: function (xhr, editor, result) {
        },
        error: function (xhr, editor) {
        },
        timeout: function (xhr, editor) {
        },
        customInsert: function (insertImg, result, editor) {
          var url = result.url
          insertImg(url)
        }
      }
      this.editor.customConfig.customUploadImg = (files, insert) => {
        let formData = new FormData();
        files.forEach((item) => {
          formData.append("file", item, item.name);
        });
        axios({
          url: window.globalUrl.HOME_API + '/datamanager/article/uploadFiles',
          method: 'POST', //请求方式
          headers: { 'content-type': 'application/x-www-form-urlencoded' },
          data: formData,
        }).then(res => {
          if(res.success){
            res.body.forEach(item=>{
              insert(window.globalUrl.FTP_URL+item)
            })
          }
        })
      }
      this.editor.customConfig.onchange = (html) => {
        if(html){
          this.info_ = html // 绑定当前逐渐地值
        }
        this.$emit('editorString',this.info_); // 将内容同步到父组件中
      }
      this.editor.customConfig.menus = [
        'head',  // 标题
        'bold',  // 粗体
        'fontSize',  // 字号
        'fontName',  // 字体
        'italic',  // 斜体
        'underline',  // 下划线
        'strikeThrough',  // 删除线
        'foreColor',  // 文字颜色
        'backColor',  // 背景颜色
        'link',  // 插入链接
        'list',  // 列表
        'justify',  // 对齐方式
        'quote',  // 引用
        'emoticon',  // 表情
        'image',  // 插入图片
        // 'table',  // 表格
        'code',  // 插入代码
        'undo',  // 撤销
        'redo'  // 重复
      ]
      this.editor.create()
      // this.editor.txt.html(this.desc)
      //  this.editor.txt.html(this.desc)
    }
  },
  mounted() {
    this.$nextTick(()=>{
      if(!this.editor.customConfig){
        this.initE();
      }else{
        this.editor.destroy();
         this.initE();
      }
    })
  },
}
</script>

<style scoped>
</style>
