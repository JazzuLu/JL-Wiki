<template>
  <div class="mavonEditor">
    <div class="md_editor_tit mb-3">
      <v-text-field class="mr-5" v-model="artTitle" outlined label="Title" hide-details></v-text-field>
      <div v-if="!$vuetify.breakpoint.mdAndDown">
        <v-btn outlined color="primary" class="mde_tit_btn" @click="backToHome"><v-icon left>mdi-arrow-left</v-icon>back</v-btn>
        <v-btn outlined color="primary" class="mde_tit_btn ml-2" @click="saveMd" :disabled="saveBtnDisable"><v-icon left>mdi-content-save</v-icon>save</v-btn>
      </div>
      <div v-else class="d-flex align-center">
        <v-btn outlined icon color="primary" @click="backToHome"><v-icon>mdi-arrow-left</v-icon></v-btn>
        <v-btn outlined icon color="primary" @click="saveMd" :disabled="saveBtnDisable" class="ml-2"><v-icon>mdi-content-save</v-icon></v-btn>
      </div>
    </div>

    <mavon-editor :toolbars="markdownOption" v-model="artValue" style="height: calc(100vh - 200px);"/>
  </div>
</template>

<script>
import Logo from '~/components/Logo.vue'
import VuetifyLogo from '~/components/VuetifyLogo.vue'
import {mapActions} from 'vuex'

export default {
  components: {
    Logo,
    VuetifyLogo
  },
  data() {
    return {
      markdownOption: {
        bold: true, // 粗体
        italic: true, // 斜体
        header: true, // 标题
        underline: true, // 下划线
        strikethrough: true, // 中划线
        mark: true, // 标记
        superscript: true, // 上角标
        subscript: true, // 下角标
        quote: true, // 引用
        ol: true, // 有序列表
        ul: true, // 无序列表
        link: true, // 链接
        imagelink: true, // 图片链接
        code: true, // code
        table: true, // 表格
        fullscreen: true, // 全屏编辑
        readmodel: true, // 沉浸式阅读
        htmlcode: true, // 展示html源码
        help: true, // 帮助
        /* 1.3.5 */
        undo: true, // 上一步
        redo: true, // 下一步
        trash: true, // 清空
        save: true, // 保存（触发events中的save事件）
        /* 1.4.2 */
        navigation: true, // 导航目录
        /* 2.1.8 */
        alignleft: true, // 左对齐
        aligncenter: true, // 居中
        alignright: true, // 右对齐
        /* 2.2.1 */
        subfield: true, // 单双栏模式
        preview: true, // 预览
      },

      saveBtnDisable:false,

      artTitle:'my article',
      artValue: "#### use Markdown to build J-Wiki",
    }
  },

  methods:{

    ...mapActions({
      getArticle: 'articleCategory/getArticle',
      postArticle: 'articleCategory/postArticle',
      patchArticle: 'articleCategory/patchArticle',
    }),

    async saveMd(){
      let params = {
        title:this.artTitle,
        content:this.artValue,
      };
      this.$route.params.mdId ? params.id = this.$route.params.mdId : '';
      if(!this.artTitle){
        this.$notify({ type: 'error', title: '请输入文章标题'});
      }else if(!this.artValue){
        this.$notify({ type: 'error', title: '请输入文章内容'});
      }else {
        // 保存文章
        let fetchData = await this.postArticle(params);
        if(fetchData.success){
          this.$notify({ type: 'success', title: '保存成功',});

        }else{
          this.$notify({ type: 'error', title: fetchData.message,});
        }
      }
    },

    /** 上传图片回调 **/
    async uploadImg(pos, $file){
      let Authorization = localStorage.getItem('Authorization') ? localStorage.getItem('Authorization') : '';

      // let formdata = new FormData();
      // formdata.append('file', $file);
      // let fetchImg = await axios({
      //   url: url_post_upload,
      //   method: 'post',
      //   data: formdata,
      //   headers: { 'Content-Type': 'multipart/form-data','token':Authorization },
      // });
      // fetchImg = fetchImg.data;
      // if(!fetchImg.status){
      //
      //   let url = img_base_url + fetchImg.data.src;
      //   console.log(url)
      //   // 第二步.将返回的url替换到文本原位置![...](0) -> ![...](url)
      //   /**
      //    * $vm 指为mavonEditor实例，可以通过如下两种方式获取
      //    * 1. 通过引入对象获取: `import {mavonEditor} from ...` 等方式引入后，`$vm`为`mavonEditor`
      //    * 2. 通过$refs获取: html声明ref : `<mavon-editor ref=md ></mavon-editor>，`$vm`为 `this.$refs.md`
      //    */
      //   this.$refs.mde.$img2Url(pos, url);
      // }
      // let fetchData = await this.$fetch(url_post_upload,file,'post');
    },

    /** 返回首页 **/
    backToHome(){
      let params = {
        categoryId:this.$route.query.categoryId,
        articleId:this.$route.params.mdId,
      };

      // if(!this.saveBtnDisable){
      //   this.$confirm('编辑尚未保存，确定返回吗?','提示').then(async() => {
      //     this.$router.push({path:'/',query:params})
      //   })
      // }else{
      //   this.$router.push({path:'/',query:params})
      // }
    }
  },

}
</script>

<style>

  .md_editor_tit{height: 60px;overflow: hidden;padding-top: 4px;display: flex;align-items: center;}
  .md_editor_tit .mde_tit_btn{width: 110px;}

  .mavonEditor.full_md{ position: fixed;top: 0;left: 0;z-index: 100;width: 100vw;height: 100vh!important;}
  .full_md_btn{position: fixed;bottom: 3.5vh;right:15px;z-index: 10200;display: flex;flex-direction: column;align-items: center;}


</style>
