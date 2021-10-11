<template>
  <v-app-bar clipped-left fixed app>
    <v-toolbar-title>
      <div class="jl_sidebar_header">
        <v-avatar size="38" color="#00d2c0" style="font-weight: bold;color: #fff;">JL</v-avatar>
        <div class="jl_title">JL WiKi</div>
      </div>
    </v-toolbar-title>

    <v-spacer/>

    <v-toolbar-title>
      <v-btn icon small class="ml-2" @click="toUserPage"><v-icon>mdi-account</v-icon></v-btn>
      <v-btn icon small class="ml-2" v-if="isLogin" to="/edit"><v-icon>mdi-pencil</v-icon></v-btn>
      <v-btn icon small class="ml-2" v-if="isLogin" @click="logout"><v-icon>mdi-power-standby</v-icon></v-btn>
    </v-toolbar-title>
  </v-app-bar>
</template>

<script>

import {mapMutations, mapState} from "vuex";

export default {
  props:{
  },
  data () {
    return{

    }
  },
  computed:{
    ...mapState({
      isLogin:state=> state.user.isLogin
    })
  },

  mounted() {

  },
  methods: {
    ...mapMutations({
      logout:'user/logout'
    }),
    toUserPage(){
      if(!this.isLogin){
        this.$router.push('/login')
      }
    }
  }

}
</script>

<style>
.jl_sidebar_header{height: 64px;display: flex;align-items: center;padding: 0 15px;}
.jl_sidebar_header .jl_title{margin-left: 20px;font-size: 20px;font-weight: bolder;}
</style>
