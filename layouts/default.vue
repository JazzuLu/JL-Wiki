<template>
  <v-app>
    <sideMenu/>

    <!--  顶部栏  -->
    <v-app-bar :clipped-left="clipped" fixed app >
      <v-app-bar-nav-icon @click.stop="triggerDrawer"/>
      <v-btn icon @click.stop="triggerMiniVariant">
        <v-icon>mdi-{{ `chevron-${miniVariant ? 'right' : 'left'}` }}</v-icon>
      </v-btn>
      <v-btn icon @click.stop="triggerClipped">
        <v-icon>mdi-application</v-icon>
      </v-btn>
      <v-toolbar-title v-text="title" />
    </v-app-bar>

    <!-- 显示区 -->
    <v-main>
      <v-container> <nuxt/> </v-container>
    </v-main>

    <!--  页脚  -->
    <v-footer absolute app >
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
import sideMenu from './sideMenu'
import {mapMutations, mapState} from "vuex";

export default {
  components:{
    sideMenu
  },
  data () {
    return {
      title: 'Vuetify.js'
    }
  },
  computed:{
    ...mapState({
      miniVariant:state=>state.menuSetting.miniVariant,
      clipped:state=>state.menuSetting.clipped,
      drawer:state=>state.menuSetting.drawer,
    })
  },
  methods:{
    ...mapMutations({
      triggerMiniVariant:'menuSetting/triggerMiniVariant',
      triggerClipped:'menuSetting/triggerClipped',
      triggerDrawer:'menuSetting/triggerDrawer',
    })
  }
}
</script>
