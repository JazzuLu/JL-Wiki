<template>
  <div class="jl_main">
    <div class="jl_banner">
      <v-img/>
    </div>
    <v-row>
      <v-col cols="9">
        <v-card></v-card>
      </v-col>
      <v-col cols="4">
        <v-card></v-card>
        <v-card></v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import Logo from '~/components/Logo.vue'
import VuetifyLogo from '~/components/VuetifyLogo.vue'

export default {
  components: {
    Logo,
    VuetifyLogo
  },
  async mounted() {
    // let fetchLogin = await this.$axios.$post('/api/register',{code:'123',username:'test1',password:'1234567',});
  }
}
</script>

<style>

</style>
