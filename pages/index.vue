<template>
  <div class="jl_main">
    <div class="jl_banner">
      <v-img/>
    </div>
    <v-row class="jl_main mt-3">
<!--      <v-col cols="4">-->
<!--        <v-card></v-card>-->
<!--        <v-card></v-card>-->
<!--      </v-col>-->
      <v-col cols="12" class="jl_list">
        <v-card class="jl_li mb-4 py-3 px-4" v-for="article in articleList" :key="article.id">
          <v-icon class="jl_edit" @click="$router.push(`/edit/${article.id}`)">mdi-pen</v-icon>
          <h2 class="jl_tit">{{article.title}}</h2>
          <div class="jl_des">{{article.des}}</div>
          <div class="jl_act">
            <v-btn-toggle class="jl_vote" dense>
              <v-btn class="jl_up_vote">
                <v-icon>mdi-arrow-up-bold-outline</v-icon>
                <span class="mx-1">赞同</span> <span>{{ article.likes }}</span>
              </v-btn>
              <v-btn class="jl_down_vote">
                <v-icon>mdi-arrow-down-bold-outline</v-icon>
              </v-btn>
            </v-btn-toggle>
            <div class="flex_align_center">
<!--              <div> <v-icon color="pink">mdi-heart</v-icon> 12 </div>-->
              <div class="jl_time">创作于&ensp;{{ article.createdAt }}</div>
            </div>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import {mapActions} from "vuex";

export default {
  components: {
  },
  data () {
    return{
      articleList:[]
    }
  },
  async mounted() {
    console.log(this.$vuetify)
    this.fetchArticle();
    // await this.$store.dispatch('articleCategory/getArticles')
  },
  methods:{
    ...mapActions({
      getArticles:'articleCategory/getArticles',
    }),
    async fetchArticle(){
      let fa = await this.getArticles({limit:15,page:1});
      if(fa.success) this.articleList = fa.data;
    }
  }
}
</script>

<style>
.jl_list .jl_li{position: relative;}
.jl_list .jl_li .jl_tit{font-size: 20px;}
.jl_list .jl_li:hover .jl_edit{display: block;}
.jl_list .jl_li .jl_edit{position: absolute;top: 10px;right: 15px;display: none;}
.jl_list .jl_li .jl_des{font-size: 15px;margin-top: 6px;}
.jl_list .jl_li .jl_act{display: flex;align-items: center;margin-top: 6px;justify-content: space-between;}
.jl_list .jl_li .jl_act .v-btn{letter-spacing: normal;text-indent: 0;}
.jl_list .jl_li .jl_act .jl_down_vote{min-width: 36px;}
.jl_list .jl_li .jl_act .jl_time{color: #999;font-size: 13px;}
</style>
