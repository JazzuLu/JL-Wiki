<template>
  <v-navigation-drawer :mini-variant="miniVariant" :clipped="clipped" fixed app>
    <v-list>
      <v-list-item v-for="(item, i) in items" :key="i" :to="item.to" router exact>
        <v-list-item-action>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title v-text="item.title"></v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

export default {
  props:{
  },
  data () {
    return {
      items: [
        { icon: 'mdi-apps', title: 'Welcome', to: '/' },
        { icon: 'mdi-chart-bubble', title: 'Inspire', to: '/inspire' },
        { icon: 'mdi-chart-bubble', title: 'Editor Page', to: '/mdEditor' },
        { icon: 'mdi-chart-bubble', title: 'Full Editor Page', to: '/fullEditor' },
      ],
    }
  },
  computed:{
    ...mapState({
      miniVariant:state=>state.menuSetting.miniVariant,
      clipped:state=>state.menuSetting.clipped,
      drawer:state=>state.menuSetting.drawer,
    })
  },

  mounted() {
    console.log(this)
    // this.$axios.$post('/api/admin/signup',{username:'lpc',password:'111111'})
    // this.$axios.$get('/api/api/admin',)

  }

}
</script>
