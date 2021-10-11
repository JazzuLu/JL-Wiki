<template>
  <v-app>
    <JLNotify style="z-index: 10000;"/>
    <!--  顶部栏  -->
    <top-menu v-if="showMenuBar"/>

    <!-- 显示区 -->
    <v-main>
      <v-container> <nuxt/> </v-container>
    </v-main>

    <!--  页脚  -->
    <v-footer v-if="showMenuBar" absolute app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
import {mapMutations, mapState} from "vuex";
import JLNotify from "../components/JLNotify";
import TopMenu from "./topMenu";

export default {
  components:{
    TopMenu,
    JLNotify,
  },
  data () {
    return {
      title: 'J-Wiki'
    }
  },
  computed:{
    ...mapState({
      miniVariant:state=>state.menuSetting.miniVariant,
      clipped:state=>state.menuSetting.clipped,
      drawer:state=>state.menuSetting.drawer,
    }),
    showMenuBar(){
      return this.$route.name!=='login'
    }
  },
  mounted() {
    console.log()
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
