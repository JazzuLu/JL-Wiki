import Vue from 'vue'
import 'jquery'
import 'lodash'

/** markdown 编辑 **/
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'

/** 富文本编辑框  **/
import VueQuillEditor from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

Vue.use(VueQuillEditor, /* { default global options } */)

Vue.use(mavonEditor)
